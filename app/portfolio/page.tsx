import Link from "next/link";

// Demo showcase content. Replace these values with verified portfolio data before launch.
const podcastShowcase = [
  {
    tag: "Past Podcasts",
    title: "Reinvention Stories",
    summary:
      "Conversations that explore second innings, identity shifts, and the confidence to rebuild in public.",
    audience: "Women navigating a fresh chapter",
    outcome: "High-trust, story-led audience connection",
  },
  {
    tag: "Past Podcasts",
    title: "Founder Growth Features",
    summary:
      "Founder-focused episodes built around origin stories, lessons learned, and authority-building insights.",
    audience: "Entrepreneurs and business owners",
    outcome: "Clear authority positioning and stronger recall",
  },
  {
    tag: "Past Podcasts",
    title: "Expert Visibility Conversations",
    summary:
      "Thoughtful long-form sessions designed to turn expertise into practical, memorable listener takeaways.",
    audience: "Coaches, consultants, and specialists",
    outcome: "Deeper audience trust and qualified interest",
  },
];

const speakerHighlights = [
  {
    title: "Founders With Conviction",
    description:
      "Leaders who can translate hard-earned lessons into compelling business narratives that audiences remember.",
    strengths: ["Strong origin stories", "Practical insights", "Market clarity"],
  },
  {
    title: "Women In Their Second Innings",
    description:
      "Speakers whose lived experience creates authentic, emotionally resonant conversations about reinvention.",
    strengths: ["Personal depth", "Transformation arc", "Trust-building presence"],
  },
  {
    title: "Experts With Frameworks",
    description:
      "Guests who bring structure, expertise, and repeatable thinking that make interviews genuinely useful.",
    strengths: ["Clear teaching style", "Audience relevance", "Credible authority"],
  },
  {
    title: "Brand-Building Voices",
    description:
      "Speakers who show up with a memorable point of view and turn conversations into long-tail visibility.",
    strengths: ["Distinct perspective", "Message consistency", "Collaboration fit"],
  },
];

const impactMetrics = [
  {
    value: "40+",
    label: "showcase-ready podcast narratives",
    note: "A broad story mix across business growth, identity, and voice-led authority.",
  },
  {
    value: "12",
    label: "speaker positioning angles",
    note: "From founder journeys to reinvention stories and expert-led education.",
  },
  {
    value: "3x",
    label: "stronger content reusability",
    note: "Each interview can extend into clips, quotes, and social proof assets.",
  },
  {
    value: "100%",
    label: "story-first editorial lens",
    note: "Every feature is built around clarity, relatability, and audience resonance.",
  },
];

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-12" aria-labelledby="portfolio-heading">
      <header className="overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 via-stone-50/88 to-orange-50/80 p-7 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:via-slate-900/56 dark:to-slate-900/52 dark:shadow-black/20 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700 dark:bg-white/10 dark:text-slate-300">
              Portfolio
            </p>
            <h1
              id="portfolio-heading"
              className="max-w-3xl text-3xl font-bold leading-tight text-stone-900 dark:text-slate-100 sm:text-4xl"
            >
              A portfolio built to show voice, credibility, and the kind of
              podcast presence people remember.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-700 dark:text-slate-300 sm:text-base">
              This showcase highlights the kinds of podcast stories, speaker
              profiles, and measurable outcomes BHAW Namrata is designed to
              support. It gives prospective guests and collaborators a clear
              sense of quality, tone, and impact.
            </p>
          </div>

          <aside className="rounded-2xl border border-white/90 bg-white/85 p-5 shadow-md shadow-stone-200/45 dark:border-slate-700/70 dark:bg-slate-900/60 dark:shadow-black/20 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-600 dark:text-slate-400">
              Portfolio Intent
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-stone-800 dark:text-slate-100">
                  Showcase past podcast quality with clear editorial framing.
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-stone-800 dark:text-slate-100">
                  Highlight the kinds of speakers who thrive in this format.
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-stone-800 dark:text-slate-100">
                  Make impact visible through a polished metrics snapshot.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-600 dark:text-slate-400">
              Past Podcasts
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900 dark:text-slate-100 sm:text-3xl">
              Featured conversation formats that feel rich, intentional, and memorable
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-700 dark:text-slate-300">
            Each card below represents a strong portfolio-ready podcast style
            that can be customized with real episodes, guest names, and links.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {podcastShowcase.map((item, index) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white/94 to-stone-50/88 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/70 dark:to-slate-900/54 dark:shadow-black/20 sm:p-7"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 ${
                  index === 0
                    ? "bg-gradient-to-r from-amber-300 to-orange-200"
                    : index === 1
                      ? "bg-gradient-to-r from-sky-300 to-cyan-200"
                      : "bg-gradient-to-r from-rose-300 to-orange-200"
                }`}
              />
              <p className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-700 dark:bg-white/10 dark:text-slate-300">
                {item.tag}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-stone-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-700 dark:text-slate-300">
                {item.summary}
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-stone-200 bg-white/85 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500 dark:text-slate-400">
                    Audience Fit
                  </p>
                  <p className="mt-1 text-sm text-stone-800 dark:text-slate-200">
                    {item.audience}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-white/85 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500 dark:text-slate-400">
                    Outcome
                  </p>
                  <p className="mt-1 text-sm text-stone-800 dark:text-slate-200">
                    {item.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-600 dark:text-slate-400">
              Speaker Highlights
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900 dark:text-slate-100 sm:text-3xl">
              The kinds of speakers who shine in the BHAW Namrata format
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-700 dark:text-slate-300">
            A clear speaker mix helps the portfolio feel dynamic while also
            showing who the platform serves best.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {speakerHighlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/94 to-stone-50/88 p-5 shadow-md shadow-stone-200/45 dark:border-slate-700/70 dark:from-slate-900/70 dark:to-slate-900/54 dark:shadow-black/20 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-stone-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-700 dark:text-slate-300">
                {item.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.strengths.map((strength) => (
                  <span
                    key={strength}
                    className="rounded-full border border-stone-300 bg-white/85 px-3 py-1 text-xs font-medium text-stone-700 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-200"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-600 dark:text-slate-400">
              Impact Metrics
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900 dark:text-slate-100 sm:text-3xl">
              A bold metrics layer that makes the portfolio feel credible
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-700 dark:text-slate-300">
            These numbers are demo placeholders for the mockup and are meant to
            be replaced with verified channel and campaign data.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {impactMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/95 via-stone-50/88 to-orange-50/72 p-5 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/72 dark:via-slate-900/60 dark:to-slate-900/54 dark:shadow-black/20 sm:p-6"
            >
              <p className="text-3xl font-bold tracking-tight text-stone-900 dark:text-slate-100 sm:text-4xl">
                {metric.value}
              </p>
              <h3 className="mt-3 text-base font-semibold text-stone-900 dark:text-slate-100">
                {metric.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-700 dark:text-slate-300">
                {metric.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-stone-900 dark:text-slate-100 sm:text-3xl">
              Ready to turn this portfolio into booked conversations?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700 dark:text-slate-300 sm:text-base">
              Choose your package, pick an eligible date, and move from
              portfolio interest to a confirmed guesting experience.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/experience"
              className="inline-flex justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-500 dark:border-slate-500 dark:bg-slate-800/85 dark:text-white dark:hover:border-slate-300"
            >
              View Packages
            </Link>
            <Link
              href="/book"
              className="inline-flex justify-center rounded-full bg-gradient-to-r from-amber-200 to-orange-100 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:from-amber-100 hover:to-orange-50 dark:from-amber-300/95 dark:to-orange-200/90 dark:hover:from-amber-200 dark:hover:to-orange-100"
            >
              Book Your Slot
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
