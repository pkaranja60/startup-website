"use client";

import { motion } from "framer-motion";
import {
	Activity,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Target,
	TrendingUp,
	Users,
} from "lucide-react";

interface StatsCardsProps {
	stats: {
		total: number;
		pending: number;
		confirmed: number;
		completed: number;
		cancelled: number;
		no_show: number;
		upcoming: number;
		thisWeek: number;
		thisMonth: number;
		avgPerDay: string | number;
	};
}

export default function StatsCards({ stats }: StatsCardsProps) {
	const cards = [
		{
			label: "Total Bookings",
			value: stats.total,
			icon: Calendar,
			color: "primary",
			bgColor: "bg-primary/10",
			textColor: "text-primary",
			trend: "+12%",
		},
		{
			label: "Pending Review",
			value: stats.pending,
			icon: Clock,
			color: "yellow-400",
			bgColor: "bg-yellow-400/10",
			textColor: "text-yellow-600",
			urgent: stats.pending > 5,
		},
		{
			label: "Confirmed",
			value: stats.confirmed,
			icon: CheckCircle,
			color: "green-400",
			bgColor: "bg-green-400/10",
			textColor: "text-green-600",
		},
		{
			label: "Upcoming",
			value: stats.upcoming,
			icon: TrendingUp,
			color: "blue-400",
			bgColor: "bg-blue-400/10",
			textColor: "text-blue-600",
		},
		{
			label: "Completed",
			value: stats.completed,
			icon: Target,
			color: "purple-400",
			bgColor: "bg-purple-400/10",
			textColor: "text-purple-600",
		},
		{
			label: "This Week",
			value: stats.thisWeek,
			icon: Activity,
			color: "cyan-400",
			bgColor: "bg-cyan-400/10",
			textColor: "text-cyan-600",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
			{cards.map((card, i) => (
				<motion.div
					key={card.label}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: i * 0.05 }}
					className={`glass-card p-4 lg:p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
						card.urgent
							? "border-yellow-400/30 animate-pulse"
							: "border-transparent"
					}`}
				>
					<div className="flex items-start justify-between mb-3">
						<div
							className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}
						>
							<card.icon size={20} className={card.textColor} />
						</div>
						{card.trend && (
							<span className="text-xs text-green-600 font-bold">
								{card.trend}
							</span>
						)}
					</div>
					<p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">
						{card.label}
					</p>
					<p className={`text-3xl font-display font-bold ${card.textColor}`}>
						{card.value}
					</p>
				</motion.div>
			))}
		</div>
	);
}
