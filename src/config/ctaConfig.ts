// src/config/ctaConfigs.ts
import { Shield, Brain, LucideIcon } from 'lucide-react'

export interface CTAConfig {
  title: string
  description: string
  linkHref: string
  linkText: string
    icon?: LucideIcon 
  bgClass?: string
  textColorClass?: string
  extraStyles?: string
}

export const ctaConfigs: Record<string, CTAConfig> = {
  '/pricing': {
    title: "Still have questions?",
    description: "Book a free consultation to discuss your project and get a custom quote tailored to your needs.",
    linkHref: "/book",
    linkText: "Book a Discovery Call",
    bgClass: "glass-card rounded-3xl p-10 md:p-12 max-w-3xl mx-auto",
  },
  '/services/web-development': {
    title: "Ready to Build Your Web Application?",
    description: "Let's discuss your project and create a solution that drives your business forward",
    linkHref: "/book",
    linkText: "Schedule Free Consultation",
    bgClass: "glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto",
  },
  '/services/mobile-development': {
    title: "Ready to Launch Your Mobile App?",
    description: "Let's build an app that your users will love",
    linkHref: "/book",
    linkText: "Get Started Today",
    bgClass: "glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10",
  },
  '/services/cybersecurity': {
    title: "Secure Your Business Today",
    description: "Don't wait for a breach. Get a comprehensive security audit now.",
    linkHref: "/book",
    linkText: "Request Security Assessment",
    icon: Shield,
    bgClass: "glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto",
    textColorClass: "text-white",
  },
  '/services/cloud': {
    title: "Ready to Move to the Cloud?",
    description: "Get a free cloud infrastructure assessment",
    linkHref: "/book",
    linkText: "Schedule Assessment",
    bgClass: "glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto",
  },
  '/services/database': {
    title: "Need Database Help?",
    description: "Get expert database consulting",
    linkHref: "/book",
    linkText: "Talk to an Expert",
    bgClass: "glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto",
  },
  '/services/ai': {
    title: "Ready for AI?",
    description: "Let's discuss how AI can transform your business",
    linkHref: "/book",
    linkText: "Start AI Project",
    icon: Brain,
    bgClass: "glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    textColorClass: "text-white",
  },
}
