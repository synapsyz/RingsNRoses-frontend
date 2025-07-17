'use client';

import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from 'next-auth/react'; // Import useSession
import axios from 'axios'; // Import axios

// --- Dynamic Import for ApexCharts ---
// This ensures ApexCharts is only loaded on the client-side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// --- API Configuration ---
const api_url =
  process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;

const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;

const api = axios.create({
  baseURL: api_url + "/api/v1",
  headers: {
    ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
  },
});

// --- Configuration for Selectable Metrics ---
const seriesConfig = {
  profile_view: { name: 'Profile Views', color: '#06b6d4' },
  quote_request: { name: 'Quote Requests', color: '#8b5cf6' },
  call_request: { name: 'Call Requests', color: '#ec4899' },
  booking: { name: 'Bookings', color: '#f59e0b' }
};

const OrdersChart = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const vendorId = session?.user?.vendor_profile?.id; // Assuming vendor_profile.id exists on the session user

  // --- STATE MANAGEMENT: Default range set to 6 months ---
  const [dateRange, setDateRange] = useState([new Date(new Date().setMonth(new Date().getMonth() - 5)), new Date()]);
  const [startDate, endDate] = dateRange;

  const [series1Key, setSeries1Key] = useState('profile_view'); // Use backend stat_type names
  const [series2Key, setSeries2Key] = useState('quote_request'); // Use backend stat_type names

  const [chartData, setChartData] = useState({ series: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DATA FETCHING AND FILTERING LOGIC ---
  useEffect(() => {
    if (status === 'loading' || !accessToken || !vendorId || !startDate || !endDate) {
      setLoading(true);
      return;
    }

    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const isDailyView = diffDays <= 30; // Use daily data if range is 30 days or less

        const fetchedData = {}; // To store data for both series keys
        const seriesKeysToFetch = [series1Key, series2Key];

        for (const key of seriesKeysToFetch) {
          let endpoint = '';
          let params = {
            vendor: vendorId,
            stat_type: key,
          };

          if (isDailyView) {
            endpoint = '/daily-stats/';
            params.date__gte = startDate.toISOString().split('T')[0];
            params.date__lte = endDate.toISOString().split('T')[0];
          } else {
            endpoint = '/monthly-stats/';
            // For monthly, fetch all and filter in JS for simplicity, or refine backend filter
            // For now, let's fetch all monthly for the vendor and stat_type, then filter in JS
            // if you need more precise month-by-month filtering, you might add year/month params
            // params.year__gte = startDate.getFullYear();
            // params.year__lte = endDate.getFullYear();
            // params.month__gte = startDate.getMonth() + 1; // JS months are 0-indexed
            // params.month__lte = endDate.getMonth() + 1;
          }

          const response = await api.get(endpoint, {
            params: params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          fetchedData[key] = response.data.results || response.data; // .results for list views, direct data for custom actions
        }

        // --- Process and Format Data for Chart ---
        const newFilteredData = {
          categories: [],
          series: [
            { name: seriesConfig[series1Key].name, data: [] },
            { name: seriesConfig[series2Key].name, data: [] }
          ]
        };

        if (isDailyView) {
          const dayFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
          let currentDateIterator = new Date(startDate);
          currentDateIterator.setHours(0, 0, 0, 0); // Normalize to start of day

          while (currentDateIterator <= endDate) {
            const formattedDate = dayFormatter.format(currentDateIterator);
            const isoDate = currentDateIterator.toISOString().split('T')[0]; // YYYY-MM-DD

            newFilteredData.categories.push(formattedDate);

            seriesKeysToFetch.forEach((key, seriesIndex) => {
              const dataForSeries = fetchedData[key];
              const foundEntry = dataForSeries.find(item => item.date === isoDate);
              newFilteredData.series[seriesIndex].data.push(foundEntry ? foundEntry.count : 0);
            });

            currentDateIterator.setDate(currentDateIterator.getDate() + 1); // Move to next day
          }
        } else {
          const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });
          let currentMonthIterator = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

          while (currentMonthIterator <= endDate) {
            const formattedMonth = monthFormatter.format(currentMonthIterator);
            const year = currentMonthIterator.getFullYear();
            const month = currentMonthIterator.getMonth() + 1; // JS months are 0-indexed

            newFilteredData.categories.push(formattedMonth);

            seriesKeysToFetch.forEach((key, seriesIndex) => {
              const dataForSeries = fetchedData[key];
              const foundEntry = dataForSeries.find(item => item.year === year && item.month === month);
              newFilteredData.series[seriesIndex].data.push(foundEntry ? foundEntry.count : 0);
            });

            currentMonthIterator.setMonth(currentMonthIterator.getMonth() + 1); // Move to next month
          }
        }

        setChartData(newFilteredData);

      } catch (err) {
        console.error("Error fetching chart data:", err.response?.data || err.message);
        setError("Failed to load chart data. Please try again.");
        setChartData({ series: [], categories: [] }); // Clear chart on error
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [startDate, endDate, series1Key, series2Key, accessToken, vendorId, status]); // Dependencies for useEffect

  // --- CHART OPTIONS (Memoized for performance) ---
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
        columnWidth: '80%', // Increased bar width for better visibility
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
      min: 0, // Ensure y-axis starts at 0
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
        {/* You can add a custom dropdown arrow icon here if needed */}
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
      <div className=" ">
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading chart data...</div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-500">{error}</div>
        ) : (
          typeof window !== 'undefined' && ( // Ensure window is defined for client-side rendering
              <Chart
                options={chartOptions}
                series={chartData.series}
                type="bar"
                height={350}
              />
          )
        )}
      </div>
    </div>
  );
};

export default OrdersChart;
