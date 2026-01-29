import { Github, Linkedin, Twitter } from "lucide-react";

export   const footerLinks = {
    services: [
      { label: 'Web Development', href: '/#services' },
      { label: 'Mobile Apps', href: '/#services' },
      { label: 'Cybersecurity', href: '/#services' },
      { label: 'Cloud Solutions', href: '/#services' },
      { label: 'Database Solutions', href: '/#services' },
      { label: 'AI Integration', href: '/#services' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Book a Call', href: '/book' },
      { label: 'Our Process', href: '/#process' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Careers', href: '/careers' }
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Support Center', href: '/support' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Status', href: '/status' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Data Protection', href: '/data-protection' }
    ]
  };

  export const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' }
  ];