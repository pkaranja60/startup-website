'use client';

import CTAWrapper from '@/components/common/CTAWrapper';
import { cybersecurityServices, cybersecurityThreats } from '@/constants/ServiceData';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Fingerprint,
  Key
} from 'lucide-react';
import Link from 'next/link';

export default function CybersecurityLayout() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <main className="min-h-screen pt-32">
        {/* Hero with Shield Visual */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                  <Shield size={16} className="text-purple-400" />
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    Cybersecurity
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Protect Your
                  <br />
                  <span className="text-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Digital Assets
                  </span>
                </h1>

                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  Enterprise-grade security solutions to protect your business from cyber threats. 
                  We ensure compliance, prevent breaches, and maintain 24/7 vigilance.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    'ISO 27001 Certified processes',
                    'Zero security breaches track record',
                    'Instant threat response',
                    'Regular security updates'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-purple-400" />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-purple-500/40 hover:scale-105 transition-all"
                >
                  Schedule Security Audit
                  <ArrowRight size={20} />
                </Link>
              </motion.div>

              {/* Shield Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex justify-center"
              >
                <div className="relative w-80 h-80">
                  {/* Rotating outer ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30"
                  />
                  
                  {/* Middle ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-full border border-purple-500/20"
                  />

                  {/* Center Shield */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 0 0px rgba(168, 85, 247, 0)',
                          '0 0 30px rgba(168, 85, 247, 0.4)',
                          '0 0 0px rgba(168, 85, 247, 0)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-48 h-48 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-500/30 flex items-center justify-center"
                    >
                      <Shield size={96} className="text-purple-400" />
                    </motion.div>
                  </div>

                  {/* Floating icons */}
                  {[Lock, Key, Fingerprint, Eye].map((Icon, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 10, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.5,
                        repeat: Infinity
                      }}
                      className="absolute glass-card p-3 rounded-xl"
                      style={{
                        top: `${20 + i * 20}%`,
                        [i % 2 === 0 ? 'left' : 'right']: '-20px'
                      }}
                    >
                      <Icon size={20} className="text-purple-400" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-gradient-to-b from-background to-surface">
          <div className="container-max">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4">Security Services</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Comprehensive protection across all attack vectors
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cybersecurityServices.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-3xl p-8"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                      <Icon size={32} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                    <p className="text-text-secondary text-sm">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Threats Protected Against */}
        <section className="section-padding">
          <div className="container-max">
            <motion.div {...fadeIn} className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold mb-4">Threats We Defend Against</h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {cybersecurityThreats.map((threat, i) => (
                <motion.div
                  key={threat}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card px-6 py-3 rounded-full flex items-center gap-2"
                >
                  <AlertTriangle size={16} className="text-red-400" />
                  <span className="text-sm font-medium">{threat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
    <CTAWrapper />
      </main>
    </>
  );
}