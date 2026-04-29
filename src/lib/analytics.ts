/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Sruvo Analytics Service
// Tracks visitors, sessions, and events using localStorage fallback.

export interface Visit {
  sessionId: string;
  visitorId: string;
  path: string;
  referrer: string;
  timestamp: number;
  duration: number; // seconds
  device: 'Mobile' | 'Tablet' | 'Desktop';
  browser: string;
  source: string;
  isNewVisitor: boolean;
}

export interface SignupEvent {
  email: string;
  timestamp: number;
  source: string;
  path: string;
  device: 'Mobile' | 'Tablet' | 'Desktop';
  browser?: string;
  country?: string;
}

const STORAGE_KEY_VISITS = 'sruvo_analytics_visits';
const STORAGE_KEY_SIGNUPS = 'sruvo_analytics_signups';
const STORAGE_KEY_VISITOR_ID = 'sruvo_visitor_id';

class AnalyticsService {
  private sessionId: string;
  private visitorId: string;
  private currentPath: string = window.location.pathname;
  private lastHeartbeat: number = Date.now();
  private visitsCache: Visit[] | null = null;
  private signupsCache: SignupEvent[] | null = null;

  constructor() {
    this.sessionId = Math.random().toString(36).substring(2, 15);
    this.visitorId = this.getOrCreateVisitorId();
    this.initHeartbeat();
    this.setupStorageListener();
  }

  private setupStorageListener() {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY_VISITS) this.visitsCache = null;
      if (e.key === STORAGE_KEY_SIGNUPS) this.signupsCache = null;
    });
  }

  private getOrCreateVisitorId(): string {
    let id = localStorage.getItem(STORAGE_KEY_VISITOR_ID);
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem(STORAGE_KEY_VISITOR_ID, id);
    }
    return id;
  }

  private getDeviceType(): 'Mobile' | 'Tablet' | 'Desktop' {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'Mobile';
    return 'Desktop';
  }

  private getBrowser(): string {
    const ua = navigator.userAgent;
    if (ua.indexOf("Chrome") > -1) return "Chrome";
    if (ua.indexOf("Safari") > -1) return "Safari";
    if (ua.indexOf("Firefox") > -1) return "Firefox";
    if (ua.indexOf("Edge") > -1) return "Edge";
    return "Other";
  }

  private getSource(): string {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    if (utmSource) return utmSource.charAt(0).toUpperCase() + utmSource.slice(1);

    const ref = document.referrer;
    if (!ref) return 'Direct';
    if (ref.includes('google.com')) return 'Google';
    if (ref.includes('instagram.com')) return 'Instagram';
    if (ref.includes('t.co') || ref.includes('twitter.com') || ref.includes('x.com')) return 'X / Twitter';
    if (ref.includes('linkedin.com')) return 'LinkedIn';
    if (ref.includes('facebook.com')) return 'Facebook';
    return 'Referral';
  }

  public trackPageView(path: string) {
    this.currentPath = path;
    if (path === '/traffic') return;

    const visits = this.getVisits();
    const isNewVisitor = !visits.some(v => v.visitorId === this.visitorId);

    const newVisit: Visit = {
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      path: path,
      referrer: document.referrer,
      timestamp: Date.now(),
      duration: 0,
      device: this.getDeviceType(),
      browser: this.getBrowser(),
      source: this.getSource(),
      isNewVisitor
    };

    visits.push(newVisit);
    this.saveVisits(visits);
    this.lastHeartbeat = Date.now();
  }

  public trackSignup(email: string) {
    const signups = this.getSignups();
    const event: SignupEvent = {
      email,
      timestamp: Date.now(),
      source: this.getSource(),
      path: this.currentPath,
      device: this.getDeviceType(),
      browser: this.getBrowser()
    };
    signups.push(event);
    this.saveSignups(signups);
  }

  private initHeartbeat() {
    setInterval(() => {
      const visits = this.getVisits();
      const currentVisit = visits.find(v => v.sessionId === this.sessionId && v.path === this.currentPath);
      if (currentVisit) {
        const now = Date.now();
        const diff = Math.floor((now - this.lastHeartbeat) / 1000);
        if (diff > 0) {
          currentVisit.duration += diff;
          this.saveVisits(visits);
          this.lastHeartbeat = now;
        }
      }
    }, 15000); // 15s heartbeat
  }

  public getVisits(): Visit[] {
    const data = localStorage.getItem(STORAGE_KEY_VISITS);
    const visits = data ? JSON.parse(data) : [];
    this.visitsCache = visits;
    return visits;
  }

  private saveVisits(visits: Visit[]) {
    // Keep only last 1000 to avoid storage issues
    if (visits.length > 1000) visits = visits.slice(-1000);
    this.visitsCache = visits;
    localStorage.setItem(STORAGE_KEY_VISITS, JSON.stringify(visits));
  }

  public getSignups(): SignupEvent[] {
    const data = localStorage.getItem(STORAGE_KEY_SIGNUPS);
    const signups = data ? JSON.parse(data) : [];
    this.signupsCache = signups;
    return signups;
  }

  private saveSignups(signups: SignupEvent[]) {
    this.signupsCache = signups;
    localStorage.setItem(STORAGE_KEY_SIGNUPS, JSON.stringify(signups));
  }

  public getLiveVisitors(): number {
    const now = Date.now();
    const fifteenMinutesAgo = now - (15 * 60 * 1000);
    const visits = this.getVisits();
    // Unique sessionIds active in the last 15 minutes
    const activeSessions = new Set(
      visits
        .filter(v => v.timestamp > fifteenMinutesAgo)
        .map(v => v.sessionId)
    );
    return activeSessions.size;
  }
}

export const analytics = new AnalyticsService();
