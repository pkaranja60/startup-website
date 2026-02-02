"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Briefcase,
	Building,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	ExternalLink,
	FileText,
	Mail,
	Phone,
	Send,
	User,
	X,
	XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Booking {
	id: string;
	client_name: string;
	client_email: string;
	client_phone?: string;
	client_company?: string;
	booking_date: string;
	booking_time: string;
	project_type?: string;
	project_budget?: string;
	notes?: string;
	google_meet_link?: string;
	status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
	confirmation_sent_at?: string;
	created_at: string;
	admin_notes?: string;
}

interface BookingDetailModalProps {
	booking: Booking | null;
	onClose: () => void;
	onUpdateStatus: (bookingId: string, status: string) => Promise<void>;
	onSendEmail: (
		bookingId: string,
		type: "approval" | "completion",
	) => Promise<void>;
}

const STATUS_COLORS = {
	pending: {
		dot: "bg-yellow-900",
		text: "text-yellow-700 dark:text-yellow-400",
	},
	confirmed: {
		dot: "bg-green-900",
		text: "text-green-700 dark:text-green-400",
	},
	completed: { dot: "bg-blue-900", text: "text-blue-700 dark:text-blue-400" },
	cancelled: { dot: "bg-red-900", text: "text-red-700 dark:text-red-400" },
	no_show: { dot: "bg-gray-900", text: "text-gray-700 dark:text-gray-400" },
};

export default function BookingDetailModal({
	booking,
	onClose,
	onUpdateStatus,
	onSendEmail,
}: BookingDetailModalProps) {
	const [adminNotes, setAdminNotes] = useState(booking?.admin_notes || "");
	const [selectedStatus, setSelectedStatus] = useState(booking?.status);

	if (!booking) return null;

	const handleStatusUpdate = async (newStatus: string) => {
		try {
			await onUpdateStatus(booking.id, newStatus);
			setSelectedStatus(newStatus as any);
			toast.success(`Status updated to ${newStatus}`);
		} catch (error) {
			toast.error("Failed to update status");
		}
	};

	const handleSendEmail = async (type: "approval" | "completion") => {
		try {
			await onSendEmail(booking.id, type);
			toast.success(
				`${type === "approval" ? "Approval" : "Completion"} email sent`,
			);
		} catch (error) {
			toast.error("Failed to send email");
		}
	};

	const handleSave = () => {
		// Save admin notes logic here
		toast.success("Booking updated successfully");
		onClose();
	};

	return (
		<AnimatePresence>
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
				onClick={onClose}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.2 }}
					className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-border"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="px-6 py-5 border-b border-border flex items-center justify-between">
						<h2 className="text-xl font-bold">Booking Details</h2>
						<button
							onClick={onClose}
							className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
						>
							<X size={18} />
						</button>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-y-auto p-6 space-y-6">
						{/* Client Name */}
						<div>
							<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
								Client Name *
							</label>
							<input
								type="text"
								value={booking.client_name}
								readOnly
								className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm"
								placeholder="e.g. John Doe"
							/>
						</div>

						{/* Date and Time Row */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
									Date *
								</label>
								<div className="relative">
									<Calendar
										size={16}
										className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<input
										type="text"
										value={new Date(booking.booking_date).toLocaleDateString(
											"en-US",
											{
												month: "short",
												day: "numeric",
												year: "numeric",
											},
										)}
										readOnly
										className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm"
									/>
								</div>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
									Time *
								</label>
								<div className="relative">
									<Clock
										size={16}
										className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<input
										type="text"
										value={booking.booking_time}
										readOnly
										className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm"
									/>
								</div>
							</div>
						</div>

						{/* Email and Phone Row */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
									Email *
								</label>
								<div className="relative">
									<Mail
										size={16}
										className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<input
										type="email"
										value={booking.client_email}
										readOnly
										className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm"
									/>
								</div>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
									Phone
								</label>
								<div className="relative">
									<Phone
										size={16}
										className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<input
										type="tel"
										value={booking.client_phone || "Not provided"}
										readOnly
										className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm"
									/>
								</div>
							</div>
						</div>

						{/* Project Type and Budget Row */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
									Project Type *
								</label>
								<div className="relative">
									<Briefcase
										size={16}
										className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<input
										type="text"
										value={booking.project_type || "Not specified"}
										readOnly
										className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm"
									/>
								</div>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
									Company
								</label>
								<div className="relative">
									<Building
										size={16}
										className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<input
										type="text"
										value={booking.client_company || "Not provided"}
										readOnly
										className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm"
									/>
								</div>
							</div>
						</div>

						{/* Status Row */}
						<div>
							<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
								Status *
							</label>
							<div className="flex flex-wrap gap-2">
								{[
									"pending",
									"confirmed",
									"completed",
									"cancelled",
									"no_show",
								].map((status) => (
									<button
										key={status}
										onClick={() => handleStatusUpdate(status)}
										className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
											selectedStatus === status
												? `${STATUS_COLORS[status as keyof typeof STATUS_COLORS].dot.replace("bg-", "bg-opacity-20 bg-")} ${STATUS_COLORS[status as keyof typeof STATUS_COLORS].text} border-${STATUS_COLORS[status as keyof typeof STATUS_COLORS].dot.replace("bg-", "")}`
												: "bg-muted hover:bg-muted/80 border-border text-muted-foreground"
										}`}
										style={{
											borderColor:
												selectedStatus === status ? "currentColor" : undefined,
											backgroundColor:
												selectedStatus === status ? undefined : undefined,
										}}
									>
										{status.charAt(0).toUpperCase() +
											status.slice(1).replace("_", " ")}
									</button>
								))}
							</div>
						</div>

						{/* Google Meet Link */}
						{booking.google_meet_link && (
							<div>
								<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
									Meeting Link
								</label>
								<div className="relative">
									<ExternalLink
										size={16}
										className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<a
										href={booking.google_meet_link}
										target="_blank"
										rel="noopener noreferrer"
										className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm block hover:bg-muted/80 transition-colors text-primary"
									>
										{booking.google_meet_link}
									</a>
								</div>
							</div>
						)}

						{/* Client Notes */}
						{booking.notes && (
							<div>
								<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
									Client Notes
								</label>
								<div className="p-4 rounded-lg bg-muted border border-border text-sm leading-relaxed">
									{booking.notes}
								</div>
							</div>
						)}

						{/* Admin Notes */}
						<div>
							<label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
								Admin Notes (Internal)
							</label>
							<textarea
								value={adminNotes}
								onChange={(e) => setAdminNotes(e.target.value)}
								placeholder="Add any additional details or notes about this booking..."
								className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-sm resize-none h-24 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
							/>
						</div>

						{/* Email Actions */}
						<div className="flex gap-3">
							<button
								onClick={() => handleSendEmail("approval")}
								disabled={booking.status !== "confirmed"}
								className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<Send size={16} />
								Send Approval Email
							</button>
							<button
								onClick={() => handleSendEmail("completion")}
								disabled={booking.status !== "completed"}
								className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<CheckCircle size={16} />
								Send Completion Email
							</button>
						</div>
					</div>

					{/* Footer */}
					<div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
						<button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								className="opacity-50"
							>
								<path
									d="M6 1v10M1 6h10"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
							Contact Support
						</button>
						<div className="flex gap-3">
							<button
								onClick={onClose}
								className="px-5 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								className="px-5 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
							>
								Save Booking
							</button>
						</div>
					</div>
				</motion.div>
			</div>
		</AnimatePresence>
	);
}
