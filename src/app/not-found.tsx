'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ErrorsLayout from './(errors)/layout';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Floating glitch icons positions
  const glitchIcons = [
    { x: 10, y: 15, delay: 0, rotation: 15 },
    { x: 85, y: 20, delay: 0.5, rotation: -20 },
    { x: 15, y: 70, delay: 1, rotation: 25 },
    { x: 90, y: 75, delay: 1.5, rotation: -15 },
    { x: 50, y: 10, delay: 2, rotation: 10 },
    { x: 20, y: 45, delay: 2.5, rotation: -25 },
  ];

  return (
 <ErrorsLayout>
     <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating Glitch Icons */}
      {glitchIcons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8 lg:w-12 lg:h-12"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            rotate: [icon.rotation, icon.rotation + 10, icon.rotation],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            delay: icon.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-primary rounded-full" />
          </div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* 404 Display */}
        <div className="flex items-center justify-center gap-4 lg:gap-8 mb-8 lg:mb-12">
          {/* First 4 */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-8xl sm:text-9xl lg:text-[12rem] xl:text-[14rem] font-display font-bold leading-none"
            style={{
              transform: windowWidth > 0 ? `perspective(1000px) rotateY(${(mousePosition.x - windowWidth / 2) * 0.01}deg)` : 'none',
            }}
          >
            4
          </motion.div>

          {/* Center Elements */}
          <div className="flex flex-col items-center gap-3 lg:gap-4">
            {/* Top Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-16 lg:w-24 h-3 lg:h-4 bg-gradient-to-r from-primary to-accent rounded-full"
            />

            {/* Sad Face */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/40 flex items-center justify-center relative"
            >
              {/* Eyes */}
              <div className="absolute top-5 lg:top-6 left-1/2 -translate-x-1/2 flex gap-2 lg:gap-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-primary rounded-full" />
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-primary rounded-full" />
              </div>
              {/* Sad Mouth */}
              <div className="absolute bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 w-6 lg:w-8 h-3 lg:h-4 border-b-2 border-primary rounded-b-full" />
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="w-16 lg:w-24 h-3 lg:h-4 bg-gradient-to-r from-accent to-primary rounded-full"
            />
          </div>

          {/* Second 4 */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-8xl sm:text-9xl lg:text-[12rem] xl:text-[14rem] font-display font-bold leading-none"
            style={{
              transform: windowWidth > 0 ? `perspective(1000px) rotateY(${(mousePosition.x - windowWidth / 2) * -0.01}deg)` : 'none',
            }}
          >
            4
          </motion.div>
        </div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-8 lg:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
            The page you're looking for doesn't exist. It might have been moved, deleted, 
            or you may have typed the wrong URL.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-background px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold transition-all duration-300 shadow-xl shadow-primary/40 hover:scale-105 active:scale-95"
          >
            <Home size={20} />
            Go Home
          </Link>

          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold border border-border-subtle hover:border-border-medium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Search size={20} />
            Explore Services
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-12 lg:mt-16"
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-primary transition-colors"
          >
            <HelpCircle size={16} />
            Need help? Contact our support team
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-8 left-8 text-xs text-text-tertiary font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      >
        ERROR_CODE: 404
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 text-xs text-text-tertiary font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      >
        STATUS: NOT_FOUND
      </motion.div>
    </div>
 </ErrorsLayout>
  );
}