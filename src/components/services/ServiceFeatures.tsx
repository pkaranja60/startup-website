"use client";

import { motion } from "framer-motion";
import React from "react";

interface ServiceFeature {
	title: string;
	description: string;
	icon: React.ElementType;
}

interface ServiceFeaturesProps {
	title: string;
	description: string;
	features: ServiceFeature[];
	iconColorClass?: string;
	iconBgClass?: string;
	iconBorderClass?: string;
}

export default function ServiceFeatures({
	title,
	description,
	features,
	iconColorClass = "text-primary",
	iconBgClass = "bg-primary/10",
	iconBorderClass = "border-primary/20",
}: ServiceFeaturesProps) {
	const fadeIn = {
		initial: { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, margin: "-100px" },
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
	};

	return (
		<section className="section-padding bg-linear-to-b from-background to-surface">
			<div className="container-max">
				<motion.div {...fadeIn} className="text-center mb-16">
					<h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
						{title}
					</h2>
					<p className="text-text-secondary max-w-2xl mx-auto">{description}</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="glass-card rounded-3xl p-8 hover:bg-white/5 transition-all"
							>
								<div
									className={`w-16 h-16 rounded-2xl ${iconBgClass} flex items-center justify-center mb-6 border ${iconBorderClass}`}
								>
									<Icon size={32} className={iconColorClass} />
								</div>
								<h3 className="text-xl font-display font-bold mb-3">
									{feature.title}
								</h3>
								<p className="text-text-secondary text-sm leading-relaxed">
									{feature.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
