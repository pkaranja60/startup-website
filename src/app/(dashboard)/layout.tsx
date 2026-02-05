"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ThemeInitializer from "@/components/admin/ThemeInitializer";
import { AUTH_ROUTES } from "@/lib/auth";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const isLoginPage = pathname === AUTH_ROUTES.LOGIN;

	if (isLoginPage) {
		return (
			<div className="min-h-screen bg-background">
				<ThemeInitializer />
				<main>{children}</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-muted/20">
			<ThemeInitializer />
			{/* Desktop Sidebar */}
			<AdminSidebar className="hidden lg:flex fixed left-0 top-0 h-screen w-64" />

			{/* Mobile Header */}
			<header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-30 flex items-center justify-between px-4">
				<Link href="/" className="text-lg font-display font-bold">
					DrD<span className="text-primary">Solutions</span>
				</Link>
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="p-2 -mr-2 text-foreground hover:bg-muted rounded-lg transition-colors"
				>
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</header>

			{/* Mobile Sidebar Overlay */}
			{isMobileMenuOpen && (
				<div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
					<div className="absolute inset-y-0 left-0 w-64 max-w-[80vw]">
						<AdminSidebar
							className="h-full w-full shadow-2xl"
							onNavigate={() => setIsMobileMenuOpen(false)}
						/>
					</div>
					{/* Close on backdrop click */}
					<div
						className="absolute inset-0 z-[-1]"
						onClick={() => setIsMobileMenuOpen(false)}
					/>
				</div>
			)}

			{/* Main Content Area */}
			<main className="lg:pl-64 flex flex-col min-h-screen pt-16 lg:pt-0 transition-all">
				{children}
			</main>
		</div>
	);
}
