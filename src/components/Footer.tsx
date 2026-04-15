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
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: 'Privacy Policy', path: '/privacy-policy' },
            { name: 'Terms of Service', path: '/terms-of-service' },
            { name: 'Contact', path: '/contact' },
            { name: 'Press Kit', path: '#' }
          ].map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-on-surface-variant hover:text-primary text-sm underline decoration-primary/30 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="text-on-surface-variant text-sm">
          © 2026 Sruvo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
