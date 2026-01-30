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

export default function CTASection({ config }: { config?: CTAConfig }) {
  const pathname = usePathname() || '/'

  // Default config for homepage
  const defaultConfig: CTAConfig = {
    title: "Ready to Transform Your Business?",
    description: "Let's build something amazing together. Schedule a free consultation to discuss your project.",
    linkHref: "/book",
    linkText: "Book a Discovery Call"
  }

  // Use provided config or default
  const activeConfig = config || defaultConfig

  // Special homepage styling
  if (pathname === '/' || pathname === '') {
    return (
     <section className="section-padding px-6">
        <div className="container-max">
          <motion.div
            {...fadeIn}
            className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-[--color-primary] via-[--color-accent] to-[--color-primary] p-12 md:p-20 text-center text-[--color-background]"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '1000ms' }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                {activeConfig.title}
              </h2>
              <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                {activeConfig.description}
              </p>
              <Link
                href={activeConfig.linkHref}
                className="inline-flex items-center gap-3 bg-background text-primary hover:bg-background/90 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
              >
                {activeConfig.linkText}
                <ArrowRight size={22} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Other pages styling
  const { title, description, linkHref, linkText, icon: Icon, bgClass, textColorClass, extraStyles } = activeConfig

  return (
    <section className={`section-padding ${extraStyles || ''}`}>
      <div className="container-max">
        <motion.div
          {...fadeIn}
          className={`p-12 md:p-16 text-center ${bgClass || 'glass-card rounded-3xl max-w-4xl mx-auto'} ${textColorClass || ''}`}
        >
          {Icon && (
            <div className="relative z-10">
              <Icon size={48} className="mx-auto mb-6" />
            </div>
          )}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">{title}</h2>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">{description}</p>
            <Link
              href={linkHref}
              className="inline-flex items-center gap-3 bg-primary text-background hover:bg-primary-hover px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
            >
              {linkText}
              <ArrowRight size={22} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}