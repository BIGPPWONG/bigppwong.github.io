import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  author: string;
  coverImage?: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
  headings: { id: string; text: string; level: number }[];
}

function extractHeadingsFromHtml(
  html: string
): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<h([1-6])\s+id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // Strip HTML tags from heading content to get plain text
    const text = match[3].replace(/<[^>]*>/g, "").trim();
    headings.push({ id, text, level });
  }
  return headings;
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      // Remove date prefix: 2022-12-17-slug.md -> slug
      const match = name.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
      return match ? match[1] : name.replace(/\.md$/, "");
    });
}

function getPostFileName(slug: string): string | null {
  const fileNames = fs.readdirSync(postsDirectory);
  const file = fileNames.find((name) => {
    const match = name.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
    const fileSlug = match ? match[1] : name.replace(/\.md$/, "");
    return fileSlug === slug;
  });
  return file || null;
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const match = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
      const slug = match ? match[1] : fileName.replace(/\.md$/, "");

      // Extract date from filename
      const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
      const date = dateMatch ? dateMatch[1] : data.date || "";

      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        date,
        excerpt: data.excerpt || "",
        categories: data.categories || [],
        author: data.author || "BIGWONG Studio",
        coverImage: data.coverImage || data.header?.overlay_image,
        readingTime: stats.text,
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fileName = getPostFileName(slug);
  if (!fileName) return null;

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : data.date || "";

  const stats = readingTime(content);

  const result = await unified()
    .use(remarkParse as never)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const html = result.toString();
  const headings = extractHeadingsFromHtml(html);

  return {
    slug,
    title: data.title || slug,
    date,
    excerpt: data.excerpt || "",
    categories: data.categories || [],
    author: data.author || "BIGWONG Studio",
    coverImage: data.coverImage || data.header?.overlay_image,
    readingTime: stats.text,
    content: html,
    headings,
  };
}
