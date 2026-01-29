'use client';

import { steps } from '@/constants/otherData';
import { motion } from 'framer-motion';
import {
    ArrowRight
} from 'lucide-react';

export default function ProcessSection() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    };

    return (
        <section id="process" className="section-padding bg-linear-to-b from-surface to-background">
            <div className="container-max">
                <motion.div {...fadeIn} className="text-center mb-16 lg:mb-20">
                    <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">
                        Our Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
                        How We Work
                    </h2>
                    <p className="text-base lg:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        A proven methodology that delivers results, on time and on budget.
                        Transparent communication every step of the way.
                    </p>
                </motion.div>

                {/* Timeline Layout */}
                <div className="relative">
                    {/* Vertical Line - Desktop Only */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/20 via-primary/50 to-primary/20 -translate-x-1/2" />

                    <div className="space-y-12 lg:space-y-16">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'
                                        }`}
                                >
                                    {/* Content */}
                                    <div className={`${isEven ? 'lg:text-right lg:pr-8' : 'lg:col-start-2 lg:pl-8'}`}>
                                        <div className={`inline-block ${isEven ? 'lg:float-right lg:ml-4' : 'lg:float-left lg:mr-4'} mb-4`}>
                                            <div className="text-6xl lg:text-7xl font-display font-bold text-white/5">
                                                {step.step}
                                            </div>
                                        </div>

                                        <div className="glass-card rounded-2xl p-6 lg:p-8 hover:bg-white/5 transition-all duration-300">
                                            <h3 className="text-xl lg:text-2xl font-display font-bold mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm lg:text-base text-text-secondary leading-relaxed mb-6">
                                                {step.description}
                                            </p>

                                            {/* Deliverables */}
                                            <div className="space-y-2">
                                                <p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-3">
                                                    Key Deliverables
                                                </p>
                                                {step.deliverables.map((deliverable) => (
                                                    <div key={deliverable} className="flex items-center gap-2 text-sm text-text-secondary">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                        {deliverable}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Icon - Center on Desktop */}
                                    <div className={`${isEven ? 'lg:col-start-2 lg:pl-8' : 'lg:col-start-1 lg:pr-8'} hidden lg:block`}>
                                        <div className="relative">
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/10 blur-xl" />
                                            <div className="relative w-20 h-20 mx-auto rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/30 backdrop-blur-sm">
                                                <Icon size={36} className="text-primary" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Icon - Mobile */}
                                    <div className="lg:hidden absolute -left-2 top-0">
                                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                                            <Icon size={24} className="text-primary" />
                                        </div>
                                    </div>

                                    {/* Connector Dot - Desktop */}
                                    <div className={`hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background ${index === steps.length - 1 ? 'animate-pulse' : ''
                                        }`} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    {...fadeIn}
                    className="text-center mt-16 lg:mt-20"
                >
                    <div className="glass-card rounded-2xl p-8 lg:p-10 max-w-2xl mx-auto">
                        <h3 className="text-xl lg:text-2xl font-display font-bold mb-3">
                            Ready to Get Started?
                        </h3>
                        <p className="text-sm lg:text-base text-text-secondary mb-6">
                            Let's discuss your project and create a customized development plan tailored to your needs.
                        </p>
                        <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-xl shadow-primary/40 hover:scale-105">
                            Schedule Free Consultation
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}