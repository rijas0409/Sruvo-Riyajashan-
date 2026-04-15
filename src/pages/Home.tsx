/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Fingerprint, 
  Stethoscope, 
  Sparkles, 
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomLayout from "../components/BottomLayout";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen relative overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none"></div>

      {/* Hero Section */}
      <main className="pt-24 sm:pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center md:text-left relative z-10 max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block py-1.5 px-4 rounded-full bg-primary-container/20 text-primary font-semibold text-xs sm:text-sm mb-6 tracking-wide uppercase"
            >
              Revolutionizing Pet Ownership
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-headline leading-[1.1] mb-8 tracking-tighter">
              The Future of <br/>
              <span className="bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent">Pet Care is Here.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed">
              Sruvo is the ethereal sanctuary for modern pet parents. We combine advanced vet-verified credentials with a seamless digital ecosystem to ensure your furry friends live their best lives.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/early-access')}
                className="primary-gradient text-on-primary px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-xl shadow-primary/25 min-w-[180px] sm:min-w-[200px]"
              >
                Get Early Access
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/how-it-works')}
                className="bg-surface-container-lowest text-on-surface px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-surface-container-low transition-all duration-300 min-w-[180px] sm:min-w-[200px] shadow-sm"
              >
                Explore Platform
              </motion.button>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
              <div className="flex -space-x-3 flex-shrink-0">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    alt={`User ${i}`} 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-surface" 
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFC1CC] flex items-center justify-center text-[10px] sm:text-xs font-bold text-on-secondary-container border-2 border-surface">+1k</div>
              </div>
              <p className="text-on-surface-variant font-medium text-sm sm:text-base text-center md:text-left">Join 1,000+ early users building a smarter pet care experience</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative w-full max-w-xl md:max-w-none"
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 bg-primary/10 blur-[80px] sm:blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 sm:w-64 sm:h-64 bg-[#FF6A88]/10 blur-[80px] sm:blur-[100px] rounded-full"></div>
            <div className="relative z-10 glass-card p-3 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-white/40">
              <img 
                className="rounded-[1.5rem] sm:rounded-[2rem] w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover" 
                alt="Adorable golden retriever"
                src="https://drive.google.com/thumbnail?id=1VE2n4FErG5k9BNlhSLQwLDHzP9-Csv2W&sz=w1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-lg translate-y-2 sm:translate-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-headline">Luna</h3>
                    <p className="text-on-surface-variant text-xs sm:text-sm">Verified Goldie • 2 years</p>
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1 bg-tertiary-container px-1.5 sm:px-3 py-1 rounded-full text-on-tertiary-container text-[9px] sm:text-xs font-bold">
                    <span className="material-symbols-outlined text-[12px] sm:text-[16px] -ml-0.5 sm:ml-0" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    VERIFIED
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Core Features */}
      <section className="py-24 bg-surface-container-low relative overflow-visible">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20 relative z-10"
          >
            <h2 className="text-4xl font-extrabold font-headline mb-4 tracking-tight">Ethereal Pet Management</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">Experience a new standard of care where every detail is handled with precision and empathy.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Verified Pets", desc: "Secure digital identity for your pets including health records, lineage, and behavioral assessments verified by experts.", icon: <Fingerprint className="text-primary w-8 h-8" />, color: "bg-primary-container/20" },
              { title: "Vet Access", desc: "Instant connectivity to top-tier veterinary specialists. Real-time health monitoring and virtual consultations at your fingertips.", icon: <Stethoscope className="text-tertiary w-8 h-8" />, color: "bg-tertiary-container/20" },
              { title: "Pet Care Simplified", desc: "An all-in-one ecosystem for scheduling, nutritional planning, and lifestyle management designed for busy pet owners.", icon: <Sparkles className="text-secondary w-8 h-8" />, color: "bg-secondary-container/20" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative z-10 bg-surface-container-lowest p-10 rounded-[2rem] shadow-xl hover:shadow-2xl border border-outline-variant/10 will-change-transform"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline mb-4">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Pets Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold font-headline tracking-tight mb-4">The Sruvo Family</h2>
            <p className="text-on-surface-variant">Meet some of the beautiful souls currently on our platform.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
            View All Listings <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Milo", breed: "British Shorthair • 3 Years Old", tags: ["Active", "Healthy"], image: "https://drive.google.com/thumbnail?id=18IjJDvVbfF2eA1v7AR5i7d46KBmz3ZY8&sz=w1000", seed: "cat1" },
            { name: "Cooper", breed: "Golden Retriever • 1 Year Old", tags: ["Friendly", "Vaccinated"], image: "https://drive.google.com/thumbnail?id=1D-9VcuzntZZzMTb5aSKh3HJ6cdqEKbEH&sz=w1000", seed: "dog1" },
            { name: "Ginger", breed: "Domestic Longhair • 5 Years Old", tags: ["Calm", "Indoor"], image: "https://drive.google.com/thumbnail?id=1ynUn5MF2SrJzJkK8npAnD5PrnH0X9Zu6&sz=w1000", seed: "cat2" }
          ].map((pet, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card relative z-10 rounded-[2.5rem] overflow-hidden border border-white/50 shadow-xl group cursor-pointer will-change-transform"
            >
              <div className="relative overflow-hidden h-80">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
                  alt={pet.name}
                  src={pet.image || `https://picsum.photos/seed/${pet.seed}/600/800`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-md text-tertiary flex items-center gap-0.5 px-2 py-1 rounded-full text-[9px] font-black shadow-sm border border-white/50">
                    <span className="material-symbols-outlined text-[12px] -ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> VERIFIED
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-2xl font-bold font-headline">{pet.name}</h4>
                </div>
                <p className="text-on-surface-variant mb-6">{pet.breed}</p>
                <div className="flex gap-2">
                  {pet.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-surface-container-low rounded-full text-xs text-on-surface-variant">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product UI Preview */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-center">Seamless Experience</h2>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-12 px-[10%] snap-x no-scrollbar">
          {[
            { title: "Advanced Browsing Interface", image: "https://drive.google.com/thumbnail?id=1avEVztG8QhQsQNKB7iJPX84JcR0lqNbY&sz=w1200", seed: "ui1" },
            { title: "Veterinary Dashboard", image: "https://drive.google.com/thumbnail?id=1pckWr-us9r0xOwJ6wKxmlykeiPdSUmPU&sz=w1200", seed: "ui2" }
          ].map((ui, i) => (
            <div key={i} className="snap-center shrink-0 w-[80vw] md:w-[600px] aspect-[16/10] glass-card rounded-[2.5rem] p-4 border border-white/40 shadow-2xl">
              <div className="bg-surface-container w-full h-full rounded-2xl overflow-hidden flex flex-col">
                <div className="h-12 bg-white/50 border-b border-white flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/40"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/40"></div>
                </div>
                <div className="flex-1 flex items-center justify-center bg-white/20">
                  <img 
                    className="w-full h-full object-cover opacity-80" 
                    alt={ui.title}
                    src={ui.image || `https://picsum.photos/seed/${ui.seed}/1200/800`}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <p className="text-center mt-6 font-bold text-on-surface-variant">{ui.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
