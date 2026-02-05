"use client";

import { motion } from "framer-motion";
import { Code2, TrendingUp } from "lucide-react";
import CTAWrapper from "@/components/common/CTAWrapper";
import { features, projects, webTechnologies } from "@/data/ServiceData";
import ServiceFeatures from "../ServiceFeatures";
import ServiceHero from "../ServiceHero";
import ServiceProjects from "../ServiceProjects";
import ServiceTechnologies from "../ServiceTechnologies";

export default function WebDevLayout() {
	const browserMockup = (
		<motion.div
			initial={{ opacity: 0, x: 30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
			className="relative"
		>
			{/* Browser Window */}
			<div className="glass-card rounded-2xl overflow-hidden border border-border-subtle">
				{/* Browser Chrome */}
				<div className="bg-white/5 px-4 py-3 border-b border-border-subtle flex items-center gap-2">
					<div className="flex gap-2">
						<div className="w-3 h-3 rounded-full bg-red-500/80" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
						<div className="w-3 h-3 rounded-full bg-primary/80" />
					</div>
					<div className="grow ml-4 bg-white/5 rounded-lg px-3 py-1.5 text-xs text-text-tertiary">
						https://yourwebsite.com
					</div>
				</div>

				{/* Browser Content - Placeholder */}
				<div className="aspect-4/3 bg-linear-to-br from-primary/10 via-surface to-accent/10 p-8 flex items-center justify-center relative overflow-hidden">
					{/* Animated Grid Background */}
					<div className="absolute inset-0 opacity-10">
						<div
							className="absolute inset-0"
							style={{
								backgroundImage:
									"linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
								backgroundSize: "40px 40px",
							}}
						/>
					</div>

					{/* Code Icon */}
					<motion.div
						animate={{
							scale: [1, 1.1, 1],
							rotate: [0, 5, -5, 0],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="relative"
					>
						<div className="w-32 h-32 rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center">
							<Code2 size={64} className="text-primary" />
						</div>
					</motion.div>

					{/* Floating Elements */}
					<motion.div
						animate={{ y: [0, -10, 0] }}
						transition={{ duration: 3, repeat: Infinity }}
						className="absolute top-8 right-8 glass-card px-4 py-2 rounded-xl text-xs font-bold text-primary"
					>
						100 Score
					</motion.div>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
						className="absolute bottom-8 left-8 glass-card px-4 py-2 rounded-xl text-xs font-bold text-accent"
					>
						1s Load
					</motion.div>
				</div>
			</div>

			{/* Floating Stats */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.5 }}
				className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 border border-primary/20"
			>
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
						<TrendingUp size={24} className="text-primary" />
					</div>
					<div>
						<div className="text-2xl font-display font-bold">400+</div>
						<div className="text-xs text-text-tertiary">Projects Delivered</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);

	return (
		<>
			<main className="min-h-screen pt-32 overflow-hidden">
				<ServiceHero
					badge={{
						icon: Code2,
						text: "Web Development",
						colorClass: "text-primary",
						bgClass: "bg-primary/10",
						borderClass: "border-primary/20",
					}}
					title={{
						main: "Build Powerful",
						highlight: "Web Applications",
						highlightClass: "text-primary-gradient",
					}}
					description="Transform your ideas into high-performance web applications. We create scalable, SEO-optimized solutions that drive growth and deliver exceptional user experiences."
					benefits={[
						"100 Lighthouse Performance Score",
						"Mobile-first responsive design",
						"Advanced SEO optimization",
						"Scalable cloud infrastructure",
					]}
					cta={{
						primary: {
							text: "Start Your Project",
							href: "/book",
							bgClass: "bg-primary",
							shadowClass: "shadow-primary/40",
						},
						secondary: {
							text: "View Pricing",
							href: "/pricing",
						},
					}}
					visual={browserMockup}
				/>

				<ServiceFeatures
					title="Why Choose Our Web Development"
					description="We build web applications that are fast, secure, and scalable"
					features={features}
					iconColorClass="text-primary"
					iconBgClass="bg-primary/10"
					iconBorderClass="border-primary/20"
				/>

				<ServiceTechnologies
					title="Technologies We Use"
					description="Modern, battle-tested technologies for production-grade applications"
					technologies={webTechnologies}
					techBorderClass="hover:border-primary/30"
				/>

				<ServiceProjects
					title="Recent Projects"
					projects={projects}
					iconColorClass="text-primary"
				/>

				<CTAWrapper />
			</main>
		</>
	);
}
