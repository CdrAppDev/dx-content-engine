import { NextRequest } from "next/server";
import { z } from "zod";
import { runGeneration } from "@/lib/content/stream";

export const runtime = "nodejs";

const BodySchema = z.object({
  landingPage: z.string().min(1, "landingPage is required"),
  formats: z.array(z.enum(["blog-post", "linkedin-post", "email"])).min(1),
});

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  const { landingPage, formats } = parsed;

  try {
    return await runGeneration({
      skillNames: ["repurpose", ...formats],
      userMessage: `Canonical landing page (source of truth):\n\n${landingPage}\n\nTarget derivative formats: ${formats.join(
        ", ",
      )}.\n\nProduce each derivative according to its skill, following the repurpose orchestrator's output structure.`,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}
