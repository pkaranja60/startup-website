"use client";

import {
	Activity,
	Bell,
	Database,
	Lock,
	Palette,
	Shield,
	User,
	Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import AccountSettings from "@/components/admin/settings/AccountSettings";
import AppearanceSettings from "@/components/admin/settings/AppearanceSettings";
import AutomationSettings from "@/components/admin/settings/AutomationSettings";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";
import SessionSettings from "@/components/admin/settings/SessionSettings";

export default function SettingsPage() {
	const [mounted, setMounted] = useState(false);
	const [activeSection, setActiveSection] = useState("account");

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const menuItems = [
		{ id: "account", label: "Account Settings", icon: Shield },
		{ id: "password", label: "Password", icon: Lock },
		{ id: "notifications", label: "Notifications", icon: Bell },
		{ id: "appearance", label: "Appearance", icon: Palette },
		{ id: "automation", label: "Automation", icon: Zap },
		{ id: "sessions", label: "Sessions", icon: Activity },
	];

	return (
		<div className="min-h-screen bg-background">
			<div className="flex">
				{/* Sidebar */}
				<aside className="w-64 min-h-screen bg-card border-r border-border p-6 ml-14">
					<div className="mb-8">
						<div className="mb-5 pb-5 border-b border-border space-y-1">
							<h2 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">
								Settings
							</h2>
						</div>
						<nav className="space-y-1">
							{menuItems.map((item) => (
								<button
									key={item.id}
									onClick={() => setActiveSection(item.id)}
									className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
										activeSection === item.id
											? "bg-muted text-foreground"
											: "text-muted-foreground hover:bg-muted/50"
									}`}
								>
									<item.icon size={18} />
									{item.label}
								</button>
							))}
						</nav>

						<div className="mt-8 pt-8 border-t border-border space-y-1">
							<button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
								<Database size={18} />
								Data Export
							</button>
						</div>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-8 max-w-4xl">
					{/* Account Settings Section */}
					{activeSection === "account" && <AccountSettings />}

					{/* Appearance Section */}
					{activeSection === "appearance" && <AppearanceSettings />}

					{/* Notifications Section */}
					{activeSection === "notifications" && <NotificationSettings />}

					{/* Automation Section */}
					{activeSection === "automation" && <AutomationSettings />}

					{/* Sessions Section */}
					{activeSection === "sessions" && <SessionSettings />}

					{/* Password Section - Placeholder for now reusing Account or new component */}
					{activeSection === "password" && (
						<div className="p-8 text-center text-muted-foreground">
							Password settings coming soon...
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
