import AnalyticsChart from '@/components/analyticChart';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Page, SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageItem {
  id: number;
  title: string;
  slug: string;
  theme: string | null;
  published_at: string | null;
  sections_count: number;
}

interface DashboardProps {
  stats: {
    totalPages: number;
    publishedPages: number;
    draftPages: number;
  };
  pages: PageItem[];
}


export default function Dashboard()  {
  const { stats, chartLabels, chartSeries } = usePage<SharedData>().props;
    // const [chartLabels, setChartLabels] = useState<string[]>([]);
    // const [chartSeries, setChartSeries] = useState<number[]>([]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">Total pages: {pages.length}</div>
                <div className="bg-white p-4 rounded shadow">Quick stats</div>
                <div className="bg-white p-4 rounded shadow">Actions</div>
            </div> */}
            <div className="p-6 space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow text-center">
                <h2 className="text-xl font-bold">{stats.totalPages}</h2>
                <p className="text-gray-500">Total Pages</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
                <h2 className="text-xl font-bold text-green-600">
                {stats.publishedPages}
                </h2>
                <p className="text-gray-500">Published</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
                <h2 className="text-xl font-bold text-yellow-500">
                {stats.draftPages}
                </h2>
                <p className="text-gray-500">Drafts</p>
            </div>
            </div>

            {/* Recent Pages Table */}
            {/* <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Pages</h3>
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-2">Title</th>
                    <th className="p-2">Theme</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {pages.length > 0 ? (
                    pages.map((page) => (
                    <tr key={page.id} className="border-t">
                        <td className="p-2">{page.title}</td>
                        <td className="p-2">{page.theme ?? "-"}</td>
                        <td className="p-2">
                        {page.published_at ? (
                            <span className="text-green-600">Published</span>
                        ) : (
                            <span className="text-yellow-600">Draft</span>
                        )}
                        </td>
                        <td className="p-2 space-x-2">
                        <Link
                            href={`/pages/${page.id}/edit`}
                            className="text-blue-500 hover:underline"
                        >
                            Edit
                        </Link>
                        <Link
                            href={`/pages/${page.slug}`}
                            className="text-gray-500 hover:underline"
                        >
                            View
                        </Link>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td className="p-4 text-center text-gray-500" colSpan={5}>
                        No pages yet.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div> */}
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-3">Views (last 30 days)</h2>
                <AnalyticsChart labels={chartLabels} series={chartSeries} />
            </div>
        </AppLayout>
    );
}
