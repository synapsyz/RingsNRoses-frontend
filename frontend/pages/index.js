'use client';


// import { Html, Head, Main, NextScript } from 'next/document';
// import '../styles/globals.css';
import Script from 'next/script';
import { useEffect, useState } from "react";
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
export const metadata = {
  title: 'Rings N Roses',
  description:
    'A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.',
  metadataBase: new URL('https://preline.co'),
  openGraph: {
    url: 'https://preline.co/',
    title: 'Rings N Roses',
    description:
      'A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.',
    images: [
      {
        url: 'https://preline.co/assets/img/og-image.png',
        width: 800,
        height: 600,
        alt: 'Rings N Roses',
      },
    ],
    siteName: 'Preline',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@preline',
    creator: '@preline',
    title: 'Rings N Roses',
    description:
      'A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.',
    images: ['https://preline.co/assets/img/og-image.png'],
  },
};
function TabsSync() {
  useEffect(() => {
    const select = document.getElementById('hs-catalog-sidebar-nav-select');
    const tabs = document.querySelectorAll('[data-hs-tab]');

    if (!select || tabs.length === 0) return;

    const handleChange = (e) => {
      const tabId = e.target.value;
      const tabToClick = document.querySelector(`[data-hs-tab="${tabId}"]`);
      if (tabToClick) {
        tabToClick.click(); // trigger tab switch
      }
    };

    select.addEventListener('change', handleChange);

    return () => {
      select.removeEventListener('change', handleChange);
    };
  }, []);

  return null; // This component only applies side effects
}
export default function Home() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


useEffect(() => {
  const hasRefreshed = sessionStorage.getItem('hasRefreshed');

  if (!hasRefreshed) {
    sessionStorage.setItem('hasRefreshed', 'true');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } else {
    sessionStorage.removeItem('hasRefreshed');
  }
}, []);




  useEffect(() => {
  // Check if the date exists in session data
  if (!session?.user?.customer_profile?.event_date) {
    console.error("Event date not found in session");
    return;
  }

  // Parse the date from session (assuming format like "2025-06-28T00:00:00")
  const targetDate = new Date(session.user.customer_profile.event_date).getTime();

  // Handle invalid dates
  if (isNaN(targetDate)) {
    console.error("Invalid date format in session data");
    return;
  }

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial run

  return () => clearInterval(timerInterval); // Cleanup on unmount
}, [session?.user?.customer_profile?.event_date]); // Add dependency
    const handlePrelineLoad = () => {
    const el = document.querySelector('[data-hs-carousel]');
    if (el && window.HSCarousel) {
      window.HSCarousel.autoInit(el);
    }
  };

  return (
        
      
<div>
  <Script
        src="https://cdn.jsdelivr.net/npm/preline@latest/dist/preline.js"
        strategy="afterInteractive"
        onLoad={handlePrelineLoad}/>
          {/* Canonical */}
        <link rel="canonical" href="https://preline.co/" />

        {/* Favicon */}
        <link rel="shortcut icon" href="../favicon.ico" />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* External CSS */}
        <link rel="stylesheet" href="/assets/css/main.min.css?v=3.0.1" />

        {/* Inline Style for Keyframes */}
        <style>{`
          @keyframes typing {
            0% { opacity: 1; scale: 1; }
            50% { opacity: 0.75; scale: 0.75; }
            100% { opacity: 1; scale: 1; }
          }
        `}</style>

        {/* Theme Script */}
        <Script id="theme-toggle" strategy="beforeInteractive">
          {`
            const html = document.querySelector('html');
            const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' ||
              (localStorage.getItem('hs_theme') === 'auto' &&
              !window.matchMedia('(prefers-color-scheme: dark)').matches);
            const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' ||
              (localStorage.getItem('hs_theme') === 'auto' &&
              window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
            else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
            else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
            else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
          `}
        </Script>

      <div className="dark:bg-neutral-900">
        <header className="flex flex-col lg:flex-nowrap z-50 bg-white dark:bg-neutral-900"></header>
          <div className="bg-gray-100 dark:bg-neutral-800">
      <div className="max-w-[85rem] flex justify-between w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-5">
          
        </div>

<ul className="flex flex-wrap items-center gap-3">
  <li className="inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
    <button type="button" className="flex items-center gap-x-1.5 text-start text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-overlay="#hs-pro-shmnrsm">
      <img className="shrink-0 size-3.5 rounded-full" src="./assets/vendor/svg-country-flags/png250px/in.png" alt="English"/>
      Chennai
    </button>
  </li> 

          
          <li className="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
            <a className="text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
              Help
            </a>
          </li>
          <li className="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
            <a className="text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
              Mobile app
            </a>
          </li>
          <li className="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
            <button type="button" className="hs-dark-mode-active:hidden flex hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="dark">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
              <span className="sr-only">Dark mode</span>
            </button>
            <button type="button" className="hs-dark-mode-active:flex hidden hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="light">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
              <span className="sr-only">Light mode</span>
            </button>
           
          </li>
        </ul>
      </div>
    </div>
    

    <div className="max-w-[85rem] basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex md:flex-nowrap md:items-center gap-2 lg:gap-6">
        
        <div className="order-1 md:w-auto flex items-center gap-x-1">
          <div className="hidden sm:block">
  <a
    className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
    href="/"
    aria-label="Preline"
  >
    <img
      src="Logo.png" // replace with your actual image path
      alt="Logo"
      className="mt-2 w-28 h-auto"
    />
  </a>
</div>

          <div className="sm:hidden">
  <a
    className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
    href="/"
    aria-label="Preline"
  >
    <img
      src="Logo.png" // replace with your actual logo path
      alt="Preline Logo"
      className="w-[31px] h-auto"
    />
  </a>
</div>

        </div>
        <div className="md:w-full order-2 md:grow md:w-auto">
          <div className="relative flex basis-full items-center gap-x-1 md:gap-x-3">
            <div className="hs-dropdown [--adaptive:none] [--auto-close:inside] md:inline-block">
              <button
  id="hs-pro-shmnctdm"
  type="button"
  className="hs-dropdown-toggle relative py-[7px] sm:py-2 sm:py-2.5 px-3 flex items-center gap-x-1.5 text-sm text-start border border-transparent text-white rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden"
  style={{
    backgroundColor: '#E91E63',
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d81b60')}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E91E63')}
  aria-haspopup="menu"
  aria-expanded="false"
  aria-label="Dropdown"
>
  <svg
    className="hs-dropdown-open:hidden shrink-0 size-4"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
  <svg
    className="hs-dropdown-open:block hidden shrink-0 size-4"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
  Catalog
</button>

              <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-20 top-full start-0 min-w-60 bg-white shadow-xl before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shmnctdm">
                <div className="max-w-[85rem] w-full mx-auto py-2 md:py-4 px-4 sm:px-6 lg:px-8">
                  <select id="hs-catalog-sidebar-nav-select" className="hidden" data-hs-select='{
                    "placeholder": "Select option...",
                    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span className=\"me-2\" data-icon></span><span className=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
                    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 px-3 pe-9 flex items-center text-nowrap w-full cursor-pointer bg-gray-100 text-gray-800 rounded-lg text-start text-sm dark:bg-neutral-800 dark:text-neutral-200",
                    "wrapperClasses": "sm:hidden mb-4",
                    "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                    "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                    "optionTemplate": "<div className=\"flex items-center\"><div className=\"me-3\" data-icon></div><div className=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div>",
                    "extraMarkup": "<div className=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg className=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                  }'>
                    <option value="#mega-menu-catalog-tab-1" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\"/><path d=\"M12 18h.01\"/></svg>"
                    }' selected>Venue</option>
                    <option value="#mega-menu-catalog-tab-2" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z\"/></svg>"
                    }'>Bride &amp; Groom Essentials</option>
                    <option value="#mega-menu-catalog-tab-3" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 20h10\"/><path d=\"M10 20c5.5-2.5.8-6.4 3-10\"/><path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\"/><path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\"/></svg>"
                    }'>Catering &amp; Food</option>
                    <option value="#mega-menu-catalog-tab-4" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 12h.01\"/><path d=\"M15 12h.01\"/><path d=\"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5\"/><path d=\"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1\"/></svg>"
                    }'>Decor &amp; Setup</option>
                    <option value="#mega-menu-catalog-tab-5" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6h3\"/><path d=\"M17 6h.01\"/><rect width=\"18\" height=\"20\" x=\"3\" y=\"2\" rx=\"2\"/><circle cx=\"12\" cy=\"13\" r=\"5\"/><path d=\"M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5\"/></svg>"
                    }'>Entertainment</option>
                    <option value="#mega-menu-catalog-tab-6" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11.1 7.1a16.55 16.55 0 0 1 10.9 4\"/><path d=\"M12 12a12.6 12.6 0 0 1-8.7 5\"/><path d=\"M16.8 13.6a16.55 16.55 0 0 1-9 7.5\"/><path d=\"M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10\"/><path d=\"M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5\"/><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>"
                    }'>Photography &amp; Videography</option>
                    <option value="#mega-menu-catalog-tab-7" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z\"/><path d=\"M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8\"/><path d=\"M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3\"/><path d=\"M18 6h4\"/><path d=\"m5 10-2 8\"/><path d=\"m7 18 2-8\"/></svg>"
                    }'>Invitations &amp; Stationery</option>
                    <option value="#mega-menu-catalog-tab-8" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z\"/><path d=\"M10 2c1 .5 2 2 2 5\"/></svg>"
                    }'>Logistics</option>
                    <option value="#mega-menu-catalog-tab-9" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z\"/><path d=\"m8.5 8.5 7 7\"/></svg>"
                    }'>Gifts &amp; Return Favors</option>
                    <option value="#mega-menu-catalog-tab-10" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11.25 16.25h1.5L12 17z\"/><path d=\"M16 14v.5\"/><path d=\"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309\"/><path d=\"M8 14v.5\"/><path d=\"M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5\"/></svg>"
                    }'>Event Managers</option>
                    <option value="#mega-menu-catalog-tab-11" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><path d=\"M8 11h8\"/><path d=\"M8 7h6\"/></svg>"
                    }'>Makeup &amp; Styling</option>
                    <option value="#mega-menu-catalog-tab-12" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"4\" cy=\"4\" r=\"2\"/><path d=\"m14 5 3-3 3 3\"/><path d=\"m14 10 3-3 3 3\"/><path d=\"M17 14V2\"/><path d=\"M17 14H7l-5 8h20Z\"/><path d=\"M8 14v8\"/><path d=\"m9 14 5 8\"/></svg>"
                    }'>Sound &amp; Lighting</option>
                    <option value="#mega-menu-catalog-tab-13" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3\"/><path d=\"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z\"/><path d=\"M5 18v2\"/><path d=\"M19 18v2\"/></svg>"
                    }'>Rentals</option>
                    <option value="#mega-menu-catalog-tab-14" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 3h12l4 6-10 13L2 9Z\"/><path d=\"M11 3 8 9l4 13 4-13-3-6\"/><path d=\"M2 9h20\"/></svg>"
                    }'>Legal &amp; Documentation</option>
                    <option value="#mega-menu-catalog-tab-15" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"6\" cy=\"15\" r=\"4\"/><circle cx=\"18\" cy=\"15\" r=\"4\"/><path d=\"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2\"/><path d=\"M2.5 13 5 7c.7-1.3 1.4-2 3-2\"/><path d=\"M21.5 13 19 7c-.7-1.3-1.5-2-3-2\"/></svg>"
                    }'>Childcare &amp; Elderly Assitance</option>
                    <option value="#mega-menu-catalog-tab-16" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"6\" x2=\"10\" y1=\"11\" y2=\"11\"/><line x1=\"8\" x2=\"8\" y1=\"9\" y2=\"13\"/><line x1=\"15\" x2=\"15.01\" y1=\"12\" y2=\"12\"/><line x1=\"18\" x2=\"18.01\" y1=\"10\" y2=\"10\"/><path d=\"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z\"/></svg>"
                    }'>Cleaning &amp; Maintenance</option>
                    <option value="#mega-menu-catalog-tab-17" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13\"/><path d=\"m8 6 2-2\"/><path d=\"m18 16 2-2\"/><path d=\"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17\"/><path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"/><path d=\"m15 5 4 4\"/></svg>"
                    }'>Stationery</option>
                    <option value="#mega-menu-catalog-tab-18" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4\"/><path d=\"M14 13.12c0 2.38 0 6.38-1 8.88\"/><path d=\"M17.29 21.02c.12-.6.43-2.3.5-3.02\"/><path d=\"M2 12a10 10 0 0 1 18-6\"/><path d=\"M2 16h.01\"/><path d=\"M21.8 16c.2-2 .131-5.354 0-6\"/><path d=\"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2\"/><path d=\"M8.65 22c.21-.66.45-1.32.57-2\"/><path d=\"M9 6.8a6 6 0 0 1 9 5.2v2\"/></svg>"
                    }'>Digital Goods</option>
                    <option value="#mega-menu-catalog-tab-19" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/></svg>"
                    }'>Music</option>
                  </select>

                  <div className="flex">
                    <div className="hidden sm:block sm:pe-4 w-96 h-[75dvh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                      <div id="hs-catalog-sidebar-nav-tabs" className="flex flex-col gap-y-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal" data-hs-tabs='{
                        "eventType": "hover",
                        "preventNavigationResolution": "sm"
                      }'>
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 active" id="mega-menu-catalog-tab-item-1" aria-selected="true" data-hs-tab="#mega-menu-catalog-tab-1" aria-controls="mega-menu-catalog-tab-1" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pinned-icon lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></svg>


                          Venue
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* {/* <!-- End Link --> */} 

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-2" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-2" aria-controls="mega-menu-catalog-tab-2" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shirt-icon lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
                          Bride &amp; Groom Essentials
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-3" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-3" aria-controls="mega-menu-catalog-tab-3" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hand-platter-icon lucide-hand-platter"><path d="M12 3V2"/><path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"/><path d="M2 14h12a2 2 0 0 1 0 4h-2"/><path d="M4 10h16"/><path d="M5 10a7 7 0 0 1 14 0"/><path d="M5 14v6a1 1 0 0 1-1 1H2"/></svg>
                          Catering &amp; Food
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-4" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-4" aria-controls="mega-menu-catalog-tab-4" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-flower-icon lucide-flower"><circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9"/><path d="M7.5 12H9"/><path d="M16.5 12H15"/><path d="M12 16.5V15"/><path d="m8 8 1.88 1.88"/><path d="M14.12 9.88 16 8"/><path d="m8 16 1.88-1.88"/><path d="M14.12 14.12 16 16"/></svg>
                          Decor &amp; Setup
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-5" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-5" aria-controls="mega-menu-catalog-tab-5" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-drama-icon lucide-drama"><path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6.5 13.1h.01"/><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/></svg>
                          Entertainment
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-6" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-6" aria-controls="mega-menu-catalog-tab-6" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-camera-icon lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>Photography &amp; Videography
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-7" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-7" aria-controls="mega-menu-catalog-tab-7" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail-check-icon lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
                          Invitations &amp; Stationery
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-9" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-9" aria-controls="mega-menu-catalog-tab-9" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
                          Gifts &amp; Return Favors
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
  
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-11" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-11" aria-controls="mega-menu-catalog-tab-11" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-brush-icon lucide-brush"><path d="m11 10 3 3"/><path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z"/><path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031"/></svg>
                          Makeup &amp; Styling
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}

                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                        <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-13" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-13" aria-controls="mega-menu-catalog-tab-13" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hand-coins-icon lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
                          Rentals
                          <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}

                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}

                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
   
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}

                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}
                      
                        {/* <!-- End Link --> */}

                        {/* <!-- Link --> */}

                        {/* <!-- End Link --> */}
                        {/* <!-- Link --> */}

                        {/* <!-- End Link --> */}
                      </div>
                    </div>
                    {/* <!-- End Sidebar --> */}

                    {/* <!-- Content --> */}
                    <div className="pe-4 sm:px-10 w-full h-[75dvh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                      
                      {/* <!-- Tab --> */}
                        {/* <!-- Grid --> */}
                        <div id="mega-menu-catalog-tab-1" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-1">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.venuebookingz.com/24118-1720587040-wm-league-hotels-banquet-chennai-1.jpg" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Banquet Halls</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.unexplora.com/wp-content/uploads/2020/11/Untitled-design-85.jpg" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Resorts</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn0.weddingwire.in/vendor/4599/3_2/960/jpg/wedding-venue-aj-garden-outdoor-space-1_15_364599-161640601569768.jpeg" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Outdoor Lawns & Gardens</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/Top-7-Destination-Wedding-Locations-in-India.jpg" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Destination Venues</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://media.weddingz.in/images/ce4bb19da8f580022371692fda5715b5/thinking-of-a-beach-wedding-check-out-the-best-beach-wedding-venues-in-goa-2.jpg" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Beachside Venues</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://media.weddingz.in/photologue/1490602150941/palace-wedding-venues-in-india-gajner-palace.PNG" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Heritage Properties</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://imagewedz.oyoroomscdn.com/medium/photologue/images/diamond-banquet-chembur-mumbai-4.jpeg" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Community Halls</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.brides.com/thmb/6rWBPzOU1FKL8U4JJWdxTh7v4-8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/J0GNM_v_QLTPspmntIY9Wx0-blZ0KWIyAGTfiPDU7Vz73PGoHrCJhs8u9UmLiQvm3_tX_NmoFw1ylvOHf_c7M-S112OA0R0X2CuTxIhgaEscCQgLwczPt6ACGKFjcopy-df74a973bac843b69df2ff927153bc12.jpg" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Rooftop Venues</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                           
                          </div>
                          {/* <!-- Grid --> */}
                        </div>
                        {/* <!-- End Grid --> */}
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                        {/* <!-- Grid --> */}
                        <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                            </a>
                            {/* <!-- End Item --> */}
                          </div>
                          {/* <!-- Grid --> */}
                        </div>
                        {/* <!-- End Grid --> */}
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                        {/* <!-- Grid --> */}
                        <div id="mega-menu-catalog-tab-3" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-3">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                            </a>
                            {/* <!-- End Item --> */}
  
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                            </a>
                            {/* <!-- End Item --> */}
                          </div>
                          {/* <!-- Grid --> */}
                        </div>
                        {/* <!-- End Grid --> */}
                      {/* <!-- End Tab --> */}

                      <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                        {/* <!-- Grid --> */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                          </a>
                          {/* <!-- End Item --> */}
                        </div>
                        {/* <!-- Grid --> */}
                      </div>

                      <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                        {/* <!-- Grid --> */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                          </a>
                          {/* <!-- End Item --> */}
                        </div>
                        {/* <!-- Grid --> */}
                      </div>

                       <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                        {/* <!-- Grid --> */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                              <div className="absolute -top-0.5 end-0.5">
                                <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                              </div>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                          </a>
                          {/* <!-- End Item --> */}

                          {/* <!-- Item --> */}
                          <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                            <div className="relative shrink-0">
                              <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                            </div>
                            <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                          </a>
                          {/* <!-- End Item --> */}
                        </div>
                        {/* <!-- Grid --> */}
                      </div>

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-9" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-9">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-10" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-10">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-11" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-11">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-12" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-12">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-13" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-13">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-14" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-14">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-15" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-15">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-16" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-16">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-17" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-17">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-18" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-18">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}

                      {/* <!-- Tab --> */}
                      <div id="mega-menu-catalog-tab-19" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-19">
                        {/* <!-- Loading Indicator --> */}
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <span className="py-1.5 inline-flex gap-x-1">
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br/>This conent is empty.
                          </p>
                        </div>
                        {/* <!-- End Loading Indicator --> */}
                      </div>
                      {/* <!-- End Tab --> */}
                    </div>
                    {/* <!-- End Content --> */}
                  </div>
                  {/* <!-- End Grid --> */}
                </div>
                {/* <!-- End Container --> */}
              </div>
              {/* <!-- End Dropdown Menu --> */}
            </div>
            {/* <!-- End Dropdown Link --> */}

            <div className="hidden md:block w-full">
              {/* <!-- Search Input --> */}
              <div className="relative w-full">
                <input
  type="text"
  className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border border-gray-200 text-base sm:text-sm rounded-full focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400"
  placeholder="Search venues, decorators, makeup artists..."
/>
<div className="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
                  <button
  type="button"
  className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full text-white focus:outline-hidden"
  style={{
    backgroundColor: '#E91E63',
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d81b60')}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E91E63')}
>
  <svg
    className="shrink-0 size-4"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
</button>

                </div>
                <div className="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-10 pe-1">
                  <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" aria-label="Close">
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
          </div>
        </div>
        {/* <!-- End Search --> */}

        {/* <!-- Widgets --> */}
        { status === "authenticated" && user ? (
          <>
<div className="order-2 md:order-3 ms-auto lg:ms-0">
          <div className="flex justify-end items-center gap-x-2">
                    {/* <!-- Favorites Button Icon --> */}
                    <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                      <button id="hs-pro-dnnd" type="button" className="relative shrink-0 inline-flex justify-center items-center gap-x-2 size-9.5 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        <span className="flex absolute top-0 end-0 z-10 -mt-1 -me-1">
                          <span className="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-gray-800 text-white rounded-full px-1 dark:bg-neutral-200 dark:text-neutral-800">
                            2
                            <span className="sr-only">Notifications</span>
                          </span>
                        </span>
                      </button>
                      {/* <!-- End Favorites Button Icon --> */}
          
                      {/* <!-- Favorites Dropdown --> */}
                      <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full sm:w-96 hidden z-10 bg-white border-y sm:border-x border-gray-200 sm:border-gray-100 sm:mt-2 sm:rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-dnnd">
                        <div className="py-4 px-6">
                          <span className="block font-medium text-gray-800 dark:text-neutral-200">
                            Favorites
                          </span>
                        </div>
          
                        <div className="px-6 max-h-120 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                          <div className="space-y-5">
                            {/* <!-- Item --> */}
                            <div id="hs-pro-shfdi1" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
                              <div className="relative">
                                <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87TsCDhwKtTRhIYWQrwI_Jk2L9lSl7XhYeA&s" alt="Product Image"/>
                              </div>
          
                              <div className="grow flex flex-col">
                                <h4 className="text-sm text-gray-800 dark:text-neutral-200">
                                 Sheraton Garden
                                </h4>
                                <span className="mt-1.5">
                                  <span className="text-sm text-gray-500 dark:text-neutral-500">
                                    <s>₹225000</s>
                                  </span>
                                  <span className="text-sm text-red-500">
                                    From₹200000
                                  </span>
                                </span>
          
                                <div className="">
                                  <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shfdi1">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* <!-- End Item --> */}
          
                            {/* <!-- Item --> */}
                            <div id="hs-pro-shfdi2" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
                              <div className="relative">
                                <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://content.jdmagicbox.com/v2/comp/chennai/m6/044pxx44.xx44.090921161513.h7m6/catalogue/sriji-sweets-vepery-chennai-sweet-shops-37f8bph.jpg" alt="Product Image"/>
                              </div>
          
                              <div className="grow flex flex-col">
                                <h4 className="text-sm text-gray-800 dark:text-neutral-200">
                                  Sriji Sweets
                                </h4>
          
                                <span className="mt-1.5 text-sm text-gray-800 dark:text-neutral-200">
                                  ₹129
                                </span>
          
                                <div className="">
                                  <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shfdi2">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* <!-- End Item --> */}
                          </div>
                        </div>
          
                        <div className="py-4 px-6 text-center">
                          <a className="inline-flex justify-center items-center font-medium text-sm text-gray-800 underline underline-offset-4 decoration-1 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="../../pro/shop/favorites.html">
                            View favorites
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Favorites Dropdown --> */}
          
                    {/* <!-- Cart Button Icon --> */}
                    <button type="button" className="relative shrink-0 inline-flex justify-center items-center gap-x-2 size-9.5 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" data-hs-overlay="#hs-pro-shco">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span className="flex absolute top-0 end-0 z-10 -mt-1 -me-1">
                        <span className="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-gray-800 text-white rounded-full px-1 dark:bg-neutral-200 dark:text-neutral-800">
                          3
                          <span className="sr-only">Notifications</span>
                        </span>
                      </span>
                    </button>
                    {/* <!-- End Cart Button Icon --> */}
          
                    {/* <!-- Account Button Icon --> */}
                    <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                      <button id="hs-pro-shadnli" type="button" className="relative shrink-0 inline-flex justify-center items-center gap-x-2 size-9.5 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        <img className="shrink-0 size-8 rounded-full" src={session.user.profile_picture||"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="Avatar"></img>
                      </button>
                      {/* <!-- End Account Button Icon --> */}
          
                      {/* <!-- Account Dropdown --> */}
                      <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full sm:w-72 hidden z-10 bg-white border-y sm:border-x border-gray-200 sm:border-gray-100 sm:mt-2 sm:rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shadnli">
                        <div className="p-2">
                          {/* <!-- Account Details --> */}
                          <a 
  className="py-2 px-2.5 flex items-center gap-3 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" 
  href="../../pro/shop/account.html"
>
  <img 
    className="shrink-0 size-10 rounded-full" 
    src={session.user.profile_picture || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} 
    alt="Avatar"
    onError={(e) => {
      e.target.onerror = null; 
      e.target.src = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
    }}
  />
  
  <div className="grow">
    <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
      {session.user.name}
    </span>
    <p className="text-xs text-gray-500 dark:text-neutral-500">
      {session.user.email}
    </p>
  </div>
</a>
                          {/* <!-- End Account Details --> */}
          
          
                          {/* <!-- List --> */}
                          <ul className="flex flex-col space-y-0.5">
                            <li>
                              <a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="/personal-info.html">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                                Personal Info
                              </a>
                            </li>
          
                            
          

                          </ul>
                          {/* <!-- End List --> */}
          
                          <div className="my-2 mx-2.5 h-px bg-gray-200 dark:bg-neutral-700"></div>
          
       
                          {/* <!-- End List --> */}
          
                          <div className="my-2 mx-2.5 h-px bg-gray-200 dark:bg-neutral-700"></div>
          
                          <p>
                            <button type="button" 
                            onClick={() => signOut({ redirect: false })}
                            className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 hover:text-red-500 focus:outline-hidden focus:bg-gray-100 focus:text-red-500 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:hover:text-red-500 dark:focus:text-red-500">
                              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" x2="9" y1="12" y2="12" />
                              </svg>
                              Logout
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Account Dropdown --> */}
          </div>
        </div>
        </>
        ) : (
         <div className="order-2 md:order-3 ms-auto lg:ms-0 flex flex-col items-center space-y-1 text-end">
  <a
    href="/login"
    className="py-2 px-6 text-xs font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
    style={{
      backgroundColor: '#E91E63',
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d81b60')}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E91E63')}
    onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #E91E63')}
    onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
  >
    Sign in
  </a>

  <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
    New Customer?{" "}
    <a
      href="/login/signup"
      className="hover:underline"
      style={{ color: '#E91E63' }}
    >
      Sign up
    </a>
  </p>
</div>


        )}
        {/* <!-- End Widgets --> */}
      </div>

      <div className="md:hidden mt-2.5 md:mt-0 w-full">
        {/* <!-- Search Input --> */}
        <div className="relative w-full">
          <input type="text" className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border-gray-200 text-base sm:text-sm rounded-full focus:outline-hidden focus:border-emerald-600 focus:ring-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400" placeholder="Search venues, decorators, makeup artists..."></input>
          <div className="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
            <button type="button" className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
          <div className="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-10 pe-1">
            <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" aria-label="Close">
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
    </div>

    {/* <!-- <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-1">
      <div className="relative flex basis-full items-center gap-x-1">
        <div className="flex flex-row items-center gap-x-1 overflow-x-auto [&::-webkit-scrollbar]:h-0">
          <div className="hs-dropdown [--strategy:absolute] [--adaptive:none] [--auto-close:inside] md:[--trigger:hover] md:inline-block group">
            <button id="hs-pro-shmnpgdm" type="button" className="hs-dropdown-toggle relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 group-hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 after:absolute after:start-1/2 after:bottom-[3px] after:w-4 after:h-[3px] after:bg-emerald-500 after:rounded-full after:-translate-x-1/2 after:transition dark:text-neutral-200 dark:hover:bg-neutral-700 dark:group-hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
                <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
              </svg>
              Pages
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-56 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-950" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shmnpgdm">
              <div className="p-1 space-y-0.5">
                <a className="relative group py-2 px-3 flex items-center gap-x-3 text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 bg-gray-100 dark:bg-neutral-800" href="./index.html">
                  Home
                </a>

                <a className="relative group py-2 px-3 flex items-center gap-x-3 text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 " href="./listing.html">
                  Listing
                </a>

                <a className="relative group py-2 px-3 flex items-center gap-x-3 text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 " href="./categories.html">
                  Categories
                </a>

                <a className="relative group py-2 px-3 flex items-center gap-x-3 text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 " href="./product-detail">
                  Product Detail
                </a>
              </div>
            </div>
          </div>

          <a className="relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 after:absolute after:start-1/2 after:bottom-[3px] after:w-4 after:h-[3px] after:bg-emerald-500 after:rounded-full after:-translate-x-1/2 after:transition after:scale-0 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" x2="5" y1="5" y2="19" />
              <circle cx="6.5" cy="6.5" r="2.5" />
              <circle cx="17.5" cy="17.5" r="2.5" />
            </svg>
            Sales
          </a>

          <a className="relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 after:absolute after:start-1/2 after:bottom-[3px] after:w-4 after:h-[3px] after:bg-emerald-500 after:rounded-full after:-translate-x-1/2 after:transition after:scale-0 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            Best Sellers
          </a>

          <a className="relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 after:absolute after:start-1/2 after:bottom-[3px] after:w-4 after:h-[3px] after:bg-emerald-500 after:rounded-full after:-translate-x-1/2 after:transition after:scale-0 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 16h6" />
              <path d="M19 13v6" />
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
              <path d="m7.5 4.27 9 5.15" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
            New Arrivals
          </a>

          <a className="relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 after:absolute after:start-1/2 after:bottom-[3px] after:w-4 after:h-[3px] after:bg-emerald-500 after:rounded-full after:-translate-x-1/2 after:transition after:scale-0 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
              <path d="M8 11h8" />
              <path d="M8 7h6" />
            </svg>
            Books
          </a>

          <a className="relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 after:absolute after:start-1/2 after:bottom-[3px] after:w-4 after:h-[3px] after:bg-emerald-500 after:rounded-full after:-translate-x-1/2 after:transition after:scale-0 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
            </svg>
            Clothing
          </a>

          <a className="relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 after:absolute after:start-1/2 after:bottom-[3px] after:w-4 after:h-[3px] after:bg-emerald-500 after:rounded-full after:-translate-x-1/2 after:transition after:scale-0 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
            Gift Cards
          </a>
        </div>
 
      </div>
    </div>
  </header>
  End Nav --> */}
  {/* <!-- ========== END HEADER ========== --> */}

  {/* <!-- ========== MAIN CONTENT ========== --> */}
  <main id="content">
    

    
<div className="py-10 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
{/* <!-- Stats Grid --> */}
  {status === "authenticated" && user &&(
  <>
<div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-2">
  <div className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 md:col-span-2">
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">

      <div className="flex-1 flex flex-col gap-2">
<div className="flex items-center gap-2">
  <h2 className="text-lg font-bold text-gray-800 dark:text-white">{session.user.customer_profile.groom_name}</h2>
  <h2 className="text-lg font-bold text-gray-800 dark:text-white">&</h2>
<h2 className="text-lg font-bold text-gray-800 dark:text-white">{session.user.customer_profile.bride_name}</h2>
</div>
<p className="text-l text-gray-500 dark:text-neutral-300">
  {new Date(session.user.customer_profile.event_date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).replace(/(\d+)/, (match) => {
    const day = parseInt(match);
    const suffix = 
      day === 1 ? 'st' :
      day === 2 ? 'nd' :
      day === 3 ? 'rd' : 'th';
    return `${day}${suffix} of`;
  })}
</p>
        <div id="countdown" className="mt-2 text-gray-800 dark:text-white font-medium flex gap-4 text-center">
          <div className="flex flex-col items-center">
            {/* <span id="days" className="text-xs font-bold">--</span> */}
            <span className="text-xs text-gray-500 dark:text-neutral-400">{timeLeft.days} days</span>
          </div>
          <div className="flex flex-col items-center">
            {/* <span id="hours" className="text-xs font-bold">--</span> */}
            <span className="text-xs text-gray-500 dark:text-neutral-400">{timeLeft.hours} hours</span>
          </div>
          <div className="flex flex-col items-center">
            {/* <span id="minutes" className="text-xs font-bold">--</span> */}
            <span className="text-xs text-gray-500 dark:text-neutral-400">{timeLeft.minutes} minutes</span>
          </div>
          <div className="flex flex-col items-center">
            {/* <span id="seconds" className="text-xs font-bold">--</span> */}
            <span className="text-xs text-gray-500 dark:text-neutral-400">{timeLeft.seconds} seconds</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-neutral-400">Time left until the big day!</p>
      </div>

      <div className="w-full sm:w-40" style={{ width: '20rem'}}>
        <img src="https://plus.unsplash.com/premium_photo-1682092632793-c7d75b23718e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGluZHUlMjB3ZWRkaW5nfGVufDB8fDB8fHww" alt="Wedding" className="rounded-lg object-cover w-full h-24 sm:h-32"></img>
      </div>

    </div>
  </div>


  <div className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 md:col-span-1">
    <div className="flex flex-col gap-2">
      <img src="https://cdn-icons-png.flaticon.com/128/2252/2252184.png" alt="Customer Loyalty" width="50" height="50"></img>
      <h2 className="text-xl text-gray-600 dark:text-neutral-400">Services hired</h2>
      <p className="text-xl font-semibold text-gray-800 dark:text-white">5 of 18</p>
    </div>
  </div>

  <div className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 md:col-span-1">
    <div className="flex flex-col gap-2">
      <img src="https://cdn-icons-png.flaticon.com/128/9817/9817200.png" alt="Budget and Finance" width="50" height="50"></img>
      <h2 className="text-xl text-gray-600 dark:text-neutral-400">Budget spent</h2>
      <p className="text-l font-semibold text-gray-800 dark:text-white">41% used → ₹945,000 / ₹2,300,000</p>
    </div>
  </div>
</div>
</>

)}

{/* <!-- End Stats Grid --> */}

    
    {/* <!-- Slider --> */}
    <div className="py-4 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div
          data-hs-carousel='{"isInfiniteLoop": true}'
          className="relative hs-carousel overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800 h-96" style={{ height: '40rem'}}
        >
          <div className="hs-carousel-body absolute top-0 bottom-0 left-0 flex flex-nowrap transition-transform duration-700 opacity-0">
            <div className="hs-carousel-slide">
              <a className="relative block h-96 rounded-xl" style={{ height: '40rem'}} href="#">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  src="https://cdn0.weddingwire.in/article/4793/3_2/1280/jpg/113974-studiokellyphotography-337445578-533103172337964-9035533201119956191-n.jpeg"
                  alt="Hero Image"
                />
                <div className="relative z-10 text-center w-full h-full max-w-lg mx-auto px-12 flex flex-col justify-center items-center">
                  <div className="bg-black/40 rounded-xl p-6">
                    <p className="text-sm md:text-base uppercase text-white">
                      Up to 30% Off on Dream Venues!
                    </p>
                
                    <h2 className="mt-2 font-semibold text-2xl sm:text-2xl lg:text-4xl text-white">
                      Book the vibe, not just the venue.
                    </h2>
                
                    <div className="mt-7">
                      <span
  className="py-2 px-3 font-semibold text-sm text-gray-800 rounded-full"
  style={{ backgroundColor: '#E91E63' }}
>
  Book now
</span>

                    </div>
                  </div>                
                </div>
              </a>
            </div>
             <div className="hs-carousel-slide">
              <a className="relative block h-96 rounded-xl" style={{ height: '40rem'}} href="#">
                <img className="absolute inset-0 size-full object-cover rounded-xl" src="https://t4.ftcdn.net/jpg/02/71/43/75/360_F_271437574_doTjDM96i4VpYYU68nFLpjLA2rOlSh5v.jpg" alt="Hero Image"/>

                <div className="relative z-10 size-full max-w-lg p-8 sm:p-16 flex flex-col">
                  <h2 className="mt-2 font-semibold text-3xl sm:text-4xl lg:text-5xl text-white">
                    Luxury Catering That Melts in Your Mouth
                  </h2>

                  <p className="text-sm md:text-base uppercase text-white">
                    Now at 20% Off!
                  </p>

                  <div className="mt-7">
                    <span className="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full">
                      Book now
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div className="hs-carousel-slide">
              <a className="h-120 lg:h-160 relative block overflow-hidden bg-linear-to-br from-emerald-500 to-emerald-900 rounded-xl focus:outline-hidden dark:bg-neutral-800" style={{ height: '40rem'}} href="../../pro/shop/listing.html">
                 <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5" style={{ background: '#064e3b',height: '40rem'}}>
                  <div className="p-12 sm:p-16 md:ps-20 md:pe-0 max-w-xl">
                    <span className="block font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-white">
                      Starting at 
                    </span>
                    <span className="block font-bold uppercase text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white">
                      ₹9,999!
                    </span>
                    <span className="block md:text-end font-bold uppercase text-xl sm:text-2xl lg:text-3xl text-yellow-400">
                      DJ & Entertainment Packages 
                    </span>

                    <div className="mt-10 md:mt-20">
                      <h2 className="font-semibold text-2xl md:text-3xl text-white">
                      </h2>

                      <p className="mt-1 text-white">
                      </p>

                      <div className="mt-3 md:mt-5">
                        <span className="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full">
                          Have a Look!
                        </span>
                      </div>
                    </div>
                  </div>


                  <div className="h-120 lg:h-160 grid grid-cols-2 gap-3 sm:gap-5 -rotate-12">
                    <div className="flex flex-col gap-3 sm:gap-5">
                      <div className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900">
                        <img className="size-full object-cover rounded-xl lg:rounded-2xl" src="https://akm-img-a-in.tosshub.com/lingo/brt/images/story/202404/662f71d9be800-10-wedding-djs-to-book-for-your-wedding-290928589-16x9.png" alt="Product Image"/>
                      </div>
                      <div className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900">
                        <img className="size-full object-cover rounded-xl lg:rounded-2xl" src="https://i.ytimg.com/vi/R0FDzIs48PM/maxresdefault.jpg" alt="Product Image"/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:gap-5 -mt-6">
                      <div className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900">
                        <img className="size-full object-cover rounded-xl lg:rounded-2xl" src="https://cdn0.weddingwire.in/vendor/3754/3_2/960/jpg/wedding-entertainment-anchor-deepak-bajaj-stage-performance-8_15_413754-165622337886221.jpeg" alt="Product Image"/>
                      </div>
                      <div className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900">
                        <img className="size-full object-cover rounded-xl lg:rounded-2xl" src="https://blog.g3fashion.com/wp-content/uploads/2021/04/choreographers-for-wedding-dance-1024x652.jpg" alt="Product Image"/>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            type="button"
            className="hs-carousel-prev absolute top-1/2 left-2 transform -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            type="button"
            className="hs-carousel-next absolute top-1/2 right-2 transform -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    {/* <!-- End Slider --> */}
</div>

    {/* <!-- Catgory Group --> */}
    <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      {/* <!-- Grid --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="./listing.html">
          <div className="relative shrink-0 w-20 sm:w-28 h-20">
            <img className="size-full absolute inset-0 object-cover object-center rounded-s-xl" src="https://cdn-blog.superprof.com/blog_in/wp-content/uploads/2020/01/in-photo-photo-1.jpg" alt="Product Image"/>
          </div>
          <div className="grow p-3">
            <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
              Photography
            </span>
          </div>
        </a>
        {/* <!-- End Category Card --> */}

        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="./listing.html">
          <div className="relative shrink-0 w-20 sm:w-28 h-20">
            <img className="size-full absolute inset-0 object-cover object-center rounded-s-xl" src="https://www.vivahcards.com/wp-content/uploads/2024/07/Indian-Wedding-Card-20272-Premium-Wedding-Invitation-Cards.jpg" alt="Product Image"/>
          </div>
          <div className="grow p-3">
            <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
              Invitations
            </span>
          </div>
        </a>
        {/* <!-- End Category Card --> */}

        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="./listing.html">
          <div className="relative shrink-0 w-20 sm:w-28 h-20">
            <img className="size-full absolute inset-0 object-cover object-center rounded-s-xl" src="https://lamansh.in/cdn/shop/files/125-rs-each-on-buying-in-bulk-call-at-8619550223-gift-hand-bag-lamansh-new-print-bridal-haldi-ceremony-design-hand-bags-for-haldi-mehendi-sangeet-wedding-return-gifts-pooja-or-festiva_7d67749e-998b-4b90-9fc6-93fd7556111a.jpg?v=1709128018&width=2400" alt="Product Image"/>
          </div>
          <div className="grow p-3">
            <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
              Return Favors
            </span>
          </div>
        </a>
        {/* <!-- End Category Card --> */}

        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="./listing.html">
          <div className="relative shrink-0 w-20 sm:w-28 h-20">
            <img className="size-full absolute inset-0 object-cover object-center rounded-s-xl" src="https://naomisheadmasters.com/wp-content/uploads/2025/04/How-to-Book-a-Reliable-Makeup-Artist-for-Your-Destination-Wedding.jpg" alt="Product Image"/>
          </div>
          <div className="grow p-3">
            <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
              Makeup
            </span>
          </div>
        </a>
        {/* <!-- End Category Card --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
    {/* <!-- End Catgory Group --> */}

    {/* <!-- Featured --> */}
    <div className="py-6 sm:py-12 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      {/* <!-- Header --> */}
      <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
        <h1 className="font-medium text-xl text-gray-800 dark:text-neutral-200">
          Couples’ Favorites
        </h1>

        <button type="button" className="py-2 px-3 flex items-center text-sm text-start bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600">
          View all
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      {/* <!-- End Header --> */}

      {/* <!-- Grid --> */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://images.squarespace-cdn.com/content/v1/5f152ec422af2a37ad8d4da4/1595231592681-7PDPA2AX1EQHG56NQNV3/Outdoor+Wedding+Venue+Chennai" alt="Product Image"/>
              </a>

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      💖 Most Loved
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Outdoor Lawns & Gardens
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  From ₹2L <span className="text-sm"></span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹3L</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  50× last month
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (67)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://img.staticmb.com/mbcontent/images/uploads/2023/8/Heaven_4.jpg" alt="Product Image"/>
              </a>
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Theme Decor
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  From ₹1L <span className="text-sm"></span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹1.5L</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  44× last month
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://t4.ftcdn.net/jpg/08/01/08/11/360_F_801081156_a7Rpu5kGuHBCPLkN9JhWe0qWpmWhwjNx.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      🔥 Trending now
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Drone Shoots
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  From ₹80K <span className="text-sm"></span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹1L</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  38× last month
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (29)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://www.hamaraevent.com/uploads/blog/0076248001475654338.jpg" alt="Product Image"/>
              </a>
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Mehendi Artists
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  From ₹4k <span className="text-sm"></span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹6k</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  35× last month
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (3)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://imgmediagumlet.lbb.in/media/2023/10/6520072fd766a50bd12a61b5_1696597807795.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      Popular this season
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Multi-Cuisine Caterers
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  From ₹500/plate <span className="text-sm"></span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹700</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  33× last month
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
    {/* <!-- End Featured --> */}

    {/* <!-- Explore Interests --> */}
    <div className="py-6 sm:py-12 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      {/* <!-- Header --> */}
      <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
        <h2 className="font-medium text-xl text-gray-800 dark:text-neutral-200">
          Top Picks for Your Wedding
        </h2>
      </div>
      {/* <!-- End Header --> */}

      <div className="mb-3">
        {/* <!-- List --> */}
        <div className="relative flex flex-1 items-center overflow-hidden">
          <div className="flex flex-row items-center gap-2 py-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 after:h-px after:min-w-10">
            <button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/11881/11881148.png" alt="Venue" className="shrink-0 size-3.5"/>
  Venue
</button>

<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/4514/4514714.png" alt="Bride & Groom Essentials" className="shrink-0 size-3.5"/>
  Bride &amp; Groom Essentials
</button>

<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/17845/17845750.png" alt="Catering & Food" className="shrink-0 size-3.5"/>
  Catering &amp; Food
</button>

<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/6016/6016756.png" alt="Decor & Setup" className="shrink-0 size-3.5"/>
  Decor &amp; Setup
</button>

<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/1773/1773609.png" alt="Entertainment" className="shrink-0 size-3.5"/>
  Entertainment
</button>

<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/3249/3249934.png" alt="Photography & Videography" className="shrink-0 size-3.5"/>
  Photography &amp; Videography
</button>

<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/6002/6002697.png" alt="Invitations & Stationery" className="shrink-0 size-3.5"/>
  Invitations &amp; Stationery
</button>

<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/11622/11622740.png" alt="Gifts & Return Favors" className="shrink-0 size-3.5"/>
  Gifts &amp; Return Favors
</button>


<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/3163/3163173.png" alt="Makeup & Styling" className="shrink-0 size-3.5"/>
  Makeup &amp; Styling
</button>

<button type="button" className="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/515/515034.png" alt="Rentals" className="shrink-0 size-3.5"/>
  Rentals
</button>

          </div>

          <div className="absolute top-0 end-0 h-full w-12 pointer-events-none bg-linear-to-l from-white via-white/90 to-transparent dark:from-neutral-900 dark:via-neutral-900/95"></div>
        </div>
        {/* <!-- End List --> */}
      </div>

      {/* <!-- Grid --> */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx_dGPXv0JN3-nkPUgbdbGVT1mzSY6_RNcnQ&s" alt="Resorts"></img>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      New
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Sugam Resort & Convention Center
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹90000 <span className="text-sm">INR</span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹100000</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
      300-450
      <svg className="shrink-0 size-3 bi bi-person-fill" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (4k+)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://images.venuebookingz.com/28254-1686054421-wm-mary10.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">    
              Mary Lawn Party Hall
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹120000 <span className="text-sm">INR</span>
</span>

                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
      400-500
      <svg className="shrink-0 size-3 bi bi-person-fill" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (16k+)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://static.wixstatic.com/media/0057ed_daaa8ede0ebb479f9bbda20f6db193ed~mv2.jpg/v1/fill/w_716,h_602,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Copy-of-072A0956-Edit-min-1024x683.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
            
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Illam Hospitality & Banquets
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹150000 <span className="text-sm">INR</span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹175000</s>
                </span>
                 <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
      100-150
      <svg className="shrink-0 size-3 bi bi-person-fill" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (590)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87TsCDhwKtTRhIYWQrwI_Jk2L9lSl7XhYeA&s" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Sheraton Grand
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹200000 <span className="text-sm">INR</span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹225000</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
      200-250
      <svg className="shrink-0 size-3 bi bi-person-fill" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (58)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://images.venuebookingz.com/24089-1686048898-wm-thanthai-periyar-community-hall-2.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
             
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Thanthai Periyar Community Hall
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹90000 <span className="text-sm">INR</span>
</span>

                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹100000</s>
                </span>
               <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
      600-850
      <svg className="shrink-0 size-3 bi bi-person-fill" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
    </span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://content.jdmagicbox.com/comp/def_content/caterers/default-caterers-22.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
             
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Cathy Multi Cuisine Caterers 
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹220 <span className="text-sm">INR / Plate</span>
</span>

                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                 
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (29k+)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://moha-mushkil.com/wp-content/uploads/2018/09/IMG_20180724_212721.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
             
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Premier Food Consultants
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
               <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹149 <span className="text-sm">INR / plate</span>
</span>

                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                 
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (6k+)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://images.jdmagicbox.com/v2/comp/chennai/a2/044pxx44.xx44.210330020515.i4a2/catalogue/chemistry-lab-the-bar-school-kodambakkam-chennai-bartender-services-426gjykqf8.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
             
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Chemistry Lab The Cocktail Company
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹425 <span className="text-sm">INR / plate</span>
</span>

                
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://content.jdmagicbox.com/v2/comp/chennai/m6/044pxx44.xx44.090921161513.h7m6/catalogue/sriji-sweets-vepery-chennai-sweet-shops-37f8bph.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      New
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
             
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Sriji Sweets
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹129 <span className="text-sm">INR / Plate</span>
</span>

                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                 
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (29)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDslDDP1C653ta4es5oUErh-De3rFClLiCHw&s" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      New
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Meka Catering Services
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹160 <span className="text-sm">INR / Plate</span>
</span>

                
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://lh6.googleusercontent.com/proxy/6-PoU_DOIbURMTBFclfmrHB1Vd26vWmWpIKoT3YtUg1cBLNsc_sK0NX75Y1RgAHJKD0VN1_BlsCVZx_C6pYB-LC5r7P8vLW6POv4LogML7ThWZYIrw5rq5uO9WNDRPJqQLvPyXoaXuo" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
             
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
           
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Chennai Photography
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
               <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹34999 <span className="text-sm">INR</span>
</span>

                
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (93)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://knotstories.in/wp-content/uploads/2024/02/image8-1.webp" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
             
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
               Knot Stories
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹45999 <span className="text-sm">INR</span>
</span>

                
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (158)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://mysticstudios.in/wp-content/uploads/2019/05/CHENNAI_BEACH_CREATIVE_COUPLE_PRE_WEDDING_SHOOT_MYSTIC_STUDIOS1730.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Mystic Studios
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹22999 <span className="text-sm">INR</span>
</span>

                
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (29)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://i.ytimg.com/vi/glDDKWjyiSE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD_YXepabXRqthid0cHW4XqV0l48A" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Elite Captures
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹35590 <span className="text-sm">INR</span>
</span>

               
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://dlmphotography.in/wp-content/uploads/2024/06/Wedding-Photography-Chennai-Best-Candid-Wedding-Photography-In-Chennai.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
              
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                DLM Photography
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹28999 <span className="text-sm">INR</span>
</span>

              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (3)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN4yHnobAcx-vZMXI0_9R2-fKJSsF_cguNyg&s" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
             
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Styling By Rajesh
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹11599 <span className="text-sm">INR</span>
</span>

                
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (99)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://makeupnoor.wordpress.com/wp-content/uploads/2016/03/best-bridal-makeup-chennai-2.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Makeup Noor
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹10000 <span className="text-sm">INR</span>
</span>

               
              </div>
            </div>
          </div>
<div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (919)
                </span>
              </div>
          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn.augrav.com/online/jewels/2016/01/Beautiful-punjabi-mehandi-designs.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Senas Mehandi Art
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹8589 <span className="text-sm">INR</span>
</span>

                
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (329)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://www.studiovogueluxury.com/wp-content/uploads/2024/01/Hair-Care-Services.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Quick View --> */}
             
              {/* <!-- ENd Quick View --> */} 
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Studio Vogue Luxury
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹14000 <span className="text-sm">INR</span>
</span>

                
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (51)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR26FEBcAWRfDzKDsCOeAYL-Y2YQk-HYrOLBg&s" alt="Product Image"/>
              </a>

              {/* <!-- Add to Favorites --> */}
              <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                <button type="button" className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
              {/* <!-- End Add to Favorites --> */}

              {/* <!-- Badge Group --> */}
            
              {/* <!-- End Badge Group --> */}

              {/* <!-- Quick View --> */}
              
              {/* <!-- ENd Quick View --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Bridal Hairstylist Gopi
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold" style={{ color: '#E91E63' }}>
  ₹7500 <span className="text-sm">INR</span>
</span>

                
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button type="button" className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Grid --> */}

      <div className="mt-10 text-center max-w-40 mx-auto">
        <button
  type="button"
  className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-transparent text-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden"
  style={{ backgroundColor: '#E91E63' }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d81b60')}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E91E63')}
  onFocus={(e) => (e.currentTarget.style.backgroundColor = '#d81b60')}
  onBlur={(e) => (e.currentTarget.style.backgroundColor = '#E91E63')}
>
  See more
</button>

      </div>
    </div>
    {/* <!-- End Explore Interests --> */}
  </main>
  {/* <!-- ========== END MAIN CONTENT ========== --> */}

  {/* <!-- ========== FOOTER ========== --> */}
  <footer className="bg-white border-t border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
    <div className="w-full max-w-[85rem] mx-auto py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
      {/* <!-- Grid --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Company</h4>

          <ul className="grid space-y-2">
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">About RingsNroses </a></li>
            {/* <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Affiliate &amp; Influencer: Earn Commission</a></li> */}
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Contact us</a></li>
            {/* <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Press</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Preline's Tree Planting Program</a></li> */}
          </ul>
        </div>
        {/* <!-- End Col --> */}

        <div>
          <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Customer service</h4>

          <ul className="grid space-y-2">
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Privacy policy</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Refund policy</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Cookie Policy</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#"></a></li>
          </ul>
        </div>
        {/* <!-- End Col --> */}

        <div>
          <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Help</h4>

          <ul className="grid space-y-2">
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Support center &amp; FAQ</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Safety center</a></li>
            {/* <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#"></a></li> */}
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Sitemap</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#"></a></li>
          </ul>
        </div>
        {/* <!-- End Col --> */}

        <div className="space-y-10">
          <div className="space-y-10">
            <div>
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">Download the RingsNroses App</h4>

              {/* <!-- Social Brands --> */}
              <div className="mt-2 -mx-3 flex flex-col gap-y-2">
                <div className="max-w-42.5">
                  <a className="w-full inline-flex items-center gap-x-2 py-2 px-5 border border-gray-200 text-sm rounded-full hover:border-gray-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="#">
                    <svg className="shrink-0 size-6 text-black dark:text-white" width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6727 7.7422C15.44 7.7422 16.9903 7.05207 18.3238 5.6718C19.6572 4.29152 20.3239 2.6865 20.3239 0.856739C20.3239 0.655779 20.308 0.370205 20.2763 1.52588e-05C20.0435 0.0317458 19.8689 0.0581879 19.7525 0.0793416C18.1227 0.312032 16.6887 1.11058 15.4505 2.47496C14.2124 3.83938 13.5933 5.29898 13.5933 6.85377C13.5933 7.03355 13.6197 7.32973 13.6727 7.7422ZM20.0064 32C21.2658 32 22.6574 31.138 24.1814 29.414C25.7053 27.69 26.8694 25.6645 27.6737 23.3376C24.6787 21.7934 23.1813 19.5776 23.1813 16.6901C23.1813 14.2787 24.393 12.2162 26.8165 10.5028C25.1338 8.39796 22.9114 7.34556 20.1493 7.34556C18.9852 7.34556 17.9216 7.52008 16.9586 7.86912L16.3554 8.09123L15.5458 8.40854C15.0167 8.6095 14.5351 8.71001 14.1013 8.71001C13.7626 8.71001 13.3181 8.59363 12.7678 8.36094L12.1487 8.1071L11.5614 7.86912C10.7042 7.50951 9.78348 7.3297 8.79929 7.3297C6.16417 7.3297 4.04763 8.21815 2.44961 9.99506C0.851602 11.7719 0.0526123 14.1147 0.0526123 17.0233C0.0526123 21.1165 1.33312 24.8977 3.89416 28.3669C5.67208 30.789 7.29654 32 8.76753 32C9.39193 32 10.011 31.8784 10.6248 31.6351L11.4026 31.3178L12.0218 31.0957C12.8895 30.789 13.6885 30.6356 14.4187 30.6356C15.1913 30.6356 16.0802 30.8313 17.0856 31.2226L17.5777 31.413C18.6042 31.8043 19.4138 32 20.0064 32Z" fill="currentColor" />
                    </svg>

                    <div className="grow">
                      <span className="block text-[11px] leading-tight text-gray-500 dark:text-neutral-500">Download on the</span>
                      <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">App Store</span>
                    </div>
                  </a>
                </div>

                <div className="max-w-42.5">
                  <a className="w-full inline-flex items-center gap-x-2 py-2 px-5 border border-gray-200 text-sm rounded-full hover:border-gray-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="#">
                    <svg className="shrink-0 size-6" width="32" height="37" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.5159 11.1765L1.20745 0.140891C0.964824 1.05128e-05 0.659583 0.00783721 0.424782 0.148718C0.182154 0.289598 0.0334473 0.540052 0.0334473 0.821813C0.0334473 0.821813 0.041274 1.83928 0.0491007 3.5142L14.1137 17.5788L20.5159 11.1765Z" fill="url(#paint0_linear_4406_2034)" />
                      <path d="M0.0491007 3.5142C0.0725807 9.5564 0.143021 24.2236 0.174328 31.5259L14.1215 17.5788L0.0491007 3.5142Z" fill="url(#paint1_linear_4406_2034)" />
                      <path d="M31.5672 17.4927L20.5159 11.1765L14.1058 17.5788L21.3377 24.8106L31.575 18.8467C31.8177 18.7058 31.9664 18.4475 31.9664 18.1736C31.9664 17.8918 31.8098 17.6336 31.5672 17.4927Z" fill="url(#paint2_linear_4406_2034)" />
                      <path d="M0.166501 31.5259C0.182154 34.1322 0.189981 35.7993 0.189981 35.7993C0.189981 36.0811 0.338688 36.3394 0.581316 36.4724C0.823943 36.6133 1.12136 36.6133 1.36399 36.4724L21.3455 24.8185L14.1137 17.5866L0.166501 31.5259Z" fill="url(#paint3_linear_4406_2034)" />
                      <defs>
                        <linearGradient id="paint0_linear_4406_2034" x1="0.0334473" y1="18.3158" x2="31.972" y2="18.3158" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#63BE6B" />
                          <stop offset="0.506" stop-color="#5BBC6A" />
                          <stop offset="1" stop-color="#4AB96A" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_4406_2034" x1="0.0249224" y1="18.313" x2="31.9479" y2="18.313" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#3EC6F2" />
                          <stop offset="1" stop-color="#45AFE3" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_4406_2034" x1="0.0468809" y1="18.322" x2="31.963" y2="18.322" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#FAA51A" />
                          <stop offset="0.387" stop-color="#FAB716" />
                          <stop offset="0.741" stop-color="#FAC412" />
                          <stop offset="1" stop-color="#FAC80F" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_4406_2034" x1="0.169948" y1="27.082" x2="21.3452" y2="27.082" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#EC3B50" />
                          <stop offset="1" stop-color="#E7515B" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="grow">
                      <span className="block text-[11px] leading-tight text-gray-500 dark:text-neutral-500">Get it on</span>
                      <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
              {/* <!-- End Social Brands --> */}
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">Stay connected</h4>

              {/* <!-- Social Brands --> */}
              <div className="mt-2 -mx-2 flex flex-wrap items-center gap-1">
                <a className="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a className="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <svg className="shrink-0 size-4" width="48" height="50" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.5665 20.7714L46.4356 0H42.2012L26.6855 18.0355L14.2931 0H0L18.7397 27.2728L0 49.0548H4.23464L20.6196 30.0087L33.7069 49.0548H48L28.5655 20.7714H28.5665ZM22.7666 27.5131L5.76044 3.18778H12.2646L42.2032 46.012H35.699L22.7666 27.5142V27.5131Z" fill="currentColor" />
                  </svg>
                  <span className="sr-only">X (Twitter)</span>
                </a>
                <a className="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
              {/* <!-- End Social Brands --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>

    <div className="w-full max-w-[85rem] pb-10 mx-auto px-4 sm:px-6 lg:px-8">
      {/* <div className="mb-5 md:mb-10">
        <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">We accept</h4> */}

        {/* <!-- Cards --> */}
        {/* <div className="flex flex-wrap gap-x-2">
          <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M34.482 9a8.17 8.17 0 0 1 3.052.577l-.463 2.926-.308-.143a5.638 5.638 0 0 0-2.534-.52c-1.343 0-1.946.591-1.96 1.168 0 .635.73 1.053 1.92 1.673 1.96.966 2.868 2.148 2.855 3.69C37.016 21.184 34.692 23 31.122 23c-1.526-.015-2.996-.347-3.794-.721l.476-3.043.448.217c1.106.505 1.834.72 3.192.72.98 0 2.03-.418 2.043-1.325 0-.592-.447-1.024-1.763-1.688-1.288-.649-3.01-1.73-2.982-3.676.014-2.639 2.38-4.484 5.74-4.484ZM21.798 22.798H25.2l2.128-13.552h-3.402l-2.128 13.552Z" fill="#00579F" />
            <path clip-rule="evenodd" d="M46.255 9.246h-2.631c-.812 0-1.428.245-1.779 1.124l-5.053 12.428h3.57l.714-2.033h4.368c.098.476.406 2.033.406 2.033H49L46.255 9.246Zm-4.2 8.75 1.36-3.79c-.007.01.038-.116.104-.305.098-.28.243-.693.343-.993l.237 1.167s.645 3.244.785 3.922h-2.828Z" fill="#00579F" fill-rule="evenodd" />
            <path d="m15.624 18.487 3.332-9.241h3.598l-5.348 13.538h-3.598l-3.052-11.852c2.156 1.168 4.088 3.518 4.704 5.68l.364 1.875Z" fill="#00579F" />
            <path d="M12.53 9.246H7.056L7 9.519c4.27 1.125 7.098 3.836 8.26 7.094l-1.19-6.228c-.196-.866-.798-1.11-1.54-1.14Z" fill="#FAA61A" />
            <rect height="31" rx="5.5" stroke="currentColor" className="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M28.017 22.85A9.137 9.137 0 0 1 22.108 25C17.078 25 13 20.97 13 16s4.078-9 9.108-9c2.255 0 4.318.81 5.909 2.15A9.137 9.137 0 0 1 33.925 7c5.03 0 9.108 4.03 9.108 9s-4.078 9-9.108 9a9.137 9.137 0 0 1-5.908-2.15Z" fill="#ED0006" />
            <path d="M28.017 22.85a8.937 8.937 0 0 0 3.2-6.85c0-2.743-1.242-5.2-3.2-6.85A9.137 9.137 0 0 1 33.925 7c5.03 0 9.108 4.03 9.108 9s-4.078 9-9.108 9a9.137 9.137 0 0 1-5.908-2.15Z" fill="#F9A000" />
            <path d="M28.017 22.85c1.958-1.65 3.2-4.107 3.2-6.85 0-2.743-1.242-5.2-3.2-6.85a8.937 8.937 0 0 0-3.2 6.85c0 2.743 1.241 5.2 3.2 6.85Z" fill="#FF5E00" />
            <rect height="31" rx="5.5" stroke="currentColor" className="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M17.69 5.001h8.528c1.19 0 1.93 1 1.652 2.228L23.9 24.775C23.62 26.001 22.43 27 21.239 27H12.71c-1.188 0-1.93-1-1.653-2.225L15.03 7.23c.278-1.229 1.469-2.228 2.66-2.228Z" fill="#E21836" />
            <path d="M25.507 5h9.806c1.19 0 .654.999.374 2.228l-3.97 17.546C31.44 26 31.526 27 30.333 27h-9.806c-1.192 0-1.93-1-1.65-2.225l3.969-17.546C23.128 5.998 24.316 5 25.507 5Z" fill="#00447C" />
            <path d="M34.925 5h8.527c1.192 0 1.932.999 1.652 2.228l-3.969 17.546C40.855 26 39.662 27 38.47 27h-8.523c-1.192 0-1.932-1-1.653-2.225l3.97-17.546C32.542 5.998 33.732 5 34.924 5Z" fill="#007B84" />
            <path d="M19.917 10.623c-.877.01-1.136 0-1.219-.02-.032.155-.623 2.965-.625 2.967-.127.569-.22.974-.535 1.236a.937.937 0 0 1-.63.225c-.388 0-.615-.198-.653-.575l-.007-.13.119-.766s.62-2.56.732-2.899a.246.246 0 0 0 .009-.038c-1.21.01-1.423 0-1.438-.02-.008.027-.038.186-.038.186l-.634 2.886-.055.245-.105.8c0 .238.045.432.135.596.29.52 1.113.597 1.58.597.6 0 1.164-.131 1.544-.37.661-.403.834-1.031.988-1.59l.072-.286s.64-2.66.748-3.006c.005-.019.006-.029.012-.038Zm2.177 2.145a1.65 1.65 0 0 0-.69.166c-.091.05-.178.105-.27.161l.083-.307-.046-.052c-.537.112-.657.127-1.152.198l-.042.029c-.058.492-.109.861-.322 1.827-.082.356-.166.715-.25 1.07l.022.046c.509-.028.663-.028 1.104-.02l.036-.04c.056-.296.064-.366.188-.965.058-.284.18-.908.24-1.13.11-.053.22-.105.323-.105.248 0 .218.222.208.31-.01.15-.1.635-.193 1.052l-.062.27c-.043.198-.09.391-.133.588l.019.04c.5-.028.653-.028 1.081-.02l.05-.04c.078-.463.1-.586.238-1.26l.069-.308c.134-.605.2-.912.1-1.162-.108-.28-.365-.348-.601-.348Zm2.431.634c-.266.052-.436.088-.605.11-.167.028-.33.053-.588.09l-.02.019-.018.015c-.027.197-.046.368-.082.568-.03.207-.076.443-.151.781-.059.26-.09.35-.122.441-.033.091-.069.18-.134.435l.015.023.013.022c.24-.012.398-.02.56-.022.161-.006.328 0 .587.002l.023-.02.024-.02c.038-.23.043-.292.066-.404.023-.12.062-.287.158-.731.045-.21.096-.417.143-.63.048-.213.1-.422.148-.63l-.007-.026-.01-.023Zm.006-.854c-.242-.147-.667-.1-.953.102-.284.2-.317.482-.076.63.238.144.664.101.948-.104.284-.203.32-.483.08-.628Zm1.463 3.404c.49 0 .991-.14 1.369-.551.29-.334.424-.832.47-1.036.15-.679.033-.996-.114-1.189-.223-.294-.618-.388-1.027-.388-.246 0-.832.025-1.29.46-.329.313-.48.738-.572 1.146-.093.415-.2 1.163.469 1.442.206.09.503.116.695.116Zm-.038-1.527c.113-.514.246-.946.586-.946.266 0 .286.322.167.837-.021.115-.118.54-.25.721-.092.134-.2.215-.32.215-.036 0-.249 0-.252-.325a2.27 2.27 0 0 1 .069-.502Zm3.1 1.46.038-.04c.055-.295.064-.365.184-.964.06-.284.184-.908.243-1.13.11-.053.217-.105.324-.105.246 0 .216.222.207.31-.01.15-.1.635-.194 1.052l-.058.27c-.045.198-.093.391-.136.588l.018.04c.503-.028.65-.028 1.08-.02l.052-.04c.075-.463.096-.586.237-1.259l.067-.31c.135-.604.203-.911.104-1.161-.11-.28-.37-.348-.603-.348-.154 0-.438.039-.69.167-.09.048-.18.104-.268.16l.077-.307-.041-.052c-.537.112-.66.127-1.155.199l-.038.028c-.06.492-.109.86-.322 1.827-.081.356-.166.716-.25 1.07l.023.046c.509-.028.66-.028 1.101-.02Zm3.693.02.22-1.099s.16-.69.17-.715c0 0 .05-.072.1-.1h.075c.698 0 1.486 0 2.104-.469.42-.32.708-.795.836-1.37.034-.142.058-.31.058-.478 0-.22-.043-.438-.167-.609-.315-.454-.943-.462-1.667-.466l-.357.004c-.927.012-1.3.008-1.452-.011l-.037.193-.332 1.587-.832 3.528c.81-.01 1.141-.01 1.28.006Zm.615-2.814.352-1.575.011-.082.005-.061.141.015.745.066c.288.114.406.41.324.794-.076.352-.298.648-.583.791-.234.121-.522.131-.818.131h-.191l.014-.08Zm2.199 1.363c-.094.41-.2 1.158.464 1.424.212.093.402.12.595.11.204-.01.393-.116.568-.268l-.047.188.03.04c.478-.021.626-.021 1.144-.017l.047-.037c.076-.458.147-.902.344-1.778.096-.42.191-.835.29-1.253l-.016-.046c-.535.102-.678.124-1.192.199l-.04.032-.015.125a.741.741 0 0 0-.375-.318c-.229-.093-.766.027-1.228.46-.325.31-.48.733-.57 1.14Zm1.123.025c.115-.505.246-.932.587-.932.216 0 .33.205.306.554l-.061.283c-.034.15-.071.299-.107.447-.037.102-.08.198-.126.262-.088.128-.297.208-.417.208-.034 0-.244 0-.252-.32-.001-.159.03-.322.07-.502Zm5.868-1.666-.042-.049c-.529.11-.625.128-1.111.196l-.036.036-.006.024-.001-.008c-.362.86-.352.674-.646 1.35l-.004-.082-.073-1.467-.047-.049c-.554.11-.567.128-1.08.196l-.04.036c-.005.018-.005.037-.008.058l.003.008c.064.336.049.261.113.793.03.26.07.523.1.78.05.432.078.644.14 1.302-.346.587-.428.81-.76 1.325l.002.005-.235.382c-.027.04-.05.068-.085.08a.344.344 0 0 1-.154.022h-.13l-.193.661.663.012c.389-.002.633-.189.765-.44l.416-.735H40.1l.043-.052c.28-.621 2.412-4.384 2.412-4.384Zm-6.991 8.682h-.281l1.04-3.54h.345l.11-.366.01.406c-.013.25.179.473.682.436h.582l.2-.681h-.218c-.127 0-.185-.033-.178-.103l-.01-.413h-1.078v.002c-.349.008-1.39.034-1.6.092-.256.068-.524.267-.524.267l.105-.365H33.74l-.21.724-1.054 3.595h-.205l-.2.678h2.008l-.067.225h.99l.065-.226h.278l.218-.73Zm-.824-2.821c-.162.046-.462.185-.462.185l.267-.905h.801l-.193.66s-.248.015-.413.06Zm.015 1.293s-.252.032-.417.07c-.164.052-.47.212-.47.212l.277-.942h.805l-.195.66Zm-.449 1.537h-.804l.233-.795h.801l-.23.795Zm1.936-2.197h1.158l-.166.555h-1.174l-.176.607h1.027l-.778 1.127a.322.322 0 0 1-.158.136.45.45 0 0 1-.208.062h-.285l-.196.664h.745c.388 0 .617-.181.785-.42l.534-.75.114.762a.357.357 0 0 0 .192.26c.075.038.152.104.26.114.117.005.202.009.258.009h.366l.22-.744h-.145c-.082 0-.225-.014-.25-.04-.024-.033-.024-.083-.037-.16l-.116-.764h-.476l.209-.256h1.171l.18-.607h-1.084l.169-.555h1.081l.2-.684h-3.223l-.197.684Zm-9.785 2.351.27-.926h1.111l.204-.688h-1.113l.17-.57h1.087l.201-.667h-2.72l-.197.667h.618l-.165.57h-.62l-.204.7h.617l-.36 1.225c-.049.162.023.224.068.3a.299.299 0 0 0 .199.149c.109.025.183.04.285.04h1.253l.223-.763-.555.079c-.108 0-.405-.014-.372-.116Zm.127-4.433-.281.524a.606.606 0 0 1-.164.219c-.043.027-.128.039-.251.039h-.147l-.197.67h.488c.235 0 .415-.088.501-.133.093-.05.117-.022.188-.093l.165-.147h1.524l.202-.697h-1.115l.195-.382h-1.108Zm2.25 4.447c-.026-.039-.007-.107.032-.248l.417-1.419h1.482c.216-.003.372-.006.473-.013a.95.95 0 0 0 .356-.124.675.675 0 0 0 .26-.246c.063-.09.167-.29.255-.596l.524-1.796-1.538.009s-.473.072-.682.151c-.21.089-.51.336-.51.336l.138-.492h-.95l-1.33 4.54a2.886 2.886 0 0 0-.086.38c-.002.083.102.165.17.227.079.062.197.052.31.062.118.01.287.015.52.015h.73l.224-.779-.654.064a.17.17 0 0 1-.141-.071Zm.718-2.625h1.556l-.099.319c-.014.007-.047-.016-.206.003h-1.347l.096-.322Zm.311-1.071h1.57l-.113.384s-.74-.007-.858.015c-.521.093-.826.38-.826.38l.227-.78Zm1.18 2.459a.172.172 0 0 1-.06.098c-.032.021-.084.029-.16.029H30.6l.013-.389h-.922l-.037 1.9c-.002.138.011.217.109.28.097.08.397.09.802.09h.578l.208-.711-.503.028-.167.01c-.023-.01-.045-.019-.07-.044-.02-.022-.056-.008-.05-.146l.004-.487.527-.022c.285 0 .407-.096.511-.187.1-.087.132-.187.169-.322l.088-.431h-.725l-.092.304Z" fill="#FEFEFE" />
            <rect height="31" rx="5.5" stroke="currentColor" className="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M19.648 15.984c0 2.074 1.629 3.683 3.725 3.683.592 0 1.1-.117 1.726-.411v-1.62c-.55.55-1.038.772-1.662.772-1.386 0-2.37-1.005-2.37-2.434 0-1.355 1.015-2.424 2.306-2.424.656 0 1.153.235 1.726.794v-1.62c-.604-.306-1.101-.433-1.694-.433-2.085 0-3.757 1.642-3.757 3.693ZM16.116 14.27c0 .382.242.584 1.068.89 1.566.572 2.03 1.08 2.03 2.2 0 1.366-1.003 2.317-2.434 2.317-1.047 0-1.809-.412-2.443-1.343l.89-.856c.316.612.845.94 1.501.94.614 0 1.069-.423 1.069-.995 0-.296-.138-.55-.413-.73-.138-.085-.412-.212-.951-.402-1.293-.465-1.736-.962-1.736-1.935 0-1.155.952-2.022 2.2-2.022.774 0 1.482.265 2.074.783l-.72.943c-.359-.402-.698-.572-1.11-.572-.593 0-1.025.338-1.025.783Z" fill="#231F20" />
            <path clip-rule="evenodd" d="M8.02 12.451H6v7.057h2.01c1.068 0 1.84-.252 2.518-.815a3.54 3.54 0 0 0 1.28-2.709c0-2.082-1.555-3.533-3.788-3.533Zm1.608 5.301c-.432.39-.994.561-1.883.561h-.37v-4.666h.37c.89 0 1.429.159 1.883.57.476.424.763 1.081.763 1.757 0 .677-.287 1.354-.763 1.778Z" fill="#231F20" fill-rule="evenodd" />
            <path d="M13.819 12.451h-1.377v7.057h1.377V12.45ZM34.13 12.451l1.882 4.74 1.906-4.74h1.492l-3.048 7.238h-.74l-2.995-7.238h1.503ZM40.033 19.508h3.903v-1.195h-2.528v-1.905h2.435v-1.195h-2.435v-1.566h2.528V12.45h-3.903v7.057Z" fill="#231F20" />
            <path clip-rule="evenodd" d="M46.889 12.451c1.587 0 2.497.762 2.497 2.083 0 1.08-.57 1.79-1.607 2L50 19.509h-1.693l-1.905-2.835h-.18v2.835h-1.374V12.45h2.04Zm-.666 3.249h.402c.879 0 1.345-.382 1.345-1.091 0-.687-.466-1.046-1.323-1.046h-.424V15.7Z" fill="#231F20" fill-rule="evenodd" />
            <path d="M29.302 19.758a3.754 3.754 0 1 0 0-7.508 3.754 3.754 0 0 0 0 7.508Z" fill="#F48120" />
            <path d="M56 20c-1.492 1.035-12.661 8.428-32 12h28.85c1.74 0 3.15-1.39 3.15-3.104V20Z" fill="#F47216" />
            <rect height="31" rx="5.5" stroke="currentColor" className="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>
        </div> */}
        {/* <!-- End Cards --> */}
      {/* </div> */}

      {/* <!-- List --> */}
      <ul className="flex flex-wrap items-center whitespace-nowrap gap-3">
        <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <p className="text-xs text-gray-500 dark:text-neutral-500">
            © 2025 RingsNroses.
          </p>
        </li>
        <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <a className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
            Terms and Conditions
          </a>
        </li>
        <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <a className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
            Privacy &amp; Policy
          </a>
        </li>
      </ul>
      {/* <!-- End List --> */}
    </div>

      {/* <!-- Cart Offcanvas --> */}
  <div id="hs-pro-shco" className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform size-full sm:w-100 z-80 flex flex-col bg-white hidden dark:bg-neutral-800" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shco-label">
    {/* <!-- Header --> */}
    <div className="py-3 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
      <h3 id="hs-pro-shco-label" className="font-medium text-gray-800 dark:text-neutral-200">
        Cart (3 items)
      </h3>
      <button type="button" className="py-1.5 px-2 inline-flex justify-center items-center gap-x-1 rounded-full border border-gray-200 text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700" aria-label="Close" data-hs-overlay="#hs-pro-shco">
        <span className="hidden lg:block">Esc</span>
        <span className="block lg:hidden">Close</span>
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
    {/* <!-- End Header --> */}

    {/* <!-- Body --> */}
    <div className="h-full overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      {/* <!-- Alert --> */}
      <div className="py-4 px-6 relative overflow-hidden bg-linear-to-r from-orange-100 via-purple-200 via-70% to-indigo-200 dark:from-orange-800 dark:via-purple-800 dark:to-indigo-800" role="alert" tabIndex="-1" aria-labelledby="hs-pro-shfshal-label">
        <h4 id="hs-pro-shfshal-label" className="font-medium text-gray-800 dark:text-neutral-200">
          Free shipping&nbsp;on orders over $50
        </h4>
        <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
          <a className="font-medium text-xs text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="./login.html">Log In</a> or <a className="font-medium text-xs text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="./create-account.html">Register</a>
        </p>
      </div>
      {/* <!-- End Alert --> */}

      <div className="p-6 space-y-7">
        {/* <!-- Item --> */}
        <div id="hs-pro-shcopci1" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
          <div className="relative">
            <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://cdn.augrav.com/online/jewels/2016/01/Beautiful-punjabi-mehandi-designs.jpg" alt="Product Image"/>

            <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
              <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <span className="sr-only">Add to favorites</span>
              </button>
            </div>
          </div>

          <div className="grow flex flex-col">
            <h4 className="text-sm text-gray-800 dark:text-neutral-200">
              Senas Mehandi Art
            </h4>

            {/* <!-- <ul className="mt-1.5 space-y-1">
              <li className="text-xs text-gray-500 dark:text-neutral-500">
              
              </li>
              <li className="text-xs text-gray-500 dark:text-neutral-500">
              
              </li>
            </ul>

            <p className="mt-1.5 text-xs text-gray-500 dark:text-neutral-500">
              <span>Qty:</span>
              <span>1</span>
            </p> --> */}

            <span className="mt-1.5 text-sm text-gray-800 dark:text-neutral-200">
              ₹8589
            </span>

            <div className="">
              <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shcopci1">
                Remove
              </button>
            </div>
          </div>
        </div>
        {/* <!-- End Item --> */}

        {/* <!-- Item --> */}
        <div id="hs-pro-shcopci2" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
          <div className="relative">
            <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://knotstories.in/wp-content/uploads/2024/02/image8-1.webp" alt="Product Image"/>

            <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
              <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <span className="sr-only">Add to favorites</span>
              </button>
            </div>
          </div>

          <div className="grow flex flex-col">
            <h4 className="text-sm text-gray-800 dark:text-neutral-200">
              Knot Stories
            </h4>

            
            <span className="mt-1.5">
              <span className="text-sm text-gray-500 dark:text-neutral-500">
                <s>₹45999</s>
              </span>
              <span className="text-sm text-red-500">
                ₹42999
              </span>
            </span>

            <div className="">
              <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shcopci2">
                Remove
              </button>
            </div>
          </div>
        </div>
        {/* <!-- End Item --> */}

        {/* <!-- Item --> */}
        <div id="hs-pro-shcopci3" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
          <div className="relative">
            <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87TsCDhwKtTRhIYWQrwI_Jk2L9lSl7XhYeA&s" alt="Product Image"/>

            <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
              <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <span className="sr-only">Add to favorites</span>
              </button>
            </div>
          </div>

          <div className="grow flex flex-col">
            <h4 className="text-sm text-gray-800 dark:text-neutral-200">
              Sheraton Gardens
            </h4>
            <span className="mt-1.5">
              <span className="text-sm text-gray-500 dark:text-neutral-500">
                <s>₹225000</s>
              </span>
              <span className="text-sm text-red-500">
                ₹200000
              </span>
            </span>

            <div className="">
              <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shcopci3">
                Remove
              </button>
            </div>
          </div>
        </div>
        {/* <!-- End Item --> */}
      </div>
    </div>
    {/* <!-- End Body --> */}

    {/* <!-- Footer --> */}
    <div className="py-4 sm:py-6 px-6 border-t border-gray-200 dark:border-neutral-700">
      {/* <!-- List --> */}
      <div className="mb-1 grid grid-cols-2 gap-2">
        <div>
          <p className="font-semibold text-gray-800 dark:text-neutral-200">
            Subtotal
          </p>
        </div>
        <div className="text-end">
          <span className="font-semibold text-gray-800 dark:text-neutral-200">₹251588</span>
        </div>
      </div>
      {/* <!-- End List --> */}


      <div className="flex items-center gap-x-2">
        <a className="py-3 px-4 relative w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300" href="../../pro/shop/cart.html">
          View cart (3)
        </a>

        <a className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-indigo-700" href="../../pro/shop/checkout.html">
          Checkout
        </a>
      </div>
    </div>
    {/* <!-- End Footer --> */}
  </div>
  {/* <!-- End Cart Offcanvas --> */}
  </footer>
  {/* <!-- ========== END FOOTER ========== --> */}

  {/* <!-- ========== SECONDARY CONTENT ========== --> */}
  {/* <!-- Regional Settings Modal --> */}
  <div id="hs-pro-shmnrsm" className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shmnrsm-label">
    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div className="w-full max-h-full relative overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
        {/* <!-- Header --> */}
        <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
          <h3 id="hs-pro-shmnrsm-label" className="font-medium text-gray-800 dark:text-neutral-200">
            Select the location for your wedding.
          </h3>
          <button type="button" className="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-pro-shmnrsm">
            <span className="sr-only">Close</span>
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {/* <!-- End Header --> */}

        {/* <!-- Body --> */}
        <div id="hs-pro-shmnrsm-body" className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className="p-6 space-y-5">
            {/* <!-- Select Input --> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200">
                Location
              </label>

              {/* <!-- Language Select --> */}
              <div className="relative">
                <select id="hs-pro-select-locations" data-hs-select='{
                  "placeholder": "Select country",
                  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><div data-icon></div></button>",
                  "dropdownClasses": "z-80 w-full min-w-45 max-h-72 p-1 space-y-0.5 z-50 w-full overflow-hidden overflow-y-auto bg-white rounded-xl shadow-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                  
                  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex items-center gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
                  "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                  "optionTemplate": "<div><div className=\"flex items-center gap-x-2\"><div data-icon></div><div className=\"text-gray-800 dark:text-neutral-200\" data-title></div><span className=\"hidden hs-selected:block ms-auto\"><svg className=\"shrink-0 size-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div></div>",
                  "dropdownScope": "window",
                  "viewport": "#hs-pro-shmnrsm-body"
                }' className="hidden">
                        <option value="">Choose</option>
                        <option
                          selected
                          value="English-us"
                          data-hs-select-option={JSON.stringify({
                            icon: `<svg className="shrink-0 size-4 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill-rule="evenodd"><g stroke-width="1pt"><path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/><path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/></g><path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"/><path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3z..." /></g></svg>`,
                          })}
                        >
                          Chennai
                        </option>
                  <option value="English-uk" data-hs-select-option='{
                  "icon": "<svg className=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-gb\" viewBox=\"0 0 512 512\"><path fill=\"#012169\" d=\"M0 0h512v512H0z\"/><path fill=\"#FFF\" d=\"M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z\"/><path fill=\"#C8102E\" d=\"M184 324l11 34L42 512H0v-3l184-185zm124-12l54 8 150 147v45L308 312zM512 0L320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z\"/><path fill=\"#FFF\" d=\"M176 0v512h160V0H176zM0 176v160h512V176H0z\"/><path fill=\"#C8102E\" d=\"M0 208v96h512v-96H0zM208 0v512h96V0h-96z\"/></svg>"}'>
                    English (United Kingdom)
                  </option>
                  <option value="Deutsch" data-hs-select-option='{
                  "icon": "<svg className=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-de\" viewBox=\"0 0 512 512\"><path fill=\"#ffce00\" d=\"M0 341.3h512V512H0z\"/><path d=\"M0 0h512v170.7H0z\"/><path fill=\"#d00\" d=\"M0 170.7h512v170.6H0z\"/></svg>"}'>
                    Deutsch
                  </option>
                  <option value="Dansk" data-hs-select-option='{
                  "icon": "<svg className=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-dk\" viewBox=\"0 0 512 512\"><path fill=\"#c8102e\" d=\"M0 0h512.1v512H0z\"/><path fill=\"#fff\" d=\"M144 0h73.1v512H144z\"/><path fill=\"#fff\" d=\"M0 219.4h512.1v73.2H0z\"/></svg>"}'>
                    Dansk
                  </option>
                  <option value="Italiano" data-hs-select-option='{
                  "icon": "<svg className=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-it\" viewBox=\"0 0 512 512\"><g fill-rule=\"evenodd\" stroke-width=\"1pt\"><path fill=\"#fff\" d=\"M0 0h512v512H0z\"/><path fill=\"#009246\" d=\"M0 0h170.7v512H0z\"/><path fill=\"#ce2b37\" d=\"M341.3 0H512v512H341.3z\"/></g></svg>"}'>
                    Italiano
                  </option>
                  <option value="中文-繁體" data-hs-select-option='{
                  "icon": "<svg className=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"flag-icon-css-cn\" viewBox=\"0 0 512 512\"><defs><path id=\"a\" fill=\"#ffde00\" d=\"M1-.3L-.7.8 0-1 .6.8-1-.3z\"/></defs><path fill=\"#de2910\" d=\"M0 0h512v512H0z\"/><use width=\"30\" height=\"20\" transform=\"matrix(76.8 0 0 76.8 128 128)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-121 142.6 -47) scale(25.5827)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-98.1 198 -82) scale(25.6)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-74 272.4 -114) scale(25.6137)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"matrix(16 -19.968 19.968 16 256 230.4)\" xlink:href=\"#a\"/></svg>"}'>
                    中文 (繁體)
                  </option>
                </select>

                <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg className="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </div>
                {/* <!-- End Header --> */}
              </div>
              {/* <!-- End Language Select --> */}
            </div>
            {/* <!-- End Select Input --> */}
        
          </div>
        </div>
        {/* <!-- End Body --> */}

        {/* <!-- Footer --> */}
        <div className="p-6 pt-2 md:pt-2 flex flex-col gap-2">
          <button type="button" className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700" data-hs-overlay="#hs-pro-shmnrsm">
            Change Location
          </button>

          <div className="text-center">
            <button type="button" className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300" data-hs-overlay="#hs-pro-shmnrsm">
              Cancel
            </button>
          </div>
        </div>
        {/* <!-- End Footer --> */}
      </div>
    </div>
  </div>
  {/* <!-- End Regional Settings Modal --> */}

  {/* <!-- Regional Settings Modal --> */}
  <div id="hs-pro-shmnlcm" className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shmnlcm-label">
    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div className="w-full max-h-full relative overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
        {/* <!-- Header --> */}
        <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
          <h3 id="hs-pro-shmnlcm-label" className="font-medium text-gray-800 dark:text-neutral-200">
            Choose your location
          </h3>
          <button type="button" className="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-pro-shmnlcm">
            <span className="sr-only">Close</span>
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {/* <!-- End Header --> */}

        {/* <!-- Body --> */}
        <div id="hs-pro-shmnlcm-body" className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className="p-6 space-y-5">
            <p className="text-[13px] text-gray-800 dark:text-neutral-200">
              Delivery options and delivery speeds may vary for different locations
            </p>

            {/* <!-- Checkbox Grid --> */}
            <div className="p-0.5 space-y-2">
              {/* <!-- Checkbox --> */}
              <label for="hs-pro-shmarach1" className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                <span className="flex gap-x-2.5">
                  <input type="radio" id="hs-pro-shmarach1" className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins" checked/>
                  <span className="grow -mt-0.5">
                    <span className="block font-semibold">
                      James Collins
                      <span className="ms-1 py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200">Default</span>
                    </span>
                    <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                      2305 Coney Island Ave, Brooklyn NY 11223
                    </span>
                  </span>
                </span>
              </label>
              {/* <!-- End Checkbox --> */}

              {/* <!-- Checkbox --> */}
              <label for="hs-pro-shmarach2" className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                <span className="flex gap-x-2.5">
                  <input type="radio" id="hs-pro-shmarach2" className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins"/>
                  <span className="grow -mt-0.5">
                    <span className="block font-semibold">
                      James Collins
                    </span>
                    <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                      Im Wiegenfeld 4 85570 Markt Schwaben, Markt Schwaben 85570
                    </span>
                  </span>
                </span>
              </label>
              {/* <!-- End Checkbox --> */}

              {/* <!-- Checkbox --> */}
              <label for="hs-pro-shmarach3" className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                <span className="flex gap-x-2.5">
                  <input type="radio" id="hs-pro-shmarach3" className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins"/>
                  <span className="grow -mt-0.5">
                    <span className="block font-semibold">
                      James Collins
                    </span>
                    <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                      109 Rogers Rd Ste 3 WS003536, Wilmington DE 19801
                    </span>
                  </span>
                </span>
              </label>
              {/* <!-- End Checkbox --> */}

              <div id="hs-shnlmsaa-heading" className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-shnlmsaa">
                <div className="p-0.5 space-y-2">
                  {/* <!-- Checkbox --> */}
                  <label for="hs-pro-shmarach4" className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                    <span className="flex gap-x-2.5">
                      <input type="radio" id="hs-pro-shmarach4" className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins"/>
                      <span className="grow -mt-0.5">
                        <span className="block font-semibold">
                          James Collins
                        </span>
                        <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                          645 W 1ST AVE C/O 3536-WS, ROSELLE NJ 07203
                        </span>
                      </span>
                    </span>
                  </label>
                  {/* <!-- End Checkbox --> */}

                  {/* <!-- Checkbox --> */}
                  <label for="hs-pro-shmarach5" className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                    <span className="flex gap-x-2.5">
                      <input type="radio" id="hs-pro-shmarach5" className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins"/>
                      <span className="grow -mt-0.5">
                        <span className="block font-semibold">
                          James Collins
                        </span>
                        <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                          Arch 294 Jewell Street, London SE5 OBU
                        </span>
                      </span>
                    </span>
                  </label>
                  {/* <!-- End Checkbox --> */}
                </div>
              </div>
            </div>
            {/* <!-- End Checkbox Grid --> */}

            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className="hs-collapse-toggle hs-collapse-open:hidden font-medium text-sm text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 focus:outline-hidden focus:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-600 dark:focus:text-emerald-600" id="hs-shnlmsaa" aria-expanded="false" aria-controls="hs-shnlmsaa-heading" data-hs-collapse="#hs-shnlmsaa-heading">
                See all
                <span className="ms-1 inline-block w-px h-3 bg-gray-300 dark:bg-neutral-600"></span>
              </button>
              <a className="font-medium text-sm text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 focus:outline-hidden focus:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-600 dark:focus:text-emerald-600" href="#">
                Manage address book
              </a>
            </div>
          </div>
        </div>
        {/* <!-- End Body --> */}

        {/* <!-- Footer --> */}
        <div className="p-6 pt-2 md:pt-2 flex flex-col gap-2">
          <button type="button" className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700" data-hs-overlay="#hs-pro-shmnlcm">
            Done
          </button>

          <div className="text-center">
            <button type="button" className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300" data-hs-overlay="#hs-pro-shmnlcm">
              Cancel
            </button>
          </div>
        </div>
        {/* <!-- End Footer --> */}
      </div>
    </div>
  </div>
  {/* <!-- End Regional Settings Modal --> */}

  {/* <!-- Product Detail Modal --> */}
  <div id="hs-pro-shmchpdm" className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shmchpdm-label">
    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md lg:max-w-4xl sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div className="relative w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
        {/* <!-- Close Button --> */}
        <div className="absolute top-2 end-2.5 z-10">
          <button type="button" className="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-pro-shmchpdm">
            <span className="sr-only">Close</span>
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* <!-- Body --> */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* <!-- Image Preview --> */}
          <div className="hidden lg:block relative">
            <img className="shrink-0 absolute inset-0 size-full object-cover object-center rounded-t-xl lg:rounded-tr-none lg:rounded-s-xl" src="https://images.unsplash.com/photo-1652540492984-c347f10fcbaf?q=80&w=980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
          </div>
          {/* <!-- End Image Preview --> */}

          {/* <!-- Content --> */}
          <div className="py-4 sm:py-6 md:py-8">
            <div className="flex flex-col justify-between gap-5 lg:gap-0">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-x-3">
                  <div className="lg:hidden shrink-0 size-20">
                    <img className="shrink-0 size-full object-cover object-center rounded-xl" src="https://images.unsplash.com/photo-1652540492984-c347f10fcbaf?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                  </div>
                  <div className="grow">
                    <h4 id="hs-pro-shmchpdm-label" className="font-medium text-lg leading-tight text-gray-800 dark:text-neutral-200">
                      Google Pixel Tablet - 11-Inch Tablet, 8 GB RAM - 128 GB, Porcelain | Android Tablet, Extra-Long Battery Life
                    </h4>
                  </div>
                </div>

                {/* <!-- Badge Group --> */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="py-0.5 px-1.5 text-xs uppercase bg-orange-600 text-white rounded-md dark:bg-orange-500">
                    #1 Best seller
                  </span>
                  <a className="flex items-center gap-x-1 text-sm text-gray-800 underline-offset-4 hover:underline focus:outline-hidden focus:underline dark:text-neutral-200" href="#">
                    in Tablets, Laptops &amp; Accessories
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                </div>
                {/* <!-- End Badge Group --> */}

                <div className="mt-1">
                  {/* <!-- Reviews --> */}
                  <a className="inline-block font-medium text-sm text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-emerald-500 dark:focus:text-emerald-500" href="#reviews">
                    <ul className="flex flex-wrap items-center gap-2">
                      <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                        {/* <!-- Rating --> */}
                        <div className="flex flex-wrap items-center">
                          <span className="me-1">
                            4.8
                          </span>

                          {/* <!-- Stars --> */}
                          <div className="inline-flex items-center gap-x-0.5">
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"></path>
                            </svg>
                          </div>
                          {/* <!-- End Stars --> */}
                        </div>
                        {/* <!-- End Rating --> */}
                      </li>
                      <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                        112 reviews
                      </li>
                    </ul>
                  </a>
                  {/* <!-- End Reviews --> */}
                </div>
              </div>

              <div className="lg:my-4 pb-1 px-4 sm:px-6 lg:px-8 max-h-72 lg:h-64 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                {/* <!-- Model --> */}
                <div>
                  <span className="mb-2 block font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Model:
                  </span>

                  {/* <!-- Grid --> */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* <!-- Checkbox --> */}
                    <label for="hs-pro-shmpdm-pro" className="group relative overflow-hidden flex items-center gap-2 p-1.5 text-xs bg-white text-gray-800 border border-gray-200 cursor-pointer rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200
                    has-checked:text-emerald-600 dark:has-checked:text-emerald-500
                    has-checked:border-emerald-600 dark:has-checked:border-emerald-500
                    has-checked:ring-1
                    has-checked:ring-emerald-600 dark:has-checked:ring-emerald-500
                    has-disabled:pointer-events-none
                    has-disabled:text-gray-200 dark:has-disabled:text-neutral-700
                    has-disabled:after:absolute
                    has-disabled:after:inset-0
                    has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-gray-200)_calc(50%-1px),var(--color-gray-200)_50%,transparent_50%)]
                    dark:has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-neutral-700)_calc(50%-1px),var(--color-neutral-700)_50%,transparent_50%)] ">
                      <input type="radio" id="hs-pro-shmpdm-pro" className="hidden bg-transparent border-gray-200 text-emerald-600 focus:ring-white focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-900" name="hs-pro-shmfdsr"/>
                      <img className="shrink-0 size-12 rounded-md" src="https://images.unsplash.com/photo-1660820936253-f636cfc17b8b?q=80&w=60&h=60&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                      <span className="grow truncate">
                        <span className="block font-semibold truncate">
                          Apple Pencil Pro
                        </span>
                        <span className="block">
                          $89
                        </span>
                      </span>
                    </label>
                    {/* <!-- End Checkbox --> */}

                    {/* <!-- Checkbox --> */}
                    <label for="hs-pro-shmpdm-usb" className="group relative overflow-hidden flex items-center gap-2 p-1.5 text-xs bg-white text-gray-800 border border-gray-200 cursor-pointer rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200
                    has-checked:text-emerald-600 dark:has-checked:text-emerald-500
                    has-checked:border-emerald-600 dark:has-checked:border-emerald-500
                    has-checked:ring-1
                    has-checked:ring-emerald-600 dark:has-checked:ring-emerald-500
                    has-disabled:pointer-events-none
                    has-disabled:text-gray-200 dark:has-disabled:text-neutral-700
                    has-disabled:after:absolute
                    has-disabled:after:inset-0
                    has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-gray-200)_calc(50%-1px),var(--color-gray-200)_50%,transparent_50%)]
                    dark:has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-neutral-700)_calc(50%-1px),var(--color-neutral-700)_50%,transparent_50%)] ">
                      <input type="radio" id="hs-pro-shmpdm-usb" className="hidden bg-transparent border-gray-200 text-emerald-600 focus:ring-white focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-900" name="hs-pro-shmfdsr"/>
                      <img className="shrink-0 size-12 rounded-md" src="https://images.unsplash.com/photo-1602144124318-f448134df981?q=80&w=60&h=60&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image"/>
                      <span className="grow truncate">
                        <span className="block font-semibold truncate">
                          Apple Pencil (USB-C)
                        </span>
                        <span className="block">
                          $79
                        </span>
                      </span>
                    </label>
                    {/* <!-- End Checkbox --> */}
                  </div>
                  {/* <!-- End Grid --> */}
                </div>
                {/* <!-- End Model --> */}

                {/* <!-- Price Group --> */}
                <div className="mt-5">
                  <span className="font-semibold text-xl text-gray-800 dark:text-neutral-200">
                    $89 <span className="text-xl">USD</span>
                  </span>
                  <span className="text-sm text-gray-500 dark:text-neutral-500">
                    <s>$109</s>
                  </span>
                </div>
                {/* <!-- End Price Group --> */}

                {/* <!-- Badge Group --> */}
                <div className="flex flex-wrap items-center gap-1">
                  <span className="py-0.5 px-1.5 text-[10px] border border-orange-500 text-orange-500 rounded-md">
                    -25% Limited time
                  </span>
                </div>
                {/* <!-- End Badge Group --> */}

                {/* <!-- Price Group --> */}
                <div className="mt-5 grid grid-cols-2 items-center gap-2">
                  <div>
                    <span className="block font-medium text-lg text-emerald-600 dark:text-emerald-500">
                      In stock
                    </span>

                    <span className="block text-xs text-gray-600 dark:text-neutral-400">
                      2k+ sold this week
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-2.5">
                      <span className="text-xs text-gray-800 dark:text-neutral-200">Qty:</span>
                    </div>

                    <select className="py-2 ps-10 pe-8 w-full inline-block border-gray-200 rounded-full text-sm text-gray-800 cursor-pointer hover:bg-gray-50 focus:border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                      <option selected>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>
                </div>
                {/* <!-- End Price Group --> */}
              </div>

              <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-2">
                {/* <!-- Button Group --> */}
                <div className="flex gap-2">
                  <button type="button" className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                    Add to cart
                  </button>

                  <button type="button" className="flex shrink-0 justify-center items-center size-11 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                    <span className="sr-only">Favorite</span>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                </div>

                <button type="button" className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950 dark:focus:bg-emerald-950">
                  Buy now
                </button>
                {/* <!-- End Button Group --> */}
              </div>
            </div>
          </div>
          {/* <!-- End Content --> */}
        </div>
        {/* <!-- End Body --> */}
      </div>
    </div>
  </div>
  {/* <!-- End Product Detail Modal --> */}
  {/* <!-- ========== END SECONDARY CONTENT ========== --> */}

  {/* <!-- JS PLUGINS --> */}
  <script src="./assets/vendor/@floating-ui/core/dist/floating-ui.core.umd.min.js"></script>
  <script src="./assets/vendor/@floating-ui/dom/dist/floating-ui.dom.umd.min.js"></script>
  {/* <!-- Required plugins --> */}
  <script src="./assets/vendor/preline/dist/index.js?v=3.0.1"></script>
  {/* <!-- Clipboard --> */}
  <script src="./assets/vendor/clipboard/dist/clipboard.min.js"></script>
  <script src="./assets/js/hs-copy-clipboard-helper.js"></script>
{/* <!-- Countdown Script --> */}

  {/* <!-- Catalog navigation --> */}
   <div>
      {/* Your HTML for tabs + select dropdown goes here */}
      <TabsSync />
    </div>

      </div>
    </div>
  );
 
}
