import { ReactNode } from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata;

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* You can keep the content for the site layout, but no <html> or <body> */}
     
        <Navbar />
        {children}
        <Footer />
     
    </>
  );
}
