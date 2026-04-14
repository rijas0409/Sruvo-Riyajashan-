/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import Footer from "./Footer";

interface BottomLayoutProps {
  onNavigate?: (page: 'home' | 'how-it-works' | 'features' | 'for-vets' | 'early-access' | 'contact' | 'privacy-policy') => void;
}

export default function BottomLayout({ onNavigate }: BottomLayoutProps) {
  return (
    <>
      {/* Trust Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-white/40 shadow-2xl text-center"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-tertiary-container/20 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-8 tracking-tight max-w-3xl mx-auto leading-tight">Built on the Foundation of Responsible Sourcing</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              Every pet on Sruvo undergoes a rigorous verification process. We partner with ethical breeders and shelters to ensure transparency, health, and lifelong commitment to animal welfare.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Vet Screened", value: "100%" },
                { label: "Encrypted Data", value: "Safe" },
                { label: "Support", value: "24/7" },
                { label: "Health Records", value: "Verified" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary font-headline mb-2">{stat.value}</span>
                  <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <Footer onNavigate={onNavigate} />
    </>
  );
}
