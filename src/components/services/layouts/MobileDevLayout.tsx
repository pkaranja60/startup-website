"use client";

import { motion } from "framer-motion";
import {
	Apple,
	ArrowRight,
	Bell,
	Download,
	Heart,
	PlayCircle,
	Smartphone,
	Users,
} from "lucide-react";
import CTAWrapper from "@/components/common/CTAWrapper";
import {
	appFeatures,
	mobileStats,
	mobileTechnologies,
	platforms,
} from "@/data/ServiceData";
import ServiceHero from "../ServiceHero";
import ServiceStats from "../ServiceStats";
import ServiceTechnologies from "../ServiceTechnologies";

export default function MobileDevLayout() {
	const phoneMockup = (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
			className="relative flex justify-center lg:justify-end"
		>
			{/* Phone Frame */}
			<div className="relative">
				{/* Phone Body */}
				<div className="w-[280px] h-[570px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/50 relative">
					{/* Notch */}
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />

					{/* Screen */}
					<div className="w-full h-full bg-gradient-to-b from-surface to-background rounded-[2.5rem] overflow-hidden relative">
						{/* Status Bar */}
						<div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/20 to-transparent z-10 flex items-center justify-between px-8 pt-2">
							<span className="text-xs font-bold">9:41</span>
							<div className="flex gap-1">
								<div className="w-4 h-4 border border-white/50 rounded-sm" />
								<div className="w-1 h-4 bg-white/50 rounded-sm" />
							</div>
						</div>

						{/* App Content */}
						<div className="pt-16 px-6 h-full overflow-hidden">
							{/* App Header */}
							<motion.div
								initial={{ y: -20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.5 }}
								className="mb-6"
							>
								<div className="flex items-center justify-between mb-4">
									<div>
										<div className="text-xs text-text-tertiary mb-1">
											Welcome back
										</div>
										<div className="text-lg font-display font-bold">
											Your App
										</div>
									</div>
									<div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
										<Users size={20} className="text-background" />
									</div>
								</div>
							</motion.div>

							{/* Feature Cards */}
							<div className="space-y-3">
								{[
									{
										icon: Bell,
										label: "Notifications",
										color: "from-yellow-500 to-orange-500",
										delay: 0.6,
									},
									{
										icon: Heart,
										label: "Favorites",
										color: "from-pink-500 to-red-500",
										delay: 0.7,
									},
									{
										icon: Download,
										label: "Downloads",
										color: "from-blue-500 to-cyan-500",
										delay: 0.8,
									},
								].map((item) => {
									const Icon = item.icon;
									return (
										<motion.div
											key={item.label}
											initial={{ x: -20, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ delay: item.delay }}
											className="glass-card rounded-2xl p-4 flex items-center gap-4"
										>
											<div
												className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
											>
												<Icon size={20} className="text-white" />
											</div>
											<div className="flex-grow">
												<div className="text-sm font-bold mb-1">
													{item.label}
												</div>
												<div className="text-xs text-text-tertiary">
													Tap to view
												</div>
											</div>
											<ArrowRight size={16} className="text-text-tertiary" />
										</motion.div>
									);
								})}
							</div>

							{/* Bottom Stats */}
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.9 }}
								className="absolute bottom-6 left-6 right-6"
							>
								<div className="glass-card rounded-2xl p-4">
									<div className="grid grid-cols-3 gap-4 text-center">
										<div>
											<div className="text-lg font-display font-bold text-accent">
												4.8★
											</div>
											<div className="text-xs text-text-tertiary">Rating</div>
										</div>
										<div>
											<div className="text-lg font-display font-bold text-primary">
												50K+
											</div>
											<div className="text-xs text-text-tertiary">Users</div>
										</div>
										<div>
											<div className="text-lg font-display font-bold">98%</div>
											<div className="text-xs text-text-tertiary">Uptime</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>

					{/* Home Indicator */}
					<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
				</div>

				{/* Floating Elements */}
				<motion.div
					animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
					transition={{ duration: 3, repeat: Infinity }}
					className="absolute -top-8 -right-8 glass-card rounded-2xl px-4 py-3 shadow-xl"
				>
					<div className="flex items-center gap-2">
						<Apple size={20} className="text-gray-300" />
						<span className="text-sm font-bold">iOS Ready</span>
					</div>
				</motion.div>

				<motion.div
					animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
					transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
					className="absolute -bottom-8 -left-8 glass-card rounded-2xl px-4 py-3 shadow-xl"
				>
					<div className="flex items-center gap-2">
						<PlayCircle size={20} className="text-primary" />
						<span className="text-sm font-bold">Android Ready</span>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);

	return (
		<>
			<main className="min-h-screen pt-32 overflow-hidden">
				<ServiceHero
					badge={{
						icon: Smartphone,
						text: "Mobile Development",
						colorClass: "text-accent",
						bgClass: "bg-accent/10",
						borderClass: "border-accent/20",
					}}
					title={{
						main: "Create Stunning",
						highlight: "Mobile Experiences",
						highlightClass:
							"text-gradient-to-r from-accent to-primary bg-clip-text text-transparent",
					}}
					description="Build native and cross-platform mobile applications that users love. From concept to App Store, we handle everything."
					benefits={appFeatures}
					cta={{
						primary: {
							text: "Start Your App",
							href: "/book",
							bgClass: "bg-accent",
							shadowClass: "shadow-accent/40",
						},
						secondary: {
							text: "View Pricing",
							href: "/pricing",
						},
					}}
					visual={phoneMockup}
				/>

				<ServiceStats
					stats={mobileStats}
					gradientTextClass="text-gradient-to-r from-accent to-primary"
				/>

				<ServiceTechnologies
					title="Mobile Technologies"
					description="Cross-platform and native development tools"
					technologies={mobileTechnologies}
					techBorderClass="hover:border-accent/30"
				/>

				<CTAWrapper />
			</main>
		</>
	);
}
