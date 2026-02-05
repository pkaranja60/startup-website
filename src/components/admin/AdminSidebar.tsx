"use client";

import {
	BarChart3,
	Calendar,
	ExternalLink,
	FileText,
	LayoutDashboard,
	LogOut,
	Settings,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminUser, getAdminUser, handleLogout } from "@/lib/auth";

interface NavLink {
	label: string;
	href: string;
	icon: React.ElementType;
	isExternal?: boolean;
}

interface AdminSidebarProps {
	className?: string;
	onNavigate?: () => void;
}

export default function AdminSidebar({
	className = "",
	onNavigate,
}: AdminSidebarProps) {
	const pathname = usePathname();
	const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

	useEffect(() => {
		setAdminUser(getAdminUser());
	}, []);

	const navigation: { group: string; links: NavLink[] }[] = [
		{
			group: "General",
			links: [
				{ label: "Dashboard", href: "/admin", icon: LayoutDashboard },
				{ label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
			],
		},
		{
			group: "Business",
			links: [
				{ label: "Bookings", href: "/admin/bookings", icon: Calendar },
				{ label: "Clients", href: "/admin/clients", icon: Users },
			],
		},
		{
			group: "Content",
			links: [
				{
					label: "Sanity Studio",
					href: "/studio",
					icon: FileText,
					isExternal: true,
				},
			],
		},
		{
			group: "System",
			links: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
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
			<nav className="flex-1 p-4 space-y-8 overflow-y-auto">
				{navigation.map((section) => (
					<div key={section.group} className="space-y-2">
						<h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
							{section.group}
						</h3>
						<div className="space-y-1">
							{section.links.map((link: NavLink) => {
								const isActive = pathname === link.href;
								const LinkIcon = link.icon;

								return (
									<Link
										key={link.href}
										href={link.href}
										onClick={onNavigate}
										target={link.isExternal ? "_blank" : undefined}
										className={`flex items-center justify-between group px-4 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
											isActive
												? "bg-primary/10 text-primary shadow-sm"
												: "text-muted-foreground hover:bg-muted hover:text-foreground"
										}`}
									>
										<div className="flex items-center gap-3">
											<LinkIcon
												size={18}
												className={`${
													isActive
														? "text-primary"
														: "group-hover:text-foreground"
												} transition-colors`}
											/>
											{link.label}
										</div>
										{link.isExternal && (
											<ExternalLink
												size={14}
												className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-muted-foreground/50"
											/>
										)}
									</Link>
								);
							})}
						</div>
					</div>
				))}
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
					<LogOut
						size={18}
						className="group-hover:translate-x-1 transition-transform"
					/>
					Logout
				</button>
			</div>
		</aside>
	);
}
