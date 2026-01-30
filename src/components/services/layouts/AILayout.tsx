'use client';

import CTAWrapper from '@/components/common/CTAWrapper';
import { aiCapabilities, aiUseCases } from '@/data/ServiceData';
import { motion } from 'framer-motion';
import { Cpu, Brain, Sparkles, ArrowRight, Bot, MessageSquare, BarChart3, Zap } from 'lucide-react';
import Link from 'next/link';


export default function AILayout() {

  return (
    <>
     
      <main className="min-h-screen pt-32">
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                  <Brain size={16} className="text-purple-400" />
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">AI & Machine Learning</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Intelligent
                  <br />
                  <span className="text-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Automation
                  </span>
                </h1>

                <p className="text-lg text-text-secondary mb-8">
                  Integrate cutting-edge AI into your products. From chatbots to predictive models, 
                  we build AI solutions that actually work.
                </p>

                <div className="flex gap-4 mb-8">
                  <div className="glass-card px-6 py-4 rounded-2xl text-center">
                    <div className="text-3xl font-display font-bold text-purple-400 mb-1">50+</div>
                    <div className="text-xs text-text-tertiary">AI Models Deployed</div>
                  </div>
                  <div className="glass-card px-6 py-4 rounded-2xl text-center">
                    <div className="text-3xl font-display font-bold text-purple-400 mb-1">90%</div>
                    <div className="text-xs text-text-tertiary">Accuracy Rate</div>
                  </div>
                </div>

                <Link href="/book" className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-purple-500/40 hover:scale-105 transition-all">
                  Explore AI Solutions
                  <ArrowRight size={20} />
                </Link>
              </motion.div>

              {/* AI Brain Visual */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative h-96">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Central Brain/CPU */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 0px rgba(168, 85, 247, 0)',
                        '0 0 50px rgba(168, 85, 247, 0.5)',
                        '0 0 0px rgba(168, 85, 247, 0)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-48 h-48 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-purple-500/30 flex items-center justify-center relative"
                  >
                    <Brain size={96} className="text-purple-400" />
                    
                    {/* Neural Network Lines */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: [0.2, 0.8, 0.2],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.25,
                          repeat: Infinity
                        }}
                        className="absolute w-2 h-2 rounded-full bg-purple-400"
                        style={{
                          top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                          left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Orbiting Sparkles */}
                  {[0, 120, 240].map((angle, i) => (
                    <motion.div
                      key={angle}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute glass-card p-2 rounded-xl"
                        style={{
                          top: `${50 + 35 * Math.sin((angle * Math.PI) / 180)}%`,
                          left: `${50 + 35 * Math.cos((angle * Math.PI) / 180)}%`
                        }}
                      >
                        <Sparkles size={20} className="text-purple-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section-padding bg-gradient-to-b from-background to-surface">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aiCapabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-3xl p-6 text-center"
                  >
                    <Icon size={32} className="text-purple-400 mx-auto mb-4" />
                    <h3 className="font-display font-bold mb-2">{cap.title}</h3>
                    <p className="text-sm text-text-tertiary">{cap.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-display font-bold mb-4">AI Use Cases</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiUseCases.map((useCase, i) => (
                <motion.div
                  key={useCase}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card px-6 py-4 rounded-2xl border border-border-subtle hover:border-purple-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-purple-400" />
                    <span className="font-medium">{useCase}</span>
                  </div>
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
