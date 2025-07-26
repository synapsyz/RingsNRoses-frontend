'use client';

import Script from 'next/script';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback } from 'react'; 
import axios from 'axios';
import EventForm from '@/components/EventForm'; 
import LocationSelector from '../components/LocationSelector'; // Adjust the path as necessary
import { useRouter } from 'next/router';
import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Catalog from "@/components/Catalog";
import Logo from '@/components/Logo';
import CategoryGrid from '@/components/CategoryGrid'; // Adjust the path as needed
import Footer from '@/components/Footer'; // Adjust the import path as needed
import CustomerUserProfile from '@/components/CustomerUserProfile';
import FloatingAIChatButton from '@/components/FloatingAIChatButton'; // 1. Import the button component


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

    const router = useRouter();
const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false); // New state variable
 const [selectedLocationName, setSelectedLocationName] = useState('Chennai'); // New state variable
  const { data: session, status } = useSession();
  const user = session?.user;
const accessToken = session?.accessToken;
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState(null);
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  

  // ... (other state like 'status')


  useEffect(() => {
    const loadData = async () => {
      let dataToSet = null; // Variable to hold the data that will be set in state

      // 1. Try to load from localStorage
      const storedEventDataString = localStorage.getItem('eventFormData');
      console.log("useEffect - storedEventDataString from localStorage:", storedEventDataString);

      if (storedEventDataString) {
        try {
          dataToSet = JSON.parse(storedEventDataString);
          console.log("useEffect - parsedData from localStorage:", dataToSet);
        } catch (error) {
          console.error("useEffect - Error parsing eventFormData from localStorage:", error);
          // dataToSet remains null, will proceed to API call
        }
      }

      // 2. If no data from localStorage, try fetching from API
      if (dataToSet === null) {
        console.log("useEffect - No valid data in localStorage, attempting to fetch from API.");
        if (accessToken) { // Only attempt API call if accessToken is available
          try {
            // Replace 'apiClient.put' with your actual API call method (e.g., get.put, axios.put)
            // Define what 'dataToSendForProfileFetch' should be.
            // If this PUT request is meant to fetch data, its body might be empty or specific.
            const dataToSendForProfileFetch = {}; // Example: an empty object or specific payload

            console.log("useEffect - Calling API /customer-profile/update/");
            const response = await await api.put( // Or your `get.put`
              '/customer-profile/update/',
              dataToSendForProfileFetch,
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
              }
            );

            // Assuming the data you want is in response.data
            dataToSet = response.data;
            console.log("useEffect - Data fetched from API:", dataToSet);

            // Optionally, save the fetched data back to localStorage for next time
            if (dataToSet) {
              localStorage.setItem('eventFormData', JSON.stringify(dataToSet));
              console.log("useEffect - Fetched data also saved to localStorage.");
            }

          } catch (apiError) {
            console.error("useEffect - Error fetching data from API:", apiError);
            // dataToSet remains null if API call fails
          }
        } else {
          console.log("useEffect - No accessToken available, skipping API call.");
          // dataToSet remains null
        }
      }

      // 3. Update the state with whatever data was resolved (from localStorage, API, or null)
      setDataFromLocalStorage(dataToSet);
      // This log will show the state value from the *previous* render, not the 'dataToSet' immediately.
      // To see the updated state, log 'dataFromLocalStorage' in the component body or another useEffect.
      console.log("useEffect - dataFromLocalStorage (immediately after setDataFromLocalStorage call):", dataFromLocalStorage);
    };

    loadData();

    // The setTimeout for auth simulation can remain if it serves another purpose
    // For instance, if it updates an authentication 'status' which then triggers other UI changes.
    // It doesn't directly interact with the data loading logic above unless 'status' was a dependency.
    const authTimer = setTimeout(() => {
      // Example: setStatus("authenticated");
      // If this timeout is purely for simulating a delay and does nothing, it can be removed.
    }, 1000);

    return () => {
      clearTimeout(authTimer); // Clean up the timer if the component unmounts
    };

  }, [accessToken, setDataFromLocalStorage]); // Dependency array
  // - Add accessToken: if the token changes, we might need to re-fetch.
  // - setDataFromLocalStorage: React guarantees setters from useState are stable,
  //   but including it satisfies exhaustive-deps lint rule if enabled. It's optional.

  // Log outside useEffect to see the updated state after render
  console.log("Component Body - dataFromLocalStorage (after render):", dataFromLocalStorage);

  console.log(session);
  console.log(user);

useEffect(() => {
  if (status !== "authenticated") return;

  const eventDate = dataFromLocalStorage?.event_date;
  if (!eventDate) return;

  const target = new Date(eventDate).getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) {
      clearInterval(interval);
      return;
    }

    setTimeLeft({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    });
  }, 1000);

  return () => clearInterval(interval);
}, [session, status]);

  
  console.log(user);
    const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    
  // Check if the date exists in session data
  if (!dataFromLocalStorage?.event_date) {
    console.error("Event date not found in session");
    return;
  }

  // Parse the date from session (assuming format like "2025-06-28T00:00:00")
  const targetDate = new Date(dataFromLocalStorage?.event_date).getTime();

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
}, [dataFromLocalStorage?.event_date]); // Add dependency
    const handlePrelineLoad = () => {
    const el = document.querySelector('[data-hs-carousel]');
    if (el && window.HSCarousel) {
      window.HSCarousel.autoInit(el);
    }
  };
const [categories, setCategories] = useState([]);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const headerContainerRef = useRef(null);
  const mobileDropdownRef = useRef(null); // Ref for the custom mobile dropdown
const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [clickedCategoryId, setClickedCategoryId] = useState(null);
  const [mobileSelectedCategoryId, setMobileSelectedCategoryId] = useState(null);
  const [mobileSelectedCategoryName, setMobileSelectedCategoryName] = useState('Select a category'); // For custom dropdown display
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // State for custom dropdown

   // New state for caching subcategories

  const [subcategoriesCache, setSubcategoriesCache] = useState({});
  const [currentSubcategories, setCurrentSubcategories] = useState([]); // State to hold currently displayed subcategories
  const [isSubcategoriesLoading, setIsSubcategoriesLoading] = useState(false);
  const [subcategoriesError, setSubcategoriesError] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  const [relatedItems , setrelatedItems] = useState(null);
  const [favoriteData, setfavoriteData] = useState(null);
  const [venueData, setvenueData] = useState(null);
  const [cateringData, setcateringData] = useState(null);
  const [beautyData, setbeautyData] = useState(null);

  // THIS IS THE CRUCIAL LOG (presumably index.js:88 for you)
  console.log("dataFromLocalStorage (in component body, AFTER RENDER):",dataFromLocalStorage);
  // Effect to determine mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to fetch main categories when the catalog opens
  useEffect(() => {
    if (categories.length === 0 && !isLoading) {
      setIsLoading(true);
      setError(null);
      api
        .get('/categories')
        .then((response) => {
          setCategories(response.data.results);
           // Set initial hovered/clicked/mobile selected category if needed

          if (response.data.results.length > 0) {

            if (isMobile) {

              setMobileSelectedCategoryId(response.data.results[0].id);

              setMobileSelectedCategoryName(response.data.results[0].name);

            } else {

              setHoveredCategoryId(response.data.results[0].id);

              setClickedCategoryId(response.data.results[0].id);

            }

          }
        })
        .catch((err) => {
          console.error('Error fetching categories:', err);
          setError('Failed to load categories. Please try again.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [categories.length, isLoading, isMobile]);

  // Effect to fetch subcategories based on hovered, clicked, or mobile selected category
  useEffect(() => {
    const idToFetch = isMobile && mobileSelectedCategoryId !== null
      ? mobileSelectedCategoryId
      : hoveredCategoryId !== null
      ? hoveredCategoryId
      : clickedCategoryId;

    if (idToFetch) {
       // Check if subcategories are already in cache

      if (subcategoriesCache[idToFetch]) {

        setCurrentSubcategories(subcategoriesCache[idToFetch]);

        setIsSubcategoriesLoading(false);

        setSubcategoriesError(null);

        return; // Exit early as data is cached

      }
      setIsSubcategoriesLoading(true);
      setSubcategoriesError(null);
      api.get(`/categories/${idToFetch}/subcategories/`)
        .then(response => {
          const fetchedSubcategories = response.data.results;

          setCurrentSubcategories(fetchedSubcategories);

          // Store fetched subcategories in cache

          setSubcategoriesCache(prevCache => ({

            ...prevCache,

            [idToFetch]: fetchedSubcategories,

          }));
        })
        .catch(err => {
          console.error('Error fetching subcategories for category', idToFetch, ':', err);
          setSubcategoriesError('Failed to load subcategories for this category.');
          setCurrentSubcategories([]);
        })
        .finally(() => {
          setIsSubcategoriesLoading(false);
        });
    } else {
      setCurrentSubcategories([]);
      setSubcategoriesError(null);
    }
  }, [hoveredCategoryId, clickedCategoryId, mobileSelectedCategoryId, isMobile, subcategoriesCache]);










  useEffect(() => {

    const fetchfavoriteData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
        };

        const sug = await api.get(`/favorite/grouped/`, config);



        var apiResponse = sug.data.results.slice(0, 5);

        setfavoriteData(apiResponse);


      } catch (err) {
        console.error("Error fetching favorite data:", err);
        setError("Failed to load favorite data.");
      } finally {
        setLoading(false);
      }
    };

    fetchfavoriteData();
  }, [accessToken]);






  useEffect(() => {

    const fetchvenueData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
        };

        const sug = await api.get(`categories/venues/subcategories/1/`, config);


        var apiResponse = sug.data.results.slice(0, 5);

        setvenueData(apiResponse);


      } catch (err) {
        console.error("Error fetching venue data:", err);
        setError("Failed to load venue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchvenueData();
  }, [accessToken]);




 useEffect(() => {

    const fetchcateringData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
        };

        const sug = await api.get(`categories/catering_&_beverages/subcategories/35/`, config);


        var apiResponse = sug.data.results.slice(0, 5);

        setcateringData(apiResponse);


      } catch (err) {
        console.error("Error fetching catering data:", err);
        setError("Failed to load catering data.");
      } finally {
        setLoading(false);
      }
    };

    fetchcateringData();
  }, [accessToken]);






 useEffect(() => {

    const fetbeautyData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
        };

        const sug = await api.get(`categories/beauty_&_grooming/subcategories/15/`, config);


        var apiResponse = sug.data.results.slice(0, 5);

        setbeautyData(apiResponse);


      } catch (err) {
        console.error("Error fetching beauty data:", err);
        setError("Failed to load beauty data.");
      } finally {
        setLoading(false);
      }
    };

    fetbeautyData();
  }, [accessToken]);













  // Effect to close the catalog section AND the custom mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCatalogOpen &&
        headerContainerRef.current &&
        !headerContainerRef.current.contains(event.target)
      ) {
        setIsCatalogOpen(false);
        setHoveredCategoryId(null);
        setClickedCategoryId(null);
        setMobileSelectedCategoryId(null);
        setMobileSelectedCategoryName('Select a category');
        setIsMobileDropdownOpen(false); // Close the custom dropdown
      }

      // Also handle closing the custom dropdown if it's open and click is outside it
      if (isMobileDropdownOpen && mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCatalogOpen, isMobileDropdownOpen]); // Dependency on isMobileDropdownOpen

  const toggleCatalog = () => {
    setIsCatalogOpen(!isCatalogOpen);
    if (!isCatalogOpen) {

      if (categories.length > 0) {

        if (isMobile) {

          // If no mobile category selected yet, default to first

          if (mobileSelectedCategoryId === null) {

            setMobileSelectedCategoryId(categories[0].id);

            setMobileSelectedCategoryName(categories[0].name);

          }

        } else {
          if (hoveredCategoryId === null && clickedCategoryId === null) {

            setHoveredCategoryId(categories[0].id);

            setClickedCategoryId(categories[0].id);

          }

        }

      }
    }
  };

 

const handleLogoutClick = async () => {
  console.log("Logout process started...");

  // 1. Clear the specific localStorage item
  localStorage.removeItem('eventFormData');
  console.log("'eventFormData' removed from localStorage.");

 

  try {
    // 3. Call the original signOut function from your authentication library
    // The redirect: false option means the page won't automatically redirect.
    // The signOut function might update the session state managed by your auth library.
    await signOut({ redirect: false }); // Using await if signOut returns a Promise
    console.log("Authentication signOut successful (no redirect).");

    // At this point, the auth library (e.g., NextAuth.js) should have updated its
    // session status. Your UI should react to this change (e.g., show login screen).
    // If you need to manually update a local 'isAuthenticated' flag that isn't
    // automatically handled by your auth library's hooks (like useSession), do it here.
    // e.g., setLocalAuthStatus(false);

  } catch (error) {
    console.error("Error during sign out process:", error);
    // Handle any errors from the signOut operation itself
  }
};

  const SubcategoryItem = ({ subcategory, onClick }) => (
    <a
  key={subcategory.id} // Note: key is usually for list rendering, not on the anchor tag itself. If this is within a map, the key should be on the parent element of this a tag.
  href={`/${subcategory.category.name.toLowerCase().replace(/[\s-/]+/g, '_')}/${subcategory.name.toLowerCase().replace(/[\s-/]+/g, '_')}`}
  className="flex flex-col items-center justify-center text-center text-sm text-gray-700 rounded-lg hover:bg-gray-100 p-2 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-800 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
  onClick={onClick} // Keep your existing onClick handler if it does other things
>
      {subcategory.image_url ? (
        <Image
          src={subcategory.image_url}
          alt={subcategory.name}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className="rounded-full object-cover mb-4 w-[100px] h-[100px]"
        />
      ) : (
        <div
          className="rounded-full bg-gray-300 flex items-center justify-center mb-2 w-[100px] h-[100px]"
        >
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L20 20m-6-6l2-2m-2-2L14 4"></path>
          </svg>
        </div>
      )}
      <span className="text-gray-800 dark:text-white font-medium">{subcategory.name}</span>
    </a>
  );
useEffect(() => {
  const themeButtons = document.querySelectorAll('[data-hs-theme-click-value]');
  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-hs-theme-click-value');
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  });

  // Initialize theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}, []);
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
        
                        <FloatingAIChatButton /> {/* 2. Render the button here */}


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
  onClick={() => setIsLocationSelectorOpen(true)}
>
  <img className="shrink-0 size-3.5 rounded-full" src="in.png" alt="English"/>
  {selectedLocationName} {/* Display the selected location name */}
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
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
              <span className="sr-only">Dark mode</span>
            </button>
            <button type="button" className="hs-dark-mode-active:flex hidden hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="light">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
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
            {/* <!-- End Dropdown Link --> */}

            <div className="hidden md:block w-full">
              {/* <!-- Search Input --> */}
<SearchBar />
              {/* <!-- End Search Input --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Search --> */}

        {/* <!-- Widgets --> */}
        <CustomerUserProfile />
        {/* <!-- End Widgets --> */}
      </div>

      <div className="md:hidden mt-2.5 md:mt-0 w-full">
        {/* <!-- Search Input --> */}
<SearchBar />
        {/* <!-- End Search Input --> */}
      </div>
    </div>
   {/* Expanded Catalog Section - Now always rendered but hidden with CSS */}


    
</div> 

  {/* <!-- ========== END HEADER ========== --> */}

  {/* <!-- ========== MAIN CONTENT ========== --> */}
  <main id="content"> 
     {status === "authenticated" && dataFromLocalStorage && dataFromLocalStorage?.event_date == null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur effect - MODIFIED OPAQUE CLASS HERE */}
          <div className="absolute inset-0 bg-opacity-0 backdrop-blur-sm"></div> 
          
          {/* EventForm on top */}
          <div className="relative z-10 w-full max-w-lg md:max-w-xl lg:max-w-2xl">
            <EventForm /> 
          </div>
        </div>
      )}
<div className="py-10 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
{/* <!-- Stats Grid --> */}
 
  {status === "authenticated" && user &&(
  <>
<div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-2">
  <div className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 md:col-span-2">
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">

      <div className="flex-1 flex flex-col gap-2">
<div className="flex items-center gap-2">
  <h2 className="text-lg font-bold text-gray-800 dark:text-white">{dataFromLocalStorage?.groom_name}</h2>
  <h2 className="text-lg font-bold text-gray-800 dark:text-white">&</h2>
<h2 className="text-lg font-bold text-gray-800 dark:text-white">{dataFromLocalStorage?.bride_name}</h2>
</div>
<p className="text-l text-gray-500 dark:text-neutral-300">
  {new Date(dataFromLocalStorage?.event_date).toLocaleDateString('en-GB', {
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
<HeroCarousel />
    {/* <!-- End Slider --> */}
</div>

    {/* <!-- Catgory Group --> */}
    <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      {/* <!-- Grid --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="/photography_&_videography/wedding_photographers">
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
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="/invitations_&_stationery/e_invite_digital_invite_designers">
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
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="/gifts_&_favors/wedding_favors_suppliers">
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
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="/beauty_&_grooming/makeup_artists">
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
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      {/* <!-- End Header --> */}

      {/* <!-- Grid --> */}
  <CategoryGrid items={favoriteData} />
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
    {/* List */}
    {/* <div className="relative flex flex-1 items-center overflow-hidden"> */}
     <CategoryGrid items={venueData} />
     <CategoryGrid items={cateringData} />
     <CategoryGrid items={beautyData} />
    {/* </div> */}
    {/* End List */}
  </div>

      {/* <!-- Grid --> */}
  <CategoryGrid items={suggestions} />
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
<Footer />
  {/* <!-- ========== END FOOTER ========== --> */}

  {/* <!-- ========== SECONDARY CONTENT ========== --> */}
  {/* <!-- Regional Settings Modal --> */}
  <div id="hs-pro-shmnrsm" className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shmnrsm-label">
    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div className="w-full max-h-full relative overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
        {/* <!-- Header --> */}
       <LocationSelector
  isOpen={isLocationSelectorOpen}
  onClose={() => setIsLocationSelectorOpen(false)}
  onSave={(selectedLocationData) => {
    console.log('Selected Location:', selectedLocationData);
    setSelectedLocationName(selectedLocationData.location || 'Chennai'); // Update the displayed location name
    setIsLocationSelectorOpen(false); // Close after saving
  }}
  onChange={(currentSelection) => {
    console.log('Current Selection:', currentSelection);
  }}
/>
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
                  "optionTemplate": "<div><div className=\"flex items-center gap-x-2\"><div data-icon></div><div className=\"text-gray-800 dark:text-neutral-200\" data-title></div><span className=\"hidden hs-selected:block ms-auto\"><svg className=\"shrink-0 size-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div></div>",
                  "dropdownScope": "window",
                  "viewport": "#hs-pro-shmnrsm-body"
                }' className="hidden">
                        <option value="">Choose</option>
                        <option
                          selected
                          value="English-us"
                          data-hs-select-option={JSON.stringify({
                            icon: `<svg className="shrink-0 size-4 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill-rule="evenodd"><g strokeWidth="1pt"><path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/><path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/></g><path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"/><path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3z..." /></g></svg>`,
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
                  "icon": "<svg className=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-it\" viewBox=\"0 0 512 512\"><g fill-rule=\"evenodd\" strokeWidth=\"1pt\"><path fill=\"#fff\" d=\"M0 0h512v512H0z\"/><path fill=\"#009246\" d=\"M0 0h170.7v512H0z\"/><path fill=\"#ce2b37\" d=\"M341.3 0H512v512H341.3z\"/></g></svg>"}'>
                    Italiano
                  </option>
                  <option value="中文-繁體" data-hs-select-option='{
                  "icon": "<svg className=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"flag-icon-css-cn\" viewBox=\"0 0 512 512\"><defs><path id=\"a\" fill=\"#ffde00\" d=\"M1-.3L-.7.8 0-1 .6.8-1-.3z\"/></defs><path fill=\"#de2910\" d=\"M0 0h512v512H0z\"/><use width=\"30\" height=\"20\" transform=\"matrix(76.8 0 0 76.8 128 128)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-121 142.6 -47) scale(25.5827)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-98.1 198 -82) scale(25.6)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-74 272.4 -114) scale(25.6137)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"matrix(16 -19.968 19.968 16 256 230.4)\" xlink:href=\"#a\"/></svg>"}'>
                    中文 (繁體)
                  </option>
                </select>

                <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg className="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
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
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
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
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
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
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
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
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
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
