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
  const [buttonText, setButtonText] = useState("Learn More");
  const [buttonLink, setButtonLink] = useState("");
  const [targetPage, setTargetPage] = useState("All");
  const [priority, setPriority] = useState<AnnouncementPriority>("Normal");
  const [style, setStyle] = useState<AnnouncementStyle>("Info");
  const [isSticky, setIsSticky] = useState(false);
  const [status, setStatus] = useState<AnnouncementStatus>("Draft");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setAnnouncements(announcementService.getAll().sort((a, b) => b.createdAt - a.createdAt));
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setButtonText("Learn More");
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

  const onPublish = (finalStatus: AnnouncementStatus) => {
    if (!title || !message) {
      setToast("Please fill in title and message");
      return;
    }

    const data = {
      title, message, buttonText, buttonLink, targetPage, priority, style, isSticky, 
      status: finalStatus, startDate, endDate
    };

    if (editingId) {
      announcementService.update(editingId, data);
      setToast(`Announcement updated as ${finalStatus}`);
    } else {
      announcementService.create(data);
      setToast(`Announcement created as ${finalStatus}`);
    }

    setIsCreating(false);
    resetForm();
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
    announcementService.delete(id);
    refresh();
    setToast("Announcement deleted");
  };

  const pages = [
      { name: 'All Pages', val: 'All' },
      { name: 'Homepage', val: '/' },
      { name: 'Early Access', val: '/early-access' },
      { name: 'Traffic Dashboard', val: '/traffic' }
  ];

  if (isCreating) {
    return (
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {editingId ? 'Edit Announcement' : 'New Announcement'}
            </h2>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => { setIsCreating(false); resetForm(); }}
              className="flex-1 md:flex-none px-6 py-4 text-slate-900 dark:text-white font-bold hover:bg-slate-100 rounded-2xl transition-all"
            >
              Discard
            </button>
            <button 
              onClick={() => onPublish('Published')}
              className="flex-1 md:flex-none px-8 py-4 bg-[#7436c9] text-white font-black rounded-2xl shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              Publish Announcement
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-[32px] p-8 md:p-10 border border-slate-100 dark:border-slate-700 shadow-sm space-y-10">
              <div>
                <label className="block text-slate-500 font-bold text-sm mb-4">Announcement Title</label>
                <input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Exciting New Dashboard Features!"
                  className="w-full bg-[#f8f9fc] dark:bg-slate-900 border-none rounded-2xl p-5 text-slate-900 dark:text-white font-medium focus:ring-2 ring-primary/20 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-sm mb-4">Message Content</label>
                <textarea 
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the update in detail..."
                  className="w-full bg-[#f8f9fc] dark:bg-slate-900 border-none rounded-2xl p-5 text-slate-900 dark:text-white font-medium focus:ring-2 ring-primary/20 transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-slate-500 font-bold text-sm mb-4">Call to Action Text</label>
                  <input 
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full bg-[#f8f9fc] dark:bg-slate-900 border-none rounded-2xl p-5 text-slate-900 dark:text-white font-medium focus:ring-2 ring-primary/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold text-sm mb-4">Action Link</label>
                  <input 
                    value={buttonLink}
                    onChange={(e) => setButtonLink(e.target.value)}
                    placeholder="https://notifypremium.com/docs"
                    className="w-full bg-[#f8f9fc] dark:bg-slate-900 border-none rounded-2xl p-5 text-slate-900 dark:text-white font-medium focus:ring-2 ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-white dark:bg-slate-800 rounded-[32px] p-8 md:p-10 border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <span className="material-symbols-outlined text-[#7436c9] text-3xl">calendar_today</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Schedule Availability</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-slate-500 font-bold text-sm mb-4">Start Date & Time</label>
                  <input 
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#f8f9fc] dark:bg-slate-900 border-none rounded-2xl p-5 text-slate-900 dark:text-white font-medium focus:ring-2 ring-primary/20 transition-all outline-none appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold text-sm mb-4">End Date & Time</label>
                  <input 
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#f8f9fc] dark:bg-slate-900 border-none rounded-2xl p-5 text-slate-900 dark:text-white font-medium focus:ring-2 ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Config */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-[32px] p-8 border border-slate-100 dark:border-slate-700 shadow-sm sticky top-24">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-8">Configuration</p>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-slate-900 dark:text-white font-bold text-sm mb-4">Target Audience Page</label>
                  <div className="relative">
                    <select 
                      value={targetPage}
                      onChange={(e) => setTargetPage(e.target.value)}
                      className="w-full bg-[#f8f9fc] dark:bg-slate-900 border-none rounded-2xl p-5 text-slate-900 dark:text-white font-bold appearance-none cursor-pointer pr-12"
                    >
                      {pages.map(p => <option key={p.val} value={p.val}>{p.name}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-white font-bold text-sm mb-6">Priority Level</label>
                  <div className="space-y-2">
                    {(['Info', 'Success', 'Warning', 'Urgent'] as AnnouncementStyle[]).map((s) => (
                      <label 
                        key={s}
                        className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${style === s ? 'bg-[#f0f4ff] dark:bg-primary/10 border-primary/20 ring-2 ring-primary/5' : 'bg-[#f8f9fc]/50 dark:bg-slate-900/50 border-transparent hover:border-slate-100'}`}
                        onClick={() => setStyle(s)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${style === s ? 'border-primary' : 'border-slate-300'}`}>
                            {style === s && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                          </div>
                          <span className={`text-sm font-bold ${style === s ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>{s}</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${s === 'Info' ? 'bg-blue-400' : s === 'Success' ? 'bg-green-400' : s === 'Warning' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <label className="text-slate-900 dark:text-white font-bold text-sm mb-1 block">Make Sticky</label>
                    <p className="text-[10px] text-slate-400 font-medium">Stay at top until dismissed</p>
                  </div>
                  <button 
                    onClick={() => setIsSticky(!isSticky)}
                    className={`w-12 h-6 rounded-full relative transition-all ${isSticky ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${isSticky ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                <button 
                  onClick={() => onPublish('Draft')}
                  className="w-full py-4 text-slate-400 font-bold border-2 border-slate-100 dark:border-slate-700 rounded-2xl hover:bg-slate-50 transition-all mt-4"
                >
                  Save as Draft
                </button>
              </div>
            </div>

            {/* Real-time Preview Area */}
            <div className="bg-white dark:bg-slate-800 rounded-[32px] p-8 border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden relative">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">Live Preview</span>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-bold leading-tight mb-1 truncate">{title || 'Announcement Title'}</h4>
                  <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">{message || 'Content preview...'}</p>
                  <div className="text-primary text-sm font-black flex items-center gap-1 group">
                    {buttonText}
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {toast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-2xl z-[100] animate-bounce">
            {toast}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Announcement Center</h2>
          <p className="text-slate-400 mt-2 text-lg">Broadcast updates to your users in style</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsCreating(true); }}
          className="w-full md:w-auto px-8 py-4 bg-[#7436c9] text-white font-black rounded-2xl shadow-xl shadow-purple-500/30 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {announcements.map((a) => (
          <motion.div 
            key={a.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-[32px] p-8 border border-slate-100 dark:border-slate-700 shadow-sm relative group hover:border-primary/30 transition-all flex flex-col"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 -mr-12 -mt-12 group-hover:opacity-40 transition-opacity ${a.style === 'Info' ? 'bg-blue-400' : a.style === 'Success' ? 'bg-green-400' : a.style === 'Warning' ? 'bg-yellow-400' : 'bg-red-400'}`} />
            
            <div className="flex justify-between items-start mb-6">
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${a.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                {a.status}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => startEdit(a)} 
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-slate-100 dark:border-slate-800"
                  title="Edit Announcement"
                >
                  <span className="material-symbols-outlined text-xl">edit_note</span>
                </button>
                <button 
                  onClick={() => handleDelete(a.id)} 
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-slate-100 dark:border-slate-800"
                  title="Delete Announcement"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight">{a.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8">{a.message}</p>
            
            <div className="mt-auto grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-700 pt-6">
              <div className="text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Views</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{a.views.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Clicks</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{a.clicks.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">CTR</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{a.views > 0 ? ((a.clicks / a.views) * 100).toFixed(1) : '0'}%</p>
              </div>
            </div>
          </motion.div>
        ))}

        {announcements.length === 0 && !isCreating && (
          <div className="col-span-full py-32 bg-slate-50/50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-4xl text-slate-300">campaign</span>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Voice of Sruvo is quiet</h4>
            <p className="text-slate-400 max-w-sm mb-10">Start communicating updates and important announcements directly to your audience.</p>
            <button 
              onClick={() => setIsCreating(true)}
              className="text-primary font-black uppercase tracking-widest text-xs hover:underline underline-offset-8"
            >
              Launch First Campaign
            </button>
          </div>
        )}
      </div>
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-2xl z-[100] animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}

