"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Header({ lang }: { lang: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = getDictionary(lang);
  const otherLang = lang === "zh" ? "en" : "zh";
  const otherLabel = lang === "zh" ? "EN" : "中文";

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href={`/${lang}`} className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {siteConfig.title}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link href={`/${lang}`} className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
            {t.nav.blog}
          </Link>
          <Link href={`/${lang}/about`} className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
            {t.nav.about}
          </Link>
          <a
            href={siteConfig.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            GitHub
          </a>
          <Link
            href={`/${otherLang}`}
            className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            {otherLabel}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-neutral-200 px-6 py-4 sm:hidden dark:border-neutral-800">
          <div className="flex flex-col gap-4">
            <Link href={`/${lang}`} className="text-sm text-neutral-600 dark:text-neutral-400" onClick={() => setMenuOpen(false)}>
              {t.nav.blog}
            </Link>
            <Link href={`/${lang}/about`} className="text-sm text-neutral-600 dark:text-neutral-400" onClick={() => setMenuOpen(false)}>
              {t.nav.about}
            </Link>
            <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 dark:text-neutral-400">
              GitHub
            </a>
            <Link
              href={`/${otherLang}`}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400"
              onClick={() => setMenuOpen(false)}
            >
              {otherLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
