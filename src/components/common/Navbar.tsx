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

  return (
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
        <Link href="/" className="text-xl md:text-2xl font-display font-bold tracking-tight">
          Nexus<span className="text-primary">AI</span>
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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-20 left-4 right-4 glass rounded-3xl p-6 flex flex-col gap-4 shadow-xl shadow-black/30"
            >
              <Link
                href="/"
                className="text-base font-medium py-3 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="text-base font-medium py-3 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <div className="h-px bg-border-subtle my-2" />
              <Link
                href="/book"
                className="bg-primary hover:bg-primary-hover text-background px-6 py-3.5 rounded-full font-bold text-center shadow-lg shadow-primary/30 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Book a Discovery Call
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}