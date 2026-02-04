"use client";

import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Clock,
} from "lucide-react";
import { useState } from "react";
import { Booking } from "@/types/booking";

interface DashboardCalendarProps {
	bookings: Booking[];
}

export default function DashboardCalendar({
	bookings,
}: DashboardCalendarProps) {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	// Calendar logic
	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		return { daysInMonth, startingDayOfWeek };
	};

	const getBookingsForDate = (date: Date) => {
		return bookings.filter((b) => {
			const bookingDate = new Date(b.booking_date);
			return (
				bookingDate.getDate() === date.getDate() &&
				bookingDate.getMonth() === date.getMonth() &&
				bookingDate.getFullYear() === date.getFullYear() &&
				["pending", "confirmed"].includes(b.status)
			);
		});
	};

	const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

	const previousMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
		);
	};

	const nextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
		);
	};

	const selectedBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

	return (
		<div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col overflow-hidden">
			<div className="flex items-center justify-between mb-6 shrink-0">
				<h2 className="text-xl font-display font-bold flex items-center gap-2">
					<CalendarIcon size={24} className="text-primary" />
					Calendar
				</h2>
				<div className="flex items-center gap-2">
					<button
						onClick={previousMonth}
						className="p-2 hover:bg-muted rounded-lg transition-colors"
					>
						<ChevronLeft size={18} />
					</button>
					<span className="text-sm font-medium min-w-[140px] text-center">
						{currentDate.toLocaleDateString("en-US", {
							month: "long",
							year: "numeric",
						})}
					</span>
					<button
						onClick={nextMonth}
						className="p-2 hover:bg-muted rounded-lg transition-colors"
					>
						<ChevronRight size={18} />
					</button>
				</div>
			</div>

			{/* Scrollable Content Area */}
			<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
				{/* Calendar Grid */}
				<div className="space-y-2">
					{/* Weekday headers */}
					<div className="grid grid-cols-7 gap-2 mb-2">
						{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
							<div
								key={day}
								className="text-center text-xs font-bold text-muted-foreground py-2"
							>
								{day}
							</div>
						))}
					</div>

					{/* Calendar days */}
					<div className="grid grid-cols-7 gap-2">
						{Array.from({ length: startingDayOfWeek }).map((_, i) => (
							<div key={`empty-${i}`} />
						))}
						{Array.from({ length: daysInMonth }).map((_, i) => {
							const day = i + 1;
							const date = new Date(
								currentDate.getFullYear(),
								currentDate.getMonth(),
								day,
							);
							const dayBookings = getBookingsForDate(date);
							const isToday = date.toDateString() === today.toDateString();
							const isSelected =
								selectedDate?.toDateString() === date.toDateString();

							return (
								<button
									key={day}
									onClick={() => setSelectedDate(date)}
									className={`aspect-square p-2 rounded-lg text-sm font-medium transition-all relative ${
										isToday
											? "bg-primary text-primary-foreground"
											: isSelected
												? "bg-muted border-2 border-primary"
												: "hover:bg-muted"
									}`}
								>
									<span>{day}</span>
									{dayBookings.length > 0 && (
										<div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
											{dayBookings.slice(0, 3).map((_, idx) => (
												<div
													key={idx}
													className={`w-1 h-1 rounded-full ${
														isToday ? "bg-primary-foreground" : "bg-primary"
													}`}
												/>
											))}
										</div>
									)}
								</button>
							);
						})}
					</div>
				</div>

				{/* Selected Date Bookings */}
				{selectedDate && (
					<div className="mt-6 pt-6 border-t border-border pb-2">
						<h3 className="text-sm font-bold mb-4">
							Bookings for{" "}
							{selectedDate.toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</h3>
						{selectedBookings.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								No bookings for this date
							</p>
						) : (
							<div className="space-y-2">
								{selectedBookings.map((booking) => (
									<div
										key={booking.id}
										className="p-3 rounded-lg bg-muted/50 flex items-center justify-between"
									>
										<div>
											<p className="text-sm font-medium">
												{booking.client_name}
											</p>
											<p className="text-xs text-muted-foreground">
												{booking.booking_time} •{" "}
												{booking.project_type || "Consultation"}
											</p>
										</div>
										<span
											className={`text-xs px-2 py-1 rounded-full ${
												booking.status === "confirmed"
													? "bg-green-500/10 text-green-600 dark:text-green-400"
													: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
											}`}
										>
											{booking.status}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
