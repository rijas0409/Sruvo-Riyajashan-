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
    Info: { bg: "bg-white dark:bg-slate-900", text: "text-slate-900 dark:text-white", badge: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    Success: { bg: "bg-white dark:bg-slate-900", text: "text-slate-900 dark:text-white", badge: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    Warning: { bg: "bg-white dark:bg-slate-900", text: "text-slate-900 dark:text-white", badge: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" },
    Urgent: { bg: "bg-white dark:bg-slate-900", text: "text-slate-900 dark:text-white", badge: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
    Premium: { bg: "bg-white dark:bg-slate-900", text: "text-slate-900 dark:text-white", badge: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
  };

  const style = styles[activeAnnouncement.style];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`relative z-[100] w-full border-b border-slate-100 dark:border-slate-800 ${style.bg} ${style.text}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-center relative">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest shrink-0 ${style.badge}`}>
              {activeAnnouncement.priority === 'Critical' ? 'Urgent' : 'New'}
            </span>
            
            <p className="text-sm font-medium tracking-tight">
              {activeAnnouncement.message}
            </p>

            {activeAnnouncement.buttonText && activeAnnouncement.buttonLink && (
              <a 
                href={activeAnnouncement.buttonLink}
                onClick={handleClick}
                className="text-primary hover:underline text-sm font-bold flex items-center gap-1 group transition-all"
              >
                {activeAnnouncement.buttonText}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
              </a>
            )}
          </div>

          <button 
            onClick={handleClose}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
