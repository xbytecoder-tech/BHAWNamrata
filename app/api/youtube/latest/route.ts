import { NextResponse } from "next/server";

const CHANNEL_HANDLE = "@BHAWNamrata";
const MAX_VIDEOS = 6;

function extractChannelId(html: string): string | null {
  const metaMatch = html.match(/itemprop="channelId"\s+content="(UC[^"]+)"/i);
  if (metaMatch?.[1]) return metaMatch[1];

  const jsonMatch = html.match(/"channelId":"(UC[^"]+)"/i);
  if (jsonMatch?.[1]) return jsonMatch[1];

  return null;
}

function extractVideoIdsFromFeed(xml: string): string[] {
  const matches = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)];
  const ids = matches.map((match) => match[1]).filter(Boolean);
  return Array.from(new Set(ids)).slice(0, MAX_VIDEOS);
}

export async function GET() {
  try {
    const channelPage = await fetch(`https://www.youtube.com/${CHANNEL_HANDLE}`, {
      // Cache channel lookup for a while; latest uploads are handled by feed fetch.
      next: { revalidate: 60 * 60 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });

    if (!channelPage.ok) {
      return NextResponse.json({ videoIds: [] }, { status: 200 });
    }

    const channelHtml = await channelPage.text();
    const channelId = extractChannelId(channelHtml);
    if (!channelId) {
      return NextResponse.json({ videoIds: [] }, { status: 200 });
    }

    const feedResponse = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 60 * 30 } },
    );

    if (!feedResponse.ok) {
      return NextResponse.json({ videoIds: [] }, { status: 200 });
    }

    const xml = await feedResponse.text();
    const videoIds = extractVideoIdsFromFeed(xml);

    return NextResponse.json(
      { videoIds },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      },
    );
  } catch {
    return NextResponse.json({ videoIds: [] }, { status: 200 });
  }
}

