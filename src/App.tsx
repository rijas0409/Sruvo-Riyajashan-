/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

// Lazy load pages and non-essential components
const Home = lazy(() => import("./pages/Home"));
const TrafficDashboard = lazy(() => import("./pages/TrafficDashboard"));
const PressKit = lazy(() => import("./pages/PressKit"));
const HowItWorks = lazy(() => import("./components/HowItWorks"));
const Features = lazy(() => import("./components/Features"));
const ForVets = lazy(() => import("./components/ForVets"));
const EarlyAccess = lazy(() => import("./components/EarlyAccess"));
const Contact = lazy(() => import("./components/Contact"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));
const BecomePartner = lazy(() => import("./components/BecomePartner"));
const NotFound = lazy(() => import("./pages/NotFound"));

import Navbar from "./components/Navbar";
import BottomLayout from "./components/BottomLayout";
import AnnouncementBanner from "./components/AnnouncementBanner";
import { analytics } from "./lib/analytics";

function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track Page View
    analytics.trackPageView(pathname);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isEarlyAccess = location.pathname === '/early-access';
  const isTrafficPage = location.pathname === '/traffic';
  
  // Check if current route is valid
  const validRoutes = ['/', '/how-it-works', '/features', '/for-vets', '/early-access', '/contact', '/privacy-policy', '/terms-of-service', '/become-partner', '/press-kit', '/traffic'];
  const isNotFound = !validRoutes.includes(location.pathname);

  return (
    <div className="relative min-h-screen">
      <AnnouncementBanner />
      {/* Global Background Decorations */}
      {!isTrafficPage && !isNotFound && (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[100px]"></div>
        </div>
      )}

      {/* Global Grain Overlay */}
      {!isTrafficPage && !isNotFound && <div className="fixed inset-0 grain-overlay z-0 pointer-events-none"></div>}

      <ScrollToTop />
      {!isEarlyAccess && !isTrafficPage && !isNotFound && (
        <Navbar 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/features" element={<Features />} />
          <Route path="/for-vets" element={<ForVets />} />
          <Route path="/early-access" element={<EarlyAccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/press-kit" element={<PressKit />} />
          <Route path="/traffic" element={<TrafficDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isEarlyAccess && !isTrafficPage && !isNotFound && <BottomLayout />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
