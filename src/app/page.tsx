import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <section className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          BIGWONG Studio
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          iOS development, AI/ML applications, and technical explorations.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">
          Latest Posts
        </h2>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
