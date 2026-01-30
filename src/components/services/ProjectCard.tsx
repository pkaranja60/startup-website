'use client';
import { motion } from 'framer-motion';
import { Users, Star, Zap } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  metrics: { users: number; uptime: string; speed: string };
  delay?: number;
}

export default function ProjectCard({ title, description, metrics, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card rounded-3xl p-6 hover:bg-white/5 transition-all"
    >
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm mb-6">{description}</p>
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle">
        <div className="text-center">
          <Users size={16} className="text-primary mx-auto mb-1" />
          <div className="text-sm font-bold">{metrics.users}</div>
          <div className="text-xs text-text-tertiary">Users</div>
        </div>
        <div className="text-center">
          <Star size={16} className="text-primary mx-auto mb-1" />
          <div className="text-sm font-bold">{metrics.uptime}</div>
          <div className="text-xs text-text-tertiary">Uptime</div>
        </div>
        <div className="text-center">
          <Zap size={16} className="text-primary mx-auto mb-1" />
          <div className="text-sm font-bold">{metrics.speed}</div>
          <div className="text-xs text-text-tertiary">Speed</div>
        </div>
      </div>
    </motion.div>
  );
}
