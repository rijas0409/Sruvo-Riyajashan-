/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analytics } from "../lib/analytics";
import { supabase } from "../lib/supabase";
import Footer from "./Footer";

export default function EarlyAccess() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'owner' | 'vet' | 'breeder' | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Honeypot field for bot protection
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [userReferralCode, setUserReferralCode] = useState<string>("");
  const [referredBy, setReferredBy] = useState<string | null>(null);

  // Common disposable email domains to block fake addresses
  const DISPOSABLE_DOMAINS = [
    'mailinator.com', 'tempmail.com', 'guerrillamail.com', '10minutemail.com', 
    'trashmail.com', 'yopmail.com', 'sharklasers.com', 'teleworm.us',
    'armyspy.com', 'dayrep.com', 'einrot.com', 'fleckens.hu', 'rhyta.com'
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferredBy(ref);
    }
  }, []);

  const isEmailValid = (email: string) => {
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!basicRegex) return false;

    const domain = email.split('@')[1]?.toLowerCase();
    return !DISPOSABLE_DOMAINS.includes(domain);
  };

  const isPhoneValid = (num: string) => {
    // Extract only digits and check if there are exactly 10
    const digits = num.replace(/\D/g, '');
    return digits.length === 10;
  };

  const isFormValid = name.trim().length > 0 && 
                      isEmailValid(email) && 
                      role !== null && 
                      isPhoneValid(phone) && 
                      city.trim().length > 0;

  const generateReferralCode = (userName: string) => {
    const cleanName = userName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10);
    const randomStr = Math.random().toString(36).substring(2, 6);
    return `${cleanName}-${randomStr}`;
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    // Check honeypot (bots will fill this hidden field)
    if (honeypot.length > 0) {
      console.warn("Bot submission detected.");
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000); // Simulate processing
      return;
    }

    setIsLoading(true);
    setError(null);

    const myReferralCode = generateReferralCode(name);
    setUserReferralCode(myReferralCode);

    try {
      // 0. Check if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('early_access')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingUser) {
        setError('This email ID is already registered. Please contact support at noreply.sruvo@gmail.com if you need assistance.');
        setIsLoading(false);
        return;
      }

      // 1. Insert the new user
      const { data: newUser, error: insertError } = await supabase
        .from('early_access')
        .insert([
          { 
            full_name: name, 
            email: email, 
            phone: phone,
            city: city,
            role: role,
            referral_code: myReferralCode,
            referred_by: referredBy,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Track Signup in Analytics
      analytics.trackSignup(email);

      // 2. Calculate Queue Position
      // Count how many people signed up before this user
      const { count: signupOrder, error: countError } = await supabase
        .from('early_access')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', newUser.created_at);

      if (countError) throw countError;

      // Count how many people this user has referred (should be 0 for new user, but good for logic)
      const { count: referralCount, error: refCountError } = await supabase
        .from('early_access')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', myReferralCode);

      if (refCountError) throw refCountError;

      const basePosition = 49 + (signupOrder || 0);
      const finalPosition = Math.max(1, basePosition - ((referralCount || 0) * 49));
      
      setQueuePosition(finalPosition);

      // 3. Send Confirmation Email via Server-side Resend
      try {
        const response = await fetch("/api/send-welcome-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name })
        });
        const result = await response.json();
        console.log('Email API Response:', result);
      } catch (emailErr) {
        console.error('Email API Error:', emailErr);
      }

      setStep(2); // Success state
    } catch (err: any) {
      console.error('Error submitting to Supabase:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const link = `${window.location.origin}${window.location.pathname}?ref=${userReferralCode}`;
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        // Fallback for non-secure contexts or iframes
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="font-body text-on-surface min-h-screen relative overflow-x-hidden bg-surface">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 md:top-10 md:left-10 p-3 rounded-full hover:bg-white/50 transition-all duration-300 group z-50 flex items-center justify-center shadow-sm hover:shadow-md border border-white/20"
        title="Go Back"
      >
        <span className="material-symbols-outlined text-2xl text-on-surface-variant group-hover:text-primary transition-colors">arrow_back</span>
      </button>

      {/* Background Decoration */}
      <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-tertiary-container/10 blur-[100px] rounded-full pointer-events-none z-[-1]"></div>

      {/* Main Funnel Container */}
      <main className="w-full pt-20 relative z-10">
        <div className="max-w-2xl mx-auto px-4">
          {/* Branding Anchor (Top Center) */}
          <div className="flex flex-col items-center mb-12 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="relative h-[49px] flex items-center">
                <img 
                  src="https://lh3.googleusercontent.com/d/1n2SgWctS5RgMjR2Uouvq-KpsqW5_ASxx" 
                  alt="Sruvo Logo" 
                  className="h-full w-auto object-contain"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>
              <span className="text-3xl font-headline font-extrabold tracking-tight bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent">
                Sruvo
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-label tracking-wide uppercase">Everything Your Pet Needs, Connected</p>
          </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Progress Tracking */}
            <div className="mb-10 px-4">
              <div className="flex justify-between items-end mb-3">
                <span className="text-primary font-headline font-bold text-sm tracking-tight">Step 1 of 1</span>
                <span className="text-on-surface-variant font-label text-xs">Identity Profile</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] transition-all duration-500 ease-out"></div>
              </div>
            </div>

            {/* Conversion Card */}
            <section className="glass-card rounded-[2rem] p-8 md:p-12 shadow-[0_8px_48px_rgba(167,109,255,0.08)] border border-white/40">
              <div className="space-y-10">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight mb-3">
                    Tell us, who are you?
                  </h1>
                  <p className="text-on-surface-variant leading-relaxed">
                    We tailor the Sruvo experience to your specific role in the pet care ecosystem.
                  </p>
                </div>

                {/* Role Selection Grid */}
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <button 
                    onClick={() => setRole('owner')}
                    className={`group relative flex flex-col items-center p-3 md:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 text-center focus:outline-none focus:ring-2 focus:ring-primary/20 ${role === 'owner' ? 'bg-white shadow-xl ring-2 ring-primary/20' : 'bg-surface-container-low hover:bg-surface-container-lowest'}`}
                  >
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-xl md:text-3xl text-primary">pets</span>
                    </div>
                    <span className="font-headline font-semibold text-on-surface text-[10px] md:text-base leading-tight">Pet Owner</span>
                    <span className="text-[8px] md:text-xs text-on-surface-variant mt-1">Manage, care, and shop everything your pet needs</span>
                  </button>

                  <button 
                    onClick={() => setRole('vet')}
                    className={`group relative flex flex-col items-center p-3 md:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 text-center focus:outline-none focus:ring-2 focus:ring-primary/20 ${role === 'vet' ? 'bg-white shadow-xl ring-2 ring-primary/20' : 'bg-surface-container-low hover:bg-surface-container-lowest'}`}
                  >
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-xl md:text-3xl text-tertiary">medical_services</span>
                    </div>
                    <span className="font-headline font-semibold text-on-surface text-[10px] md:text-base leading-tight">Vet</span>
                    <span className="text-[8px] md:text-xs text-on-surface-variant mt-1">Connect with pet owners, manage consultations and grow your practice</span>
                  </button>

                  <button 
                    onClick={() => setRole('breeder')}
                    className={`group relative flex flex-col items-center p-3 md:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 text-center focus:outline-none focus:ring-2 focus:ring-primary/20 ${role === 'breeder' ? 'bg-white shadow-xl ring-2 ring-primary/20' : 'bg-surface-container-low hover:bg-surface-container-lowest'}`}
                  >
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-secondary-container/20 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-xl md:text-3xl text-secondary">home_health</span>
                    </div>
                    <span className="font-headline font-semibold text-on-surface text-[10px] md:text-base leading-tight">Breeder</span>
                    <span className="text-[8px] md:text-xs text-on-surface-variant mt-1">Connect with genuine pet parents, and showcase your pets</span>
                  </button>
                </div>

                {/* Input Field */}
                <div className="space-y-6 pt-4">
                  <div className="relative">
                    <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2 px-1">Full Name</label>
                    <input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-lg" 
                      placeholder="e.g. Jas Pabla" 
                      type="text"
                      required
                    />
                  </div>

                  {/* Honeypot field (hidden from humans, caught bots) */}
                  <div className="hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      tabIndex={-1} 
                      autoComplete="off" 
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)} 
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2 px-1">Email</label>
                    <input 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-lg" 
                      placeholder="rijas@sruvo.com" 
                      type="email"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2 px-1">Phone Number</label>
                    <input 
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setPhone(val);
                      }}
                      className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-lg" 
                      placeholder="e.g. 9876543210" 
                      type="tel"
                      maxLength={10}
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2 px-1">City</label>
                    <input 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl px-5 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-lg" 
                      placeholder="e.g. Gurgaon" 
                      type="text"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                  )}

                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={!isFormValid || isLoading}
                    className="w-full bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] text-on-primary font-headline font-bold py-5 rounded-xl shadow-xl shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </motion.button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-4"
          >
            <section className="glass-card rounded-[2rem] p-8 md:p-12 shadow-[0_8px_48px_rgba(167,109,255,0.08)] border border-white/40">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-tertiary-fixed to-tertiary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-5xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tighter">You're in! 🚀</h2>
                <p className="text-on-surface-variant max-w-sm mx-auto">Welcome to the future of ethical pet care. We've reserved your spot in line.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-surface-container-low p-4 md:p-6 rounded-2xl text-center">
                  <span className="block text-[10px] md:text-xs font-label text-outline uppercase tracking-widest mb-1">Queue Position</span>
                  <span className="text-xl md:text-3xl font-headline font-black text-primary">#{queuePosition?.toLocaleString() || '49'}</span>
                </div>
                <div className="bg-surface-container-low p-4 md:p-6 rounded-2xl text-center">
                  <span className="block text-[10px] md:text-xs font-label text-outline uppercase tracking-widest mb-1">Status</span>
                  <span className="text-xl md:text-3xl font-headline font-black text-tertiary">Verified</span>
                </div>
              </div>
              <div className="bg-primary/5 p-4 md:p-6 rounded-2xl border border-primary/10">
                <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-3">Your Referral Link</label>
                <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 pl-4 border border-outline-variant/20 max-w-lg mx-auto">
                  <span className="text-xs md:text-sm text-on-surface truncate font-mono flex-1 text-left">
                    {window.location.origin}{window.location.pathname}?ref={userReferralCode}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className={`${copied ? 'bg-tertiary' : 'bg-primary'} text-on-primary px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all whitespace-nowrap shrink-0 flex items-center gap-2`}
                  >
                    {copied ? (
                      <>
                        <span className="material-symbols-outlined text-sm">done</span>
                        Copied
                      </>
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
                <p className="text-[10px] md:text-xs text-on-surface-variant mt-4">Refer friends to skip 49 spots in the queue for each referral.</p>
              </div>
            </section>
          </motion.div>
        )}

        {/* Dynamic Content Preview (Visual Interest) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                alt="Happy dogs playing" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuc2yamWnjC7u7Wq58fHUZNSW4LpTgdHf98A-tcO7K43rPnGV_uhVn_2nKjtIDVDO7HfkU-ZHYPizu4GZiDKJIx9B323ZOUEB_SZPEV06VzkVlhKIv9kA8REu7zwg1WoiM5PJ5nifZPJoA-T9nPN_ISkpGpA-qZh8DCgwNetJrVao6Lzbk663R-mirylVf3SV_Lc7p2KfwcbOa-oZwi8vOq3YXbCavFDSEdYF4vOAedaAov1XEmBsdXHTpSlvKBALy6vnHXg85F64"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-sm font-bold text-on-surface">Community First</span>
              <p className="text-xs text-on-surface-variant">Connecting pet parents across a growing community.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                alt="Veterinary tool" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYGGbTSAnmFxEY9InlPr0xZKe7S2RNQ-snhUX1d7hKa6RTPQH8_vnpCXfCVa1OkniX6FbTecLKLeUyDZBmkPAp4HzDc0uUlkp2bPAAaOM_Bo_-tCNksXOxVTn5kgUfkQHPRZrWZN2qIYKjn8Wt10gVX75B7beE0xYMXeJvaO_SAzvwIfL9LorcQj6eqFd2JkSo4_ebHxggP0pr9VjTQKiry7GjBDZz8KQTKbRTQQnnD5CTD_Y3_1-nkQ95m_686diXARnvNTaBbdo"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-sm font-bold text-on-surface">Vet Verified</span>
              <p className="text-xs text-on-surface-variant">Clinical standards integrated into every step.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);
}
