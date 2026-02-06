import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { getDictionary, type Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const t = getDictionary(lang);
  const posts = getAllPosts(lang);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <section className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          BIGWONG Studio
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {t.site.description}
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">
          {t.home.latestPosts}
        </h2>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} />
          ))}
        </div>
      </section>
    </div>
  );
}
