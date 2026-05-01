export function Footer() {
  // Update these URLs if official handles change.
  const socialLinks = [
    {
      label: "YouTube",
      href: "https://www.youtube.com/@BHAWNamrata",
      logo: "https://img.icons8.com/color/48/youtube-play.png",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/bhawnamrata/",
      logo: "https://img.icons8.com/color/48/instagram-new.png",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/bhawnamrata/",
      logo: "https://img.icons8.com/color/48/facebook-new.png",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/919243122115",
      logo: "https://img.icons8.com/color/48/whatsapp--v1.png",
    },
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
          <div className="mt-2 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white/85 transition hover:border-stone-500 hover:bg-white dark:border-slate-600 dark:bg-slate-900/60 dark:hover:border-slate-400 dark:hover:bg-slate-900/85"
              >
                <img
                  src={item.logo}
                  alt={item.label}
                  className="h-6 w-6 object-contain"
                />
                <span className="sr-only">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
        <p className="text-xs text-stone-500 dark:text-slate-500">(c) {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
