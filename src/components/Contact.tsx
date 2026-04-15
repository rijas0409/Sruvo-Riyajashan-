/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Contact API Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-surface font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none"></div>

      <main className="pt-32 pb-12 atmospheric-bg px-6 overflow-hidden relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
          {/* Hero Content */}
          <div className="md:col-span-5 flex flex-col justify-center order-1">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-headline font-bold tracking-widest uppercase text-sm mb-6 block"
            >
              Reach Out
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-headline font-extrabold text-on-surface tracking-tighter leading-[1.1] mb-8"
            >
              Let’s start a <br/>
              <span className="bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent">conversation.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-on-surface-variant leading-relaxed max-w-md mb-12"
            >
              Whether you have questions about our technology or just want to share your pet's journey, we're here to listen and support.
            </motion.p>
            
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 gap-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest glass-card flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                </div>
                <div>
                  <p className="text-sm font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-1">Email Us</p>
                  <a className="text-lg font-semibold text-on-surface hover:text-primary transition-colors" href="mailto:thesruvo@gmail.com">thesruvo@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="md:col-span-7 order-2">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-[2.5rem] p-10 lg:p-16 shadow-[0_32px_64px_rgba(0,0,0,0.05)] border border-white/40"
            >
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-headline font-bold text-on-surface tracking-wide px-1">Full Name</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-tertiary transition-all outline-none" 
                      placeholder="John Doe" 
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-headline font-bold text-on-surface tracking-wide px-1">Email Address</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-tertiary transition-all outline-none" 
                      placeholder="john@example.com" 
                      type="email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-headline font-bold text-on-surface tracking-wide px-1">Subject</label>
                  <input 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-tertiary transition-all outline-none" 
                    placeholder="How can we help?" 
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-headline font-bold text-on-surface tracking-wide px-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-tertiary transition-all outline-none resize-none" 
                    placeholder="Tell us more about your inquiry..." 
                    rows={5}
                    required
                  ></textarea>
                </div>
                <div className="pt-4">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    disabled={status === 'loading'}
                    className="w-full primary-gradient text-on-primary py-5 rounded-2xl font-headline font-extrabold text-lg shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed" 
                    type="submit"
                  >
                    {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                    {status !== 'loading' && status !== 'success' && (
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                    )}
                    {status === 'success' && (
                      <span className="material-symbols-outlined text-green-400">check_circle</span>
                    )}
                  </motion.button>
                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center mt-4">Failed to send message. Please try again.</p>
                  )}
                  {status === 'success' && (
                    <p className="text-green-400 text-sm text-center mt-4">Thank you! We'll get back to you soon.</p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

    </div>
  );
}
