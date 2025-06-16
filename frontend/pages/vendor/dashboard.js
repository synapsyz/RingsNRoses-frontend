// /components/StatsGrid.js
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Chart component from react-apexcharts,
// and disable server-side rendering (ssr) for it.
// This is the key to fixing the "window is not defined" error.
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// This is a functional React component written in plain JavaScript.
const StatsGrid = () => {
  // A generic function to create chart options to reduce repetition.
  const createChartOptions = (data, colors) => ({
    series: [{
      name: 'Value', // A generic name for the series
      data: data
    }],
    chart: {
      height: 60, // Adjusted height for the new layout
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    colors: colors,
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => '' // Hide the series name in the tooltip
        }
      },
      marker: {
        show: false
      }
    }
  });

  // --- Chart Configurations for the new UI ---
  const openDealsChartOptions = createChartOptions([350, 380, 410, 390, 420, 450, 482], ['#22c55e']); // Green for upward trend
  const untouchedDealsChartOptions = createChartOptions([550, 560, 580, 570, 600, 620, 639], ['#22c55e']); // Green for upward trend
  const callsTodayChartOptions = createChartOptions([45, 42, 40, 39, 38, 37, 36], ['#ef4444']); // Red for downward trend
  const leadsChartOptions = createChartOptions([510, 510, 510, 510, 510, 510, 510], ['#6b7280']); // Gray for no change


  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5">
      {/* Card: Open deals */}
      <div className="flex flex-col p-5 bg-white border border-gray-200 shadow-xs rounded-2xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="space-y-4">
          <h2 className="text-xs uppercase text-gray-500 dark:text-neutral-400">
            Open deals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
            <div className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">482
            </div>
            {/* Apex Line Chart */}
            <div className="h-full">
              <Chart options={openDealsChartOptions} series={openDealsChartOptions.series} type="line" height="100%" />
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-400">
              <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              37.3%
            </span>
            <p className="text-xs text-gray-500 dark:text-neutral-400">
              up from 142
            </p>
          </div>
        </div>
      </div>

      {/* Card: Untouched deals */}
      <div className="flex flex-col p-5 bg-white border border-gray-200 shadow-xs rounded-2xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="space-y-4">
          <h2 className="text-xs uppercase text-gray-500 dark:text-neutral-400">
            Untouched deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
            <div className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">639
            </div>
            {/* Apex Line Chart */}
            <div className="h-full">
               <Chart options={untouchedDealsChartOptions} series={untouchedDealsChartOptions.series} type="line" height="100%" />
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-400">
              <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              14.5%
            </span>
            <p className="text-xs text-gray-500 dark:text-neutral-400">
              up from 503
            </p>
          </div>
        </div>
      </div>

      {/* Card: Calls today */}
      <div className="flex flex-col p-5 bg-white border border-gray-200 shadow-xs rounded-2xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="space-y-4">
          <h2 className="text-xs uppercase text-gray-500 dark:text-neutral-400">
            Calls today
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
            <div className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">36
            </div>
            {/* Apex Line Chart */}
            <div className="h-full">
              <Chart options={callsTodayChartOptions} series={callsTodayChartOptions.series} type="line" height="100%" />
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-400">
              <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
              4.1%
            </span>
            <p className="text-xs text-gray-500 dark:text-neutral-400">
              down from 39
            </p>
          </div>
        </div>
      </div>

      {/* Card: Leads */}
      <div className="flex flex-col p-5 bg-white border border-gray-200 shadow-xs rounded-2xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="space-y-4">
          <h2 className="text-xs uppercase text-gray-500 dark:text-neutral-400">
            Leads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
            <div className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">510
            </div>
            {/* Apex Line Chart */}
            <div className="h-full">
               <Chart options={leadsChartOptions} series={leadsChartOptions.series} type="line" height="100%" />
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-400">
              0.0%
            </span>
            <p className="text-xs text-gray-500 dark:text-neutral-400">
              510
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
