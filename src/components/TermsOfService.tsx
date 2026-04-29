/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function TermsOfService() {
  return (
    <div className="selection:bg-primary/20 relative overflow-x-hidden">
      <main className="pt-40 pb-24 px-6 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-container/20 text-primary font-label font-semibold text-xs tracking-widest uppercase"
          >
            Legal Transparency
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-on-surface mb-6 leading-tight"
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-on-surface-variant font-body max-w-2xl mx-auto leading-relaxed"
          >
            Welcome to Sruvo. These terms outline the rules and regulations for the use of our platform.
          </motion.p>
        </div>

        {/* Content Shell */}
        <div className="max-w-4xl mx-auto relative">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-container/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-tertiary-container/20 rounded-full blur-3xl -z-10"></div>
          
          {/* Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 md:p-16 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white/40"
          >
            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-surface-variant/30">
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">gavel</span>
              </div>
              <div>
                <p className="text-sm font-label text-on-surface-variant uppercase tracking-wider">Effective Date</p>
                <p className="text-on-surface font-semibold">Jan 09, 2026</p>
              </div>
            </div>

            <div className="space-y-16">
              {/* Introduction */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">00</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Welcome to Sruvo</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      These Terms of Service (“Terms”) govern your access to and use of the Sruvo platform, including our mobile applications, websites, and related services (collectively, the “Platform”). By accessing or using Sruvo, you agree to be legally bound by these Terms. If you do not agree, you must not use the Platform.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 1: About */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">01</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">About</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Sruvo is a technology-enabled platform designed to organize and simplify the pet care ecosystem in India. Through the Platform, users may:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Discover and purchase pets from verified breeders</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Access veterinary services (video consultations, clinic visits, and home visits)</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Purchase pet-related products and essentials</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Maintain digital pet profiles and health records</span>
                      </li>
                    </ul>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Sruvo operates solely as an intermediary platform and does not own, breed, sell, or medically treat pets. All third-party services are provided independently by respective service providers.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Eligibility */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">02</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Eligibility</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      To use Sruvo, you must be at least 18 years of age, have the legal capacity to enter into binding agreements, and provide accurate, complete, and current information. Sruvo reserves the right to refuse access to any user who does not meet these criteria.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: User Accounts */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">03</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">User Accounts</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Certain features require account registration. You agree to maintain confidentiality of your login credentials, accept responsibility for all activities under your account, and notify Sruvo immediately of any unauthorized access. Sruvo may suspend or terminate accounts that violate these Terms or pose risk to the platform.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Role */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">04</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Role</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Sruvo facilitates connections and transactions between users and independent service providers, including breeders, veterinarians, and sellers. Accordingly:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                      <li>Sruvo does not guarantee the quality, safety, legality, or outcomes of services or products</li>
                      <li>Veterinary services are provided solely by licensed professionals (as represented by them)</li>
                      <li>Users are responsible for exercising independent judgment before engaging any provider</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5: Verified Pet Marketplace */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">05</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Verified Pet Marketplace</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      While Sruvo undertakes verification processes for breeders, verification does not constitute a guarantee of pet health, temperament, or suitability. Users must independently assess whether a pet meets their expectations and environment. All transactions are conducted at the user’s discretion. Sruvo does not assume liability for post-purchase outcomes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6: Veterinary Services Disclaimer */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">06</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Veterinary Services Disclaimer</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Veterinary consultations are conducted by independent professionals. Sruvo does not provide medical advice or diagnosis. The Platform is not a substitute for in-person medical care. In case of emergency, users must seek immediate physical veterinary assistance.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7: Payments, Fees & Platform Charges */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">07</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Payments, Fees & Platform Charges</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      By using the Platform, you agree to pay all applicable fees for services and products, and bear any platform fees, convenience charges, or applicable taxes. All payments are processed via secure third-party payment gateways. Sruvo does not store sensitive payment information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8: Cancellations, Refunds & Disputes */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">08</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Cancellations, Refunds & Disputes</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Cancellation and refund policies may vary by service provider. Users are responsible for reviewing applicable terms before booking. Sruvo may facilitate dispute resolution but does not guarantee refunds and is not liable for third-party decisions.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 9: Acceptable Use Policy */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">09</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Acceptable Use Policy</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      You agree not to use the Platform for unlawful, fraudulent, or abusive activities; misrepresent information or identity; attempt to bypass platform systems or payments; or engage in harassment, exploitation, or harmful conduct. Violation may result in immediate suspension or permanent termination.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 10: Intellectual Property */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">10</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Intellectual Property</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      All intellectual property on the Platform, including branding, logos, UI/UX design, software, content, and data, is owned by or licensed to Sruvo. Unauthorized use, reproduction, or distribution is strictly prohibited.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 11: Limitation Of Liability */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">11</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Limitation Of Liability</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      To the maximum extent permitted under applicable law, Sruvo shall not be liable for indirect, incidental, special, or consequential damages. Sruvo is not responsible for actions, omissions, or services of third-party providers. Use of the Platform is at your sole risk.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 12: Indemnification */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">12</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Indemnification</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      You agree to indemnify and hold harmless Sruvo, its founders, employees, and partners from any claims, damages, or liabilities arising out of your use or misuse of the Platform, violation of these Terms, or interactions with third-party providers.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 13: Termination */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">13</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Termination</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Sruvo may suspend or terminate access for violation of these Terms, for legal or regulatory reasons, or to protect platform integrity. Users may discontinue use at any time.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 14: Data & Privacy */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">14</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Data & Privacy</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Your use of Sruvo is also governed by our Privacy Policy, which outlines how we collect, use, and protect your data.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 15: Governing Law & Jurisdiction */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">15</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Governing Law & Jurisdiction</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in Gurgaon, Haryana.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 16: Terms Update & CONTACT */}
              <section className="group">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">16</span>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Terms Update & CONTACT</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Sruvo reserves the right to update or modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the revised Terms.<br/><br/>
                      If you have any queries relating to the processing/ usage of information provided by you or regarding Sruvo's Terms of Services, you may email the Data Protection Officer (DPO) at <a className="text-primary font-semibold" href="mailto:noreply.sruvo@gmail.com">noreply.sruvo@gmail.com</a>.
                    </p>
                  </div>
                </div>
              </section>

              {/* Final Confirmation */}
              <section className="pt-8 border-t border-surface-variant/30">
                <p className="text-on-surface font-bold text-center text-lg">
                  By using Sruvo, you confirm that you have read, understood, and agreed to these Terms of Service.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

    </div>
  );
}
