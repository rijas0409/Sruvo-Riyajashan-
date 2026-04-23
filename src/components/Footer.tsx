/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="font-headline font-bold text-on-surface text-2xl">Sruvo</Link>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-xs text-center md:text-left">
            A unified platform designed for modern pet care from discovery to lifelong management.
          </p>
          <div className="flex justify-center md:justify-start gap-6 mt-2">
            <a href="https://www.facebook.com/Sruvo/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#1877F2] transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/thesruvo" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#E4405F] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/sruvo" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#0A66C2] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com/Thesruvo" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-black transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 py-2">
          <div className="flex justify-center gap-8 md:gap-12">
            <Link to="/privacy-policy" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Terms of Service</Link>
          </div>
          <div className="flex justify-center gap-8 md:gap-12">
            <Link to="/contact" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Contact</Link>
            <Link to="/press-kit" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Press Kit</Link>
            <Link to="/pet-transportation" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Pet Transportation</Link>
          </div>
        </div>
        <div className="text-on-surface-variant text-sm">
          © 2026 Sruvo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
