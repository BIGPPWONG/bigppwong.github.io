import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;

  return (
    <>
      <Header lang={lang} />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
