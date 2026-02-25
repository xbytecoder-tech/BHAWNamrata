export function Footer() {
  // Update these URLs if official handles change.
  const socialLinks = [
    { label: "YouTube", href: "https://www.youtube.com/@BHAWNamrata" },
    { label: "Instagram", href: "https://www.instagram.com/bhawnamrata/" },
    { label: "Facebook", href: "https://www.facebook.com/bhawnamrata/" },
    { label: "WhatsApp", href: "https://wa.me/919243122115" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/90 bg-gradient-to-r from-stone-50/90 via-orange-50/75 to-sky-50/75 dark:border-slate-700/55 dark:from-slate-950/82 dark:via-slate-900/78 dark:to-slate-900/72">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-stone-600 dark:text-slate-400 sm:px-6 lg:px-8">
        {/* Footer brand note */}
        <p className="font-medium text-stone-800 dark:text-slate-200">BHAW Namrata</p>
        <p>
          Official booking website by and for the BHAW Namrata YouTube channel.
        </p>
        <div className="mt-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-700 dark:text-slate-300">
            Follow Us
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-stone-300 bg-white/80 px-3 py-1 text-xs font-medium text-stone-700 transition hover:border-stone-500 hover:text-stone-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-slate-400 dark:hover:text-slate-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-xs text-stone-500 dark:text-slate-500">(c) {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
