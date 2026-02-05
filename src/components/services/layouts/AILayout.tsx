"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import CTAWrapper from "@/components/common/CTAWrapper";
import { aiCapabilities, aiUseCases } from "@/data/ServiceData";
import ServiceFeatures from "../ServiceFeatures";
import ServiceHero from "../ServiceHero";
import ServiceSimpleGrid from "../ServiceSimpleGrid";

export default function AILayout() {
	const brainVisual = (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			className="relative h-96"
		>
			<div className="absolute inset-0 flex items-center justify-center">
				{/* Central Brain/CPU */}
				<motion.div
					animate={{
						scale: [1, 1.05, 1],
						boxShadow: [
							"0 0 0px rgba(168, 85, 247, 0)",
							"0 0 50px rgba(168, 85, 247, 0.5)",
							"0 0 0px rgba(168, 85, 247, 0)",
						],
					}}
					transition={{ duration: 3, repeat: Infinity }}
					className="w-48 h-48 rounded-3xl bg-linear-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-500/30 flex items-center justify-center relative"
				>
					<Brain size={96} className="text-purple-400" />

					{/* Neural Network Lines */}
					{[...Array(8)].map((_, i) => (
						<motion.div
							key={i}
							animate={{
								opacity: [0.2, 0.8, 0.2],
								scale: [1, 1.2, 1],
							}}
							transition={{
								duration: 2,
								delay: i * 0.25,
								repeat: Infinity,
							}}
							className="absolute w-2 h-2 rounded-full bg-purple-400"
							style={{
								top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
								left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
							}}
						/>
					))}
				</motion.div>

				{/* Orbiting Sparkles */}
				{[0, 120, 240].map((angle, i) => (
					<motion.div
						key={angle}
						animate={{ rotate: 360 }}
						transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
						className="absolute inset-0"
					>
						<div
							className="absolute glass-card p-2 rounded-xl"
							style={{
								top: `${50 + 35 * Math.sin((angle * Math.PI) / 180)}%`,
								left: `${50 + 35 * Math.cos((angle * Math.PI) / 180)}%`,
							}}
						>
							<Sparkles size={20} className="text-purple-400" />
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
						icon: Brain,
						text: "AI & Machine Learning",
						colorClass: "text-purple-400",
						bgClass: "bg-purple-500/10",
						borderClass: "border-purple-500/20",
					}}
					title={{
						main: "Intelligent",
						highlight: "Automation",
						highlightClass:
							"text-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
					}}
					description="Integrate cutting-edge AI into your products. From chatbots to predictive models, we build AI solutions that actually work."
					benefits={[]} // No specific benefits list in original
					cta={{
						primary: {
							text: "Explore AI Solutions",
							href: "/book",
							bgClass: "bg-purple-500",
							shadowClass: "shadow-purple-500/40",
						},
					}}
					visual={brainVisual}
				/>

				{/* Manual Stats that were in Hero originally */}
				<section className="container-max mb-16 -mt-8">
					<div className="flex gap-4 justify-center lg:justify-start">
						<div className="glass-card px-6 py-4 rounded-2xl text-center">
							<div className="text-3xl font-display font-bold text-purple-400 mb-1">
								50+
							</div>
							<div className="text-xs text-text-tertiary">
								AI Models Deployed
							</div>
						</div>
						<div className="glass-card px-6 py-4 rounded-2xl text-center">
							<div className="text-3xl font-display font-bold text-purple-400 mb-1">
								90%
							</div>
							<div className="text-xs text-text-tertiary">Accuracy Rate</div>
						</div>
					</div>
				</section>

				<ServiceFeatures
					title="AI Capabilities"
					description="We provide comprehensive AI services" // Added as it was missing in original component props but needed for reusable component
					features={aiCapabilities.map((cap) => ({
						title: cap.title,
						description: cap.desc,
						icon: cap.icon,
					}))}
					iconColorClass="text-purple-400"
					iconBgClass="bg-purple-500/10"
					iconBorderClass="border-purple-500/20"
				/>

				<ServiceSimpleGrid
					title="AI Use Cases"
					items={aiUseCases}
					icon={Sparkles}
					iconColorClass="text-purple-400"
					itemBorderClass="hover:border-purple-500/30"
				/>

				<CTAWrapper />
			</main>
		</>
	);
}
