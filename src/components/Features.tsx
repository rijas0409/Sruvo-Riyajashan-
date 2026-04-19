/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Store, 
  ShoppingBag, 
  Stethoscope, 
  LineChart, 
  Fingerprint, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function Features() {
  return (
    <div className="selection:bg-primary-container selection:text-on-primary-container relative overflow-x-hidden">
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Header */}
        <header className="mb-20 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block"
          >
            Engineered for Care
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tighter leading-tight mb-6"
          >
            One platform. <br/>
            <span className="bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent">Limitless potential.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed"
          >
            Discover the sophisticated ecosystem designed to elevate every aspect of your pet's life, from medical history to verified organic nutrition.
          </motion.p>
        </header>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Marketplace - Large Lead Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="md:col-span-8 order-1 md:order-2 group"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
              <div className="p-4 md:p-8 h-full relative">
                <div className="flex flex-col h-full relative z-10">
                  <div className="w-14 h-14 rounded-2xl primary-gradient text-on-primary flex items-center justify-center mb-8 shadow-lg">
                    <Store className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-4">Marketplace</h3>
                    <p className="text-on-surface-variant max-w-md mb-8 leading-relaxed">
                      Access a curated ecosystem of verified pet services and premium supplies. Every transaction is secured by our proprietary trust-shield protocol.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-surface-container-low rounded-full text-sm font-medium text-primary">Verified Sellers</span>
                      <span className="px-4 py-2 bg-surface-container-low rounded-full text-sm font-medium text-primary">Secure Escrow</span>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <img 
                    alt="Marketplace background" 
                    className="w-full h-full object-cover" 
                    src="https://picsum.photos/seed/marketplace/800/600"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Shop - Vertical Accent Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 order-1 md:order-2 group"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
              <div className="p-4 md:p-8 h-full flex flex-col justify-between border-t-2 border-transparent hover:border-tertiary/20">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary mb-8 shadow-md">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4">The Shop</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Curated collection of essentials. From therapeutic bedding to precision nutrition.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-tertiary font-bold">Explore Collection</span>
                  <ArrowRight className="text-tertiary w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vet Consultations - Half Width */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="md:col-span-6 order-1 md:order-2 group"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
              <div className="p-4 md:p-8 h-full overflow-hidden">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary mb-8">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4">Vet Consultations</h3>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    Instant video access to top-tier specialists. On-demand guidance for urgent queries or scheduled wellness checks.
                  </p>
                </div>
                <div className="h-48 w-full mt-4 rounded-xl overflow-hidden group-hover:shadow-lg transition-all duration-700 portrait-container">
                  <img 
                    alt="Vet Consultation" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/d/1C97w78OunT-vUnIGHXkQdM7xx5FcV1gV"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Insights - Half Width */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-6 order-1 md:order-2 group"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
              <div className="p-4 md:p-8 h-full bg-gradient-to-br from-white to-surface-container-low">
                <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container mb-8">
                  <LineChart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">Personalized Insights</h3>
                <p className="text-on-surface-variant leading-relaxed mb-10">
                  AI-driven care recommendations based on your pet's breed, age, and health history. Predictive analytics for long-term vitality.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-white/50 rounded-lg flex flex-col items-center justify-center border border-primary/10">
                    <span className="text-2xl font-bold text-primary">98%</span>
                    <span className="text-[10px] uppercase font-bold text-outline">Accuracy</span>
                  </div>
                  <div className="h-24 bg-white/50 rounded-lg flex flex-col items-center justify-center border border-primary/10">
                    <span className="text-2xl font-bold text-primary">24/7</span>
                    <span className="text-[10px] uppercase font-bold text-outline">Monitoring</span>
                  </div>
                  <div className="h-24 bg-white/50 rounded-lg flex flex-col items-center justify-center border border-primary/10">
                    <span className="text-2xl font-bold text-primary">4.9</span>
                    <span className="text-[10px] uppercase font-bold text-outline">Trust</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pet Profiles - Large Bottom Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="md:col-span-12 order-1 md:order-2 group"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
              <div className="p-4 md:p-12 h-full flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <div className="w-14 h-14 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary mb-8">
                    <Fingerprint className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-headline font-bold mb-6">Digital Health Vault</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                    A centralized, secure home for your pet's entire life story. Vaccination records, genetic mapping, and activity logs—all accessible with a single tap.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-on-surface">
                      <CheckCircle2 className="text-tertiary w-6 h-6 fill-current" />
                      <span className="font-medium">Blockchain-verified records</span>
                    </li>
                    <li className="flex items-center gap-4 text-on-surface">
                      <CheckCircle2 className="text-tertiary w-6 h-6 fill-current" />
                      <span className="font-medium">Instant veterinary data sharing</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 w-full aspect-video rounded-3xl overflow-hidden relative shadow-2xl portrait-container">
                  <img 
                    alt="Pet Profile Interface" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/d/18YlDZpE-U6ILpidQNZPOHAb0V8tJ60zT"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

    </div>
  );
}
