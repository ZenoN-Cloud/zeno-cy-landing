import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
  display: 'swap',
  preload: true,
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zeno-cy.com"),
  title: "Zeno CY · Privacy-first bank CSV automation",
  description:
    "Normalize Cyprus bank statements in minutes without ever uploading data to third-party clouds.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "Zeno CY",
    description:
      "Automate Hellenic, Bank of Cyprus, and Alpha exports with on-device processing.",
    url: "https://zeno-cy.com",
    siteName: "Zeno CY",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "Zeno CY preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeno CY",
    description:
      "Save 3–5 hours a week cleaning bank CSVs — processed locally for GDPR peace of mind.",
    images: ["/og-card.png"],
  },
  icons: {
    icon: "/favicon_zeno.png",
    shortcut: "/favicon_zeno.png",
    apple: "/favicon_zeno.png",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
