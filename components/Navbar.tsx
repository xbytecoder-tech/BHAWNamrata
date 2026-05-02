"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import brandLogo from "../assets/BHAW_Na-Logo.jpeg";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const navLinkClass = (href: string) =>
    `rounded-full px-3 py-1.5 transition ${
      isActive(href)
        ? "bg-white text-stone-900 ring-1 ring-stone-400 shadow-md shadow-stone-300/60 dark:bg-slate-700 dark:text-white dark:ring-slate-300/70 dark:shadow-black/40"
        : "text-stone-700 hover:bg-white/70 hover:text-stone-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/80 bg-gradient-to-r from-stone-50/85 via-orange-50/70 to-sky-50/70 backdrop-blur dark:border-slate-700/50 dark:bg-gradient-to-r dark:from-slate-950/80 dark:via-slate-900/78 dark:to-slate-900/72">
      <nav
        className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="inline-flex items-center gap-3" aria-label="BHAW Namrata Home">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-white shadow-sm shadow-stone-300/35 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 sm:h-16 sm:w-16">
            <Image
              src={brandLogo}
              alt="BHAW Namrata"
              fill
              className="object-cover object-center"
              priority
            />
          </span>
          <span className="bg-gradient-to-r from-amber-700 via-amber-500 to-stone-900 bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-amber-200 dark:via-amber-300 dark:to-orange-100 sm:text-xl">
            BHAW Namrata
          </span>
        </Link>

        <ul className="flex w-full flex-wrap items-center justify-start gap-2 text-sm font-medium sm:w-auto sm:justify-end sm:gap-3">
          <li>
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={navLinkClass("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link href="/experience" className={navLinkClass("/experience")}>
              Experience
            </Link>
          </li>
          <li>
            <Link href="/portfolio" className={navLinkClass("/portfolio")}>
              Portfolio
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link
              href="/book"
              className={`inline-block rounded-full px-4 py-2 text-slate-900 transition ${
                isActive("/book")
                  ? "bg-gradient-to-r from-amber-200 to-orange-100 ring-2 ring-amber-400 shadow-md shadow-amber-200/60 dark:from-amber-300/95 dark:to-orange-200/90 dark:ring-amber-300 dark:shadow-black/40"
                  : "bg-gradient-to-r from-amber-200 to-orange-100 hover:from-amber-100 hover:to-orange-50 dark:from-amber-300/95 dark:to-orange-200/90 dark:hover:from-amber-200 dark:hover:to-orange-100"
              }`}
            >
              Book Now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
