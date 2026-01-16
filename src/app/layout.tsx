import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FocusProvider } from "@/contexts/focus-context";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "skim this",
  description: "Speed read any article. Paste a URL, read 2-3x faster.",
  metadataBase: new URL("https://skimthis.page"),
  openGraph: {
    title: "skim this",
    description: "Speed read any article. Paste a URL, read 2-3x faster.",
    url: "https://skimthis.page",
    siteName: "skim this",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "skim this",
    description: "Speed read any article. Paste a URL, read 2-3x faster.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakarta.variable} ${lora.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className="bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 antialiased transition-colors font-sans mx-auto"
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <FocusProvider>
            <Header />
            {children}
            <Footer />
          </FocusProvider>
          <Analytics />
        </NuqsAdapter>
      </body>
    </html>
  );
}
