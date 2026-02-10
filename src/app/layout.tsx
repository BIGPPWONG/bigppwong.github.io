import type { Metadata } from "next";
import Script from "next/script";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  verification: {
    google: siteConfig.seo.googleVerification,
    other: {
      "msvalidate.01": siteConfig.seo.bingVerification,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-8071772007340802"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analytics.gaId}');
          `}
        </Script>
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}
