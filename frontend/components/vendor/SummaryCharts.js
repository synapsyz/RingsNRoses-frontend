'use client';

import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from 'next-auth/react'; // Import useSession
import axios from 'axios'; // Import axios

// --- Dynamic Import for ApexCharts ---
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

// --- Reusable LineChartCard Sub-Component ---
const LineChartCard = ({ statType, title, icon, theme, accessToken, vendorId }) => {
  const [data, setData] = useState({
    mainValue: '0',
    changePercentage: '0%',
    changeType: 'neutral',
    subtext: 'vs. last month',
    series: [{ name: 'This month', data: [] }, { name: 'Last month', data: [] }],
    categories: [], // Will store ISO date strings
    colors: [seriesConfig[statType].color, '#a8a29e'] // Dynamic color for current, fixed for last month
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken || !vendorId) {
      setLoading(false);
      return;
    }

    const fetchCardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const today = new Date();
        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month

        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of previous month
        const lastMonthStart = new Date(lastMonthEnd.getFullYear(), lastMonthEnd.getMonth(), 1);

        // Fetch current month's daily stats
        const currentMonthResponse = await api.get('/daily-stats/', {
          params: {
            vendor: vendorId,
            stat_type: statType,
            date__gte: currentMonthStart.toISOString().split('T')[0],
            date__lte: currentMonthEnd.toISOString().split('T')[0],
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const currentMonthDailyData = currentMonthResponse.data.results || [];

        // Fetch last month's daily stats
        const lastMonthResponse = await api.get('/daily-stats/', {
          params: {
            vendor: vendorId,
            stat_type: statType,
            date__gte: lastMonthStart.toISOString().split('T')[0],
            date__lte: lastMonthEnd.toISOString().split('T')[0],
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const lastMonthDailyData = lastMonthResponse.data.results || [];

        // Calculate main value (total for current month)
        const currentMonthTotal = currentMonthDailyData.reduce((sum, item) => sum + item.count, 0);
        const lastMonthTotal = lastMonthDailyData.reduce((sum, item) => sum + item.count, 0);

        // Calculate change percentage
        let changePercentage = '0%';
        let changeType = 'neutral';
        if (lastMonthTotal > 0) {
          const percentage = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
          changePercentage = `${Math.abs(percentage).toFixed(1)}%`;
          if (percentage > 0) changeType = 'increase';
          else if (percentage < 0) changeType = 'decrease';
        } else if (currentMonthTotal > 0) {
          // If last month was 0 but current month has data, it's a significant increase
          changePercentage = '100%';
          changeType = 'increase';
        }

        // Prepare sparkline data (last 30 days for simplicity)
        const sparklineDays = 30;
        const sparklineEndDate = new Date(today);
        const sparklineStartDate = new Date(today);
        sparklineStartDate.setDate(today.getDate() - sparklineDays + 1);

        const sparklineCategories = []; // Will now store ISO date strings
        const thisMonthSparklineData = [];
        const lastMonthSparklineData = [];

        let tempDate = new Date(sparklineStartDate);
        while (tempDate <= sparklineEndDate) {
          const isoDate = tempDate.toISOString().split('T')[0]; // YYYY-MM-DD
          sparklineCategories.push(isoDate); // Store ISO date string for x-axis

          const currentDayData = currentMonthDailyData.find(item => item.date === isoDate);
          thisMonthSparklineData.push(currentDayData ? currentDayData.count : 0);

          const equivalentLastMonthDate = new Date(tempDate);
          equivalentLastMonthDate.setMonth(equivalentLastMonthDate.getMonth() - 1);
          const isoLastMonthDate = equivalentLastMonthDate.toISOString().split('T')[0];
          const lastDayData = lastMonthDailyData.find(item => item.date === isoLastMonthDate);
          lastMonthSparklineData.push(lastDayData ? lastDayData.count : 0);

          tempDate.setDate(tempDate.getDate() + 1);
        }

        setData({
          mainValue: currentMonthTotal.toLocaleString(),
          changePercentage: changePercentage,
          changeType: changeType,
          subtext: 'vs. last month',
          series: [
            { name: 'This month', data: thisMonthSparklineData },
            { name: 'Last month', data: lastMonthSparklineData }
          ],
          categories: sparklineCategories,
          colors: [seriesConfig[statType].color, '#a8a29e']
        });

      } catch (err) {
        console.error(`Error fetching data for ${title}:`, err.response?.data || err.message);
        setError(`Failed to load data for ${title}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [accessToken, vendorId, statType, title]); // Re-fetch if these props change

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
      x: {
        show: true,
        // Custom formatter for the x-axis label in the tooltip
        formatter: function (value) {
          // Add a check for valid value before creating Date object
          if (!value) return '';
          const date = new Date(value);
          if (isNaN(date.getTime())) return ''; // Check if date is valid
          return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
        }
      },
      y: {
        // Custom formatter to show data for both series at the hovered point
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          const categoryLabel = w.globals.categoryLabels[dataPointIndex];
          // Add a check for valid categoryLabel before creating Date object
          if (!categoryLabel) return '';
          const dateForTooltip = new Date(categoryLabel);
          if (isNaN(dateForTooltip.getTime())) return ''; // Check if date is valid

          const thisMonthValue = w.globals.series[0][dataPointIndex];
          const lastMonthValue = w.globals.series[1][dataPointIndex];
          const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(dateForTooltip);

          return `${formattedDate}:<br/>` +
                 `This month: ${thisMonthValue.toLocaleString()}<br/>` +
                 `Last month: ${lastMonthValue.toLocaleString()}`;
        }
      },
      marker: { show: true }
    },
    xaxis: {
      type: 'datetime', // Set x-axis type to datetime
      categories: data.categories, // These are now ISO date strings
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    grid: { show: false }, // Hide grid for sparkline
  }), [data, theme]);

  return (
    <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">{title}</h2>
      <div className="mt-2 grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
        <div>
          <h4 className="text-lg font-bold text-stone-800 dark:text-neutral-200">
            {loading ? '...' : data.mainValue}
            {!loading && !error && (
              <span className={`inline-flex items-center gap-x-1 text-sm font-medium ${data.changeType === 'increase' ? 'text-green-500' : data.changeType === 'decrease' ? 'text-red-500' : 'text-gray-500'}`}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {data.changeType === 'increase' ? (<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>) : data.changeType === 'decrease' ? (<><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></>) : null}
                </svg>
                {data.changePercentage}
              </span>
            )}
          </h4>
        </div>
        <div className="md:text-end">
          <p className="text-sm text-stone-500 dark:text-neutral-400">{data.subtext}</p>
        </div>
      </div>
      <div className="min-h-[60px] mt-3 flex items-center justify-center">
        {loading ? (
          <div className="text-sm text-gray-500">Loading chart...</div>
        ) : error ? (
          <div className="text-sm text-red-500">Chart error</div>
        ) : (
          typeof window !== 'undefined' && data.series[0].data.length > 0 ? (
            <Chart options={chartOptions} series={data.series} type="line" height={60} />
          ) : (
            <div className="text-sm text-gray-500">No data for chart.</div>
          )
        )}
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
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const vendorId = session?.user?.vendor_profile?.id;

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Initial theme check
    if (typeof window !== 'undefined') { // Check if window is defined before accessing document
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
    }
  }, []);

  // Define the types of stats you want to display
  const statCardConfigs = useMemo(() => [
    { statType: 'profile_view', title: 'Profile Views', icon: (
        <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M80-600v-160q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v160h-80v-160H160v160H80Zm80 360q-33 0-56.5-23.5T80-320v-200h80v200h640v-200h80v200q0 33-23.5 56.5T800-240H160ZM40-120v-80h880v80H40Zm440-420ZM80-520v-80h240q11 0 21 6t15 16l47 93 123-215q5-9 14-14.5t20-5.5q11 0 21 5.5t15 16.5l49 98h235v80H620q-11 0-21-5.5T584-542l-26-53-123 215q-5 10-15 15t-21 5q-11 0-20.5-6T364-382l-69-138H80Z"/></svg>
    )},
    { statType: 'quote_request', title: 'Quote Requests', icon: (
        <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
    )},
    { statType: 'call_request', title: 'Call Requests', icon: (
        <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
    )},
    { statType: 'booking', title: 'Bookings', icon: (
        <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M240-400h122l200-200q9-9 13.5-20.5T580-643q0-11-5-21.5T562-684l-36-38q-9-9-20-13.5t-23-4.5q-11 0-22.5 4.5T440-722L240-522v122Zm280-243-37-37 37 37ZM300-460v-38l101-101 20 18 18 20-101 101h-38Zm121-121 18 20-38-38 20 18Zm26 181h273v-80H527l-80 80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
    )},
  ], []);


  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
      {status === 'loading' || !vendorId ? (
        <div className="sm:col-span-2 lg:col-span-2 text-center text-gray-500 dark:text-gray-400">
          Loading dashboard data...
        </div>
      ) : (
        statCardConfigs.map(config => (
          <LineChartCard
            key={config.statType}
            statType={config.statType}
            title={config.title}
            icon={config.icon}
            theme={theme}
            accessToken={accessToken}
            vendorId={vendorId}
          />
        ))
      )}
    </div>
  );
};

export default SummaryCharts;
