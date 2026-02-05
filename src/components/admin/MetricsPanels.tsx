"use client";

import { motion } from "framer-motion";
import {
	BarChart3,
	Calendar,
	Clock,
	PieChart,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { Booking } from "@/types/booking";

interface MetricsPanelProps {
	bookings: Booking[];
}

export default function MetricsPanel({ bookings }: MetricsPanelProps) {
	// Calculate metrics
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

	const metrics = {
		totalRevenue: bookings
			.filter((b) => b.status === "completed")
			.reduce((sum, b) => {
				// Extract budget value (simplified)
				const budget = b.project_budget || "";
				if (budget.includes("500K")) return sum + 500000;
				if (budget.includes("1M")) return sum + 1000000;
				if (budget.includes("3M")) return sum + 3000000;
				return sum;
			}, 0),

		completionRate:
			bookings.length > 0
				? (
						(bookings.filter((b) => b.status === "completed").length /
							bookings.length) *
						100
					).toFixed(1)
				: 0,

		avgResponseTime: "2.5h", // This would need to be calculated from timestamps

		noShowRate:
			bookings.length > 0
				? (
						(bookings.filter((b) => b.status === "no_show").length /
							bookings.length) *
						100
					).toFixed(1)
				: 0,

		thisWeekBookings: bookings.filter((b) => new Date(b.created_at) >= weekAgo)
			.length,

		lastWeekBookings: bookings.filter((b) => {
			const created = new Date(b.created_at);
			return (
				created >= new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000) &&
				created < weekAgo
			);
		}).length,

		popularProjectType: (() => {
			const types: Record<string, number> = {};
			bookings.forEach((b) => {
				if (b.project_type) {
					types[b.project_type] = (types[b.project_type] || 0) + 1;
				}
			});
			return Object.entries(types).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
		})(),

		avgSessionsPerDay:
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

		upcomingThisWeek: bookings.filter((b) => {
			const bookingDate = new Date(b.booking_date);
			const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
			return (
				bookingDate >= today &&
				bookingDate <= weekEnd &&
				["pending", "confirmed"].includes(b.status)
			);
		}).length,

		cancelRate:
			bookings.length > 0
				? (
						(bookings.filter((b) => b.status === "cancelled").length /
							bookings.length) *
						100
					).toFixed(1)
				: 0,
	};

	const weekGrowth =
		metrics.lastWeekBookings > 0
			? (
					((metrics.thisWeekBookings - metrics.lastWeekBookings) /
						metrics.lastWeekBookings) *
					100
				).toFixed(1)
			: 0;

	const metricCards = [
		{
			label: "Completion Rate",
			value: `${metrics.completionRate}%`,
			icon: BarChart3,
			color: "text-green-600",
			bg: "bg-green-400/10",
			trend: "+5%",
			trendUp: true,
		},
		{
			label: "Weekly Growth",
			value: `${weekGrowth}%`,
			icon: TrendingUp,
			color: Number(weekGrowth) >= 0 ? "text-green-600" : "text-red-600",
			bg: Number(weekGrowth) >= 0 ? "bg-green-400/10" : "bg-red-400/10",
			trend: `${metrics.thisWeekBookings} this week`,
			trendUp: Number(weekGrowth) >= 0,
		},
		{
			label: "No-Show Rate",
			value: `${metrics.noShowRate}%`,
			icon: TrendingDown,
			color:
				Number(metrics.noShowRate) > 10 ? "text-red-600" : "text-green-600",
			bg: Number(metrics.noShowRate) > 10 ? "bg-red-400/10" : "bg-green-400/10",
			trend: "Target: <5%",
			trendUp: Number(metrics.noShowRate) < 5,
		},
		{
			label: "Avg Response Time",
			value: metrics.avgResponseTime,
			icon: Clock,
			color: "text-blue-600",
			bg: "bg-blue-400/10",
			trend: "Last 7 days",
			trendUp: true,
		},
		{
			label: "Popular Service",
			value: metrics.popularProjectType,
			icon: PieChart,
			color: "text-purple-600",
			bg: "bg-purple-400/10",
			trend: "Most requested",
			trendUp: true,
		},
		{
			label: "Upcoming Sessions",
			value: metrics.upcomingThisWeek,
			icon: Calendar,
			color: "text-cyan-600",
			bg: "bg-cyan-400/10",
			trend: "This week",
			trendUp: true,
		},
	];

	return (
		<div className="mb-8">
			<div className="mb-6">
				<h2 className="text-2xl font-display font-bold">Performance Metrics</h2>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
				{metricCards.map((metric, i) => (
					<motion.div
						key={metric.label}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.05 }}
						className="glass-card p-3 rounded-2xl border border-border-subtle hover:border-primary/30 transition-all"
					>
						<div className="flex items-start justify-between mb-3">
							<div
								className={`w-10 h-10 rounded-xl ${metric.bg} flex items-center justify-center`}
							>
								<metric.icon size={20} className={metric.color} />
							</div>
							{metric.trendUp ? (
								<TrendingUp size={16} className="text-green-600" />
							) : (
								<TrendingDown size={16} className="text-red-600" />
							)}
						</div>

						<p
							className={`text-sm md:text-2xl font-display font-bold mb-1 ${metric.color}`}
						>
							{metric.value}
						</p>

						<p className="text-xs text-text-tertiary mb-2 font-bold uppercase tracking-wider">
							{metric.label}
						</p>

						<p className="text-xs text-text-tertiary">{metric.trend}</p>
					</motion.div>
				))}
			</div>
		</div>
	);
}
