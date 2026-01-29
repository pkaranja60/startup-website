'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LucideIcon, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface CTAConfig {
  title: string
  description: string
  linkHref: string
  linkText: string
  icon?: LucideIcon
  bgClass?: string
  textColorClass?: string
  extraStyles?: string
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

export default function CTASection({ config }: { config: CTAConfig }) {
  const pathname = usePathname() || '/'

  console.log('Current pathname:', pathname)

  const { title, description, linkHref, linkText, icon: Icon, bgClass, textColorClass, extraStyles } = config;

   if (pathname === '/' || pathname === '') {
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
                {config.title}
              </h2>
              <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                {config.description}
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-3 bg-primary text-background hover:bg-primary-hover px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
              >
                Book a Discovery Call <ArrowRight size={22} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className={`section-padding ${extraStyles || ''}`}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative overflow-hidden rounded-[3rem] text-center ${bgClass || 'glass-card'} ${textColorClass || ''}`}
        >
          {Icon && <Icon size={48} className="mx-auto mb-6" />}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">{title}</h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">{description}</p>
          <Link
            href={linkHref}
            className="inline-flex items-center gap-3 bg-primary text-background hover:bg-primary-hover px-5 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
          >
            {linkText}
            <ArrowRight size={22} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
