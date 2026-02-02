"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

interface TimeSelectorProps {
	selectedDate: Date | null;
	selectedTime: string | null;
	onSelectTime: (time: string) => void;
	timeSlots: string[];
}

// Helper function to check if a time slot has passed
const isTimeSlotPassed = (
	selectedDate: Date | null,
	timeSlot: string,
): boolean => {
	if (!selectedDate) return false;

	const now = new Date();
	const isToday = selectedDate.toDateString() === now.toDateString();

	// If not today, all slots are available
	if (!isToday) return false;

	// Parse the time slot (e.g., "9:00 AM" or "2:30 PM")
	const [time, period] = timeSlot.split(" ");
	const [hours, minutes] = time.split(":").map(Number);

	// Convert to 24-hour format
	let hour24 = hours;
	if (period === "PM" && hours !== 12) {
		hour24 = hours + 12;
	} else if (period === "AM" && hours === 12) {
		hour24 = 0;
	}

	// Create a date object for the time slot
	const slotTime = new Date(selectedDate);
	slotTime.setHours(hour24, minutes || 0, 0, 0);

	// Add 1 hour buffer (optional - can't book within 1 hour)
	// const bufferTime = new Date(now.getTime() + 60 * 60 * 1000);
	const bufferTime = new Date(now.getTime());

	// Check if slot time has passed (with buffer)
	return slotTime < bufferTime;
};

export default function TimeSelector({
	selectedDate,
	selectedTime,
	onSelectTime,
	timeSlots,
}: TimeSelectorProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="glass-card rounded-3xl p-6 lg:p-8 lg:sticky lg:top-32"
		>
			{/* Header */}
			<div className="flex items-center gap-3 mb-6 lg:mb-8">
				<div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
					<Clock size={20} className="text-primary lg:w-[22px] lg:h-[22px]" />
				</div>
				<div>
					<h2 className="text-lg lg:text-xl font-display font-bold">
						Select a Time
					</h2>
					<p className="text-xs text-text-tertiary">Available time slots</p>
				</div>
			</div>

			<AnimatePresence mode="wait">
				{!selectedDate ? (
					<motion.div
						key="no-date"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="flex flex-col items-center justify-center h-48 lg:h-80 text-text-tertiary text-center"
					>
						<CalendarIcon
							size={40}
							className="mb-4 opacity-20 lg:w-12 lg:h-12"
						/>
						<p className="text-sm leading-relaxed px-4">
							Choose a date first
							<br />
							to see available time slots
						</p>
					</motion.div>
				) : (
					<motion.div
						key="times"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="space-y-4"
					>
						{/* Morning Slots */}
						<div>
							<p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3 px-1">
								Morning
							</p>
							<div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
								{timeSlots
									.filter((time) => time.includes("AM"))
									.map((time, index) => {
										const isSelected = selectedTime === time;
										const isPassed = isTimeSlotPassed(selectedDate, time);

										return (
											<motion.button
												key={time}
												initial={{ opacity: 0, scale: 0.9 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: index * 0.05 }}
												whileHover={!isPassed ? { scale: 1.03 } : {}}
												whileTap={!isPassed ? { scale: 0.97 } : {}}
												onClick={() => !isPassed && onSelectTime(time)}
												disabled={isPassed}
												className={`px-3 py-3 lg:px-4 lg:py-4 rounded-xl border transition-all duration-300 font-bold text-sm lg:text-base relative ${
													isPassed
														? "bg-background border-border-subtle text-text-tertiary opacity-40 cursor-not-allowed"
														: isSelected
															? "bg-primary border-primary text-background shadow-lg shadow-primary/30"
															: "bg-white/2 border-border-subtle hover:border-border-medium text-text-secondary hover:text-white hover:bg-white/5"
												}`}
											>
												{isPassed && (
													<span className="absolute inset-0 flex items-center justify-center">
														<span className="w-1/4 h-0.5 bg-text-tertiary/30 rotate-[-20deg]" />
													</span>
												)}
												{time}
											</motion.button>
										);
									})}
							</div>
						</div>

						{/* Afternoon Slots */}
						<div>
							<p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3 px-1">
								Afternoon
							</p>
							<div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
								{timeSlots
									.filter((time) => time.includes("PM"))
									.map((time, index) => {
										const isSelected = selectedTime === time;
										const isPassed = isTimeSlotPassed(selectedDate, time);

										return (
											<motion.button
												key={time}
												initial={{ opacity: 0, scale: 0.9 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: (index + 3) * 0.05 }}
												whileHover={!isPassed ? { scale: 1.03 } : {}}
												whileTap={!isPassed ? { scale: 0.97 } : {}}
												onClick={() => !isPassed && onSelectTime(time)}
												disabled={isPassed}
												className={`px-3 py-3 lg:px-4 lg:py-4 rounded-xl border transition-all duration-300 font-bold text-sm lg:text-base relative ${
													isPassed
														? "bg-background border-border-subtle text-text-tertiary opacity-40 cursor-not-allowed"
														: isSelected
															? "bg-primary border-primary text-background shadow-lg shadow-primary/30"
															: "bg-white/2 border-border-subtle hover:border-border-medium text-text-secondary hover:text-white hover:bg-white/5"
												}`}
											>
												{isPassed && (
													<span className="absolute inset-0 flex items-center justify-center">
														<span className="w-1/4 h-0.5 bg-text-tertiary/30 rotate-[-20deg]" />
													</span>
												)}
												{time}
											</motion.button>
										);
									})}
							</div>
						</div>

						{/* Timezone Note */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="mt-6 pt-6 border-t border-border-subtle"
						>
							<div className="flex items-center justify-center gap-2 text-xs text-text-tertiary">
								<Clock size={14} />
								<span>East Africa Time (EAT, UTC+3)</span>
							</div>
							{selectedDate?.toDateString() === new Date().toDateString() && (
								<p className="text-center text-xs text-text-tertiary mt-2">
									Past time slots are disabled
								</p>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
