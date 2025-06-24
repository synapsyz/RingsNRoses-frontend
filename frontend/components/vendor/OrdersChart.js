import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// --- Dynamic Import for ApexCharts ---
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// --- Monthly Data Source ---
const monthlyMasterChartData = {
  categories: [
    '2023-01-01T00:00:00.000Z', '2023-02-01T00:00:00.000Z', '2023-03-01T00:00:00.000Z',
    '2023-04-01T00:00:00.000Z', '2023-05-01T00:00:00.000Z', '2023-06-01T00:00:00.000Z',
    '2023-07-01T00:00:00.000Z', '2023-08-01T00:00:00.000Z', '2023-09-01T00:00:00.000Z',
    '2023-10-01T00:00:00.000Z', '2023-11-01T00:00:00.000Z', '2023-12-01T00:00:00.000Z',
    '2024-01-01T00:00:00.000Z', '2024-02-01T00:00:00.000Z', '2024-03-01T00:00:00.000Z',
    '2024-04-01T00:00:00.000Z', '2024-05-01T00:00:00.000Z', '2024-06-01T00:00:00.000Z',
    '2024-07-01T00:00:00.000Z', '2024-08-01T00:00:00.000Z', '2024-09-01T00:00:00.000Z',
    '2024-10-01T00:00:00.000Z', '2024-11-01T00:00:00.000Z', '2024-12-01T00:00:00.000Z',
  ],
  series: {
    profileViews: { name: 'Profile Views', data: [110, 120, 135, 125, 145, 160, 150, 165, 180, 170, 185, 200, 190, 210, 205, 220, 230, 215, 225, 240, 235, 250, 260, 255] },
    quoteRequests: { name: 'Quote Requests', data: [60, 65, 75, 70, 80, 90, 85, 95, 100, 92, 105, 115, 110, 120, 118, 125, 130, 122, 128, 135, 132, 140, 145, 142] },
    callRequests: { name: 'Call Requests', data: [40, 42, 48, 45, 50, 55, 52, 58, 62, 59, 65, 70, 68, 72, 75, 78, 80, 76, 82, 85, 83, 88, 90, 89] },
    bookings: { name: 'Bookings', data: [20, 22, 28, 25, 30, 35, 32, 38, 42, 39, 45, 50, 48, 52, 55, 58, 60, 56, 62, 65, 63, 68, 70, 69] }
  }
};

// --- Function to generate daily data from monthly data ---
const generateDailyData = (monthlyData) => {
    const dailyCategories = [];
    const dailySeries = {
        profileViews: { name: 'Profile Views', data: [] },
        quoteRequests: { name: 'Quote Requests', data: [] },
        callRequests: { name: 'Call Requests', data: [] },
        bookings: { name: 'Bookings', data: [] }
    };

    monthlyData.categories.forEach((monthStr, index) => {
        const monthDate = new Date(monthStr);
        const year = monthDate.getUTCFullYear();
        const month = monthDate.getUTCMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(Date.UTC(year, month, day));
            dailyCategories.push(currentDate.toISOString());

            Object.keys(dailySeries).forEach(key => {
                const monthlyValue = monthlyData.series[key].data[index];
                const dailyValue = (monthlyValue / daysInMonth) * (1 + (Math.random() - 0.5) * 0.4);
                dailySeries[key].data.push(Math.max(0, Math.round(dailyValue)));
            });
        }
    });

    return { categories: dailyCategories, series: dailySeries };
};

// --- Generate and store daily data ---
const dailyMasterChartData = generateDailyData(monthlyMasterChartData);

// --- Configuration for Selectable Metrics ---
const seriesConfig = {
    profileViews: { name: 'Profile Views', color: '#06b6d4' },
    quoteRequests: { name: 'Quote Requests', color: '#8b5cf6' },
    callRequests: { name: 'Call Requests', color: '#ec4899' },
    bookings: { name: 'Bookings', color: '#f59e0b' }
};

const OrdersChart = () => {
  // --- STATE MANAGEMENT: Default range set to 6 months ---
  const [dateRange, setDateRange] = useState([new Date('2024-07-01'), new Date('2024-12-31')]);
  const [startDate, endDate] = dateRange;

  const [series1Key, setSeries1Key] = useState('profileViews');
  const [series2Key, setSeries2Key] = useState('quoteRequests');

  const [chartData, setChartData] = useState({ series: [], categories: [] });

  // --- DATA FILTERING LOGIC: Updated with conditional daily/monthly view ---
  useEffect(() => {
    if (!startDate || !endDate || !series1Key || !series2Key) {
      setChartData({ series: [], categories: [] });
      return;
    }

    const newFilteredData = {
      categories: [],
      series: [
        { name: seriesConfig[series1Key].name, data: [] },
        { name: seriesConfig[series2Key].name, data: [] }
      ]
    };
    
    // --- NEW: Calculate difference in days ---
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // --- NEW: Conditional Logic ---
    if (diffDays <= 30) {
        // --- Daily View Logic ---
        const series1Data = dailyMasterChartData.series[series1Key].data;
        const series2Data = dailyMasterChartData.series[series2Key].data;
        const dayFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

        dailyMasterChartData.categories.forEach((category, index) => {
            const categoryDate = new Date(category);
            categoryDate.setHours(0,0,0,0);
            if (categoryDate >= startDate && categoryDate <= endDate) {
                newFilteredData.categories.push(dayFormatter.format(categoryDate));
                newFilteredData.series[0].data.push(series1Data[index]);
                newFilteredData.series[1].data.push(series2Data[index]);
            }
        });
    } else {
        // --- Monthly View Logic ---
        const series1Data = monthlyMasterChartData.series[series1Key].data;
        const series2Data = monthlyMasterChartData.series[series2Key].data;
        const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

        monthlyMasterChartData.categories.forEach((category, index) => {
            const categoryDate = new Date(category);
            if (categoryDate >= startDate && categoryDate <= endDate) {
                newFilteredData.categories.push(monthFormatter.format(categoryDate));
                newFilteredData.series[0].data.push(series1Data[index]);
                newFilteredData.series[1].data.push(series2Data[index]);
            }
        });
    }

    setChartData(newFilteredData);

  }, [dateRange, series1Key, series2Key]);


  // --- CHART OPTIONS ---
  const chartOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: [seriesConfig[series1Key].color, seriesConfig[series2Key].color],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: chartData.categories,
      labels: {
          style: { colors: '#6b7280', fontSize: '12px' }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#6b7280', fontSize: '12px' },
        formatter: (value) => `${Math.round(value)}`,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      markers: { radius: 12 },
    },
    dataLabels: { enabled: false },
    grid: {
        show: true,
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
        padding: { left: 10, right: 10, top: -10 },
    },
    tooltip: {
        theme: 'light'
    },
  }), [chartData, series1Key, series2Key]);


  // --- Custom Components for UI Elements ---
  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 transition-all">
      {value}
      <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </button>
  ));
  CustomDateInput.displayName = 'CustomDateInput';

  const ComparisonSelect = ({ value, onChange, disabledOption }) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none w-full py-2 px-3 pr-9 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-blue-600 transition-all"
      >
        {Object.keys(seriesConfig).map(key => (
          <option key={key} value={key} disabled={key === disabledOption}>
            {seriesConfig[key].name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  );


  return (
    <div className="xl:col-span-4 flex flex-col bg-white border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
      {/* Card Header with Controls */}
      <div className="p-4 md:p-5 border-b border-stone-200 dark:border-neutral-700">
        <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="font-semibold text-lg text-stone-800 dark:text-neutral-200">
                Performance Comparison
            </h2>
            <div className="flex items-center gap-x-2">
                 <DatePicker
                   selectsRange={true}
                   startDate={startDate}
                   endDate={endDate}
                   onChange={(update) => setDateRange(update)}
                   dateFormat="MMM d, yyyy"
                   customInput={<CustomDateInput />}
                 />
            </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
            <ComparisonSelect
                value={series1Key}
                onChange={(e) => setSeries1Key(e.target.value)}
                disabledOption={series2Key}
            />
            <span className="text-center text-sm text-gray-500 font-semibold self-center">VS</span>
            <ComparisonSelect
                value={series2Key}
                onChange={(e) => setSeries2Key(e.target.value)}
                disabledOption={series1Key}
            />
        </div>
      </div>

      {/* Card Body with Chart */}
      <div className="p-4 md:p-5">
        {typeof window !== 'undefined' && (
             <Chart
               options={chartOptions}
               series={chartData.series}
               type="bar"
               height={350}
             />
        )}
      </div>
    </div>
  );
};

export default OrdersChart;