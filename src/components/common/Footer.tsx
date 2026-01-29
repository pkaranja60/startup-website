import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-display font-bold mb-4">
              Nexus<span className="text-primary">AI</span>
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Transform your business with cutting-edge AI-powered digital solutions. 
              We build high-performance web applications, mobile apps, and brand identities 
              that scale with your vision.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-primary flex items-center justify-center transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-primary flex items-center justify-center transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-primary flex items-center justify-center transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#services" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Branding & Design
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  AI Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/pricing" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Book a Call
                </Link>
              </li>
              <li>
                <Link href="/#process" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-text-secondary hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <Mail size={14} className="text-primary" />
                hello@nexusai.com
              </li>
              <li className="text-text-secondary text-sm">
                +1 (555) 123-4567
              </li>
              <li className="text-text-secondary text-sm leading-relaxed">
                123 Innovation Drive<br />
                San Francisco, CA 94103
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-tertiary text-sm">
            © {currentYear} NexusAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#" className="text-text-tertiary hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/#" className="text-text-tertiary hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#" className="text-text-tertiary hover:text-primary text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}