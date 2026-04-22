/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AnnouncementPriority = 'Normal' | 'Important' | 'Critical';
export type AnnouncementStyle = 'Info' | 'Success' | 'Warning' | 'Urgent' | 'Premium';
export type AnnouncementStatus = 'Draft' | 'Published';

export interface Announcement {
  id: string;
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
  targetPage: string; // '/', '/features', etc. or 'All'
  priority: AnnouncementPriority;
  style: AnnouncementStyle;
  isSticky: boolean;
  status: AnnouncementStatus;
  startDate?: string;
  endDate?: string;
  createdAt: number;
  // Stats
  views: number;
  closes: number;
  clicks: number;
}

const STORAGE_KEY = 'sruvo_announcements';
const DISMISSED_KEY = 'sruvo_dismissed_announcements';

class AnnouncementService {
  private getAnnouncements(): Announcement[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveAnnouncements(announcements: Announcement[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
  }

  public getAll(): Announcement[] {
    return this.getAnnouncements();
  }

  public getActiveForPage(path: string): Announcement | null {
    const all = this.getAnnouncements();
    const now = Date.now();
    
    const active = all.find(a => {
      if (a.status !== 'Published') return false;
      if (a.targetPage !== 'All' && a.targetPage !== path) return false;
      if (a.startDate && new Date(a.startDate).getTime() > now) return false;
      if (a.endDate && new Date(a.endDate).getTime() < now) return false;
      
      // Check if dismissed
      const dismissed = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');
      if (dismissed.includes(a.id)) return false;
      
      return true;
    });

    return active || null;
  }

  public create(data: Omit<Announcement, 'id' | 'createdAt' | 'views' | 'closes' | 'clicks'>): Announcement {
    const announcements = this.getAnnouncements();
    const newAnnouncement: Announcement = {
      ...data,
      id: 'ann_' + Math.random().toString(36).substring(2, 11),
      createdAt: Date.now(),
      views: 0,
      closes: 0,
      clicks: 0
    };
    announcements.push(newAnnouncement);
    this.saveAnnouncements(announcements);
    return newAnnouncement;
  }

  public update(id: string, updates: Partial<Announcement>) {
    const announcements = this.getAnnouncements();
    const index = announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      announcements[index] = { ...announcements[index], ...updates };
      this.saveAnnouncements(announcements);
    }
  }

  public delete(id: string) {
    const announcements = this.getAnnouncements().filter(a => a.id !== id);
    this.saveAnnouncements(announcements);
  }

  public trackView(id: string) {
    const announcements = this.getAnnouncements();
    const a = announcements.find(a => a.id === id);
    if (a) {
      a.views++;
      this.saveAnnouncements(announcements);
    }
  }

  public trackClick(id: string) {
    const announcements = this.getAnnouncements();
    const a = announcements.find(a => a.id === id);
    if (a) {
      a.clicks++;
      this.saveAnnouncements(announcements);
    }
  }

  public dismiss(id: string) {
    const dismissed = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');
    if (!dismissed.includes(id)) {
      dismissed.push(id);
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed));
    }
    
    const announcements = this.getAnnouncements();
    const a = announcements.find(a => a.id === id);
    if (a) {
      a.closes++;
      this.saveAnnouncements(announcements);
    }
  }
}

export const announcementService = new AnnouncementService();
