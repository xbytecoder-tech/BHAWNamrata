"use client";

import { useEffect, useState } from "react";

const slides = [
  { id: "1MeSiJhA0_A", fallback: "/images/podcast-studio-01.svg" },
  { id: "f-BsdVZJeyM", fallback: "/images/podcast-studio-02.svg" },
  { id: "tZJPT5P_JnU", fallback: "/images/podcast-studio-03.svg" },
];

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
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function thumbnailUrl(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function AmbientVideoWall() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 16000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[2400ms] ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Visible fallback image under iframe guarantees non-empty background */}
          <img
            src={thumbnailUrl(slide.id)}
            alt=""
            onError={(e) => {
              e.currentTarget.src = slide.fallback;
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <iframe
            src={embedUrl(slide.id)}
            title={`BHAW Namrata video ${slide.id}`}
            className="absolute inset-0 h-full w-full opacity-75"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={false}
            loading="eager"
          />
        </div>
      ))}

      {/* Soft theme wash keeps content readable while leaving video visibly present */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,242,0.36)_0%,rgba(247,250,252,0.32)_45%,rgba(241,245,249,0.38)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.5)_0%,rgba(11,17,32,0.46)_50%,rgba(17,24,39,0.54)_100%)]" />
    </section>
  );
}
