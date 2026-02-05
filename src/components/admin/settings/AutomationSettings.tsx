"use client";

import { Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AutomationSettings() {
	const [autoApprove, setAutoApprove] = useState(false);

	const handleSave = () => {
		toast.success("Automation settings saved");
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-bold mb-2">Booking Automation</h1>
				<p className="text-muted-foreground text-sm">
					Automate booking workflows
				</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<Shield size={20} className="text-primary" />
						</div>
						<div>
							<p className="font-medium text-sm">Auto-approve Bookings</p>
							<p className="text-xs text-muted-foreground">
								Automatically confirm new bookings
							</p>
						</div>
					</div>
					<button
						onClick={() => setAutoApprove(!autoApprove)}
						className={`w-11 h-6 rounded-full transition-all ${
							autoApprove ? "bg-primary" : "bg-muted"
						}`}
					>
						<div
							className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
								autoApprove ? "translate-x-5" : "translate-x-0.5"
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
