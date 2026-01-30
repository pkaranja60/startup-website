'use client';
import { motion } from 'framer-motion';

interface TechBadgeProps {
  tech: string;
  delay?: number;
}

export default function TechBadge({ tech, delay = 0 }: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className="glass-card px-6 py-3 rounded-full border border-border-subtle hover:border-primary/30 transition-all"
    >
      <span className="text-sm font-medium">{tech}</span>
    </motion.div>
  );
}
