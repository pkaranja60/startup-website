import { ReactNode } from "react";
import "../globals.css";

interface ErrorsLayoutProps {
  children: ReactNode;
}

export default function ErrorsLayout({ children }: ErrorsLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
