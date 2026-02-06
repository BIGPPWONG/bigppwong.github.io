import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="mb-4 text-6xl font-bold text-neutral-900 dark:text-white">
        404
      </h1>
      <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
        Page not found / 页面未找到
      </p>
      <Link
        href="/zh"
        className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Back to Home / 返回首页
      </Link>
    </div>
  );
}
