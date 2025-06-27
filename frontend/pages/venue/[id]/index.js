'use client';
import Head from 'next/head';
import Script from 'next/script';
import debounce from 'lodash/debounce';
// import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from "axios";
import { createContext, useContext, useEffect, useState } from 'react';
import FavoriteButton from "@/components/FavoriteButton";
import CategoryItemCard from "@/components/CategoryItemCard";
import { useSession } from 'next-auth/react'; // Import useSession
import { useRouter } from "next/router";
import LocationSelector from '@/components/LocationSelector'; // Adjust the path as necessary

const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;



// Get the base API URL based on the environment
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST // e.g., 'http://127.0.0.1:8000'
    : process.env.NEXT_PUBLIC_HOST; // e.g., 'https://your-production-api.com'
};



const api_url = getApiUrl();
const api = axios.create({
  baseURL: api_url + "/api/v1", // Adjust this to your backend API base URL
},
  {
    headers: {
      ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' })    }
  });




export default function ProductDetail() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    setCurrentDate(`${year}-${month}-${day}`);
  }, []); // Empty dependency array means this runs once on mount
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [selectedLocationName, setSelectedLocationName] = useState('Chennai');
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpandedfacilities] = useState(false);
  const [loading, setLoading] = useState(false);
  const [venueData, setVenueData] = useState(null); // To store API response
  const [showContent, setShowContent] = useState(false);
  const [isDark, setIsDark] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const [venueId, setVenueId] = useState(null);  // 👈 state to store ID
  const [favoriteId, setFavoriteId] = useState(null); // CRITICAL: This must hold the ID to deletesug.data.results.slice(0, 4)
  const [relatedItems , setrelatedItems] = useState(null); // CRITICAL: This must hold the ID to deletesug.data.results.slice(0, 4)


  const accessToken = session?.accessToken;


    // Set venueId from router query
    useEffect(() => {
        if (router.isReady && router.query.id) {
            console.log(router.query.id);
            setVenueId(router.query.id);
        }
    }, [router.isReady, router.query.id]);
  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined" && venueData?.images?.length > 0) {
      import("preline").then(({ HSStaticMethods }) => {
        setTimeout(() => {
          window.HSStaticMethods?.autoInit();
        }, 300); // slight delay to allow DOM rendering
      });
    }
  }, [venueData?.images]);



  useEffect(() => {
        

        const fetchVenueData = async () => {
            setLoading(true);
            try {
                const config = {
  headers: {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    'ngrok-skip-browser-warning': 'true',
  },
};

const sug = await api.get(`/venues/?location=${venueData?.location_details?.id}`, config);




var apiResponse = sug.data.results.slice(0, 5);

setrelatedItems(apiResponse);




            } catch (err) {
                console.error("Error fetching venue data:", err);
                setError("Failed to load venue data.");
            } finally {
                //setLoading(false);
            }
        };

        fetchVenueData();
    }, [accessToken,venueData]);



  // In the ProductDetail component

    useEffect(() => {
        if (!venueId) return;

        const fetchVenueData = async () => {
            setLoading(true);
            try {
                const config = {
  headers: {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    'ngrok-skip-browser-warning': 'true',
  },
};

                const response = await api.get(`/venues/${venueId}/`, config);
                setVenueData(response.data);
                // Set the initial favorite state from the API response
                setIsFavorite(response.data.is_favorite || false);
                setShowContent(true);
                setError(null);
            } catch (err) {
                console.error("Error fetching venue data:", err);
                setError("Failed to load venue data.");
                setVenueData(null);
                setShowContent(false);
            } finally {
                setLoading(false);
            }
        };

        fetchVenueData();
    }, [venueId, accessToken]);

  console.log(venueData)

  useEffect(() => {
    // Content switch logic
    function contentToSwitch() {
      const BREAKPOINTS = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
      };
      let currentWrapper;
      const windowWidth = window.innerWidth;
      const contentToSwitchEls = document.querySelectorAll('[data-hs-switch-place]');

      contentToSwitchEls.forEach((el) => {
        const options = JSON.parse(el.getAttribute('data-hs-switch-place'));
        Object.keys(options).forEach((key) => {
          if (windowWidth >= BREAKPOINTS[key]) {
            currentWrapper = document.querySelector(options[key]);
          }
        });

        if (currentWrapper && !currentWrapper.contains(el)) {
          currentWrapper.appendChild(el);
        }
      });
    }

    // Run once on load
    contentToSwitch();

    // Debounced resize event
    const handleResize = debounce(() => {
      contentToSwitch();
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Wait for window load event
    function onLoad() {
      (function () {
        const tabsId = 'hs-pro-reviews-tabs';
        // window.HSStaticMethods.HSTabs.init()

        // Make sure HSTabs and HSScrollNav are available globally
        if (!window.HSTabs || !window.HSScrollNav) return;

        const tabs = window.HSTabs.getInstance(`#${tabsId}`, true);
        const scrollNav = window.HSScrollNav.getInstance('#hs-pro-reviews-tabs-scroll', true);

        tabs.element.on('change', ({ el }) => {
          scrollNav.element.centerElement(el);
        });

        const debouncedResize = debounce(() => {
          scrollNav.element.centerElement(tabs.element.current);
        }, 100);

        window.addEventListener('resize', debouncedResize);

        window.addEventListener('change.hs.tab', ({ detail }) => {
          if (detail.payload.tabsId !== tabsId) return false;

          const tabsScrollEl = document.querySelector('#hs-pro-reviews-tabs-scroll');

          if (tabsScrollEl) {
            window.scrollTo({
              top: tabsScrollEl.offsetTop,
              behavior: 'smooth',
            });
          }
        });

        // Cleanup listeners on unmount
        return () => {
          window.removeEventListener('resize', debouncedResize);
          window.removeEventListener('change.hs.tab');
        };
      })();
    }

    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.HSSelect) {
      // window.HSSelect.init(); // or similar init if using Preline
    }
  }, []);
  useEffect(() => {
    // Reinitialize Preline if needed after component mount
    import('preline').then(({ default: HS }) => {
      HS?.init?.();
    });
  }, []);
  useEffect(() => {
    import("preline").then(({ HSStaticMethods }) => {
      HSStaticMethods?.autoInit();
    });
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('USD');

  const currencies = [
    'USD', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN',
    'BAM', 'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP',
    'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF',
    'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GIP',
    'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS',
    'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT',
    'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT',
    'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO',
    'NOK', 'NPR', 'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR',
    'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL',
    'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS',
    'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
    'YER', 'ZAR', 'ZMW',
  ];

  const filtered = currencies.filter((currency) =>
    currency.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (currency) => {
    setSelectedOption(currency);
    setIsOpen(false);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const text = ``;


  const facilityText = [
    "VM Grand Mahal features a spacious indoor banquet hall accommodating 20 to 1000 guests, ideal for memorable celebrations. With top-notch amenities and a vibrant ambience, it ensures a unique and enjoyable experience.",
    "VM Grand Mahal offers comfortable guest accommodations and expert decor vendors to enhance your wedding experience. With diverse cuisines and heartfelt service, they ensure every ceremony is memorable and flawlessly executed."
  ];

  const handlePrelineLoad = async () => {
    // const el = document.querySelector('[data-hs-carousel]');
    // if (el && window.HSCarousel) {
    //   window.HSCarousel.autoInit(el);
    // }
    if (typeof window !== "undefined" && venueData?.images?.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 200)); // short delay
      window.HSStaticMethods?.autoInit();
    }
  };


  return (

    <div>

      {/* <!-- JS PLUGINS --> */}
      <Script
        src="/assets/vendor/@floating-ui/core/dist/floating-ui.core.umd.min.js"
        strategy="beforeInteractive"
      />

      {/* Floating UI DOM */}
      <Script
        src="/assets/vendor/@floating-ui/dom/dist/floating-ui.dom.umd.min.js"
        strategy="beforeInteractive"
      />

      {/* Preline (required plugins) */}
      <Script
        src="/assets/vendor/preline/dist/index.js?v=3.0.1"
        strategy="afterInteractive"
      />

      {/* Clipboard */}
      <Script
        src="/assets/vendor/clipboard/dist/clipboard.min.js"
        strategy="afterInteractive"
      />

      {/* Clipboard helper */}
      <Script
        src="/assets/js/hs-copy-clipboard-helper.js"
        strategy="afterInteractive"
      />

      {/* Lodash */}
      <Script
        src="/assets/vendor/lodash/lodash.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          // Optionally can setup lodash globally here if needed
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/preline@latest/dist/preline.js"
        strategy="afterInteractive"
        onLoad={handlePrelineLoad} />
      {/* Canonical */}
      <link rel="canonical" href="https://preline.co/" />
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
      {/* Theme Script - Can go in _document.js or a useEffect in _app.js */}
      {/* <Script
        dangerouslySetInnerHTML={{
          __html: `
            const html = document.querySelector('html');
            const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || 
              (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
            const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || 
              (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

            if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
            else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
            else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
            else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
          `,
        }}
      /> */}
      {showContent ? (

        <div className="dark:bg-neutral-900">
          {/* <!-- ========== HEADER ========== -->  */}
          <header className="flex flex-col lg:flex-nowrap z-50 bg-white dark:bg-neutral-900"></header>
          {/* <!-- Topbar --> */}
          <div className="bg-gray-100 dark:bg-neutral-800">
            <div className="max-w-[85rem] flex justify-between w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-x-5">

              </div>

              <ul className="flex flex-wrap items-center gap-3">
                <li className="inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
                  <button
  type="button"
  className="flex items-center gap-x-1.5 text-start text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
  onClick={() => setIsLocationSelectorOpen(true)} // Opens the LocationSelector
>
  <img className="shrink-0 size-3.5 rounded-full" src="./public/in.png" alt="English" />
  {selectedLocationName} {/* Displays the selected location */}
</button>

{/* Location Selector Component */}
<LocationSelector
  isOpen={isLocationSelectorOpen}
  onClose={() => setIsLocationSelectorOpen(false)} // Closes the modal
  onSave={(selectedLocationData) => {
    // This function will be called when the "Save" button in LocationSelector is clicked.
    // selectedLocationData will contain { country, state, location, locationId }
    console.log('Selected Location:', selectedLocationData);
    setSelectedLocationName(selectedLocationData.location || 'Chennai'); // Update the displayed name
    setIsLocationSelectorOpen(false); // Close the modal after saving
  }}
  onChange={(currentSelection) => {
    // This function can be used to handle intermediate changes in the selector if needed
    console.log('Current Selection in selector:', currentSelection);
  }}
/>

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
                  {/* <button type="button" className="hs-dark-mode-active:hidden flex hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="dark">
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
                </button> */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-x-1.5 text-sm text-gray-500 dark:text-neutral-200 hover:text-gray-700 dark:hover:text-neutral-400"
                  >
                    {isDark ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      </svg>

                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                    )}
                    <span className="sr-only">Toggle Theme</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- End Topbar --> */}


          <div className="max-w-[85rem] basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
          
            <div className="w-full flex md:flex-nowrap md:items-center gap-2 lg:gap-6">
              {/* <!-- Logo --> */}
              <div className="order-1 md:w-auto flex items-center gap-x-1">
                <div className="hidden sm:block">
                  {/* <!-- Logo --> */}
                  <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="./index.html" aria-label="Preline">
                    <svg className="w-28 h-auto" width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4413 63.3563 11.1335 64.7474 11.1335C65.683 11.1335 66.5539 11.2843 67.3603 11.5859C68.1728 11.8814 68.8806 12.3277 69.4839 12.9247C70.0932 13.5218 70.5672 14.2727 70.9057 15.1776C71.2443 16.0762 71.4135 17.1288 71.4135 18.3352V19.4155H59.4384V16.978H67.7111C67.7111 16.4117 67.588 15.91 67.3418 15.473C67.0956 15.036 66.754 14.6944 66.317 14.4482C65.8861 14.1958 65.3844 14.0696 64.812 14.0696C64.2149 14.0696 63.6856 14.2081 63.2239 14.4851C62.7684 14.7559 62.4114 15.1222 62.1529 15.5838C61.8944 16.0393 61.762 16.5471 61.7559 17.1072V19.4247C61.7559 20.1264 61.8851 20.7327 62.1437 21.2436C62.4083 21.7545 62.7807 22.1484 63.2608 22.4254C63.741 22.7024 64.3103 22.8409 64.9689 22.8409C65.406 22.8409 65.8061 22.7794 66.1692 22.6562C66.5324 22.5331 66.8432 22.3485 67.1018 22.1023C67.3603 21.8561 67.5572 21.5545 67.6927 21.1974L71.3304 21.4375C71.1458 22.3116 70.7672 23.0748 70.1948 23.7273C69.6285 24.3736 68.896 24.8783 67.9974 25.2415C67.1048 25.5985 66.0738 25.777 64.9043 25.777ZM77.1335 6.59091V25.5H73.2003V6.59091H77.1335ZM79.5043 25.5V11.3182H83.4375V25.5H79.5043ZM81.4801 9.49006C80.8954 9.49006 80.3937 9.29616 79.9752 8.90838C79.5628 8.51444 79.3566 8.04356 79.3566 7.49574C79.3566 6.95407 79.5628 6.48935 79.9752 6.10156C80.3937 5.70762 80.8954 5.51065 81.4801 5.51065C82.0649 5.51065 82.5635 5.70762 82.9759 6.10156C83.3944 6.48935 83.6037 6.95407 83.6037 7.49574C83.6037 8.04356 83.3944 8.51444 82.9759 8.90838C82.5635 9.29616 82.0649 9.49006 81.4801 9.49006ZM89.7415 17.3011V25.5H85.8083V11.3182H89.5569V13.8203H89.723C90.037 12.9955 90.5632 12.343 91.3019 11.8629C92.0405 11.3767 92.9361 11.1335 93.9887 11.1335C94.9735 11.1335 95.8322 11.349 96.5647 11.7798C97.2971 12.2107 97.8665 12.8262 98.2728 13.6264C98.679 14.4205 98.8821 15.3684 98.8821 16.4702V25.5H94.9489V17.1719C94.9551 16.304 94.7335 15.6269 94.2841 15.1406C93.8348 14.6482 93.2162 14.402 92.4283 14.402C91.8989 14.402 91.4311 14.5159 91.0249 14.7436C90.6248 14.9714 90.3109 15.3037 90.0831 15.7408C89.8615 16.1716 89.7477 16.6918 89.7415 17.3011ZM107.665 25.777C106.206 25.777 104.951 25.4815 103.898 24.8906C102.852 24.2936 102.045 23.4503 101.479 22.3608C100.913 21.2652 100.63 19.9695 100.63 18.4737C100.63 17.0149 100.913 15.7346 101.479 14.6328C102.045 13.531 102.842 12.6723 103.87 12.0568C104.905 11.4413 106.117 11.1335 107.508 11.1335C108.444 11.1335 109.315 11.2843 110.121 11.5859C110.934 11.8814 111.641 12.3277 112.245 12.9247C112.854 13.5218 113.328 14.2727 113.667 15.1776C114.005 16.0762 114.174 17.1288 114.174 18.3352V19.4155H102.199V16.978H110.472C110.472 16.4117 110.349 15.91 110.103 15.473C109.856 15.036 109.515 14.6944 109.078 14.4482C108.647 14.1958 108.145 14.0696 107.573 14.0696C106.976 14.0696 106.446 14.2081 105.985 14.4851C105.529 14.7559 105.172 15.1222 104.914 15.5838C104.655 16.0393 104.523 16.5471 104.517 17.1072V19.4247C104.517 20.1264 104.646 20.7327 104.905 21.2436C105.169 21.7545 105.542 22.1484 106.022 22.4254C106.502 22.7024 107.071 22.8409 107.73 22.8409C108.167 22.8409 108.567 22.7794 108.93 22.6562C109.293 22.5331 109.604 22.3485 109.863 22.1023C110.121 21.8561 110.318 21.5545 110.454 21.1974L114.091 21.4375C113.907 22.3116 113.528 23.0748 112.956 23.7273C112.389 24.3736 111.657 24.8783 110.758 25.2415C109.866 25.5985 108.835 25.777 107.665 25.777Z" className="fill-emerald-600 dark:fill-white" fill="currentColor" />
                      <path d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12" className="stroke-emerald-600 dark:stroke-white" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12" className="stroke-emerald-600 dark:stroke-white" stroke="currentColor" strokeWidth="2" />
                      <circle cx="13" cy="16.5214" r="5" className="fill-emerald-600 dark:fill-white" fill="currentColor" />
                    </svg>
                  </a>
                  {/* <!-- End Logo --> */}
                </div>
                <div className="sm:hidden">
                  <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="./index.html" aria-label="Preline">
                    <svg className="w-[31px] h-auto" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" className="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" className="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
                      <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" className="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* <!-- End Logo --> */}

              {/* <!-- Search --> */}
              <div className="md:w-full order-2 md:grow md:w-auto">
                <div className="relative flex basis-full items-center gap-x-1 md:gap-x-3">
                  {/* <!-- Dropdown Link --> */}
                  <div className="hs-dropdown [--adaptive:none] [--auto-close:inside] md:inline-block">
                    {/* <!-- Link Button --> */}
                    <button id="hs-pro-shmnctdm" type="button" className="hs-dropdown-toggle relative py-[7px] sm:py-2 sm:py-2.5 px-3 flex items-center gap-x-1.5 text-sm text-start bg-emerald-600 border border-transparent text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                      <svg className="hs-dropdown-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                      </svg>
                      <svg className="hs-dropdown-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                      Catalog
                    </button>
                    {/* {/* <!-- End Link Button -->  */}

                    {/* {/* <!-- Dropdown Menu -->  */}
                    <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-20 top-full start-0 min-w-60 bg-white shadow-xl before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shmnctdm">
                      {/* {/* <!-- Container -->  */}
                      <div className="max-w-[85rem] w-full mx-auto py-2 md:py-4 px-4 sm:px-6 lg:px-8">
                        <select id="hs-catalog-sidebar-nav-select" className="hidden" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}
                          data-hs-select='{
                    "placeholder": "Select option...",
                    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span className=\"me-2\" data-icon></span><span className=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
                    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 px-3 pe-9 flex items-center text-nowrap w-full cursor-pointer bg-gray-100 text-gray-800 rounded-lg text-start text-sm dark:bg-neutral-800 dark:text-neutral-200",
                    "wrapperClasses": "sm:hidden mb-4",
                    "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                    "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                    "optionTemplate": "<div className=\"flex items-center\"><div className=\"me-3\" data-icon></div><div className=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div>",
                    "extraMarkup": "<div className=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg className=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                  }'>
                          <option value="#mega-menu-catalog-tab-1" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-map-pinned-icon lucide-map-pinned\"><path d=\"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/><path d=\"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712\"/></svg>"
}' >Venue</option>
                          <option value="#mega-menu-catalog-tab-2" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z\"/></svg>"
                    }'>Bride &amp; Groom Essentials</option>
                          <option value="#mega-menu-catalog-tab-3" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-hand-platter-icon lucide-hand-platter\"><path d=\"M12 3V2\"/><path d=\"m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5\"/><path d=\"M2 14h12a2 2 0 0 1 0 4h-2\"/><path d=\"M4 10h16\"/><path d=\"M5 10a7 7 0 0 1 14 0\"/><path d=\"M5 14v6a1 1 0 0 1-1 1H2\"/></svg>"
}'>Catering &amp; Food</option>
                          <option value="#mega-menu-catalog-tab-4" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-flower-icon lucide-flower\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5\"/><path d=\"M12 7.5V9\"/><path d=\"M7.5 12H9\"/><path d=\"M16.5 12H15\"/><path d=\"M12 16.5V15\"/><path d=\"m8 8 1.88 1.88\"/><path d=\"M14.12 9.88 16 8\"/><path d=\"m8 16 1.88-1.88\"/><path d=\"M14.12 14.12 16 16\"/></svg>"
}'>Decor &amp; Setup</option>
                          <option value="#mega-menu-catalog-tab-5" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-drama-icon lucide-drama\"><path d=\"M10 11h.01\"/><path d=\"M14 6h.01\"/><path d=\"M18 6h.01\"/><path d=\"M6.5 13.1h.01\"/><path d=\"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3\"/><path d=\"M17.4 9.9c-.8.8-2 .8-2.8 0\"/><path d=\"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7\"/><path d=\"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4\"/></svg>"
 }'>Entertainment</option>
                          <option value="#mega-menu-catalog-tab-6" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-camera-icon lucide-camera\"><path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/></svg>"
}'>Photography &amp; Videography</option>
                          <option value="#mega-menu-catalog-tab-7" data-hs-select-option='{
 "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-mail-check-icon lucide-mail-check\"><path d=\"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/><path d=\"m16 19 2 2 4-4\"/></svg>"
 }'>Invitations &amp; Stationery</option>
                          <option value="#mega-menu-catalog-tab-9" data-hs-select-option='{
 "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-gift-icon lucide-gift\"><rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"/><path d=\"M12 8v13\"/><path d=\"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\"/><path d=\"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5\"/></svg>"
 }'>Gifts &amp; Return Favors</option>
                          <option value="#mega-menu-catalog-tab-11" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-brush-icon lucide-brush\"><path d=\"m11 10 3 3\"/><path d=\"M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z\"/><path d=\"M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031\"/></svg>"
}'>Makeup &amp; Styling</option>
                          <option value="#mega-menu-catalog-tab-13" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"lucide lucide-hand-coins-icon lucide-hand-coins\"><path d=\"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17\"/><path d=\"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9\"/><path d=\"m2 16 6 6\"/><circle cx=\"16\" cy=\"9\" r=\"2.9\"/><circle cx=\"6\" cy=\"5\" r=\"3\"/></svg>"
}'>Rentals</option>


                        </select>

                        {/* {/* <!-- Grid -->  */}
                        <div className="flex">
                          {/* {/* <!-- Sidebar -->  */}
                          <div className="hidden sm:block sm:pe-4 w-96 h-[75dvh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                            <div id="hs-catalog-sidebar-nav-tabs" className="flex flex-col gap-y-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal" data-hs-tabs='{
                        "eventType": "hover",
                        "preventNavigationResolution": "sm"
                      }'>
                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 active" id="mega-menu-catalog-tab-item-1" aria-selected="true" data-hs-tab="#mega-menu-catalog-tab-1" aria-controls="mega-menu-catalog-tab-1" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pinned-icon lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" /><circle cx="12" cy="8" r="2" /><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" /></svg>


                                Venue
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-2" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-2" aria-controls="mega-menu-catalog-tab-2" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shirt-icon lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg>
                                Bride &amp; Groom Essentials
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-3" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-3" aria-controls="mega-menu-catalog-tab-3" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-platter-icon lucide-hand-platter"><path d="M12 3V2" /><path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" /><path d="M2 14h12a2 2 0 0 1 0 4h-2" /><path d="M4 10h16" /><path d="M5 10a7 7 0 0 1 14 0" /><path d="M5 14v6a1 1 0 0 1-1 1H2" /></svg>
                                Catering &amp; Food
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-4" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-4" aria-controls="mega-menu-catalog-tab-4" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flower-icon lucide-flower"><circle cx="12" cy="12" r="3" /><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" /><path d="M12 7.5V9" /><path d="M7.5 12H9" /><path d="M16.5 12H15" /><path d="M12 16.5V15" /><path d="m8 8 1.88 1.88" /><path d="M14.12 9.88 16 8" /><path d="m8 16 1.88-1.88" /><path d="M14.12 14.12 16 16" /></svg>
                                Decor &amp; Setup
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-5" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-5" aria-controls="mega-menu-catalog-tab-5" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-drama-icon lucide-drama"><path d="M10 11h.01" /><path d="M14 6h.01" /><path d="M18 6h.01" /><path d="M6.5 13.1h.01" /><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3" /><path d="M17.4 9.9c-.8.8-2 .8-2.8 0" /><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7" /><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4" /></svg>
                                Entertainment
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-6" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-6" aria-controls="mega-menu-catalog-tab-6" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera-icon lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>Photography &amp; Videography
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-7" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-7" aria-controls="mega-menu-catalog-tab-7" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check-icon lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><path d="m16 19 2 2 4-4" /></svg>
                                Invitations &amp; Stationery
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-9" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-9" aria-controls="mega-menu-catalog-tab-9" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" /></svg>
                                Gifts &amp; Return Favors
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}

                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-11" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-11" aria-controls="mega-menu-catalog-tab-11" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brush-icon lucide-brush"><path d="m11 10 3 3" /><path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" /><path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" /></svg>
                                Makeup &amp; Styling
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>
                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}

                              {/* {/* <!-- End Link -->  */}

                              {/* {/* <!-- Link -->  */}
                              <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-13" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-13" aria-controls="mega-menu-catalog-tab-13" role="tab" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-coins-icon lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>
                                Rentals
                                <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </a>

                            </div>
                          </div>
                          {/* {/* <!-- End Sidebar -->  */}

                          {/* {/* <!-- Content -->  */}
                          <div className="pe-4 sm:px-10 w-full h-[75dvh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">

                            {/* {/* <!-- Tab -->  */}
                            {/* {/* <!-- Grid -->  */}
                            <div id="mega-menu-catalog-tab-1" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-1">
                              {/* {/* <!-- Grid -->  */}
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-6">
                                {/* {/* <!-- Item -->  */}
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.venuebookingz.com/24118-1720587040-wm-league-hotels-banquet-chennai-1.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Banquet Halls</span>
                                </a>
                                {/* {/* <!-- End Item -->  */}

                                {/* {/* <!-- Item -->  */}
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.unexplora.com/wp-content/uploads/2020/11/Untitled-design-85.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Resorts</span>
                                </a>
                                {/* {/* <!-- End Item -->  */}

                                {/* {/* <!-- Item -->  */}
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn0.weddingwire.in/vendor/4599/3_2/960/jpg/wedding-venue-aj-garden-outdoor-space-1_15_364599-161640601569768.jpeg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Outdoor Lawns & Gardens</span>
                                </a>
                                {/* {/* <!-- End Item -->  */}

                                {/* {/* <!-- Item -->  */}
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/Top-7-Destination-Wedding-Locations-in-India.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Destination Venues</span>
                                </a>
                                {/* {/* <!-- End Item -->  */}

                                {/* {/* <!-- Item -->  */}
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://media.weddingz.in/images/ce4bb19da8f580022371692fda5715b5/thinking-of-a-beach-wedding-check-out-the-best-beach-wedding-venues-in-goa-2.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Beachside Venues</span>
                                </a>
                                {/* {/* <!-- End Item -->  */}

                                {/* {/* <!-- Item -->  */}
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://media.weddingz.in/photologue/1490602150941/palace-wedding-venues-in-india-gajner-palace.PNG" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Heritage Properties</span>
                                </a>
                                {/* {/* <!-- End Item -->  */}

                                {/* {/* <!-- Item -->  */}
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://imagewedz.oyoroomscdn.com/medium/photologue/images/diamond-banquet-chembur-mumbai-4.jpeg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Community Halls</span>
                                </a>
                                {/* {/* <!-- End Item -->  */}

                                {/* {/* <!-- Item -->  */}
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.brides.com/thmb/6rWBPzOU1FKL8U4JJWdxTh7v4-8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/J0GNM_v_QLTPspmntIY9Wx0-blZ0KWIyAGTfiPDU7Vz73PGoHrCJhs8u9UmLiQvm3_tX_NmoFw1ylvOHf_c7M-S112OA0R0X2CuTxIhgaEscCQgLwczPt6ACGKFjcopy-df74a973bac843b69df2ff927153bc12.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Rooftop Venues</span>
                                </a>
                                {/* {/* <!-- End Item -->  */}


                              </div>
                              {/* {/* <!-- Grid -->  */}
                            </div>
                            {/* {/* <!-- End Grid -->  */}
                            {/* {/* <!-- End Tab -->  */}

                            {/* {/* <!-- Tab -->  */}
                            {/* {/* <!-- Grid -->  */}
                            <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.visionvivaah.com/blog/wp-content/uploads/2020/01/best-wedding-dresses-for-indian-bride1.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Bridal Wear</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCVQETB2x5r5eCHyaWRCSe3NDxbRI817N1bw&s" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Groom Wear</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTagJonsg3okffWkoZ2IaItujDfucHwgrQtDg&s" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Jewelry</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.shaadisaga.com/shaadisaga_production/photos/pictures/000/476/585/new_medium/tsg_%285%29.jpg?1532692503" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Footwear</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqBATTreSNWj8iUVlHBekdr4_DhvEjwmfw_Q&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Accessories</span>
                                </a>

                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.riccoindia.com/cdn/shop/products/IMG_2384_2048x.jpg?v=1657351657" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Custom Designers</span>
                                </a>

                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">

                                <div className="col-span-2 flex justify-center">
                                  <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://static.fibre2fashion.com//articleresources/images/75/7486/wedding-small_Small.jpg" alt="Product Image" />
                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Bridal Shopping Boutiques</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            {/* {/* <!-- End Grid -->  */}
                            {/* {/* <!-- End Tab -->  */}

                            {/* {/* <!-- Tab -->  */}
                            {/* {/* <!-- Grid -->  */}
                            <div id="mega-menu-catalog-tab-3" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-3">
                              {/* {/* <!-- Grid -->  */}
                              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOF--vmxkIKTRlsB_j1cgw1jQZnHZLwyFkA&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Veg / Non-Veg Caterers</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://admin.venuelook.com/images/new-home-images/optimized/vendor/caterer.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Multi-Cuisine Caterers</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.captainjoe.in/images/catering-specialists.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Regional Cuisine Specialists</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bzBgybsWbj23ahaKRLIzKXg2d9AHF3KJYQ&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Sweet & Dessert Vendors</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://5.imimg.com/data5/SELLER/Default/2020/10/BZ/NO/XH/58672911/neato-foods-ambattur-corporate-canteen-500x500.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Live Counters</span>
                                </a>

                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://tastytablecatering.com/wp-content/uploads/2023/03/bartender-making-cocktails-at-open-bar-wedding.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Beverage Services</span>
                                </a>

                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">

                                <div className="col-span-2 flex justify-center">
                                  <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTpNcpPpR6sNUwvc8KCdFLS2p8vJ1d60yiwQ&s" alt="Product Image" />
                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Bartending Services</span>
                                  </a>
                                </div>
                              </div>
                              {/* {/* <!-- Grid -->  */}
                            </div>
                            {/* {/* <!-- End Grid -->  */}
                            {/* {/* <!-- End Tab -->  */}
                            <div id="mega-menu-catalog-tab-4" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-4">
                              {/* {/* <!-- Grid -->  */}
                              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.k4craft.com/wp-content/uploads/2020/01/1Floral-Backdrop.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Floral Decor</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.diwas.in/wp-content/uploads/2016/02/rustic.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Theme Decor</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://shineevents.co.in/wp-content/uploads/2021/11/3-1.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Mandap & Stage Setup</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYV7_8nh0kvYPbrPLkwP4J0xEAOaNkF85WwA&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Table Centerpieces</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQe_Z8zIy0TvTbyuWiAB5qHLmSTzu2CK2YGA&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Entrance Decor</span>
                                </a>

                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjg6YRQtWTZE8cckQ0mpA10gwg5aTx6XmIdw&s" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Lighting Decor</span>
                                </a>

                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">

                                <div className="col-span-2 flex justify-center">
                                  <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jRG895OPHXwvBu1Rhm6D-fB5ApicSAFHJA&s" alt="Product Image" />
                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Seating Layouts</span>
                                  </a>
                                </div>
                              </div>
                              {/* {/* <!-- Grid -->  */}
                            </div>


                            <div id="mega-menu-catalog-tab-5" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-5">
                              {/* {/* <!-- Grid -->  */}
                              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLx1bP_LBPqfJ2FCjH24Thk9Ar5u1cAaAKOw&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">DJs</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqDnqOZq4whTmJchZKbntAphh5eTh87pvYxw&s" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Live Bands</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn0.weddingwire.in/article-gallery-o/00000/3_2/960/jpg/articulos-india/2019/non-troncales/puneri-dhol/saurabh-birje-photography-phuneri-dhol-lead-image.jpeg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Dhol / Traditional Performers</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRFcR4R3TkgAWj_GiasbsDiCNkYlTJR_QRA&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Dance Troupes</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://lh3.googleusercontent.com/cmF2dPVYXKut9jrWPMMjaNEVoCMHkx1LsglSMlVLHxR427Jjimiu0vw7Qq4cBjXFpU3IAJbXL9r0apHjau5QgYvFLPFHV1iNZLduww=w961-h641-l80-e31" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Anchors / MCs</span>
                                </a>

                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuaal8xK8xGAaCnoX--044AHMWUoV-1Ofeqg&s" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Magicians / Comedians</span>
                                </a>

                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">

                                <div className="col-span-2 flex justify-center">
                                  <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQQU6ucynh7hLi1cDyvyN2VvZ_X4UOZ0_jQ&s" alt="Product Image" />
                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Fireworks & Special Effects</span>
                                  </a>
                                </div>
                              </div>
                              {/* {/* <!-- Grid -->  */}
                            </div>
                            <div id="mega-menu-catalog-tab-6" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-6">
                              {/* {/* <!-- Grid -->  */}
                              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn.kamatharjun.com/wp-content/uploads/2022/10/Prewedding-blog-8.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Candid Photography</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbRhTt7nxPVupZII-bGGMO5qAl8yc5sjZp8Q&s" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Traditional Photography</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.visionvivaah.com/blog/wp-content/uploads/2019/08/best-wedding-videography-in-chandigarh-960x487.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cinematic Videography</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwNQVPkGMO4V2IS_FtdvhiKbbmoWiOT5zAeA&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drone Shoots</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://5.imimg.com/data5/SELLER/Default/2021/2/EX/HF/RA/121338197/pre-wedding-photoshoot-service-500x500.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Pre-Wedding Shoots</span>
                                </a>

                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn0.weddingwire.in/vendor/2384/3_2/960/jpg/photobooth-instant-photo-booth-photobooth-4_15_422384-166246147178159.jpeg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Instant Photo Booths</span>
                                </a>

                              </div>


                              {/* {/* <!-- Grid -->  */}
                            </div>

                            <div id="mega-menu-catalog-tab-7" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-7">
                              {/* {/* <!-- Grid -->  */}
                              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/India%20LOB/Stationery%2C%20Letterheads%20and%20Stamps/Wedding%20Invitations/IN_Wedding-Invitations_Hero-image_01" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Printed Invitations</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://i.pinimg.com/736x/9f/7b/91/9f7b91504fc1cc4747f9c1cf05255498.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">E-Invites</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://blogcdn.paperlust.co/blog/wp-content/uploads/2019/08/1.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laser-Cut Cards</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://i.etsystatic.com/18363873/r/il/0fcd9a/1891009885/il_570xN.1891009885_eqav.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Scroll Invitations</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:good,w_700/India%20LOB/Stationery%2C%20Letterheads%20and%20Stamps/Wedding%20Invitations/IN_Wedding-Invitations_Overview" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Custom Wedding Stationery</span>
                                </a>

                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:d271d604-d65c-55cd-b287-733effd3a3af/component?assetType=TEMPLATE&etag=35bc0dea77df416bb31c32dc28675a6d&revision=048a2724-6699-4d01-9c6b-62ee9736fb45&component_id=1a690ebd-eddb-4ae1-9e58-8d6d7d99ffb9" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Thank You Cards</span>
                                </a>

                              </div>


                              {/* {/* <!-- Grid -->  */}
                            </div>

                            <div id="mega-menu-catalog-tab-9" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-9">
                              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://i.etsystatic.com/18125450/r/il/6f4a57/6104906139/il_570xN.6104906139_gw5l.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Personalized Gifts</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.brides.com/thmb/ZG_lIownwOgazIuIPBmv9M_FDA4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__brides__public__brides-services__production__2016__10__24__580e9b44d1dc137f1593dcfe_2014_bridescom-Editorial_Images-12-Edible-Wedding-Favors-Refresh-Large-Edible-Wedding-Favors-Chocolate-Mousse-Love-Me-Do-Photography-a65883c7a28e40558abecdf1f967144b.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Edible Favors</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.thewalletstore.in/cdn/shop/files/9.jpg?v=1737713179&width=1200" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Utility Gifts</span>
                                </a>
                                <div className="col-span-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">
                                  <div className="flex justify-center"> <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://m.media-amazon.com/images/I/81Vl6qGMspL.jpg" alt="Product Image" />

                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Handmade Crafts</span>
                                  </a>
                                  </div>
                                  <div className="flex justify-center"> <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://ruchoks.com/wp-content/uploads/2024/01/1-84.jpg" alt="Product Image" />

                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Gift Hampers</span>
                                  </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="mega-menu-catalog-tab-11" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-11">
                              {/* {/* <!-- Grid -->  */}
                              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVz1A8Ti2O_WJS5dX8B5XdkDDZ6tI_IAkg0g&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Bridal Makeup</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyb2JD1Q3RJDenIrbhmPSCs_ovsdW0I2QIeA&s" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Groom Styling</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images-static.naikaa.com/beauty-blog/wp-content/uploads/2024/07/wedding-1.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Hair Stylists</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvN8cq56FEbwqzNfbHgeDcOqfVE7UUr4jVQ&s" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Mehendi Artists</span>
                                </a>
                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://i.pinimg.com/564x/ea/34/e8/ea34e8692b950a700a92765a1613c399.jpg" alt="Product Image" />

                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Nail Artists</span>
                                </a>

                                <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                  <div className="relative shrink-0">
                                    <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://mlw6zuezpssl.i.optimole.com/w:780/h:625/q:mauto/f:avif/https://www.rethespa.in/wp-content/uploads/s12.jpg" alt="Product Image" />
                                  </div>
                                  <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Pre-wedding Spa Services</span>
                                </a>

                              </div>


                              <div id="mega-menu-catalog-tab-13" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-13">
                                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                  <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn11.bigcommerce.com/s-9bdyx9g8xs/images/stencil/1280x1280/products/127/1493/sankheda-chairs-complete-set-for-wedding-and-events-rental__62086.1643592082.jpg?c=2" alt="Product Image" />

                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Furniture</span>
                                  </a>
                                  <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://sjcaterers.in/wp-content/uploads/2021/06/crockery-rent.jpg" alt="Product Image" />
                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cutlery & Crockery</span>
                                  </a>
                                  <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                    <div className="relative shrink-0">
                                      <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRA-A6sE7W3_KngaJV-RVE77zeOldklIDl20y5lvCIRxfGQoHPTbAcPQLfW4QMvMepWWZiURaxho7vh4xE_X-RhiFyOgS_at9dGrTMkiWY" alt="Product Image" />
                                    </div>
                                    <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tents & Shamianas</span>
                                  </a>
                                  <div className="col-span-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">
                                    <div className="flex justify-center"> <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                      <div className="relative shrink-0">
                                        <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSODUDalBMhZ_Ak6GxjVWSB_9b903coKJOhuKX71S2cVSFokuf4RJtPeu4NG3x0lRr5CXTU_Gwt3wCda5lRhrxqTdjKWV_QEz9r7HWW3FU" alt="Product Image" />

                                      </div>
                                      <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200"> Props & Thematic Decor Items</span>
                                    </a>
                                    </div>
                                    <div className="flex justify-center"> <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                                      <div className="relative shrink-0">
                                        <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ_OWIVSE0ErpqsXtMeGc4B725-W2KU2WZGzNvsIW-AFcxCr6dy6Z8iu17sYWOaXF_vSam6NYiOWDZlBzmFB6YaOvluk0oL8dSrLXv5TMd3" alt="Product Image" />

                                      </div>
                                      <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200"> Linens & Drapes</span>
                                    </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* {/* <!-- End Tab -->  */}

                              {/* {/* <!-- Tab -->  */}
                              <div id="mega-menu-catalog-tab-14" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-14">
                                {/* {/* <!-- Loading Indicator -->  */}
                                <div className="h-full flex flex-col justify-center items-center text-center">
                                  <span className="py-1.5 inline-flex gap-x-1">
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                                  </span>
                                  <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                                    This is a placeholder loader.<br />This conent is empty.
                                  </p>
                                </div>
                                {/* {/* <!-- End Loading Indicator -->  */}
                              </div>
                              {/* {/* <!-- End Tab -->  */}

                              {/* {/* <!-- Tab -->  */}
                              <div id="mega-menu-catalog-tab-15" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-15">
                                {/* {/* <!-- Loading Indicator -->  */}
                                <div className="h-full flex flex-col justify-center items-center text-center">
                                  <span className="py-1.5 inline-flex gap-x-1">
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                                  </span>
                                  <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                                    This is a placeholder loader.<br />This conent is empty.
                                  </p>
                                </div>
                                {/* {/* <!-- End Loading Indicator -->  */}
                              </div>
                              {/* {/* <!-- End Tab -->  */}

                              {/* {/* <!-- Tab -->  */}
                              <div id="mega-menu-catalog-tab-16" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-16">
                                {/* {/* <!-- Loading Indicator -->  */}
                                <div className="h-full flex flex-col justify-center items-center text-center">
                                  <span className="py-1.5 inline-flex gap-x-1">
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                                  </span>
                                  <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                                    This is a placeholder loader.<br />This conent is empty.
                                  </p>
                                </div>
                                {/* {/* <!-- End Loading Indicator -->  */}
                              </div>
                              {/* {/* <!-- End Tab -->  */}

                              {/* {/* <!-- Tab -->  */}
                              <div id="mega-menu-catalog-tab-17" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-17">
                                {/* {/* <!-- Loading Indicator -->  */}
                                <div className="h-full flex flex-col justify-center items-center text-center">
                                  <span className="py-1.5 inline-flex gap-x-1">
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                                  </span>
                                  <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                                    This is a placeholder loader.<br />This conent is empty.
                                  </p>
                                </div>
                                {/* {/* <!-- End Loading Indicator -->  */}
                              </div>
                              {/* {/* <!-- End Tab -->  */}

                              {/* {/* <!-- Tab -->  */}
                              <div id="mega-menu-catalog-tab-18" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-18">
                                {/* {/* <!-- Loading Indicator -->  */}
                                <div className="h-full flex flex-col justify-center items-center text-center">
                                  <span className="py-1.5 inline-flex gap-x-1">
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                                  </span>
                                  <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                                    This is a placeholder loader.<br />This conent is empty.
                                  </p>
                                </div>
                                {/* {/* <!-- End Loading Indicator -->  */}
                              </div>
                              {/* {/* <!-- End Tab -->  */}

                              {/* {/* <!-- Tab -->  */}
                              <div id="mega-menu-catalog-tab-19" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-19">
                                {/* {/* <!-- Loading Indicator -->  */}
                                <div className="h-full flex flex-col justify-center items-center text-center">
                                  <span className="py-1.5 inline-flex gap-x-1">
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                                    <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                                  </span>
                                  <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                                    This is a placeholder loader.<br />This conent is empty.
                                  </p>
                                </div>
                                {/* {/* <!-- End Loading Indicator -->  */}
                              </div>
                              {/* {/* <!-- End Tab -->  */}
                            </div>
                            {/* {/* <!-- End Content -->  */}
                          </div>
                          {/* {/* <!-- End Grid -->  */}
                        </div>
                        {/* {/* <!-- End Container -->  */}
                      </div>
                      {/* {/* <!-- End Dropdown Menu -->  */}
                    </div>
                    {/* {/* <!-- End Dropdown Link -->  */}
                  </div>
                  {/* <!-- End Dropdown Link --> */}

                  <div className="hidden md:block w-full">
                    {/* <!-- Search Input --> */}
                    <div className="relative w-full">
                      <input type="text" className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border border-gray-200 text-base sm:text-sm rounded-full focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400" placeholder="Search" />
                      <div className="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
                        <button type="button" className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                          </svg>
                        </button>
                      </div>
                      <div className="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-10 pe-1">
                        <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" aria-label="Close">
                          <span className="sr-only">Close</span>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <div className="order-2 md:order-3 ms-auto lg:ms-0">
                <div className="flex justify-end items-center gap-x-2">
                  {/* <!-- Account Button Icon --> */}
                  <a className="flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
                    <img className="shrink-0 size-4 rounded-full" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar" />
                    <span className="truncate max-w-16">Madhesh</span>
                  </a>
                  {/* <!-- End Account Button Icon --> */}

                  {/* <!-- Favorites Button Icon --> */}
                  <a className="flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    Favorite
                  </a>
                  {/* <!-- End Favorites Button Icon --> */}

                  {/* <!-- Cart Button Icon --> */}
                  <a className="relative flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    Cart
                    <span className="flex absolute top-0 end-0 z-10 -mt-2 me-1">
                      <span className="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-gray-800 text-white rounded-full px-1 dark:bg-neutral-200 dark:text-neutral-800">
                        2
                        <span className="sr-only">Notifications</span>
                      </span>
                    </span>
                  </a>
                  {/* <!-- End Cart Button Icon --> */}
                </div>
              </div>
              {/* <!-- End Widgets --> */}
            </div>

            <div className="md:hidden mt-2.5 md:mt-0 w-full">
              {/* <!-- Search Input --> */}
              <div className="relative w-full">
                <input type="text" className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border border-gray-200 text-base sm:text-sm rounded-full focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400" placeholder="Search Preline" />
                <div className="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
                  <button type="button" className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>
                <div className="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-10 pe-1">
                  <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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



          {/* <!-- ========== END HEADER ========== --> */}

          {/* <!-- ========== MAIN CONTENT ========== --> */}
          <main id="content">
          
            {/* <!-- Product Details: Gallery Slider --> */}
            <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="pt-6">
                <div className="-ms-1.5 pb-3">
                  {/* <!-- Breadcrumb --> */}
                  <ol className=" flex items-center whitespace-nowrap">
                    <li className="flex items-center">

                      <a className="py-0.5 px-1.5 flex items-center gap-x-1 text-sm rounded-md text-gray-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="listing.html">
                        {venueData?.subcategory?.category?.name || session?.user?.vendor_profile?.subcategory?.category?.name}
                      </a>
                      <svg className="shrink-0 overflow-visible size-4  text-gray-400 dark:text-neutral-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
                      </svg>
                    </li>
                    <li className="flex items-center truncate">

                      <a className="py-0.5 px-1.5 flex items-center truncate gap-x-1 text-sm truncate rounded-md text-gray-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="listing.html">
                        <span className="truncate"> {venueData?.subcategory?.name || session?.user?.vendor_profile?.subcategory?.name}</span>
                      </a>
                      <svg className="shrink-0 overflow-visible size-4  text-gray-400 dark:text-neutral-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
                      </svg>
                    </li>
                    <li className="ps-1.5 flex items-center truncate font-semibold text-gray-800 dark:text-neutral-200 text-sm truncate">
                      <span className="truncate">{venueData?.name}</span>
                    </li>
                  </ol>
                  {/* <!-- End Breadcrumb --> */}
                </div>

                {/* <!-- Grid --> */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-10">
                  <div className="lg:col-span-3">
                    {/* <!-- Slider --> */}
                    <div
  data-hs-carousel='{
    "loadingClasses": "opacity-0",
    "isInfiniteLoop": true,
    "isAutoPlay": true,
    "autoPlayInterval": 3000
  }'
  className="relative"
>
  <div className="hs-carousel flex flex-col sm:flex-row gap-3 sm:gap-5 h-[722px]">
    
    {/* Thumbnails */}
<div className="flex-none order-2 sm:order-1">
  <div
    className="
      hs-carousel-pagination 
      flex flex-row sm:flex-col          // Flex direction: row on mobile, column on desktop
      flex-nowrap                       // 👈 ADDED: Prevents thumbnails from wrapping on mobile
      overflow-x-auto sm:overflow-y-auto  // 👈 MODIFIED: Horizontal scroll on mobile, vertical on desktop
      gap-3                             // Gap between thumbnails
      pb-1.5 sm:pb-0                    // Padding bottom for mobile layout
      sm:h-[700px]                      // Fixed height for the desktop column layout

      // --- Scrollbar Styling (already responsive!) ---
      [&::-webkit-scrollbar]:h-1        // Height of the horizontal scrollbar (mobile)
      sm:[&::-webkit-scrollbar]:w-1     // Width of the vertical scrollbar (desktop)
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
    "
  >
    {venueData?.images?.map((src, index) => (
      <div
        key={index}
        // 👇 ADDED shrink-0 to prevent items from shrinking in the flex container
        className="hs-carousel-pagination-item relative shrink-0 size-20 rounded-md sm:rounded-lg overflow-hidden cursor-pointer after:absolute after:inset-0 after:size-full after:rounded-md sm:after:rounded-lg border border-transparent hs-carousel-active:border-gray-800 hs-carousel-active:after:bg-black/10 dark:hs-carousel-active:border-white dark:border-neutral-800"
      >
        <img
          className="bg-gray-100 size-full object-cover rounded-md sm:rounded-lg dark:bg-neutral-800"
          src={src.image_url}
          alt={`Thumbnail ${index}`}
        />
      </div>
    ))}
  </div>
</div>
    {/* End Thumbnails */}

    {/* Preview */}
    <div className="relative group grow overflow-hidden h-full order-1 sm:order-2 bg-gray-100 rounded-lg dark:bg-neutral-800">
      {/* Carousel Body */}
      <div className="hs-carousel-body absolute inset-y-0 start-0 flex flex-nowrap opacity-0 w-full h-full">
        <div className="flex transition-transform duration-700 ease-in-out w-full h-full">
          {venueData?.images?.map((src, index) => (
            <div
              key={index}
              className="hs-carousel-slide flex-shrink-0 w-full h-full"
              data-hs-carousel-slide
            >
              <img
                src={src.image_url}
                alt={`Venue image ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nav Buttons */}
      <button
        type="button"
        className="hs-carousel-prev group-hover:opacity-100 opacity-0 absolute top-1/2 left-2 z-10 inline-flex justify-center items-center size-10 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 -translate-y-1/2"
      >
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      <button
        type="button"
        className="hs-carousel-next group-hover:opacity-100 opacity-0 absolute top-1/2 right-2 z-10 inline-flex justify-center items-center size-10 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 -translate-y-1/2"
      >
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
    {/* End Preview */}
  </div>
</div>

                    <div id="hs-sticky-sidebar-mobile-wrapper"></div>

                    <div className="pt-10">
                      {/* <!-- Reviews --> */}
                      <div id="reviews" className="flex flex-wrap justify-between items-center gap-3">
                        <div className="font-medium text-gray-800 dark:text-neutral-200">
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
                        </div>

                        <div className="inline-flex items-center gap-x-1">
                          <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                          <p className="text-xs text-gray-500 dark:text-neutral-400">
                            All reviews are from verified profiles
                          </p>
                        </div>
                      </div>
                      {/* <!-- End Reviews --> */}

                      <div id="hs-pro-reviews-tabs-scroll" className="relative py-3 overflow-hidden" data-hs-scroll-nav>
                        {/* <!-- Nav Tab --> */}
                        <div className="mt-4">
                          <div id="hs-pro-tabs-shpm-five-star" role="tabpanel" className="block">
                            {/* Content for 5 star reviews */}
                            <p className="text-gray-700 dark:text-neutral-200">Showing all 5-star reviews...</p>
                          </div>

                          <div id="hs-pro-tabs-shpm-four-star" role="tabpanel" className="hidden">
                            {/* Content for 4 star reviews */}
                            <p className="text-gray-700 dark:text-neutral-200">Showing all 4-star reviews...</p>
                          </div>

                          <div id="hs-pro-tabs-shpm-three-star" role="tabpanel" className="hidden">
                            {/* Content for 3 star reviews */}
                            <p className="text-gray-700 dark:text-neutral-200">Showing all 3-star reviews...</p>
                          </div>

                          <div id="hs-pro-tabs-shpm-two-and-below" role="tabpanel" className="hidden">
                            {/* Content for 2-star and below reviews */}
                            <p className="text-gray-700 dark:text-neutral-200">No low-rated reviews yet.</p>
                          </div>
                        </div>

                        <nav id="hs-pro-reviews-tabs" className="hs-scroll-nav-body flex gap-1 snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:h-0 p-0.5 bg-white border border-gray-200 rounded-full dark:bg-neutral-900 dark:border-neutral-700" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                        <button type="button" className="hs-tab-active:bg-gray-200 snap-start hs-tab-active:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:focus:text-gray-800 w-full inline-flex justify-center items-center gap-x-2 text-gray-800 py-2 px-3 text-sm whitespace-nowrap rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-500 dark:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:text-neutral-200 dark:text-neutral-200 dark:focus:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden active" id="hs-pro-tabs-shpm-item-five-star" aria-selected="true" data-hs-tab="#hs-pro-tabs-shpm-five-star" aria-controls="hs-pro-tabs-shpm-five-star" role="tab">
                          5 star (100)
                        </button>
                        <button type="button" className="hs-tab-active:bg-gray-200 snap-start hs-tab-active:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:focus:text-gray-800 w-full inline-flex justify-center items-center gap-x-2 text-gray-800 py-2 px-3 text-sm whitespace-nowrap rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-500 dark:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:text-neutral-200 dark:text-neutral-200 dark:focus:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden " id="hs-pro-tabs-shpm-item-four-star" aria-selected="false" data-hs-tab="#hs-pro-tabs-shpm-four-star" aria-controls="hs-pro-tabs-shpm-four-star" role="tab">
                          4 star (10)
                        </button>
                        <button type="button" className="hs-tab-active:bg-gray-200 snap-start hs-tab-active:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:focus:text-gray-800 w-full inline-flex justify-center items-center gap-x-2 text-gray-800 py-2 px-3 text-sm whitespace-nowrap rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-500 dark:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:text-neutral-200 dark:text-neutral-200 dark:focus:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden " id="hs-pro-tabs-shpm-item-three-star" aria-selected="false" data-hs-tab="#hs-pro-tabs-shpm-three-star" aria-controls="hs-pro-tabs-shpm-three-star" role="tab">
                          3 star (2)
                        </button>
                        <button type="button" className="hs-tab-active:bg-gray-200 snap-start hs-tab-active:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:focus:text-gray-800 w-full inline-flex justify-center items-center gap-x-2 text-gray-800 py-2 px-3 text-sm whitespace-nowrap rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-500 dark:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:text-neutral-200 dark:text-neutral-200 dark:focus:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden " id="hs-pro-tabs-shpm-item-two-and-below" aria-selected="false" data-hs-tab="#hs-pro-tabs-shpm-two-and-below" aria-controls="hs-pro-tabs-shpm-two-and-below" role="tab">
                          2 and below (0)
                        </button>
                      </nav>
                        {/* <!-- End Nav Tab --> */}
                      </div>

                      {/* <!-- Tab Content --> */}
                      <div id="hs-pro-tabs-shpm-five-star" role="tabpanel" aria-labelledby="hs-pro-tabs-shpm-item-five-star">
                        {/* <!-- Product Details --> */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Ramaswami
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-400">
                                  13 hours ago
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <div className="mt-3 flex gap-2">
                                <img className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBcOgnYwsopYJJQ7TFYWA_TmI-JtY84q12sg&s" alt="Review Image" />
                                <img className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0WrbOeeES3K05eDi2aS_gtnjgSamCCx7leA&s" alt="Review Image" />
                                <img className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1tsb2kodof5S_jy2VXzcMdt7VRcdJ7ffaQ&s" alt="Review Image" />
                              </div>

                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                We recently rented VM Grand Mahal for a family function, and I must say, it exceeded all our expectations. The hall is spacious, well-maintained, and beautifully designed, making it ideal for large gatherings. The air conditioning was perfect, and the lighting setup added a great ambiance to the event.
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Sam
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-400">
                                  5 days ago
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <div className="mt-3 flex gap-2">
                                <img className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800" src="https://image.wedmegood.com/resized/720X/uploads/member/3905993/1686526219_WhatsApp_Image_2023_06_09_at_12.11.12_AM.jpeg" alt="Review Image" />
                                <img className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYnn9YqVuB4atmKPqDqvkG3BHkXFoTkbo9LA&s" alt="Review Image" />
                              </div>

                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                The management was extremely cooperative and professional throughout the booking process and on the event day. They provided all the necessary support – from stage setup to cleanliness and parking arrangements. Our guests were very impressed with the overall atmosphere and convenience.
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}
                        </div>
                        {/* <!-- End Product Details --> */}
                      </div>
                      {/* <!-- End Tab Content --> */}

                      {/* <!-- Tab Content --> */}
                      <div id="hs-pro-tabs-shpm-four-star" className="hidden" role="tabpanel" aria-labelledby="hs-pro-tabs-shpm-item-four-star">
                        {/* <!-- Product Details --> */}
                        <div className="grid sm:grid-cols-2 gap-4">

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Jaya Kumar
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  December 27, 2024
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>

                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                The booking process was smooth, and the staff was helpful throughout. They handled the arrangements well and were available when we needed support. The parking area was also sufficient, which made things easier for our attendees.                      </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Narayana
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  December 14, 2024
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>

                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                We booked VM Grand Mahal for a recent family function, and the overall experience was very satisfying. The hall is truly grand — spacious, well-lit, and beautifully maintained. It created the perfect atmosphere for our event, and our guests were quite impressed.                      </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}
                        </div>
                        {/* <!-- End Product Details --> */}
                      </div>
                      {/* <!-- End Tab Content --> */}

                      {/* <!-- Tab Content --> */}
                      <div id="hs-pro-tabs-shpm-three-star" className="hidden" role="tabpanel" aria-labelledby="hs-pro-tabs-shpm-item-three-star">
                        {/* <!-- Product Details --> */}
                        <div className="grid sm:grid-cols-2 gap-4">

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  K. Sampath
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  November 26, 2024
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>

                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                The venue has potential — it’s large, with decent interiors, and can accommodate a good number of guests. However, we faced a few issues during our event. The cleanliness wasn’t up to the mark when we arrived, and we had to follow up multiple times with the staff to get things sorted. The sound system also gave us some trouble, and the response from the management was slower than expected.                      </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Rajagopalachari
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  November 8, 2024
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>

                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                VM Grand Mahal is a decent venue for hosting events, with a spacious hall and good seating capacity. The ambiance is elegant, especially with the lighting and decor, which adds charm to any celebration. However, there are a few areas that could be improved. The air conditioning wasn't consistent throughout the event, and the parking space felt a bit limited for a larger gathering. The staff was polite, but service could have been more prompt and organized. Overall, it's a satisfactory choice if you're looking for a mid-range venue with a pleasant atmosphere.                      </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}
                        </div>
                        {/* <!-- End Product Details --> */}
                      </div>
                      {/* <!-- End Tab Content --> */}

                      {/* <!-- Tab Content --> */}
                      <div id="hs-pro-tabs-shpm-two-and-below" className="hidden" role="tabpanel" aria-labelledby="hs-pro-tabs-shpm-item-two-and-below">
                        {/* <!-- Product Details --> */}
                        <div className="grid sm:grid-cols-2 gap-4">

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  RamaGopal
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  13 hours ago
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>


                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                VM Grand Mahal has potential, but my experience was below expectations. While the hall itself is spacious, the cleanliness and maintenance were not up to the mark. The washrooms needed better upkeep, and the air conditioning wasn’t effective throughout the event. Parking was chaotic, and there was little assistance from the staff. The management could be more responsive and better organized. With some improvements, it could be a much better venue.                      </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Kumari Ananthan
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  5 days ago
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>


                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                Attended an event recently at VM Grand Mahal and was left a bit disappointed. Though the hall looks grand at first glance, the facilities don't quite match the appearance. The sound system had issues during the program, and there were frequent power fluctuations. The catering area was congested and poorly managed. Staff seemed overwhelmed and not very attentive. Overall, it didn’t live up to the expectations set by its name.                      </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}
                        </div>
                        {/* <!-- End Product Details --> */}
                      </div>
                      {/* <!-- End Tab Content --> */}

                      <div className="mt-6 w-full max-w-56 mx-auto">
                        <a className="py-3 px-4 w-full flex justify-center items-center font-medium text-sm text-start bg-white border border-gray-200 text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                          See all reviews
                        </a>
                      </div>
                    </div>


                    {/* <!-- Description --> */}
                    <div className="pt-14 pb-10">


                      {/* <!-- List --> */}

                      {/* <!-- End List --> */}

                      {/* <!-- Collapse --> */}
                      <div className="mt-10">
                        <h2 className="text-xl font-semibold text-sm text-gray-800 dark:text-neutral-200 mb-4">Services Offered</h2>
                        {/* <p className="text-gray-700 leading-relaxed">
                       */}<p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
  {venueData?.name} is a beautifull area to host all your functions, from pre-wedding ceremonies. The abundance of establishments offered by them is mentioned below:
</p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-10 lg:gap-y-12 lg:gap-x-16">
                          {/* <!-- Icon Block --> */}
                        {venueData?.services_offered_details
                        ?.filter((feature) => feature?.svg_icon_url)
                        .map((feature, index) => (
                          <div key={index} className="flex gap-3 text-gray-800 dark:text-neutral-200">
                            <img
                              src={feature.svg_icon_url}
                              alt={feature?.name}
                              className="w-5 h-5 filter dark:invert"
                            />
                            <span>{feature?.name}</span>
                          </div>
                      ))}

                          <div className="pt-5 pb-5"></div>
                        </div>


                        <div className="max-w-4xl mx-auto text-gray-800 dark:text-neutral-200">
                          <h2 className="text-2xl font-bold mb-2">About</h2>

                          <div className="flex items-center text-sm text-gray-400 mb-4 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 3a.75.75 0 00-.75.75v.75H8a2 2 0 00-2 2v1.5a2 2 0 002 2h8a2 2 0 002-2V7.5a2 2 0 00-2-2h-1V3.75a.75.75 0 00-.75-.75h-5.5zM6 11.25v6.5A3.25 3.25 0 009.25 21h5.5A3.25 3.25 0 0018 17.75v-6.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75z" />
                            </svg>

                            <span>Last update: May 2025</span>
                          </div>

                          {/* <p className="text-gray-700 leading-relaxed">
                    <strong>VM Grand Mahal</strong> is a prominent banquet hall located near Madambakkam in Chennai. It's an ideal location to host a wide range of your wedding functions, from mehndi and sangeet to receptions. Selecting a suitable event space is essential to organising a perfect wedding ceremony, and it should be chosen to keep in mind your budget, accessibility and suitability. Therefore, if you are looking for a place that offers impeccable service with warm hospitality, the VM Grand Mahal is the choice that you should make. <strong>VM Grand Mahal</strong> is an excellent venue and is a great fit to organise all your nuptial ceremonies grandly. The team of professionals takes care of every setup and ensures that you get the perfect nuptial experience of your life, which you can keep in your heart permanently.
                  </p>
                 */}
                          <div>
                            <div
  className="space-y-4 text-sm text-gray-800 dark:text-neutral-200" // Adjust classNames as needed for styling
  dangerouslySetInnerHTML={{ __html: venueData.about }}
/>
                            
                          </div>
                          {/* <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">Facilities and Capacity</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>VM Grand Mahal</strong> features a spacious indoor banquet hall accommodating 20 to 1000 guests, ideal for memorable celebrations. With top-notch amenities and a vibrant ambience, it ensures a unique and enjoyable experience.<br/>
                      <strong>VM Grand Mahal</strong> offers comfortable guest accommodations and expert decor vendors to enhance your wedding experience. With diverse cuisines and heartfelt service, they ensure every ceremony is memorable and flawlessly executed.
                  </p>
                </div> */}
                          {/* <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">Facilities and Capacity</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>VM Grand Mahal</strong> features a spacious indoor banquet hall accommodating 20 to 1000 guests, ideal for memorable celebrations. With top-notch amenities and a vibrant ambience, it ensures a unique and enjoyable experience.<br/>
                      <strong>VM Grand Mahal</strong> offers comfortable guest accommodations and expert decor vendors to enhance your wedding experience. With diverse cuisines and heartfelt service, they ensure every ceremony is memorable and flawlessly executed.
                  </p>
                </div> */}
                          <div className="mt-6">
  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
    Event Types Supported
  </h3>
  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-neutral-300">
    {venueData?.event_types_details?.map((event) => (
      <li key={event.id}>{event.name}</li>
    ))}
  </ul>
</div>

{/* FAQ Section */}
{/* FAQ Section */}
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
    <h2 className="text-xl font-semibold md:text-xl md:leading-tight text-gray-800 dark:text-neutral-200">
      Frequently Asked Questions
    </h2>
  </div>

  <div className="max-w-5xl mx-auto">
    <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-800">
      {venueData?.faq_details && venueData.faq_details.map((faq, index) => (
        <div
          className="hs-accordion pb-3 active" // 'active' for default open, remove if all should be closed initially
          id={`hs-basic-with-title-and-arrow-stretched-heading-${faq.id || index}`}
          key={faq.id || index}
        >
          <button
            className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400"
            aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${faq.id || index}`}
          >
            {faq.question}
            <svg
              className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400 dark:group-hover:text-neutral-400"
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
              <path d="m6 9 6 6 6-6" />
            </svg>
            <svg
              className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400 dark:group-hover:text-neutral-400"
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
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
          <div
            id={`hs-basic-with-title-and-arrow-stretched-collapse-${faq.id || index}`}
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${faq.id || index}`}
          >
            <p
              className="text-gray-800 dark:text-neutral-200"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
{/* End FAQ Section */}
{/* End FAQ Section */}

                          {/* <!-- Grid --> */}
                          {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-10 lg:gap-y-12 lg:gap-x-16"> */}
                          {/* <!-- Icon Block --> */}
                          {/* <div className="flex gap-3">
<img src="https://cdn-icons-png.flaticon.com/128/12728/12728042.png" alt="Guest Accommodation" className="w-5 h-5"/>
    <span>Guest Accommodation</span>
     
   
  </div> */}
                          {/* <!-- End Icon Block --> */}

                          {/* <!-- Icon Block --> */}
                          {/* <div className="flex gap-3">
    <img src="https://cdn-icons-png.flaticon.com/128/2503/2503511.png" alt="Car Parking" className="w-5 h-5"/>
    <span>Car Parking</span>
  </div> */}
                          {/* <!-- End Icon Block --> */}

                          {/* <!-- Icon Block --> */}
                          {/* <div className="flex gap-3">
     <img src="https://cdn-icons-png.flaticon.com/128/2206/2206927.png" alt="Power Backup" className="w-5 h-5"/>
    <span>Power Backup</span>

  </div> */}
                          {/* <!-- End Icon Block --> */}

                          {/* <!-- Icon Block --> */}
                          {/* <div className="flex gap-3">
    <img src="https://cdn-icons-png.flaticon.com/128/8182/8182918.png" alt="Parking Area" className="w-5 h-5"/>
    <span>Parking Area</span>

  </div> */}
                          {/* <!-- End Icon Block --> */}

                          {/* <!-- Icon Block --> */}
                          {/* <div className="flex gap-3">
<img src="https://cdn-icons-png.flaticon.com/128/7969/7969763.png" alt="Air Conditioning" className="w-5 h-5"/>
    <span>Air Conditioning</span>

    
  </div> */}
                          {/* <!-- End Icon Block --> */}

                          {/* <!-- Icon Block --> */}
                          {/* <div className="flex gap-3">
    <img src="https://cdn-icons-png.flaticon.com/128/16427/16427256.png" alt="Two-Wheeler Parking" className="w-5 h-5"/>
    <span>Two-Wheeler Parking</span>

  </div> */}
                          {/* <!-- End Icon Block --> */}
                          {/* <div className="flex gap-3">
<img src="https://cdn-icons-png.flaticon.com/128/4566/4566703.png" alt="Furniture" className="w-5 h-5"/>
    <span>Furniture</span>


    
  </div> */}
                          {/* <div className="flex gap-3">

    <img src="https://cdn-icons-png.flaticon.com/128/3011/3011817.png" alt="Valet Parking" className="w-5 h-5"/>
      <span>Valet Parking</span>
  </div> */}
                          {/* </div> */}
                          {/* <!-- End Grid --> */}

                        </div>
                      </div>
                      {/* <!-- End Collapse --> */}

                      {/* <!-- Collapse Toggle --> */}

                      {/* <!-- End Collapse Toggle --> */}

                      {/* <!-- Description List --> */}

                      {/* <!-- End Description List --> */}
                    </div>
                    {/* <!-- End Description --> */}

                    {/* <!-- Image with Text Pair --> */}

                    {/* <!-- End Image with Text Pair --> */}
                  </div>
                  {/* <!-- End Col --> */}

                  <div id="hs-sticky-sidebar-desktop-wrapper" className="lg:col-span-2">
                    <div className="ml-4 pt-8 lg:pt-0 h-full" data-hs-switch-place='{
              "xs": "#hs-sticky-sidebar-mobile-wrapper",
              "lg": "#hs-sticky-sidebar-desktop-wrapper"
            }'>
                      {/* <!-- Product Details --> */}
                      <div className="lg:ps-12 h-full flex flex-col">
                      
                        <h1 className="font-semibold text-2xl text-gray-800 dark:text-neutral-200">
                          {venueData?.name}
                        </h1>

                        {/* <!-- Badge Group --> */}
                        <div className="mt-2 flex items-center gap-2 mb-4">
                          {/* <img src="https://cdn-icons-png.flaticon.com/128/684/684809.png" alt="Location Icon" className="w-5 h-5 mr-2 text-gray-500"/> */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-800 dark:text-neutral-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />

                          </svg>
                          <a href="#" className="text-blue-600 hover:underline">
                            {venueData?.location_details?.name}, {venueData?.location_details?.district_name}
                          </a>
                        </div>
                        {/* <!-- End Badge Group --> */}

                        <div className="mt-3">
                          {/* <!-- Reviews --> */}
                          <a className="inline-block font-medium text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-emerald-500 dark:focus:text-emerald-500" href="#reviews">
                            <ul className="flex flex-wrap items-center gap-2">
                              <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                                {/* <!-- Rating --> */}
                                <div className="flex flex-wrap items-center">
                                  <span className="me-1">
                                    4.9
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

                        {/* <!-- Model --> */}
                        <div className="mt-5">
                          <span className="mb-2 block font-medium text-sm text-gray-800 dark:text-neutral-200">
                            Promotions:
                          </span>

                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 gap-2">
                            {/* <!-- Checkbox --> */}
                            <label htmlFor="hs-pro-shmfdsr-pro" className="group relative overflow-hidden flex items-center gap-2 p-2 text-sm bg-white text-gray-800 border border-gray-200 cursor-pointer rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200
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
                              <input type="radio" id="hs-pro-shmfdsr-pro" className="hidden bg-transparent border-gray-200 text-emerald-600 focus:ring-white focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-900" name="hs-pro-shmfdsr" />
                              {/* <img className="shrink-0 size-10 rounded-md" src="https://cdn-icons-png.flaticon.com/128/4812/4812872.png" alt="Product Image" /> */}
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-800 dark:text-neutral-200 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                              </svg>

                              <span className="grow truncate">
                                <span className="block font-semibold truncate">
                                  Early Booking Discount
                                </span>
                                <span className="block">
                                  -₹9999
                                </span>
                              </span>
                            </label>
                            {/* <!-- End Checkbox --> */}

                            {/* <!-- Checkbox --> */}

                            {/* <!-- End Checkbox --> */}
                          </div>
                          {/* <!-- End Grid --> */}
                        </div>
                        {/* <!-- End Model --> */}

                        <div className="mt-5 h-full">
                          <div className="lg:sticky lg:top-4 space-y-5">
                            <div className="bg-white border border-gray-200 rounded-2xl dark:bg-neutral-900 dark:border-neutral-700">
                              <div className="p-5">
                                {/* <!-- Price Group --> */}
                                <div className="flex flex-wrap justify-between items-center gap-1">
                                  <div className="grow">
                                    <span className="font-semibold text-3xl text-gray-800 dark:text-neutral-200">
                                      ₹135000 <span className="text-xl">INR</span>
                                    </span>
                                    <span className="text-gray-500 dark:text-neutral-400">
                                      <s>₹150000</s>
                                    </span>
                                  </div>

                                  <div>

                                        <FavoriteButton
                                        initialFavorite={venueData?.favorite_details?.is_favorite}
                                        contentType={venueData?.favorite_details?.content_type}
                                        objectId={venueData?.id} 
                                        fav_id={venueData?.favorite_details?.id}
                                        accessToken={accessToken}
                                        />


                                    {/* <button type="button" className="flex shrink-0 justify-center items-center size-10 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50  dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                                    <span className="sr-only">Favorite</span>
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                  </button> */}
                                  </div>
                                </div>
                                {/* <!-- End Price Group --> */}

                                {/* <!-- Badge Group --> */}
                                <div className="mt-2 flex flex-wrap items-center gap-1">
                                  <span className="py-0.5 px-1.5 text-[11px] border border-orange-500 text-orange-500 rounded-md">
                                    -15% Limited time
                                  </span>
                                </div>
                                {/* <!-- End Badge Group --> */}

                                {/* <!-- Price Group --> */}
                                <div className="mt-5 grid grid-cols-2 items-center gap-2">


                                  <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-2.5">
                                      <span className="text-l text-gray-800 dark:text-neutral-200">Date:</span>
                                    </div>

                                    {/* <input
                                    type="date"
                                    className="w-[215px] py-2 ps-20 pe-8 w-full inline-block border-gray-200 rounded-full text-sm text-gray-800 cursor-pointer hover:bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    min="{{ today }}"
                                  /> */}
                                    <input
  type="date"
  style={{ width: '215px' }}
  className="py-2 ps-20 pe-8 inline-block border-gray-200 rounded-full text-sm text-gray-800 cursor-pointer hover:bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
  min={currentDate}
  value={currentDate}
/>
                                  </div>
                                </div>
                                {/* <!-- End Price Group --> */}

                                {/* <!-- Button Group --> */}
                                <div className="mt-5 flex gap-3">
                                  {/* <!-- Add to cart button (75%) --> */}
                                  <button type="button" className="w-3/4 py-3 px-4 inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                                    Request Pricing
                                  </button>

                                  {/* <!-- Buy now button (25%) --> */}
                                  <button type="button" className="w-1/4 py-2.5 px-4 inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950 dark:focus:bg-emerald-950">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-800 dark:text-neutral-200">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                                    </svg>
                                  </button>
                                </div>

                                {/* <!-- End Button Group --> */}
                              </div>

                              {/* <!-- Card List --> */}
                              <div className="p-5 divide-y divide-gray-200 dark:divide-neutral-700">
                                {/* <!-- Card List Item --> */}
                                <div className="py-4 first:pt-0 last:pb-0 flex gap-x-3 ">
                                  {/* <img className="shrink-0 size-6 rounded-md" src="https://cdn-icons-png.flaticon.com/128/857/857681.png" alt="Product Image" /> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    className="text-gray-800 dark:text-neutral-200"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"
                                    />
                                  </svg>

                                  <div className="grow">
                                    <h2 className="font-medium text-l text-gray-800 dark:text-neutral-200">
                                      {venueData?.per_plate_price}
                                    </h2>

                                    {/* <!-- List --> */}
                                    <div className="mt-1.5 flex flex-col gap-y-0.5">
                                      {/* <!-- Item --> */}
                                      <div className="flex items-center gap-x-1">
                                        <span className="text-sm text-gray-500 dark:text-neutral-400">
                                          Types:
                                        </span>
                                        <div>
                                              {venueData?.services_offered_details && (
      <>
        {venueData.services_offered_details.some(service => service.name === "is_veg_available") &&
         venueData.services_offered_details.some(service => service.name === "is_non_veg_available") && (
          <button type="button" className="flex items-center gap-x-1 text-start font-medium text-sm text-emerald-600 underline-offset-4 hover:underline focus:outline-hidden focus:underline dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300">
            Veg & Non-veg
          </button>
        )}

        {venueData.services_offered_details.some(service => service.name === "is_veg_available") &&
         !venueData.services_offered_details.some(service => service.name === "is_non_veg_available") && (
          <button type="button" className="flex items-center gap-x-1 text-start font-medium text-sm text-emerald-600 underline-offset-4 hover:underline focus:outline-hidden focus:underline dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300">
            Veg
          </button>
        )}

        {!venueData.services_offered_details.some(service => service.name === "is_veg_available") &&
         venueData.services_offered_details.some(service => service.name === "is_non_veg_available") && (
          <button type="button" className="flex items-center gap-x-1 text-start font-medium text-sm text-emerald-600 underline-offset-4 hover:underline focus:outline-hidden focus:underline dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300">
            Non-veg
          </button>
        )}
      </>
    )}
                                        </div>

                                      </div>
                                      {/* <!-- End Item --> */}

                                      {/* <!-- Item --> */}

                                      {/* <!-- End Item --> */}
                                    </div>
                                    {/* <!-- End List --> */}
                                  </div>
                                </div>
                                {/* <!-- End Card List Item --> */}

                                {/* <!-- Card List Item --> */}
                                <div className="py-4 first:pt-0 last:pb-0 flex gap-x-3">
                                  {/* <img className="shrink-0 size-6 rounded-md" src="https://cdn-icons-png.flaticon.com/128/14772/14772872.png" alt="Product Image" /> */}

                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 text-gray-800 dark:text-neutral-200 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                  </svg>

                                  <div className="grow">
                                    <h2 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                                      {venueData?.guest_capacity}
                                    </h2>

                                    <div className="mt-1.5">
                                     <p className="text-sm text-gray-800 dark:text-neutral-200">
  {venueData?.name} can accommodate upto {venueData?.guest_capacity} guests, making it perfect for both intimate gatherings and grand celebrations.
</p>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- End Card List Item --> */}

                                {/* <!-- Card List Item --> */}
                                <div className="py-4 first:pt-0 last:pb-0 flex gap-x-3">
                                  {/* <img className="shrink-0 size-6 rounded-md" src="https://cdn-icons-png.flaticon.com/128/15817/15817392.png" alt="Product Image" /> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    className="text-gray-800 dark:text-neutral-200"
                                    fill="currentColor"
                                  >
                                    <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
                                  </svg>

                                  <div className="grow">
                                    <h2 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                                      5 Last Month Bookings
                                    </h2>


                                  </div>
                                </div>
                                {/* <!-- End Card List Item --> */}
                              </div>
                              {/* <!-- End Card List --> */}

                              {/* <!-- Card --> */}

                              {/* <!-- End Card --> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- End Product Details --> */}
                    </div>
                  </div>
                  {/* <!-- End Col --> */}
                </div>
                {/* <!-- End Grid --> */}
              </div>
            </div>


            {/* <!-- End Product Details: Gallery Slider --> */}

            {/* <!-- Explore Interests --> */}
            <div className="py-6 sm:py-12 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
              {/* <!-- Header --> */}

              <div>
                {/* <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
      >
        Choose Location
      </button> */}

                {/* Modal */}
                {modalOpen && (
                  <div
                    className="fixed top-0 left-0 z-80 w-full h-full overflow-x-hidden overflow-y-auto pointer-events-auto bg-black/30 flex justify-center items-center"
                    role="dialog"
                    tabIndex="-1"
                    aria-labelledby="location-modal-title"
                  >
                    <div className="bg-white dark:bg-neutral-800 w-full max-w-md mx-3 rounded-xl shadow-xl overflow-hidden">
                      {/* Header */}
                      <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
                        <h3 id="location-modal-title" className="font-medium text-gray-800 dark:text-neutral-200">
                          Choose your location
                        </h3>
                        <button
                          onClick={() => setModalOpen(false)}
                          className="size-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full dark:bg-neutral-700 dark:hover:bg-neutral-600"
                        >
                          <X className="size-4 text-gray-800 dark:text-neutral-400" />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                        <p className="text-[13px] text-gray-800 dark:text-neutral-200">
                          Delivery options and delivery speeds may vary for different locations
                        </p>

                        {/* Radio options */}
                        <div className="space-y-2">
                          {[
                            {
                              id: 'addr1',
                              label: 'James Collins',
                              address: '2305 Coney Island Ave, Brooklyn NY 11223',
                              isDefault: true,
                            },
                            {
                              id: 'addr2',
                              label: 'James Collins',
                              address: 'Im Wiegenfeld 4 85570 Markt Schwaben, Markt Schwaben 85570',
                            },
                            {
                              id: 'addr3',
                              label: 'James Collins',
                              address: '109 Rogers Rd Ste 3 WS003536, Wilmington DE 19801',
                            },
                          ].map((item) => (
                            <label
                              key={item.id}
                              htmlFor={item.id}
                              className="block p-3 text-sm bg-white text-gray-800 rounded-xl cursor-pointer ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:ring-neutral-700"
                            >
                              <div className="flex gap-x-2.5">
                                <input
                                  type="radio"
                                  id={item.id}
                                  name="shipping-address"
                                  defaultChecked={item.isDefault}
                                  className="size-4 accent-emerald-500"
                                />
                                <div className="-mt-0.5">
                                  <span className="font-semibold">
                                    {item.label}
                                    {item.isDefault && (
                                      <span className="ml-1 text-xs font-medium bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full dark:bg-neutral-700 dark:text-neutral-200">
                                        Default
                                      </span>
                                    )}
                                  </span>
                                  <div className="text-sm text-gray-500 dark:text-neutral-500">{item.address}</div>
                                </div>
                              </div>
                            </label>
                          ))}

                          {/* Extra addresses */}
                          {showAll && (
                            <>
                              {[
                                '645 W 1ST AVE C/O 3536-WS, ROSELLE NJ 07203',
                                'Arch 294 Jewell Street, London SE5 OBU',
                              ].map((address, idx) => (
                                <label
                                  key={idx}
                                  htmlFor={`extra-${idx}`}
                                  className="block p-3 text-sm bg-white text-gray-800 rounded-xl cursor-pointer ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:ring-neutral-700"
                                >
                                  <div className="flex gap-x-2.5">
                                    <input
                                      type="radio"
                                      id={`extra-${idx}`}
                                      name="shipping-address"
                                      className="size-4 accent-emerald-500"
                                    />
                                    <div className="-mt-0.5">
                                      <span className="font-semibold">James Collins</span>
                                      <div className="text-sm text-gray-500 dark:text-neutral-500">{address}</div>
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          {!showAll && (
                            <button
                              type="button"
                              onClick={() => setShowAll(true)}
                              className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-500"
                            >
                              See all
                            </button>
                          )}
                          <a
                            href="#"
                            className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-500"
                          >
                            Manage address book
                          </a>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-6 pt-2 flex flex-col gap-2">
                        <button
                          onClick={() => setModalOpen(false)}
                          className="w-full py-2.5 px-3 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => setModalOpen(false)}
                          className="w-full py-2.5 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>


              {/* <!-- End Header --> */}

              {/* <!-- Grid --> */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">

                {relatedItems?.map(item => (
                  <CategoryItemCard key={item.id} item={item} />
                ))}

              

              </div>

            </div>
          </main>
          
          {/* <!-- ========== SECONDARY CONTENT ========== --> */}
          {/* <!-- Regional Settings Modal --> */}
          <div id="hs-pro-shmnrsm" className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shmnrsm-label">
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
              <div className="w-full max-h-full relative overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
                {/* <!-- Header --> */}
                <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
                  <h3 id="hs-pro-shmnrsm-label" className="font-medium text-gray-800 dark:text-neutral-200">
                    Which country would like to shop in?
                  </h3>
                  <button type="button" className="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-pro-shmnrsm">
                    <span className="sr-only">Close</span>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                {/* <!-- End Header --> */}

                

                {/* <!-- Footer --> */}
                <div className="p-6 pt-2 md:pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700"
                    data-hs-overlay="#hs-pro-shmnrsm"
                  >
                    Accept
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
                      data-hs-overlay="#hs-pro-shmnrsm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
          {/* <!-- End Regional Settings Modal --> */}
        </div>
      ) : (
        <p>Loading content...</p> // optional loader
      )}
      {/* <!-- Regional Settings Modal --> */}
      <div
        id="hs-pro-shmnlcm"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-pro-shmnlcm-label"
        style={{ '--close-when-click-inside': 'true' }} // if you want to keep this CSS variable inline
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
          <div className="w-full max-h-full relative overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
            {/* Header */}
            <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
              <h3
                id="hs-pro-shmnlcm-label"
                className="font-medium text-gray-800 dark:text-neutral-200"
              >
                Choose your location
              </h3>
              <button
                type="button"
                className="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-pro-shmnlcm"
              >
                <span className="sr-only">Close</span>
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            {/* End Header */}

            {/* Body */}
            <div
              id="hs-pro-shmnlcm-body"
              className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              <div className="p-6 space-y-5">
                <p className="text-[13px] text-gray-800 dark:text-neutral-200">
                  Delivery options and delivery speeds may vary for different locations
                </p>

                {/* Checkbox Grid */}
                <div className="p-0.5 space-y-2">
                  {/* Checkbox 1 */}
                  <label
                    htmlFor="hs-pro-shmarach1"
                    className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500"
                  >
                    <span className="flex gap-x-2.5">
                      <input
                        type="radio"
                        id="hs-pro-shmarach1"
                        className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800"
                        name="hs-pro-shmaracho"
                        value="James Collins"
                        defaultChecked
                      />
                      <span className="grow -mt-0.5">
                        <span className="block font-semibold">
                          James Collins
                          <span className="ms-1 py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200">
                            Default
                          </span>
                        </span>
                        <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                          2305 Coney Island Ave, Brooklyn NY 11223
                        </span>
                      </span>
                    </span>
                  </label>
                  {/* Checkbox 2 */}
                  <label
                    htmlFor="hs-pro-shmarach2"
                    className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500"
                  >
                    <span className="flex gap-x-2.5">
                      <input
                        type="radio"
                        id="hs-pro-shmarach2"
                        className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800"
                        name="hs-pro-shmaracho"
                        value="James Collins"
                      />
                      <span className="grow -mt-0.5">
                        <span className="block font-semibold">James Collins</span>
                        <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                          Im Wiegenfeld 4 85570 Markt Schwaben, Markt Schwaben 85570
                        </span>
                      </span>
                    </span>
                  </label>
                  {/* Checkbox 3 */}
                  <label
                    htmlFor="hs-pro-shmarach3"
                    className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500"
                  >
                    <span className="flex gap-x-2.5">
                      <input
                        type="radio"
                        id="hs-pro-shmarach3"
                        className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800"
                        name="hs-pro-shmaracho"
                        value="James Collins"
                      />
                      <span className="grow -mt-0.5">
                        <span className="block font-semibold">James Collins</span>
                        <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                          109 Rogers Rd Ste 3 WS003536, Wilmington DE 19801
                        </span>
                      </span>
                    </span>
                  </label>

                  {/* Collapsible Section */}
                  <div
                    id="hs-shnlmsaa-heading"
                    className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                    aria-labelledby="hs-shnlmsaa"
                  >
                    <div className="p-0.5 space-y-2">
                      {/* Checkbox 4 */}
                      <label
                        htmlFor="hs-pro-shmarach4"
                        className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500"
                      >
                        <span className="flex gap-x-2.5">
                          <input
                            type="radio"
                            id="hs-pro-shmarach4"
                            className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800"
                            name="hs-pro-shmaracho"
                            value="James Collins"
                          />
                          <span className="grow -mt-0.5">
                            <span className="block font-semibold">James Collins</span>
                            <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                              645 W 1ST AVE C/O 3536-WS, ROSELLE NJ 07203
                            </span>
                          </span>
                        </span>
                      </label>
                      {/* Checkbox 5 */}
                      <label
                        htmlFor="hs-pro-shmarach5"
                        className="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500"
                      >
                        <span className="flex gap-x-2.5">
                          <input
                            type="radio"
                            id="hs-pro-shmarach5"
                            className="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800"
                            name="hs-pro-shmaracho"
                            value="James Collins"
                          />
                          <span className="grow -mt-0.5">
                            <span className="block font-semibold">James Collins</span>
                            <span className="block text-sm/6 text-gray-500 dark:text-neutral-500">
                              Arch 294 Jewell Street, London SE5 OBU
                            </span>
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* End Checkbox Grid */}

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="hs-collapse-toggle hs-collapse-open:hidden font-medium text-sm text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 focus:outline-hidden focus:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-600 dark:focus:text-emerald-600"
                    id="hs-shnlmsaa"
                    aria-expanded="false"
                    aria-controls="hs-shnlmsaa-heading"
                    data-hs-collapse="#hs-shnlmsaa-heading"
                  >
                    See all
                    <span className="ms-1 inline-block w-px h-3 bg-gray-300 dark:bg-neutral-600" />
                  </button>
                  <a
                    className="font-medium text-sm text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 focus:outline-hidden focus:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-600 dark:focus:text-emerald-600"
                    href="#"
                  >
                    Manage address book
                  </a>
                </div>
              </div>
            </div>
            {/* End Body */}

            {/* Footer */}
            <div className="p-6 pt-2 md:pt-2 flex flex-col gap-2">
              <button
                type="button"
                className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700"
                data-hs-overlay="#hs-pro-shmnlcm"
              >
                Done
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
                  data-hs-overlay="#hs-pro-shmnlcm"
                >
                  Cancel
                </button>
              </div>
            </div>
            {/* End Footer */}
          </div>
        </div>
      </div>
      {/* <!-- End Regional Settings Modal --> */}

      {/* <!-- Product Detail Modal --> */}
      <div
        id="hs-pro-shmchpdm"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-pro-shmchpdm-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md lg:max-w-4xl sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
          <div className="relative w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
            {/* Close Button */}
            <div className="absolute top-2 end-2.5 z-10">
              <button
                type="button"
                className="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-pro-shmchpdm"
              >
                <span className="sr-only">Close</span>
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Preview */}
              <div className="hidden lg:block relative">
                <img
                  className="shrink-0 absolute inset-0 size-full object-cover object-center rounded-t-xl lg:rounded-tr-none lg:rounded-s-xl"
                  src="https://images.unsplash.com/photo-1652540492984-c347f10fcbaf?q=80&w=980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Product Image"
                />
              </div>

              {/* Content */}
              <div className="py-4 sm:py-6 md:py-8">
                <div className="flex flex-col justify-between gap-5 lg:gap-0">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-x-3">
                      <div className="lg:hidden shrink-0 size-20">
                        <img
                          className="shrink-0 size-full object-cover object-center rounded-xl"
                          src="https://images.unsplash.com/photo-1652540492984-c347f10fcbaf?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Product Image"
                        />
                      </div>
                      <div className="grow">
                        <h4
                          id="hs-pro-shmchpdm-label"
                          className="font-medium text-lg leading-tight text-gray-800 dark:text-neutral-200"
                        >
                          Google Pixel Tablet - 11-Inch Tablet, 8 GB RAM - 128 GB,
                          Porcelain | Android Tablet, Extra-Long Battery Life
                        </h4>
                      </div>
                    </div>

                    {/* Badge Group */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="py-0.5 px-1.5 text-xs uppercase bg-orange-600 text-white rounded-md dark:bg-orange-500">
                        #1 Best seller
                      </span>
                      <a
                        className="flex items-center gap-x-1 text-sm text-gray-800 underline-offset-4 hover:underline focus:outline-hidden focus:underline dark:text-neutral-200"
                        href="#"
                      >
                        in Tablets, Laptops &amp; Accessories
                        <svg
                          className="shrink-0 size-3.5"
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
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </a>
                    </div>

                    <div className="mt-1">
                      {/* Reviews */}
                      <a
                        className="inline-block font-medium text-sm text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-emerald-500 dark:focus:text-emerald-500"
                        href="#reviews"
                      >
                        <ul className="flex flex-wrap items-center gap-2">
                          <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                            {/* Rating */}
                            <div className="flex flex-wrap items-center">
                              <span className="me-1">4.8</span>

                              {/* Stars */}
                              <div className="inline-flex items-center gap-x-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </li>
                          <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                            112 reviews
                          </li>
                        </ul>
                      </a>
                    </div>
                  </div>

                  <div className="lg:my-4 pb-1 px-4 sm:px-6 lg:px-8 max-h-72 lg:h-64 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    {/* Model */}
                    <div>
                      <span className="mb-2 block font-medium text-sm text-gray-800 dark:text-neutral-200">
                        Model:
                      </span>

                      {/* Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Checkbox */}
                        <label
                          htmlFor="hs-pro-shmpdm-pro"
                          className="group relative overflow-hidden flex items-center gap-2 p-1.5 text-xs bg-white text-gray-800 border border-gray-200 cursor-pointer rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200
                        has-checked:text-emerald-600 dark:has-checked:text-emerald-500
                        has-checked:border-emerald-600 dark:has-checked:border-emerald-500
                        has-checked:ring-1
                        has-checked:ring-emerald-600 dark:has-checked:ring-emerald-500
                        has-disabled:pointer-events-none
                        has-disabled:text-gray-200 dark:has-disabled:text-neutral-700
                        has-disabled:after:absolute
                        has-disabled:after:top-0
                        has-disabled:after:start-0
                        has-disabled:after:w-full
                        has-disabled:after:h-full
                        has-disabled:after:bg-white/75
                        has-disabled:after:dark:bg-neutral-900/75
                        "
                        >
                          <input
                            type="checkbox"
                            id="hs-pro-shmpdm-pro"
                            name="model"
                            defaultChecked
                            className="peer hidden"
                            aria-label="Pro"
                          />

                          {/* Content */}
                          <span className="shrink-0 w-4 h-4 border border-gray-300 rounded transition peer-checked:border-emerald-600 peer-checked:bg-emerald-600 dark:border-neutral-700 dark:peer-checked:bg-emerald-500" />

                          {/* Label */}
                          <span className="truncate leading-none">
                            Pro
                          </span>
                        </label>

                        {/* Other checkboxes can be added similarly */}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 mt-4">
                    {/* Price */}
                    <div>
                      <span className="text-lg font-bold text-gray-800 dark:text-neutral-200">
                        $599
                      </span>
                    </div>

                    {/* Add to cart button */}
                    <button
                      type="button"
                      className="px-5 py-2 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 rounded-md transition dark:focus:ring-emerald-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Product Detail Modal --> */}
      {/* <!-- ========== END SECONDARY CONTENT ========== --> */}
<div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 p-2 bg-white dark:bg-neutral-800 shadow-lg rounded-l-lg z-50">
        {venueData?.website_link && (
          <a href={venueData.website_link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500">
            <svg className="flex-shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </a>
        )}

        {venueData?.instagram_link && (
          <a href={venueData.instagram_link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500">
            <svg className="flex-shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>
          </a>
        )}

        {venueData?.facebook_link && (
          <a href={venueData.facebook_link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500">
            <svg className="flex-shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        )}
      </div>
    </div>

  )
}