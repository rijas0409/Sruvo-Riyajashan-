/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname;
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Features', path: '/features' },
    { name: 'For Vets', path: '/for-vets' },
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
            className="flex items-center gap-1"
          >
            <Link to="/" className="relative h-[40px] flex items-center">
              <img 
                src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx" 
                alt="Sruvo Logo" 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </Link>
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent font-headline tracking-tight">
              Sruvo
            </Link>
          </motion.div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `${isActive ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'} font-headline font-semibold text-sm tracking-tight hover:scale-105 transition-all duration-300`
                }
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/early-access"
            className="primary-gradient text-on-primary px-4 py-1.5 rounded-full font-headline font-bold text-sm hover:scale-105 transition-all duration-300 shadow-md shadow-primary/20"
          >
            Early Access
          </Link>
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
            <NavLink 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `font-headline font-semibold ${isActive ? 'text-primary' : 'text-on-surface-variant'} hover:text-primary py-2`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
