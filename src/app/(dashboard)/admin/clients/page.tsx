"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClientDetailModal from "@/components/admin/ClientDetailModal";
import ClientsTable from "@/components/admin/ClientsTable";
import { Booking } from "@/types/booking";
import { Client } from "@/types/client";

export default function ClientsPage() {
	const [clients, setClients] = useState<Client[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedClient, setSelectedClient] = useState<Client | null>(null);

	useEffect(() => {
		fetchClients();
	}, []);

	const fetchClients = async () => {
		try {
			const response = await fetch("/api/bookings");
			const data = await response.json();

			if (data.bookings) {
				const clientMap = new Map<string, Client>();

				data.bookings.forEach((booking: Booking) => {
					const email = booking.client_email.toLowerCase();
					const existing = clientMap.get(email);

					if (existing) {
						existing.totalBookings += 1;
						existing.bookings.push(booking);
						if (
							new Date(booking.booking_date) > new Date(existing.lastBooking)
						) {
							existing.lastBooking = booking.booking_date;
						}
					} else {
						clientMap.set(email, {
							name: booking.client_name,
							email: booking.client_email,
							phone: booking.client_phone,
							company: booking.client_company,
							totalBookings: 1,
							lastBooking: booking.booking_date,
							bookings: [booking],
						});
					}
				});

				setClients(Array.from(clientMap.values()));
			}
		} catch (error) {
			console.error("Failed to fetch clients:", error);
			toast.error("Failed to load clients");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-4 sm:p-8">
			<div className="container mx-auto max-w-7xl">
				<div className="mb-8">
					<h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
						Clients
					</h1>
					<p className="text-muted-foreground">
						Manage your client base and booking history
					</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
					<div className="bg-card border border-border rounded-xl p-6">
						<p className="text-sm text-muted-foreground mb-1">Total Clients</p>
						<p className="text-3xl font-bold">{clients.length}</p>
					</div>
					<div className="bg-card border border-border rounded-xl p-6">
						<p className="text-sm text-muted-foreground mb-1">
							Active This Month
						</p>
						<p className="text-3xl font-bold">
							{
								clients.filter(
									(c) =>
										new Date(c.lastBooking) >= new Date(new Date().setDate(1)),
								).length
							}
						</p>
					</div>
					<div className="bg-card border border-border rounded-xl p-6">
						<p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
						<p className="text-3xl font-bold">
							{clients.reduce((sum, c) => sum + c.totalBookings, 0)}
						</p>
					</div>
				</div>

				{/* Clients Table */}
				<ClientsTable
					clients={clients}
					loading={loading}
					onViewDetails={setSelectedClient}
				/>
			</div>

			{/* Client Detail Modal */}
			<ClientDetailModal
				client={selectedClient}
				onClose={() => setSelectedClient(null)}
			/>
		</div>
	);
}
