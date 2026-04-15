/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="selection:bg-primary-container selection:text-on-primary-container relative overflow-x-hidden">
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
              <button 
                onClick={() => navigate('/become-partner')}
                className="bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/25"
              >
                Join as a Veterinary Partner
              </button>
              <button 
                onClick={() => document.getElementById('verified-partners')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-surface-container-low px-8 py-4 rounded-full font-semibold text-lg hover:bg-surface-container-high transition-colors"
              >
                View Profile
              </button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            whileHover={{ rotate: 0 }}
            className="flex-1 relative"
          >
            <motion.div 
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="relative w-full aspect-[2/3] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
            >
              <motion.img 
                whileTap={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-cover object-top" 
                src="https://drive.google.com/thumbnail?id=17QPHm2Wi3tuoLFqre9eTtMjqQYl0UMyf&sz=w1000" 
                alt="Dr. Rijas Pabla"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 p-3 md:bottom-8 md:left-8 md:right-8 md:p-6 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-headline font-bold text-sm md:text-lg">Dr. Rijas Pabla</h3>
                    <p className="text-[10px] md:text-sm text-on-surface-variant">Senior Veterinary Expert</p>
                  </div>
                  <div className="px-2 md:px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[9px] md:text-xs font-bold flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-[9px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    VERIFIED
                  </div>
                </div>
              </div>
            </motion.div>
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
                <div className="flex-1 w-full grid grid-cols-2 gap-4">
                  <div className="h-28 md:h-32 bg-surface rounded-2xl shadow-sm border border-white/50"></div>
                  <div className="h-28 md:h-32 bg-primary-container/10 rounded-2xl shadow-sm border border-white/50"></div>
                  <div className="h-28 md:h-32 bg-secondary-container/10 rounded-2xl shadow-sm border border-white/50"></div>
                  <div className="h-28 md:h-32 bg-tertiary-container/10 rounded-2xl shadow-sm border border-white/50"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Vets Profiles */}
      <section id="verified-partners" className="py-24 px-8">
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
              { 
                name: "Dr. Arjun Narang", 
                role: "Orthopedic Surgeon", 
                rating: "5.0", 
                image: "https://drive.google.com/thumbnail?id=18pGbY7iGs9Vrn_F8DRQLZw0a3EjETrBw&sz=w1000" 
              },
              { 
                name: "Dr. Jass Saini", 
                role: "Exotic Animal Expert", 
                rating: "4.9", 
                image: "https://drive.google.com/thumbnail?id=15FYsFWExMlMNsx9Va0pUE-eCvL7mlemq&sz=w1000" 
              },
              { 
                name: "Dr. Priya Iyer", 
                role: "Feline Specialist", 
                rating: "4.8", 
                image: "https://drive.google.com/thumbnail?id=1CKR7jEfOzhwlBDBahAyxYPKk3y4vL-4b&sz=w1000" 
              },
              { 
                name: "Dr. Ayesha Khan", 
                role: "Senior Vet / Clinic Director", 
                rating: "5.0", 
                image: "https://drive.google.com/thumbnail?id=1nb7BRTiHvr9rkSg3AVUtukORkpsQVG5t&sz=w1000" 
              }
            ].map((vet, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                className="group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <motion.div 
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-64 overflow-hidden cursor-pointer"
                >
                  <motion.img 
                    whileTap={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={vet.image} 
                    alt={vet.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[9px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-on-surface">Verified</span>
                  </div>
                </motion.div>
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
