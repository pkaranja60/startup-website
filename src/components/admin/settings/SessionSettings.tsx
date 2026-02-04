"use client";

import { Clock, Database, Globe, LogOut, User } from "lucide-react";
import { toast } from "sonner";

export default function SessionSettings() {
	const handleLogout = () => toast.success("Logged out successfully");

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-bold mb-2">Active Sessions</h1>
				<p className="text-muted-foreground text-sm">
					Manage your active login sessions
				</p>
			</div>

			<div className="space-y-4">
				<div className="p-4 rounded-lg border border-border bg-card">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-3">
							<Globe size={20} className="text-primary" />
							<div>
								<p className="font-medium text-sm">Current Session</p>
								<p className="text-xs text-muted-foreground">Nairobi, Kenya</p>
							</div>
						</div>
						<span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
							Active Now
						</span>
					</div>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<p className="text-muted-foreground mb-1">User</p>
							<p className="font-medium">admin@drdsolutions.com</p>
						</div>
						<div>
							<p className="text-muted-foreground mb-1">Started</p>
							<p className="font-medium">
								{new Date().toLocaleTimeString("en-US", {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						</div>
						<div>
							<p className="text-muted-foreground mb-1">Database</p>
							<p className="font-medium flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
								Connected
							</p>
						</div>
					</div>
				</div>

				<button
					onClick={handleLogout}
					className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-200 dark:border-red-800"
				>
					<LogOut size={18} />
					Logout from Admin
				</button>
			</div>
		</div>
	);
}
