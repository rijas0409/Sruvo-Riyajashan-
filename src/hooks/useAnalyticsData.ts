/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { analytics, Visit, SignupEvent } from '../lib/analytics';

export type TimeFilter = 'Today' | '7D' | '30D' | 'Custom';

export function useAnalyticsData(filter: TimeFilter = '30D') {
  const [data, setData] = useState<{
    visits: Visit[];
    signups: SignupEvent[];
    liveVisitors: number;
  }>({
    visits: [],
    signups: [],
    liveVisitors: 0
  });

  useEffect(() => {
    const load = () => {
      setData({
        visits: analytics.getVisits(),
        signups: analytics.getSignups(),
        liveVisitors: analytics.getLiveVisitors()
      });
    };

    load();
    const interval = setInterval(load, 2000); // refresh every 2s for dashboard feel
    
    // Listen for storage changes from other tabs
    window.addEventListener('storage', load);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', load);
    };
  }, []);

  const filteredData = useMemo(() => {
    const now = Date.now();
    let startTime = 0;

    switch (filter) {
      case 'Today':
        startTime = new Date().setHours(0, 0, 0, 0);
        break;
      case '7D':
        startTime = now - (7 * 24 * 60 * 60 * 1000);
        break;
      case '30D':
      default:
        startTime = now - (30 * 24 * 60 * 60 * 1000);
        break;
    }

    const filteredVisits = data.visits.filter(v => v.timestamp >= startTime);
    const filteredSignups = data.signups.filter(s => s.timestamp >= startTime);

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
