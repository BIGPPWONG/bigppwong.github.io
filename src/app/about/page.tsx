import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About BIGWONG Studio",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        About
      </h1>
      <div className="prose">
        <h2>BIGWONG Studio</h2>
        <p>
          This is the official blog of BIGWONG Studio. We focus on iOS
          development, AI/ML applications, and sharing technical explorations.
        </p>
        <p>
          If you encounter any problems in use, or you want to provide
          suggestions to our applications, feel free to leave a comment on any
          post or reach out via email.
        </p>
        <h3>Contact</h3>
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
