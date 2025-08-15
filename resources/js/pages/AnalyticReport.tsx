import AnalyticsChart from '@/components/analyticChart';
import Charts from '@/components/chart';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Page Analytics',
    href: ''
  },
];



export default function AnalyticsReports() {
  const { analytic } = usePage<SharedData>().props;
  // const { title, report } = analytic;

  // const chartLabels = pageAnalytic.report.daily.map((d) => d.day);
  // const chartSeries = [
  //   { name: "Views", data: pageAnalytic.report.daily.map((d) => d.views) }
  // ];

  breadcrumbs[0].href = `/dashboard/page/${analytic.id}/analytics`;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className='p-6 space-y-8'>
        <h2 className="text-lg font-semibold mb-3">
          {analytic.title} Views (last 30 days)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['daily', 'weekly', 'monthly'] as const).map(period => (
              <div key={period} className="bg-white p-4 rounded shadow">
                  <h2 className="text-lg font-semibold capitalize">{period}</h2>
                  <p>Total Views: {analytic.stats[period].total}</p>
                  <p>Unique Visitors: {analytic.stats[period].unique}</p>
                  <Charts data={analytic.stats[period].chart} />
              </div>
          ))}
      </div>

      </div>
    </AppLayout>
  );
}
