'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Info } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { pricingTiers } from '@/data/pricingData';
import ComparisonTable from '@/components/pricing/ComparisonTable';
import FAQs from '@/components/pricing/FAQs';
import CTAWrapper from '../common/CTAWrapper';

export default function PricingClinet() {
  const [showComparison, setShowComparison] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
    
      <main className="min-h-screen pt-32">
        <div className="container-max">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                Pricing
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
              Simple, <span className="text-primary-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your project. All plans include fundamental SEO,
              security, and world-class design with no hidden fees.
            </p>
            <p className="text-sm text-text-tertiary mt-4">
              Prices shown in Kenyan Shillings (KES). USD pricing available upon request.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative glass-card rounded-3xl p-8 flex flex-col group hover:scale-[1.02] transition-all duration-300 ${tier.popular ? 'ring-2 ring-primary/50 shadow-2xl shadow-primary/20' : ''
                  }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-primary to-accent text-background px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-linear-to-br ${tier.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Tier Name */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-text-secondary mb-4 uppercase tracking-widest">
                      {tier.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-display font-bold tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-text-tertiary text-sm font-medium">
                        / {tier.period}
                      </span>
                    </div>
                    {tier.priceUSD !== 'Custom' && (
                      <div className="text-xs text-text-tertiary mb-4">
                        ≈ {tier.priceUSD} USD
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="h-px bg-border-subtle mb-6" />

                  {/* Features */}
                  <ul className="space-y-4 mb-8 grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                          <Check size={12} className="text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-text-secondary text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/book"
                    className={`w-full text-center py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${tier.popular
                      ? 'bg-primary hover:bg-primary-hover text-background shadow-lg shadow-primary/30'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-border-subtle hover:border-border-medium'
                      }`}
                  >
                    {tier.cta}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compare Plans Button */}
          <motion.div {...fadeIn} className="text-center mb-20">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-border-medium text-sm font-medium transition-all duration-300"
            >
              <Info size={16} />
              {showComparison ? 'Hide' : 'Compare'} Plan Details
              <motion.div
                animate={{ rotate: showComparison ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={16} className="rotate-90" />
              </motion.div>
            </button>
          </motion.div>

          {/* Comparison Table */}
          {showComparison && (
            <ComparisonTable />
          )}

          {/* Value Props */}
          <motion.div
            {...fadeIn}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-20"
          >
            {[
              {
                title: 'Built-in SEO',
                description: 'Technical SEO optimized from day one for maximum discoverability and ranking.'
              },
              {
                title: 'Cloud Infrastructure',
                description: 'Scalable, reliable hosting solutions built on AWS or Vercel for global reach.'
              },
              {
                title: 'Priority Support',
                description: 'Dedicated support to ensure your product runs smoothly 24/7 with rapid response.'
              }
            ].map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-lg font-display font-bold mb-3">
                  {prop.title}
                </div>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <FAQs />

          {/* Final CTA */}
          <CTAWrapper />
        </div>
      </main>
    </>
  );
}