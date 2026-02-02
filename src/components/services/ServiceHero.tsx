"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ServiceHeroProps {
	badge: {
		icon: React.ElementType;
		text: string;
		colorClass: string;
		bgClass: string;
		borderClass: string;
	};
	title: {
		main: string;
		highlight: string;
		highlightClass: string;
	};
	description: string;
	benefits?: string[];
	cta: {
		primary: {
			text: string;
			href: string;
			bgClass: string;
			shadowClass: string;
		};
		secondary?: {
			text: string;
			href: string;
		};
	};
	visual: React.ReactNode;
}

export default function ServiceHero({
	badge,
	title,
	description,
	benefits,
	cta,
	visual,
}: ServiceHeroProps) {
	const BadgeIcon = badge.icon;

	return (
		<section className="section-padding">
			<div className="container-max">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div
							className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badge.bgClass} border ${badge.borderClass} mb-6`}
						>
							<BadgeIcon size={16} className={badge.colorClass} />
							<span
								className={`text-xs font-bold ${badge.colorClass} uppercase tracking-widest`}
							>
								{badge.text}
							</span>
						</div>

						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
							{title.main}
							<br />
							<span className={title.highlightClass}>{title.highlight}</span>
						</h1>

						<p className="text-lg text-text-secondary mb-8 leading-relaxed">
							{description}
						</p>

						{/* Key Benefits */}
						{benefits && benefits.length > 0 && (
							<div className="space-y-3 mb-8">
								{benefits.map((benefit) => (
									<div key={benefit} className="flex items-center gap-3">
										<div
											className={`w-5 h-5 rounded-full ${badge.bgClass} flex items-center justify-center shrink-0`}
										>
											<CheckCircle2
												size={14}
												className={badge.colorClass}
												strokeWidth={3}
											/>
										</div>
										<span className="text-sm text-text-secondary">
											{benefit}
										</span>
									</div>
								))}
							</div>
						)}

						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								href={cta.primary.href}
								className={`inline-flex items-center justify-center gap-2 ${cta.primary.bgClass} hover:opacity-90 text-background px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-xl ${cta.primary.shadowClass} hover:scale-105`}
							>
								{cta.primary.text}
								<ArrowRight size={20} />
							</Link>
							{cta.secondary && (
								<Link
									href={cta.secondary.href}
									className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold border border-border-subtle hover:border-border-medium transition-all"
								>
									{cta.secondary.text}
								</Link>
							)}
						</div>
					</motion.div>

					{/* Right - Visual */}
					{visual}
				</div>
			</div>
		</section>
	);
}
