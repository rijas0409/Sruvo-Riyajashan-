/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface FooterProps {
  onNavigate?: (page: 'home' | 'how-it-works' | 'features' | 'for-vets' | 'early-access' | 'contact' | 'privacy-policy') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-headline font-bold text-on-surface text-2xl">Sruvo</span>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-xs text-center md:text-left">
            The ethereal sanctuary for pet parents and their beloved companions. All images for demo purposes only.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {['Privacy Policy', 'Terms of Service', 'Contact', 'Press Kit'].map(link => (
            <button 
              key={link} 
              onClick={() => {
                if (link === 'Contact') onNavigate?.('contact');
                if (link === 'Privacy Policy') onNavigate?.('privacy-policy');
              }}
              className="text-on-surface-variant hover:text-primary text-sm underline decoration-primary/30 transition-all"
            >
              {link}
            </button>
          ))}
        </div>
        <div className="text-on-surface-variant text-sm">
          © 2026 Sruvo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
