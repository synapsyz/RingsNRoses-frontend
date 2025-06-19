import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// --- UPDATED DATA ---
// Each chart now has two series: "This month" and "Last month".
const summaryData = [
  {
    id: 1,
    title: 'Call Request',
    mainValue: '21k',
    changePercentage: '35.8%',
    changeType: 'increase',
    subtext: '21k calls',
    series: [
      { name: 'This month', data: [50, 45, 30, 45, 90, 30, 10] },
      { name: 'Last month', data: [22, 80, 10, 90, 28, 75, 38] }
    ],
    colors: ['#22c55e', '#a8a29e'] // green-500, stone-400
  },
  {
    id: 2,
    title: 'Visitors',
    mainValue: '85,321',
    changePercentage: '18%',
    changeType: 'decrease',
    subtext: '120k sessions',
    series: [
      { name: 'This month', data: [50, 40, 45, 30, 55, 40, 35] },
      { name: 'Last month', data: [55, 48, 50, 38, 60, 44, 40] }
    ],
    colors: ['#3b82f6', '#a8a29e'] // blue-500, stone-400
  },
  {
    id: 3,
    title: 'Quote Request',
    mainValue: '21,503',
    changePercentage: '4.7%',
    changeType: 'increase',
    subtext: 'vs. last month',
    series: [
      { name: 'This month', data: [20, 30, 25, 40, 35, 50, 45] },
      { name: 'Last month', data: [18, 28, 22, 37, 33, 48, 42] }
    ],
    colors: ['#8b5cf6', '#a8a29e'] // violet-500, stone-400
  },
  {
    id: 4,
    title: 'Total Search',
    mainValue: '2,780.00',
    changePercentage: '11%',
    changeType: 'increase',
    subtext: '150 search',
    series: [
      { name: 'This month', data: [10, 15, 5, 20, 15, 25, 20] },
      { name: 'Last month', data: [8, 12, 4, 18, 12, 22, 18] }
    ],
    colors: ['#f97316', '#a8a29e'] // orange-500, stone-400
  }
];

// --- Reusable LineChartCard Sub-Component ---
const LineChartCard = ({ data, theme }) => {
  const chartOptions = useMemo(() => ({
    chart: {
      type: 'line',
      height: 60,
      sparkline: { enabled: true },
    },
    // --- UPDATED STROKE ---
    // This makes the first line solid and the second line dashed.
    stroke: {
      width: [2, 2],
      curve: 'smooth',
      dashArray: [0, 5] // 0 for solid, 5 for dashed
    },
    colors: data.colors,
    tooltip: {
      theme: theme,
      x: { show: false },
      y: {
        formatter: function (value, { seriesIndex }) {
          // Show value with series name
          return `${data.series[seriesIndex].name}: ${value}`;
        }
      },
      marker: { show: true }
    },
  }), [data.colors, data.series, theme]);

  return (
    <div className="p-5 mt-10 flex flex-col bg-white border border-stone-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">{data.title}</h2>
      <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
        <div>
          <h4 className="text-lg text-stone-800 dark:text-neutral-200">
            {data.mainValue}
            <span className={`inline-flex items-center gap-x-1 text-sm ${data.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
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
          <span className="size-2.5 inline-block rounded-sm me-2" style={{ backgroundColor: data.colors[0] }}></span>
          <span className="text-[13px] text-stone-600 dark:text-neutral-400">This month</span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block rounded-sm me-2" style={{ backgroundColor: data.colors[1] }}></span>
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
    if (document.documentElement.classList.contains('dark')) setTheme('dark');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') setTheme(mutation.target.classList.contains('dark') ? 'dark' : 'light');
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    // --- UPDATED GRID LAYOUT ---
    // Changed lg:grid-cols-4 to lg:grid-cols-2 to create a 2x2 grid on large screens.
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-3 lg:gap-5">
      {summaryData.map(data => (
        <LineChartCard key={data.id} data={data} theme={theme} />
      ))}
    </div>
  );
};

export default SummaryCharts;