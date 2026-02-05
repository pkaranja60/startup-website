"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/sanity/lib/types";

interface CaseStudiesSectionProps {
	projects?: Project[];
}

export default function CaseStudiesSection({
	projects,
}: CaseStudiesSectionProps) {
	const fadeIn = {
		initial: { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, margin: "-100px" },
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
	};

	// Helper to get consistent colors for projects without specific color mapping
	const getProjectColor = (index: number) => {
		const colors = [
			"from-blue-500/20 to-cyan-500/20",
			"from-green-500/20 to-emerald-500/20",
			"from-purple-500/20 to-pink-500/20",
		];
		return colors[index % colors.length];
	};

	return (
		<section className="section-padding border-y border-border-subtle">
			<div className="container-max">
				<motion.div {...fadeIn} className="text-center mb-16 lg:mb-20">
					<span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">
						Recent Projects
					</span>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
						Success Stories
					</h2>
					<p className="text-base lg:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
						Real projects, real results. See how we've helped businesses
						transform through technology.
					</p>
				</motion.div>

				<div className="space-y-8 lg:space-y-12">
					{projects && projects.length > 0 ? (
						projects.map((project, index) => (
							<motion.div
								key={project._id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="glass-card rounded-3xl overflow-hidden hover:bg-white/5 transition-all duration-300 border border-border-subtle"
							>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
									{/* Image Side */}
									<div
										className={`relative h-64 lg:min-h-[400px] bg-linear-to-br ${getProjectColor(index)} flex items-center justify-center overflow-hidden`}
									>
										{project.image ? (
											<Image
												src={urlFor(project.image).url()}
												alt={project.title}
												fill
												className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
											/>
										) : (
											<div className="text-center">
												<div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/20">
													<span className="text-4xl font-display font-bold text-white/80">
														{project.title.charAt(0)}
													</span>
												</div>
											</div>
										)}
										<div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent lg:hidden" />
									</div>

									{/* Content Side */}
									<div className="p-8 lg:p-12 flex flex-col justify-center">
										<div className="flex items-center gap-3 mb-6">
											<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
												{typeof project.owner === "string"
													? project.owner
													: project.owner?.name || "Case Study"}
											</div>
											<span className="text-xs text-text-tertiary">
												{new Date(project.publishedAt).toLocaleDateString(
													undefined,
													{ year: "numeric", month: "long" },
												)}
											</span>
										</div>

										<h3 className="text-2xl lg:text-4xl font-display font-bold mb-4">
											{project.title}
										</h3>

										<p className="text-base lg:text-lg text-text-secondary leading-relaxed mb-8 line-clamp-3">
											{project.description}
										</p>

										{/* Tech Stack */}
										<div className="mb-8">
											<div className="flex flex-wrap gap-2">
												{project.techStack?.slice(0, 4).map((tech) => (
													<span
														key={tech}
														className="px-3 py-1.5 rounded-xl bg-white/5 border border-border-subtle text-xs font-medium text-text-secondary"
													>
														{tech}
													</span>
												))}
												{project.techStack?.length > 4 && (
													<span className="text-xs text-text-tertiary self-center ml-1">
														+{project.techStack.length - 4} more
													</span>
												)}
											</div>
										</div>

										{/* CTA */}
										<div className="flex items-center gap-6 mt-auto italic">
											<Link
												href={`/case-studies/${project.slug}`}
												className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-all"
											>
												View Details
												<ArrowRight size={16} />
											</Link>
											{project.liveLink && (
												<a
													href={project.liveLink}
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm font-bold text-text-secondary hover:text-primary transition-colors"
												>
													Live Site →
												</a>
											)}
										</div>
									</div>
								</div>
							</motion.div>
						))
					) : (
						<div className="text-center py-20 glass-card rounded-3xl border border-dashed border-border-subtle">
							<p className="text-text-secondary italic">
								No case studies found. Start publishing in Sanity!
							</p>
						</div>
					)}
				</div>

				{/* View All CTA */}
				<motion.div {...fadeIn} className="text-center mt-12 lg:mt-20">
					<Link
						href="/case-studies"
						className="group inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-border-subtle text-text-primary px-8 py-4 rounded-full font-bold transition-all duration-300"
					>
						View All Success Stories
						<ArrowRight
							size={20}
							className="group-hover:translate-x-1 transition-transform"
						/>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
