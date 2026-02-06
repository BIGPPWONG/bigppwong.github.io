import { notFound } from "next/navigation";
import { format } from "date-fns";
import { enUS, zhCN } from "date-fns/locale";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import TableOfContents from "@/components/TableOfContents";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { locales, getDictionary, type Locale } from "@/lib/i18n";

const dateLocales = { en: enUS, zh: zhCN } as const;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    const slugs = getAllPostSlugs(lang);
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const lang = langParam as Locale;
  const post = await getPostBySlug(lang, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteConfig.url}/${lang}/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { lang: langParam, slug } = await params;
  const lang = langParam as Locale;
  const post = await getPostBySlug(lang, slug);
  const t = getDictionary(lang);

  if (!post) {
    notFound();
  }

  const datePattern = lang === "zh" ? "yyyy 年 M 月 d 日" : "MMMM d, yyyy";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="relative">
        <article className="min-w-0">
          <header className="mb-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
              <time dateTime={post.date}>
                {format(new Date(post.date), datePattern, {
                  locale: dateLocales[lang],
                })}
              </time>
              <span>&middot;</span>
              <span>{post.readingTime}</span>
              <span>&middot;</span>
              <span>{post.author}</span>
            </div>
            {post.categories.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <aside className="absolute bottom-0 left-full top-0 hidden xl:block xl:w-48 xl:pl-6 2xl:w-64 2xl:pl-8">
          <TableOfContents headings={post.headings} lang={lang} />
        </aside>
      </div>
    </div>
  );
}
