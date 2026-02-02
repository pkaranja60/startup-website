"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cloud, Server } from "lucide-react";
import CTAWrapper from "@/components/common/CTAWrapper";
import { cloudBenefits, cloudProviders } from "@/data/ServiceData";
import ServiceHero from "../ServiceHero";
import ServiceStats from "../ServiceStats";

export default function CloudLayout() {
	const cloudVisual = (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			className="relative h-96"
		>
			<div className="absolute inset-0 flex items-center justify-center">
				{/* Central Cloud */}
				<motion.div
					animate={{ y: [0, -10, 0] }}
					transition={{ duration: 4, repeat: Infinity }}
					className="w-32 h-32 rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center relative z-10"
				>
					<Cloud size={64} className="text-primary" />
				</motion.div>

				{/* Satellite Servers */}
				{[0, 90, 180, 270].map((angle, i) => (
					<motion.div
						key={angle}
						animate={{
							x: Math.cos((angle * Math.PI) / 180) * 150,
							y: Math.sin((angle * Math.PI) / 180) * 150,
						}}
						transition={{ duration: 0.5, delay: i * 0.1 }}
						className="absolute w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
					>
						<Server size={24} className="text-primary" />
					</motion.div>
				))}
			</div>
		</motion.div>
	);

	return (
		<>
			<main className="min-h-screen pt-32">
				<ServiceHero
					badge={{
						icon: Cloud,
						text: "Cloud Infrastructure",
						colorClass: "text-primary",
						bgClass: "bg-primary/10",
						borderClass: "border-primary/20",
					}}
					title={{
						main: "Scale to the",
						highlight: "Cloud",
						highlightClass: "text-primary-gradient",
					}}
					description="Migrate, optimize, and manage your infrastructure on AWS, Azure, or Google Cloud. We handle everything from migration to 24/7 monitoring."
					benefits={[]}
					cta={{
						primary: {
							text: "Start Cloud Migration",
							href: "/book",
							bgClass: "bg-primary",
							shadowClass: "shadow-primary/40",
						},
					}}
					visual={cloudVisual}
				/>

				{/* Cloud Providers Grid (Specific to this layout, keep local) */}
				<section className="container-max mb-16 -mt-8">
					<div className="flex gap-4 justify-center lg:justify-start">
						{cloudProviders.map((p) => (
							<div
								key={p.name}
								className="glass-card px-6 py-4 rounded-2xl text-center"
							>
								<div className="text-3xl mb-2">{p.logo}</div>
								<div className="text-xs font-bold">{p.name}</div>
							</div>
						))}
					</div>
				</section>

				<ServiceStats
					stats={cloudBenefits.map((b) => ({
						value: b.value,
						label: b.title,
						icon: b.icon,
					}))}
					gradientTextClass="text-primary-gradient" // default
					iconColorClass="text-primary" // default
				/>

				<CTAWrapper />
			</main>
		</>
	);
}
