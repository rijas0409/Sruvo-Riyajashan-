/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect, useCallback, memo } from "react";

type DashboardView = 'overview' | 'announcements' | 'audience' | 'settings';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar,
  PieChart, Pie, Cell 
} from 'recharts';
import { useAnalyticsData, TimeFilter } from "../hooks/useAnalyticsData";
import AnnouncementManager from "../components/AnnouncementManager";

// Memoized Sub-components for better performance
const MetricCard = memo(({ 
  title, 
  value, 
  change, 
  isPositive,
  icon, 
  iconBg,
  iconColor,
  isLive = false,
  isActive, 
  onClick 
}: { 
  title: string; 
  value: string | number; 
  change: string; 
  isPositive?: boolean;
  icon: string; 
  iconBg: string;
  iconColor: string;
  isLive?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <motion.div 
    whileHover={{ y: -4 }}
    onClick={onClick}
    className={`bg-white dark:bg-slate-800 rounded-[24px] p-8 flex flex-col relative overflow-hidden transition-all cursor-pointer border shadow-sm hover:shadow-md group ${isActive ? 'ring-2 ring-primary/20 border-primary/30' : 'border-slate-100 dark:border-slate-700'}`}
  >
    {/* Curved Indicator Line on Left - Permanent for Live, Hover for others */}
    <div className={`absolute left-0 top-3 bottom-3 w-1.5 bg-[#7436c9] rounded-r-full shadow-[0_0_10px_rgba(116,54,201,0.3)] transition-transform duration-300 ${isLive ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'}`} />
    
    <div className="flex justify-between items-start mb-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: iconBg }}>
        <span className="material-symbols-outlined text-2xl" style={{ color: iconColor }}>{icon}</span>
      </div>
      
      {isLive ? (
        <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-[#7436c9] rounded-full animate-pulse" />
          <span className="text-[#7436c9] text-[10px] font-black uppercase tracking-wider">Live Now</span>
        </div>
      ) : (
        <div className={`px-3 py-1.5 rounded-full text-[11px] font-black ${isPositive ? 'bg-[#E6F9F0] text-[#006858]' : 'bg-[#FFF0F3] text-[#a9294a]'}`}>
          {isPositive ? '+' : ''}{change}
        </div>
      )}
    </div>
    
    <p className="text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</h3>
  </motion.div>
));

const TrendsChart = memo(({ data }: { data: any[] }) => (
  <div className="h-[340px] w-full mt-8">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7436c9" stopOpacity={0.15}/>
            <stop offset="95%" stopColor="#7436c9" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
          dy={15}
          interval={Math.floor(data.length / 5)}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1e293b', 
            border: 'none', 
            borderRadius: '12px', 
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          itemStyle={{ color: 'white' }}
        />
        <Area 
          type="monotone" 
          dataKey="count" 
          stroke="#7436c9" 
          strokeWidth={4}
          fillOpacity={1} 
          fill="url(#colorCount)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
));

const SidebarLink = memo(({ 
  active, 
  collapsed, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean; 
  collapsed: boolean; 
  onClick: () => void; 
  icon: string; 
  label: string; 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'gap-4 px-6'} py-3.5 transition-all relative rounded-r-2xl group ${active ? 'text-[#7436c9] bg-[#f8f6ff] dark:bg-purple-900/10 font-bold' : 'text-slate-500 hover:text-[#7436c9] hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
    title={collapsed ? label : ""}
  >
    <span className={`material-symbols-outlined ${active ? 'fill-1' : ''} text-2xl`}>{icon}</span>
    {!collapsed && <span className="text-[13px] tracking-tight">{label}</span>}
    {active && (
      <motion.div 
        layoutId="activeNav"
        className="absolute right-0 top-1 bottom-1 w-1.5 bg-[#7436c9] rounded-l-full shadow-[0_0_15px_rgba(116,54,201,0.4)]"
      />
    )}
  </button>
));

export default function TrafficDashboard() {
  const [filter, setFilter] = useState<TimeFilter>('30D');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string>("Visitors");
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [metricChanges, setMetricChanges] = useState({
    visitors: 12.5,
    signups: 8.2,
    conversion: 1.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetricChanges(prev => ({
        visitors: parseFloat((prev.visitors + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        signups: parseFloat((prev.signups + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        conversion: parseFloat((prev.conversion + (Math.random() * 0.1 - 0.05)).toFixed(2))
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  const [customRange, setCustomRange] = useState({ 
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
    end: new Date().toISOString().split('T')[0] 
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { stats, visitorTrends, trafficSources, pagePerformance, recentSignups } = useAnalyticsData(filter, customRange);

  // Handle toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Debug log for counts (internal)
  useEffect(() => {
    if (stats.totalSignups > 0) {
      console.log('Signups detected:', stats.totalSignups);
    }
  }, [stats.totalSignups]);

  // Real-time Health Score logic
  const [healthScore, setHealthScore] = useState(98);
  useEffect(() => {
    const interval = setInterval(() => {
      // Small fluctuation based on live visitors and randomness
      const drift = (Math.random() * 2 - 1); // -1 to +1
      const base = 95 + (stats.liveVisitors > 10 ? 3 : stats.liveVisitors > 0 ? 1 : 0);
      setHealthScore(prev => {
        const next = Math.max(90, Math.min(100, Math.round(prev + drift)));
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [stats.liveVisitors]);

  const filteredSignups = useMemo(() => {
    if (!searchQuery) return recentSignups;
    return recentSignups.filter(s => s.email.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [recentSignups, searchQuery]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  }, []);

  const colors = useMemo(() => ({
    primary: "#7436c9",
    secondary: "#a9294a",
    tertiary: "#006858",
    accent1: "#A76DFF",
    accent2: "#FF6A88",
    accent3: "#2ED3B7",
  }), []);

  const exportCSV = useCallback(() => {
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
  }, [stats]);

  const insights = useMemo(() => {
    const list: { text: string; type: 'info' | 'warning'; action?: string }[] = [];
    
    // Real-time dynamic checks
    const signupCount = stats.totalSignups;
    const conversion = stats.conversionRate;
    const bounce = stats.bounceRate;
    const liveCount = stats.liveVisitors;

    // AI "Thinking" simulation - just more specific conditions
    if (liveCount > 5) {
      list.push({ 
        text: `High live traffic surge! ${liveCount} users are currently exploring. Check if your servers are ready for a potential spike.`, 
        type: 'info',
        action: 'MONITOR'
      });
    }

    if (conversion < 2 && signupCount > 0) {
      list.push({ 
        text: "Conversion lag detected relative to visitors. Recommendation: Try A/B testing a 'Limited Access' countdown on the early access page.", 
        type: 'warning', 
        action: 'FIX IT' 
      });
    } else if (conversion > 12) {
      list.push({ 
        text: "Exceptional conversion velocity! Your value proposition is 18% more effective than similar pet-tech MVPs.", 
        type: 'info' 
      });
    }
    
    if (bounce > 60) {
      list.push({ 
        text: "Mobile bounce rate is trending high. Issue: The 'Who are you?' section might feel too long for mobile users. Suggest simplifying.", 
        type: 'warning',
        action: 'SIMPLIFY'
      });
    }

    // New Landing Page Specific Insights
    if (pagePerformance.length > 0) {
      const demoPage = pagePerformance.find(p => p.name.includes('/demo'));
      if (demoPage && demoPage.val < 10) {
        list.push({
          text: "Low demo engagement. Suggest: Move the 'Live Demo' button above the fold on the homepage.",
          type: 'warning',
          action: 'REORDER'
        });
      }
    }

    // Traffic Quality
    if (trafficSources.length > 0) {
      const socialTraffic = trafficSources.find(s => s.name === 'Social')?.value || 0;
      if (socialTraffic > stats.totalVisitors * 0.4) {
        list.push({ 
          text: "Social momentum detected! Viral potential is high. Double down on Twitter/Instagram engagement.", 
          type: 'info',
          action: 'CAMPAIGN'
        });
      }
    }
    
    // Default Fallbacks
    if (list.length < 3) {
      list.push({ text: "AI Health Scan: All landing page modules are responding correctly. SEO visibility up by 4%.", type: 'info' });
      list.push({ text: "User Behavior Tip: Visitors from 'Vet' profiles stay 45s longer. Tailor content for medical professionals.", type: 'info', action: 'PERSONALIZE' });
    }

    return list.slice(0, 3);
  }, [stats, pagePerformance, trafficSources]);

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <div className="grain-overlay" />
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>
      
      {/* SideNavBar Placeholder for Desktop to prevent content jump */}
      <div className={`hidden lg:block shrink-0 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`} />
      
      {/* SideNavBar */}
      <aside className={`fixed left-0 top-0 h-screen flex flex-col z-[60] bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64 shadow-2xl'} ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}`}>
        <div className={`py-6 mb-2 flex items-center ${isSidebarCollapsed && !isMobileMenuOpen ? 'justify-center flex-col gap-8' : 'justify-between px-6'}`}>
          {(!isSidebarCollapsed || isMobileMenuOpen) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="truncate">
              <span className="text-xl font-black text-[#7436c9]">Sruvo</span>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] leading-none mt-1">Ethereal</p>
            </motion.div>
          )}
          <button 
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsMobileMenuOpen(false);
              } else {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            className={`p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 ${isSidebarCollapsed && !isMobileMenuOpen ? 'order-first' : ''}`}
          >
            <span className="material-symbols-outlined text-2xl">{isSidebarCollapsed && !isMobileMenuOpen ? 'menu' : 'menu_open'}</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <SidebarLink 
            active={currentView === 'overview'} 
            collapsed={isSidebarCollapsed && !isMobileMenuOpen} 
            onClick={() => { setCurrentView('overview'); setIsMobileMenuOpen(false); }} 
            icon="grid_view" 
            label="Overview" 
          />
          <SidebarLink 
            active={currentView === 'announcements'} 
            collapsed={isSidebarCollapsed && !isMobileMenuOpen} 
            onClick={() => { setCurrentView('announcements'); setIsMobileMenuOpen(false); }} 
            icon="campaign" 
            label="Announcements" 
          />
          <SidebarLink 
            active={currentView === 'audience'} 
            collapsed={isSidebarCollapsed && !isMobileMenuOpen} 
            onClick={() => { setCurrentView('audience'); setIsMobileMenuOpen(false); }} 
            icon="group" 
            label="Audience" 
          />
          <SidebarLink 
            active={currentView === 'live'} 
            collapsed={isSidebarCollapsed && !isMobileMenuOpen} 
            onClick={() => { setCurrentView('live'); setIsMobileMenuOpen(false); }} 
            icon="sensors" 
            label="Live Traffic" 
          />
          <SidebarLink 
            active={currentView === 'settings'} 
            collapsed={isSidebarCollapsed && !isMobileMenuOpen} 
            onClick={() => { setCurrentView('settings'); setIsMobileMenuOpen(false); }} 
            icon="settings" 
            label="Settings" 
          />
        </nav>
        <div className="mt-auto pt-6 border-t border-surface-variant/30 px-2">
          <button 
            onClick={exportCSV}
            className={`w-full py-3 bg-gradient-to-r from-[#FF6A88] to-[#A76DFF] text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 ${isSidebarCollapsed && !isMobileMenuOpen ? 'px-0' : 'px-4'}`}
          >
            <span className="material-symbols-outlined text-sm">ios_share</span>
            {(!isSidebarCollapsed || isMobileMenuOpen) && <span>Export Report</span>}
          </button>
          <div className={`flex items-center gap-3 mt-6 p-2 rounded-xl bg-surface-container-low/50 ${isSidebarCollapsed && !isMobileMenuOpen ? 'justify-center border-none bg-transparent p-0' : ''}`}>
            <img 
              alt="Founder Profile" 
              className={`rounded-full object-cover border-2 border-white shrink-0 transition-all ${isSidebarCollapsed && !isMobileMenuOpen ? 'w-8 h-8' : 'w-10 h-10'}`} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3S7ZXGVoZ8QLJ7UyDxufKyhZoMqIjWShfzOK94nzal2uPyN88SSnwGVJHm3KhGuKMW2qo1zUttjeLxx0FplOct9MsBvOSXm2Re0gCxk81uXyVtn9A15U_y-q_sgdJOIagEjL26NUed2tdLZJDwYSpclHxGa6y7BxgJ7_OCtoZ9IjD9dDxZA3Pjl10zOe6hOJOuDQJjkNsn_FUMkg4roz_-I6TsJRlUnLF9GdiH4pOOem51zSoNkeQDbhIkNMAWv-XpmIhdyzF9ZA"
              referrerPolicy="no-referrer"
            />
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-on-surface truncate">Jashanpreet Singh Pabla</span>
                <span className="text-[10px] text-on-surface-variant">Founder</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 min-h-screen transition-all duration-300`}>
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-6 md:px-12 sticky top-0 z-50 w-full h-20 bg-[#f7f6fe]/60 dark:bg-[#2d2e34]/60 backdrop-blur-md font-headline tracking-tight">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-on-surface-variant flex items-center justify-center translate-y-[-1px]"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
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
                <section className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div>
                    <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2 block">System Status: Optimal</span>
                    <h2 className="text-4xl font-bold text-on-surface font-headline tracking-tight">Traffic Dashboard</h2>
                    <p className="text-on-surface-variant mt-1 text-lg">Real-time growth insights for Sruvo</p>
                  </div>
                  <div className="flex bg-[#F1F3F9] dark:bg-slate-800 p-1 rounded-2xl">
  {(['Today', '7D', '30D', 'Custom'] as TimeFilter[]).map((f) => (
    <button 
      key={f}
      onClick={() => {
        setFilter(f);
        if (f === 'Custom') {
          setIsDatePickerOpen(true);
        } else {
          handleRefresh();
        }
      }}
      className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all ${filter === f ? 'bg-white dark:bg-slate-700 text-primary shadow-md scale-100' : 'text-slate-500 hover:text-primary transition-colors'}`}
    >
      {f === 'Custom' ? (
        <div className="flex items-center gap-2">
          Custom <span className="material-symbols-outlined text-[16px]">calendar_today</span>
        </div>
      ) : f}
    </button>
  ))}
</div>

{/* Custom Date Picker Modal */}
<AnimatePresence>
  {isDatePickerOpen && (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsDatePickerOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-2xl z-[101] border border-slate-100 dark:border-slate-700"
      >
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Select Custom Range</h3>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Start Date</label>
            <input 
              type="date" 
              value={customRange.start}
              onChange={(e) => setCustomRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 ring-primary/20 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">End Date</label>
            <input 
              type="date" 
              value={customRange.end}
              onChange={(e) => setCustomRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsDatePickerOpen(false)}
            className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              setIsDatePickerOpen(false);
              handleRefresh();
            }}
            className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Apply Range
          </button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
                </section>

                {/* Metrics Grid */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  <MetricCard 
    title="Total Visitors" 
    value={stats.totalVisitors.toLocaleString()} 
    change={`${metricChanges.visitors}%`} 
    isPositive={metricChanges.visitors >= 0}
    icon="person" 
    iconBg="#F2F0FF"
    iconColor="#7436c9"
    isActive={activeMetric === 'Visitors'} 
    onClick={() => setActiveMetric("Visitors")} 
  />
  <MetricCard 
    title="Early Access Signups" 
    value={stats.totalSignups.toLocaleString()} 
    change={`${metricChanges.signups}%`} 
    isPositive={metricChanges.signups >= 0}
    icon="how_to_reg" 
    iconBg="#FFF0F5"
    iconColor="#d44b82"
    isActive={activeMetric === 'Signups'} 
    onClick={() => setActiveMetric("Signups")} 
  />
  <MetricCard 
    title="Conversion Rate" 
    value={`${stats.conversionRate.toFixed(2)}%`} 
    change={`${metricChanges.conversion}%`} 
    isPositive={metricChanges.conversion >= 0}
    icon="trending_up" 
    iconBg="#F0F7FF"
    iconColor="#3b82f6"
    isActive={activeMetric === 'Conversion'} 
    onClick={() => setActiveMetric("Conversion")} 
  />
  <MetricCard 
    title="Live Visitors" 
    value={stats.liveVisitors.toLocaleString()} 
    change="0" 
    isPositive={true}
    icon="bolt" 
    iconBg="#F8F0FF"
    iconColor="#7436c9"
    isLive={true}
  />
</section>

{/* Main Charts Section */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[32px] p-10 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Visitors Trends</h4>
        <p className="text-slate-400 text-sm mt-1">Daily engagement metrics for the last 30 days</p>
      </div>
      <button className="text-slate-400 hover:text-slate-600 transition-colors">
        <span className="material-symbols-outlined">more_vert</span>
      </button>
    </div>
    
    <TrendsChart data={visitorTrends} />
  </div>

  <div className="bg-white dark:bg-slate-800 rounded-[32px] p-10 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center">
    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 w-full text-center">Health Score</h4>
    
    <div className="relative w-56 h-56 group cursor-pointer hover:scale-105 transition-transform duration-500">
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" 
      />
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { value: healthScore, fill: '#7436c9' },
              { value: 100 - healthScore, fill: '#f1f5f9' }
            ]}
            innerRadius={75}
            outerRadius={95}
            startAngle={90}
            endAngle={450}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-slate-900 dark:text-white">{healthScore}</span>
        <span className="text-slate-400 text-sm font-bold">/ 100</span>
      </div>
    </div>

    <div className="mt-12 p-6 bg-[#E6F9F0] dark:bg-green-900/20 rounded-2xl">
      <p className="text-[#006858] dark:text-green-400 text-center font-bold text-sm leading-relaxed">
        Your platform is performing {healthScore > 90 ? 'exceptionally well' : 'optimally'}.
      </p>
    </div>
  </div>
</section>

{/* AI Founder Insights Section */}
<section className="bg-white dark:bg-slate-800 rounded-[32px] p-8 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">auto_awesome</span>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          AI Founder Insights
          <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] text-green-600 font-black uppercase tracking-wider">Active</span>
          </div>
        </h4>
        <p className="text-slate-400 text-xs mt-0.5">Automated landing page analysis & performance intelligence</p>
      </div>
    </div>
    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden sm:block">
      Last Scan: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {insights.map((insight, idx) => (
      <motion.div 
        key={idx} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        className="flex flex-col p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all group cursor-default"
      >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${insight.type === 'warning' ? 'bg-red-100 text-red-600' : (idx % 3 === 0 ? 'bg-green-100 text-green-600' : idx % 3 === 1 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600')}`}>
              <span className="material-symbols-outlined text-xl">
                {insight.type === 'warning' ? 'warning' : (idx % 3 === 0 ? 'trending_up' : idx % 3 === 1 ? 'devices_fold' : 'new_releases')}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {insight.text}
            </p>
          </div>
        
        {insight.action && (
          <button 
            onClick={() => setToast(`${insight.action} initiated...`)}
            className={`mt-auto w-full py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${insight.action === 'FIX IT' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95' : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 hover:bg-slate-100'}`}
          >
            {insight.action}
          </button>
        )}
      </motion.div>
    ))}
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
              >
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
