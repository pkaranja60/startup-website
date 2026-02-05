"use client";

import { motion } from "framer-motion";
import { Database, HardDrive } from "lucide-react";
import CTAWrapper from "@/components/common/CTAWrapper";
import { DatabaseServices, databases } from "@/data/ServiceData";
import ServiceFeatures from "../ServiceFeatures";
import ServiceHero from "../ServiceHero";
import ServiceTechnologies from "../ServiceTechnologies";

export default function DatabaseLayout() {
	const databaseVisual = (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			className="relative h-96"
		>
			<div className="absolute inset-0 flex items-center justify-center">
				{/* Stack of database layers */}
				{[0, 1, 2, 3].map((i) => (
					<motion.div
						key={i}
						initial={{ y: i * 20, opacity: 0 }}
						animate={{ y: i * 15, opacity: 1 }}
						transition={{ delay: i * 0.1 }}
						className="absolute w-64 h-16 rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm border border-accent/30"
						style={{ top: `${30 + i * 15}%` }}
					>
						<div className="flex items-center justify-center h-full gap-3">
							<HardDrive size={24} className="text-accent" />
							<div className="text-xs font-bold">Layer {i + 1}</div>
						</div>
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
						icon: Database,
						text: "Database Solutions",
						colorClass: "text-accent",
						bgClass: "bg-accent/10",
						borderClass: "border-accent/20",
					}}
					title={{
						main: "Robust Data",
						highlight: "Infrastructure",
						highlightClass:
							"text-gradient-to-r from-accent to-primary bg-clip-text text-transparent",
					}}
					description="Design, implement, and optimize database systems that power your business. From SQL to NoSQL, we handle it all."
					benefits={[
						"99.99% uptime guarantee",
						"Automated backups",
						"Real-time replication",
						"Advanced security",
					]}
					cta={{
						primary: {
							text: "Optimize Your Database",
							href: "/book",
							bgClass: "bg-accent",
							shadowClass: "shadow-accent/40",
						},
					}}
					visual={databaseVisual}
				/>

				<ServiceFeatures
					title="Database Services"
					description="We provide comprehensive database solutions"
					features={DatabaseServices.map((cap) => ({
						title: cap.title,
						description: cap.desc,
						icon: cap.icon,
					}))}
					iconColorClass="text-accent"
					iconBgClass="bg-accent/10"
					iconBorderClass="border-accent/20"
				/>

				<ServiceTechnologies
					title="Databases We Work With"
					description="SQL, NoSQL, and NewSQL technologies"
					technologies={databases}
					techBorderClass="hover:border-accent/30"
				/>

				<CTAWrapper />
			</main>
		</>
	);
}
