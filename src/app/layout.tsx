import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export const metadata: Metadata = {
  title: {
    default: "NexusAI | AI-Powered Digital Solutions for Modern Business",
    template: "%s | NexusAI"
  },
  description: "Transform your business with cutting-edge AI-powered web development, mobile apps, and branding services. Industry-leading performance and 24/7 support.",
  keywords: [
    "AI development",
    "web development",
    "mobile app development",
    "branding",
    "digital transformation",
    "startup solutions",
    "Next.js development",
    "enterprise solutions",
    "SEO optimization",
    "cloud hosting"
  ],
  authors: [{ name: "NexusAI", url: "https://nexusai.com" }],
  creator: "NexusAI",
  publisher: "NexusAI",
  metadataBase: new URL("https://nexusai.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexusai.com",
    title: "NexusAI | AI-Powered Digital Solutions for Modern Business",
    description: "Transform your business with cutting-edge AI-powered web development, mobile apps, and branding services.",
    siteName: "NexusAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NexusAI - AI-Powered Digital Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusAI | AI-Powered Digital Solutions for Modern Business",
    description: "Transform your business with cutting-edge AI-powered web development, mobile apps, and branding services.",
    images: ["/og-image.jpg"],
    creator: "@nexusai"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}