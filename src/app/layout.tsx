// app/layout.tsx
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}



export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // This lang attribute is required
    <html lang="en" suppressHydrationWarning>
      {/* Favicon Links */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}