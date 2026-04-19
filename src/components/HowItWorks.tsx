/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Video, 
  Stethoscope, 
  Calendar, 
  FolderOpen,
  ArrowRight
} from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="selection:bg-primary/20 relative overflow-x-hidden">
      {/* Hero Section */}
      <header className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block"
          >
            The Journey Together
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight mb-8 leading-[1.1]"
          >
            Your Pet's Wellness, <br/>
            <span className="bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent">Simplified.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Experience a new standard of pet care. From the first tail wag to lifelong health monitoring, we've designed a path for you and your companion to thrive.
          </motion.p>
        </div>
      </header>

      {/* How It Works Steps */}
      <main className="relative px-8 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[20%] -right-20 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-32 md:space-y-64 pb-32">
          {/* Step 1: Discover */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">1</span>
                <span className="text-primary font-semibold tracking-wide">PHASE ONE</span>
              </div>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface mb-6">Discover</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Find your perfect pet companion from verified sources. We partner with ethical breeders and shelters to ensure every pet starts their journey with a clean bill of health and a documented history.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <ShieldCheck className="text-tertiary w-6 h-6" />
                  <span className="text-on-surface">Verified ethical source network</span>
                </li>
                <li className="flex items-start gap-4">
                  <ArrowRight className="text-tertiary w-6 h-6" />
                  <span className="text-on-surface">Smart matching based on lifestyle</span>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 group portrait-container"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
                <img 
                  alt="Discovering a pet" 
                  className="rounded-[2rem] w-full h-[500px] object-cover" 
                  src="https://lh3.googleusercontent.com/d/1xkHbqGp5cxcUHnIPeAefI7C-RZZNNb-n"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-10 right-10 glass-card p-6 rounded-3xl border border-white/20 shadow-xl max-w-[240px]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                    <span className="text-xs font-bold text-on-surface">Verified Breed</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Golden Retriever puppies from Gold-Coast Haven.</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Step 2: Connect */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-1 group portrait-container"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
                <img 
                  alt="Veterinary connection" 
                  className="rounded-[2rem] w-full h-[500px] object-cover" 
                  src="https://lh3.googleusercontent.com/d/1oxV_xOvunQlciOIci4uxwvl_WsNyV-Ao"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-10 left-10 glass-card p-6 rounded-3xl border border-white/20 shadow-xl max-w-[200px]">
                  <div className="flex -space-x-3 mb-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://picsum.photos/seed/expert${i}/100/100`} alt="Expert" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-on-surface">Connect with 500+ Experts</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-2"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-secondary font-bold text-xl">2</span>
                <span className="text-secondary font-semibold tracking-wide">PHASE TWO</span>
              </div>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface mb-6">Connect</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Direct access to top-tier veterinary professionals. No more waiting weeks for answers. Book consultations, chat with specialists, and get immediate advice when you need it most.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Video className="text-secondary w-6 h-6" />
                  <span className="text-on-surface">24/7 Telehealth availability</span>
                </li>
                <li className="flex items-start gap-4">
                  <Stethoscope className="text-secondary w-6 h-6" />
                  <span className="text-on-surface">Direct portal to local clinics</span>
                </li>
              </ul>
            </motion.div>
          </section>

          {/* Step 3: Manage */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-tertiary-container/30 flex items-center justify-center text-tertiary font-bold text-xl">3</span>
                <span className="text-tertiary font-semibold tracking-wide">PHASE THREE</span>
              </div>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface mb-6">Manage</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                All your pet's records and needs in one secure dashboard. From vaccination schedules to dietary requirements, Sruvo keeps everything organized and accessible.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                  <Calendar className="text-primary w-6 h-6 mb-2" />
                  <p className="text-sm font-bold text-on-surface">Auto-Reminders</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                  <FolderOpen className="text-primary w-6 h-6 mb-2" />
                  <p className="text-sm font-bold text-on-surface">Digital History</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 group portrait-container"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
                <img 
                  alt="Managing pet care" 
                  className="rounded-[2rem] w-full h-[500px] object-cover" 
                  src="https://lh3.googleusercontent.com/d/1Gotf7Qld3F_vF2QSBfz8zu9yr150ZTK6"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </section>

          {/* Step 4: Thrive */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-1 group portrait-container"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-4 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-4">
                <img 
                  alt="Pet thriving" 
                  className="rounded-[2rem] w-full h-[500px] object-cover" 
                  src="https://lh3.googleusercontent.com/d/18eSZmFSdaur1Tbck8lYOUCzoc191uGS9"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-2"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary font-bold text-xl">4</span>
                <span className="text-primary font-semibold tracking-wide">PHASE FOUR</span>
              </div>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface mb-6">Thrive</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Continuous support for a happy, healthy pet life. We grow with you, offering personalized insights, community support, and wellness rewards for proactive care.
              </p>
              {/* Testimonial card removed as per request */}
            </motion.div>
          </section>
        </div>
      </main>

    </div>
  );
}
