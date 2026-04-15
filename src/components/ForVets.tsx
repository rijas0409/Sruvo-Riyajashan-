/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ShieldCheck, 
  MessageSquare, 
  BarChart3, 
  Lock, 
  CheckCircle2,
  Star,
  Globe,
  Languages
} from "lucide-react";

export default function ForVets() {
  return (
    <div className="bg-surface font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen relative overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none"></div>

      {/* Hero Section */}
      <header className="relative pt-32 pb-24 px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_#ffc2c9_0%,_transparent_40%),_radial-gradient(circle_at_bottom_left,_#e8e7f1_0%,_transparent_40%)] opacity-40"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/20 text-primary font-semibold text-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              The Trust Protocol for Modern Veterinary Medicine
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight leading-tight"
            >
              Elevate your <span className="bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent">practice.</span><br/> Reach more pet parents.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-on-surface-variant max-w-xl leading-relaxed"
            >
              Sruvo bridges the gap between expert care and pet owners. Join an elite network of veterinary professionals using verified data to transform pet health.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/25">
                Join as a Veterinary Partner
              </button>
              <button className="bg-surface-container-low px-8 py-4 rounded-full font-semibold text-lg hover:bg-surface-container-high transition-colors">
                View Demo Profile
              </button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                className="w-full h-full object-cover" 
                src="https://picsum.photos/seed/vet-hero/800/800" 
                alt="Professional veterinarian"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-headline font-bold text-lg">Dr. Elena Rodriguez</h3>
                    <p className="text-sm text-on-surface-variant">Chief Medical Officer, Sruvo Network</p>
                  </div>
                  <div className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 fill-current" />
                    VERIFIED
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Benefits Bento Grid */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Benefits for Professionals</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-extrabold">Tools designed for clinical excellence.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Seamless Communication */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              className="md:col-span-2 bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-headline font-bold">Seamless Communication</h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    Integrated messaging platform that keeps you connected with pet owners. Send updates, share reports, and manage follow-ups without leaving your clinical workflow.
                  </p>
                </div>
                <div className="flex-1 w-full bg-surface-container rounded-2xl p-4 overflow-hidden">
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3 w-4/5 translate-x-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div className="h-2 w-24 bg-slate-100 rounded"></div>
                    </div>
                    <div className="bg-primary-container/20 p-3 rounded-xl flex items-center gap-3 w-4/5 ml-auto -translate-x-2">
                      <div className="h-2 w-32 bg-primary/40 rounded"></div>
                      <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Practice Management */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-headline font-bold">Practice Management</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Advanced analytics and scheduling tools to optimize your clinic's daily operations.
                </p>
              </div>
            </motion.div>

            {/* Verified Data Vault */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-headline font-bold">Verified Data Vault</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  A secure, blockchain-verified medical record system that ensures data integrity and portability.
                </p>
              </div>
            </motion.div>

            {/* Expert Reach */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <h4 className="text-2xl font-headline font-bold">Reach More Pet Parents</h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    Get discovered by local pet owners looking for high-trust veterinary professionals. Your Sruvo profile acts as a digital storefront for your excellence.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-on-surface-variant">
                      <CheckCircle2 className="text-tertiary w-5 h-5" />
                      Geographic-targeted discovery
                    </li>
                    <li className="flex items-center gap-2 text-on-surface-variant">
                      <CheckCircle2 className="text-tertiary w-5 h-5" />
                      Specialty search tags
                    </li>
                  </ul>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="h-32 bg-surface rounded-2xl"></div>
                  <div className="h-32 bg-primary-container/10 rounded-2xl"></div>
                  <div className="h-32 bg-secondary-container/10 rounded-2xl"></div>
                  <div className="h-32 bg-tertiary-container/10 rounded-2xl"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Vets Profiles */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">The Sruvo Network</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-extrabold">Meet our verified partners.</h3>
            </div>
            <button className="hidden md:block text-primary font-bold hover:underline">Explore all partners →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Julian Vance", role: "Orthopedic Surgeon", rating: "5.0", seed: "vet1" },
              { name: "Dr. Sarah Chen", role: "Exotic Animal Expert", rating: "4.9", seed: "vet2" },
              { name: "Dr. Marcus Thorne", role: "Feline Specialist", rating: "4.8", seed: "vet3" },
              { name: "Dr. Aisha Khan", role: "Senior Vet / Clinic Director", rating: "5.0", seed: "vet4" }
            ].map((vet, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    src={`https://picsum.photos/seed/${vet.seed}/400/600`} 
                    alt={vet.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="text-primary w-3 h-3 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-on-surface">Verified</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-headline font-bold text-xl">{vet.name}</h4>
                  <p className="text-on-surface-variant text-sm mb-4 italic">{vet.role}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3 fill-current" />)}
                    </div>
                    <span className="text-xs font-bold text-on-surface">{vet.rating}</span>
                  </div>
                  <button className="w-full py-3 rounded-xl border border-outline-variant font-bold hover:bg-primary-container/10 hover:border-primary transition-all">View Profile</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
