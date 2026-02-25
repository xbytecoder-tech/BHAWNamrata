import Link from "next/link";

export default function AboutPage() {
  const socialLinks = [
    {
      name: "YouTube",
      href: "https://www.youtube.com/@BHAWNamrata",
      logo: "https://img.icons8.com/color/48/youtube-play.png",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/bhawnamrata/",
      logo: "https://img.icons8.com/color/48/instagram-new.png",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/bhawnamrata/",
      logo: "https://img.icons8.com/color/48/facebook-new.png",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/919243122115",
      logo: "https://img.icons8.com/color/48/whatsapp--v1.png",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl space-y-12" aria-labelledby="about-heading">
      <header className="max-w-4xl rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-7 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-10">
        <p className="mb-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700 dark:bg-white/10 dark:text-slate-300">
          About Us
        </p>
        <h1 id="about-heading" className="text-3xl font-bold text-stone-900 dark:text-slate-100 sm:text-4xl">
          About BHAW Namrata
        </h1>
        <p className="mt-4 text-sm leading-7 text-stone-700 dark:text-slate-300 sm:text-base">
          This is the official podcast booking website for the BHAW Namrata YouTube channel. Our mission is to help experts, founders, and women in their second innings share meaningful stories with confidence and credibility.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <article className="overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-7">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-slate-100">Our Channel</h2>
          <p className="mt-3 break-words text-sm leading-6 text-stone-700 dark:text-slate-300">
            BHAW Namrata focuses on authentic conversations, growth journeys, and practical visibility strategies.
          </p>
        </article>
        <article className="overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-7">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-slate-100">What We Do</h2>
          <p className="mt-3 break-words text-sm leading-6 text-stone-700 dark:text-slate-300">
            We offer guided podcast booking experiences, story positioning support, and session preparation.
          </p>
        </article>
        <article className="overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-7">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-slate-100">Who It Is For</h2>
          <p className="mt-3 break-words text-sm leading-6 text-stone-700 dark:text-slate-300">
            Business owners, entrepreneurs, and women redefining their next chapter through voice-led authority.
          </p>
        </article>
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-7">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-slate-100">Connect With Us</h2>
        <p className="mt-2 text-sm text-stone-700 dark:text-slate-300">
          Follow BHAW Namrata across our social platforms.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.name}
              title={item.name}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white/85 text-stone-700 transition hover:border-stone-500 hover:text-stone-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-slate-400 dark:hover:text-slate-100"
            >
              <img src={item.logo} alt={item.name} className="h-6 w-6 object-contain" />
            </a>
          ))}
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-6 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-7">
        <p className="text-sm text-stone-700 dark:text-slate-300">
          Ready to start your booking journey?
        </p>
        <Link
          href="/book"
          className="mt-3 inline-flex whitespace-nowrap rounded-full bg-gradient-to-r from-amber-200 to-orange-100 px-6 py-2.5 text-sm font-semibold leading-none text-slate-900 transition hover:from-amber-100 hover:to-orange-50 dark:from-amber-300/95 dark:to-orange-200/90 dark:hover:from-amber-200 dark:hover:to-orange-100"
        >
          Book a Slot
        </Link>
      </div>
    </section>
  );
}
