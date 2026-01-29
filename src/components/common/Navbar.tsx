'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
              href="/book"
              className="bg-primary hover:bg-primary-hover text-background px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 shadow-lg shadow-primary/30 hover:shadow-primary/50"
            >
              Book a Discovery Call
            </Link>
          </div>

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
              <div className="glass-card backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-black/40 border border-white/10">
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
