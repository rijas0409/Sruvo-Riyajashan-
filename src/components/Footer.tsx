/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="font-headline font-bold text-on-surface text-2xl">Sruvo</Link>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-xs text-center md:text-left">
            A unified platform designed for modern pet care from discovery to lifelong management.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 py-2">
          <div className="flex justify-center gap-8 md:gap-12">
            <Link to="/privacy-policy" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Terms of Service</Link>
          </div>
          <div className="flex justify-center gap-8 md:gap-12">
            <Link to="/contact" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Contact</Link>
            <Link to="/press-kit" className="text-on-surface-variant hover:text-primary text-sm font-medium transition-all hover:underline decoration-primary/30">Press Kit</Link>
          </div>
        </div>
        <div className="text-on-surface-variant text-sm">
          © 2026 Sruvo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
