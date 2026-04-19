/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function PressKit() {
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(167,109,255,0.08)_0%,_rgba(247,246,254,0)_70%)]"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-headline font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            Media Center
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-7xl md:text-9xl font-extrabold tracking-tighter text-on-surface mb-6"
          >
            Press <span className="text-gradient">Kit</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-xl text-on-surface-variant leading-relaxed font-light"
          >
            Resources, executive bios, and official brand assets for journalists and media partners covering the evolution of pet care.
          </motion.p>
        </section>

        {/* Executive Profiles */}
        <section className="py-24 space-y-32 max-w-7xl mx-auto px-8">
          {/* Jashanpreet Singh Pabla */}
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 portrait-container overflow-hidden rounded-xl bg-surface-container-low aspect-[4/5] relative -mt-[49px]"
            >
              <img 
                alt="Jashanpreet Singh Pabla" 
                className="w-full h-full object-cover object-[center_top_-20px]" 
                src="https://drive.google.com/thumbnail?id=1RN4LdT54eMkxi3x1Q2c-WwkuorP3BH-Z&sz=w1000" 
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Founder & CEO</span>
              <h2 className="font-headline text-5xl font-extrabold tracking-tight mb-8">Jashanpreet Singh Pabla</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Jashanpreet leads product vision, designs, business strategy and overall execution at Sruvo. With a strong focus on building scalable digital experiences, he is driving the creation of a unified pet care ecosystem that solves real-world challenges for pet parents.
              </p>
              <div className="flex gap-4">
                <button className="bg-surface-container-highest px-6 py-3 rounded-full hover:bg-surface-container-high transition-colors font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">description</span> Full Bio
                </button>
                <a 
                  href="https://in.linkedin.com/in/jashanpreet-singh-pabla" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0A66C2]/10 text-[#0A66C2] px-6 py-3 rounded-full hover:bg-[#0A66C2]/20 transition-colors font-semibold flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          {/* Saurabh Tiwari */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 portrait-container overflow-hidden rounded-xl bg-surface-container-low aspect-[4/5] relative"
            >
              <img 
                alt="Saurabh Tiwari" 
                className="w-full h-full object-cover" 
                src="https://drive.google.com/thumbnail?id=1ITuTeBKPmBB8_qWepyTQAYd0HJMOPuK5&sz=w1000" 
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Co-Founder & COO</span>
              <h2 className="font-headline text-5xl font-extrabold tracking-tight mb-8">Saurabh Tiwari</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Saurabh focuses on operations and partnerships. He is responsible for building the service network, onboarding partners, and ensuring seamless execution across the platform.
              </p>
              <div className="flex gap-4">
                <button className="bg-surface-container-highest px-6 py-3 rounded-full hover:bg-surface-container-high transition-colors font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">description</span> Full Bio
                </button>
                <a 
                  href="https://www.linkedin.com/in/saurabh-tiwari-52aa84313?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0A66C2]/10 text-[#0A66C2] px-6 py-3 rounded-full hover:bg-[#0A66C2]/20 transition-colors font-semibold flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Loved by the Sanctuary Testimonial Section */}
        <section className="pt-32 pb-20 relative overflow-hidden bg-surface-container-low/30">
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10"></div>
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="font-headline text-5xl font-extrabold tracking-tighter mb-4">Loved by the <span className="text-gradient">Sanctuary</span></h2>
              <p className="text-on-surface-variant text-lg">Real stories from the families and professionals at the heart of our community.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Testimonial 1: Pet Owner */}
              <div className="glass-card p-10 rounded-[2.5rem] border border-white/40 shadow-xl hover-lift">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-8 border-2 border-primary/20 bg-surface-container-high">
                  <img src="https://picsum.photos/seed/sarah/200/200" alt="Sarah" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <p className="text-on-surface text-xl font-light italic leading-relaxed">
                    "Love the idea and concepts and nowadays finding the right pet is a difficult task which you are making much easier."
                  </p>
                  <div>
                    <h4 className="font-headline font-bold text-lg">Raj Jassar</h4>
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest">Verified Pet Owner</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2: Veterinarian */}
              <div className="glass-card p-10 rounded-[2.5rem] border border-white/40 shadow-xl hover-lift lg:translate-y-12">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-8 border-2 border-primary/20 bg-surface-container-high">
                  <img src="https://picsum.photos/seed/doc/200/200" alt="Dr. Aris" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <p className="text-on-surface text-xl font-light italic leading-relaxed">
                    "Getting a vet assistant for pets in the virtual world is next impossible and you are bringing that kind of concept that really needs to be appreciated."
                  </p>
                  <div>
                    <h4 className="font-headline font-bold text-lg">Dr. Rishu Verma</h4>
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest">Lead Veterinarian</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3: Breeder */}
              <div className="glass-card p-10 rounded-[2.5rem] border border-white/40 shadow-xl hover-lift">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-8 border-2 border-primary/20 bg-surface-container-high">
                  <img src="https://picsum.photos/seed/mark/200/200" alt="Mark" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <p className="text-on-surface text-xl font-light italic leading-relaxed">
                    "It's the first time that anyone is integrating AI to make a platform easy to use and get information about the product, it's really valuable to customers like us who have not much idea of pets related products."
                  </p>
                  <div>
                    <h4 className="font-headline font-bold text-lg">Karanveer Singh Gill</h4>
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest">Certified Breeder</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 4: Animal Welfare Expert */}
              <div className="glass-card p-10 rounded-[2.5rem] border border-white/40 shadow-xl hover-lift lg:translate-y-12">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-8 border-2 border-primary/20 bg-surface-container-high">
                  <img src="https://picsum.photos/seed/elena/200/200" alt="Elena" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <p className="text-on-surface text-xl font-light italic leading-relaxed">
                    "I love the concepts of verified breeders, because there are already lots of websites who are redirecting to whatsapp to purchase but no proof of verification and transparency and with this concept chances of fraud will be reduced and build trust in this platform."
                  </p>
                  <div>
                    <h4 className="font-headline font-bold text-lg">Arsh Kapoor</h4>
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest">Welfare Consultant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Inquiries */}
        <section className="pt-20 pb-32">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="bg-gradient-primary rounded-[2.5rem] p-8 md:p-24 text-center text-on-primary shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 relative z-10">
                Media Inquiries
              </h2>
              <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto relative z-10">
                For interview requests, deeper data insights, or collaboration opportunities, our press team is ready to assist.
              </p>
              <div className="relative z-10 flex justify-center">
                <a className="inline-flex items-center gap-2 md:gap-4 bg-white text-primary px-6 md:px-10 py-4 md:py-5 rounded-full font-headline font-bold text-sm md:text-xl hover:scale-105 transition-transform shadow-xl w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap justify-center" href="mailto:thesruvo@gmail.com">
                  <span className="truncate">thesruvo@gmail.com</span>
                  <span className="material-symbols-outlined shrink-0">mail</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
