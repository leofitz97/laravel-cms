import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  labels: string[];
  series: {name: string, data: number[]}[];
}

export default function AnalyticsChart({ labels, series }: Props) {
  const options = {
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    xaxis: { categories: labels },
  };
  return <ReactApexChart options={options} series={series} type="line" height={320} />;
}
