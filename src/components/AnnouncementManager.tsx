/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useMemo } from "react";
import { announcementService, Announcement, AnnouncementPriority, AnnouncementStyle, AnnouncementStatus } from "../lib/announcementService";

export default function AnnouncementManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [targetPage, setTargetPage] = useState("All");
  const [priority, setPriority] = useState<AnnouncementPriority>("Normal");
  const [style, setStyle] = useState<AnnouncementStyle>("Info");
  const [isSticky, setIsSticky] = useState(false);
  const [status, setStatus] = useState<AnnouncementStatus>("Draft");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setAnnouncements(announcementService.getAll());
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setButtonText("");
    setButtonLink("");
    setTargetPage("All");
    setPriority("Normal");
    setStyle("Info");
    setIsSticky(false);
    setStatus("Draft");
    setStartDate("");
    setEndDate("");
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title, message, buttonText, buttonLink, targetPage, priority, style, isSticky, status, startDate, endDate
    };

    if (editingId) {
      announcementService.update(editingId, data);
    } else {
      announcementService.create(data);
    }

    resetForm();
    setIsCreating(false);
    refresh();
  };

  const startEdit = (a: Announcement) => {
    setTitle(a.title);
    setMessage(a.message);
    setButtonText(a.buttonText || "");
    setButtonLink(a.buttonLink || "");
    setTargetPage(a.targetPage);
    setPriority(a.priority);
    setStyle(a.style);
    setIsSticky(a.isSticky);
    setStatus(a.status);
    setStartDate(a.startDate || "");
    setEndDate(a.endDate || "");
    setEditingId(a.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      announcementService.delete(id);
      refresh();
    }
  };

  const pages = [
      { name: 'All Pages', val: 'All' },
      { name: 'Home', val: '/' },
      { name: 'Features', val: '/features' },
      { name: 'About', val: '/about' },
      { name: 'Contact', val: '/contact' },
      { name: 'Early Access', val: '/early-access' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold text-on-surface">Announcement Center</h4>
          <p className="text-on-surface-variant text-sm">Manage global banners and notifications</p>
        </div>
        <button 
          onClick={() => { setIsCreating(true); resetForm(); }}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Announcement
        </button>
      </div>

      {isCreating && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xxl p-8 border border-primary/20 bg-primary/5"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Title</label>
                  <input 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g., Summer Launch Sale"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all h-24"
                    placeholder="Describe your announcement..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Button Text</label>
                    <input 
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full bg-white px-4 py-3 rounded-xl border border-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g., View Plans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Button Link</label>
                    <input 
                      value={buttonLink}
                      onChange={(e) => setButtonLink(e.target.value)}
                      className="w-full bg-white px-4 py-3 rounded-xl border border-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g., /pricing"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Target Page</label>
                    <select 
                      value={targetPage}
                      onChange={(e) => setTargetPage(e.target.value)}
                      className="w-full bg-white px-4 py-3 rounded-xl border border-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                    >
                      {pages.map(p => <option key={p.val} value={p.val}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Priority</label>
                    <select 
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
                      className="w-full bg-white px-4 py-3 rounded-xl border border-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Important">Important</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Style</label>
                <div className="flex flex-wrap gap-2">
                  {(['Info', 'Success', 'Warning', 'Urgent', 'Premium'] as AnnouncementStyle[]).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${style === s ? 'ring-2 ring-primary border-transparent' : 'bg-white border-surface-variant'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2 cursor-pointer pb-3">
                  <input 
                    type="checkbox" 
                    checked={isSticky}
                    onChange={(e) => setIsSticky(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-surface-variant"
                  />
                  <span className="text-sm font-bold text-on-surface">Sticky Top</span>
                </label>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Start Date</label>
                <input 
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">End Date</label>
                <input 
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-surface-variant/30">
               <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStatus("Published")}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${status === 'Published' ? 'bg-tertiary text-white' : 'bg-white text-on-surface-variant border border-surface-variant'}`}
                  >
                    <span className="material-symbols-outlined text-sm">public</span>
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("Draft")}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${status === 'Draft' ? 'bg-surface-variant text-on-surface' : 'bg-white text-on-surface-variant border border-surface-variant'}`}
                  >
                    <span className="material-symbols-outlined text-sm">drafts</span>
                    Draft
                  </button>
               </div>
               <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-2.5 bg-on-surface text-white rounded-xl font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {editingId ? 'Save Changes' : 'Create System Notification'}
                  </button>
               </div>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {announcements.map((a) => (
          <div key={a.id} className="glass-card rounded-xxl p-6 border border-white/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5 shrink min-w-0">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${a.style === 'Premium' ? 'bg-gradient-to-br from-[#FF6A88] to-[#A76DFF] text-white' : a.style === 'Urgent' ? 'bg-error-container text-error' : a.style === 'Success' ? 'bg-tertiary-container text-tertiary' : 'bg-surface-container text-outline'}`}>
                  <span className="material-symbols-outlined">
                    {a.priority === 'Critical' ? 'notifications_active' : a.priority === 'Important' ? 'priority_high' : 'info'}
                  </span>
               </div>
               <div className="min-w-0">
                  <h5 className="font-bold text-on-surface flex items-center gap-2 truncate">
                    {a.title}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${a.status === 'Published' ? 'bg-tertiary/10 text-tertiary' : 'bg-surface-variant text-on-surface-variant'}`}>
                      {a.status}
                    </span>
                  </h5>
                  <p className="text-sm text-on-surface-variant truncate max-w-md">{a.message}</p>
               </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
               <div className="flex gap-6 text-center">
                  <div>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Views</p>
                    <p className="font-bold text-on-surface">{a.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">CTR</p>
                    <p className="font-bold text-on-surface">{a.views > 0 ? ((a.clicks / a.views) * 100).toFixed(1) : '0'}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Closes</p>
                    <p className="font-bold text-on-surface">{a.closes.toLocaleString()}</p>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button 
                    onClick={() => startEdit(a)}
                    className="p-2.5 rounded-xl bg-surface-container-low hover:bg-white transition-all text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(a.id)}
                    className="p-2.5 rounded-xl bg-surface-container-low hover:bg-error/10 hover:text-error transition-all text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
               </div>
            </div>
          </div>
        ))}
        {announcements.length === 0 && !isCreating && (
          <div className="text-center py-12 glass-card rounded-xxl border-dashed border-2 border-surface-variant">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3 block">campaign</span>
            <p className="text-on-surface-variant font-medium">No announcements published yet</p>
            <button 
               onClick={() => setIsCreating(true)}
               className="mt-4 text-primary font-bold text-sm hover:underline"
            >
              Create your first campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
