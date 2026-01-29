'use client';

import { caseStudies } from '@/constants/otherData';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesSection() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
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
                        Real projects, real results. See how we've helped businesses transform through technology.
                    </p>
                </motion.div>

                <div className="space-y-8 lg:space-y-12">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-card rounded-3xl overflow-hidden hover:bg-white/5 transition-all duration-300"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                {/* Image Side */}
                                <div className={`relative h-64 lg:h-auto bg-linear-to-br ${study.color} flex items-center justify-center p-12`}>
                                    {/* Placeholder for image */}
                                    <div className="text-center">
                                        <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/20">
                                            <span className="text-4xl font-display font-bold text-white/80">
                                                {study.client.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="text-sm text-white/60 uppercase tracking-widest font-bold">
                                            {study.category}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="p-8 lg:p-12 flex flex-col">
                                    {/* Category Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-4 self-start">
                                        {study.category}
                                    </div>

                                    {/* Title & Client */}
                                    <h3 className="text-2xl lg:text-3xl font-display font-bold mb-2">
                                        {study.title}
                                    </h3>
                                    <p className="text-sm text-text-tertiary mb-4">
                                        {study.client}
                                    </p>

                                    {/* Description */}
                                    <p className="text-base text-text-secondary leading-relaxed mb-6 grow">
                                        {study.description}
                                    </p>

                                    {/* Results Grid */}
                                    <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y border-border-subtle">
                                        {study.results.map((result) => {
                                            const Icon = result.icon;
                                            return (
                                                <div key={result.label} className="text-center">
                                                    <Icon size={20} className="text-primary mx-auto mb-2" />
                                                    <div className="text-xl lg:text-2xl font-display font-bold text-primary mb-1">
                                                        {result.value}
                                                    </div>
                                                    <div className="text-xs text-text-tertiary">
                                                        {result.label}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="mb-6">
                                        <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3 font-bold">
                                            Technologies Used
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {study.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-full bg-white/5 border border-border-subtle text-xs font-medium text-text-secondary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href={study.link}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all self-start"
                                    >
                                        View Case Study
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    {...fadeIn}
                    className="text-center mt-12 lg:mt-16"
                >
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-xl shadow-primary/40 hover:scale-105"
                    >
                        View All Case Studies
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}