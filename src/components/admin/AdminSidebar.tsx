"use client";

import {
	BarChart3,
	Calendar,
	LayoutDashboard,
	LogOut,
	Settings,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AdminSidebarProps {
	className?: string;
	onNavigate?: () => void;
}

export default function AdminSidebar({
	className = "",
	onNavigate,
}: AdminSidebarProps) {
	const pathname = usePathname();
	const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

	useEffect(() => {
		// Parse admin_user cookie
		const cookies = document.cookie.split('; ');
		const adminCookie = cookies.find(row => row.startsWith('admin_user='));
		if (adminCookie) {
			try {
				const userData = JSON.parse(decodeURIComponent(adminCookie.split('=')[1]));
				setAdminUser(userData);
			} catch (e) {
				console.error("Failed to parse admin user cookie", e);
			}
		}
	}, []);

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/auth/logout", { method: "POST" });
			if (response.ok) {
				toast.success("Logged out successfully");
				window.location.href = "/admin/login";
			} else {
				toast.error("Logout failed");
			}
		} catch (error) {
			toast.error("An error occurred during logout");
		}
	};

	const links = [
		{ label: "Dashboard", href: "/admin", icon: LayoutDashboard },
		{ label: "Bookings", href: "/admin/bookings", icon: Calendar },
		{ label: "Clients", href: "/admin/clients", icon: Users },
		{ label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
		{ label: "Settings", href: "/admin/settings", icon: Settings },
	];

	return (
		<aside
			className={`bg-card border-r border-border flex-col z-40 ${className}`}
		>
			{/* Logo Area */}
			<div className="h-20 flex items-center px-8 border-b border-border">
				<Link href="/" className="text-xl font-display font-bold">
					DrD<span className="text-primary">Solutions</span>
				</Link>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4 space-y-2 overflow-y-auto">
				{links.map((link) => {
					const isActive = pathname === link.href;
					return (
						<Link
							key={link.href}
							href={link.href}
							onClick={onNavigate}
							className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
								isActive
									? "bg-primary/10 text-primary"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							}`}
						>
							<link.icon size={20} />
							{link.label}
						</Link>
					);
				})}
			</nav>

			{/* Footer User Profile */}
			<div className="p-4 border-t border-border mt-auto space-y-3">
				<div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
					<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
						{adminUser?.name?.charAt(0) || "A"}
					</div>
					<div className="overflow-hidden">
						<p className="text-sm font-bold truncate">
							{adminUser?.name || "Admin User"}
						</p>
						<p className="text-xs text-muted-foreground truncate">
							{adminUser?.email || "admin@drdsolutions.com"}
						</p>
					</div>
				</div>

				<button 
					onClick={handleLogout}
					className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-xl transition-all group"
				>
					<LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
					Logout
				</button>
			</div>
		</aside>
	);
}
