'use client';

import { services } from '@/constants/otherData';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    };



    const getColorClasses = (color: string) => {
        const colors = {
            primary: {
                bg: 'bg-primary/10',
                border: 'border-primary/20',
                text: 'text-primary',
                hover: 'group-hover:from-primary/20'
            },
            accent: {
                bg: 'bg-accent/10',
                border: 'border-accent/20',
                text: 'text-accent',
                hover: 'group-hover:from-accent/20'
            },
            purple: {
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/20',
                text: 'text-purple-400',
                hover: 'group-hover:from-purple-500/20'
            }
        };
        return colors[color as keyof typeof colors];
    };

    return (
        <section id="services" className="section-padding bg-linear-to-b from-background to-surface">
            <div className="container-max">
                <motion.div {...fadeIn} className="text-center mb-16 lg:mb-20">
                    <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">
                        Our Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
                        Comprehensive Technology Solutions
                    </h2>
                    <p className="text-base lg:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        From concept to deployment, we provide end-to-end technology services
                        tailored to your business needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => {
                        const colors = getColorClasses(service.color);
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                            >
                                {/* Hover linear effect */}
                                <div className={`absolute top-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-linear-to-br ${colors.hover} to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl ${colors.bg} flex items-center justify-center mb-6 border ${colors.border} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={28} className={`${colors.text} lg:w-8 lg:h-8`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl lg:text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm lg:text-base text-text-secondary leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-xs lg:text-sm text-text-tertiary">
                                                <div className={`w-1 h-1 rounded-full ${colors.bg}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Link */}
                                    <Link
                                        href={service.link}
                                        className={`inline-flex items-center gap-2 text-sm font-bold ${colors.text} hover:gap-3 transition-all duration-300`}
                                    >
                                        Learn More
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Additional Services Note */}
                <motion.div
                    {...fadeIn}
                    className="mt-12 lg:mt-16 text-center"
                >
                    <div className="glass-card rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                <Globe size={20} className="text-primary" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-display font-bold text-lg mb-2">
                                    Need a Custom Solution?
                                </h4>
                                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                                    We specialize in building tailored technology solutions for unique business challenges.
                                    Let's discuss your specific requirements.
                                </p>
                                <Link
                                    href="/book"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                                >
                                    Talk to Our Team
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}