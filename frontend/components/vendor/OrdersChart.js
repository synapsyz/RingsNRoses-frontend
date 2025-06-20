import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';

// --- Dynamic Imports ---
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// --- Master Data Source ---
// This is our complete dataset. We'll filter this based on the date picker.
const masterChartData = {
  categories: [
    '2024-01-15T00:00:00.000Z', '2024-02-15T00:00:00.000Z', '2024-03-15T00:00:00.000Z',
    '2024-04-15T00:00:00.000Z', '2024-05-15T00:00:00.000Z', '2024-06-15T00:00:00.000Z',
    '2024-07-15T00:00:00.000Z', '2024-08-15T00:00:00.000Z', '2024-09-15T00:00:00.000Z',
    '2024-10-15T00:00:00.000Z', '2024-11-15T00:00:00.000Z', '2024-12-15T00:00:00.000Z',
  ],
  series: [
    { name: 'Profile Views', data: [51, 40, 68, 51, 42, 109, 100, 110, 91, 45, 65, 72] },
    { name: 'Quote Request', data: [31, 32, 85, 42, 34, 52, 41, 55, 75, 58, 53, 41] },
  ]
};

const OrdersChart = () => {
  // --- STATE MANAGEMENT ---
  // State for the date range picker
  const [dateRange, setDateRange] = useState([new Date('2024-06-01'), new Date('2024-08-31')]);
  const [startDate, endDate] = dateRange;

  // State to hold the currently visible (filtered) chart data
  const [filteredData, setFilteredData] = useState({ series: [], categories: [] });

  // --- DATA FILTERING ---
  // This effect runs whenever the dateRange changes
  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(masterChartData); // Show all data if range is incomplete
      return;
    }

    const filteredCategories = [];
    const ProfileViewsData = [];
    const QuoteRequest = [];

    masterChartData.categories.forEach((category, index) => {
      const categoryDate = new Date(category);
      if (categoryDate >= startDate && categoryDate <= endDate) {
        filteredCategories.push(category);
        ProfileViewsData.push(masterChartData.series[0].data[index]);
        QuoteRequest.push(masterChartData.series[1].data[index]);
      }
    });

    setFilteredData({
      categories: filteredCategories,
      series: [
        { name: 'Profile Views', data: ProfileViewsData },
        { name: 'Quote Request', data: QuoteRequest }
      ]
    });
  }, [dateRange]);

  // --- CHART OPTIONS ---
  const chartOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      height: 300,
      stacked: false, // Set to false for a grouped bar chart
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#06b6d4', '#8b5cf6'], // A nice teal and purple
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%', // Adjust width for grouped bars
        borderRadius: 4,
      },
    },
    title: {
      text: 'Monthly Insights',
      align: 'left',
      style: { fontSize: '16px', fontWeight: '600' },
    },
    xaxis: {
      type: 'datetime',
      categories: filteredData.categories, // Use filtered categories
      labels: { style: { fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { formatter: (value) => `${value}k` },
    },
    legend: { show: true, position: 'top', horizontalAlign: 'right' },
    dataLabels: { enabled: false },
    grid: { strokeDashArray: 4 },
    tooltip: { theme: 'light' },
  }), [filteredData]); // Re-calculate options when filteredData changes

  // Custom Input for the Date Picker to match the UI style
  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} type="button" className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-2xs hover:bg-stone-50">
      {value}
      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
    </button>
  ));
  CustomDateInput.displayName = 'CustomDateInput';


  return (
    <div className="xl:col-span-4 flex flex-col bg-white border border-stone-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <div className="py-3 px-5 flex flex-wrap justify-between items-center gap-2 border-b border-stone-200 dark:border-neutral-700">
        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Orders</h2>
        <div className="flex justify-end items-center gap-x-2">
          
          {/* --- DATE PICKER COMPONENT --- */}
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            dateFormat="d MMM, yyyy"
            customInput={<CustomDateInput />}
          />
          
        </div>
      </div>
      <div className="p-5">
        <Chart
          options={chartOptions}
          series={filteredData.series}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};

export default OrdersChart;