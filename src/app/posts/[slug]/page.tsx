import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import TableOfContents from "@/components/TableOfContents";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
      url: `${siteConfig.url}/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex gap-12">
        {/* Main content */}
        <article className="min-w-0 max-w-4xl flex-1">
          <header className="mb-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
              <time dateTime={post.date}>
                {format(new Date(post.date), "MMMM d, yyyy")}
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

        {/* Table of Contents sidebar */}
        <aside className="w-64 shrink-0">
          <TableOfContents headings={post.headings} />
        </aside>
      </div>
    </div>
  );
}
