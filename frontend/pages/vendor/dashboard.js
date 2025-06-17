'use client';
import Head from 'next/head';
import { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import TotalSalesLineChart from '../components/TotalSalesLineChart';
import OrdersBarChart from '../components/OrdersBarChart';
import TotalVisitorsLineChart from '../components/TotalVisitorsLineChart';
import TotalRefundedLineChart from '../components/TotalRefundedLineChart';


export default function Dashboard() {
export default OrdersBarChart;
export default TotalSalesLineChart;
export default TotalVisitorsLineChart;
export default TotalRefundedLineChart;


   useEffect(() => {
    const html = document.documentElement;
    const theme = localStorage.getItem('hs_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isLightOrAuto = theme === 'light' || (theme === 'auto' && !prefersDark);
    const isDarkOrAuto = theme === 'dark' || (theme === 'auto' && prefersDark);


    if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
    else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
    else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
    else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
  }, []);


  const OrdersBarChart = () => {
  useEffect(() => {
    const buildChart = (selector, baseOptions, lightThemeOptions, darkThemeOptions) => {
      const chart = new ApexCharts(document.querySelector(selector), {
        ...baseOptions('light'),
        ...lightThemeOptions,
      });
      chart.render();
    };

    buildChart('#hs-orders-bar-chart', (mode) => ({
      chart: {
        type: 'bar',
        height: 250,
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      series: [
        {
          name: 'In-store',
          data: [200, 300, 290, 350, 150, 350, 300, 100, 125, 220, 200, 300]
        },
        {
          name: 'Online',
          data: [150, 230, 382, 204, 169, 290, 300, 100, 300, 225, 120, 150]
        }
      ],
      colors: ['#8b5cf6', '#d4d4d4'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '14px',
          borderRadius: 0,
        }
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: { show: false },
        labels: {
          style: {
            colors: '#a8a29e',
            fontSize: '13px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400
          },
          offsetX: -2,
          formatter: (title) => title.slice(0, 3)
        }
      },
      yaxis: {
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: '#a8a29e',
            fontSize: '13px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400
          },
          formatter: (value) => value >= 1000 ? `${value / 1000}k` : value
        }
      }
    }), {
      colors: ['#16a34a', '#d4d4d4'],
      grid: { borderColor: '#e5e5e5' },
      xaxis: { labels: { style: { colors: '#a8a29e' } } },
      yaxis: { labels: { style: { colors: '#a8a29e' } } }
    }, {
      colors: ['#22c55e', '#737373'],
      grid: { borderColor: '#404040' },
      xaxis: { labels: { style: { colors: '#a3a3a3' } } },
      yaxis: { labels: { style: { colors: '#a3a3a3' } } }
    });
  }, []);

  return <div id="hs-orders-bar-chart" className="w-full h-[250px]" />;
};



const TotalSalesLineChart = () => {
  useEffect(() => {
    const buildChart = (selector, baseOptions, lightTheme, darkTheme) => {
      const chart = new ApexCharts(document.querySelector(selector), {
        ...baseOptions('light'),
        ...lightTheme,
      });
      chart.render();
    };

    buildChart('#hs-total-sales-line-chart', (mode) => ({
      chart: {
        height: 250,
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      series: [
        {
          name: 'This month',
          data: [200, 200, 240, 350, 200, 350, 200, 250, 285, 220],
        },
        {
          name: 'Last month',
          data: [150, 230, 382, 204, 269, 290, 200, 250, 200, 225],
        },
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: [3, 3],
        dashArray: [0, 0],
      },
      grid: {
        strokeDashArray: 0,
        padding: { top: 0, right: 0 },
      },
      title: { show: false },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: [
          '1st', '3rd', '6th', '9th', '12th',
          '15th', '18th', '21st', '24th', '27th',
        ],
        axisBorder: { show: false },
        axisTicks: { show: false, height: 0 },
        labels: {
          show: false,
          maxHeight: 0,
        },
        tooltip: { enabled: false },
      },
      yaxis: {
        min: 0,
        max: 500,
        tickAmount: 4,
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: '#a8a29e',
            fontSize: '12px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400,
          },
          formatter: (value) => value >= 1000 ? `${value / 1000}k` : value,
        },
      },
      tooltip: {
        custom: function (props) {
          return `<div class="text-xs text-gray-500 dark:text-gray-300 p-2">
                    <div>Accretion</div>
                    <div class="flex justify-between">
                      <span>${props.series[0][props.dataPointIndex]}</span>
                      <span>${props.series[1][props.dataPointIndex]}</span>
                    </div>
                  </div>`;
        },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: { height: 150 },
            yaxis: {
              labels: {
                align: 'left',
                minWidth: 0,
                maxWidth: 140,
                style: {
                  colors: '#a8a29e',
                  fontSize: '11px',
                  fontFamily: 'Inter, ui-sans-serif',
                  fontWeight: 400,
                },
                formatter: (value) => value >= 1000 ? `${value / 1000}k` : value,
              },
            },
          },
        },
      ],
    }), {
      colors: ['#16a34a', '#d4d4d4'],
      grid: { borderColor: '#e5e5e5' },
      xaxis: { labels: { style: { colors: '#a8a29e' } } },
      yaxis: { labels: { style: { colors: '#a8a29e' } } },
    }, {
      colors: ['#22c55e', '#737373'],
      grid: { borderColor: '#404040' },
      xaxis: { labels: { style: { colors: '#a3a3a3' } } },
      yaxis: { labels: { style: { colors: '#a3a3a3' } } },
    });

  }, []);

  return <div id="hs-total-sales-line-chart" className="w-full h-[250px]" />;
};




const TotalVisitorsLineChart = () => {
  useEffect(() => {
    const buildChart = (selector, baseOptions, lightTheme, darkTheme) => {
      const chart = new ApexCharts(document.querySelector(selector), {
        ...baseOptions('light'),
        ...lightTheme,
      });
      chart.render();
    };

    buildChart('#hs-total-visitors-line-chart', (mode) => ({
      chart: {
        height: 250,
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      series: [
        {
          name: 'This month',
          data: [20, 20, 24, 15, 30, 35, 20, 28, 18, 16],
        },
        {
          name: 'Last month',
          data: [15, 23, 18, 20, 36, 29, 20, 22, 20, 22],
        },
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: [3, 3],
        dashArray: [0, 0],
      },
      grid: {
        strokeDashArray: 0,
        padding: { top: 0, right: 0 },
      },
      title: { show: false },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: [
          '1st', '3rd', '6th', '9th', '12th',
          '15th', '18th', '21st', '24th', '27th',
        ],
        axisBorder: { show: false },
        axisTicks: { show: false, height: 0 },
        labels: { show: false, maxHeight: 0 },
        tooltip: { enabled: false },
      },
      yaxis: {
        min: 0,
        max: 50,
        tickAmount: 4,
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: '#a8a29e',
            fontSize: '12px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400,
          },
          formatter: (value) => value >= 1000 ? `${value / 1000}k` : value,
        },
      },
      tooltip: {
        custom: function (props) {
          return `<div class="text-xs text-gray-500 dark:text-gray-300 p-2">
                    <div>Accretion</div>
                    <div class="flex justify-between">
                      <span>${props.series[0][props.dataPointIndex]}</span>
                      <span>${props.series[1][props.dataPointIndex]}</span>
                    </div>
                  </div>`;
        },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: { height: 150 },
            yaxis: {
              labels: {
                align: 'left',
                minWidth: 0,
                maxWidth: 140,
                style: {
                  colors: '#a8a29e',
                  fontSize: '11px',
                  fontFamily: 'Inter, ui-sans-serif',
                  fontWeight: 400,
                },
                formatter: (value) => value >= 1000 ? `${value / 1000}k` : value,
              },
            },
          },
        },
      ],
    }), {
      colors: ['#16a34a', '#d4d4d4'],
      grid: { borderColor: '#e5e5e5' },
      xaxis: { labels: { style: { colors: '#a8a29e' } } },
      yaxis: { labels: { style: { colors: '#a8a29e' } } },
    }, {
      colors: ['#22c55e', '#737373'],
      grid: { borderColor: '#404040' },
      xaxis: { labels: { style: { colors: '#a3a3a3' } } },
      yaxis: { labels: { style: { colors: '#a3a3a3' } } },
    });
  }, []);

  return <div id="hs-total-visitors-line-chart" className="w-full h-[250px]" />;
};





const TotalRefundedLineChart = () => {
  useEffect(() => {
    // Helper function for tooltip content
    const buildTooltipCompareTwoAlt = (props, opts) => {
      // Simple version of tooltip formatter
      // You can customize this further as needed
      const { dataPointIndex, series, w } = props;
      const title = opts.title || '';
      const val1 = series[0][dataPointIndex];
      const val2 = series[1][dataPointIndex];
      return `
        <div style="padding:4px 8px; font-size:12px; color:#6b7280; min-width:112px;">
          <div>${title}</div>
          <div style="display:flex; justify-content:space-between; margin-top:4px;">
            <span>${val1}</span>
            <span>${val2}</span>
          </div>
        </div>
      `;
    };

    const buildChart = (selector, baseOptions, lightTheme, darkTheme) => {
      const chart = new ApexCharts(document.querySelector(selector), {
        ...baseOptions('light'),
        ...lightTheme,
        tooltip: {
          custom: function (props) {
            return buildTooltipCompareTwoAlt(props, {
              title: 'Accretion',
              mode: 'light',
              hasTextLabel: true,
              wrapperExtClasses: 'min-w-28',
              valuePrefix: '',
              labelDivider: ':',
              labelExtClasses: 'ms-2',
            });
          },
        },
      });
      chart.render();
      return chart;
    };

    const baseOptions = (mode) => ({
      chart: {
        height: 250,
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      series: [
        { name: 'This month', data: [0, 20, 22, 15, 20, 15, 20, 19, 14, 15] },
        { name: 'Last month', data: [15, 13, 18, 10, 16, 19, 15, 14, 10, 26] },
      ],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: [3, 3], dashArray: [0, 0] },
      grid: { strokeDashArray: 0, padding: { top: 0, right: 0 } },
      title: { show: false },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: [
          '1st', '3rd', '6th', '9th', '12th',
          '15th', '18th', '21st', '24th', '27th',
        ],
        axisBorder: { show: false },
        axisTicks: { show: false, height: 0 },
        labels: { show: false, maxHeight: 0 },
        tooltip: { enabled: false },
      },
      yaxis: {
        min: 0,
        max: 50,
        tickAmount: 4,
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: '#a8a29e',
            fontSize: '12px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400,
          },
          formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: { height: 150 },
            labels: {
              style: {
                colors: '#a8a29e',
                fontSize: '11px',
                fontFamily: 'Inter, ui-sans-serif',
                fontWeight: 400,
              },
              offsetX: -2,
              formatter: (title) => title.slice(0, 3),
            },
            yaxis: {
              labels: {
                align: 'left',
                minWidth: 0,
                maxWidth: 140,
                style: {
                  colors: '#a8a29e',
                  fontSize: '11px',
                  fontFamily: 'Inter, ui-sans-serif',
                  fontWeight: 400,
                },
                formatter: (value) =>
                  value >= 1000 ? `${value / 1000}k` : value,
              },
            },
          },
        },
      ],
    });

    const lightTheme = {
      colors: ['#16a34a', '#d4d4d4'],
      grid: { borderColor: '#e5e5e5' },
      xaxis: { labels: { style: { colors: '#a8a29e' } } },
      yaxis: { labels: { style: { colors: '#a8a29e' } } },
    };

    const darkTheme = {
      colors: ['#22c55e', '#737373'],
      grid: { borderColor: '#404040' },
      xaxis: { labels: { style: { colors: '#a3a3a3' } } },
      yaxis: { labels: { style: { colors: '#a3a3a3' } } },
    };

    const chart = buildChart('#hs-total-refunded-line-chart', baseOptions, lightTheme, darkTheme);

    return () => {
      chart.destroy();
    };
  }, []);}

  return <div id="hs-total-refunded-line-chart" className="w-full h-[250px]" />;
};

  
  return (
    <>
      <Head>
        <title>E-commerce | Preline Pro | Preline UI, crafted with Tailwind CSS</title>
        <meta charSet="utf-8" />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://preline.co/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          name="description"
          content="Powerful e-commerce admin pages with product & order lists, referrals and more."
        />

        {/* Twitter Meta */}
        <meta name="twitter:site" content="@preline" />
        <meta name="twitter:creator" content="@preline" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="E-commerce | Preline Pro | Preline UI, crafted with Tailwind CSS"
        />
        <meta
          name="twitter:description"
          content="Powerful e-commerce admin pages with product & order lists, referrals and more."
        />
        <meta name="twitter:image" content="https://preline.co/assets/img/og-image.png" />

        {/* Open Graph Meta */}
        <meta property="og:url" content="https://preline.co/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Preline" />
        <meta
          property="og:title"
          content="E-commerce | Preline Pro | Preline UI, crafted with Tailwind CSS"
        />
        <meta
          property="og:description"
          content="Powerful e-commerce admin pages with product & order lists, referrals and more."
        />
        <meta property="og:image" content="https://preline.co/assets/img/og-image.png" />

        {/* Favicon and Fonts */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/main.min.css?v=3.1.0" />

<link
          rel="stylesheet"
          href="/assets/vendor/apexcharts/dist/apexcharts.css"
        />
        <style>{`
          .apexcharts-tooltip.apexcharts-theme-light {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
        `}</style>

      </Head>

<div className="bg-stone-50 dark:bg-neutral-900">

   {/* <!-- ========== HEADER ========== --> */} 
  <header className="flex flex-col z-50">

     

    <nav className="relative bg-white border-b border-stone-200 dark:bg-neutral-800 dark:border-neutral-700">

      <div className="max-w-[85rem] flex flex-wrap justify-between gap-2 basis-full items-center w-full mx-auto lg:py-2.5 px-4 sm:px-6 lg:px-8">
        {/* <!-- Nav Links --> */}
        <div className="basis-full grow lg:basis-auto lg:grow-0">
          {/* <!-- Collapse --> */}
          <div id="hs-pro-emh" className="hs-collapse hidden overflow-hidden transition-all duration-300 lg:block" aria-labelledby="hs-pro-emh-collapse">
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="lg:flex lg:items-center lg:gap-x-1 py-2 lg:py-0 space-y-1 lg:space-y-0">
                {/* <!-- Link --> */}
                <a className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 bg-stone-100 focus:bg-stone-200 dark:bg-neutral-700 dark:focus:bg-neutral-600 " href="../../pro/ecommerce/index.html">
                  <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Overview
                </a>
                {/* <!-- End Link --> */}

                {/* <!-- Dropdown Link --> */}
                <div className="hs-dropdown [--strategy:static] lg:[--strategy:fixed] [--adaptive:none] lg:[--adaptive:adaptive] lg:[--trigger:hover] lg:inline-block">
                  {/* <!-- Link --> */}
                  <button id="hs-pro-enlpd" type="button" className="hs-dropdown-toggle flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                      <path d="M12 3v6" />
                    </svg>
                    Products
                    <svg className="hs-dropdown-open:-rotate-180 lg:hs-dropdown-open:rotate-0 duration-300 ms-auto lg:ms-0 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {/* <!-- End Link --> */}

                  {/* <!-- Dropdown Menu --> */}
                  <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] lg:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full lg:w-52 hidden z-10 top-full bg-white lg:rounded-lg lg:shadow-xl shadow-stone-200 ps-7 lg:ps-0 before:absolute before:-top-4 before:start-0 before:w-full before:h-5 lg:after:hidden after:absolute after:top-1 after:start-4.5 after:w-0.5 after:h-[calc(100%-4px)] after:bg-stone-100 dark:bg-neutral-800 dark:shadow-neutral-900 dark:after:bg-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-enlpd">
                    <div className="p-1 space-y-0.5">
                      {/* <!-- Link --> */}
                      <a className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/products.html">
                        Overview
                      </a>
                      {/* <!-- End Link --> */}

                      {/* <!-- Link --> */}
                      <a className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/product-details.html">
                        Product Details
                      </a>
                      {/* <!-- End Link --> */}

                      {/* <!-- Link --> */}
                      <a className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/add-product.html">
                        Add Product
                      </a>
                      {/* <!-- End Link --> */}
                    </div>
                  </div>
                  {/* <!-- End Dropdown Menu --> */}
                </div>
                {/* <!-- End Dropdown Link --> */}

                {/* <!-- Dropdown Link --> */}
                <div className="hs-dropdown [--strategy:static] lg:[--strategy:fixed] [--adaptive:none] lg:[--adaptive:adaptive] lg:[--trigger:hover] lg:inline-block">
                  {/* <!-- Link --> */}
                  <button id="hs-pro-enlod" type="button" className="hs-dropdown-toggle flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 22H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M2.97 13.12c-.6.36-.97 1.02-.97 1.74v3.28c0 .72.37 1.38.97 1.74l3 1.83c.63.39 1.43.39 2.06 0l3-1.83c.6-.36.97-1.02.97-1.74v-3.28c0-.72-.37-1.38-.97-1.74l-3-1.83a1.97 1.97 0 0 0-2.06 0l-3 1.83Z" />
                      <path d="m7 17-4.74-2.85" />
                      <path d="m7 17 4.74-2.85" />
                      <path d="M7 17v5" />
                    </svg>
                    Orders <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">+1</span>
                    <svg className="hs-dropdown-open:-rotate-180 lg:hs-dropdown-open:rotate-0 duration-300 ms-auto lg:ms-0 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {/* <!-- End Link --> */}

                  {/* <!-- Dropdown Menu --> */}
                  <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] lg:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full lg:w-52 hidden z-10 top-full bg-white lg:rounded-lg lg:shadow-xl shadow-stone-200 ps-7 lg:ps-0 before:absolute before:-top-4 before:start-0 before:w-full before:h-5 lg:after:hidden after:absolute after:top-1 after:start-4.5 after:w-0.5 after:h-[calc(100%-4px)] after:bg-stone-100 dark:bg-neutral-800 dark:shadow-neutral-900 dark:after:bg-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-enlod">
                    <div className="p-1 space-y-0.5">
                      {/* <!-- Link --> */}
                      <a className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/orders.html">
                        Overview
                      </a>
                      {/* <!-- End Link --> */}

                      {/* <!-- Link --> */}
                      <a className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/purchase-orders.html">
                        Purchase Orders <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">New</span>
                      </a>
                      {/* <!-- End Link --> */}

                      {/* <!-- Link --> */}
                      <a className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/order-details.html">
                        Order Details
                      </a>
                      {/* <!-- End Link --> */}
                    </div>
                  </div>
                  {/* <!-- End Dropdown Menu --> */}
                </div>
                {/* <!-- End Dropdown Link --> */}

                {/* <!-- Link --> */}
                <a className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/referrals.html">
                  <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m16 3 4 4-4 4" />
                    <path d="M20 7H4" />
                    <path d="m8 21-4-4 4-4" />
                    <path d="M4 17h16" />
                  </svg>
                  Referrals
                </a>
                {/* <!-- End Link --> */}

                {/* <!-- Link --> */}
                <a className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/reviews.html">
                  <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Reviews
                </a>
                {/* <!-- End Link --> */}

                {/* <!-- Link --> */}
                <a className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/discounts.html">
                  <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m15 9-6 6" />
                    <path d="M9 9h.01" />
                    <path d="M15 15h.01" />
                  </svg>
                  Discounts
                </a>
                {/* <!-- End Link --> */}

                {/* <!-- Dropdown Link --> */}
                <div className="hs-dropdown [--strategy:static] lg:[--strategy:fixed] [--adaptive:none] lg:[--adaptive:adaptive] lg:[--trigger:hover] lg:inline-block">
                  {/* <!-- Link --> */}
                  <button id="hs-pro-enlst" type="button" className="hs-dropdown-toggle flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                      <path d="M2 7h20" />
                      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                    </svg>
                    Store
                    <svg className="hs-dropdown-open:-rotate-180 lg:hs-dropdown-open:rotate-0 duration-300 ms-auto lg:ms-0 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {/* <!-- End Link --> */}

                  {/* <!-- Dropdown Menu --> */}
                  <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] lg:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full lg:w-52 hidden z-10 top-full bg-white lg:rounded-lg lg:shadow-xl shadow-stone-200 ps-7 lg:ps-0 before:absolute before:-top-4 before:start-0 before:w-full before:h-5 lg:after:hidden after:absolute after:top-1 after:start-4.5 after:w-0.5 after:h-[calc(100%-4px)] after:bg-stone-100 dark:bg-neutral-800 dark:shadow-neutral-900 dark:after:bg-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-enlst">
                    <div className="p-1 space-y-0.5">
                      {/* <!-- Link --> */}
                      <a className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/store.html">
                        Overview
                      </a>
                      {/* <!-- End Link --> */}

                      {/* <!-- Link --> */}
                      <a className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/payouts.html">
                        Payouts
                      </a>
                      {/* <!-- End Link --> */}
                    </div>
                  </div>
                  {/* <!-- End Dropdown Menu --> */}
                </div>
                {/* <!-- End Dropdown Link --> */}

                {/* <!-- Link --> */}
                <a className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/search.html">
                  <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 6H3" />
                    <path d="M10 12H3" />
                    <path d="M10 18H3" />
                    <circle cx="17" cy="15" r="3" />
                    <path d="m21 19-1.9-1.9" />
                  </svg>
                  Search <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">New</span>
                </a>
                {/* <!-- End Link --> */}

                {/* <!-- Link --> */}
                <a className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  " href="../../pro/ecommerce/empty-states.html">
                  <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                  Empty States
                </a>
                {/* <!-- End Link --> */}
              </div>
            </div>
          </div>
          {/* <!-- End Collapse --> */}
        </div>
        {/* <!-- End Nav Links --> */}

        <div className="hidden lg:block">
          {/* <!-- Project Dropdown --> */}
          <div className="hs-dropdown [--auto-close:inside] [--placement:top-right] relative flex">
            {/* <!-- Project Button --> */}
            <button id="hs-pro-dnwpd" type="button" className="inline-flex items-center text-start text-sm font-medium text-stone-800 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-stone-500 dark:text-white dark:focus:text-neutral-200" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <svg className="shrink-0 size-5 me-1.5" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.8875 15.3054C32.9242 16.2093 32.8209 17.1099 32.5811 17.9792C32.3447 18.8486 31.9716 19.6695 31.4787 20.4141C30.989 21.1593 30.3861 21.8167 29.6935 22.3607L29.6769 22.3745L23.019 27.563L19.7451 30.1433L17.7501 31.7089C17.6335 31.8024 17.5036 31.8716 17.3671 31.9201C17.2305 31.9686 17.084 31.9929 16.9374 31.9929C16.7942 31.9929 16.6477 31.9686 16.5111 31.9201C16.3745 31.8716 16.2447 31.8024 16.1281 31.7089L14.1331 30.1433L10.8591 27.563L4.24125 22.4057L4.20129 22.378L4.18796 22.3641C3.49187 21.8203 2.88904 21.1623 2.39611 20.4176C1.90319 19.6729 1.53016 18.8486 1.29036 17.9792C1.05056 17.1099 0.947313 16.2059 0.98395 15.3019C1.02392 14.3979 1.20044 13.5078 1.51018 12.6626L1.55348 12.5414L5.90654 0.747936C5.92875 0.69021 5.95539 0.634792 5.98648 0.581684C6.01534 0.528576 6.04976 0.478931 6.08972 0.43275C6.12747 0.38426 6.16855 0.339234 6.21295 0.297671C6.25736 0.258417 6.30399 0.221472 6.35284 0.186836C6.45609 0.121028 6.56267 0.0725381 6.67924 0.0448295C6.79248 0.0136573 6.91238 -0.000196993 7.02895 0.00673016C7.14885 0.0136573 7.26542 0.0379024 7.37533 0.0829289C7.48524 0.124492 7.59181 0.186836 7.68507 0.263035C7.72948 0.302289 7.77278 0.343852 7.81496 0.387724C7.85493 0.433905 7.89046 0.483549 7.92154 0.536658C7.95485 0.587457 7.98371 0.641719 8.00814 0.699446C8.03256 0.754863 8.05254 0.812589 8.06809 0.872625L11.0023 10.2139H22.8792L25.8134 0.872625C25.8289 0.812589 25.85 0.754863 25.8767 0.699446C25.9011 0.644029 25.93 0.589766 25.9633 0.536658C25.9944 0.485858 26.0299 0.437368 26.0699 0.391187C26.1098 0.345006 26.1531 0.302289 26.1997 0.263035C26.293 0.186836 26.3962 0.127955 26.5062 0.0829289C26.6194 0.0413659 26.736 0.0171209 26.8525 0.0101937C26.9724 0.00326659 27.089 0.0136573 27.2056 0.0448295C27.3188 0.0760017 27.4287 0.124492 27.5286 0.1903C27.5797 0.222627 27.6275 0.259571 27.6719 0.301134C27.7163 0.340388 27.7573 0.38426 27.7951 0.43275C27.8328 0.48124 27.8673 0.532039 27.8983 0.585148C27.9272 0.638256 27.9527 0.693673 27.9749 0.751399L32.3213 12.5483L32.3646 12.6696C32.6744 13.5112 32.8509 14.4014 32.8875 15.3054Z" fill="#E24329" />
                <path d="M32.8909 15.309C32.9275 16.2095 32.8243 17.1135 32.5845 17.9829C32.3447 18.8523 31.9717 19.6766 31.4787 20.4213C30.9858 21.1659 30.383 21.824 29.6902 22.3678L29.6736 22.3816L23.0157 27.5701C23.0157 27.5701 20.1881 25.3499 16.9374 22.7903L26.4795 15.2813C26.9092 14.9453 27.3588 14.6371 27.8218 14.3531C28.2847 14.0656 28.7643 13.8093 29.2539 13.5807C29.7468 13.3521 30.2498 13.1477 30.7593 12.978C31.2722 12.8049 31.7918 12.6628 32.3214 12.5485L32.3647 12.6698C32.6744 13.5149 32.8509 14.405 32.8909 15.309Z" fill="#FC6D26" />
                <path d="M16.9374 22.7903C20.1881 25.343 23.0191 27.5701 23.0191 27.5701L19.7451 30.1504L17.7501 31.716C17.6335 31.8095 17.5036 31.8788 17.3671 31.9273C17.2305 31.9758 17.084 32 16.9374 32C16.7942 32 16.6477 31.9758 16.5111 31.9273C16.3746 31.8788 16.2447 31.8095 16.1281 31.716L14.1331 30.1504L10.8591 27.5701C10.8591 27.5701 13.6868 25.343 16.9374 22.7903Z" fill="#FCA326" />
                <path d="M16.9374 22.7834C13.6834 25.343 10.8591 27.5632 10.8591 27.5632L4.24125 22.4059L4.20129 22.3782L4.18796 22.3643C3.49187 21.8205 2.88904 21.1625 2.39611 20.4178C1.90319 19.6731 1.53016 18.8488 1.29036 17.9794C1.05056 17.1101 0.947313 16.2061 0.98395 15.3021C1.02392 14.3981 1.20044 13.508 1.51018 12.6628L1.55348 12.5416C2.08304 12.6559 2.60261 12.7979 3.11552 12.9711C3.6251 13.1443 4.12801 13.3452 4.62094 13.5772C5.11053 13.8058 5.59014 14.0656 6.05309 14.3496C6.51604 14.6336 6.96233 14.9453 7.39531 15.2813L16.9374 22.7834Z" fill="#FC6D26" />
              </svg>
              Gitlab_Store
              <svg className="shrink-0 size-4 ms-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {/* <!-- End Project Button --> */}

            {/* <!-- Dropdown --> */}
            <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-dnwpd">
              <div className="p-1 space-y-0.5">
                {/* <!-- Item --> */}
                <a className="py-2 px-3 block w-full text-start bg-stone-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <div className="flex items-center gap-x-2">
                    <svg className="shrink-0 size-5 text-stone-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    <svg className="shrink-0 size-7" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32.8875 15.3054C32.9242 16.2093 32.8209 17.1099 32.5811 17.9792C32.3447 18.8486 31.9716 19.6695 31.4787 20.4141C30.989 21.1593 30.3861 21.8167 29.6935 22.3607L29.6769 22.3745L23.019 27.563L19.7451 30.1433L17.7501 31.7089C17.6335 31.8024 17.5036 31.8716 17.3671 31.9201C17.2305 31.9686 17.084 31.9929 16.9374 31.9929C16.7942 31.9929 16.6477 31.9686 16.5111 31.9201C16.3745 31.8716 16.2447 31.8024 16.1281 31.7089L14.1331 30.1433L10.8591 27.563L4.24125 22.4057L4.20129 22.378L4.18796 22.3641C3.49187 21.8203 2.88904 21.1623 2.39611 20.4176C1.90319 19.6729 1.53016 18.8486 1.29036 17.9792C1.05056 17.1099 0.947313 16.2059 0.98395 15.3019C1.02392 14.3979 1.20044 13.5078 1.51018 12.6626L1.55348 12.5414L5.90654 0.747936C5.92875 0.69021 5.95539 0.634792 5.98648 0.581684C6.01534 0.528576 6.04976 0.478931 6.08972 0.43275C6.12747 0.38426 6.16855 0.339234 6.21295 0.297671C6.25736 0.258417 6.30399 0.221472 6.35284 0.186836C6.45609 0.121028 6.56267 0.0725381 6.67924 0.0448295C6.79248 0.0136573 6.91238 -0.000196993 7.02895 0.00673016C7.14885 0.0136573 7.26542 0.0379024 7.37533 0.0829289C7.48524 0.124492 7.59181 0.186836 7.68507 0.263035C7.72948 0.302289 7.77278 0.343852 7.81496 0.387724C7.85493 0.433905 7.89046 0.483549 7.92154 0.536658C7.95485 0.587457 7.98371 0.641719 8.00814 0.699446C8.03256 0.754863 8.05254 0.812589 8.06809 0.872625L11.0023 10.2139H22.8792L25.8134 0.872625C25.8289 0.812589 25.85 0.754863 25.8767 0.699446C25.9011 0.644029 25.93 0.589766 25.9633 0.536658C25.9944 0.485858 26.0299 0.437368 26.0699 0.391187C26.1098 0.345006 26.1531 0.302289 26.1997 0.263035C26.293 0.186836 26.3962 0.127955 26.5062 0.0829289C26.6194 0.0413659 26.736 0.0171209 26.8525 0.0101937C26.9724 0.00326659 27.089 0.0136573 27.2056 0.0448295C27.3188 0.0760017 27.4287 0.124492 27.5286 0.1903C27.5797 0.222627 27.6275 0.259571 27.6719 0.301134C27.7163 0.340388 27.7573 0.38426 27.7951 0.43275C27.8328 0.48124 27.8673 0.532039 27.8983 0.585148C27.9272 0.638256 27.9527 0.693673 27.9749 0.751399L32.3213 12.5483L32.3646 12.6696C32.6744 13.5112 32.8509 14.4014 32.8875 15.3054Z" fill="#E24329" />
                      <path d="M32.8909 15.309C32.9275 16.2095 32.8243 17.1135 32.5845 17.9829C32.3447 18.8523 31.9717 19.6766 31.4787 20.4213C30.9858 21.1659 30.383 21.824 29.6902 22.3678L29.6736 22.3816L23.0157 27.5701C23.0157 27.5701 20.1881 25.3499 16.9374 22.7903L26.4795 15.2813C26.9092 14.9453 27.3588 14.6371 27.8218 14.3531C28.2847 14.0656 28.7643 13.8093 29.2539 13.5807C29.7468 13.3521 30.2498 13.1477 30.7593 12.978C31.2722 12.8049 31.7918 12.6628 32.3214 12.5485L32.3647 12.6698C32.6744 13.5149 32.8509 14.405 32.8909 15.309Z" fill="#FC6D26" />
                      <path d="M16.9374 22.7903C20.1881 25.343 23.0191 27.5701 23.0191 27.5701L19.7451 30.1504L17.7501 31.716C17.6335 31.8095 17.5036 31.8788 17.3671 31.9273C17.2305 31.9758 17.084 32 16.9374 32C16.7942 32 16.6477 31.9758 16.5111 31.9273C16.3746 31.8788 16.2447 31.8095 16.1281 31.716L14.1331 30.1504L10.8591 27.5701C10.8591 27.5701 13.6868 25.343 16.9374 22.7903Z" fill="#FCA326" />
                      <path d="M16.9374 22.7834C13.6834 25.343 10.8591 27.5632 10.8591 27.5632L4.24125 22.4059L4.20129 22.3782L4.18796 22.3643C3.49187 21.8205 2.88904 21.1625 2.39611 20.4178C1.90319 19.6731 1.53016 18.8488 1.29036 17.9794C1.05056 17.1101 0.947313 16.2061 0.98395 15.3021C1.02392 14.3981 1.20044 13.508 1.51018 12.6628L1.55348 12.5416C2.08304 12.6559 2.60261 12.7979 3.11552 12.9711C3.6251 13.1443 4.12801 13.3452 4.62094 13.5772C5.11053 13.8058 5.59014 14.0656 6.05309 14.3496C6.51604 14.6336 6.96233 14.9453 7.39531 15.2813L16.9374 22.7834Z" fill="#FC6D26" />
                    </svg>
                    <div className="grow">
                      <p className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                        Gitlab_Store
                      </p>
                      <p className="text-xs text-stone-500 dark:text-neutral-500">
                        gitlab.com
                      </p>
                    </div>
                    <div className="ms-auto self-center">
                      <svg className="shrink-0 size-4 text-stone-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                </a>
                {/* <!-- End Item --> */}

                {/* <!-- Item --> */}
                <a className="py-2 px-3 block w-full text-start rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <div className="flex items-center gap-x-2">
                    <svg className="shrink-0 size-5 text-stone-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    <svg className="shrink-0 size-7" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27.462 6.28384C27.44 6.12384 27.2998 6.03529 27.184 6.02554C27.0684 6.01589 24.6215 5.83452 24.6215 5.83452C24.6215 5.83452 22.9221 4.1474 22.7355 3.96066C22.5489 3.77403 22.1844 3.8308 22.0429 3.87244C22.0221 3.87858 21.6716 3.98674 21.0919 4.16614C20.5243 2.53261 19.5224 1.03145 17.7599 1.03145C17.7112 1.03145 17.6611 1.03343 17.611 1.03628C17.1098 0.373373 16.4889 0.0853729 15.9525 0.0853729C11.8468 0.0853729 9.88524 5.21798 9.27023 7.82619C7.67483 8.32055 6.54146 8.672 6.39669 8.71748C5.50617 8.99682 5.47801 9.02488 5.36108 9.864C5.27308 10.4993 2.94299 28.5189 2.94299 28.5189L21.0995 31.9208L30.9373 29.7925C30.9373 29.7925 27.4837 6.44384 27.462 6.28384ZM20.0884 4.4765L18.5521 4.952C18.5526 4.84373 18.5532 4.73721 18.5532 4.62072C18.5532 3.60548 18.4123 2.78806 18.1862 2.14006C19.0943 2.25403 19.6992 3.28735 20.0884 4.4765ZM17.0596 2.34137C17.3121 2.97403 17.4763 3.88198 17.4763 5.10718C17.4763 5.16987 17.4757 5.22718 17.4752 5.28515C16.476 5.59463 15.3903 5.93063 14.3022 6.26773C14.9132 3.90981 16.0584 2.77096 17.0596 2.34137ZM15.8398 1.18663C16.017 1.18663 16.1955 1.2468 16.3663 1.36439C15.0505 1.98356 13.6401 3.54302 13.0445 6.65721L10.5364 7.43398C11.2341 5.05863 12.8907 1.18663 15.8398 1.18663Z" fill="#95BF46" />
                      <path d="M27.184 6.02553C27.0684 6.01589 24.6215 5.83452 24.6215 5.83452C24.6215 5.83452 22.9221 4.1474 22.7356 3.96066C22.6658 3.89118 22.5716 3.85556 22.4732 3.84022L21.1004 31.9205L30.9373 29.7925C30.9373 29.7925 27.4837 6.44383 27.462 6.28383C27.44 6.12383 27.2999 6.03529 27.184 6.02553Z" fill="#5E8E3E" />
                      <path d="M17.7599 11.4614L16.5469 15.0697C16.5469 15.0697 15.4841 14.5025 14.1813 14.5025C12.2714 14.5025 12.1753 15.701 12.1753 16.0031C12.1753 17.6511 16.4711 18.2825 16.4711 22.1427C16.4711 25.1797 14.5449 27.1353 11.9476 27.1353C8.83092 27.1353 7.23706 25.1956 7.23706 25.1956L8.07158 22.4384C8.07158 22.4384 9.70994 23.8449 11.0924 23.8449C11.9957 23.8449 12.3632 23.1337 12.3632 22.614C12.3632 20.4643 8.83881 20.3684 8.83881 16.8361C8.83881 13.863 10.9727 10.986 15.2802 10.986C16.94 10.986 17.7599 11.4614 17.7599 11.4614Z" fill="white" />
                    </svg>
                    <div className="grow">
                      <p className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                        Shopify_Store
                      </p>
                      <p className="text-xs text-stone-500 dark:text-neutral-500">
                        shopify.so
                      </p>
                    </div>
                    <div className="ms-auto self-center">
                      <svg className="hidden shrink-0 size-4 text-stone-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                </a>
                {/* <!-- End Item --> */}
              </div>

              <div className="p-1 border-t border-stone-200 dark:border-neutral-800">
                <button type="button" className="w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                  Add another store
                </button>
              </div>

              <div className="p-1 border-t border-stone-200 dark:border-neutral-800">
                <button type="button" className="w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  Sign out
                  <span className="ms-auto text-xs text-stone-500 dark:text-neutral-500">
                    preline@site.com
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- End Dropdown --> */}
          </div>
          {/* <!-- End Project Dropdown --> */}
        </div>
      </div>
    </nav>
  </header>
  {/* <!-- ========== END HEADER ========== --> */}

  {/* <!-- ========== MAIN CONTENT ========== --> */}
  <main id="content" className="pb-14 sm:pb-16">
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      {/* <!-- Breadcrumb --> */}
      <ol className="lg:hidden pt-5 flex items-center whitespace-nowrap">
        <li className="flex items-center text-sm text-stone-600 dark:text-neutral-500">
          E-commerce
          <svg className="shrink-0 overflow-visible size-4 ms-1.5 text-stone-400 dark:text-neutral-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round"></path>
          </svg>
        </li>
        <li className="ps-1.5 flex items-center font-semibold text-stone-800 dark:text-neutral-200 text-sm">
          Overview
        </li>
      </ol>
      {/* <!-- End Breadcrumb --> */}

      <div className="py-2 sm:pb-0 sm:pt-5 space-y-5">
        {/* <!-- Header --> */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
              Good morning, James.
            </h1>
            <p className="text-sm text-stone-500 dark:text-neutral-400">
              Here's what's happening with your store today.
            </p>
          </div>
        </div>
        {/* <!-- End Header --> */}

        {/* <!-- Stats Grid --> */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
          {/* <!-- Card --> */}
          <div className="p-4 sm:p-5 bg-white border border-stone-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="sm:flex sm:gap-x-3">
              <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
                <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
              </svg>
              <div className="sm:order-1 grow space-y-1">
                <h2 className="sm:mb-3 text-sm text-stone-500 dark:text-neutral-400">
                  In-store sales
                </h2>
                <p className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
                  $7,820.75
                </p>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <span className="text-sm leading-5 text-stone-500 dark:text-neutral-400">
                5k orders
              </span>
              <span className="inline-flex items-center gap-x-1 text-xs font-medium text-green-500 rounded-full">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
                4.3%
              </span>
            </div>
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <div className="p-4 sm:p-5 bg-white border border-stone-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="sm:flex sm:gap-x-3">
              <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <div className="sm:order-1 grow space-y-1">
                <h2 className="sm:mb-3 text-sm text-stone-500 dark:text-neutral-400">
                  Website sales
                </h2>
                <p className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
                  $985,937.45
                </p>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <span className="text-sm leading-5 text-stone-500 dark:text-neutral-400">
                21k orders
              </span>
              <span className="inline-flex items-center gap-x-1 text-xs font-medium text-green-500 rounded-full">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
                12.5%
              </span>
            </div>
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <div className="p-4 sm:p-5 bg-white border border-stone-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="sm:flex sm:gap-x-3">
              <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m15 9-6 6" />
                <path d="M9 9h.01" />
                <path d="M15 15h.01" />
              </svg>
              <div className="sm:order-1 grow space-y-1">
                <h2 className="sm:mb-3 text-sm text-stone-500 dark:text-neutral-400">
                  Discount
                </h2>
                <p className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
                  $15,503.00
                </p>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <span className="text-sm leading-5 text-stone-500 dark:text-neutral-400">
                6k orders
              </span>
            </div>
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <div className="p-4 sm:p-5 bg-white border border-stone-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="sm:flex sm:gap-x-3">
              <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
                <path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
                <rect width="8" height="8" x="14" y="14" rx="2" />
              </svg>
              <div className="sm:order-1 grow space-y-1">
                <h2 className="sm:mb-3 text-sm text-stone-500 dark:text-neutral-400">
                  Affiliate
                </h2>
                <p className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
                  $3,982.53
                </p>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-x-2">
              <span className="text-sm leading-5 text-stone-500 dark:text-neutral-400">
                2.4 orders
              </span>
              <span className="inline-flex items-center gap-x-1 text-xs font-medium text-red-500 rounded-full">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                  <polyline points="16 17 22 17 22 11"></polyline>
                </svg>
                4.4%
              </span>
            </div>
          </div>
          {/* <!-- End Card --> */}
        </div>
        {/* <!-- End Stats Grid --> */}

        <div className="xl:col-span-4 flex flex-col bg-white border border-stone-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          {/* <!-- Header --> */}
          <div className="py-3 px-5 flex flex-wrap justify-between items-center gap-2 border-b border-stone-200 dark:border-neutral-700">
            <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
              Orders
            </h2>

            <div className="flex justify-end items-center gap-x-2">
              {/* <!-- Calendar Dropdown --> */}
              <div className="hs-dropdown [--auto-close:inside] [--placement:top-right] inline-flex">
                <button id="hs-pro-dnic" type="button" className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-2xs hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  25 Jul - 25 Aug
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-79.5 sm:w-159 transition-[opacity,margin] duration opacity-0 hidden z-50 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-dnic">
                  {/* <!-- Calendar --> */}
                  <div className="sm:flex">
                    {/* <!-- Calendar --> */}
                    <div className="p-3 space-y-0.5">
                      {/* <!-- Months --> */}
                      <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                        {/* <!-- Prev Button --> */}
                        <div className="col-span-1">
                          <button type="button" className="size-8 flex justify-center items-center text-stone-800 hover:bg-stone-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Previous">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </button>
                        </div>
                        {/* <!-- End Prev Button --> */}

                        {/* <!-- Month / Year --> */}
                        <div className="col-span-3 flex justify-center items-center gap-x-1">
                          <div className="relative">
                            <select data-hs-select='{
                                "placeholder": "Select month",
                                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-stone-800 hover:text-stone-600 focus:outline-hidden focus:text-stone-600 before:absolute before:inset-0 before:z-1 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                                "dropdownClasses": "mt-2 z-50 w-32 max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                "optionClasses": "p-2 w-full text-sm text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                              }' className="hidden">
                              <option value="0">January</option>
                              <option value="1">February</option>
                              <option value="2">March</option>
                              <option value="3">April</option>
                              <option value="4">May</option>
                              <option value="5">June</option>
                              <option value="6" selected>July</option>
                              <option value="7">August</option>
                              <option value="8">September</option>
                              <option value="9">October</option>
                              <option value="10">November</option>
                              <option value="11">December</option>
                            </select>
                          </div>

                          <span className="text-stone-800 dark:text-neutral-200">/</span>

                          <div className="relative">
                            <select data-hs-select='{
                                "placeholder": "Select year",
                                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-stone-800 hover:text-stone-600 focus:outline-hidden focus:text-stone-600 before:absolute before:inset-0 before:z-1 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                                "dropdownClasses": "mt-2 z-50 w-20 max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                "optionClasses": "p-2 w-full text-sm text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                              }' className="hidden">
                              <option selected>2023</option>
                              <option>2024</option>
                              <option>2025</option>
                              <option>2026</option>
                              <option>2027</option>
                            </select>
                          </div>
                        </div>
                        {/* <!-- End Month / Year --> */}

                        {/* <!-- Next Button --> */}
                        <div className="col-span-1 flex justify-end">
                          <button type="button" className="opacity-0 pointer-events-none size-8 flex justify-center items-center text-stone-800 hover:bg-stone-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Next">
                            <svg className="shrink-0 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button>
                        </div>
                        {/* <!-- End Next Button --> */}
                      </div>
                      {/* <!-- Months --> */}

                      {/* <!-- Weeks --> */}
                      <div className="flex pb-1.5">
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Mo
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Tu
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          We
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Th
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Fr
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Sa
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Su
                        </span>
                      </div>
                      {/* <!-- Weeks --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200" disabled>
                            26
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200" disabled>
                            27
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200" disabled>
                            28
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200" disabled>
                            29
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200" disabled>
                            30
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            1
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            2
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            3
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            4
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            5
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            6
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            7
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            8
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            9
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            10
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            11
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            12
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            13
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            14
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            15
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            16
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            17
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            18
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            19
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            20
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            21
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            22
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            23
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            24
                          </button>
                        </div>
                        <div className="bg-stone-100 rounded-s-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center bg-green-600 border border-transparent text-sm font-medium text-white hover:border-green-600 rounded-full dark:bg-green-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:hover:border-neutral-700">
                            25
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            26
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            27
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            28
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            29
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            30
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            31
                          </button>
                        </div>
                        <div className="bg-linear-to-r from-stone-100 dark:from-stone-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            1
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            2
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            3
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            4
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            5
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            6
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}
                    </div>
                    {/* <!-- End Calendar --> */}

                    {/* <!-- Calendar --> */}
                    <div className="p-3 space-y-0.5">
                      {/* <!-- Months --> */}
                      <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                        {/* <!-- Prev Button --> */}
                        <div className="col-span-1">
                          <button type="button" className="opacity-0 pointer-events-none size-8 flex justify-center items-center text-stone-800 hover:bg-stone-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Previous">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </button>
                        </div>
                        {/* <!-- End Prev Button --> */}

                        {/* <!-- Month / Year --> */}
                        <div className="col-span-3 flex justify-center items-center gap-x-1">
                          <div className="relative">
                            <select data-hs-select='{
                                "placeholder": "Select month",
                                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-stone-800 hover:text-stone-600 focus:outline-hidden focus:text-stone-600 before:absolute before:inset-0 before:z-1 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                                "dropdownClasses": "mt-2 z-50 w-32 max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                "optionClasses": "p-2 w-full text-sm text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                              }' className="hidden">
                              <option value="0">January</option>
                              <option value="1">February</option>
                              <option value="2">March</option>
                              <option value="3">April</option>
                              <option value="4">May</option>
                              <option value="5">June</option>
                              <option value="6" selected>July</option>
                              <option value="7">August</option>
                              <option value="8">September</option>
                              <option value="9">October</option>
                              <option value="10">November</option>
                              <option value="11">December</option>
                            </select>
                          </div>

                          <span className="text-stone-800 dark:text-neutral-200">/</span>

                          <div className="relative">
                            <select data-hs-select='{
                                "placeholder": "Select year",
                                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-stone-800 hover:text-stone-600 focus:outline-hidden focus:text-stone-600 before:absolute before:inset-0 before:z-1 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                                "dropdownClasses": "mt-2 z-50 w-20 max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                "optionClasses": "p-2 w-full text-sm text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                              }' className="hidden">
                              <option selected>2023</option>
                              <option>2024</option>
                              <option>2025</option>
                              <option>2026</option>
                              <option>2027</option>
                            </select>
                          </div>
                        </div>
                        {/* <!-- End Month / Year --> */}

                        {/* <!-- Next Button --> */}
                        <div className="col-span-1 flex justify-end">
                          <button type="button" className="size-8 flex justify-center items-center text-stone-800 hover:bg-stone-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Next">
                            <svg className="shrink-0 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button>
                        </div>
                        {/* <!-- End Next Button --> */}
                      </div>
                      {/* <!-- Months --> */}

                      {/* <!-- Weeks --> */}
                      <div className="flex pb-1.5">
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Mo
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Tu
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          We
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Th
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Fr
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Sa
                        </span>
                        <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                          Su
                        </span>
                      </div>
                      {/* <!-- Weeks --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div className="bg-linear-to-l from-stone-100 dark:from-stone-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            31
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700">
                            1
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700">
                            2
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700">
                            3
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700">
                            4
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            5
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            6
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            7
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            8
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            9
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            10
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            11
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            12
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            13
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            14
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            15
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            16
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            17
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            18
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            19
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            20
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            21
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            22
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            23
                          </button>
                        </div>
                        <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            24
                          </button>
                        </div>
                        <div className="bg-stone-100 rounded-e-full dark:bg-neutral-800">
                          <button type="button" className="m-px size-10 flex justify-center items-center bg-green-600 border border-transparent text-sm font-medium text-white hover:border-green-600 rounded-full dark:bg-green-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:hover:border-neutral-700">
                            25
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            26
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            27
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            28
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            29
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            30
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-green-600 focus:text-green-600 dark:text-neutral-200">
                            31
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            1
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            2
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            3
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Days --> */}
                      <div className="flex">
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            4
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            5
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            6
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            7
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            8
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            9
                          </button>
                        </div>
                        <div>
                          <button type="button" className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700" disabled>
                            10
                          </button>
                        </div>
                      </div>
                      {/* <!-- Days --> */}

                      {/* <!-- Button Group --> */}
                      <div className="pt-4 flex justify-end gap-x-2">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-2xs hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#hs-pro-edmad">
                          Cancel
                        </button>
                        <button type="button" className="py-2 px-3  inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-green-500" data-hs-overlay="#hs-pro-edmad">
                          Apply
                        </button>
                      </div>
                      {/* <!-- End Button Group --> */}
                    </div>
                    {/* <!-- End Calendar --> */}
                  </div>
                  {/* <!-- End Calendar --> */}
                </div>
              </div>
              {/* <!-- End Calendar Dropdown --> */}

              {/* <!-- Add Activity Dropdown --> */}
              <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                {/* <!-- Button --> */}
                <button id="hs-pro-daaad" type="button" className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-2xs hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <svg className="hidden sm:block shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add activity
                </button>
                {/* <!-- End Button --> */}

                {/* <!-- Add Activity Dropdown --> */}
                <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-daaad">
                  <div className="p-1">
                    <div className="flex justify-between items-center py-1.5 px-2 cursor-pointer rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600">
                      <label for="hs-pro-dachdds1" className="flex flex-1 items-center gap-x-3 cursor-pointer text-[13px] text-stone-800 dark:text-neutral-300">
                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                          <polyline points="16 7 22 7 22 13" />
                        </svg>
                        Revenue
                      </label>
                      <input type="checkbox" className="shrink-0 size-3.5 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800" id="hs-pro-dachdds1" checked/>
                    </div>

                    <div className="flex justify-between items-center py-1.5 px-2 cursor-pointer rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600">
                      <label for="hs-pro-dachdds2" className="flex flex-1 items-center gap-x-3 cursor-pointer text-[13px] text-stone-800 dark:text-neutral-300">
                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M14.5 22H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M2.97 13.12c-.6.36-.97 1.02-.97 1.74v3.28c0 .72.37 1.38.97 1.74l3 1.83c.63.39 1.43.39 2.06 0l3-1.83c.6-.36.97-1.02.97-1.74v-3.28c0-.72-.37-1.38-.97-1.74l-3-1.83a1.97 1.97 0 0 0-2.06 0l-3 1.83Z"></path>
                          <path d="m7 17-4.74-2.85"></path>
                          <path d="m7 17 4.74-2.85"></path>
                          <path d="M7 17v5"></path>
                        </svg>
                        Orders
                      </label>
                      <input type="checkbox" className="shrink-0 size-3.5 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800" id="hs-pro-dachdds2" checked/>
                    </div>

                    <div className="flex justify-between items-center py-1.5 px-2 cursor-pointer rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600">
                      <label for="hs-pro-dachdds3" className="flex flex-1 items-center gap-x-3 cursor-pointer text-[13px] text-stone-800 dark:text-neutral-300">
                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="9 10 4 15 9 20" />
                          <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                        </svg>
                        Refunds
                      </label>
                      <input type="checkbox" className="shrink-0 size-3.5 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800" id="hs-pro-dachdds3"/>
                    </div>
                  </div>
                </div>
                {/* <!-- End Add Activity Dropdown --> */}
              </div>
              {/* <!-- End Add Activity Dropdown --> */}
            </div>
          </div>
          {/* <!-- End Header --> */}

          {/* <!-- Body --> */}
          <div className="grid md:grid-cols-8 divide-x divide-stone-200 dark:divide-neutral-600">
            <div className="md:col-span-5 lg:col-span-6 p-5">
              {/* <!-- Apex Line Chart --> */}
              <div id="hs-orders-bar-chart" className="min-h-[265px] -mx-2"></div>

              {/* <!-- Legen Indicator --> */}
              <div className="flex justify-center items-center gap-x-4">
                <div className="inline-flex items-center">
                  <span className="size-2.5 inline-block bg-green-500 rounded-xs me-2 dark:bg-green-500"></span>
                  <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                    In-store
                  </span>
                </div>
                <div className="inline-flex items-center">
                  <span className="size-2.5 inline-block bg-stone-300 rounded-xs me-2 dark:bg-neutral-700"></span>
                  <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                    Online
                  </span>
                </div>
              </div>
              {/* <!-- End Legen Indicator --> */}
            </div>
            {/* <!-- End Col --> */}

            <div className="md:col-span-3 lg:col-span-2">
              <div className="p-2">
                {/* <!-- Card --> */}
                <div className="p-2 bg-white dark:bg-neutral-800 dark:border-neutral-800">
                  {/* <!-- Nav Tab --> */}
                  <nav className="flex gap-1 relative after:absolute after:bottom-0 after:inset-x-0 after:border-b-2 after:border-stone-200 dark:after:border-neutral-700" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                    <button type="button" className="hs-tab-active:after:bg-stone-800 hs-tab-active:text-stone-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-stone-100 text-stone-500 hover:text-stone-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden active" id="hs-pro-tabs-dtsch-item-orders" aria-selected="true" data-hs-tab="#hs-pro-tabs-dtsch-orders" aria-controls="hs-pro-tabs-dtsch-orders" role="tab">
                      Orders
                    </button>
                    <button type="button" className="hs-tab-active:after:bg-stone-800 hs-tab-active:text-stone-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-stone-100 text-stone-500 hover:text-stone-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden " id="hs-pro-tabs-dtsch-item-sales" aria-selected="false" data-hs-tab="#hs-pro-tabs-dtsch-sales" aria-controls="hs-pro-tabs-dtsch-sales" role="tab">
                      Sales
                    </button>
                  </nav>
                  {/* <!-- End Nav Tab --> */}

                  <div>
                    {/* <!-- Tab Content --> */}
                    <div id="hs-pro-tabs-dtsch-orders" role="tabpanel" aria-labelledby="hs-pro-tabs-dtsch-item-orders">
                      <div className="py-4">
                        <h4 className="font-semibold text-xl md:text-2xl text-stone-800 dark:text-white">
                          125,090
                        </h4>

                        {/* <!-- Progress --> */}
                        <div className="relative mt-3">
                          <div className="flex w-full h-2 bg-stone-200 rounded-sm overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100">
                            <div className="flex flex-col justify-center rounded-sm overflow-hidden bg-green-600 text-xs text-white text-center whitespace-nowrap transition duration-500" style="width: 72%"></div>
                          </div>
                          <div className="absolute top-1/2 start-[71%] w-2 h-5 bg-green-600 border-2 border-white rounded-sm transform -translate-y-1/2 dark:border-neutral-800"></div>
                        </div>
                        {/* <!-- End Progress --> */}

                        {/* <!-- Progress Status --> */}
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-stone-800 dark:text-white">
                            0.00
                          </span>
                          <span className="text-xs text-stone-800 dark:text-white">
                            200,000
                          </span>
                        </div>
                        {/* <!-- End Progress Status --> */}

                        <p className="mt-4 text-sm text-stone-600 dark:text-neutral-400">
                          A project-wise breakdown of total orders complemented by detailed insights.
                        </p>
                      </div>
                    </div>
                    {/* <!-- End Tab Content --> */}

                    {/* <!-- Tab Content --> */}
                    <div id="hs-pro-tabs-dtsch-sales" className="hidden" role="tabpanel" aria-labelledby="hs-pro-tabs-dtsch-item-sales">
                      <div className="py-4">
                        <h4 className="font-semibold text-xl md:text-2xl text-stone-800 dark:text-white">
                          $993,758.20
                        </h4>

                        {/* <!-- Progress --> */}
                        <div className="relative mt-3">
                          <div className="flex w-full h-2 bg-stone-200 rounded-sm overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="47" aria-valuemin="0" aria-valuemax="100">
                            <div className="flex flex-col justify-center rounded-sm overflow-hidden bg-green-600 text-xs text-white text-center whitespace-nowrap transition duration-500" style="width: 47%"></div>
                          </div>
                          <div className="absolute top-1/2 start-[46%] w-2 h-5 bg-green-600 border-2 border-white rounded-sm transform -translate-y-1/2 dark:border-neutral-800"></div>
                        </div>
                        {/* <!-- End Progress --> */}

                        {/* <!-- Progress Status --> */}
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-stone-800 dark:text-white">
                            0.00
                          </span>
                          <span className="text-xs text-stone-800 dark:text-white">
                            $2mln
                          </span>
                        </div>
                        {/* <!-- End Progress Status --> */}

                        <p className="mt-4 text-sm text-stone-600 dark:text-neutral-400">
                          A project-wise breakdown of total orders complemented by detailed insights.
                        </p>
                      </div>
                    </div>
                    {/* <!-- End Tab Content --> */}
                  </div>
                </div>
                {/* <!-- End Card --> */}

                <div>
                  {/* <!-- Link --> */}
                  <a className="p-2 flex items-center gap-x-2 text-sm font-medium text-stone-800 rounded-lg hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-green-500 dark:focus:bg-neutral-700" href="#">
                    <span className="flex shrink-0 justify-center items-center size-7 bg-white border border-stone-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                      <svg className="shrink-0 size-3.5 text-green-600 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                      </svg>
                    </span>
                    <div className="grow">
                      <p>
                        Show all highlights
                      </p>
                    </div>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </a>
                  {/* <!-- End Link --> */}

                  {/* <!-- Link --> */}
                  <a className="p-2 flex items-center gap-x-2 text-sm font-medium text-stone-800 rounded-lg hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-green-500 dark:focus:bg-neutral-700" href="#">
                    <span className="flex shrink-0 justify-center items-center size-7 bg-white border border-stone-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                      <svg className="shrink-0 size-3.5 text-green-600 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                      </svg>
                    </span>
                    <div className="grow">
                      <p>
                        Show all sales data
                      </p>
                    </div>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </a>
                  {/* <!-- End Link --> */}
                </div>
              </div>
            </div>
            {/* <!-- End Col --> */}
          </div>
          {/* <!-- End Body --> */}
        </div>

        {/* <!-- Products Table Card --> */}
        <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          {/* <!-- Card Grid --> */}
          <div className="mb-3 pb-2 flex flex-row justify-between gap-4 overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {/* <!-- Card --> */}
            <a className="min-w-57.5 max-w-57.5 group p-4 inline-flex flex-col justify-center items-center text-center bg-white border border-stone-200 rounded-xl shadow-2xs hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
              <svg className="size-9 text-stone-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 11 18-5v12L3 14v-3z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
              </svg>
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-stone-800 group-hover:text-green-600 group-focus:text-green-600 dark:text-neutral-200 dark:group-hover:text-green-500 dark:group-focus:text-green-500">
                  Product
                </h3>
                <p className="text-[13px] text-stone-500 dark:text-neutral-500">
                  We can help to turn your great idea into a success
                </p>
              </div>
            </a>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <a className="min-w-57.5 max-w-57.5 group p-4 inline-flex flex-col justify-center items-center text-center bg-white border border-stone-200 rounded-xl shadow-2xs hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
              <svg className="size-9 text-stone-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m15 9-6 6" />
                <path d="M9 9h.01" />
                <path d="M15 15h.01" />
              </svg>
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-stone-800 group-hover:text-green-600 group-focus:text-green-600 dark:text-neutral-200 dark:group-hover:text-green-500 dark:group-focus:text-green-500">
                  Discount
                </h3>
                <p className="text-[13px] text-stone-500 dark:text-neutral-500">
                  Attract new customers or reward loyal customers
                </p>
              </div>
            </a>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <a className="min-w-57.5 max-w-57.5 group p-4 inline-flex flex-col justify-center items-center text-center bg-white border border-stone-200 rounded-xl shadow-2xs hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
              <svg className="size-9 text-stone-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
                <path d="m7 16.5-4.74-2.85" />
                <path d="m7 16.5 5-3" />
                <path d="M7 16.5v5.17" />
                <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
                <path d="m17 16.5-5-3" />
                <path d="m17 16.5 4.74-2.85" />
                <path d="M17 16.5v5.17" />
                <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
                <path d="M12 8 7.26 5.15" />
                <path d="m12 8 4.74-2.85" />
              </svg>
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-stone-800 group-hover:text-green-600 group-focus:text-green-600 dark:text-neutral-200 dark:group-hover:text-green-500 dark:group-focus:text-green-500">
                  Collection
                </h3>
                <p className="text-[13px] text-stone-500 dark:text-neutral-500">
                  Create a new collection of products
                </p>
              </div>
            </a>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <a className="min-w-57.5 max-w-57.5 group p-4 inline-flex flex-col justify-center items-center text-center bg-white border border-stone-200 rounded-xl shadow-2xs hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
              <svg className="size-9 text-stone-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-stone-800 group-hover:text-green-600 group-focus:text-green-600 dark:text-neutral-200 dark:group-hover:text-green-500 dark:group-focus:text-green-500">
                  Get paid
                </h3>
                <p className="text-[13px] text-stone-500 dark:text-neutral-500">
                  Receive money with Preline's fast and secure payment
                </p>
              </div>
            </a>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <a className="min-w-57.5 max-w-57.5 group p-4 inline-flex flex-col justify-center items-center text-center bg-white border border-stone-200 rounded-xl shadow-2xs hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
              <svg className="size-9 text-stone-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="8" width="18" height="4" rx="1" />
                <path d="M12 8v13" />
                <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
              </svg>
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-stone-800 group-hover:text-green-600 group-focus:text-green-600 dark:text-neutral-200 dark:group-hover:text-green-500 dark:group-focus:text-green-500">
                  Preline products
                </h3>
                <p className="text-[13px] text-stone-500 dark:text-neutral-500">
                  A collection of 100+ Preline products and more
                </p>
              </div>
            </a>
            {/* <!-- End Card --> */}
          </div>

          {/* <!-- Filter Group --> */}
          <div className="pb-4 flex justify-between items-center flex-wrap gap-2 md:gap-5 border-b border-stone-200 dark:border-neutral-700">
            <div>
              <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                Top products
              </h2>
            </div>
            {/* <!-- End Col --> */}

            <div>
              {/* <!-- Search Input --> */}
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                  <svg className="shrink-0 size-4 text-stone-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input type="text" className="py-1.5 sm:py-2 ps-10 pe-8 block w-full min-w-75 bg-stone-100 border-transparent rounded-lg sm:text-sm placeholder:text-stone-500 focus:bg-white focus:border-green-500 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600" placeholder="Search products"/>
                <div className="hidden absolute inset-y-0 end-0 flex items-center z-20 pe-1">
                  <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* <!-- End Search Input --> */}
            </div>
            {/* <!-- End Col --> */}
          </div>
          {/* <!-- End Filter Group --> */}

          <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="min-w-full inline-block align-middle">
              {/* <!-- Table --> */}
              <table className="min-w-full divide-y divide-stone-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th scope="col" className="ps-3 text-start">
                      <input type="checkbox" className="shrink-0 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800"/>
                    </th>

                    <th scope="col" className="min-w-75 lg:min-w-125">
                      {/* <!-- Sort Dropdown --> */}
                      <div className="hs-dropdown relative inline-flex w-full cursor-pointer">
                        <button id="hs-pro-eptits" type="button" className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-stone-500 focus:outline-hidden focus:bg-stone-100 dark:text-neutral-500 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          Item
                          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                          </svg>
                        </button>

                        {/* <!-- Dropdown --> */}
                        <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-eptits">
                          <div className="p-1">
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m5 12 7-7 7 7" />
                                <path d="M12 19V5" />
                              </svg>
                              Sort ascending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                              </svg>
                              Sort descending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                              </svg>
                              Move left
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                              Move right
                            </button>

                            <div className="my-1 border-t border-stone-200 dark:border-neutral-800"></div>

                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                <line x1="2" x2="22" y1="2" y2="22" />
                              </svg>
                              Hide in view
                            </button>
                          </div>
                        </div>
                        {/* <!-- End Dropdown --> */}
                      </div>
                      {/* <!-- End Sort Dropdown --> */}
                    </th>

                    <th scope="col">
                      {/* <!-- Sort Dropdown --> */}
                      <div className="hs-dropdown relative inline-flex w-full cursor-pointer">
                        <button id="hs-pro-eptchs" type="button" className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-stone-500 focus:outline-hidden focus:bg-stone-100 dark:text-neutral-500 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          Change
                          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                          </svg>
                        </button>

                        {/* <!-- Dropdown --> */}
                        <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-eptchs">
                          <div className="p-1">
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m5 12 7-7 7 7" />
                                <path d="M12 19V5" />
                              </svg>
                              Sort ascending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                              </svg>
                              Sort descending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                              </svg>
                              Move left
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                              Move right
                            </button>

                            <div className="my-1 border-t border-stone-200 dark:border-neutral-800"></div>

                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                <line x1="2" x2="22" y1="2" y2="22" />
                              </svg>
                              Hide in view
                            </button>
                          </div>
                        </div>
                        {/* <!-- End Dropdown --> */}
                      </div>
                      {/* <!-- End Sort Dropdown --> */}
                    </th>

                    <th scope="col">
                      {/* <!-- Sort Dropdown --> */}
                      <div className="hs-dropdown relative inline-flex w-full cursor-pointer">
                        <button id="hs-pro-eptprs" type="button" className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-stone-500 focus:outline-hidden focus:bg-stone-100 dark:text-neutral-500 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          Price
                          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                          </svg>
                        </button>

                        {/* <!-- Dropdown --> */}
                        <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-eptprs">
                          <div className="p-1">
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m5 12 7-7 7 7" />
                                <path d="M12 19V5" />
                              </svg>
                              Sort ascending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                              </svg>
                              Sort descending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                              </svg>
                              Move left
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                              Move right
                            </button>

                            <div className="my-1 border-t border-stone-200 dark:border-neutral-800"></div>

                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                <line x1="2" x2="22" y1="2" y2="22" />
                              </svg>
                              Hide in view
                            </button>
                          </div>
                        </div>
                        {/* <!-- End Dropdown --> */}
                      </div>
                      {/* <!-- End Sort Dropdown --> */}
                    </th>

                    <th scope="col">
                      {/* <!-- Sort Dropdown --> */}
                      <div className="hs-dropdown relative inline-flex w-full cursor-pointer">
                        <button id="hs-pro-eptsls" type="button" className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-stone-500 focus:outline-hidden focus:bg-stone-100 dark:text-neutral-500 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          Sold
                          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                          </svg>
                        </button>

                        {/* <!-- Dropdown --> */}
                        <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-eptsls">
                          <div className="p-1">
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m5 12 7-7 7 7" />
                                <path d="M12 19V5" />
                              </svg>
                              Sort ascending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                              </svg>
                              Sort descending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                              </svg>
                              Move left
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                              Move right
                            </button>

                            <div className="my-1 border-t border-stone-200 dark:border-neutral-800"></div>

                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                <line x1="2" x2="22" y1="2" y2="22" />
                              </svg>
                              Hide in view
                            </button>
                          </div>
                        </div>
                        {/* <!-- End Dropdown --> */}
                      </div>
                      {/* <!-- End Sort Dropdown --> */}
                    </th>

                    <th scope="col">
                      {/* <!-- Sort Dropdown --> */}
                      <div className="hs-dropdown relative inline-flex w-full cursor-pointer">
                        <button id="hs-pro-eptsas" type="button" className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-stone-500 focus:outline-hidden focus:bg-stone-100 dark:text-neutral-500 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          Sales
                          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                          </svg>
                        </button>

                        {/* <!-- Dropdown --> */}
                        <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-eptsas">
                          <div className="p-1">
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m5 12 7-7 7 7" />
                                <path d="M12 19V5" />
                              </svg>
                              Sort ascending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                              </svg>
                              Sort descending
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                              </svg>
                              Move left
                            </button>
                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                              Move right
                            </button>

                            <div className="my-1 border-t border-stone-200 dark:border-neutral-800"></div>

                            <button type="button" className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                <line x1="2" x2="22" y1="2" y2="22" />
                              </svg>
                              Hide in view
                            </button>
                          </div>
                        </div>
                        {/* <!-- End Dropdown --> */}
                      </div>
                      {/* <!-- End Sort Dropdown --> */}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-200 dark:divide-neutral-700">
                  <tr className="hover:bg-stone-100 cursor-pointer dark:hover:bg-neutral-700/50">
                    <td className="size-px whitespace-nowrap ps-3 py-3 align-top">
                      <input type="checkbox" className="shrink-0 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800"/>
                    </td>
                    <td className="size-px py-3 px-5 relative">
                      <a className="before:z-9 before:absolute before:inset-0" href="#"></a>
                      <div className="w-full flex items-center gap-x-3">
                        <img className="shrink-0 size-9.5 rounded-md" src="https://images.unsplash.com/photo-1528310385748-dba09bf1657a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&h=320&q=80" alt="Product Image"/>
                        <div className="grow">
                          <span className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Google Home
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        72%
                        <span className="inline-block text-red-500">
                          3.1%
                          <svg className="inline-block align-middle size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                            <polyline points="16 17 22 17 22 11"></polyline>
                          </svg>
                        </span>
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        $65
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        7,545
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="font-semibold text-sm text-stone-800 dark:text-neutral-200">
                        $15,302.00
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-stone-100 cursor-pointer dark:hover:bg-neutral-700/50">
                    <td className="size-px whitespace-nowrap ps-3 py-3 align-top">
                      <input type="checkbox" className="shrink-0 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800"/>
                    </td>
                    <td className="size-px py-3 px-5 relative">
                      <a className="before:z-9 before:absolute before:inset-0" href="#"></a>
                      <div className="w-full flex items-center gap-x-3">
                        <img className="shrink-0 size-9.5 rounded-md" src="https://images.unsplash.com/photo-1613852348851-df1739db8201?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&h=320&q=80" alt="Product Image"/>
                        <div className="grow">
                          <span className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Calvin Klein T-shirts
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        50%
                        <span className="inline-block text-green-500">
                          47%
                          <svg className="inline-block align-middle size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                        </span>
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        $89
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        4,714
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="font-semibold text-sm text-stone-800 dark:text-neutral-200">
                        $8,466.02
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-stone-100 cursor-pointer dark:hover:bg-neutral-700/50">
                    <td className="size-px whitespace-nowrap ps-3 py-3 align-top">
                      <input type="checkbox" className="shrink-0 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800"/>
                    </td>
                    <td className="size-px py-3 px-5 relative">
                      <a className="before:z-9 before:absolute before:inset-0" href="#"></a>
                      <div className="w-full flex items-center gap-x-3">
                        <img className="shrink-0 size-9.5 rounded-md" src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&h=320&q=80" alt="Product Image"/>
                        <div className="grow">
                          <span className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                            RayBan black sunglasses
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        65%
                        <span className="inline-block text-red-500">
                          0.9%
                          <svg className="inline-block align-middle size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                            <polyline points="16 17 22 17 22 11"></polyline>
                          </svg>
                        </span>
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        $37
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        5,951
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="font-semibold text-sm text-stone-800 dark:text-neutral-200">
                        $10,351.71
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-stone-100 cursor-pointer dark:hover:bg-neutral-700/50">
                    <td className="size-px whitespace-nowrap ps-3 py-3 align-top">
                      <input type="checkbox" className="shrink-0 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800"/>
                    </td>
                    <td className="size-px py-3 px-5 relative">
                      <a className="before:z-9 before:absolute before:inset-0" href="#"></a>
                      <div className="w-full flex items-center gap-x-3">
                        <img className="shrink-0 size-9.5 rounded-md" src="https://images.unsplash.com/photo-1610398752800-146f269dfcc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&h=320&q=80" alt="Product Image"/>
                        <div className="grow">
                          <span className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Mango Women's shoe
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        53%
                        <span className="inline-block text-red-500">
                          0.1%
                          <svg className="inline-block align-middle size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                            <polyline points="16 17 22 17 22 11"></polyline>
                          </svg>
                        </span>
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        $65
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        5,002
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="font-semibold text-sm text-stone-800 dark:text-neutral-200">
                        $9,917.45
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-stone-100 cursor-pointer dark:hover:bg-neutral-700/50">
                    <td className="size-px whitespace-nowrap ps-3 py-3 align-top">
                      <input type="checkbox" className="shrink-0 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800"/>
                    </td>
                    <td className="size-px py-3 px-5 relative">
                      <a className="before:z-9 before:absolute before:inset-0" href="#"></a>
                      <div className="w-full flex items-center gap-x-3">
                        <img className="shrink-0 size-9.5 rounded-md" src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&h=320&q=80" alt="Product Image"/>
                        <div className="grow">
                          <span className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Plain white sweater
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        69%
                        <span className="inline-block text-green-500">
                          14.2%
                          <svg className="inline-block align-middle size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                        </span>
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        $21
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        6,643
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="font-semibold text-sm text-stone-800 dark:text-neutral-200">
                        $12,492.21
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-stone-100 cursor-pointer dark:hover:bg-neutral-700/50">
                    <td className="size-px whitespace-nowrap ps-3 py-3 align-top">
                      <input type="checkbox" className="shrink-0 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800"/>
                    </td>
                    <td className="size-px py-3 px-5 relative">
                      <a className="before:z-9 before:absolute before:inset-0" href="#"></a>
                      <div className="w-full flex items-center gap-x-3">
                        <img className="shrink-0 size-9.5 rounded-md" src="https://images.unsplash.com/photo-1611911813383-67769b37a149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&h=320&q=80" alt="Product Image"/>
                        <div className="grow">
                          <a className="text-sm font-medium text-stone-800 hover:text-green-600 decoration-2 hover:underline focus:outline-hidden focus:underline focus:text-green-600 dark:text-neutral-200 dark:hover:text-green-500 dark:focus:text-green-500" href="../../pro/ecommerce/product-details.html">
                            Pattern Winter Sweater
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        42%
                        <span className="inline-block text-green-500">
                          8.1%
                          <svg className="inline-block align-middle size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                        </span>
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        $47
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        3,391
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="font-semibold text-sm text-stone-800 dark:text-neutral-200">
                        $7,089.10
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-stone-100 cursor-pointer dark:hover:bg-neutral-700/50">
                    <td className="size-px whitespace-nowrap ps-3 py-3 align-top">
                      <input type="checkbox" className="shrink-0 border-stone-300 rounded-sm text-green-600 focus:ring-green-600 checked:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-neutral-800"/>
                    </td>
                    <td className="size-px py-3 px-5 relative">
                      <a className="before:z-9 before:absolute before:inset-0" href="#"></a>
                      <div className="w-full flex items-center gap-x-3">
                        <img className="shrink-0 size-9.5 rounded-md" src="https://images.unsplash.com/photo-1616969899621-0ea269426a21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&h=320&q=80" alt="Product Image"/>
                        <div className="grow">
                          <span className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                            White Blazer by Armani
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        11%
                        <span className="inline-block text-red-500">
                          0.3%
                          <svg className="inline-block align-middle size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                            <polyline points="16 17 22 17 22 11"></polyline>
                          </svg>
                        </span>
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        $17
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="text-sm text-stone-600 dark:text-neutral-400">
                        4,191
                      </span>
                    </td>
                    <td className="size-px whitespace-nowrap py-3 px-5">
                      <span className="font-semibold text-sm text-stone-800 dark:text-neutral-200">
                        $8,610
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <!-- End Table --> */}
            </div>
          </div>

          {/* <!-- Footer --> */}
          <div className="mt-5 flex flex-wrap justify-between items-center gap-2">
            {/* <!-- Select --> */}
            <div className="relative inline-block">
              <select data-hs-select='{
                  "placeholder": "Select option...",
                  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-3 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-stone-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
                  "dropdownClasses": "mt-2 z-50 w-16 max-h-72 p-1 space-y-0.5 overflow-hidden overflow-y-auto bg-white rounded-xl shadow-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                  "optionClasses": "hs-selected:bg-stone-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-[13px] text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
                  "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                }' className="hidden">
                <option value="">Choose</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option selected>5</option>
                <option>6</option>
                <option>7</option>
              </select>

              <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                <svg className="shrink-0 size-3.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>
            </div>
            {/* <!-- End Select --> */}

            <a className="inline-flex items-center gap-x-1 text-sm text-green-600 decoration-2 hover:underline focus:outline-hidden focus:underline dark:text-green-400 dark:hover:text-green-500" href="#">
              All top products
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </a>
          </div>
          {/* <!-- End Footer --> */}
        </div>
        {/* <!-- End Products Table Card --> */}

        {/* <!-- Charts Grid --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 lg:gap-5">
          {/* <!-- Double Line Chart in Card --> */}
          <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
              Total sales
            </h2>

            {/* <!-- Subheader --> */}
            <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
              <div>
                <h4 className="text-lg text-stone-800 dark:text-neutral-200">
                  0
                  <span className="inline-flex items-center gap-x-1 text-sm text-green-500">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                    35.8%
                  </span>
                </h4>
              </div>

              <div className="md:text-end">
                <p className="text-sm text-stone-500 dark:text-neutral-400">
                  0 orders
                </p>
              </div>
            </div>
            {/* <!-- End Subheader --> */}

            {/* <!-- Apex Line Chart --> */}
            <div id="hs-total-sales-line-chart" className="min-h-[215px] md:min-h-[265px] "></div>

            {/* <!-- Legend Indicator --> */}
            <div className="flex justify-center items-center gap-x-4 mt-5">
              <div className="inline-flex items-center">
                <span className="size-2.5 inline-block bg-green-600 rounded-sm me-2"></span>
                <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                  This month
                </span>
              </div>
              <div className="inline-flex items-center">
                <span className="size-2.5 inline-block bg-stone-400 rounded-sm me-2 dark:bg-neutral-700"></span>
                <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                  Last month
                </span>
              </div>
            </div>
            {/* <!-- End Legend Indicator --> */}
          </div>
          {/* <!-- End Double Line Chart in Card --> */}

          {/* <!-- Double Line Chart in Card --> */}
          <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
              Visitors
            </h2>

            {/* <!-- Subheader --> */}
            <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
              <div>
                <h4 className="text-lg text-stone-800 dark:text-neutral-200">
                  0
                  <span className="inline-flex items-center gap-x-1 text-sm text-red-500">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                      <polyline points="16 17 22 17 22 11"></polyline>
                    </svg>
                    18%
                  </span>
                </h4>
              </div>

              <div className="md:text-end">
                <p className="text-sm text-stone-500 dark:text-neutral-400">
                  0 orders
                </p>
              </div>
            </div>
            {/* <!-- End Subheader --> */}

            {/* <!-- Apex Line Chart --> */}
            <div id="hs-total-visitors-line-chart" className="min-h-[215px] md:min-h-[265px] "></div>

            {/* <!-- Legend Indicator --> */}
            <div className="flex justify-center items-center gap-x-4 mt-5">
              <div className="inline-flex items-center">
                <span className="size-2.5 inline-block bg-green-600 rounded-sm me-2"></span>
                <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                  This month
                </span>
              </div>
              <div className="inline-flex items-center">
                <span className="size-2.5 inline-block bg-stone-400 rounded-sm me-2 dark:bg-neutral-700"></span>
                <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                  Last month
                </span>
              </div>
            </div>
            {/* <!-- End Legend Indicator --> */}
          </div>
          {/* <!-- End Double Line Chart in Card --> */}

          {/* <!-- Double Line Chart in Card --> */}
          <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
              Total orders
            </h2>

            {/* <!-- Subheader --> */}
            <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
              <div>
                <h4 className="text-lg text-stone-800 dark:text-neutral-200">
                  0
                  <span className="inline-flex items-center gap-x-1 text-sm text-green-500">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                    4.7%
                  </span>
                </h4>
              </div>

              <div className="md:text-end">
                <p className="text-sm text-stone-500 dark:text-neutral-400">
                  0 orders
                </p>
              </div>
            </div>
            {/* <!-- End Subheader --> */}

            {/* <!-- Apex Line Chart --> */}
            <div id="hs-total-orders-line-chart" className="min-h-[215px] md:min-h-[265px] "></div>

            {/* <!-- Legend Indicator --> */}
            <div className="flex justify-center items-center gap-x-4 mt-5">
              <div className="inline-flex items-center">
                <span className="size-2.5 inline-block bg-green-600 rounded-sm me-2"></span>
                <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                  This month
                </span>
              </div>
              <div className="inline-flex items-center">
                <span className="size-2.5 inline-block bg-stone-400 rounded-sm me-2 dark:bg-neutral-700"></span>
                <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                  Last month
                </span>
              </div>
            </div>
            {/* <!-- End Legend Indicator --> */}
          </div>
          {/* <!-- End Double Line Chart in Card --> */}

          {/* <!-- Double Line Chart in Card --> */}
          <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
              Refunded
            </h2>

            {/* <!-- Subheader --> */}
            <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
              <div>
                <h4 className="text-lg text-stone-800 dark:text-neutral-200">
                  0
                  <span className="inline-flex items-center gap-x-1 text-sm text-green-500">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                    11%
                  </span>
                </h4>
              </div>

              <div className="md:text-end">
                <p className="text-sm text-stone-500 dark:text-neutral-400">
                  0 refunds
                </p>
              </div>
            </div>
            {/* <!-- End Subheader --> */}

            {/* <!-- Apex Line Chart --> */}
            <div id="hs-total-refunded-line-chart" className="min-h-[215px] md:min-h-[265px] "></div>

            {/* <!-- Legend Indicator --> */}
            <div className="flex justify-center items-center gap-x-4 mt-5">
              <div className="inline-flex items-center">
                <span className="size-2.5 inline-block bg-green-600 rounded-sm me-2"></span>
                <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                  This month
                </span>
              </div>
              <div className="inline-flex items-center">
                <span className="size-2.5 inline-block bg-stone-400 rounded-sm me-2 dark:bg-neutral-700"></span>
                <span className="text-[13px] text-stone-600 dark:text-neutral-400">
                  Last month
                </span>
              </div>
            </div>
            {/* <!-- End Legend Indicator --> */}
          </div>
          {/* <!-- End Double Line Chart in Card --> */}
        </div>
        {/* <!-- End Charts Grid --> */}
      </div>
    </div>
  </main>
  {/* <!-- ========== END MAIN CONTENT ========== --> */}

  {/* <!-- ========== FOOTER ========== --> */}
  <footer className="h-14 sm:h-16 absolute bottom-0 inset-x-0">
    <div className="max-w-[85rem] p-4 sm:p-5 lg:px-8 mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <p className="text-xs sm:text-sm text-stone-500 dark:text-neutral-500">
          © 2025 Preline Labs.
        </p>

        {/* <!-- List --> */}
        <ul>
          <li className="inline-block relative pe-5 text-xs sm:text-sm text-stone-500 align-middle last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-stone-400 before:rotate-[18deg] dark:text-neutral-500 dark:before:bg-neutral-600">
            <a className="hover:text-green-600 focus:outline-hidden focus:underline dark:hover:text-neutral-200" href="#">
              FAQ
            </a>
          </li>
          <li className="inline-block relative pe-5 text-xs sm:text-sm text-stone-500 align-middle last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-stone-400 before:rotate-[18deg] dark:text-neutral-500 dark:before:bg-neutral-600">
            <a className="hover:text-green-600 focus:outline-hidden focus:underline dark:hover:text-neutral-200" href="#">
              License
            </a>
          </li>
          <li className="inline-block relative pe-5 text-xs sm:text-sm text-stone-500 align-middle sm:leading-3 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-stone-400 before:rotate-[18deg] dark:text-neutral-500 dark:before:bg-neutral-600">
            <button type="button" className="hover:text-green-600 focus:outline-hidden focus:text-stone-800 dark:hover:text-neutral-200 dark:focus:text-neutral-400" data-hs-overlay="#hs-pro-dfkm">
              <svg className="shrink-0 size-3.5 sm:size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
            </button>
          </li>
        </ul>
        {/* <!-- End List --> */}
      </div>
    </div>
  </footer>
  {/* <!-- ========== END FOOTER ========== --> */}

  {/* <!-- ========== SECONDARY CONTENT ========== --> */}
  {/* <!-- Search Modal --> */}
  <div id="hs-pro-dnsm" className="hs-overlay hs-overlay-backdrop-open:backdrop-blur-md hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none dark:hs-overlay-backdrop-open:bg-neutral-900/30" role="dialog" tabindex="-1" aria-label="Search">
    <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div className="max-h-full relative w-full flex flex-col bg-white rounded-xl shadow-xl pointer-events-auto dark:bg-neutral-800">
        {/* <!-- Input --> */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
            <svg className="shrink-0 size-4 text-stone-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <div className="border-b border-stone-200 dark:border-neutral-700">
            <input type="text" className="py-2.5 sm:py-3 ps-10 pe-8 block w-full bg-white border-transparent rounded-t-lg sm:text-sm focus:outline-hidden focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:text-neutral-400 dark:placeholder:text-neutral-400" placeholder="Search or type a command" autofocus/>
          </div>
          <div className="hidden absolute inset-y-0 end-0 flex items-center z-20 pe-1">
            <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </button>
          </div>
        </div>
        {/* <!-- End Input --> */}

        {/* <!-- Body --> */}
        <div className="h-125 p-4 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {/* <!-- List Group --> */}
          <div className="pb-4 mb-4 last:pb-0 last:mb-0 last:border-0 border-b border-stone-200 dark:border-neutral-700">
            <span className="block text-xs text-stone-500 mb-2 dark:text-neutral-500">
              Topics
            </span>

            {/* <!-- Tag Group --> */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <a className="inline-flex items-center gap-x-1.5 text-xs text-stone-800 border border-stone-200 hover:bg-stone-100 py-1.5 px-2.5 rounded-full focus:outline-hidden focus:bg-stone-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 3h5v5" />
                  <path d="M8 3H3v5" />
                  <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
                  <path d="m15 9 6-6" />
                </svg>
                Sale channels
              </a>
              <a className="inline-flex items-center gap-x-1.5 text-xs text-stone-800 border border-stone-200 hover:bg-stone-100 py-1.5 px-2.5 rounded-full focus:outline-hidden focus:bg-stone-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                Activity
              </a>
              <a className="inline-flex items-center gap-x-1.5 text-xs text-stone-800 border border-stone-200 hover:bg-stone-100 py-1.5 px-2.5 rounded-full focus:outline-hidden focus:bg-stone-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Sales
              </a>
              <a className="inline-flex items-center gap-x-1.5 text-xs text-stone-800 border border-stone-200 hover:bg-stone-100 py-1.5 px-2.5 rounded-full focus:outline-hidden focus:bg-stone-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
                  <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
                  <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
                  <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
                </svg>
                Apps
              </a>
            </div>
            {/* <!-- End Tag Group --> */}
          </div>

          <div className="pb-4 mb-4 last:pb-0 last:mb-0 last:border-0 border-b border-stone-200 dark:border-neutral-700">
            <span className=" block text-xs text-stone-500 mb-2 dark:text-neutral-500">
              Recent
            </span>

            {/* <!-- List Group --> */}
            <ul className="-mx-2.5">
              {/* <!-- List Item --> */}
              <li>
                <a className="py-2 px-3 flex gap-x-3 hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                  <svg className="shrink-0 size-4 mt-0.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                  <div className="grow">
                    <span className="block text-sm text-stone-800 dark:text-neutral-200">
                      Add product
                    </span>
                    <span className="block text-xs text-stone-500 dark:text-neutral-500">
                      Products
                    </span>
                  </div>

                  <div className="ms-auto inline-flex items-center gap-x-1">
                    <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 rounded-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <svg className="shrink-0 size-2.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                      </svg>
                    </div>
                    <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 rounded-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <svg className="shrink-0 size-2.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3h6l6 18h6" />
                        <path d="M14 3h7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
              {/* <!-- End List Item --> */}

              {/* <!-- List Item --> */}
              <li>
                <a className="py-2 px-3 flex gap-x-3 hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                  <svg className="shrink-0 size-4 mt-0.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" />
                    <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                  <div className="grow">
                    <span className="block text-sm text-stone-800 dark:text-neutral-200">
                      Add customer
                    </span>
                    <span className="block text-xs text-stone-500 dark:text-neutral-500">
                      Customers
                    </span>
                  </div>

                  <div className="ms-auto inline-flex items-center gap-x-1">
                    <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 rounded-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <svg className="shrink-0 size-2.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                      </svg>
                    </div>
                    <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 rounded-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <svg className="shrink-0 size-3.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </div>
                    <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 rounded-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      S
                    </div>
                  </div>
                </a>
              </li>
              {/* <!-- End List Item --> */}
            </ul>
            {/* <!-- End List Group --> */}
          </div>

          <div className="pb-4 mb-4 last:pb-0 last:mb-0 last:border-0 border-b border-stone-200 dark:border-neutral-700">
            <span className=" block text-xs text-stone-500 mb-2 dark:text-neutral-500">
              Categories
            </span>

            {/* <!-- List Group --> */}
            <ul className="-mx-2.5">
              {/* <!-- List Item --> */}
              <li>
                <a className="py-2 px-3 flex gap-x-3 hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                  <svg className="shrink-0 size-4 mt-0.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                    <path d="m7.5 4.27 9 5.15" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" x2="12" y1="22" y2="12" />
                    <circle cx="18.5" cy="15.5" r="2.5" />
                    <path d="M20.27 17.27 22 19" />
                  </svg>
                  <span className="text-sm text-stone-800 dark:text-neutral-200">
                    Finding products
                  </span>
                </a>
              </li>
              {/* <!-- End List Item --> */}

              {/* <!-- List Item --> */}
              <li>
                <a className="py-2 px-3 flex gap-x-3 hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                  <svg className="shrink-0 size-4 mt-0.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  <span className="text-sm text-stone-800 dark:text-neutral-200">
                    Selling products
                  </span>
                </a>
              </li>
              {/* <!-- End List Item --> */}

              {/* <!-- List Item --> */}
              <li>
                <a className="py-2 px-3 flex gap-x-3 hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                  <svg className="shrink-0 size-4 mt-0.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                    <path d="M2 7h20" />
                    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                  </svg>
                  <span className="text-sm text-stone-800 dark:text-neutral-200">
                    Store management
                  </span>
                </a>
              </li>
              {/* <!-- End List Item --> */}

              {/* <!-- List Item --> */}
              <li className="ps-7">
                <a className="py-2 px-3 text-xs text-green-600 hover:text-green-700 focus:outline-hidden focus:text-green-700" href="#">
                  Show all 2 results
                </a>
              </li>
              {/* <!-- End List Item --> */}
            </ul>
            {/* <!-- End List Group --> */}
          </div>

          <div>
            <span className=" block text-xs text-stone-500 mb-2 dark:text-neutral-500">
              Resources
            </span>

            {/* <!-- List Group --> */}
            <ul className="-mx-2.5">
              {/* <!-- List Item --> */}
              <li>
                <a className="py-2 px-3 flex gap-x-3 hover:bg-stone-100 rounded-lg focus:outline-hidden focus:bg-stone-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                  <svg className="shrink-0 size-4 mt-0.5 text-stone-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" x2="21" y1="14" y2="3" />
                  </svg>
                  <div className="grow">
                    <span className="block text-sm text-stone-800 dark:text-neutral-200">
                      Preline support
                    </span>
                    <span className="block text-sm text-stone-500 dark:text-neutral-500">
                      Contact us by email, chat or phone
                    </span>
                    <span className="block text-xs text-stone-500 dark:text-neutral-500">
                      help.example.so/questions
                    </span>
                  </div>
                </a>
              </li>
              {/* <!-- End List Item --> */}

              {/* <!-- List Item --> */}
              <li className="ps-7">
                <a className="py-2 px-3 text-xs text-green-600 hover:text-green-700 focus:outline-hidden focus:text-green-700" href="#">
                  Show all 7 results
                </a>
              </li>
              {/* <!-- End List Item --> */}
            </ul>
            {/* <!-- End List Group --> */}
          </div>
          {/* <!-- End List Group --> */}
        </div>
        {/* <!-- End Body --> */}

        {/* <!-- Footer --> */}
        <div className="p-4 flex flex-wrap justify-between items-center gap-2 border-t border-stone-200 dark:border-neutral-700">
          <div className="inline-flex items-center gap-x-2">
            <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 shadow-2xs rounded-sm dark:bg-neutral-800 dark:border-neutral-700">
              <svg className="shrink-0 size-3 text-stone-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 10 4 15 9 20" />
                <path d="M20 4v7a4 4 0 0 1-4 4H4" />
              </svg>
            </div>
            <span className="text-xs text-stone-400 dark:text-neutral-500">
              to close
            </span>
          </div>

          <div className="inline-flex items-center gap-x-4">
            <div className="inline-flex items-center gap-x-2">
              <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 shadow-2xs rounded-sm dark:bg-neutral-800 dark:border-neutral-700">
                <svg className="shrink-0 size-3.5 text-stone-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 14.596C21.828 15.1189 20.888 16 19.5969 16C18.3057 16 16.9265 14.6624 16.9265 12.8974V12.0687C16.9265 10.2373 18.2022 9.00142 19.5969 9.00142C20.9918 9.00142 21.7942 9.69876 22 10.5666M14.5417 10.3109C14.3233 9.6198 13.3292 8.96537 12.1831 9.00142C11.0374 9.03732 10.0119 9.83333 10.0119 10.777C10.0119 11.7208 10.6901 12.0632 12.1839 12.2081C13.6774 12.353 14.49 13.1331 14.5417 13.9596C14.5934 14.7861 13.8083 16 12.1839 16C10.7604 16 9.69525 14.6894 9.63548 13.9379M7.25295 14.7213C6.82726 15.5884 5.94455 15.9999 4.75814 15.9999C3.57172 15.9999 2 15.088 2 12.7831V12.1113C2 10.5911 3.16477 9.00113 4.75814 9.00113C6.35166 9.00113 7.41158 10.5059 7.25295 12.2838H2.47754" />
                </svg>
              </div>
              <span className="text-xs text-stone-400 dark:text-neutral-500">
                to select
              </span>
            </div>

            <div className="inline-flex items-center gap-x-2">
              <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 shadow-2xs rounded-sm dark:bg-neutral-800 dark:border-neutral-700">
                <svg className="shrink-0 size-3 text-stone-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </div>
              <div className="size-5 flex flex-col justify-center items-center bg-white border border-stone-200 text-xs uppercase text-stone-400 shadow-2xs rounded-sm dark:bg-neutral-800 dark:border-neutral-700">
                <svg className="shrink-0 size-3 text-stone-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </div>
              <span className="text-xs text-stone-400 dark:text-neutral-500">
                to navigate
              </span>
            </div>
          </div>
        </div>
        {/* <!-- End Footer --> */}
      </div>
    </div>
  </div>
  {/* <!-- End Search Modal --> */}

  {/* <!-- Keyboard Shortcuts Modal --> */}
  <div id="hs-pro-dfkm" className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabindex="-1" aria-label="Keyboard shortcuts">
    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xl sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div className="w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
        {/* <!-- Search Input --> */}
        <div className="py-2 px-4 border-b border-stone-200 dark:border-neutral-700">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20">
              <svg className="shrink-0 size-4 text-stone-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input type="text" className="py-1.5 sm:py-2 ps-7 pe-20 block w-full text-stone-800 bg-transparent border-transparent rounded-lg sm:text-sm focus:z-10 focus:outline-hidden focus:border-transparent focus:ring-0 placeholder:text-stone-500 disabled:placeholder:text-stone-600 dark:text-white dark:placeholder:text-neutral-500" placeholder="Search keyboard or shortcuts"/>
            <div className="hidden absolute inset-y-0 end-0 flex items-center z-20 pe-1">
              <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            </div>
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 dark:border-neutral-700 dark:text-neutral-200">
              <span className="min-h-7.5 inline-flex justify-center items-center py-0.5 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-600 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                Cmd + K
              </span>
            </div>
          </div>
        </div>
        {/* <!-- End Search Input --> */}

        {/* <!-- Body --> */}
        <div className="h-137.5 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800">
          <div className="p-4 space-y-5">
            <div>
              <h4 className="text-stone-800 font-semibold mb-2.5 dark:text-neutral-200">
                Formatting
              </h4>

              {/* <!-- List --> */}
              <ul>
                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span className="font-bold">
                    Bold
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Ctrl
                    </span>
                    +
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      b
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span className="italic">
                    Italic
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Ctrl
                    </span>
                    +
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      i
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span className="underline underline-offset-4">
                    Underline
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Ctrl
                    </span>
                    +
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      u
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span className="line-through">
                    Strikethrough
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Ctrl
                    </span>
                    +
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Alt
                    </span>
                    +
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      u
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span className="text-sm">
                    Small text
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Ctrl
                    </span>
                    +
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      s
                    </span>
                  </div>
                </li>
              </ul>
              {/* <!-- End List --> */}
            </div>

            <div>
              <h4 className="text-stone-800 font-semibold mb-2.5 dark:text-neutral-200">
                Insert
              </h4>

              {/* <!-- List --> */}
              <ul>
                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span>
                    Mention person
                    <a className="font-semibold text-sm text-green-600 decoration-2 hover:underline focus:underline dark:text-white dark:hover:text-white/80" href="#">
                      (@Brian)
                    </a>
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      @
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span>
                    Link to doc
                    <a className="font-semibold text-sm text-green-600 decoration-2 hover:underline focus:underline dark:text-white dark:hover:text-white/80" href="#">
                      (+Meeting notes)
                    </a>
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      +
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span className="font-semibold">
                    #hashtag
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      #hashtag
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span>
                    Date
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      /date
                    </span>
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Space
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span>
                    Time
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      /date
                    </span>
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Space
                    </span>
                  </div>
                </li>

                <li className="flex justify-between items-center gap-x-2 py-2.5 border-t border-stone-200 text-stone-800 dark:border-neutral-700 dark:text-neutral-300">
                  <span>
                    Note box
                  </span>
                  <div className="flex gap-x-1">
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      /note red
                    </span>
                    <span className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 bg-white border border-stone-200 font-mono text-sm text-stone-800 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      Enter
                    </span>
                  </div>
                </li>
              </ul>
              {/* <!-- End List --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Body --> */}
      </div>
    </div>
  </div>
  {/* <!-- End Keyboard Shortcuts Modal --> */}
  {/* <!-- ========== END SECONDARY CONTENT ========== --> */}

  {/* <!-- JS PLUGINS --> */}
  {/* <!-- Required plugins --> */}
  <script src="../assets/vendor/preline/dist/index.js?v=3.1.0"></script>
  {/* <!-- Clipboard --> */}
  <script src="../assets/vendor/clipboard/dist/clipboard.min.js"></script>
  <script src="../assets/js/hs-copy-clipboard-helper.js"></script>
  {/* <!-- Apexcharts --> */}
  <script src="../assets/vendor/lodash/lodash.min.js"></script>
  <script src="../assets/vendor/apexcharts/dist/apexcharts.min.js"></script>
  <script src="../assets/vendor/preline/dist/helper-apexcharts.js"></script>

  {/* <!-- JS INITIALIZATIONS --> */}
 

</div>

 </>
    );

=======
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
