import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    pages: Page[],
    page: Page,
    stats: {
        totalPages: number;
        publishedPages: number;
        draftPages: number;
    };
    chartLabels: string[],
    chartSeries: {name: string, data: number[]}[],
    // pageAnalytic : {
    //     report: AnalyticsPoint[]
    //     id: string,
    //     title: string
    // };
    analytic : {
        stats: {
            daily: AnalyticsData;
            weekly: AnalyticsData;
            monthly: AnalyticsData;
        }
        id: string,
        title: string
    };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}
type AnalyticsPoint = {
    date: string;
    views: number;
    unique_views: number;
}
export type AnalyticsData = {
    total: number;
    unique: number;
    chart: { date: string; views: number; unique_views: number }[];
}

export interface Theme {
//   id?: number;
  key: string;
  name: string;
  vars: Record<string,string>;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PageSection {
  id: number;
  page_id:? number;
  section_type: 'header' | 'body' | 'footer' | 'custom';
  heading: string,
  content: string;            // sanitized HTML string (server sanitizes)
  order: number;
}

export interface Page {
    id: number;
    client_id: number;
    title?: string;
    slug: string;
    is_published: boolean;
    published_at?: string | null;
    meta?: Record<string, any>;
    theme?: string | null;
    settings?: Record<string, any>;
    body?: string | null;
    background_path?: string | null;
    logo_path?: string | null;
    sections: PageSection[];
}
