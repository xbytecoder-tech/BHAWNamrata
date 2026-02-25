import Link from "next/link";

const benefits = [
  {
    title: "Build trust with your voice",
    description:
      "Long-form podcast conversations help your audience hear your intent, values, and expertise beyond surface-level marketing.",
  },
  {
    title: "Grow authority organically",
    description:
      "When your story appears on relevant podcasts, your credibility compounds through host trust and audience alignment.",
  },
  {
    title: "Attract aligned opportunities",
    description:
      "Thoughtful visibility draws the right clients, collaborations, and speaking invitations without forcing your message.",
  },
];

const pillars = [
  "Story-led positioning for your expertise",
  "Podcast-fit package options for every stage",
  "Simple booking flow with date and slot selection",
];

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero */}
      <section className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700 dark:bg-white/10 dark:text-slate-300">
              BHAW Namrata Podcast Platform
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-stone-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
              Turn your story into podcast visibility that builds brand authority.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-700 dark:text-slate-300 sm:text-base lg:text-lg">
              This official website by BHAW Namrata helps business owners, entrepreneurs, and women in their second innings get featured on podcasts with clarity and confidence.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/book"
                className="w-full rounded-full bg-gradient-to-r from-amber-200 to-orange-100 px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:from-amber-100 hover:to-orange-50 dark:from-amber-300/95 dark:to-orange-200/90 dark:hover:from-amber-200 dark:hover:to-orange-100 sm:w-auto"
              >
                Book Your Slot
              </Link>
              <Link
                href="/experience"
                className="w-full rounded-full border border-stone-300 bg-white px-6 py-3 text-center text-sm font-semibold text-stone-800 transition hover:border-stone-500 dark:border-slate-500 dark:bg-slate-800/85 dark:text-white dark:hover:border-slate-300 dark:hover:bg-slate-800 sm:w-auto"
              >
                View Packages
              </Link>
              <Link
                href="/about"
                className="w-full rounded-full border border-stone-300 bg-white px-6 py-3 text-center text-sm font-semibold text-stone-800 transition hover:border-stone-500 dark:border-slate-500 dark:bg-slate-800/85 dark:text-white dark:hover:border-slate-300 dark:hover:bg-slate-800 sm:w-auto"
              >
                About Us
              </Link>
            </div>
          </div>

          <aside className="mt-3 rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-5 shadow-md shadow-stone-200/50 dark:mt-0 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-6">
            <p className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700 dark:bg-white/10 dark:text-slate-300">
              Why this matters
            </p>
            <div className="mt-4 space-y-3">
              <article className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 shadow-sm shadow-stone-200/45 dark:!border-slate-400 dark:!bg-slate-950 dark:ring-1 dark:ring-slate-500/45 dark:shadow-black/40">
                <p className="text-sm font-medium leading-6 text-stone-800 dark:!text-white">
                  Long-form voice builds trust faster than static content.
                </p>
              </article>
              <article className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 shadow-sm shadow-stone-200/45 dark:!border-slate-400 dark:!bg-slate-950 dark:ring-1 dark:ring-slate-500/45 dark:shadow-black/40">
                <p className="text-sm font-medium leading-6 text-stone-800 dark:!text-white">
                  Right-host alignment brings qualified leads and collaborations.
                </p>
              </article>
              <article className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 shadow-sm shadow-stone-200/45 dark:!border-slate-400 dark:!bg-slate-950 dark:ring-1 dark:ring-slate-500/45 dark:shadow-black/40">
                <p className="text-sm font-medium leading-6 text-stone-800 dark:!text-white">
                  Story-led positioning improves conversion from every appearance.
                </p>
              </article>
            </div>
          </aside>
        </div>
      </section>

      {/* Benefits */}
      <section className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-8">
        <h2 className="text-2xl font-semibold text-stone-900 dark:text-slate-100 sm:text-3xl">
          Why podcast guesting works
        </h2>
        <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-5 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-stone-900 dark:text-slate-100">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-700 dark:text-slate-300">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Format */}
      <section className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-8">
        <h2 className="text-2xl font-semibold text-stone-900 dark:text-slate-100 sm:text-3xl">
          What you can expect
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 px-4 py-3 text-sm text-stone-700 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:text-slate-300 dark:shadow-black/20"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Closing CTA */}
      <section className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-8 lg:p-10">
        <h2 className="text-2xl font-semibold text-stone-900 dark:text-slate-100 sm:text-3xl">
          Ready to share your voice on the right podcasts?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700 dark:text-slate-100 sm:text-base">
          Start with a package that fits your current stage and choose a slot that works for you.
        </p>
        <Link
          href="/book"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-amber-200 to-orange-100 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:from-amber-100 hover:to-orange-50 dark:from-amber-300/95 dark:to-orange-200/90 dark:hover:from-amber-200 dark:hover:to-orange-100"
        >
          Start Booking
        </Link>
      </section>
    </div>
  );
}
