/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(49);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen overflow-hidden flex items-center justify-center relative">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -40, 20, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-[#A76DFF]/20 rounded-full blur-[100px] -top-40 -left-20"
        />
        <motion.div 
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 40, -20, 0],
            rotate: [0, -2, 2, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] bg-[#FF6A88]/20 rounded-full blur-[100px] -bottom-20 -right-20"
        />
        <motion.div 
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: -5 }}
          className="absolute w-[400px] h-[400px] bg-[#2ED3B7]/10 rounded-full blur-[100px] top-1/2 left-1/4"
        />
      </div>

      <main className="relative z-10 w-full max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-12 md:p-20 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] text-center relative overflow-hidden backdrop-blur-[40px] border border-white/30 bg-white/60"
        >
          {/* Logo Integration */}
          <div className="flex justify-center mb-10">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
              className="w-24 h-24 md:w-32 md:h-32"
            >
              <img 
                alt="Sruvo Logo" 
                className="w-full h-full object-contain" 
                src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Header Content */}
          <div className="mb-10">
            <span className="uppercase tracking-[0.4em] text-primary/80 font-bold mb-6 block text-sm">Sanctuary Disconnected</span>
            <h1 className="font-headline text-8xl md:text-[10rem] font-extrabold text-gradient tracking-tighter leading-none mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-4xl font-headline font-semibold text-on-surface tracking-tight mb-8">
              The path has vanished into the mist.
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto mb-14">
            <p className="text-lg md:text-xl text-on-surface-variant/80 leading-relaxed font-body">
              The sanctuary you are seeking seems to have wandered away. Let us guide you back to the warmth of our collective home.
            </p>
            <div className="mt-4 text-sm font-medium text-primary/60">
              Returning to Home in <span className="font-bold text-primary">{timeLeft} seconds</span>...
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              to="/" 
              className="bg-gradient-primary text-white px-12 py-5 rounded-xl font-bold text-lg hover:shadow-[0_20px_40px_-10px_rgba(167,109,255,0.4)] transition-all duration-300 flex items-center gap-3 active:scale-95"
            >
              <span className="material-symbols-outlined">home</span>
              Return to Sanctuary
            </Link>
            <Link 
              to="/features" 
              className="bg-white/50 backdrop-blur-sm text-on-surface border border-white/40 px-12 py-5 rounded-xl font-bold text-lg hover:bg-white/80 transition-all duration-300 flex items-center gap-3 active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined">explore</span>
              Find Your Way
            </Link>
          </div>

          {/* Decorative Ethereal Elements */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 opacity-[0.15] pointer-events-none grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              className="w-full h-full object-cover rounded-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs5Bt5TQpDJFvY2-VuA2XJBHJT3zi3MvRGxCVKfu7DnrVDKFGOwGd_p8i3azOFwyZ7dP8ar70xZxRkMk1OOzE1uUhYzkKVH-D2efw6pfW-S9yTjXy8nGZXcfbUN3YiRwNMSHe1UMqMqh6TyFpzJH9DJX8y8rnW7Ydx3dTNne3a9mKaVy6hy1EdxuxBrKCcVpaSLNwVn4uHB-M9h0e0BgharYKPQpMqN1YesNy-0EPza9CzgKPCumIFzEMLQM9CrMwdOkaw3g1Tt-g"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-16 -right-16 w-64 h-64 opacity-[0.15] pointer-events-none grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              className="w-full h-full object-cover rounded-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3xWsit48fQ1SC3ceya9SIrcSLW9-BilFXeXwqjf54Ooo8PiGpMxfSfQc5muL-5r9z9_CQD688gWsStIQjA379g2lAxq2tgG2WsmPfCHP8_5z1GiLWnN084G2tIm8FJnaf2u4P3jjoDo4GTu1ePnlGAZPY-iCvY5b_m8UAyJ1oO8eT-agUfpUFgPF9ceXUIlPbwGTeinkcII13-XBPjvBjQKBVPYUXL07xWRz_BZ8LPafpyz6RQ1XTIu5prpwwdncA8OMcJr3haXo"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Footer Lockup */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-4 text-on-surface-variant/50">
            <span className="font-headline font-extrabold tracking-tighter text-2xl text-gradient">Sruvo</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant/30"></span>
            <span className="font-semibold tracking-[0.2em] text-xs">THE ETHEREAL SANCTUARY</span>
          </div>
        </div>
      </main>

      {/* Global Grain Overlay (handled by App.tsx but added here for exactness) */}
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none opacity-[0.04]" />
    </div>
  );
}
