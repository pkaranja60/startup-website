import { ReactNode } from "react";
import "../globals.css";
import { ThemeProvider } from "next-themes";

interface ErrorsLayoutProps {
  children: ReactNode;
}

export default function ErrorsLayout({ children }: ErrorsLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>
       <ThemeProvider attribute="class" defaultTheme="system">
           {children}
       </ThemeProvider>
          </main>
      </body>
    </html>
  );
}
