"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import BookingConfirmation from "../booking/BookingConfirmation";
import { BookingForm } from "../booking/BookingForm";
import DateSelector from "../booking/DateSelector";
import TimeSelector from "../booking/TimeSelector";

import { BookingFormValues } from "@/lib/bookingSchema";

const TIME_SLOTS = [
	"9:00 AM",
	"10:00 AM",
	"11:00 AM",
	"12:00 PM",
	"1:00 PM",
	"2:00 PM",
	"3:00 PM",
	"4:00 PM",
	"5:00 PM",
];

export default function BookingClient() {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [bookingData, setBookingData] = useState<any>(null);

	const handleConfirm = async (data: BookingFormValues) => {
		if (!selectedDate || !selectedTime) {
			setError("Please select a date and time.");
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			const payload = {
				client_name: data.client_name.trim(),
				client_email: data.client_email.trim().toLowerCase(),
				client_phone: data.client_phone || null,
				client_company: data.client_company || null,
				booking_date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
				booking_time: selectedTime,
				project_type: data.project_type || null,
				notes: data.notes || null,
			};

			const response = await fetch("/api/bookings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to book session");
			}

			setBookingData(result.booking);
			setIsConfirmed(true);

			// Optional analytics
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", "booking_completed", {
					event_category: "Booking",
					event_label: data.project_type,
					value: 1,
				});
			}
		} catch (err: any) {
			console.error("Booking error:", err);
			setError(
				err.message ||
					"Something went wrong. Please try again or contact us directly.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const resetBooking = () => {
		setIsConfirmed(false);
		setBookingData(null);
		setSelectedDate(null);
		setSelectedTime(null);
	};


	if (isConfirmed && bookingData) {
		return (
			<BookingConfirmation
				bookingData={bookingData}
				onBookAnother={resetBooking}
			/>
		);
	}

	return (
		<div className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
			<div className="container-max max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-12 lg:mb-16"
				>
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
						Book Your{" "}
						<span className="text-primary-gradient">Discovery Session</span>
					</h1>
					<p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
						Let's discuss your project and explore how we can bring your vision
						to life. Choose a convenient time for a free 60-minute consultation.
					</p>
				</motion.div>

				{/* Error Alert */}
				{error && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
					>
						⚠️ {error}
					</motion.div>
				)}

				{/* Date + Time */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
					<DateSelector
						selectedDate={selectedDate}
						onSelectDate={setSelectedDate}
					/>

					<TimeSelector
						selectedDate={selectedDate}
						selectedTime={selectedTime}
						onSelectTime={setSelectedTime}
						timeSlots={TIME_SLOTS}
					/>
				</div>

				{/* Booking Form */}
				<BookingForm
					selectedDate={selectedDate}
					selectedTime={selectedTime}
					isSubmitting={isSubmitting}
					onConfirm={handleConfirm}
				/>
			</div>
		</div>
	);
}
