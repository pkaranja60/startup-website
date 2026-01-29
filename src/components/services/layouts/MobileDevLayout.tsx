'use client';

import CTAWrapper from '@/components/common/CTAWrapper';
import { appFeatures, mobileStats, mobileTechnologies, platforms } from '@/constants/ServiceData';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle2,
  Download,
  Bell,
  Heart,
  Apple,
  PlayCircle
} from 'lucide-react';
import Link from 'next/link';

export default function MobileDevLayout() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  };


  return (
    <>

      <main className="min-h-screen pt-32 overflow-hidden">
        {/* Hero with Phone Mockup */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                  <Smartphone size={16} className="text-accent" />
                  <span className="text-xs font-bold text-accent uppercase tracking-widest">
                    Mobile Development
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Create Stunning
                  <br />
                  <span className="text-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Mobile Experiences
                  </span>
                </h1>

                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  Build native and cross-platform mobile applications that users love. 
                  From concept to App Store, we handle everything.
                </p>

                {/* Platform Badges */}
                <div className="flex gap-4 mb-8">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <div key={platform.name} className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3">
                        <Icon size={24} className={platform.color} />
                        <span className="font-bold">{platform.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Key Features List */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {appFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-background px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-xl shadow-accent/40 hover:scale-105"
                  >
                    Start Your App
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold border border-border-subtle transition-all"
                  >
                    View Pricing
                  </Link>
                </div>
              </motion.div>

              {/* Right - Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center lg:justify-end"
              >
                {/* Phone Frame */}
                <div className="relative">
                  {/* Phone Body */}
                  <div className="w-[280px] h-[570px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/50 relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />
                    
                    {/* Screen */}
                    <div className="w-full h-full bg-gradient-to-b from-surface to-background rounded-[2.5rem] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/20 to-transparent z-10 flex items-center justify-between px-8 pt-2">
                        <span className="text-xs font-bold">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-4 border border-white/50 rounded-sm" />
                          <div className="w-1 h-4 bg-white/50 rounded-sm" />
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="pt-16 px-6 h-full overflow-hidden">
                        {/* App Header */}
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mb-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-xs text-text-tertiary mb-1">Welcome back</div>
                              <div className="text-lg font-display font-bold">Your App</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                              <Users size={20} className="text-background" />
                            </div>
                          </div>
                        </motion.div>

                        {/* Feature Cards */}
                        <div className="space-y-3">
                          {[
                            { icon: Bell, label: 'Notifications', color: 'from-yellow-500 to-orange-500', delay: 0.6 },
                            { icon: Heart, label: 'Favorites', color: 'from-pink-500 to-red-500', delay: 0.7 },
                            { icon: Download, label: 'Downloads', color: 'from-blue-500 to-cyan-500', delay: 0.8 },
                          ].map((item) => {
                            const Icon = item.icon;
                            return (
                              <motion.div
                                key={item.label}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: item.delay }}
                                className="glass-card rounded-2xl p-4 flex items-center gap-4"
                              >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                                  <Icon size={20} className="text-white" />
                                </div>
                                <div className="flex-grow">
                                  <div className="text-sm font-bold mb-1">{item.label}</div>
                                  <div className="text-xs text-text-tertiary">Tap to view</div>
                                </div>
                                <ArrowRight size={16} className="text-text-tertiary" />
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Bottom Stats */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="absolute bottom-6 left-6 right-6"
                        >
                          <div className="glass-card rounded-2xl p-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-lg font-display font-bold text-accent">4.8★</div>
                                <div className="text-xs text-text-tertiary">Rating</div>
                              </div>
                              <div>
                                <div className="text-lg font-display font-bold text-primary">50K+</div>
                                <div className="text-xs text-text-tertiary">Users</div>
                              </div>
                              <div>
                                <div className="text-lg font-display font-bold">98%</div>
                                <div className="text-xs text-text-tertiary">Uptime</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-8 -right-8 glass-card rounded-2xl px-4 py-3 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <Apple size={20} className="text-gray-300" />
                      <span className="text-sm font-bold">iOS Ready</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="absolute -bottom-8 -left-8 glass-card rounded-2xl px-4 py-3 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <PlayCircle size={20} className="text-primary" />
                      <span className="text-sm font-bold">Android Ready</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-gradient-to-b from-background to-surface">
          <div className="container-max">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {mobileStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-display font-bold text-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-tertiary uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="section-padding">
          <div className="container-max">
            <motion.div {...fadeIn} className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Mobile Technologies
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Cross-platform and native development tools
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {mobileTechnologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card px-6 py-3 rounded-full border border-border-subtle hover:border-accent/30 transition-all"
                >
                  <span className="text-sm font-medium">{tech}</span>
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