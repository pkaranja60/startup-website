import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { footerLinks, socialLinks } from '@/data/footerLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border-subtle">
      <div className="container-max px-4 sm:px-6 py-12 sm:py-16 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-12 lg:mb-16">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4">
              DrD <span className="text-primary">Solutions</span>
            </h3>
            <p className="text-text-secondary text-sm lg:text-base leading-relaxed mb-6 max-w-sm">
              Digital solutions built for growth. We design and develop high-performance
              websites, mobile applications, and scalable systems tailored to your business.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-primary flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon
                      size={18}
                      className="text-text-secondary group-hover:text-primary transition-colors"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider text-foreground">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors text-sm block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors text-sm block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors text-sm block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@drdsolutions.com"
                  className="flex items-start gap-2.5 text-text-secondary hover:text-primary transition-colors text-sm group"
                >
                  <Mail size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="break-all">hello@drdsolutions.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+254712345678"
                  className="flex items-center gap-2.5 text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  <Phone size={16} className="text-primary shrink-0" />
                  +254 712 345 678
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-text-secondary text-sm">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  Westlands, Nairobi<br />
                  Kenya
                </span>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6 pt-6 border-t border-border-subtle">
              <p className="text-xs text-text-tertiary uppercase tracking-wider font-bold mb-2">
                Business Hours
              </p>
              <p className="text-sm text-text-secondary">
                Mon – Fri: 9:00 AM – 6:00 PM EAT<br />
                <span className="text-xs text-text-tertiary">
                  Support available on request
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-subtle pt-8">
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-text-tertiary text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} DrD Solutions. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-text-tertiary hover:text-primary text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border-subtle text-center">
            <p className="text-xs text-text-tertiary">
              Built with <span className="text-primary">♥</span> in Nairobi, Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
