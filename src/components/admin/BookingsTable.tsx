"use client";

import { motion } from "framer-motion";
import {
	ArrowUpDown,
	Calendar,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Clock,
} from "lucide-react";
import { useState } from "react";

import { Booking } from "@/types/booking";

interface BookingsTableProps {
	bookings: Booking[];
	onViewDetails: (booking: Booking) => void;
	itemsPerPage?: number;
}

const STATUS_COLORS = {
	pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
	confirmed: "bg-primary/10 text-primary border-primary/30",
	completed: "bg-blue-500/10 text-blue-600 border-blue-500/30",
	cancelled: "bg-red-500/10 text-red-600 border-red-500/30",
	no_show: "bg-gray-500/10 text-gray-600 border-gray-500/30",
};

// Status priority for sorting
const STATUS_PRIORITY = {
	pending: 1,
	confirmed: 2,
	completed: 3,
	cancelled: 4,
	no_show: 5,
};

export default function BookingsTable({
	bookings,
	onViewDetails,
	itemsPerPage = 15,
}: BookingsTableProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	// Sort bookings: pending first (earliest to latest), then others, no_show last
	const sortedBookings = [...bookings].sort((a, b) => {
		// First sort by status priority
		const statusDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
		if (statusDiff !== 0) return statusDiff;

		// Within same status, sort by date and time
		const dateA = new Date(`${a.booking_date}T${a.booking_time}`);
		const dateB = new Date(`${b.booking_date}T${b.booking_time}`);

		// For pending, sort earliest first
		if (a.status === "pending") {
			return dateA.getTime() - dateB.getTime();
		}

		// For others, most recent first
		return dateB.getTime() - dateA.getTime();
	});

	// Pagination
	const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentBookings = sortedBookings.slice(startIndex, endIndex);

	const goToPage = (page: number) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	return (
		<div className="glass-card rounded-3xl overflow-hidden">
			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-muted/50 border-b-2 border-primary/20">
						<tr>
							<th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
								#
							</th>
							<th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
								Client Details
							</th>
							<th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
								<button
									onClick={() =>
										setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
									}
									className="inline-flex items-center gap-2 hover:text-primary transition-colors"
								>
									Date & Time
									<ArrowUpDown size={14} />
								</button>
							</th>
							<th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
								Project Info
							</th>
							<th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
								Status
							</th>
							<th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border-subtle">
						{currentBookings.map((booking, index) => {
							const globalIndex = startIndex + index + 1;
							const isUpcoming =
								new Date(booking.booking_date) >= new Date() &&
								["pending", "confirmed"].includes(booking.status);

							return (
								<motion.tr
									key={booking.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: index * 0.05 }}
									className={`hover:bg-muted/50 transition-all ${
										isUpcoming ? "bg-primary/5" : ""
									}`}
								>
									{/* Number */}
									<td className="px-4 py-4">
										<span className="text-sm font-bold text-text-tertiary">
											{globalIndex}
										</span>
									</td>

									{/* Client Details */}
									<td className="px-6 py-4">
										<div className="max-w-xs">
											<p className="font-bold text-sm truncate">
												{booking.client_name}
											</p>
											<p className="text-xs text-text-tertiary truncate">
												{booking.client_email}
											</p>
											{booking.client_phone && (
												<p className="text-xs text-text-tertiary">
													{booking.client_phone}
												</p>
											)}
											{booking.client_company && (
												<p className="text-xs text-primary/80 mt-1 truncate">
													{booking.client_company}
												</p>
											)}
										</div>
									</td>

									{/* Date & Time */}
									<td className="px-6 py-4">
										<div className="space-y-1">
											<div className="flex items-center gap-2 text-sm">
												<Calendar size={14} className="text-primary shrink-0" />
												<span className="font-medium">
													{new Date(booking.booking_date).toLocaleDateString(
														"en-US",
														{
															month: "short",
															day: "numeric",
															year: "numeric",
														},
													)}
												</span>
											</div>
											<div className="flex items-center gap-2 text-sm text-text-tertiary">
												<Clock size={14} className="shrink-0" />
												<span>{booking.booking_time}</span>
											</div>
											{isUpcoming && (
												<span className="inline-block text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
													Upcoming
												</span>
											)}
										</div>
									</td>

									{/* Project Info */}
									<td className="px-6 py-4">
										<div className="max-w-xs">
											<p className="text-sm font-medium truncate">
												{booking.project_type || "Not specified"}
											</p>
											{booking.project_budget && (
												<p className="text-xs text-text-tertiary mt-1">
													{booking.project_budget}
												</p>
											)}
											{booking.notes && (
												<p className="text-xs text-text-tertiary mt-1 truncate">
													{booking.notes.substring(0, 50)}...
												</p>
											)}
										</div>
									</td>

									{/* Status */}
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 ${STATUS_COLORS[booking.status]}`}
										>
											<span className="w-2 h-2 rounded-full bg-current animate-pulse" />
											{booking.status.charAt(0).toUpperCase() +
												booking.status.slice(1).replace("_", " ")}
										</span>
									</td>

									{/* Actions */}
									<td className="px-6 py-4">
										<button
											onClick={() => onViewDetails(booking)}
											className="text-primary hover:text-primary-hover text-sm font-bold transition-colors hover:underline"
										>
											View Details →
										</button>
									</td>
								</motion.tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="px-6 py-4 border-t border-border-subtle bg-muted/30">
					<div className="flex items-center justify-between">
						{/* Results Info */}
						<div className="text-sm text-text-tertiary">
							Showing{" "}
							<span className="font-bold text-foreground">
								{startIndex + 1}
							</span>{" "}
							to{" "}
							<span className="font-bold text-foreground">
								{Math.min(endIndex, sortedBookings.length)}
							</span>{" "}
							of{" "}
							<span className="font-bold text-foreground">
								{sortedBookings.length}
							</span>{" "}
							bookings
						</div>

						{/* Pagination Controls */}
						<div className="flex items-center gap-2">
							<button
								onClick={() => goToPage(1)}
								disabled={currentPage === 1}
								className="p-2 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border-subtle"
							>
								<ChevronsLeft size={18} />
							</button>
							<button
								onClick={() => goToPage(currentPage - 1)}
								disabled={currentPage === 1}
								className="p-2 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border-subtle"
							>
								<ChevronLeft size={18} />
							</button>

							{/* Page Numbers */}
							<div className="flex gap-2">
								{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
									let pageNum;
									if (totalPages <= 5) {
										pageNum = i + 1;
									} else if (currentPage <= 3) {
										pageNum = i + 1;
									} else if (currentPage >= totalPages - 2) {
										pageNum = totalPages - 4 + i;
									} else {
										pageNum = currentPage - 2 + i;
									}

									return (
										<button
											key={pageNum}
											onClick={() => goToPage(pageNum)}
											className={`w-10 h-10 rounded-xl font-bold transition-all ${
												currentPage === pageNum
													? "bg-primary text-background"
													: "bg-muted hover:bg-muted/80 border border-border-subtle"
											}`}
										>
											{pageNum}
										</button>
									);
								})}
							</div>

							<button
								onClick={() => goToPage(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="p-2 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border-subtle"
							>
								<ChevronRight size={18} />
							</button>
							<button
								onClick={() => goToPage(totalPages)}
								disabled={currentPage === totalPages}
								className="p-2 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border-subtle"
							>
								<ChevronsRight size={18} />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
