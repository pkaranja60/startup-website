import { ReactNode } from "react";

interface ErrorsLayoutProps {
  children: ReactNode;
}

export default function ErrorsLayout({ children }: ErrorsLayoutProps) {
  return (
    <main>
      {/* You can still wrap with ThemeProvider if needed */}
   
        {children}
     
    </main>
  );
}
