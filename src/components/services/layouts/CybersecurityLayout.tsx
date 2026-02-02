"use client";

import { motion } from "framer-motion";
import {
	AlertTriangle,
	Eye,
	Fingerprint,
	Key,
	Lock,
	Shield,
} from "lucide-react";
import CTAWrapper from "@/components/common/CTAWrapper";
import {
	cybersecurityServices,
	cybersecurityThreats,
} from "@/data/ServiceData";
import ServiceFeatures from "../ServiceFeatures";
import ServiceHero from "../ServiceHero";
import ServiceSimpleGrid from "../ServiceSimpleGrid";

export default function CybersecurityLayout() {
	const shieldVisual = (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			className="relative flex justify-center"
		>
			<div className="relative w-80 h-80">
				{/* Rotating outer ring */}
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30"
				/>

				{/* Middle ring */}
				<motion.div
					animate={{ rotate: -360 }}
					transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
					className="absolute inset-8 rounded-full border border-purple-500/20"
				/>

				{/* Center Shield */}
				<div className="absolute inset-0 flex items-center justify-center">
					<motion.div
						animate={{
							scale: [1, 1.05, 1],
							boxShadow: [
								"0 0 0px rgba(168, 85, 247, 0)",
								"0 0 30px rgba(168, 85, 247, 0.4)",
								"0 0 0px rgba(168, 85, 247, 0)",
							],
						}}
						transition={{ duration: 3, repeat: Infinity }}
						className="w-48 h-48 rounded-3xl bg-linear-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-500/30 flex items-center justify-center"
					>
						<Shield size={96} className="text-purple-400" />
					</motion.div>
				</div>

				{/* Floating icons */}
				{[Lock, Key, Fingerprint, Eye].map((Icon, i) => (
					<motion.div
						key={i}
						animate={{
							y: [0, -10, 0],
							rotate: [0, 10, 0],
						}}
						transition={{
							duration: 2,
							delay: i * 0.5,
							repeat: Infinity,
						}}
						className="absolute glass-card p-3 rounded-xl"
						style={{
							top: `${20 + i * 20}%`,
							[i % 2 === 0 ? "left" : "right"]: "-20px",
						}}
					>
						<Icon size={20} className="text-purple-400" />
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
						icon: Shield,
						text: "Cybersecurity",
						colorClass: "text-purple-400",
						bgClass: "bg-purple-500/10",
						borderClass: "border-purple-500/20",
					}}
					title={{
						main: "Protect Your",
						highlight: "Digital Assets",
						highlightClass:
							"text-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
					}}
					description="Enterprise-grade security solutions to protect your business from cyber threats. We ensure compliance, prevent breaches, and maintain 24/7 vigilance."
					benefits={[
						"ISO 27001 Certified processes",
						"Zero security breaches track record",
						"Instant threat response",
						"Regular security updates",
					]}
					cta={{
						primary: {
							text: "Schedule Security Audit",
							href: "/book",
							bgClass: "bg-purple-500",
							shadowClass: "shadow-purple-500/40",
						},
					}}
					visual={shieldVisual}
				/>

				<ServiceFeatures
					title="Security Services"
					description="Comprehensive protection across all attack vectors"
					features={cybersecurityServices}
					iconColorClass="text-purple-400"
					iconBgClass="bg-purple-500/10"
					iconBorderClass="border-purple-500/20"
				/>

				<ServiceSimpleGrid
					title="Threats We Defend Against"
					items={cybersecurityThreats}
					icon={AlertTriangle}
					iconColorClass="text-red-400"
				/>

				<CTAWrapper />
			</main>
		</>
	);
}
