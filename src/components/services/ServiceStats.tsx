"use client";

import { motion } from "framer-motion";
import React from "react";

interface ServiceStat {
	value: string;
	label: string;
	icon?: React.ElementType;
}

interface ServiceStatsProps {
	stats: ServiceStat[];
	gradientTextClass?: string; 	
	iconColorClass?: string; 
}

export default function ServiceStats({
	stats,
	gradientTextClass = "text-primary-gradient",
	iconColorClass = "text-primary",
}: ServiceStatsProps) {
	return (
		<section className="section-padding bg-linear-to-b from-background to-surface">
			<div className="container-max">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="text-center"
							>
								{Icon && (
									<Icon
										size={32}
										className={`${iconColorClass} mx-auto mb-4`}
									/>
								)}
								<div
									className={`text-4xl lg:text-5xl font-display font-bold ${gradientTextClass} bg-clip-text text-transparent mb-2`}
								>
									{stat.value}
								</div>
								<div className="text-sm text-text-tertiary uppercase tracking-wider">
									{stat.label}
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
