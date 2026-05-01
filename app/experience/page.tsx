import Link from "next/link";
import { packageOptions } from "../../lib/packages";

export default function ExperiencePage() {
  return (
    <section aria-labelledby="packages-heading">
      {/* Page header */}
      <div className="max-w-3xl rounded-2xl border border-white/85 bg-white/86 p-5 shadow-md shadow-stone-200/45 dark:border-slate-700/70 dark:bg-slate-900/55 dark:shadow-black/15 sm:p-6">
        <h1
          id="packages-heading"
          className="text-2xl font-bold text-stone-900 dark:text-slate-100 sm:text-3xl lg:text-4xl"
        >
          Choose your podcast booking experience
        </h1>
        <p className="mt-3 text-sm text-stone-700 dark:text-slate-300 sm:mt-4 sm:text-base">
          Each tier is built to meet you where you are and guide you toward
          confident, story-driven visibility.
        </p>
      </div>

      {/* Package cards */}
      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packageOptions.map((pkg, index) => (
          <article
            key={pkg.name}
            className="group flex h-full flex-col rounded-2xl border border-white/85 bg-gradient-to-br from-white/90 to-slate-50/85 p-5 shadow-md shadow-stone-200/50 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-6"
          >
            <p className="inline-flex w-fit rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-600 dark:bg-slate-800 dark:text-slate-300">
              Tier {index + 1}
            </p>
            <h2 className="text-xl font-semibold text-stone-900 dark:text-slate-100">
              {pkg.name}
            </h2>
            <p className="mt-1 text-2xl font-bold text-stone-800 dark:text-slate-100">
              {pkg.amount}
            </p>
            <p className="mt-2 text-sm text-stone-600 dark:text-slate-300">
              Ideal for: {pkg.idealFor}
            </p>

            <ul className="mt-5 space-y-2 text-sm text-stone-700 dark:text-slate-300">
              {pkg.deliverables.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>

            <Link
              href="/book"
              className="mt-6 inline-block w-full rounded-full bg-gradient-to-r from-amber-200 to-orange-100 px-4 py-2 text-center text-sm font-semibold text-slate-900 transition hover:from-amber-100 hover:to-orange-50 dark:from-amber-300/95 dark:to-orange-200/90 dark:hover:from-amber-200 dark:hover:to-orange-100 sm:w-auto"
            >
              Select Package
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
