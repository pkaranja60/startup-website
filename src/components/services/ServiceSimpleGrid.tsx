"use client";

import { motion } from "framer-motion";
import React from "react";

interface ServiceSimpleGridProps {
	title: string;
	items: string[];
	icon?: React.ElementType;
	iconColorClass?: string; 	
	itemBorderClass?: string; 
}

export default function ServiceSimpleGrid({
	title,
	items,
	icon: Icon,
	iconColorClass = "text-primary",
	itemBorderClass = "hover:border-primary/30",
}: ServiceSimpleGridProps) {
	return (
		<section className="section-padding">
			<div className="container-max">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl font-display font-bold mb-4">{title}</h2>
				</motion.div>

				<div className="flex flex-wrap justify-center gap-4">
					{items.map((item, i) => (
						<motion.div
							key={item}
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.05 }}
							className={`glass-card px-6 py-3 rounded-full border border-border-subtle ${itemBorderClass} transition-all flex items-center gap-2`}
						>
							{Icon && <Icon size={16} className={iconColorClass} />}
							<span className="text-sm font-medium">{item}</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
