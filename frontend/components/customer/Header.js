import Footer from '@/components/Footer';
import CustomerUserProfile from '@/components/CustomerUserProfile';
import SearchBar from "@/components/SearchBar";
import Catalog from "@/components/Catalog";
import Logo from '@/components/Logo';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';

let isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};

const api_url = getApiUrl();
const api = axios.create({
  baseURL: `${api_url}/api/v1`,
  headers: {
    ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
  },
});

const Header = ({ onOpenLocationSelector, selectedLocationName }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const headerContainerRef = useRef(null);
  const { data: session, status } = useSession();
  const user = session?.user;

 let accessToken = session?.accessToken;

  
  const storedDataString = sessionStorage.getItem('session');
  if (storedDataString) {
    try {
      const storedData = JSON.parse(storedDataString);
   
      if (storedData && storedData.tokens && storedData.tokens.access) {
        accessToken = storedData.tokens.access;
      }
    } catch (error) {
      console.error("Failed to parse session data from sessionStorage:", error);
    }
  }

 
  if (!accessToken) {
    alert('Authentication error. Your session may have expired. Please log in again.');
    setIsLoading(false);
    return;
  }


  const handlePrelineLoad = useCallback(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
      console.log("Preline.js autoInit called.");
    } else {
      console.warn("HSStaticMethods not found, Preline autoInit might not work.");
    }
  }, []);
  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
      console.log("Preline autoInit called from useEffect.");
    }
  }, []);


  return (
    <div>
      <Script
        src="https://cdn.jsdelivr.net/npm/preline@latest/dist/preline.js"
        strategy="afterInteractive"
        onLoad={handlePrelineLoad}
      />
      <link rel="canonical" href="https://preline.co/" />
      <link rel="shortcut icon" href="../favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/assets/css/main.min.css?v=3.0.1" />
      <style>{`
        @keyframes typing {
          0% { opacity: 1; scale: 1; }
          50% { opacity: 0.75; scale: 0.75; }
          100% { opacity: 1; scale: 1; }
        }
      `}</style>
      <div className="dark:bg-neutral-900">
        <header className="flex flex-col lg:flex-nowrap z-50 bg-white dark:bg-neutral-900"></header>
        <div className="bg-gray-100 dark:bg-neutral-800">
          <div className="max-w-[85rem] flex justify-between w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-x-5">
            </div>

            <ul className="flex flex-wrap items-center gap-3">
              <li className="inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
                <button
                  type="button"
                  className="flex items-center gap-x-1.5 text-start text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                  onClick={onOpenLocationSelector}
                >
                  <img className="shrink-0 size-3.5 rounded-full" src="in.png" alt="English" />
                  {selectedLocationName || user?.customer_profile?.event_location || 'Select Location'}
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
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                  <span className="sr-only">Dark mode</span>
                </button>
                <button type="button" className="hs-dark-mode-active:flex hidden hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="light">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div
          ref={headerContainerRef}
          className="max-w-[85rem] basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 z-30 relative bg-white dark:bg-neutral-900"
        >
          <div className="max-w-[85rem] basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 dark:bg-neutral-900">
            <div className="w-full flex md:flex-nowrap md:items-center gap-2 lg:gap-6 ">
              <div className="order-1 md:w-auto flex items-center gap-x-1">
                <Logo />
                <Catalog
                  isCatalogOpen={isCatalogOpen}
                  setIsCatalogOpen={setIsCatalogOpen}
                  api={api}
                  toggleCatalog={() => setIsCatalogOpen(!isCatalogOpen)}
                />
              </div>
              <div className="md:w-full order-2 md:grow md:w-auto">
                <div className="relative flex basis-full items-center gap-x-1 md:gap-x-3">
                  <div className="font-inter">
                  </div>
                  <div className="hidden md:block w-full">
                    <SearchBar />
                  </div>
                </div>
              </div>
              <CustomerUserProfile />
            </div>
            <div className="md:hidden mt-2.5 md:mt-0 w-full">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header;