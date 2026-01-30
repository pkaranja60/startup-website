'use client';

import { testimonials } from '@/data/testimonialData';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    };

   

    return (
        <section className="section-padding bg-linear-to-b from-background to-surface">
            <div className="container-max">
                <motion.div {...fadeIn} className="text-center mb-16 lg:mb-20">
                    <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">
                        Client Success Stories
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
                        Trusted by Leading Businesses
                    </h2>
                    <p className="text-base lg:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        Don't just take our word for it. Here's what our clients say about working with us.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials   .map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col hover:bg-white/5 transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                                <Quote size={20} className="text-primary" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-primary text-primary" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-sm lg:text-base text-text-secondary leading-relaxed mb-6 grow">
                                "{testimonial.text}"
                            </p>

                            {/* Project Tag */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-6 self-start">
                                {testimonial.project}
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-border-subtle">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0">
                                    {/* Placeholder avatar - replace with actual images */}
                                    <span className="text-lg font-bold text-primary">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-bold text-sm lg:text-base">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs text-text-tertiary">
                                        {testimonial.role}
                                    </div>
                                    <div className="text-xs text-text-tertiary">
                                        {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Overall Stats */}
                <motion.div
                    {...fadeIn}
                    className="mt-16 lg:mt-20"
                >
                    <div className="glass-card rounded-3xl p-8 lg:p-12">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { value: '4.9/5', label: 'Average Rating', sublabel: 'From 600+ reviews' },
                                { value: '98%', label: 'Client Satisfaction', sublabel: 'Year over year' },
                                { value: '95%', label: 'Repeat Business', sublabel: 'Return clients' },
                                { value: '100%', label: 'On-Time Delivery', sublabel: 'Past 12 months' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl lg:text-4xl font-display font-bold text-primary-linear mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs lg:text-sm font-bold text-text-secondary uppercase tracking-wider mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-xs text-text-tertiary">
                                        {stat.sublabel}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}