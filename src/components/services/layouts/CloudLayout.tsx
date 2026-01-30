'use client';

import CTAWrapper from '@/components/common/CTAWrapper';
import { cloudBenefits, cloudProviders } from '@/data/ServiceData';
import { motion } from 'framer-motion';
import { Cloud, Server, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CloudLayout() {

  return (
    <>
    
      <main className="min-h-screen pt-32">
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Cloud size={16} className="text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Cloud Infrastructure</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Scale to the
                  <br />
                  <span className="text-primary-gradient">Cloud</span>
                </h1>

                <p className="text-lg text-text-secondary mb-8">
                  Migrate, optimize, and manage your infrastructure on AWS, Azure, or Google Cloud. 
                  We handle everything from migration to 24/7 monitoring.
                </p>

                <div className="flex gap-4 mb-8">
                  {cloudProviders.map(p => (
                    <div key={p.name} className="glass-card px-6 py-4 rounded-2xl text-center">
                      <div className="text-3xl mb-2">{p.logo}</div>
                      <div className="text-xs font-bold">{p.name}</div>
                    </div>
                  ))}
                </div>

                <Link href="/book" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/40 hover:scale-105 transition-all">
                  Start Cloud Migration
                  <ArrowRight size={20} />
                </Link>
              </motion.div>

              {/* Cloud Network Visual */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative h-96">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Central Cloud */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center relative z-10"
                  >
                    <Cloud size={64} className="text-primary" />
                  </motion.div>

                  {/* Satellite Servers */}
                  {[0, 90, 180, 270].map((angle, i) => (
                    <motion.div
                      key={angle}
                      animate={{ 
                        x: Math.cos(angle * Math.PI / 180) * 150,
                        y: Math.sin(angle * Math.PI / 180) * 150
                      }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="absolute w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
                    >
                      <Server size={24} className="text-primary" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="section-padding bg-gradient-to-b from-background to-surface">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cloudBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-3xl p-6 text-center"
                  >
                    <Icon size={32} className="text-primary mx-auto mb-4" />
                    <div className="text-3xl font-display font-bold text-primary mb-2">{b.value}</div>
                    <div className="text-sm font-bold">{b.title}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTAWrapper />  
      </main>
   
    </>
  );
}
