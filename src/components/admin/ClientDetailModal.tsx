"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building, Calendar, Clock, Mail, Phone, X } from "lucide-react";
import { Client } from "@/types/client";

interface ClientDetailModalProps {
	client: Client | null;
	onClose: () => void;
}

export default function ClientDetailModal({
	client,
	onClose,
}: ClientDetailModalProps) {
	return (
		<AnimatePresence>
			{client && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={onClose}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="bg-card rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-border"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="px-6 py-5 border-b border-border flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
									{client.name.charAt(0)}
								</div>
								<div>
									<h2 className="text-xl font-bold">{client.name}</h2>
									<p className="text-sm text-muted-foreground">
										Client Profile
									</p>
								</div>
							</div>
							<button
								onClick={onClose}
								className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
							>
								<X size={18} />
							</button>
						</div>

						{/* Content */}
						<div className="flex-1 overflow-y-auto p-6 space-y-6">
							{/* Contact Info */}
							<div>
								<h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
									Contact Information
								</h3>
								<div className="space-y-3">
									<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
										<Mail size={18} className="text-primary" />
										<div>
											<p className="text-xs text-muted-foreground mb-0.5">
												Email
											</p>
											<a
												href={`mailto:${client.email}`}
												className="text-sm hover:text-primary transition-colors"
											>
												{client.email}
											</a>
										</div>
									</div>
									{client.phone && (
										<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
											<Phone size={18} className="text-primary" />
											<div>
												<p className="text-xs text-muted-foreground mb-0.5">
													Phone
												</p>
												<a
													href={`tel:${client.phone}`}
													className="text-sm hover:text-primary transition-colors"
												>
													{client.phone}
												</a>
											</div>
										</div>
									)}
									{client.company && (
										<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
											<Building size={18} className="text-primary" />
											<div>
												<p className="text-xs text-muted-foreground mb-0.5">
													Company
												</p>
												<p className="text-sm">{client.company}</p>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Booking History */}
							<div>
								<h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
									Booking History ({client.totalBookings} sessions)
								</h3>
								<div className="space-y-3">
									{client.bookings
										.sort(
											(a, b) =>
												new Date(b.booking_date).getTime() -
												new Date(a.booking_date).getTime(),
										)
										.map((booking) => (
											<div
												key={booking.id}
												className="p-4 rounded-lg border border-border bg-card hover:bg-muted/20 transition-colors"
											>
												<div className="flex items-start justify-between mb-2">
													<div>
														<p className="font-medium text-sm mb-1">
															{booking.project_type || "Discovery Session"}
														</p>
														<div className="flex items-center gap-3 text-xs text-muted-foreground">
															<span className="flex items-center gap-1">
																<Calendar size={12} />
																{new Date(
																	booking.booking_date,
																).toLocaleDateString("en-US", {
																	month: "short",
																	day: "numeric",
																	year: "numeric",
																})}
															</span>
															<span className="flex items-center gap-1">
																<Clock size={12} />
																{booking.booking_time}
															</span>
														</div>
													</div>
													<span
														className={`px-2 py-1 rounded-full text-xs font-medium ${
															booking.status === "completed"
																? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
																: booking.status === "confirmed"
																	? "bg-green-500/10 text-green-600 dark:text-green-400"
																	: booking.status === "pending"
																		? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
																		: "bg-gray-500/10 text-gray-600 dark:text-gray-400"
														}`}
													>
														{booking.status.charAt(0).toUpperCase() +
															booking.status.slice(1)}
													</span>
												</div>
												{booking.notes && (
													<p className="text-xs text-muted-foreground mt-2 line-clamp-2">
														{booking.notes}
													</p>
												)}
											</div>
										))}
								</div>
							</div>
						</div>

						{/* Footer */}
						<div className="px-6 py-4 border-t border-border flex justify-end gap-3">
							<button
								onClick={onClose}
								className="px-5 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
							>
								Close
							</button>
							<a
								href={`mailto:${client.email}`}
								className="px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
							>
								Email Client
							</a>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
