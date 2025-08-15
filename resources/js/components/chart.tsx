// resources/js/Components/Chart .tsx
import Chart from 'react-apexcharts';

interface Props {
    data: { date: string; views: number; unique_views: number }[];
}

export default function Charts ({ data }: Props) {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'line',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: data.map(d => d.date),
            title: { text: 'Date' }
        },
        yaxis: {
            title: { text: 'Count' },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        colors: ['#4FD1C5', '#805AD5'],
        legend: {
            position: 'top',
            horizontalAlign: 'right'
        }
    };

    const series = [
        {
            name: 'Views',
            data: data.map(d => d.views)
        },
        {
            name: 'Unique Visitors',
            data: data.map(d => d.unique_views)
        }
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="line"
            height={300}
        />
    );
}
