/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { analytics, Visit, SignupEvent } from '../lib/analytics';
import { supabase } from '../lib/supabase';

export type TimeFilter = 'Today' | '7D' | '30D' | 'Custom';

export function useAnalyticsData(filter: TimeFilter = '30D', customRange?: { start: string; end: string }) {
  const [data, setData] = useState<{
    visits: Visit[];
    signups: SignupEvent[];
    supabaseSignups: any[];
    liveVisitors: number;
  }>({
    visits: [],
    signups: [],
    supabaseSignups: [],
    liveVisitors: 0
  });

  useEffect(() => {
    const load = async () => {
      const localVisits = analytics.getVisits();
      const localSignups = analytics.getSignups();
      const live = analytics.getLiveVisitors();

      let dbSignups: any[] = [];
      try {
        const { data: signupsFromDb, error } = await supabase
          .from('early_access')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.warn('Supabase fetch error:', error.message);
        }

        if (signupsFromDb && signupsFromDb.length > 0) {
          dbSignups = signupsFromDb.map(s => ({
            email: s.email || 'unknown@sruvo.com',
            timestamp: s.created_at ? new Date(s.created_at).getTime() : Date.now(),
            source: 'Database', 
            path: '/early-access',
            device: 'Desktop',
            browser: 'Chrome',
            country: s.city || 'India'
          }));
        }
      } catch (err) {
        console.error('Failed to fetch from Supabase:', err);
      }

      setData({
        visits: localVisits,
        signups: localSignups,
        supabaseSignups: dbSignups,
        liveVisitors: live
      });
    };

    load();
    const interval = setInterval(load, 5000); // refresh every 5s
    
    window.addEventListener('storage', load);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', load);
    };
  }, []);

  const filteredData = useMemo(() => {
    const now = Date.now();
    let startTime = 0;
    let endTime = now;

    switch (filter) {
      case 'Today':
        startTime = new Date().setHours(0, 0, 0, 0);
        break;
      case '7D':
        startTime = now - (7 * 24 * 60 * 60 * 1000);
        break;
      case 'Custom':
        if (customRange?.start) startTime = new Date(customRange.start).getTime();
        if (customRange?.end) endTime = new Date(customRange.end).getTime();
        break;
      case '30D':
      default:
        startTime = now - (30 * 24 * 60 * 60 * 1000);
        break;
    }

    const filteredVisits = data.visits.filter(v => v.timestamp >= startTime && v.timestamp <= endTime);
    
    // Merge local signups with supabase signups, avoiding duplicates by email
    const allSignupsMap = new Map<string, SignupEvent>();
    
    // Add local first
    data.signups.forEach(s => {
      allSignupsMap.set(s.email, s);
    });
    
    // Overwrite/Add with database ones (more reliable)
    data.supabaseSignups.forEach(s => {
      allSignupsMap.set(s.email, s);
    });

    const allSignups = Array.from(allSignupsMap.values());
    const filteredSignups = allSignups.filter(s => s.timestamp >= startTime && s.timestamp <= endTime);

    // Grouping for charts
    const dailyMap = new Map<string, number>();
    const dateCache = new Map<number, string>();

    filteredVisits.forEach(v => {
      // Use date cache to avoid expensive toLocaleDateString called repeatedly for same day
      const dayStart = new Date(v.timestamp).setHours(0, 0, 0, 0);
      let date = dateCache.get(dayStart);
      if (!date) {
        date = new Date(dayStart).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        dateCache.set(dayStart, date);
      }
      dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
    });

    const visitorTrends = Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Source Distribution
    const sourceMap = new Map<string, number>();
    filteredVisits.forEach(v => {
      sourceMap.set(v.source, (sourceMap.get(v.source) || 0) + 1);
    });
    const trafficSources = Array.from(sourceMap.entries()).map(([name, value]) => ({ name, value }));

    // Page Performance
    const pageMap = new Map<string, number>();
    filteredVisits.forEach(v => {
      pageMap.set(v.path, (pageMap.get(v.path) || 0) + 1);
    });
    const pagePerformance = Array.from(pageMap.entries())
      .map(([name, val]) => ({ name, val }))
      .sort((a, b) => b.val - a.val);

    // Stats
    const totalVisitors = filteredVisits.length;
    const uniqueVisitors = new Set(filteredVisits.map(v => v.visitorId)).size;
    const totalSignups = filteredSignups.length;
    const conversionRate = totalVisitors > 0 ? (totalSignups / totalVisitors) * 100 : 0;
    
    // Avg Session Duration
    const totalDuration = filteredVisits.reduce((acc, v) => acc + v.duration, 0);
    const avgDuration = totalVisitors > 0 ? totalDuration / totalVisitors : 0;

    // Bounce Rate (one page view sessions)
    const sessions = new Map<string, string[]>();
    filteredVisits.forEach(v => {
      if (!sessions.has(v.sessionId)) sessions.set(v.sessionId, []);
      sessions.get(v.sessionId)!.push(v.path);
    });
    const singlePageSessions = Array.from(sessions.values()).filter(paths => paths.length === 1).length;
    const bounceRate = sessions.size > 0 ? (singlePageSessions / sessions.size) * 100 : 0;

    return {
      stats: {
        totalVisitors,
        uniqueVisitors,
        totalSignups,
        conversionRate,
        avgDuration,
        bounceRate,
        liveVisitors: data.liveVisitors
      },
      visitorTrends,
      trafficSources,
      pagePerformance,
      recentSignups: filteredSignups.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5)
    };
  }, [data, filter]);

  return filteredData;
}
