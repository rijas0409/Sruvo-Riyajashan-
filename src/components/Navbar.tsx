/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  currentPage: 'home' | 'how-it-works' | 'features' | 'for-vets' | 'early-access' | 'contact' | 'privacy-policy';
  onNavigate: (page: 'home' | 'how-it-works' | 'features' | 'for-vets' | 'early-access' | 'contact' | 'privacy-policy') => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Navbar({ currentPage, onNavigate, isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Features', id: 'features' },
    { name: 'For Vets', id: 'for-vets' },
  ] as const;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(167,109,255,0.04)]">
      <div className="flex justify-between items-center px-4 md:px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden text-on-surface flex items-center justify-center p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="relative h-[40px] flex items-center">
              <img 
                src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx" 
                alt="Sruvo Logo" 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent font-headline tracking-tight">
              Sruvo
            </span>
          </motion.div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) => (
            <motion.a
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
              className={`${currentPage === item.id ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'} font-headline font-semibold text-sm tracking-tight hover:scale-105 transition-colors duration-300`}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('early-access')}
            className="primary-gradient text-on-primary px-4 py-1.5 rounded-full font-headline font-bold text-sm hover:scale-105 transition-all duration-300 shadow-md shadow-primary/20"
          >
            Early Access
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-outline-variant/10 px-6 py-4 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
              className={`font-headline font-semibold ${currentPage === item.id ? 'text-primary' : 'text-on-surface-variant'} hover:text-primary py-2`}
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
