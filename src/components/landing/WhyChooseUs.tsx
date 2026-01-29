'use client';

import { guarantees, reasons } from '@/constants/otherData';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Clock,
} from 'lucide-react';

export default function WhyChooseUs() {
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
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
                        Built on Trust & Excellence
                    </h2>
                    <p className="text-base lg:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        We don't just build technology—we build partnerships. Here's what sets us apart.
                    </p>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="glass-card rounded-3xl p-6 lg:p-8 hover:bg-white/5 transition-all duration-300"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Icon */}
                                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                                        <Icon size={28} className="text-primary lg:w-8 lg:h-8" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg lg:text-xl font-display font-bold mb-3">
                                        {reason.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm lg:text-base text-text-secondary leading-relaxed mb-6 grow">
                                        {reason.description}
                                    </p>

                                    {/* Stat */}
                                    <div className="pt-6 border-t border-border-subtle">
                                        <div className="text-2xl lg:text-3xl font-display font-bold text-primary mb-1">
                                            {reason.stat}
                                        </div>
                                        <div className="text-xs text-text-tertiary uppercase tracking-wider">
                                            {reason.statLabel}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Guarantees Section */}
                <motion.div
                    {...fadeIn}
                    className="max-w-4xl mx-auto"
                >
                    <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-primary/10 to-transparent rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <CheckCircle2 size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-display font-bold">
                                        Our Commitment to You
                                    </h3>
                                    <p className="text-sm text-text-tertiary">
                                        Your success is our success
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                {guarantees.map((guarantee, index) => (
                                    <motion.div
                                        key={guarantee}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 bg-white/2 rounded-xl p-4 border border-border-subtle"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 size={14} className="text-primary" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm text-text-secondary leading-relaxed">
                                            {guarantee}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-border-subtle flex items-center justify-center gap-2 text-sm text-text-tertiary">
                                <Clock size={16} className="text-primary" />
                                <span>
                                    <span className="font-bold text-primary">Free</span> 30-minute consultation available now
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}