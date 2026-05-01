"use client";

import { useEffect, useState } from "react";

export type Slide = {
  videoId?: string;
  fallback: string;
  lightScrim: number;
  darkScrim: number;
};

export const defaultSlides: Slide[] = [
  // Visual fallback slides are kept image-only so stale hardcoded videos never appear.
  { fallback: "/images/podcast-studio-01.svg", lightScrim: 0.34, darkScrim: 0.62 },
  { fallback: "/images/podcast-studio-02.svg", lightScrim: 0.42, darkScrim: 0.72 },
  { fallback: "/images/podcast-studio-03.svg", lightScrim: 0.36, darkScrim: 0.66 },
  { fallback: "/images/podcast-studio-04.svg", lightScrim: 0.46, darkScrim: 0.78 },
];

function mapVideoIdsToSlides(videoIds: string[]): Slide[] {
  return videoIds.map((videoId, index) => {
    const base = defaultSlides[index % defaultSlides.length];
    return {
      videoId,
      fallback: base.fallback,
      lightScrim: base.lightScrim,
      darkScrim: base.darkScrim,
    };
  });
}

function embedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    loop: "1",
    playlist: videoId,
    fs: "0",
    disablekb: "1",
    iv_load_policy: "3",
    enablejsapi: "1",
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

type BackgroundCarouselProps = {
  initialVideoIds?: string[];
};

export function BackgroundCarousel({ initialVideoIds = [] }: BackgroundCarouselProps) {
  const [slides, setSlides] = useState<Slide[]>(
    initialVideoIds.length > 0 ? mapVideoIdsToSlides(initialVideoIds) : defaultSlides,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const normalizedActiveIndex = slides.length > 0 ? activeIndex % slides.length : 0;

  const sendPlayerCommand = (iframe: HTMLIFrameElement | null, func: string, args: unknown[] = []) => {
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "https://www.youtube.com",
    );
  };

  useEffect(() => {
    let cancelled = false;

    const loadLatestVideos = async () => {
      try {
        const response = await fetch(`/api/youtube/latest?ts=${Date.now()}`, {
          cache: "no-store",
        });
        if (!response.ok) return;

        const data = (await response.json()) as { videoIds?: string[] };
        const videoIds = data.videoIds?.filter(Boolean) ?? [];
        if (videoIds.length === 0) return;

        if (!cancelled) {
          setSlides(mapVideoIdsToSlides(videoIds));
          setActiveIndex(0);
        }
      } catch {
        // Keep local image slides on failure.
      }
    };

    loadLatestVideos();
    const refreshId = window.setInterval(loadLatestVideos, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(refreshId);
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 12000);

    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    // Keep active slide playing slowly and pause inactive slides for cleaner transitions.
    slides.forEach((_, index) => {
      const iframe = document.getElementById(`bg-video-${index}`) as HTMLIFrameElement | null;
      if (!iframe) return;

      if (index === normalizedActiveIndex) {
        sendPlayerCommand(iframe, "setPlaybackRate", [1]);
        sendPlayerCommand(iframe, "playVideo");
      } else {
        sendPlayerCommand(iframe, "pauseVideo");
      }
    });
  }, [normalizedActiveIndex, slides]);

  return (
    <section className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {slides.map((slide, index) => {
        const active = index === activeIndex;

        return (
          <div
            key={slide.videoId ?? slide.fallback}
            className={`absolute inset-0 transition-opacity duration-[3200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Local visual fallback under video layer */}
            <img
              src={slide.fallback}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-38 dark:opacity-30"
            />
            {slide.videoId ? (
              <iframe
                id={`bg-video-${index}`}
                src={embedUrl(slide.videoId)}
                title={`BHAW Namrata background video ${slide.videoId}`}
                onLoad={(event) => {
                  const iframe = event.currentTarget;
                  // Best-effort: keep playback at normal speed once player API is ready.
                  window.setTimeout(() => {
                    sendPlayerCommand(iframe, "setPlaybackRate", [1]);
                    sendPlayerCommand(iframe, "playVideo");
                  }, 900);
                }}
                className="absolute inset-0 h-full w-full scale-[1.15] opacity-48 dark:opacity-42"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen={false}
                loading="eager"
              />
            ) : null}
          </div>
        );
      })}

      {/* Base tone for brand atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(251,191,36,0.05),transparent_34%),radial-gradient(circle_at_80%_16%,rgba(14,165,233,0.05),transparent_34%)] dark:bg-[radial-gradient(circle_at_20%_15%,rgba(251,191,36,0.03),transparent_34%),radial-gradient(circle_at_80%_16%,rgba(14,165,233,0.03),transparent_34%)]" />

      {/* Dynamic readability scrim for light theme */}
      <div className="absolute inset-0 dark:hidden">
        {slides.map((slide, index) => (
          <div
            key={`light-scrim-${slide.videoId ?? slide.fallback}`}
            className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
            style={{
              opacity: index === normalizedActiveIndex ? slide.lightScrim : 0,
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.44) 0%, rgba(15,23,42,0.34) 45%, rgba(15,23,42,0.5) 100%)",
            }}
          />
        ))}
      </div>

      {/* Dynamic readability scrim for dark theme */}
      <div className="absolute inset-0 hidden dark:block">
        {slides.map((slide, index) => (
          <div
            key={`dark-scrim-${slide.videoId ?? slide.fallback}`}
            className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
            style={{
              opacity: index === normalizedActiveIndex ? slide.darkScrim : 0,
              background:
                "linear-gradient(180deg, rgba(2,6,23,0.9) 0%, rgba(11,17,32,0.88) 52%, rgba(17,24,39,0.94) 100%)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
