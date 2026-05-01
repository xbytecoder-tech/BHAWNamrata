import { NextResponse } from "next/server";
import { fetchLatestBhawVideoIds } from "../../../../lib/youtube";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const videoIds = await fetchLatestBhawVideoIds();

  return NextResponse.json(
    { videoIds },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    },
  );
}
