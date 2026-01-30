'use client';

import CTAWrapper from '@/components/common/CTAWrapper';
import { databases, DatabaseServices } from '@/data/ServiceData';
import { motion } from 'framer-motion';
import { Database, ArrowRight, CheckCircle2, HardDrive } from 'lucide-react';
import Link from 'next/link';

export default function DatabaseLayout() {
 

  return (
    <>
    
      <main className="min-h-screen pt-32">
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                  <Database size={16} className="text-accent" />
                  <span className="text-xs font-bold text-accent uppercase tracking-widest">Database Solutions</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Robust Data
                  <br />
                  <span className="text-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Infrastructure
                  </span>
                </h1>

                <p className="text-lg text-text-secondary mb-8">
                  Design, implement, and optimize database systems that power your business. 
                  From SQL to NoSQL, we handle it all.
                </p>

                <div className="space-y-3 mb-8">
                  {['99.99% uptime guarantee', 'Automated backups', 'Real-time replication', 'Advanced security'].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent" />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/book" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-background px-8 py-4 rounded-full font-bold shadow-xl shadow-accent/40 hover:scale-105 transition-all">
                  Optimize Your Database
                  <ArrowRight size={20} />
                </Link>
              </motion.div>

              {/* Database Visual */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative h-96">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Stack of database layers */}
                  {[0, 1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ y: i * 20, opacity: 0 }}
                      animate={{ y: i * 15, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="absolute w-64 h-16 rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm border border-accent/30"
                      style={{ top: `${30 + i * 15}%` }}
                    >
                      <div className="flex items-center justify-center h-full gap-3">
                        <HardDrive size={24} className="text-accent" />
                        <div className="text-xs font-bold">Layer {i + 1}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding bg-gradient-to-b from-background to-surface">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {DatabaseServices.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-3xl p-6 text-center"
                  >
                    <Icon size={32} className="text-accent mx-auto mb-4" />
                    <h3 className="font-display font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-text-tertiary">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Databases */}
        <section className="section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-display font-bold mb-4">Databases We Work With</h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {databases.map((db, i) => (
                <motion.div
                  key={db}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card px-6 py-3 rounded-full border border-border-subtle hover:border-accent/30 transition-all"
                >
                  {db}
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
