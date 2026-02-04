"use client";

import { motion } from "framer-motion";
import {
	Activity,
	Bell,
	Clock,
	Database,
	Globe,
	LogOut,
	Mail,
	Monitor,
	Moon,
	Palette,
	Settings,
	Shield,
	Sun,
	User,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SettingsPanelProps {
	onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
	const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(true);
	const [autoApprove, setAutoApprove] = useState(false);
	const [accentColor, setAccentColor] = useState("primary");

	const handleSave = () => {
		toast.success("Settings saved successfully");
		onClose();
	};

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/auth/logout", { method: "POST" });
			if (response.ok) {
				toast.success("Logged out successfully");
				window.location.href = "/admin/login";
			} else {
				toast.error("Logout failed");
			}
		} catch (error: unknown) {
			console.error("Logout error:", error);
			toast.error("An error occurred during logout");
		}
	};

	const accentColors = [
		{ name: "Primary", value: "primary", color: "#00ff9d" },
		{ name: "Blue", value: "blue", color: "#3b82f6" },
		{ name: "Purple", value: "purple", color: "#a855f7" },
		{ name: "Pink", value: "pink", color: "#ec4899" },
		{ name: "Orange", value: "orange", color: "#f97316" },
	];

	return (
		<div
			className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="glass-card rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-primary/20 bg-card"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="relative bg-linear-to-br from-primary/20 to-accent/20 p-8 border-b border-border-subtle">
					<button
						onClick={onClose}
						className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-all"
					>
						✕
					</button>

					<div className="flex items-center gap-4">
						<div className="w-14 h-14 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
							<Settings size={24} className="text-primary" />
						</div>
						<div>
							<h2 className="text-2xl lg:text-3xl font-display font-bold">
								Settings
							</h2>
							<p className="text-sm text-text-tertiary">
								Customize your admin experience
							</p>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-8">
					<div className="space-y-8">
						{/* Appearance */}
						<section>
							<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
								<Palette size={20} className="text-primary" />
								Appearance
							</h3>

							<div className="space-y-4">
								{/* Theme */}
								<div className="glass-card p-4 rounded-xl border border-border-subtle">
									<label className="block text-sm font-bold mb-3">
										Theme Mode
									</label>
									<div className="grid grid-cols-3 gap-2">
										{[
											{ value: "light", icon: Sun, label: "Light" },
											{ value: "dark", icon: Moon, label: "Dark" },
											{ value: "system", icon: Monitor, label: "System" },
										].map((option) => (
											<button
												key={option.value}
												onClick={() =>
													setTheme(option.value as "light" | "dark" | "system")
												}
												className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
													theme === option.value
														? "bg-primary text-background"
														: "bg-muted hover:bg-muted/80"
												}`}
											>
												<option.icon size={18} />
												<span className="text-sm font-bold">
													{option.label}
												</span>
											</button>
										))}
									</div>
								</div>

								{/* Accent Color */}
								<div className="glass-card p-4 rounded-xl border border-border-subtle">
									<label className="block text-sm font-bold mb-3">
										Accent Color
									</label>
									<div className="flex gap-3">
										{accentColors.map((color) => (
											<button
												key={color.value}
												onClick={() => setAccentColor(color.value)}
												className={`w-12 h-12 rounded-xl transition-all ${
													accentColor === color.value
														? "ring-2 ring-white ring-offset-2 ring-offset-background scale-110"
														: "hover:scale-105"
												}`}
												style={{ backgroundColor: color.color }}
												title={color.name}
											/>
										))}
									</div>
								</div>
							</div>
						</section>

						{/* Notifications */}
						<section>
							<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
								<Bell size={20} className="text-primary" />
								Notifications
							</h3>

							<div className="space-y-3">
								<div className="glass-card p-4 rounded-xl border border-border-subtle flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Mail size={20} className="text-primary" />
										<div>
											<p className="font-bold text-sm">Email Notifications</p>
											<p className="text-xs text-text-tertiary">
												Receive booking updates via email
											</p>
										</div>
									</div>
									<button
										onClick={() => setEmailNotifications(!emailNotifications)}
										className={`w-12 h-6 rounded-full transition-all ${
											emailNotifications ? "bg-primary" : "bg-muted"
										}`}
									>
										<div
											className={`w-5 h-5 rounded-full bg-white transition-transform ${
												emailNotifications ? "translate-x-6" : "translate-x-0.5"
											}`}
										/>
									</button>
								</div>

								<div className="glass-card p-4 rounded-xl border border-border-subtle flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Bell size={20} className="text-primary" />
										<div>
											<p className="font-bold text-sm">Push Notifications</p>
											<p className="text-xs text-text-tertiary">
												Get instant browser notifications
											</p>
										</div>
									</div>
									<button
										onClick={() => setPushNotifications(!pushNotifications)}
										className={`w-12 h-6 rounded-full transition-all ${
											pushNotifications ? "bg-primary" : "bg-muted"
										}`}
									>
										<div
											className={`w-5 h-5 rounded-full bg-white transition-transform ${
												pushNotifications ? "translate-x-6" : "translate-x-0.5"
											}`}
										/>
									</button>
								</div>
							</div>
						</section>

						{/* Booking Settings */}
						<section>
							<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
								<Zap size={20} className="text-primary" />
								Booking Automation
							</h3>

							<div className="glass-card p-4 rounded-xl border border-border-subtle flex items-center justify-between">
								<div className="flex items-center gap-3">
									<Shield size={20} className="text-primary" />
									<div>
										<p className="font-bold text-sm">Auto-approve Bookings</p>
										<p className="text-xs text-text-tertiary">
											Automatically confirm new bookings
										</p>
									</div>
								</div>
								<button
									onClick={() => setAutoApprove(!autoApprove)}
									className={`w-12 h-6 rounded-full transition-all ${
										autoApprove ? "bg-primary" : "bg-muted"
									}`}
								>
									<div
										className={`w-5 h-5 rounded-full bg-white transition-transform ${
											autoApprove ? "translate-x-6" : "translate-x-0.5"
										}`}
									/>
								</button>
							</div>
						</section>

						{/* Active Session Info */}
						<section>
							<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
								<Activity size={20} className="text-primary" />
								Active Session
							</h3>

							<div className="glass-card p-4 rounded-xl border border-border-subtle space-y-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<User size={18} className="text-primary" />
										<span className="text-sm">Current User</span>
									</div>
									<span className="text-sm font-bold">
										admin@drdsolutions.com
									</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Clock size={18} className="text-primary" />
										<span className="text-sm">Session Started</span>
									</div>
									<span className="text-sm font-bold">
										{new Date().toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Globe size={18} className="text-primary" />
										<span className="text-sm">Location</span>
									</div>
									<span className="text-sm font-bold">Nairobi, Kenya</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Database size={18} className="text-primary" />
										<span className="text-sm">Database Status</span>
									</div>
									<span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400">
										<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
										Connected
									</span>
								</div>
							</div>
						</section>

						{/* Danger Zone */}
						<section>
							<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2 text-red-400">
								<Shield size={20} />
								Danger Zone
							</h3>

							<div className="glass-card p-4 rounded-xl border border-red-500/20 bg-red-500/5">
								<button
									onClick={handleLogout}
									className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-bold transition-all border-2 border-red-500/30"
								>
									<LogOut size={18} />
									Logout from Admin
								</button>
							</div>
						</section>
					</div>
				</div>

				{/* Footer */}
				<div className="border-t border-border-subtle p-6 bg-muted/30 flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-6 py-3 bg-muted hover:bg-muted/80 rounded-xl font-bold transition-all border border-border-subtle"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-6 py-3 bg-primary hover:bg-primary-hover text-background rounded-xl font-bold transition-all"
					>
						Save Changes
					</button>
				</div>
			</motion.div>
		</div>
	);
}
