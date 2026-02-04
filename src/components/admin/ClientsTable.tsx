"use client";

import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Mail,
	Phone,
	Search,
} from "lucide-react";
import { useState } from "react";
import { Client } from "@/types/client";

interface ClientsTableProps {
	clients: Client[];
	onViewDetails: (client: Client) => void;
	loading: boolean;
	itemsPerPage?: number;
}

export default function ClientsTable({
	clients,
	onViewDetails,
	loading,
	itemsPerPage = 10,
}: ClientsTableProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const filteredClients = clients.filter(
		(client) =>
			client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.company?.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// Pagination logic
	const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentClients = filteredClients.slice(startIndex, endIndex);

	const goToPage = (page: number) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	// Reset to first page when searching
	const handleSearchChange = (query: string) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	return (
		<div>
			{/* Search */}
			<div className="mb-6">
				<div className="relative max-w-md w-full">
					<Search
						size={18}
						className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
					/>
					<input
						type="text"
						placeholder="Search clients by name, email, or company..."
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
					/>
				</div>
			</div>

			{/* Clients Table */}
			{loading ? (
				<div className="flex justify-center p-12">
					<div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
				</div>
			) : (
				<div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-muted/50 border-b border-border text-left">
								<tr>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
										Client
									</th>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
										Contact
									</th>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
										Company
									</th>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
										Bookings
									</th>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
										Last Session
									</th>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{currentClients.map((client) => (
									<tr
										key={client.email}
										className="hover:bg-muted/30 transition-colors"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
													{client.name.charAt(0)}
												</div>
												<div>
													<p className="font-medium text-sm">{client.name}</p>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="space-y-1 text-sm">
												<p className="text-muted-foreground flex items-center gap-2">
													<Mail size={14} />
													{client.email}
												</p>
												{client.phone && (
													<p className="text-muted-foreground flex items-center gap-2">
														<Phone size={14} />
														{client.phone}
													</p>
												)}
											</div>
										</td>
										<td className="px-6 py-4">
											<p className="text-sm">
												{client.company || (
													<span className="text-muted-foreground">—</span>
												)}
											</p>
										</td>
										<td className="px-6 py-4">
											<span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
												{client.totalBookings} session
												{client.totalBookings !== 1 && "s"}
											</span>
										</td>
										<td className="px-6 py-4">
											<p className="text-sm">
												{new Date(client.lastBooking).toLocaleDateString(
													"en-US",
													{
														month: "short",
														day: "numeric",
														year: "numeric",
													},
												)}
											</p>
										</td>
										<td className="px-6 py-4">
											<button
												onClick={() => onViewDetails(client)}
												className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors"
											>
												View Details
												<ChevronRight size={16} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{filteredClients.length === 0 ? (
						<div className="text-center py-12 text-muted-foreground">
							<p>No clients found</p>
						</div>
					) : (
						/* Pagination Controls */
						<div className="px-6 py-4 border-t border-border bg-muted/30">
							<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
								<div className="text-xs text-muted-foreground">
									Showing <span className="font-bold text-foreground">{startIndex + 1}</span> to{" "}
									<span className="font-bold text-foreground">
										{Math.min(endIndex, filteredClients.length)}
									</span>{" "}
									of <span className="font-bold text-foreground">{filteredClients.length}</span> clients
								</div>

								{totalPages > 1 && (
									<div className="flex items-center gap-2">
										<button
											onClick={() => goToPage(1)}
											disabled={currentPage === 1}
											className="p-2 rounded-lg bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border"
										>
											<ChevronsLeft size={16} />
										</button>
										<button
											onClick={() => goToPage(currentPage - 1)}
											disabled={currentPage === 1}
											className="p-2 rounded-lg bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border"
										>
											<ChevronLeft size={16} />
										</button>

										<div className="flex gap-1.5">
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
														className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
															currentPage === pageNum
																? "bg-primary text-background"
																: "bg-card hover:bg-muted border border-border"
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
											className="p-2 rounded-lg bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border"
										>
											<ChevronRight size={16} />
										</button>
										<button
											onClick={() => goToPage(totalPages)}
											disabled={currentPage === totalPages}
											className="p-2 rounded-lg bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border"
										>
											<ChevronsRight size={16} />
										</button>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
