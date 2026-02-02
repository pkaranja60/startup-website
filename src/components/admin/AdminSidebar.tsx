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

interface AdminSidebarProps {
	className?: string;
	onNavigate?: () => void;
}

export default function AdminSidebar({
	className = "",
	onNavigate,
}: AdminSidebarProps) {
	const pathname = usePathname();

	const links = [
		{
			label: "Dashboard",
			href: "/admin",
			icon: LayoutDashboard,
		},
		{
			label: "Bookings",
			href: "/admin/bookings",
			icon: Calendar,
		},
		{
			label: "Clients",
			href: "/admin/clients",
			icon: Users,
		},
		{
			label: "Analytics",
			href: "/admin/analytics",
			icon: BarChart3,
		},
		{
			label: "Settings",
			href: "/admin/settings",
			icon: Settings,
		},
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
			<div className="p-4 border-t border-border mt-auto">
				<div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 mb-3">
					<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
						AD
					</div>
					<div className="overflow-hidden">
						<p className="text-sm font-bold truncate">Admin User</p>
						<p className="text-xs text-muted-foreground truncate">
							admin@nexustech.com
						</p>
					</div>
				</div>
				<button className="w-full flex items-center justify-start gap-2 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-sm font-bold">
					<LogOut size={16} />
					Logout
				</button>
			</div>
		</aside>
	);
}
