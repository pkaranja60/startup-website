'use client';

import Link from 'next/link';
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react'; // Add Moon and Sun icons
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/data/otherData';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes'; // Import useTheme

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const pathname = usePathname();

  // Theme management using next-themes
  const { theme, setTheme } = useTheme(); // Access theme and setTheme

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full glass-card hover:bg-white/10 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Sun className="w-6 h-6 text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Moon className="w-6 h-6 text-slate-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle background glow effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />
    </button>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`glass max-w-6xl mx-auto rounded-full px-6 md:px-8 py-4 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'shadow-lg shadow-black/20' : ''
          }`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-display font-bold tracking-tight"
          >
            DrD <span className="text-primary">Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/pricing"
              className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/case-studies"
              className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors relative group"
            >
              Case Studies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/blog"
              className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className="text-sm font-medium text-text-secondary hover:text-foreground flex items-center gap-1 transition-colors relative group"
              >
                Services <ChevronDown size={16} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-15 left-0 right-0 w-64 glass-card backdrop-blur-xl rounded-2xl shadow-lg shadow-black/20 border border-white/10 z-50 overflow-hidden"
                  >
                    {services.map(service => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block px-4 py-3 text-text-primary hover:text-primary hover:bg-white/5 transition-all"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Conditional Book Link */}
            {pathname === '/blog' ? (
              <Link
                href="/book"
                className="bg-primary hover:bg-primary-hover text-background px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 shadow-lg shadow-primary/30 hover:shadow-primary/50"
              >
                Book a Discovery Call
              </Link>
            ) : null}
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-secondary hover:text-foreground transition-colors p-2"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-30 left-4 right-4 z-50 md:hidden"
            >
              <div className="glass-card backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-black/40 border border-white/10 max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="text-base font-medium py-3 px-4 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>

                  <Link
                    href="/pricing"
                    className="text-base font-medium py-3 px-4 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>

                  <Link
                    href="/case-studies"
                    className="text-base font-medium py-3 px-4 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Case Studies
                  </Link>

                  <Link
                    href="/blog"
                    className="text-base font-medium py-3 px-4 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </Link>

                  {/* Services Dropdown Mobile */}
                  <div className="flex flex-col">
                    {services.map(service => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="text-base font-medium py-3 px-4 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-border-subtle my-2" />

                  <Link
                    href="/book"
                    className="bg-primary hover:bg-primary-hover text-background px-6 py-3.5 rounded-full font-bold text-center shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95"
                    onClick={() => setIsOpen(false)}
                  >
                    Book a Discovery Call
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
