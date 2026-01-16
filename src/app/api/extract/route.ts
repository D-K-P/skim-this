import { NextResponse } from "next/server";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { get } from "@vercel/edge-config";

type ExtractRequest = {
  url: string;
};

type ExtractResponse =
  | { success: true; title: string; content: string; wordCount: number }
  | { success: false; error: string };

// Rate limiting: 10 requests per minute per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

export async function POST(request: Request): Promise<NextResponse<ExtractResponse>> {
  try {
    // Edge Config kill switch (optional - only if EDGE_CONFIG is set)
    if (process.env.EDGE_CONFIG) {
      const extractEnabled = await get<boolean>("extract_enabled");
      if (extractEnabled === false) {
        return NextResponse.json(
          { success: false, error: "Service temporarily unavailable. Please try again later." },
          { status: 503 }
        );
      }
    }

    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      );
    }
    const body = (await request.json()) as ExtractRequest;
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      return NextResponse.json({ success: false, error: "Invalid URL format" }, { status: 400 });
    }

    // Fetch the page
    let html: string;
    try {
      const response = await fetch(parsedUrl.toString(), {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; SkimThis/1.0)",
        },
      });
      if (!response.ok) {
        return NextResponse.json(
          { success: false, error: `Failed to fetch: ${response.status}` },
          { status: 400 }
        );
      }
      html = await response.text();
    } catch {
      return NextResponse.json({ success: false, error: "Failed to fetch URL" }, { status: 400 });
    }

    // Parse with Readability
    const dom = new JSDOM(html, { url: parsedUrl.toString() });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return NextResponse.json(
        { success: false, error: "Could not extract article content" },
        { status: 400 }
      );
    }

    // Clean up content - get plain text and split into words
    const content = article.textContent.trim();
    const words = content.split(/\s+/).filter((w) => w.length > 0);

    return NextResponse.json({
      success: true,
      title: article.title || "Untitled",
      content,
      wordCount: words.length,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
