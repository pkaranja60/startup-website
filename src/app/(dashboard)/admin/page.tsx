"use client";

import {
	ArrowRight,
	Calendar as CalendarIcon,
	Clock,
	User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardCalendar from "@/components/admin/DashboardCalendar";
import StatsCards from "@/components/admin/StatsCard";
import { Booking } from "@/types/booking";

export default function AdminDashboard() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await fetch("/api/bookings");
				const data = await response.json();
				if (data.bookings) setBookings(data.bookings);
			} catch (error) {
				toast.error("Failed to load dashboard data");
			} finally {
				setLoading(false);
			}
		};
		fetchBookings();
	}, []);

	// Stats calculation
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

	const stats = {
		total: bookings.length,
		pending: bookings.filter((b) => b.status === "pending").length,
		confirmed: bookings.filter((b) => b.status === "confirmed").length,
		completed: bookings.filter((b) => b.status === "completed").length,
		cancelled: bookings.filter((b) => b.status === "cancelled").length,
		no_show: bookings.filter((b) => b.status === "no_show").length,
		upcoming: bookings.filter(
			(b) =>
				new Date(b.booking_date) >= today &&
				["pending", "confirmed"].includes(b.status),
		).length,
		thisWeek: bookings.filter((b) => new Date(b.created_at) >= weekAgo).length,
		thisMonth: bookings.filter((b) => new Date(b.created_at) >= monthStart)
			.length,
		avgPerDay:
			bookings.length > 0
				? (
						bookings.length /
						Math.max(
							1,
							Math.ceil(
								(now.getTime() -
									new Date(
										bookings[bookings.length - 1]?.created_at || now,
									).getTime()) /
									(1000 * 60 * 60 * 24),
							),
						)
					).toFixed(1)
				: 0,
	};

	const upcomingBookings = bookings
		.filter(
			(b) =>
				new Date(b.booking_date) >= today &&
				["pending", "confirmed"].includes(b.status),
		)
		.sort(
			(a, b) =>
				new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime(),
		)
		.slice(0, 10);

	return (
		<div className="p-4 sm:p-8">
			<div className="container mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
					<div>
						<h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
							Dashboard
						</h1>
						<p className="text-muted-foreground">
							Overview of your startup&apos;s performance
						</p>
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg">
						<Clock size={16} />
						<span>
							Last updated:{" "}
							{new Date().toLocaleTimeString("en-US", {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
					</div>
				</div>

				{/* Stats Cards */}
				<StatsCards stats={stats} />

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 h-full">
					{/* Calendar - Takes 2 columns on large screens */}
					<div className="lg:col-span-2 lg:h-[700px]">
						<DashboardCalendar bookings={bookings} />
					</div>

					{/* Right Column - Upcoming Sessions */}
					<div className="lg:h-[700px]">
						<div className="bg-card h-full border border-border rounded-2xl p-6 overflow-hidden flex flex-col">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-display font-bold">
									Upcoming Sessions
								</h2>
								<Link
									href="/admin/bookings"
									className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors"
								>
									View All <ArrowRight size={14} />
								</Link>
							</div>

							<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
								{loading ? (
									<div className="flex justify-center p-8">
										<div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
									</div>
								) : upcomingBookings.length === 0 ? (
									<p className="text-center py-8 text-sm text-muted-foreground">
										No upcoming sessions
									</p>
								) : (
									upcomingBookings.map((booking) => (
										<div
											key={booking.id}
											className="p-4 rounded-xl border border-border hover:bg-muted/30 transition-all"
										>
											<div className="flex items-start gap-3 mb-3">
												<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
													<User size={18} />
												</div>
												<div className="flex-1 min-w-0">
													<p className="font-medium text-sm mb-1 truncate">
														{booking.client_name}
													</p>
													<p className="text-xs text-muted-foreground">
														{booking.project_type || "Consultation"}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-4 text-xs text-muted-foreground">
												<span className="flex items-center gap-1">
													<CalendarIcon size={12} />
													{new Date(booking.booking_date).toLocaleDateString(
														"en-US",
														{
															month: "short",
															day: "numeric",
														},
													)}
												</span>
												<span className="flex items-center gap-1">
													<Clock size={12} />
													{booking.booking_time}
												</span>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
