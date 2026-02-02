import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main>
      {/* You can still wrap with ThemeProvider if needed */}
   
        {children}
     
    </main>
  );
}
