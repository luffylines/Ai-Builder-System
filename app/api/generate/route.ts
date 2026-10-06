import { generateWithConfiguredProvider } from "@/lib/ai/provider";
import { generateSiteSpec } from "@/lib/site-builder/generator";
import { SiteSpec } from "@/lib/site-builder/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const current = (body?.current ?? null) as SiteSpec | null;

    if (!prompt) {
      return Response.json(
        { error: "Please describe the website you want to build." },
        { status: 400 },
      );
    }

    try {
      const aiSpec = await generateWithConfiguredProvider(prompt, current);
      if (aiSpec) return Response.json({ spec: aiSpec, source: "ai" });
    } catch (error) {
      console.error("AI provider generation failed; using local fallback.", error);
    }

    const spec = generateSiteSpec(prompt, current);
    return Response.json({ spec, source: "local" });
  } catch {
    return Response.json(
      { error: "The request could not be processed." },
      { status: 500 },
    );
  }
}
