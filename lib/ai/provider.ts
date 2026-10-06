import { generateSiteSpec, normalizeSiteSpec } from "@/lib/site-builder/generator";
import { SiteSpec } from "@/lib/site-builder/types";

function extractJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const candidate = fenced ?? text;
  const first = candidate.indexOf("{");
  const last = candidate.lastIndexOf("}");
  if (first < 0 || last <= first) throw new Error("AI response did not contain JSON.");
  return JSON.parse(candidate.slice(first, last + 1));
}

export async function generateWithConfiguredProvider(
  prompt: string,
  current?: SiteSpec | null,
): Promise<SiteSpec | null> {
  const provider = process.env.AI_PROVIDER?.toLowerCase();
  const model = process.env.AI_MODEL;
  const key =
    provider === "groq"
      ? process.env.GROQ_API_KEY
      : provider === "openai"
        ? process.env.OPENAI_API_KEY
        : undefined;

  if (!provider || !model || !key || !["groq", "openai"].includes(provider)) return null;

  const endpoint =
    provider === "groq"
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";

  const fallback = generateSiteSpec(prompt, current);
  const system = `You are the design engine for an AI website builder. Return ONLY a valid JSON object describing a polished marketing website. Keep the exact SiteSpec shape represented by this example: ${JSON.stringify(
    fallback,
  )}. Preserve the current website when the user requests a small edit. Never output code, markdown, comments, or secrets. Keep sections limited to: features, stats, testimonials, pricing, faq, contact.`;

  const user = current
    ? `Current site: ${JSON.stringify(current)}\n\nRequested change: ${prompt}`
    : `Create a new site from this request: ${prompt}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!response.ok) throw new Error(`AI provider returned ${response.status}.`);
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("AI provider returned an empty response.");

  const parsed = extractJson(content) as Partial<SiteSpec>;
  return normalizeSiteSpec(parsed, fallback);
}
