/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { announcementService, Announcement } from "../lib/announcementService";

export default function AnnouncementBanner() {
  const location = useLocation();
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const announcement = announcementService.getActiveForPage(location.pathname);
    if (announcement) {
      setActiveAnnouncement(announcement);
      setIsVisible(true);
      announcementService.trackView(announcement.id);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    if (activeAnnouncement) {
      announcementService.dismiss(activeAnnouncement.id);
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (activeAnnouncement) {
      announcementService.trackClick(activeAnnouncement.id);
    }
  };

  if (!isVisible || !activeAnnouncement) return null;

  const styles = {
    Info: "bg-surface-container-high border-b border-white/20 text-on-surface",
    Success: "bg-[#2ED3B7] border-b border-white/20 text-white",
    Warning: "bg-secondary-container border-b border-white/20 text-on-secondary-container",
    Urgent: "bg-error border-b border-white/20 text-white",
    Premium: "bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] border-b border-white/20 text-white",
  };

  const priorityIcons = {
    Normal: "info",
    Important: "priority_high",
    Critical: "notifications_active",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`relative z-[100] w-full font-body overflow-hidden ${styles[activeAnnouncement.style]} ${activeAnnouncement.isSticky ? 'sticky top-0' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="material-symbols-outlined text-sm md:text-base opacity-90 hidden sm:block">
              {priorityIcons[activeAnnouncement.priority]}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 shrink min-w-0">
              <span className="font-bold text-xs md:text-sm whitespace-nowrap truncate uppercase tracking-widest opacity-90">
                {activeAnnouncement.title}
              </span>
              <span className="text-xs md:text-sm opacity-80 truncate">
                {activeAnnouncement.message}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeAnnouncement.buttonText && activeAnnouncement.buttonLink && (
              <a 
                href={activeAnnouncement.buttonLink}
                onClick={handleClick}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1"
              >
                {activeAnnouncement.buttonText}
                <span className="material-symbols-outlined text-[10px] md:text-xs">arrow_forward</span>
              </a>
            )}
            <button 
              onClick={handleClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center shrink-0"
            >
              <span className="material-symbols-outlined text-sm md:text-base">close</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
