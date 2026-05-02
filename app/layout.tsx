import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BackgroundCarousel } from "../components/BackgroundCarousel";
import { BrowserChromeController } from "../components/BrowserChromeController";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { fetchLatestBhawVideoIds } from "../lib/youtube";

export const metadata: Metadata = {
  title: "BHAW Namrata | Podcast Booking Experience",
  description:
    "Official podcast booking experience by and for BHAW Namrata (YouTube channel).",
  icons: {
    icon: "/bhaw-namrata-logo.jpeg?v=20260502",
    shortcut: "/bhaw-namrata-logo.jpeg?v=20260502",
    apple: "/bhaw-namrata-logo.jpeg?v=20260502",
  },
};

// Explicit viewport metadata for consistent rendering across phones/tablets/laptops.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const latestVideoIds = await fetchLatestBhawVideoIds();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fallback tags for browsers that prefer non-media theme-color/meta values */}
        <meta name="theme-color" content="#fafaf9" />
        <meta name="msapplication-navbutton-color" content="#fafaf9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-screen bg-stone-50 text-stone-800 antialiased transition-colors dark:bg-slate-950 dark:text-slate-200">
        <div className="relative isolate flex min-h-screen flex-col overflow-x-clip">
          {/* Dynamically updates browser chrome tint for top vs scrolled states */}
          <BrowserChromeController />

          {/* Podcast-style ambient background carousel */}
          <BackgroundCarousel initialVideoIds={latestVideoIds} />

          {/* Shared top navigation */}
          <Navbar />

          {/* Main page content */}
          <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            {children}
          </main>

          {/* Shared footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
