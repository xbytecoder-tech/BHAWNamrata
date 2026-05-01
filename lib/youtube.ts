const CHANNEL_HANDLE = "@BHAWNamrata";
const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`;
const CHANNEL_VIDEOS_URL = `${CHANNEL_URL}/videos?view=0&sort=dd&shelf_id=0`;
const MAX_VIDEOS = 6;

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
};

function dedupeAndLimit(values: string[]) {
  return Array.from(new Set(values)).slice(0, MAX_VIDEOS);
}

function extractChannelId(html: string): string | null {
  const patterns = [
    /itemprop="channelId"\s+content="(UC[^"]+)"/i,
    /"channelId":"(UC[^"]+)"/i,
    /"externalId":"(UC[^"]+)"/i,
    /"browseId":"(UC[^"]+)"/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

function extractVideoIdsFromFeed(xml: string): string[] {
  const matches = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)];
  return dedupeAndLimit(matches.map((match) => match[1]).filter(Boolean));
}

function extractVideoIdsFromHtml(html: string): string[] {
  const ids: string[] = [];
  const patterns = [
    /"videoId":"([A-Za-z0-9_-]{11})"/g,
    /\/watch\?v=([A-Za-z0-9_-]{11})/g,
  ];

  for (const pattern of patterns) {
    ids.push(...[...html.matchAll(pattern)].map((match) => match[1]).filter(Boolean));
  }

  return dedupeAndLimit(ids);
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: REQUEST_HEADERS,
  });

  if (!response.ok) return "";
  return response.text();
}

export async function fetchLatestBhawVideoIds(): Promise<string[]> {
  try {
    const videosHtml = await fetchHtml(CHANNEL_VIDEOS_URL);
    const latestFromVideosPage = extractVideoIdsFromHtml(videosHtml);
    if (latestFromVideosPage.length > 0) return latestFromVideosPage;

    const channelHtml = await fetchHtml(CHANNEL_URL);
    const latestFromChannelPage = extractVideoIdsFromHtml(channelHtml);
    if (latestFromChannelPage.length > 0) return latestFromChannelPage;

    const channelId = extractChannelId(channelHtml);
    if (!channelId) return [];

    const feedResponse = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { cache: "no-store" },
    );

    if (!feedResponse.ok) return [];

    const xml = await feedResponse.text();
    return extractVideoIdsFromFeed(xml);
  } catch {
    return [];
  }
}
