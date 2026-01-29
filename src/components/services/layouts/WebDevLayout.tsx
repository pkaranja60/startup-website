'use client';

import { motion } from 'framer-motion';
import { 
  Code2, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { features,projects, webTechnologies } from '@/constants/ServiceData';
import CTAWrapper from '@/components/common/CTAWrapper';

export default function WebDevLayout() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  };

  
  return (
    <>
      <main className="min-h-screen pt-32 overflow-hidden">
        {/* Hero Section with Browser Mockup */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Code2 size={16} className="text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Web Development
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                  Build Powerful
                  <br />
                  <span className="text-primary-gradient">Web Applications</span>
                </h1>

                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  Transform your ideas into high-performance web applications. 
                  We create scalable, SEO-optimized solutions that drive growth 
                  and deliver exceptional user experiences.
                </p>

                {/* Key Benefits */}
                <div className="space-y-3 mb-8">
                  {[
                    '100 Lighthouse Performance Score',
                    'Mobile-first responsive design',
                    'Advanced SEO optimization',
                    'Scalable cloud infrastructure'
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} className="text-primary" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-text-secondary">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-xl shadow-primary/40 hover:scale-105"
                  >
                    Start Your Project
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold border border-border-subtle hover:border-border-medium transition-all"
                  >
                    View Pricing
                  </Link>
                </div>
              </motion.div>

              {/* Right - Browser Mockup */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Browser Window */}
                <div className="glass-card rounded-2xl overflow-hidden border border-border-subtle">
                  {/* Browser Chrome */}
                  <div className="bg-white/5 px-4 py-3 border-b border-border-subtle flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-primary/80" />
                    </div>
                    <div className="flex-grow ml-4 bg-white/5 rounded-lg px-3 py-1.5 text-xs text-text-tertiary">
                      https://yourwebsite.com
                    </div>
                  </div>
                  
                  {/* Browser Content - Placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-surface to-accent/10 p-8 flex items-center justify-center relative overflow-hidden">
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                      }} />
                    </div>
                    
                    {/* Code Icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative"
                    >
                      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center">
                        <Code2 size={64} className="text-primary" />
                      </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-8 right-8 glass-card px-4 py-2 rounded-xl text-xs font-bold text-primary"
                    >
                      100 Score
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="absolute bottom-8 left-8 glass-card px-4 py-2 rounded-xl text-xs font-bold text-accent"
                    >
                      1s Load
                    </motion.div>
                  </div>
                </div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 border border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold">400+</div>
                      <div className="text-xs text-text-tertiary">Projects Delivered</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section-padding bg-gradient-to-b from-background to-surface">
          <div className="container-max">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Why Choose Our Web Development
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                We build web applications that are fast, secure, and scalable
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-3xl p-8 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="section-padding">
          <div className="container-max">
            <motion.div {...fadeIn} className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Technologies We Use
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Modern, battle-tested technologies for production-grade applications
              </p>
            </motion.div>

            <motion.div {...fadeIn} className="flex flex-wrap justify-center gap-4">
              {webTechnologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card px-6 py-3 rounded-full border border-border-subtle hover:border-primary/30 transition-all"
                >
                  <span className="text-sm font-medium">{tech}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="section-padding bg-gradient-to-b from-background to-surface">
          <div className="container-max">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Recent Projects
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-3xl p-6 hover:bg-white/[0.05] transition-all"
                >
                  <h3 className="text-xl font-display font-bold mb-2">{project.title}</h3>
                  <p className="text-text-secondary text-sm mb-6">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle">
                    <div className="text-center">
                      <Users size={16} className="text-primary mx-auto mb-1" />
                      <div className="text-sm font-bold">{project.metrics.users}</div>
                      <div className="text-xs text-text-tertiary">Users</div>
                    </div>
                    <div className="text-center">
                      <Star size={16} className="text-primary mx-auto mb-1" />
                      <div className="text-sm font-bold">{project.metrics.uptime}</div>
                      <div className="text-xs text-text-tertiary">Uptime</div>
                    </div>
                    <div className="text-center">
                      <Zap size={16} className="text-primary mx-auto mb-1" />
                      <div className="text-sm font-bold">{project.metrics.speed}</div>
                      <div className="text-xs text-text-tertiary">Speed</div>
                    </div>
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