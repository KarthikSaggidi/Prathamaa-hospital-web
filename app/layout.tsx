import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/seo-pages";
import { site } from "@/lib/site";
import { hospitalStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  ...pageMetadata(pages.home),
  metadataBase: new URL(site.origin),
  applicationName: site.name,
  publisher: site.name,
  authors: [{ name: site.name, url: site.origin }],
  category: "healthcare",
  robots: {
    index: site.indexable,
    follow: site.indexable,
    googleBot: { index: site.indexable, follow: site.indexable, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <JsonLd id="hospital-structured-data" data={hospitalStructuredData()} />
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
