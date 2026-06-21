import { NextResponse } from "next/server";

export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f0f9f6"/>
      <stop offset="100%" style="stop-color:#d9f0e8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="900" cy="200" r="150" fill="#35927a" opacity="0.15"/>
  <circle cx="300" cy="450" r="120" fill="#cfa55a" opacity="0.15"/>
  <text x="100" y="280" font-family="Georgia, serif" font-size="72" font-weight="600" fill="#1c3f38">Bright Hope</text>
  <text x="100" y="340" font-family="Arial, sans-serif" font-size="28" fill="#287562">Counselling &amp; Coaching Centre</text>
  <text x="100" y="400" font-family="Arial, sans-serif" font-size="22" fill="#6b7280">Guiding You Towards Healing, Confidence &amp; Growth</text>
  <text x="100" y="520" font-family="Arial, sans-serif" font-size="18" fill="#35927a">Pammal, Chennai</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
