"use client";

import { motion } from "framer-motion";
import { Star, Users, Zap } from "lucide-react";
import React from "react";

interface ProjectMetric {
	users: string;
	uptime: string;
	speed: string;
}

interface ServiceProject {
	title: string;
	description: string;
	metrics: ProjectMetric;
}

interface ServiceProjectsProps {
	title: string;
	projects: ServiceProject[];
	iconColorClass?: string; 	
}

export default function ServiceProjects({
	title,
	projects,
	iconColorClass = "text-primary",
}: ServiceProjectsProps) {
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
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{projects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="glass-card rounded-3xl p-6 hover:bg-white/5 transition-all"
						>
							<h3 className="text-xl font-display font-bold mb-2">
								{project.title}
							</h3>
							<p className="text-text-secondary text-sm mb-6">
								{project.description}
							</p>
							<div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle">
								<div className="text-center">
									<Users
										size={16}
										className={`${iconColorClass} mx-auto mb-1`}
									/>
									<div className="text-sm font-bold">
										{project.metrics.users}
									</div>
									<div className="text-xs text-text-tertiary">Users</div>
								</div>
								<div className="text-center">
									<Star
										size={16}
										className={`${iconColorClass} mx-auto mb-1`}
									/>
									<div className="text-sm font-bold">
										{project.metrics.uptime}
									</div>
									<div className="text-xs text-text-tertiary">Uptime</div>
								</div>
								<div className="text-center">
									<Zap size={16} className={`${iconColorClass} mx-auto mb-1`} />
									<div className="text-sm font-bold">
										{project.metrics.speed}
									</div>
									<div className="text-xs text-text-tertiary">Speed</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
