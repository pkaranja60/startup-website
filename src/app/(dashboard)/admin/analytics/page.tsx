"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import MetricsPanel from "@/components/admin/MetricsPanels";
import { Booking } from "@/types/booking";

export default function AnalyticsPage() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await fetch("/api/bookings");
				const data = await response.json();
				if (data.bookings) setBookings(data.bookings);
			} catch (error) {
				toast.error("Failed to load analytics data");
			} finally {
				setLoading(false);
			}
		};
		fetchBookings();
	}, []);

	if (loading) {
		return (
			<div className="flex h-96 items-center justify-center">
				<div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
			</div>
		);
	}

	return (
		<div className="p-4 sm:p-8">
			<div className="container mx-auto max-w-7xl">
				<div className="mb-8">
					<h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
						Analytics
					</h1>
					<p className="text-muted-foreground">
						Overview of booking performance and metrics
					</p>
				</div>

				<MetricsPanel bookings={bookings} />
			</div>
		</div>
	);
}
