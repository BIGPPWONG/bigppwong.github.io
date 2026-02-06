export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

const dictionaries = {
  en: {
    site: {
      description:
        "iOS development, AI/ML applications, and technical explorations.",
    },
    nav: {
      blog: "Blog",
      about: "About",
      github: "GitHub",
    },
    home: {
      latestPosts: "Latest Posts",
    },
    about: {
      title: "About",
      heading: "BIGWONG Studio",
      intro:
        "This is the official blog of BIGWONG Studio. We focus on iOS development, AI/ML applications, and sharing technical explorations.",
      feedback:
        "If you encounter any problems in use, or you want to provide suggestions to our applications, feel free to leave a comment on any post or reach out via email.",
      contact: "Contact",
    },
    post: {
      toc: "Table of Contents",
    },
    footer: {
      rights: "All rights reserved.",
    },
    notFound: {
      message: "The page you are looking for does not exist.",
      back: "Back to Home",
    },
  },
  zh: {
    site: {
      description: "iOS 开发、AI/ML 应用与技术探索。",
    },
    nav: {
      blog: "博客",
      about: "关于",
      github: "GitHub",
    },
    home: {
      latestPosts: "最新文章",
    },
    about: {
      title: "关于",
      heading: "BIGWONG Studio",
      intro:
        "这是 BIGWONG Studio 的官方博客。我们专注于 iOS 开发、AI/ML 应用以及技术探索分享。",
      feedback:
        "如果您在使用中遇到任何问题，或者想给我们的应用提建议，欢迎在任意文章下留言或通过邮件联系我们。",
      contact: "联系方式",
    },
    post: {
      toc: "目录",
    },
    footer: {
      rights: "保留所有权利。",
    },
    notFound: {
      message: "您访问的页面不存在。",
      back: "返回首页",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
