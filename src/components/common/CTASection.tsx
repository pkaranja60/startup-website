'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function CTASection() {
    const pathname = usePathname()

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    }

    // CTA for Home Page
    if (pathname === '/') {
        return (
            <section className="section-padding px-6">
                <div className="container-max">
                    <motion.div
                        {...fadeIn}
                        className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-[--color-primary] via-[--color-accent] to-[--color-primary] p-12 md:p-20 text-center text-[--color-background]"
                    >
                        {/* Background noise & pulses */}
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl animate-pulse" />
                            <div
                                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl animate-pulse"
                                style={{ animationDelay: '1000ms' }}
                            />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[--font-family-display] font-bold mb-6">
                                Ready to transform your digital presence?
                            </h2>
                            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                                Let's build something extraordinary together. Book a free consultation today.
                            </p>

                            <Link
                                href="/book"
                                className="inline-flex items-center gap-3 bg-[--color-background] text-[--color-primary] hover:bg-[--color-background]/90 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
                            >
                                Book a Discovery Call
                                <ArrowRight size={22} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        )
    }

    // CTA for Pricing Page
    if (pathname === '/pricing') {
        return (
            <motion.div {...fadeIn} className="mt-20 text-center">
                <div className="glass-card rounded-3xl p-12 md:p-16 max-w-3xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                        Still have questions?
                    </h3>
                    <p className="text-text-secondary mb-8 leading-relaxed">
                        Book a free consultation to discuss your project and get a custom quote tailored to your needs.
                    </p>
                    <Link
                        href="/book"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-primary/30"
                    >
                        Book a Discovery Call
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </motion.div>
        )
    }

    // Default fallback (optional, can return null)
    return null
}
