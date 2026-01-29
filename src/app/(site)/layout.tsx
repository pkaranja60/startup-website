import "../globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata

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