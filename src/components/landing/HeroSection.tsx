'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative pt-32 md:pt-40 lg:pt-48 pb-20 lg:pb-32 px-4 sm:px-6">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-40 w-72 h-72 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-40 w-72 h-72 lg:w-96 lg:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }} />
            </div>

            <div className="container-max relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                                Trusted by 600+ Businesses
                            </span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 leading-[1.1] tracking-tight">
                            Technology Solutions
                            <br />
                            <span className="text-primary-gradient">That Scale</span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-text-secondary mb-8 leading-relaxed max-w-xl">
                            We build high-performance web applications, mobile apps, and enterprise solutions
                            that drive growth and transform businesses across East Africa.
                        </p>

                        {/* Key Benefits */}
                        <div className="space-y-3 mb-8">
                            {[
                                'Enterprise-grade security & compliance',
                                'Scalable cloud infrastructure',
                                '24/7 Technical support & maintenance'
                            ].map((benefit) => (
                                <div key={benefit} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 size={14} className="text-primary" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm text-text-secondary">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/book"
                                className="group bg-primary hover:bg-primary-hover text-background px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold text-base lg:text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-primary/40 hover:scale-105 active:scale-95"
                            >
                                Schedule Consultation
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="group bg-white/5 hover:bg-white/10 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold text-base lg:text-lg transition-all duration-300 border border-border-subtle hover:border-border-medium flex items-center justify-center gap-2"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Side - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="glass-card rounded-3xl p-8 lg:p-10">
                            <div className="grid grid-cols-2 gap-8">
                                {[
                                    { value: '600+', label: 'Satisfied Clients', sublabel: 'Across East Africa' },
                                    { value: '400+', label: 'Projects Delivered', sublabel: 'On time & budget' },
                                    { value: '98%', label: 'Client Retention', sublabel: 'Year over year' },
                                    { value: '24/7', label: 'Support Available', sublabel: 'Always here' }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        className="text-center p-4 rounded-2xl bg-white/2 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="text-3xl lg:text-4xl font-display font-bold mb-2 text-primary-gradient">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
                                            {stat.label}
                                        </div>
                                        <div className="text-xs text-text-tertiary">
                                            {stat.sublabel}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 pt-8 border-t border-border-subtle">
                                <p className="text-xs text-text-tertiary text-center">
                                    <span className="font-bold text-primary">100%</span> satisfaction guarantee •
                                    <span className="font-bold text-primary"> Free</span> consultation •
                                    <span className="font-bold text-primary"> No</span> hidden fees
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}