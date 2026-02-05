"use client";

import { Download, Filter, RefreshCw, Search } from "lucide-react";

interface BookingsFiltersProps {
	searchQuery: string;
	selectedStatus: string;
	onSearchChange: (query: string) => void;
	onStatusChange: (status: string) => void;
	onExport: () => void;
	onRefresh: () => void;
}

export default function BookingsFilters({
	searchQuery,
	selectedStatus,
	onSearchChange,
	onStatusChange,
	onExport,
	onRefresh,
}: BookingsFiltersProps) {
	const statuses = [
		{ value: "all", label: "All Bookings", count: null },
		{ value: "pending", label: "Pending", count: null },
		{ value: "confirmed", label: "Confirmed", count: null },
		{ value: "completed", label: "Completed", count: null },
		{ value: "cancelled", label: "Cancelled", count: null },
		{ value: "no_show", label: "No Show", count: null },
	];

	return (
		<div className="glass-card rounded-2xl p-6 mb-8 border border-border-subtle">
			<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
				{/* Search */}
				<div className="relative grow max-w-md w-full">
					<Search
						size={18}
						className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
					/>
					<input
						type="text"
						placeholder="Search by name, email, or company..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
					/>
				</div>

				{/* Status Filter */}
				<div className="flex items-center gap-3 flex-wrap">
					<div className="flex items-center gap-2 text-sm text-text-tertiary">
						<Filter size={16} />
						<span className="font-bold hidden sm:inline">Filter:</span>
					</div>
					{statuses.map((status) => (
						<button
							key={status.value}
							onClick={() => onStatusChange(status.value)}
							className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
								selectedStatus === status.value
									? "bg-primary text-background shadow-lg shadow-primary/30"
									: "bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground border border-border-subtle"
							}`}
						>
							{status.label}
						</button>
					))}
				</div>

				{/* Actions */}
				<div className="flex gap-2">
					<button
						onClick={onRefresh}
						className="inline-flex items-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl border border-border-subtle transition-all text-sm font-medium group"
						title="Refresh"
					>
						<RefreshCw
							size={18}
							className="group-hover:rotate-180 transition-transform duration-500"
						/>
					</button>
					<button
						onClick={onExport}
						className="inline-flex items-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl border border-border-subtle transition-all text-sm font-medium"
					>
						<Download size={18} />
						<span className="hidden sm:inline">Export</span>
					</button>
				</div>
			</div>
		</div>
	);
}
