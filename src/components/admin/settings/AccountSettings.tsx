"use client";

import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountSettings() {
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSave = () => {
		setShowSuccess(true);
		toast.success("Settings saved successfully");
		setTimeout(() => setShowSuccess(false), 3000);
	};

	const handleLogout = () => toast.success("Logged out successfully");

	return (
		<div className="space-y-8">
			{showSuccess && (
				<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top">
					<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-6 py-3 flex items-center gap-3 shadow-lg">
						<CheckCircle
							className="text-green-600 dark:text-green-400"
							size={20}
						/>
						<span className="text-green-800 dark:text-green-200 font-medium">
							Your Account Settings changes have been saved successfully.
						</span>
					</div>
				</div>
			)}

			<div>
				<h1 className="text-2xl font-bold mb-2">Account Settings</h1>
				<p className="text-muted-foreground text-sm">
					Manage your account details and preferences
				</p>
			</div>

			{/* Username */}
			<div className="space-y-4">
				<div>
					<label className="text-sm font-medium mb-2 block">Username</label>
					<input
						type="text"
						defaultValue="admin@company.org"
						className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
					/>
				</div>

				{/* Password */}
				<div className="flex gap-4">
					<div className="flex-1">
						<label className="text-sm font-medium mb-2 block">Password</label>
						<div className="relative">
							<input
								type="password"
								defaultValue="••••••••••••"
								className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
							/>
						</div>
					</div>
					<div className="flex-1">
						<label className="text-sm font-medium mb-2 block">
							Password Requirements
						</label>
						<div className="space-y-1 text-xs text-muted-foreground">
							<p>1. At least 8 characters</p>
							<p>2. At least one uppercase letter</p>
							<p>3. At least one number</p>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
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

			{/* Analytics */}
			<div className="pt-8 border-t border-border">
				<h2 className="text-xl font-bold mb-4">Analytics</h2>
				<div>
					<label className="text-sm font-medium mb-2 block">
						Google Analytics Tracking Code
					</label>
					<input
						type="text"
						placeholder="UA-000000000-0"
						className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all mb-2"
					/>
					<p className="text-xs text-blue-600 dark:text-blue-400">
						ⓘ Track views in your Google Analytics account
					</p>
				</div>
			</div>

			{/* Delete Account */}
			<div className="pt-8 border-t border-border">
				<h2 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">
					Delete Account
				</h2>
				<p className="text-sm text-muted-foreground mb-4">
					Deleting your account is permanent and cannot be reversed.
				</p>
				<button
					onClick={handleLogout}
					className="px-6 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-200 dark:border-red-800"
				>
					Delete Account
				</button>
			</div>
		</div>
	);
}
