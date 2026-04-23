/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useAnalyticsData, TimeFilter } from "../hooks/useAnalyticsData";
import AnnouncementManager from "../components/AnnouncementManager";

type DashboardView = 'overview' | 'announcements' | 'audience' | 'settings';

export default function TrafficDashboard() {
  const [filter, setFilter] = useState<TimeFilter>('30D');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string>("Visitors");
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { stats, visitorTrends, trafficSources, pagePerformance, recentSignups } = useAnalyticsData(filter);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredSignups = useMemo(() => {
    if (!searchQuery) return recentSignups;
    return recentSignups.filter(s => s.email.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [recentSignups, searchQuery]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const colors = {
    primary: "#7436c9",
    secondary: "#a9294a",
    tertiary: "#006858",
    accent1: "#A76DFF",
    accent2: "#FF6A88",
    accent3: "#2ED3B7",
  };

  const exportCSV = () => {
    const headers = ["Metric", "Value"];
    const rows = [
      ["Total Visitors", stats.totalVisitors],
      ["Unique Visitors", stats.uniqueVisitors],
      ["Total Signups", stats.totalSignups],
      ["Conversion Rate", stats.conversionRate.toFixed(2) + "%"],
      ["Avg Session Duration", Math.floor(stats.avgDuration) + "s"],
      ["Bounce Rate", stats.bounceRate.toFixed(2) + "%"],
      ["Live Visitors", stats.liveVisitors]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sruvo_analytics_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const insights = useMemo(() => {
    const list = [];
    if (stats.conversionRate > 10) list.push("Conversion rate is exceptionally high this period.");
    if (stats.bounceRate > 60) list.push("Bounce rate is high. Consider optimizing landing pages.");
    
    if (pagePerformance.length > 0) {
      list.push(`"${pagePerformance[0].name}" is your highest performing page.`);
    }

    if (trafficSources.length > 0) {
      const topSource = trafficSources.slice().sort((a, b) => b.value - a.value)[0];
      list.push(`${topSource.name} is leading your traffic acquisition.`);
    }

    if (list.length < 3) {
      list.push("Overall system health remains optimal at 98%.");
      list.push("Peak activity window: 10 PM - 1 AM PST detected.");
    }

    return list.slice(0, 3);
  }, [stats, pagePerformance, trafficSources]);

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <div className="grain-overlay" />
      
      {/* SideNavBar */}
      <aside className={`sticky left-0 top-0 h-screen flex flex-col p-6 z-[60] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-white/10 shadow-[40px_0_60px_-15px_rgba(45,46,52,0.04)] font-headline text-sm font-medium tracking-tight overflow-y-auto transition-all duration-300 ${isSidebarCollapsed ? 'w-24' : 'w-64'}`}>
        <div className="mb-10 px-4 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] bg-clip-text text-transparent">Sruvo</span>
              <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] mt-1">Ethereal</p>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-surface-container-low rounded-xl transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined">{isSidebarCollapsed ? 'menu' : 'menu_open'}</span>
          </button>
        </div>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setCurrentView('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all scale-95 active:scale-90 ${currentView === 'overview' ? 'text-primary dark:text-purple-300 font-bold border-r-4 border-[#A76DFF] bg-purple-50/50' : 'text-on-surface-variant hover:text-primary transition-colors hover:bg-white/50 hover:translate-x-1'}`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            {!isSidebarCollapsed && <span>Overview</span>}
          </button>
          <button 
            onClick={() => setCurrentView('announcements')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all scale-95 active:scale-90 ${currentView === 'announcements' ? 'text-primary dark:text-purple-300 font-bold border-r-4 border-[#A76DFF] bg-purple-50/50' : 'text-on-surface-variant hover:text-primary transition-colors hover:bg-white/50 hover:translate-x-1'}`}
          >
            <span className="material-symbols-outlined">campaign</span>
            {!isSidebarCollapsed && <span>Announcements</span>}
          </button>
          <button 
            onClick={() => setCurrentView('audience')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all scale-95 active:scale-90 ${currentView === 'audience' ? 'text-primary dark:text-purple-300 font-bold border-r-4 border-[#A76DFF] bg-purple-50/50' : 'text-on-surface-variant hover:text-primary transition-colors hover:bg-white/50 hover:translate-x-1'}`}
          >
            <span className="material-symbols-outlined">group</span>
            {!isSidebarCollapsed && <span>Audience</span>}
          </button>
          <button 
            onClick={() => setCurrentView('overview')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all scale-95 active:scale-90 text-on-surface-variant hover:text-primary transition-colors hover:bg-white/50 hover:translate-x-1 duration-200"
          >
            <span className="material-symbols-outlined">sensors</span>
            {!isSidebarCollapsed && <span>Live Traffic</span>}
          </button>
          <button 
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all scale-95 active:scale-90 ${currentView === 'settings' ? 'text-primary dark:text-purple-300 font-bold border-r-4 border-[#A76DFF] bg-purple-50/50' : 'text-on-surface-variant hover:text-primary transition-colors hover:bg-white/50 hover:translate-x-1'}`}
          >
            <span className="material-symbols-outlined">settings</span>
            {!isSidebarCollapsed && <span>Settings</span>}
          </button>
        </nav>
        <div className="mt-auto pt-6 border-t border-surface-variant/30 px-2">
          <button 
            onClick={exportCSV}
            className={`w-full py-3 bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 ${isSidebarCollapsed ? 'px-0' : 'px-4'}`}
          >
            <span className="material-symbols-outlined text-sm">ios_share</span>
            {!isSidebarCollapsed && <span>Export Report</span>}
          </button>
          <div className={`flex items-center gap-3 mt-6 p-2 rounded-xl bg-surface-container-low/50 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <img 
              alt="Founder Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shrink-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3S7ZXGVoZ8QLJ7UyDxufKyhZoMqIjWShfzOK94nzal2uPyN88SSnwGVJHm3KhGuKMW2qo1zUttjeLxx0FplOct9MsBvOSXm2Re0gCxk81uXyVtn9A15U_y-q_sgdJOIagEjL26NUed2tdLZJDwYSpclHxGa6y7BxgJ7_OCtoZ9IjD9dDxZA3Pjl10zOe6hOJOuDQJjkNsn_FUMkg4roz_-I6TsJRlUnLF9GdiH4pOOem51zSoNkeQDbhIkNMAWv-XpmIhdyzF9ZA"
              referrerPolicy="no-referrer"
            />
            {!isSidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-on-surface truncate">Alex Rivera</span>
                <span className="text-[10px] text-on-surface-variant">Founder</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 min-h-screen transition-all duration-300`}>
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-12 sticky top-0 z-50 w-full h-20 bg-[#f7f6fe]/60 dark:bg-[#2d2e34]/60 backdrop-blur-md font-headline tracking-tight">
          <div>
            <h1 className="text-lg font-black text-on-surface">Analytics Sanctuary</h1>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative group hidden md:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined">search</span>
              <input 
                className="pl-10 pr-4 py-2 w-64 bg-surface-container-low rounded-full border-none focus:ring-2 focus:ring-tertiary/50 focus:bg-white transition-all text-sm outline-none" 
                placeholder="Search signups..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-5 text-outline">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-full transition-all duration-300 relative ${showNotifications ? 'bg-primary/10 text-primary' : 'hover:bg-surface-container-low'}`}
                >
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6A88] rounded-full border-2 border-surface"></span>
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-surface-variant/20 p-4 z-[100]"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-bold">Notifications</h5>
                        <button className="text-[10px] text-primary uppercase font-bold tracking-widest">Mark All Read</button>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar">
                        {[
                          { title: 'New Access Request', desc: 'A new user requested early access access.', time: '2m ago' },
                          { title: 'System Healthy', desc: 'All nodes are performing optimally.', time: '1h ago' },
                          { title: 'Daily Report Ready', desc: 'The analytics report for yesterday is ready for review.', time: '3h ago' }
                        ].map((n, i) => (
                          <div key={i} className="p-3 rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors cursor-pointer group">
                            <p className="text-xs font-bold group-hover:text-primary transition-colors">{n.title}</p>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">{n.desc}</p>
                            <p className="text-[9px] text-outline mt-1">{n.time}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button className="p-2 rounded-full hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </button>
              <button 
                onClick={() => setShowHelp(true)}
                className="p-2 rounded-full hover:bg-surface-container-low transition-all"
              >
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="px-12 py-8 scroll-smooth">
          <AnimatePresence mode="wait">
            {currentView === 'overview' ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                {/* Hero Header Section */}
                <section className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                    <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2 block">System Status: Optimal</span>
                    <h2 className="text-4xl font-bold text-on-surface font-headline tracking-tight">Traffic Dashboard</h2>
                    <p className="text-on-surface-variant mt-1 text-lg">Real-time growth insights for Sruvo</p>
                  </div>
                  <div className="flex gap-1 p-1.5 bg-surface-container-low rounded-xxl shadow-inner border border-white/40">
                    {(['Today', '7D', '30D', 'Custom'] as TimeFilter[]).map((f) => (
                      <button 
                        key={f}
                        onClick={() => {
                          setFilter(f);
                          handleRefresh();
                        }}
                        className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${filter === f ? 'bg-white text-primary shadow-sm scale-105' : 'text-on-surface-variant hover:bg-white/50'}`}
                      >
                        {f === 'Custom' ? (
                          <div className="flex items-center gap-1">
                            {filter === 'Custom' ? 'May 1 - May 30' : 'Custom'} <span className="material-symbols-outlined text-sm">calendar_today</span>
                          </div>
                        ) : f}
                      </button>
                    ))}
                    <button 
                      onClick={handleRefresh}
                      className={`p-2 text-on-surface-variant hover:text-primary transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span>
                    </button>
                  </div>
                </section>

                {/* Metrics Bento Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Metrics Card 1 */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    onClick={() => setActiveMetric("Visitors")}
                    className={`glass-card rounded-xxl p-6 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer border-2 ${activeMetric === 'Visitors' ? 'border-primary/50 bg-primary/5' : 'border-transparent'}`}
                  >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-primary/10 rounded-xl">
                        <span className="material-symbols-outlined text-primary">visibility</span>
                      </div>
                      <span className="text-tertiary text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        12.5%
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium">Total Visitors</p>
                    <h3 className="text-3xl font-bold text-on-surface mt-1">{stats.totalVisitors.toLocaleString()}</h3>
                  </motion.div>

                  {/* Metrics Card 2 */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    onClick={() => setActiveMetric("Signups")}
                    className={`glass-card rounded-xxl p-6 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer border-2 ${activeMetric === 'Signups' ? 'border-tertiary/50 bg-tertiary/5' : 'border-transparent'}`}
                  >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl group-hover:bg-tertiary/10 transition-all" />
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-tertiary/10 rounded-xl">
                        <span className="material-symbols-outlined text-tertiary">person_add</span>
                      </div>
                      <span className="text-tertiary text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        8.2%
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium">Early Access Signups</p>
                    <h3 className="text-3xl font-bold text-on-surface mt-1">{stats.totalSignups.toLocaleString()}</h3>
                  </motion.div>

                  {/* Metrics Card 3 */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    onClick={() => setActiveMetric("Conversion")}
                    className={`glass-card rounded-xxl p-6 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer border-2 ${activeMetric === 'Conversion' ? 'border-secondary/50 bg-secondary/5' : 'border-transparent'}`}
                  >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-all" />
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-secondary/10 rounded-xl">
                        <span className="material-symbols-outlined text-secondary">ads_click</span>
                      </div>
                      <span className="text-tertiary text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        3.4%
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium">Conversion Rate</p>
                    <h3 className="text-3xl font-bold text-on-surface mt-1">{stats.conversionRate.toFixed(2)}%</h3>
                  </motion.div>

                  {/* Metrics Card 4 */}
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="glass-card rounded-xxl p-6 bg-gradient-to-br from-primary to-[#A76DFF] relative overflow-hidden group shadow-lg"
                  >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="p-2.5 bg-white/20 rounded-xl">
                        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>pulse_alert</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-white animate-pulse rounded-full" />
                        <span className="text-white text-[10px] font-bold uppercase tracking-wider">Live Now</span>
                      </div>
                    </div>
                    <p className="text-on-primary/70 text-sm font-medium relative z-10">Live Visitors</p>
                    <h3 className="text-4xl font-bold text-white mt-1 relative z-10">{stats.liveVisitors}</h3>
                  </motion.div>
                </section>

                {/* Main Charts & Insights Section */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 glass-card rounded-xxl p-8 space-y-8 relative overflow-hidden">
                    <AnimatePresence>
                      {isRefreshing && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px] z-10 flex items-center justify-center"
                        >
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-bold text-on-surface">{activeMetric} Trends</h4>
                        <p className="text-on-surface-variant text-sm">Engagement metrics for {filter === 'Today' ? 'last 24h' : filter === '7D' ? 'last 7 days' : 'last 30 days'}</p>
                      </div>
                      <button 
                        onClick={() => setShowDetailedView(true)}
                        className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                      >
                        Detailed View <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </button>
                    </div>
                    
                    <div className="h-64 flex items-end gap-2 px-4 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={visitorTrends}>
                          <XAxis dataKey="date" hide />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#2d2e34', 
                              border: 'none', 
                              borderRadius: '8px', 
                              color: 'white',
                              fontSize: '10px'
                            }}
                            itemStyle={{ color: 'white' }}
                            cursor={{ fill: 'rgba(116, 54, 201, 0.05)' }}
                          />
                          <Bar 
                            dataKey="count" 
                            fill={colors.primary} 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="glass-card rounded-xxl p-8 flex-1 bg-surface-container-low border-none shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ED3B7]/10 rounded-full blur-3xl -mr-16 -mt-16" />
                      <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-primary">auto_awesome</span>
                        <h4 className="text-xl font-bold text-on-surface">Founder Insights</h4>
                      </div>
                      <div className="space-y-5">
                        {insights.map((insight, idx) => (
                          <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/50 border border-white/50">
                            <span className={`material-symbols-outlined ${idx % 3 === 0 ? 'text-tertiary' : idx % 3 === 1 ? 'text-secondary' : 'text-primary'}`}>
                              {idx % 3 === 0 ? 'trending_up' : idx % 3 === 1 ? 'devices_fold' : 'new_releases'}
                            </span>
                            <p className="text-sm text-on-surface leading-relaxed">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card rounded-xxl p-6 bg-[#2ED3B7]/10 border-none flex items-center justify-between">
                      <div>
                        <p className="text-tertiary text-sm font-bold uppercase tracking-wider">Health Score</p>
                        <h4 className="text-2xl font-black text-tertiary">98/100</h4>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-tertiary flex items-center justify-center">
                        <span className="material-symbols-outlined text-tertiary">check</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Bottom Bento Row */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="glass-card rounded-xxl p-8">
                    <h4 className="text-xl font-bold text-on-surface mb-6">Page Performance</h4>
                    <div className="space-y-6">
                      {pagePerformance.slice(0, 4).map((pg, i) => {
                        const maxVal = pagePerformance[0]?.val || 1;
                        const percentage = (pg.val / maxVal) * 100;
                        return (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-on-surface-variant max-w-[150px] truncate">{pg.name}</span>
                              <span className="font-bold">{pg.val.toLocaleString()}</span>
                            </div>
                            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-1000 ease-out" 
                                style={{ width: `${percentage}%`, opacity: 1 - (i * 0.2) }} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="glass-card rounded-xxl p-8 flex flex-col items-center">
                    <h4 className="text-xl font-bold text-on-surface w-full mb-8">Traffic Sources</h4>
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={trafficSources.length > 0 ? trafficSources : [{ name: 'None', value: 1 }]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {trafficSources.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={Object.values(colors)[index % 6]} />
                            ))}
                            {trafficSources.length === 0 && <Cell fill="#e8e7f1" />}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold">{trafficSources.length}</span>
                        <span className="text-on-surface-variant text-xs">Sources</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                      {trafficSources.slice(0, 4).map((source, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: Object.values(colors)[index % 6] }} />
                          <span className="text-xs text-on-surface-variant">{source.name} ({Math.round((source.value / (stats.totalVisitors || 1)) * 100)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-xxl p-8 overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xl font-bold text-on-surface">Recent Signups</h4>
                      <span className="text-[10px] bg-[#2ED3B7]/20 text-tertiary px-2 py-1 rounded-full font-bold uppercase tracking-wider">Real-time</span>
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
                      {filteredSignups.length > 0 ? filteredSignups.map((s, i) => {
                        const initial = s.email.charAt(0).toUpperCase();
                        const timeAgo = Math.floor((Date.now() - s.timestamp) / 60000);
                        return (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white"
                                style={{ backgroundColor: Object.values(colors)[i % 6] }}
                              >
                                {initial}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold truncate max-w-[120px]">{s.email}</p>
                                <p className="text-[10px] text-on-surface-variant italic truncate">{s.browser} • {s.country}</p>
                              </div>
                            </div>
                            <span className="text-[10px] text-outline whitespace-nowrap">{timeAgo === 0 ? 'Just now' : `${timeAgo}m ago`}</span>
                          </motion.div>
                        );
                      }) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                          <span className="material-symbols-outlined text-outline text-4xl mb-2">person_search</span>
                          <p className="text-xs text-on-surface-variant">No signups found matching your search.</p>
                        </div>
                      )}
                    </div>
                    <button className="w-full mt-4 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors">View All Contacts</button>
                  </div>
                </section>

                {/* Bottom Asymmetric Canvas Element */}
                <section className="pb-12">
                  <div className="glass-card rounded-xxl p-10 bg-gradient-to-br from-white via-white to-primary/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                      <h3 className="text-3xl font-bold font-headline tracking-tight">Ethereal Insight: "The Night Owl Peak"</h3>
                      <p className="text-on-surface-variant text-lg leading-relaxed">We noticed a significant traffic spike between 10 PM and 1 AM PST. Users in this window are 40% more likely to complete the "How it Works" guide. Consider scheduling your social posts to hit right before this window starts.</p>
                      <div className="flex gap-4 pt-4">
                        <button 
                          onClick={() => setToast("Scheduling tool launched...")}
                          className="px-8 py-3 bg-on-surface text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-transform"
                        >
                          Schedule Content
                        </button>
                        <button 
                          onClick={() => setToast("Insight dismissed.")}
                          className="px-8 py-3 bg-white border border-surface-variant text-on-surface rounded-full font-bold hover:bg-surface-container transition-colors"
                        >
                          Dismiss Alert
                        </button>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 aspect-video rounded-xxl overflow-hidden shadow-2xl relative group">
                      <img 
                        alt="Data Visualization" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBvTg3qv93MaaDtTCdAt60wq58yO3vF9LeCaON9R3Lx1lBLL13K47E54wXCNlGwcWE4-nFFnbjrBZ-rZCm8SXV89Gc0EeSyOtHxq0T2-XSw_b6nYXalMmaZZoOi49EzwJtJMtsoQMVSIHBPoUOtEMvI_AzeAs89b9fYMEWQavYKg-fhJ9vZXYR2Qse730jmq__BlI-KAPwKMN29hOziBhT3j9V3gRrrylSvj5TdFDl-EH7AhRMbM9m5pXqGdqte1UTarCCn4UhKFI" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </section>
              </motion.div>
            ) : currentView === 'announcements' ? (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-4xl font-bold text-on-surface font-headline tracking-tight">Announcement Center</h2>
                  <p className="text-on-surface-variant text-lg">Broadcast updates to your users in style</p>
                </div>
                <AnnouncementManager />
              </motion.div>
            ) : currentView === 'audience' ? (
              <motion.div
                key="audience"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12 py-20 flex flex-col items-center justify-center text-center"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-5xl text-primary animate-pulse">group</span>
                </div>
                <h2 className="text-3xl font-bold font-headline">Audience Intelligence</h2>
                <p className="max-w-md text-on-surface-variant">Deep dive into user demographics, behaviors, and retention metrics. This feature is currently in early beta.</p>
                <button 
                  onClick={() => setToast("Audience reports are generating...")} 
                  className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
                >
                  Join Beta List
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl space-y-12"
              >
                <div>
                  <h2 className="text-3xl font-bold font-headline mb-2">Dashboard Settings</h2>
                  <p className="text-on-surface-variant">Configure your analytics environment and data preferences.</p>
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Auto-Refresh (1min)', icon: 'sync' },
                    { label: 'Real-time Tracking', icon: 'bolt' },
                    { label: 'Email Reports', icon: 'mail' },
                    { label: 'Dark Mode Sync', icon: 'dark_mode' }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-surface-container-low rounded-2xl border border-surface-variant/10">
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-on-surface-variant">{s.icon}</span>
                        <span className="font-bold">{s.label}</span>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {showDetailedView && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailedView(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold font-headline">{activeMetric} Deep Dive</h3>
                <button onClick={() => setShowDetailedView(false)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitorTrends}>
                    <XAxis dataKey="date" />
                    <Tooltip cursor={{ fill: 'rgba(116, 54, 201, 0.05)' }} />
                    <Bar dataKey="count" fill={colors.primary} radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {['Peak Usage', 'Avg Latency', 'Success Rate'].map((m) => (
                  <div key={m} className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-outline mb-1">{m}</p>
                    <p className="text-lg font-black text-on-surface">Optimal</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {showHelp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: 50 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">live_help</span>
                </div>
                <h3 className="text-2xl font-bold font-headline tracking-tight">Sruvo Analytics Support</h3>
              </div>
              <div className="space-y-6">
                <p className="text-on-surface-variant leading-relaxed">Need help understanding your data? Our dedicated support team is available 24/7 to guide you through your growth metrics.</p>
                <div className="space-y-3">
                  {['Documentation', 'Community Discord', 'Contact Support'].map((link) => (
                    <button 
                      key={link} 
                      onClick={() => setToast(`Opening ${link}...`)}
                      className="w-full text-left p-4 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl flex items-center justify-between group"
                    >
                      <span className="font-bold">{link}</span>
                      <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setShowHelp(false)}
                className="w-full mt-10 py-4 bg-on-surface text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}

        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] px-6 py-3 bg-slate-900 text-white rounded-full font-bold shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <span className="material-symbols-outlined text-[#2ED3B7]">check_circle</span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
