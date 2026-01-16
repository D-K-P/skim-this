import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "skim this";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function formatUrl(url: string): string {
  const clean = url.replace(/^https?:\/\//, "");
  if (clean.length > 50) {
    return clean.slice(0, 47) + "...";
  }
  return clean;
}

export default async function Image({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  const articleUrl = params.url;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: "-0.02em",
          }}
        >
          skim this
        </div>
        {articleUrl && (
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            {formatUrl(articleUrl)}
          </div>
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}
