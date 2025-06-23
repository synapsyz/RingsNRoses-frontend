import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// --- UPDATED DATA: Now a static object, as if from an API, with 4 weeks of data. ---
// The data generation functions have been removed for clarity.
const summaryData = [
  {
    id: 1,
    title: 'Views',
    mainValue: '85,650',
    changePercentage: '6.5%',
    changeType: 'increase',
    subtext: 'vs. last month',
    series: [
      { name: 'This month', data: [21050, 22100, 19500, 23000] },
      { name: 'Last month', data: [19800, 20500, 18900, 21200] }
    ],
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    colors: ['#3b82f6', '#a8a29e'] // blue-500, stone-400
  },
  {
    id: 2,
    title: 'Quote Requests',
    mainValue: '4,988',
    changePercentage: '3.9%',
    changeType: 'decrease',
    subtext: 'vs. last month',
    series: [
      { name: 'This month', data: [1200, 1350, 1188, 1250] },
      { name: 'Last month', data: [1280, 1400, 1220, 1300] }
    ],
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    colors: ['#8b5cf6', '#a8a29e'] // violet-500, stone-400
  },
  {
    id: 3,
    title: 'Call Requests',
    mainValue: '2,610',
    changePercentage: '11.5%',
    changeType: 'increase',
    subtext: 'vs. last month',
    series: [
      { name: 'This month', data: [620, 700, 580, 710] },
      { name: 'Last month', data: [550, 650, 530, 610] }
    ],
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    colors: ['#22c55e', '#a8a29e'] // green-500, stone-400
  },
  {
    id: 4,
    title: 'Bookings',
    mainValue: '725',
    changePercentage: '8.2%',
    changeType: 'increase',
    subtext: 'vs. last month',
    series: [
      { name: 'This month', data: [180, 200, 165, 180] },
      { name: 'Last month', data: [160, 190, 150, 170] }
    ],
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    colors: ['#f97316', '#a8a29e'] // orange-500, stone-400
  },
];


// --- Reusable LineChartCard Sub-Component ---
const LineChartCard = ({ data, theme }) => {
  const chartOptions = useMemo(() => ({
    chart: {
      type: 'line',
      height: 60,
      sparkline: { enabled: true },
    },
    stroke: {
      width: [2, 2],
      curve: 'smooth',
      dashArray: [0, 5] // Solid for "This month", Dashed for "Last month"
    },
    colors: data.colors,
    tooltip: {
      theme: theme,
      x: { show: true },
      y: {
        formatter: function (value, { seriesIndex }) {
          return `${data.series[seriesIndex].name}: ${value.toLocaleString()}`;
        }
      },
      marker: { show: true }
    },
    xaxis: {
      categories: data.categories,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    }
  }), [data, theme]);

  return (
    <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">{data.title}</h2>
      <div className="mt-2 grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
        <div>
          <h4 className="text-lg font-bold text-stone-800 dark:text-neutral-200">
            {data.mainValue}
            <span className={`inline-flex items-center gap-x-1 text-sm font-medium ${data.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {data.changeType === 'increase' ? (<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>) : (<><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></>)}
              </svg>
              {data.changePercentage}
            </span>
          </h4>
        </div>
        <div className="md:text-end">
          <p className="text-sm text-stone-500 dark:text-neutral-400">{data.subtext}</p>
        </div>
      </div>
      <div className="min-h-[60px] mt-3">
        <Chart options={chartOptions} series={data.series} type="line" height={60} />
      </div>
      <div className="flex justify-center items-center gap-x-4 mt-5">
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block border-2 me-2" style={{ borderColor: data.colors[0], backgroundColor: data.colors[0] }}></span>
          <span className="text-[13px] text-stone-600 dark:text-neutral-400">This month</span>
        </div>
        <div className="inline-flex items-center">
            <span className="w-2.5 h-0.5 inline-block border-2 border-dashed me-2" style={{ borderColor: data.colors[1] }}></span>
          <span className="text-[13px] text-stone-600 dark:text-neutral-400">Last month</span>
        </div>
      </div>
    </div>
  );
};

// --- Main Grid Component ---
const SummaryCharts = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Initial theme check
    if (document.documentElement.classList.contains('dark')) {
        setTheme('dark');
    }
    // Observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setTheme(mutation.target.classList.contains('dark') ? 'dark' : 'light');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
      {summaryData.map(data => (
        <LineChartCard key={data.id} data={data} theme={theme} />
      ))}
    </div>
  );
};

export default SummaryCharts;