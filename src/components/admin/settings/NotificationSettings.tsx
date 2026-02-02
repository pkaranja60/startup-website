"use client";

import { Bell, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NotificationSettings() {
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(true);

	const handleSave = () => {
		toast.success("Notification settings saved");
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-bold mb-2">Notifications</h1>
				<p className="text-muted-foreground text-sm">
					Choose how you want to be notified
				</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<Mail size={20} className="text-primary" />
						</div>
						<div>
							<p className="font-medium text-sm">Email Notifications</p>
							<p className="text-xs text-muted-foreground">
								Receive booking updates via email
							</p>
						</div>
					</div>
					<button
						onClick={() => setEmailNotifications(!emailNotifications)}
						className={`w-11 h-6 rounded-full transition-all ${
							emailNotifications ? "bg-primary" : "bg-muted"
						}`}
					>
						<div
							className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
								emailNotifications ? "translate-x-5" : "translate-x-0.5"
							}`}
						/>
					</button>
				</div>

				<div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<Bell size={20} className="text-primary" />
						</div>
						<div>
							<p className="font-medium text-sm">Push Notifications</p>
							<p className="text-xs text-muted-foreground">
								Get instant browser notifications
							</p>
						</div>
					</div>
					<button
						onClick={() => setPushNotifications(!pushNotifications)}
						className={`w-11 h-6 rounded-full transition-all ${
							pushNotifications ? "bg-primary" : "bg-muted"
						}`}
					>
						<div
							className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
								pushNotifications ? "translate-x-5" : "translate-x-0.5"
							}`}
						/>
					</button>
				</div>

				<div className="flex gap-3 pt-4">
					<button className="px-6 py-2.5 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors">
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors"
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
}
