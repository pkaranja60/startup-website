"use client";

import { motion } from "framer-motion";
import React from "react";

interface ServiceTechnologiesProps {
	title: string;
	description: string;
	technologies: string[];
	techBorderClass?: string; 	
}

export default function ServiceTechnologies({
	title,
	description,
	technologies,
	techBorderClass = "hover:border-primary/30",
}: ServiceTechnologiesProps) {
	const fadeIn = {
		initial: { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, margin: "-100px" },
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
	};

	return (
		<section className="section-padding">
			<div className="container-max">
				<motion.div {...fadeIn} className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
						{title}
					</h2>
					<p className="text-text-secondary max-w-2xl mx-auto">{description}</p>
				</motion.div>

				<motion.div {...fadeIn} className="flex flex-wrap justify-center gap-4">
					{technologies.map((tech, index) => (
						<motion.div
							key={tech}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05 }}
							whileHover={{ scale: 1.05 }}
							className={`glass-card px-6 py-3 rounded-full border border-border-subtle ${techBorderClass} transition-all`}
						>
							<span className="text-sm font-medium">{tech}</span>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
