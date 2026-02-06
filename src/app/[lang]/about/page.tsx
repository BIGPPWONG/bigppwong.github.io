import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const t = getDictionary(lang);
  return {
    title: t.about.title,
    description: `${t.about.title} - BIGWONG Studio`,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const t = getDictionary(lang);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {t.about.title}
      </h1>
      <div className="prose">
        <h2>{t.about.heading}</h2>
        <p>{t.about.intro}</p>
        <p>{t.about.feedback}</p>
        <h3>{t.about.contact}</h3>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:weiwen.wong90@gmail.com">weiwen.wong90@gmail.com</a>
          </li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/BIGPPWONG"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/BIGPPWONG
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
