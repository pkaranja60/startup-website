"use client";

import { motion } from "framer-motion";
import {
	Calendar as CalendarIcon,
	CheckCircle2,
	Clock,
	Video,
} from "lucide-react";
import Link from "next/link";

interface BookingConfirmationProps {
	bookingData: {
		booking_date: string;
		booking_time: string;
		meeting_link?: string;
	};
	onBookAnother?: () => void;
}

export default function BookingConfirmation({
	bookingData,
	onBookAnother,
}: BookingConfirmationProps) {
	const bookingDate = new Date(bookingData.booking_date);

	const formatShortDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="max-w-3xl max-h-screen mx-auto px-4 pt-32 pb-10">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="glass-card rounded-3xl lg:rounded-[2.5rem] p-8 sm:p-10 lg:p-16 text-center relative overflow-hidden"
			>
				{/* Success Animation Background */}
				<div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 lg:w-96 lg:h-96 bg-primary/20 rounded-full blur-3xl" />

				<div className="relative z-10">
					{/* Success Icon */}
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
						className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 lg:mb-8 shadow-2xl shadow-primary/40"
					>
						<CheckCircle2
							size={32}
							className="text-background lg:w-10 lg:h-10"
							strokeWidth={2.5}
						/>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-3 lg:mb-4"
					>
						Booking Confirmed!
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="text-base lg:text-lg text-text-secondary mb-8 lg:mb-10 leading-relaxed px-4"
					>
						Your discovery call is scheduled. Check your inbox for the calendar
						invitation.
					</motion.p>

					{/* Booking Details */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="bg-white/5 rounded-2xl p-6 lg:p-8 mb-6 lg:mb-8 border border-border-subtle"
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="text-left">
								<div className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3">
									Date
								</div>
								<div className="flex items-center gap-3 font-semibold text-base lg:text-lg">
									<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
										<CalendarIcon size={18} className="text-primary" />
									</div>
									<span className="wrap-break-words">
										{formatShortDate(bookingDate)}
									</span>
								</div>
							</div>
							<div className="text-left">
								<div className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3">
									Time
								</div>
								<div className="flex items-center gap-3 font-semibold text-base lg:text-lg">
									<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
										<Clock size={18} className="text-primary" />
									</div>
									{bookingData.booking_time}
								</div>
							</div>
						</div>
					</motion.div>

					{/* Meeting Link */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						className="bg-linear-to-br from-primary/10 to-accent/10 rounded-xl p-5 lg:p-6 mb-8 lg:mb-10 border border-primary/20"
					>
						<div className="flex items-center justify-center gap-2 mb-3">
							<Video size={18} className="text-primary lg:w-5 lg:h-5" />
							<p className="text-sm font-bold text-foreground">
								Your Google Meet Link
							</p>
						</div>
						<code className="block bg-black/30 p-3 lg:p-4 rounded-lg text-theme font-mono text-sm break-all border border-border-subtle">
							{bookingData.meeting_link}
						</code>
						<p className="text-xs text-text-tertiary mt-3">
							This link has been sent to your email
						</p>
					</motion.div>

					{/* Action Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7 }}
						className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center"
					>
						<Link
							href="/"
							className="bg-primary hover:bg-primary-hover text-background px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold text-sm lg:text-base transition-all duration-300 shadow-lg shadow-primary/30 hover:scale-105 active:scale-95"
						>
							Back to Home
						</Link>
						{onBookAnother && (
							<button
								onClick={onBookAnother}
								className="bg-white/5 hover:bg-white/10 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold text-sm lg:text-base border border-border-subtle hover:border-border-medium transition-all duration-300 hover:scale-105 active:scale-95"
							>
								Book Another
							</button>
						)}
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
