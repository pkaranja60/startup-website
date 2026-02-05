"use client";

import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdminUser, normalizeEmail } from "@/lib/auth";

export default function AccountSettings() {
	const [showSuccess, setShowSuccess] = useState(false);
	const [email, setEmail] = useState("");

	useEffect(() => {
		const user = getAdminUser();
		if (user) {
			setEmail(user.email);
		}
	}, []);

	const handleSave = () => {
		setShowSuccess(true);
		toast.success("Settings saved successfully");
		setTimeout(() => setShowSuccess(false), 3000);
	};

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

			{/* Username/Email */}
			<div className="space-y-4">
				<div>
					<label className="text-sm font-medium mb-2 block">
						Email Address
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(normalizeEmail(e.target.value))}
						className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
					/>
				</div>

				{/* Password - Note: Next-auth/Supabase handles password reset via email usually */}
				<div className="flex gap-4">
					<div className="flex-1 opacity-60">
						<label className="text-sm font-medium mb-2 block">Password</label>
						<div className="relative">
							<input
								type="password"
								disabled
								value="••••••••••••"
								className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border cursor-not-allowed"
							/>
						</div>
					</div>
					<div className="flex-1">
						<label className="text-sm font-medium mb-2 block">
							Authentication Method
						</label>
						<p className="text-xs text-muted-foreground">
							Secure OTP-based login enabled for {email}.
						</p>
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
				
			</div>
		</div>
	);
}
