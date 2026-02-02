"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	AlertCircle,
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
		bg: "bg-yellow-500/10",
		text: "text-yellow-400",
		border: "border-yellow-500/30",
	},
	confirmed: {
		bg: "bg-primary/10",
		text: "text-primary",
		border: "border-primary/30",
	},
	completed: {
		bg: "bg-blue-500/10",
		text: "text-blue-400",
		border: "border-blue-500/30",
	},
	cancelled: {
		bg: "bg-red-500/10",
		text: "text-red-400",
		border: "border-red-500/30",
	},
	no_show: {
		bg: "bg-gray-500/10",
		text: "text-gray-400",
		border: "border-gray-500/30",
	},
};

export default function BookingDetailModal({
	booking,
	onClose,
	onUpdateStatus,
	onSendEmail,
}: BookingDetailModalProps) {
	if (!booking) return null;

	const handleStatusUpdate = async (newStatus: string) => {
		try {
			await onUpdateStatus(booking.id, newStatus);
			toast.success(`Status updated to ${newStatus}`, {
				description: "The booking has been updated successfully",
				icon: <CheckCircle size={20} />,
			});
		} catch (error) {
			toast.error("Failed to update status", {
				description: "Please try again",
				icon: <XCircle size={20} />,
			});
		}
	};

	const handleSendEmail = async (type: "approval" | "completion") => {
		try {
			await onSendEmail(booking.id, type);
			toast.success(
				`${type === "approval" ? "Approval" : "Completion"} email sent`,
				{
					description: `Email sent to ${booking.client_email}`,
					icon: <Send size={20} />,
				},
			);
		} catch (error) {
			toast.error("Failed to send email", {
				description: "Please try again",
				icon: <XCircle size={20} />,
			});
		}
	};

	const statusColor = STATUS_COLORS[booking.status];

	return (
		<AnimatePresence>
			<div
				className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
				onClick={onClose}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					transition={{ duration: 0.2 }}
					className="glass-card rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-primary/20"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="relative bg-linear-to-br from-primary/20 to-accent/20 p-8 border-b border-border-subtle">
						<button
							onClick={onClose}
							className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all"
						>
							<X size={20} />
						</button>

						<div className="flex items-start gap-4">
							<div className="w-14 h-14 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0">
								<User size={24} className="text-primary" />
							</div>
							<div className="flex-1">
								<h2 className="text-2xl lg:text-3xl font-display font-bold mb-2">
									{booking.client_name}
								</h2>
								<div className="flex flex-wrap items-center gap-3">
									<span
										className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
									>
										<span className="w-2 h-2 rounded-full bg-current animate-pulse" />
										{booking.status.charAt(0).toUpperCase() +
											booking.status.slice(1).replace("_", " ")}
									</span>
									{booking.confirmation_sent_at && (
										<span className="text-xs text-text-tertiary bg-white/5 px-3 py-1.5 rounded-full">
											Confirmation sent ✓
										</span>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-y-auto p-8">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* Left Column - Client Info */}
							<div className="space-y-6">
								{/* Contact Information */}
								<div className="glass-card p-6 rounded-2xl border border-border-subtle">
									<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
										<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
											<User size={16} className="text-primary" />
										</div>
										Contact Information
									</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
											<Mail size={18} className="text-primary shrink-0" />
											<div className="flex-1 min-w-0">
												<p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-0.5">
													Email
												</p>
												<a
													href={`mailto:${booking.client_email}`}
													className="text-sm hover:text-primary transition-colors truncate block"
												>
													{booking.client_email}
												</a>
											</div>
										</div>
										{booking.client_phone && (
											<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
												<Phone size={18} className="text-primary shrink-0" />
												<div className="flex-1">
													<p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-0.5">
														Phone
													</p>
													<a
														href={`tel:${booking.client_phone}`}
														className="text-sm hover:text-primary transition-colors"
													>
														{booking.client_phone}
													</a>
												</div>
											</div>
										)}
										{booking.client_company && (
											<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
												<Building size={18} className="text-primary shrink-0" />
												<div className="flex-1">
													<p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-0.5">
														Company
													</p>
													<p className="text-sm">{booking.client_company}</p>
												</div>
											</div>
										)}
									</div>
								</div>

								{/* Session Details */}
								<div className="glass-card p-6 rounded-2xl border border-border-subtle">
									<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
										<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
											<Calendar size={16} className="text-primary" />
										</div>
										Session Details
									</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
											<Calendar size={18} className="text-primary shrink-0" />
											<div className="flex-1">
												<p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-0.5">
													Date
												</p>
												<p className="text-sm font-bold">
													{new Date(booking.booking_date).toLocaleDateString(
														"en-US",
														{
															weekday: "long",
															year: "numeric",
															month: "long",
															day: "numeric",
														},
													)}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
											<Clock size={18} className="text-primary shrink-0" />
											<div className="flex-1">
												<p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-0.5">
													Time
												</p>
												<p className="text-sm font-bold">
													{booking.booking_time} EAT
												</p>
											</div>
										</div>
										{booking.google_meet_link && (
											<div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
												<p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-2">
													Google Meet Link
												</p>
												<a
													href={booking.google_meet_link}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-hover font-medium transition-colors break-all"
												>
													{booking.google_meet_link}
													<ExternalLink size={14} className="shrink-0" />
												</a>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Right Column - Project Info */}
							<div className="space-y-6">
								{/* Project Information */}
								<div className="glass-card p-6 rounded-2xl border border-border-subtle">
									<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
										<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
											<Briefcase size={16} className="text-primary" />
										</div>
										Project Information
									</h3>
									<div className="space-y-3">
										{booking.project_type && (
											<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
												<Briefcase
													size={18}
													className="text-primary shrink-0"
												/>
												<div className="flex-1">
													<p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-0.5">
														Project Type
													</p>
													<p className="text-sm font-bold">
														{booking.project_type}
													</p>
												</div>
											</div>
										)}
										{booking.project_budget && (
											<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
												<DollarSign
													size={18}
													className="text-primary shrink-0"
												/>
												<div className="flex-1">
													<p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-0.5">
														Budget Range
													</p>
													<p className="text-sm font-bold">
														{booking.project_budget}
													</p>
												</div>
											</div>
										)}
									</div>
								</div>

								{/* Notes */}
								{booking.notes && (
									<div className="glass-card p-6 rounded-2xl border border-border-subtle">
										<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
											<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
												<FileText size={16} className="text-primary" />
											</div>
											Client Notes
										</h3>
										<div className="p-4 rounded-xl bg-white/5 text-sm leading-relaxed">
											{booking.notes}
										</div>
									</div>
								)}

								{/* Admin Notes */}
								<div className="glass-card p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
									<h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
										<AlertCircle size={18} className="text-yellow-400" />
										Admin Notes
									</h3>
									<textarea
										placeholder="Add internal notes about this booking..."
										defaultValue={booking.admin_notes || ""}
										className="w-full h-24 px-4 py-3 rounded-xl bg-white/5 border border-border-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Footer - Actions */}
					<div className="border-t border-border-subtle p-6 bg-white/2">
						<div className="space-y-4">
							{/* Status Actions */}
							<div>
								<p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-3">
									Update Status
								</p>
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
											disabled={booking.status === status}
											className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
												booking.status === status
													? `${STATUS_COLORS[status as keyof typeof STATUS_COLORS].bg} ${STATUS_COLORS[status as keyof typeof STATUS_COLORS].text} border-2 ${STATUS_COLORS[status as keyof typeof STATUS_COLORS].border} cursor-default`
													: "bg-white/5 hover:bg-white/10 border-2 border-border-subtle text-text-secondary hover:text-white"
											}`}
										>
											{status.charAt(0).toUpperCase() +
												status.slice(1).replace("_", " ")}
										</button>
									))}
								</div>
							</div>

							{/* Email Actions */}
							<div>
								<p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-3">
									Email Actions
								</p>
								<div className="flex flex-wrap gap-3">
									<button
										onClick={() => handleSendEmail("approval")}
										disabled={booking.status !== "confirmed"}
										className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-background rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Send size={18} />
										Send Approval Email
									</button>
									<button
										onClick={() => handleSendEmail("completion")}
										disabled={booking.status !== "completed"}
										className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<CheckCircle size={18} />
										Send Completion Email
									</button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</AnimatePresence>
	);
}
