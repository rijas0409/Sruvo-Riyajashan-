/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ShieldCheck, Lock, Users, Loader2, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import { analytics } from "../lib/analytics";

export default function BecomePartner() {
  const [showManualExperience, setShowManualExperience] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    clinicName: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    location: "",
    license: "",
    address: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "other") {
      setShowManualExperience(true);
      setFormData(prev => ({ ...prev, experience: "" }));
    } else {
      setFormData(prev => ({ ...prev, experience: e.target.value }));
    }
  };

  const handleManualExperienceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, experience: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate all fields are mandatory
    const requiredFields = Object.values(formData) as string[];
    if (requiredFields.some(field => !field.trim())) {
      setError("Please fill in all fields. Every detail is mandatory.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Insert into Supabase
      const { error: supabaseError } = await supabase
        .from('veterinary_partners')
        .insert([
          {
            full_name: formData.fullName,
            clinic_name: formData.clinicName,
            email: formData.email,
            phone: formData.phone,
            qualification: formData.qualification,
            experience: formData.experience,
            location: formData.location,
            license_no: formData.license,
            clinic_address: formData.address,
            status: 'pending'
          }
        ]);

      if (supabaseError) throw supabaseError;
      
      // Track Signup in Analytics
      analytics.trackSignup(formData.email);

      // 2. Send Confirmation Email
      try {
        await fetch("/api/send-partner-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            email: formData.email, 
            name: formData.fullName 
          })
        });
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
        // We don't block the success state if only the email fails
      }

      setIsSuccess(true);
      setFormData({
        fullName: "",
        clinicName: "",
        email: "",
        phone: "",
        qualification: "",
        experience: "",
        location: "",
        license: "",
        address: ""
      });
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden relative">
      <main className="pt-24 pb-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-5 space-y-12"
          >
            <div className="space-y-6">
              <span className="text-primary font-bold tracking-widest uppercase text-xs font-body">Veterinary Network</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-on-surface font-headline">
                Become a <br/>
                <span className="bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent whitespace-nowrap">Veterinary Partner</span>
              </h1>
              <p className="text-lg text-on-surface-variant leading-relaxed max-w-md font-body">
                Join Sruvo and connect with pet owners while managing your practice more efficiently. Built to simplify your workflow and enhance the way you deliver care.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-8">
              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface font-headline">Verified onboarding</h4>
                  <p className="text-sm text-on-surface-variant mt-1 font-body">Join a community of accredited experts in pet healthcare.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface font-headline">Secure data handling</h4>
                  <p className="text-sm text-on-surface-variant mt-1 font-body">Enterprise-grade encryption for all patient and clinical records.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface font-headline">Professional network</h4>
                  <p className="text-sm text-on-surface-variant mt-1 font-body">Access to specialized diagnostic tools and peer consultations.</p>
                </div>
              </div>
            </div>

            {/* Photo Element */}
            <div className="relative pt-8">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-tertiary-container/30 rounded-full blur-3xl"></div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-on-surface/5 aspect-[4/3]"
              >
                <img 
                  alt="Professional female veterinarian" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5fZAG1W_7xxgEY-MYfG26h5pnyxDwvbiiiDdfRZXkieIj71ZsqCSXiLuxcYK_jHTMsWRruHBIJczadYy882w8e1VjJOri9y5Zj5vMdsvw5JXJUHvq8FMirrL9samdDcMNqopOzpvht_cR6YMtJazS4pSq5jrQ8VFU7dBfOYS1Qn-mw6qF4ADWjCkJ-TMght1n-EsG9fvJU_lKN4qi9BO6FLLC_sNuxj8DF4wyXyNZ0VXxJjV4Y9idDwcgzrBlyL-0KCZwMbtptxw"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Form Section: High-end Glass Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-7 flex justify-center"
          >
            <div className="glass-card w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(45,46,52,0.1)] hover:-translate-y-2 transition-all duration-500 border border-white/40">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Input Groups */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">Full Name</label>
                    <input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body" 
                      placeholder="Dr. Rijas Pabla" 
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">Clinic / Hospital Name</label>
                    <input 
                      name="clinicName"
                      value={formData.clinicName}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body" 
                      placeholder="Raxon Hospital" 
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">Email Address</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body" 
                      placeholder="rijas@raxon.com" 
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">Phone Number</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body" 
                      placeholder="+91 149 567 890" 
                      type="tel"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">Qualification</label>
                    <input 
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body" 
                      placeholder="e.g. BVSc & AH" 
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">Years of Experience</label>
                    <div className="relative">
                      {!showManualExperience ? (
                        <div className="relative">
                          <select 
                            name="experience"
                            className="w-full appearance-none bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all pr-12 font-body" 
                            onChange={handleExperienceChange}
                            value={formData.experience}
                            required
                          >
                            <option disabled value="">Select Experience</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                            <option value="other">Other (Enter manually)</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                        </div>
                      ) : (
                        <div className="relative">
                          <input 
                            name="experience"
                            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body pr-12" 
                            autoFocus
                            min="1" 
                            placeholder="Enter years (e.g. 16)" 
                            type="number"
                            value={formData.experience}
                            onChange={handleManualExperienceInput}
                            required
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              setShowManualExperience(false);
                              setFormData(prev => ({ ...prev, experience: "" }));
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                            title="Back to list"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">City / Location</label>
                  <input 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body" 
                    placeholder="Gurgoan, Haryana" 
                    type="text"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">License / Registration</label>
                    <input 
                      name="license"
                      value={formData.license}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body" 
                      placeholder="Reg. No." 
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1 font-body">Clinic / Hospital Address</label>
                    <input 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-tertiary transition-all placeholder:text-outline/50 font-body" 
                      placeholder="Street Address" 
                      type="text"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-error text-sm font-medium text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="pt-6 space-y-6">
                  <button 
                    disabled={isSubmitting}
                    className="w-full primary-gradient text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-purple-500/30 flex items-center justify-center gap-3 font-headline disabled:opacity-70 disabled:cursor-not-allowed" 
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Apply Now"
                    )}
                  </button>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-primary font-semibold text-center italic font-body">
                      Applications are reviewed before approval.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccess(false)}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full shadow-2xl text-center space-y-6"
            >
              <button 
                onClick={() => setIsSuccess(false)}
                className="absolute top-6 right-6 p-2 hover:bg-surface-container-low rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-on-surface-variant" />
              </button>
              <div className="w-20 h-20 bg-tertiary-container text-tertiary rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-extrabold text-on-surface">Application Received!</h2>
                <p className="text-on-surface-variant leading-relaxed font-body">
                  Thank you for applying to join the Sruvo Veterinary Network. We've sent a confirmation email to your inbox. Our team will review your application within 24-48 hours.
                </p>
              </div>
              <button 
                onClick={() => setIsSuccess(false)}
                className="w-full primary-gradient text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all shadow-xl shadow-primary/20"
              >
                Got it, thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
