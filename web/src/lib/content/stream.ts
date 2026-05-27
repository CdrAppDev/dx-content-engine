import type Anthropic from "@anthropic-ai/sdk";
import { getClient, MODEL } from "./claude";
import { loadBrand, formatBrandAsSystemContext } from "./brand";
import { loadSkills, type Skill } from "./skills";

type SystemBlock = {
  type: "text";
  text: string;
  cache_control?: { type: "ephemeral" };
};

export async function buildSystemBlocks(
  skillNames: string[],
): Promise<SystemBlock[]> {
  const [brand, allSkills] = await Promise.all([loadBrand(), loadSkills()]);

  const chosen: Skill[] = [];
  for (const name of skillNames) {
    const skill = allSkills.find((s) => s.name === name);
    if (!skill) {
      throw new Error(`Skill not found: ${name}`);
    }
    chosen.push(skill);
  }

  const brandContext = formatBrandAsSystemContext(brand);
  const skillBundle = chosen
    .map((s) => `# ${s.name} skill\n\n${s.body}`)
    .join("\n\n---\n\n");

  return [
    { type: "text", text: brandContext, cache_control: { type: "ephemeral" } },
    { type: "text", text: skillBundle, cache_control: { type: "ephemeral" } },
  ];
}

export function streamTextResponse(
  stream: Awaited<ReturnType<Anthropic["messages"]["stream"]>>,
) {
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(`\n\n[stream error] ${(err as Error).message}`),
        );
      } finally {
        controller.close();
      }
    },
  });
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function runGeneration({
  skillNames,
  userMessage,
  maxTokens = 8000,
}: {
  skillNames: string[];
  userMessage: string;
  maxTokens?: number;
}) {
  const system = await buildSystemBlocks(skillNames);
  const client = getClient();
  const stream = await client.messages.stream({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: userMessage }],
      },
    ],
  });
  return streamTextResponse(stream);
}
