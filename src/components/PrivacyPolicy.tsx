/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-on-surface-variant font-body max-w-2xl mx-auto leading-relaxed"
          >
            Your trust is our most valuable asset. At Sruvo, we design with privacy at the core of our pet care ecosystem.
          </motion.p>
        </div>

        {/* Privacy Content Shell */}
        <div className="max-w-4xl mx-auto relative">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-container/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-tertiary-container/20 rounded-full blur-3xl -z-10"></div>
          
          {/* Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 md:p-16 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white/40"
          >
            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-surface-variant/30">
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">verified_user</span>
              </div>
              <div>
                <p className="text-sm font-label text-on-surface-variant uppercase tracking-wider">Effective Date</p>
                <p className="text-on-surface font-semibold">Jan 09, 2026</p>
              </div>
            </div>

            <div className="space-y-16">
              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">01</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Introduction</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">
                      Sruvo (“we”, “our”, or “us”) operates a technology platform that enables pet discovery, veterinary services, pet commerce, and digital pet health management. We are committed to protecting personal data in accordance with applicable laws, including the Digital Personal Data Protection Act, 2023 (India). This Privacy Policy explains how we collect, use, process, and safeguard your information when you access or use our platform.
                    </p>
                  </div>
                </div>
              </section>

              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">02</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Information We Collect</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">
                      We collect information necessary to provide and improve our services:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl bg-surface-container-low border border-white/50">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="material-symbols-outlined text-tertiary">person</span>
                          <h4 className="font-bold text-on-surface">Personal Information</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant">Name, phone number, email address, location data, and account credentials.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-surface-container-low border border-white/50">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="material-symbols-outlined text-tertiary">pets</span>
                          <h4 className="font-bold text-on-surface">Pet Information</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant">Pet profile details including breed, age, health records, vaccination history, and uploaded documents.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-surface-container-low border border-white/50">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="material-symbols-outlined text-tertiary">payments</span>
                          <h4 className="font-bold text-on-surface">Transaction Data</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant">Details related to bookings, purchases, and payments (processed securely via third-party providers).</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-surface-container-low border border-white/50">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="material-symbols-outlined text-tertiary">devices</span>
                          <h4 className="font-bold text-on-surface">Device & Usage Data</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant">Device identifiers, IP address, operating system, and usage patterns.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Purpose of Processing */}
              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">03</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Purpose of Processing</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">
                      We process data for the following purposes:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Enabling pet discovery and transactions through verified breeders</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Facilitating veterinary consultations and service bookings</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Maintaining digital pet health records (“Pet Passport”)</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Providing AI-based insights for pet-related decision-making</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Processing payments and managing transactions</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Enhancing platform performance and user experience</span>
                      </li>
                      <li className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span>Preventing fraud, abuse, and ensuring compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4: AI-Based Processing */}
              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">04</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">AI-Based Processing</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">
                      Sruvo may use pet and user data to generate AI-based insights, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                      <li>Pet suitability analysis</li>
                      <li>Estimated cost of ownership</li>
                      <li>Basic informational recommendations</li>
                    </ul>
                    <div className="p-8 rounded-3xl bg-primary/5 border-l-4 border-primary">
                      <p className="italic text-primary font-medium">
                        These insights are assistive in nature and do not substitute professional veterinary advice.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Data Sharing */}
              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">05</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Data Sharing & Third-Party Services</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">We do not sell personal data.</p>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">We may share user data with trusted third parties strictly for the purpose of providing and improving our services, including:</p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2.5 flex-shrink-0"></div>
                        <span><strong>Veterinarians and service providers</strong> — to facilitate consultations, bookings, and related services</span>
                      </li>
                      <li className="flex items-start gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2.5 flex-shrink-0"></div>
                        <span><strong>Verified breeders and sellers</strong> — to enable pet discovery and transactions</span>
                      </li>
                      <li className="flex items-start gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2.5 flex-shrink-0"></div>
                        <span><strong>Payment processors</strong> — to securely process payments and financial transactions</span>
                      </li>
                      <li className="flex items-start gap-4 text-on-surface-variant">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2.5 flex-shrink-0"></div>
                        <span><strong>Technology partners</strong> — including hosting providers, analytics services, and customer support tools</span>
                      </li>
                    </ul>
                    <p className="text-on-surface-variant leading-relaxed">Our platform may also integrate third-party services. These third parties operate independently and may have their own privacy policies governing the use of your information.</p>
                    <p className="text-on-surface-variant leading-relaxed">We may disclose information to regulatory authorities, law enforcement agencies, or government bodies where required to comply with applicable laws or legal obligations.</p>
                    <p className="text-on-surface-variant leading-relaxed">All third parties engaged by us are expected to implement appropriate data protection and security measures in accordance with applicable regulations.</p>
                  </div>
                </div>
              </section>

              {/* Section 6: Data Security */}
              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">06</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Data Security</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">
                      We implement reasonable technical and organizational safeguards to protect data from unauthorized access, loss, or misuse. Users are responsible for maintaining the confidentiality of their account credentials.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7: User Rights */}
              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">07</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">User Rights</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">
                      Subject to applicable law, users may:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                      <li>Access and update personal data</li>
                      <li>Request deletion of their data</li>
                      <li>Withdraw consent where applicable</li>
                    </ul>
                    <p className="text-on-surface-variant text-pretty">Requests can be made via: <a className="text-primary font-semibold" href="mailto:thesruvo@gmail.com">thesruvo@gmail.com</a></p>
                  </div>
                </div>
              </section>

              {/* Section 8: Cookies, Tracking & Children’s Privacy */}
              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">08</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Cookies, Tracking & Children’s Privacy</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">
                      We use cookies and similar tracking technologies to enhance platform functionality, analyze user behavior, and personalize user experience. These technologies help us understand usage patterns, improve performance, and deliver relevant features.<br/><br/>
                      Users may control or disable cookies through their browser or device settings. However, disabling certain cookies may affect the functionality of the platform.<br/><br/>
                      Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that data has been collected from a minor without appropriate consent, we will take reasonable steps to delete such information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 9: Policy Updates */}
              <section className="group">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  <span className="text-3xl font-headline font-extrabold text-primary/20 group-hover:text-primary transition-colors duration-500">09</span>
                  <div className="space-y-6 flex-1">
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Policy Updates & Contact</h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg text-pretty">
                      We may update this policy periodically. Continued use of the platform constitutes acceptance of the updated policy.<br/><br/>
                      If you have any queries relating to the processing/ usage of information provided by you or regarding Sruvo's Privacy Policy, you may email the Data Protection Officer (DPO) at <a className="text-primary font-semibold" href="mailto:thesruvo@gmail.com">thesruvo@gmail.com</a>.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

    </div>
  );
}
