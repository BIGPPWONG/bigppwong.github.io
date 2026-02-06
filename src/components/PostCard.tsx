import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="rounded-lg border border-neutral-200 p-6 transition-all hover:border-neutral-400 hover:shadow-sm dark:border-neutral-800 dark:hover:border-neutral-600">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <time className="text-sm text-neutral-500 dark:text-neutral-400" dateTime={post.date}>
              {format(new Date(post.date), "MMM d, yyyy")}
            </time>
            <span className="text-neutral-300 dark:text-neutral-700">&middot;</span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {post.readingTime}
            </span>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-neutral-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mb-3 line-clamp-2 text-neutral-600 dark:text-neutral-400">
              {post.excerpt}
            </p>
          )}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
        </div>
      </Link>
    </article>
  );
}
