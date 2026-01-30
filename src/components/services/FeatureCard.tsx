'use client';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  delay?: number;
}

export default function FeatureCard({ title, description, Icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card rounded-3xl p-8 hover:bg-white/5 transition-all"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
        <Icon size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

