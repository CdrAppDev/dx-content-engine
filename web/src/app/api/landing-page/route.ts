import { NextRequest } from "next/server";
import { z } from "zod";
import { runGeneration } from "@/lib/content/stream";

export const runtime = "nodejs";

const BodySchema = z.object({
  source: z.string().min(1, "source is required"),
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

  const { source } = parsed;

  try {
    return await runGeneration({
      skillNames: ["feature-translator", "landing-page"],
      userMessage: `Source material (a software feature description or capability brief):\n\n${source}\n\nRun the feature-translator skill first to produce a structured brief, then run the landing-page skill to produce the publication-ready landing page. Output ONLY the final landing page (do not include the intermediate translator brief in the response).`,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}
