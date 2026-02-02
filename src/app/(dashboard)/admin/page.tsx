"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import StatsCards from "@/components/admin/StatsCard";
import MetricsPanel from "@/components/admin/MetricsPanels";
import BookingsFilters from "@/components/admin/BookingsFilters";
import BookingsTable from "@/components/admin/BookingsTable";
import BookingDetailModal from "@/components/admin/BookingDetailModal";
import SettingsPanel from "@/components/admin/SettingsPanel";


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

export default function AdminDashboard() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
	const [showSettings, setShowSettings] = useState(false);

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
			toast.error("Failed to load bookings", {
				description: "Please refresh the page",
			});
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
				setSelectedBooking(null);

				// Send automatic completion email if status is completed
				if (newStatus === "completed") {
					await sendEmail(bookingId, "completion");
				}
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
		type: "approval" | "completion",
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
		const headers = [
			"#",
			"Date",
			"Time",
			"Name",
			"Email",
			"Phone",
			"Company",
			"Project Type",
			"Budget",
			"Status",
			"Notes",
		];
		const rows = filteredBookings.map((b, i) => [
			i + 1,
			b.booking_date,
			b.booking_time,
			b.client_name,
			b.client_email,
			b.client_phone || "",
			b.client_company || "",
			b.project_type || "",
			b.project_budget || "",
			b.status,
			b.notes || "",
		]);

		const csv = [
			headers.join(","),
			...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
		].join("\n");

		const blob = new Blob([csv], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
		a.click();

		toast.success("Export complete", {
			description: "Bookings exported to CSV",
		});
	};

	// Filter bookings
	const filteredBookings = bookings.filter((booking) => {
		const matchesSearch =
			booking.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			booking.client_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			booking.client_company?.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesSearch;
	});

	// Calculate stats
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

	return (
		<>
		
			<Toaster position="top-right" richColors closeButton theme="dark" />

			<div className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
				<div className="container-max max-w-[1400px] mx-auto">
					{/* Header */}
					<div className="flex items-center justify-between mb-12">
						<div>
							<h1 className="text-4xl lg:text-5xl font-display font-bold mb-2">
								Admin Dashboard
							</h1>
							<p className="text-text-secondary">
								Manage and track all discovery session bookings
							</p>
						</div>
						<button
							onClick={() => setShowSettings(true)}
							className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-border-subtle transition-all font-medium"
						>
							<SettingsIcon size={20} />
							Settings
						</button>
					</div>

					{/* Stats Cards */}
					<StatsCards stats={stats} />

					{/* Metrics Panel */}
					<MetricsPanel bookings={bookings} />

					{/* Filters */}
					<BookingsFilters
						searchQuery={searchQuery}
						selectedStatus={selectedStatus}
						onSearchChange={setSearchQuery}
						onStatusChange={setSelectedStatus}
						onExport={exportToCSV}
						onRefresh={fetchBookings}
					/>

					{/* Bookings Table */}
					{loading ? (
						<div className="glass-card rounded-3xl p-20 text-center">
							<div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
							<p className="text-text-tertiary">Loading bookings...</p>
						</div>
					) : filteredBookings.length === 0 ? (
						<div className="glass-card rounded-3xl p-20 text-center">
							<p className="text-text-tertiary text-lg mb-2">
								No bookings found
							</p>
							<p className="text-sm text-text-tertiary">
								{searchQuery
									? "Try adjusting your search"
									: "New bookings will appear here"}
							</p>
						</div>
					) : (
						<BookingsTable
							bookings={filteredBookings}
							onViewDetails={setSelectedBooking}
							itemsPerPage={15}
						/>
					)}
				</div>
			</div>

			{/* Modals */}
			{selectedBooking && (
				<BookingDetailModal
					booking={selectedBooking}
					onClose={() => setSelectedBooking(null)}
					onUpdateStatus={updateBookingStatus}
					onSendEmail={sendEmail}
				/>
			)}

			{showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

		
		</>
	);
}
