"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import BookingDetailModal from "@/components/admin/BookingDetailModal";
import BookingsFilters from "@/components/admin/BookingsFilters";
import BookingsTable from "@/components/admin/BookingsTable";
import { Booking } from "@/types/booking";

export default function BookingsPage() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

	useEffect(() => {
		fetchBookings();
	}, [selectedStatus]);

	const fetchBookings = async () => {
		setLoading(true);
		try {
			const url =
				selectedStatus === "all"
					? "/api/bookings"
					: `/api/bookings?status=${selectedStatus}`;

			const response = await fetch(url);
			const data = await response.json();

			if (data.bookings) {
				setBookings(data.bookings);
			}
		} catch (error) {
			console.error("Failed to fetch bookings:", error);
			toast.error("Failed to load bookings");
		} finally {
			setLoading(false);
		}
	};

	const updateBookingStatus = async (bookingId: string, newStatus: string) => {
		try {
			const response = await fetch(`/api/bookings/${bookingId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: newStatus }),
			});

			if (response.ok) {
				await fetchBookings();
				setSelectedBooking(
					(prev) => (prev ? { ...prev, status: newStatus } : null) as Booking,
				);
			} else {
				throw new Error("Failed to update status");
			}
		} catch (error) {
			console.error("Failed to update status:", error);
			throw error;
		}
	};

	const sendEmail = async (
		bookingId: string,
		type: "approval" | "completion" | "cancelled",
	) => {
		try {
			const response = await fetch(`/api/bookings/${bookingId}/email`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ type }),
			});

			if (!response.ok) {
				throw new Error("Failed to send email");
			}
		} catch (error) {
			console.error("Failed to send email:", error);
			throw error;
		}
	};

	const exportToCSV = () => {
		const headers = ["Date", "Name", "Email", "Company", "Status"];
		const rows = filteredBookings.map((b) => [
			b.booking_date,
			b.client_name,
			b.client_email,
			b.client_company || "",
			b.status,
		]);

		const csv = [
			headers.join(","),
			...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
		].join("\n");

		const blob = new Blob([csv], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `bookings-export.csv`;
		a.click();
		toast.success("Export complete");
	};

	const filteredBookings = bookings.filter((booking) => {
		return (
			booking.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			booking.client_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			booking.client_company?.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	return (
		<div className="p-4 sm:p-8">
			<div className="container mx-auto max-w-7xl">
				<div className="mb-8">
					<h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
						Bookings
					</h1>
					<p className="text-muted-foreground">
						Manage and track all discovery session bookings
					</p>
				</div>

				<BookingsFilters
					searchQuery={searchQuery}
					selectedStatus={selectedStatus}
					onSearchChange={setSearchQuery}
					onStatusChange={setSelectedStatus}
					onExport={exportToCSV}
					onRefresh={fetchBookings}
				/>

				{loading ? (
					<div className="glass-card rounded-3xl p-20 text-center">
						<div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
						<p className="text-muted-foreground">Loading bookings...</p>
					</div>
				) : filteredBookings.length === 0 ? (
					<div className="glass-card rounded-3xl p-20 text-center">
						<p className="text-muted-foreground text-lg mb-2">
							No bookings found
						</p>
					</div>
				) : (
					<BookingsTable
						bookings={filteredBookings}
						onViewDetails={setSelectedBooking}
						itemsPerPage={10}
					/>
				)}

				{selectedBooking && (
					<BookingDetailModal
						booking={selectedBooking}
						onClose={() => setSelectedBooking(null)}
						onUpdateStatus={updateBookingStatus}
						onSendEmail={sendEmail}
					/>
				)}
			</div>
		</div>
	);
}
