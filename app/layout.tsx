import type { Metadata } from "next";

import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Prathama Hospital",

  description:
    "Prathama Hospital multispeciality healthcare website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <WhatsAppButton />

      </body>
    </html>
  );
}