'use client';
import Head from 'next/head';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the default styles
import { useSession, signOut } from 'next-auth/react';
import React, { useState, useEffect, useRef, useCallback } from 'react'; 
import axios from 'axios';
import LocationSelector from '../components/LocationSelector'; // Adjust the path as necessary
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import CategoryItemCard from '@/components/CategoryItemCard';
 import InfiniteScroll from 'react-infinite-scroll-component';
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

export default function Listing() {
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [selectedLocationName, setSelectedLocationName] = useState('Chennai');
  const [hasMore, setHasMore] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
     const sliderRef = useRef(null);
     const [categoryItems, setCategoryItems] = useState([]);
     const [categoryItemsCache, setCategoryItemsCache] = useState({});
      const { data: session, status } = useSession();
      const user = session?.user;
const [categories, setCategories] = useState([]);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const headerContainerRef = useRef(null);
  const mobileDropdownRef = useRef(null); // Ref for the custom mobile dropdown
const [selectedCategoryId, setSelectedCategoryId] = useState(1); // State to track selected category
const [categoryName, setCategoryName] = useState('Venues');
 const [subcategoriesMap, setSubcategoriesMap] = useState({});
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [clickedCategoryId, setClickedCategoryId] = useState(null);
  const [mobileSelectedCategoryId, setMobileSelectedCategoryId] = useState(null);
  const [mobileSelectedCategoryName, setMobileSelectedCategoryName] = useState('Select a category'); // For custom dropdown display
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // State for custom dropdown
const [subcategoryItemsMap, setSubcategoryItemsMap] = useState({});
  const [selectedCapacity, setSelectedCapacity] = useState(null);
const [isInfiniteScrollActive, setIsInfiniteScrollActive] = useState(false);
// States for the selected range to be sent to the API
  const [sortBy, setSortBy] = useState('');

  // ... other function declarations

  // Add the following function for handling sort changes
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // States for the current values displayed on the sliders (for smoother UI feedback)
  const [priceSliderValue, setPriceSliderValue] = useState([0, 10000]);
  const [capacitySliderValue, setCapacitySliderValue] = useState([0, 1000]);

   // New state for caching subcategories

  const [subcategoriesCache, setSubcategoriesCache] = useState({});
  const [currentSubcategories, setCurrentSubcategories] = useState([]); // State to hold currently displayed subcategories
  const [isSubcategoriesLoading, setIsSubcategoriesLoading] = useState(false);
  const [subcategoriesError, setSubcategoriesError] = useState(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
const mobileSidebarRef = useRef(null);
  const [isOn, setIsOn] = useState(false); // Manage the toggle's state
const [selectedFilters, setSelectedFilters] = useState([]);
const[isShowItems, setIsShowItems]=useState(false);
  // New state for price range (conceptual)
  const [selectedPriceRange, setSelectedPriceRange] = useState(null); 
  const prices = [
    { id: "0-1000", label: "₹0-₹1,000", min: 0, max: 1000 },
    { id: "1000-5000", label: "₹1,000-₹5,000", min: 1000, max: 5000 },
    { id: "5000-10000", label: "₹5,000-₹10,000", min: 5000, max: 10000 },
    { id: "above-10000", label: "Above ₹10,000", min: 10000, max: 999999 },
  ];  
const handleToggle = () => {
    setIsOn(!isOn);
    // You would typically perform an action here, e.g., filter products by deals
    console.log('Deal toggle is now:', !isOn);
  };
  const capacities = [
    { id: "0-100", label: "0-100", min: 0, max: 100 },
    { id: "100-300", label: "100-300", min: 100, max: 300 },
    { id: "500-1000", label: "500-1000", min: 500, max: 1000 },
    { id: "above-1000", label: "Above 1000", min: 1000, max: 99999 },
  ];
  // Inside your Listing component
 const fetchMoreData = () => {
    if (!nextPageUrl) {
      setHasMore(false);
      return;
    }

    const currentCategoryName = categoryName.toLowerCase().replace(/\s+/g, '_');
    const selectedSubIds = Object.entries(checkedItems)
      .filter(([, isChecked]) => isChecked)
      .map(([id]) => id);

    const params = {};
    if (selectedCapacity) {
      params.min_capacity = selectedCapacity.min;
      params.max_capacity = selectedCapacity.max;
    }
    if (isOn) {
      params.deals = true;
    }
    if (selectedPriceRange) {
      params.min_price = selectedPriceRange.min;
      params.max_price = selectedPriceRange.max;
    }
     if (sortBy === 'priceLowToHigh') {
    params.ordering = 'price';
  } else if (sortBy === 'priceHighToLow') {
    params.ordering = '-price';
  }

    // Axios will automatically merge existing params with the ones from nextPageUrl if it's a full URL
    // or append them if nextPageUrl is just the path + query.
    // Ensure nextPageUrl is just the path part for params to be correctly applied.
    // If nextPageUrl already contains query params, axios will merge, but it's cleaner
    // to build it from base + new params.
    api.get(nextPageUrl, { params }) 
      .then((response) => {
        const newItems = response.data.results;
        setCategoryItems((prevItems) => [...prevItems, ...newItems]);
        setNextPageUrl(response.data.next);
        if (response.data.next === null) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching more items:', err);
        setHasMore(false);
      });
  };

    useEffect(() => {
        if (categories.length === 0 && !isLoading) {
          setIsLoading(true);
          setError(null);
          api.get('/categories')
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
    
      // Handler for custom dropdown selection
      const handleMobileCategorySelect = useCallback((category) => {
        setMobileSelectedCategoryId(category.id);
        setMobileSelectedCategoryName(category.name);
        setIsMobileDropdownOpen(false); // Close dropdown after selection
      }, []); // No dependencies, can be memoized
    
      const IMAGE_SIZE = 100;
    
      const SubcategoryItem = ({ subcategory, onClick }) => (
        <Link
          key={subcategory.id}
          href={`/categories/${subcategory.category.id}/subcategories/${subcategory.id}`}
          className="flex flex-col items-center justify-center text-center text-sm text-gray-700 rounded-lg hover:bg-gray-100 p-2 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-800 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          onClick={onClick}
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
        </Link>
      );
   useEffect(() => {
    const fetchSubcategories = async () => {
      // If already cached, do not fetch again
      if (subcategoriesMap[selectedCategoryId]) return;

      try {
        const res = await api.get(`/categories/${selectedCategoryId}/subcategories/`);

        setSubcategoriesMap((prev) => ({
          ...prev,
          [selectedCategoryId]: res.data.results,
        }));
        setCheckedItems({}); // Optional: reset checkboxes on new category
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };

    fetchSubcategories();
  }, [selectedCategoryId, subcategoriesMap]);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const subcategories = subcategoriesMap[selectedCategoryId] || [];
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
  useEffect(() => {
    // Check if any subcategory is checked
    const anySubcategoryChecked = Object.values(checkedItems).some(isChecked => isChecked);

    if (anySubcategoryChecked) { // If any subcategory is checked, this effect should not run
      setCategoryItems([]); // Clear default items if subcategories are selected
      return;
    }

    const name = categoryName.toLowerCase().replace(/\s+/g, '_');
    if (!name) return;

    if (categoryItemsCache[name]) {
      setCategoryItems(categoryItemsCache[name]);
      return;
    }

    api.get(`/categories/${name}/`)
      .then(response => {
        const items = response.data.results;
        setCategoryItems(items);

        setCategoryItemsCache(prev => ({
          ...prev,
          [name]: items
        }));
      })
      .catch(err => {
        console.error(`Failed to fetch items for category ${name}:`, err);
        setCategoryItems([]);
      });
  }, [categoryName, categoryItemsCache, checkedItems]);
useEffect(() => {
const name = categoryName.toLowerCase().replace(/\s+/g, '_');
  if (!name) return;

  if (categoryItemsCache[name]) {
    setCategoryItems(categoryItemsCache[name]);
    return;
  }

  api.get(`/categories/${name}/`)
    .then(response => {
      const items = response.data.results;
      setCategoryItems(items);

      setCategoryItemsCache(prev => ({
        ...prev,
        [name]: items
      }));
    })
    .catch(err => {
      console.error(`Failed to fetch items for category ${name}:`, err);
      setCategoryItems([]);
    });
}, [categoryName]);



useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isMobileSidebarOpen &&
      mobileSidebarRef.current &&
      !mobileSidebarRef.current.contains(event.target)
    ) {
      setIsMobileSidebarOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isMobileSidebarOpen]);
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // initial call

  return () => window.removeEventListener('resize', handleResize);
}, []);
useEffect(() => {
  if (isMobileSidebarOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [isMobileSidebarOpen]);

  // New/Modified useEffect to fetch items for selected subcategories

  // useEffect(() => {
  //   const selectedSubIds = Object.entries(checkedItems)
  //     .filter(([_, isChecked]) => isChecked)
  //     .map(([id]) => id);

  //   if (selectedSubIds.length === 0) {
  //     setCategoryItems([]);
  //     return;
  //   }

  //   const fetchAndCombineSubcategoryItems = async () => {
  //     let allFetchedItems = [];
  //     const currentCategoryName = categoryName.toLowerCase().replace(/\s+/g, '_');

  //     for (const subId of selectedSubIds) {
  //       try {
  //         let endpoint = `/categories/${currentCategoryName}/subcategories/${subId}/`;
  //         if (selectedCapacity) {
  //           endpoint += `?min_capacity=${selectedCapacity.min}&max_capacity=${selectedCapacity.max}`;
  //         }
  //         const res = await api.get(endpoint);
  //         const items = res.data.results || [];
  //         allFetchedItems = allFetchedItems.concat(items);
  //       } catch (err) {
  //         console.error(`Failed to fetch items for subcategory ${subId}:`, err);
  //       }
  //     }
  //     setCategoryItems(allFetchedItems);
  //   };

  //   fetchAndCombineSubcategoryItems();
  // }, [checkedItems, categoryName, selectedCapacity]);
   useEffect(() => {
  const currentCategoryName = categoryName.toLowerCase().replace(/\s+/g, '_');
  if (!currentCategoryName) return;

  const selectedSubIds = Object.entries(checkedItems)
    .filter(([, isChecked]) => isChecked)
    .map(([id]) => id);

  const params = {};
  if (selectedCapacity) {
    params.min_capacity = selectedCapacity.min;
    params.max_capacity = selectedCapacity.max;
  }
  if (isOn) {
    params.deals = true;
  }
  if (selectedPriceRange) {
    params.min_price = selectedPriceRange.min;
    params.max_price = selectedPriceRange.max;
  }
  // Add this block for sorting
  if (sortBy === 'priceLowToHigh') {
    params.ordering = 'price';
  } else if (sortBy === 'priceHighToLow') {
    params.ordering = '-price';
  }
  // End of sorting block

  const fetchItems = async (subId = null) => {
    let endpoint = `/categories/${currentCategoryName}/`;
    if (subId) {
      endpoint += `subcategories/${subId}/`;
    }

    try {
      const res = await api.get(endpoint, { params });
      return { items: res.data.results || [], next: res.data.next };
    } catch (err) {
      console.error(`Failed to fetch items for ${subId ? `subcategory ${subId}` : 'category'} with filters:`, err);
      return { items: [], next: null };
    }
  };

  const fetchAllItems = async () => {
    setIsLoading(true);
    setCategoryItems([]);
    setHasMore(true);
    setNextPageUrl(null);

    let allFetchedItems = [];
    let nextUrlForPagination = null;

    if (selectedSubIds.length > 0) {
      for (const subId of selectedSubIds) {
        const { items } = await fetchItems(subId);
        allFetchedItems = allFetchedItems.concat(items);
      }
      setHasMore(false);
    } else {
      const { items, next } = await fetchItems();
      allFetchedItems = items;
      nextUrlForPagination = next;
      setHasMore(next !== null);
    }

    setCategoryItems(allFetchedItems);
    setNextPageUrl(nextUrlForPagination);
    setIsLoading(false);
  };

  fetchAllItems();

}, [checkedItems, categoryName, selectedCapacity, isOn, selectedPriceRange, sortBy]); // Add sortBy here
//    useEffect(() => {
//       const name = categoryName.toLowerCase().replace(/\s+/g, '_');
//       if (!name) return;
  
//       if (categoryItemsCache[name] && !selectedCapacity) {
//         setCategoryItems(categoryItemsCache[name]);
//         return;
//       }
  
//       let endpoint = `/${name}/`;
//       if (selectedCapacity) {
//         endpoint += `?min_capacity=${selectedCapacity.min}&max_capacity=${selectedCapacity.max}`;
//       }
  
//       api.get(endpoint)
//         .then(response => {
//           const items = response.data.results;
//           setCategoryItems(items);
//           if (!selectedCapacity) {
//             setCategoryItemsCache(prev => ({
//               ...prev,
//               [name]: items
//             }));
//           }
//         })
//         .catch(err => {
//           console.error(`Failed to fetch items for category ${name}:`, err);
//           setCategoryItems([]);
//         });
//     }, [categoryName, selectedCapacity]);
// useEffect(() => {
//   if (!isShowItems) return;

//   const selectedSubIds = Object.entries(checkedItems)
//     .filter(([_, isChecked]) => isChecked)
//     .map(([id]) => id);

//   if (selectedSubIds.length === 0) return;

//   selectedSubIds.forEach(async (subId) => {
//     const name = categoryName.toLowerCase().replace(/\s+/g, '_');
//     setCategoryName(name);
//     if (subcategoryItemsMap[subId]) return; // Cached

//     try {
//       const res = await api.get(`/categories/${name}/subcategories/${subId}/`);
//       const items = res.data.results || [];

//       setSubcategoryItemsMap(prev => ({
//         ...prev,
//         [subId]: items,
//       }));
//     } catch (err) {
//       console.error(`Failed to fetch items for subcategory ${subId}`, err);
//     }
//   });
// }, [checkedItems, isShowItems]);
// Example modification for an existing useEffect that fetches category items
useEffect(() => {
  const idToFetchItemsFor = isMobile && mobileSelectedCategoryId !== null
    ? mobileSelectedCategoryId
    : clickedCategoryId;

  if (idToFetchItemsFor) {
    // Reset states when category changes
    setCategoryItems([]); // Clear existing items when category changes
    setHasMore(true); // Reset hasMore to true for a new category
    setNextPageUrl(null); // Reset nextPageUrl for a new category

    // Set loading state if you have one
    // setIsLoading(true);

    // Initial fetch for the first page
    api.get(`/categories/${categoryName.toLowerCase().replace(/\s+/g, '_')}/`) // Use your initial API endpoint
      .then(response => {
        setCategoryItems(response.data.results);
        setNextPageUrl(response.data.next); // Store the next page URL
        if (response.data.next === null) {
          setHasMore(false); // If no next page, set hasMore to false
        }
      })
      .catch(err => {
        console.error('Error fetching category items:', err);
        // setError('Failed to load category items. Please try again.');
        setHasMore(false); // If initial fetch fails, stop future attempts
      })
      // .finally(() => {
      //   setIsLoading(false);
      // });
  }
}, [clickedCategoryId, mobileSelectedCategoryId, isMobile, categoryName]); // Add categoryName to dependencies
  return (
    <>
      
        {/* Required Meta Tags Always Come First */}
        <meta charSet="utf-8" />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://preline.co/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing." />

        <meta name="twitter:site" content="@preline" />
        <meta name="twitter:creator" content="@preline" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop Listing | Preline Pro | Preline UI, crafted with Tailwind CSS" />
        <meta name="twitter:description" content="A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing." />
        <meta name="twitter:image" content="https://preline.co/assets/img/og-image.png" />

        <meta property="og:url" content="https://preline.co/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Preline" />
        <meta property="og:title" content="Shop Listing | Preline Pro | Preline UI, crafted with Tailwind CSS" />
        <meta property="og:description" content="A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing." />
        <meta property="og:image" content="https://preline.co/assets/img/og-image.png" />

        {/* Title */}
        <title>Listing Page</title>

        {/* Favicon */}
        <link rel="shortcut icon" href="../favicon.ico" />

        {/* Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* CSS HS */}
        {/* <link rel="stylesheet" href="./assets/css/main.min.css?v=3.0.1" />

        <link rel="stylesheet" href="./assets/vendor/apexcharts/dist/apexcharts.css" /> */}

        <style>{`
          .apexcharts-tooltip.apexcharts-theme-light {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
        `}</style>

    
        
      <div className="dark:bg-neutral-900">
        {/* ========== HEADER ========== */}
        <header className="flex flex-col lg:flex-nowrap z-[30] bg-white dark:bg-neutral-900">
          {/* Topbar */}
          <div className="bg-gray-100 dark:bg-neutral-800">
            <div className="max-w-[85rem] flex justify-between w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-x-5"></div>

              <ul className="flex flex-wrap items-center gap-3">
                <li className="inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
                  <button
  type="button"
  className="flex items-center gap-x-1.5 text-start text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
  onClick={() => setIsLocationSelectorOpen(true)} // Opens the LocationSelector
>
  <img className="shrink-0 size-3.5 rounded-full" src="in.png" alt="English" />
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
                  <a
                    className="text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                    href="#"
                  >
                    Help
                  </a>
                </li>
                <li className="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
                  <a
                    className="text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                    href="#"
                  >
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
          {/* End Topbar */}

       <div
            ref={headerContainerRef}
            className="max-w-[85rem] basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 z-[30] relative bg-white dark:bg-neutral-900"
          >
      
          <div className="max-w-[85rem] basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 dark:bg-neutral-900">
            <div className="w-full flex md:flex-nowrap md:items-center gap-2 lg:gap-6 ">
              
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
                  <div className="font-inter">
                    <button
                      id="catalog-button"
                      type="button"
                      className="py-[7px] sm:py-2 sm:py-2.5 px-3 flex items-center gap-x-1.5 text-sm text-start border border-transparent text-white rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden"
                      style={{ backgroundColor: '#E91E63' }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d81b60')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E91E63')}
                      aria-expanded={isCatalogOpen}
                      aria-label="Toggle Catalog"
                      onClick={toggleCatalog}
                    >
                      {/* Hamburger/Close Icon */}
                      <svg
                        className={`${isCatalogOpen ? 'hidden' : 'block'} shrink-0 size-4`}
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
                        className={`${isCatalogOpen ? 'block' : 'hidden'} shrink-0 size-4`}
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
                  </div>
                  {/* <!-- End Dropdown Link --> */}
      
                  <div className="hidden md:block w-full">
                    {/* <!-- Search Input --> */}
                   <div className="relative w-full">
        <input
          type="text"
          className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border border-gray-200 text-base sm:text-sm rounded-full 
                     focus:outline-none 
                     focus:border-[#E91E63]     // <--- This now applies to ALL screen sizes
                     focus:ring-1 
                     focus:ring-[#E91E63]       // <--- This now applies to ALL screen sizes
                     disabled:opacity-50 disabled:pointer-events-none 
                     dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400"
          placeholder="Search venues, decorators, makeup artists..."
        />
        <div className="absolute inset-y-0 end-0 z-[10] flex items-center pe-1 sm:pe-1.5">
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
        <div className="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-[10] pe-1">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full text-white focus:outline-hidden"
            style={{
              backgroundColor: '#E91E63',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d81b60')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E91E63')}
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
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
              {status === "authenticated" && user && (
                <>
      <div className="order-2 md:order-3 ms-auto lg:ms-0">
                <div className="flex justify-end items-center gap-x-2">
                          {/* <!-- Favorites Button Icon --> */}
                          <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                            <button id="hs-pro-dnnd" type="button" className="relative shrink-0 inline-flex justify-center items-center gap-x-2 size-9.5 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                              </svg>
                              <span className="flex absolute top-0 end-0 z-[10] -mt-1 -me-1">
                                <span className="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-gray-800 text-white rounded-full px-1 dark:bg-neutral-200 dark:text-neutral-800">
                                  2
                                  <span className="sr-only">Notifications</span>
                                </span>
                              </span>
                            </button>
                            {/* <!-- End Favorites Button Icon --> */}
                
                            {/* <!-- Favorites Dropdown --> */}
                            <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full sm:w-96 hidden z-[10] bg-white border-y sm:border-x border-gray-200 sm:border-gray-100 sm:mt-2 sm:rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-dnnd">
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
                            <span className="flex absolute top-0 end-0 z-[10] -mt-1 -me-1">
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
                            <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full sm:w-72 hidden z-[10] bg-white border-y sm:border-x border-gray-200 sm:border-gray-100 sm:mt-2 sm:rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shadnli">
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
              ) }
              {/* <!-- End Widgets --> */}
            </div>
      
            <div className="md:hidden mt-2.5 md:mt-0 w-full">
              {/* <!-- Search Input --> */}
              <div className="relative w-full">
        <input
          type="text"
          className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border-gray-200 text-base sm:text-sm rounded-full focus:outline-hidden focus:border-[#E91E63] focus:ring-[#E91E63] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400"
          placeholder="Search venues, decorators, makeup artists..."
        ></input>
        <div className="absolute inset-y-0 end-0 z-[30] flex items-center pe-1 sm:pe-1.5">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-[#E91E63] text-white hover:bg-[#D81B60] focus:outline-hidden focus:bg-[#D81B60] dark:bg-[#E91E63] dark:hover:bg-[#D81B60] dark:focus:bg-[#D81B60]"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
        <div className="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-[10] pe-1">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-[#E91E63] focus:outline-hidden focus:text-[#E91E63] dark:text-neutral-500 dark:hover:text-[#E91E63] dark:focus:text-[#E91E63]"
            aria-label="Close"
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
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
         {/* Expanded Catalog Section - Now always rendered but hidden with CSS */}
      
            <div
      
              className={`w-full bg-white shadow-md z-[20] absolute top-full left-0 right-0 dark:bg-neutral-900 transition-all duration-30  transform ${
      
                isCatalogOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-2'
      
              }`}
      
              // You might want to adjust max-height or height for a smooth transition if content can vary greatly
      
              // For simple opacity/visibility, the above is fine.
      
            >
      
              <div className="max-w-[85rem] mx-auto py-4 px-4 sm:px-6 lg:px-8">
      
                {/* Desktop View */}
      
                <div className="hidden md:grid grid-cols-[22%_78%] gap-4 min-h-[300px]">
      
                  {/* Categories List (Left 22%) */}
      
                  <div>
                         {isLoading ? (
      
                      <div className="text-sm text-gray-500">Loading categories...</div>
      
                    ) : error ? (
      
                      <div className="text-sm text-red-500">{error}</div>
      
                    ) : categories.length > 0 ? (
      
                      <nav className="space-y-1">
      
                        {categories.map((category) => (
      
                          <button
      
                            key={category.id}
      
                            type="button"
      
                            className={`py-2.5 px-2 w-full flex items-center text-start font-medium text-sm rounded-lg focus:outline-hidden
      
                              ${clickedCategoryId === category.id ? 'bg-gray-200 text-gray-900' :
      
                                hoveredCategoryId === category.id ? 'bg-gray-100 text-gray-800' :
      
                                'bg-white text-gray-800 hover:bg-gray-100'}
      
                              dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800`}
      
                            onClick={() => {
      
                              setClickedCategoryId(category.id);
      
                              setHoveredCategoryId(category.id); // Keep hovered for consistent behavior
      
                            }}
      
                            onMouseEnter={() => setHoveredCategoryId(category.id)}
      
                            onMouseLeave={() => {
      
                              // Only remove hover if it's not the clicked category
      
                              if (clickedCategoryId !== category.id) {
      
                                setHoveredCategoryId(null);
      
                              }
      
                            }}
      
                          >
       {category.svg_icon_url && (
      <img
        src={category.svg_icon_url}
        alt={`${category.name} icon`}
        className="w-5 h-5"
      />
    )}
    <p className='ml-1'></p>
                            {category.name}
      
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button>
                        ))}
                      </nav>
                    ) : (
                      <div className="text-sm text-gray-500">No categories found.</div>
      
                    )}
      
                  </div>
      
                    {/* Subcategories List (Right 78%) */}
                    <div>
                      {isSubcategoriesLoading ? (
                        <div className="text-sm text-gray-500">Loading subcategories...</div>
                      ) : subcategoriesError ? (
                        <div className="text-sm text-red-500">{subcategoriesError}</div>
                      ) : currentSubcategories.length > 0 ? (
                        <>
                          {currentSubcategories.length <= 3 && (
                            <nav className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-x-4 gap-y-4`}>
                              {currentSubcategories.map((subcategory) => (
                                <SubcategoryItem
                                  key={subcategory.id}
                                  subcategory={subcategory}
                                  onClick={() => {
                                    setIsCatalogOpen(false);
                                    setHoveredCategoryId(null);
                                    setClickedCategoryId(null);
                                  }}
                                />
                              ))}
                            </nav>
                          )}
      
                           {currentSubcategories.length === 4 && (
      
                          <nav className={`grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-4`}>
      
                            {currentSubcategories.map((subcategory) => (
      
                              <SubcategoryItem
      
                                key={subcategory.id}
      
                                subcategory={subcategory}
      
                                onClick={() => {
      
                                  setIsCatalogOpen(false);
      
                                  setHoveredCategoryId(null);
      
                                  setClickedCategoryId(null);
      
                                }}
      
                              />
      
                            ))}
      
                          </nav>
      
                        )}
      
      
      
                        {currentSubcategories.length === 5 && (
      
                          <div className="flex flex-col gap-y-4">
      
                            <nav className={`grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 place-items-center`}>
      
                              {currentSubcategories.slice(0, 3).map((subcategory) => (
                                <SubcategoryItem
                                  key={subcategory.id}
                                  subcategory={subcategory}
                                  onClick={() => {
                                    setIsCatalogOpen(false);
                                    setHoveredCategoryId(null);
                                    setClickedCategoryId(null);
                                  }}
                                />
                              ))}
                            </nav>
                          <nav className={`grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-4 place-items-center`}>
      
                              {currentSubcategories.slice(3, 5).map((subcategory) => (
                                <SubcategoryItem
                                  key={subcategory.id}
                                  subcategory={subcategory}
                                  onClick={() => {
                                    setIsCatalogOpen(false);
                                    setHoveredCategoryId(null);
                                    setClickedCategoryId(null);
                                  }}
                                />
                              ))}
                            </nav>
                            </div>
                          )}
      
                          {currentSubcategories.length === 6 && (
      
                          <nav className={`grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4`}>
      
                            {currentSubcategories.map((subcategory) => (
      
                              <SubcategoryItem
      
                                key={subcategory.id}
      
                                subcategory={subcategory}
      
                                onClick={() => {
      
                                  setIsCatalogOpen(false);
      
                                  setHoveredCategoryId(null);
      
                                  setClickedCategoryId(null);
      
                                }}
      
                              />
      
                            ))}
      
                          </nav>
      
                        )}
      
                           {currentSubcategories.length === 7 && (
      
                          <div className="flex flex-col gap-y-4">
      
                            <nav className={`grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4 place-items-center`}>
      
                              {currentSubcategories.slice(0, 4).map((subcategory) => (
                                <SubcategoryItem
                                  key={subcategory.id}
                                  subcategory={subcategory}
                                  onClick={() => {
                                    setIsCatalogOpen(false);
                                    setHoveredCategoryId(null);
                                    setClickedCategoryId(null);
                                  }}
                                />
                              ))}
                            </nav>
                           <nav className={`grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 place-items-center`}>
      
                              {currentSubcategories.slice(4, 7).map((subcategory) => (
                                <SubcategoryItem
                                  key={subcategory.id}
                                  subcategory={subcategory}
                                  onClick={() => {
                                    setIsCatalogOpen(false);
                                    setHoveredCategoryId(null);
                                    setClickedCategoryId(null);
                                  }}
                                />
                              ))}
                            </nav>
                          
                    
                          </div>
                           )}
      
                         {currentSubcategories.length === 8 && (
      
                          <nav className={`grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4`}>
      
                            {currentSubcategories.map((subcategory) => (
      
                              <SubcategoryItem
      
                                key={subcategory.id}
      
                                subcategory={subcategory}
      
                                onClick={() => {
      
                                  setIsCatalogOpen(false);
      
                                  setHoveredCategoryId(null);
      
                                  setClickedCategoryId(null);
      
                                }}
      
                              />
      
                            ))}
      
                          </nav>
                        )}
                        {currentSubcategories.length > 8 && (
      
                          <nav className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-4`}>
                            {currentSubcategories.map((subcategory) => (
                              <SubcategoryItem
                                key={subcategory.id}
                                subcategory={subcategory}
                                onClick={() => {
                                  setIsCatalogOpen(false);
                                  setHoveredCategoryId(null);
      
                                  setClickedCategoryId(null);
                                }}
                              />
                            ))}
                          </nav>
                       
                        )}
                       </>
      
                    ) : (hoveredCategoryId !== null || clickedCategoryId !== null) ? (
      
                      <div className="text-sm text-gray-500">No subcategories found for this category.</div>
      
                    ) : (
      
                      <div className="text-sm text-gray-500"></div>
                    )}
                  </div>
                </div>
                 {/* Mobile View - Using Custom Dropdown */}
      
                <div className="md:hidden flex flex-col gap-4">
      
                  {isLoading ? (
      
                    <div className="text-sm text-gray-500">Loading categories...</div>
      
                  ) : error ? (
      
                    <div className="text-sm text-red-500">{error}</div>
      
                  ) : categories.length > 0 && (
      
                    <div className="relative w-full" ref={mobileDropdownRef}>
      
                      <button
      
                        type="button"
      
                        className="py-2 px-3 pe-9 block w-full border border-gray-200 rounded-lg text-sm text-left focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 relative"
      
                        onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
      
                        aria-expanded={isMobileDropdownOpen}
      
                      >
      
                        {mobileSelectedCategoryName}
      
                        <div className="absolute inset-y-0 right-0 flex items-center pe-3 pointer-events-none">
      
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      
                          </svg>
      
                        </div>
      
                      </button>
      
      
      
                      {isMobileDropdownOpen && (
      
                        <div className="absolute z-[10] w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto dark:bg-neutral-800 dark:border-neutral-700">
      
                          <ul className="py-1">
      
                            <li
      
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-neutral-300 dark:hover:bg-neutral-700"
      
                              onClick={() => handleMobileCategorySelect({ id: null, name: 'Select a category' })}
      
                            >
      
                              Select a category
      
                            </li>
      
                            {categories.map((category) => (
      
                              <li
      
                                key={category.id}
      
                                className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${mobileSelectedCategoryId === category.id ? 'bg-blue-50 dark:bg-blue-900' : ''} dark:text-neutral-300 dark:hover:bg-neutral-700`}
      
                                onClick={() => handleMobileCategorySelect(category)}
      
                              >
       <div className="flex items-center gap-2">
 {category.svg_icon_url && (
      <img
        src={category.svg_icon_url}
        alt={`${category.name} icon`}
        className="w-3 h-3"
      />
    )}
                          {category.name}
</div>
      
                              </li>
      
                            ))}
      
                          </ul>
      
                        </div>
      
                      )}
      
                    </div>
      
                  )}
      
                  {(mobileSelectedCategoryId || (!isLoading && !error && categories.length > 0 && mobileSelectedCategoryId === null && currentSubcategories.length === 0)) && (
                    <div className="w-full mt-4">
      
                      {isSubcategoriesLoading ? (
      
                        <div className="text-sm text-gray-500">Loading subcategories...</div>
      
                      ) : subcategoriesError ? (
      
                        <div className="text-sm text-red-500">{subcategoriesError}</div>
      
                      ) : currentSubcategories.length > 0 ? (
      
                        <nav className={`grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4`}>
      
                          {currentSubcategories.map((subcategory) => (
      
                            <SubcategoryItem
      
                              key={subcategory.id}
      
                              subcategory={subcategory}
      
                              onClick={() => {
      
                                setIsCatalogOpen(false);
      
                                setMobileSelectedCategoryId(null); // Reset mobile selection on link click
      
                                setMobileSelectedCategoryName('Select a category');
      
                              }}
      
                            />
                             ))}
      
                        </nav>
      
                      ) : (mobileSelectedCategoryId !== null) ? (
      
                        <div className="text-sm text-gray-500">No subcategories found for this category.</div>
      
                      ) : (
      
                        <div className="text-sm text-gray-500"></div>
      
                      )}
      
                    </div>
      
                  )}
      
                </div>
              </div>
            </div>
          
      </div> 
        </header>
        {/* ========== END HEADER ========== */}

        {/* ========== MAIN CONTENT ========== */}
        <main id="content">
          {/* Header */}
          <div className="pt-4 lg:pt-10 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-3">
              <div className="lg:w-72 shrink-0">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  {/* Heading */}
                  <div>
  <h1 className="font-semibold text-xl text-gray-800 dark:text-neutral-200">
    {selectedCategoryId
      ? categories.find(category => category.id === selectedCategoryId)?.name || 'Venues'
      : 'Venues'}
  </h1>
</div>
                  {/* End Heading */}
                  {/* Filter Sidebar Toggle Button */}
                  {isMobileSidebarOpen && (
  <div
    className="fixed inset-0 z-[70] bg-black"
    onClick={() => setIsMobileSidebarOpen(false)}
  />
)}
            

                  <div className="lg:hidden">
                    <button
  type="button"
  className="lg:hidden py-1.5 px-2.5 ... dark:text-neutral-200"
  onClick={() => setIsMobileSidebarOpen(true)}
>
  <div className=' py-3 px-5 flex justify-center items-center'>
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
                        <line x1="21" x2="14" y1="4" y2="4" />
                        <line x1="10" x2="3" y1="4" y2="4" />
                        <line x1="21" x2="12" y1="12" y2="12" />
                        <line x1="8" x2="3" y1="12" y2="12" />
                        <line x1="21" x2="16" y1="20" y2="20" />
                        <line x1="12" x2="3" y1="20" y2="20" />
                        <line x1="14" x2="14" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="10" y2="14" />
                        <line x1="16" x2="16" y1="18" y2="22" />
                      </svg>
                     <div className='ml-1'> Filter</div>
                      </div>
                    </button>
                  </div>
                  {/* End Filter Sidebar Toggle Button */}
                </div>
              </div>

              <div className="grow overflow-hidden lg:ps-4 xl:ps-8">
  {/* List */}
   <div className="mb-3">
      {/* List */}
      <div className="relative flex flex-1 items-center overflow-hidden">
        <div className="flex flex-row items-center gap-2 py-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 after:h-px after:min-w-10">
          {categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full 
                  ${selectedCategoryId === category.id 
                    ? 'bg-[#E91E63] text-white' 
                    : 'bg-white text-gray-800 dark:bg-neutral-900 dark:text-neutral-200'} 
                  border border-gray-200 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 
                  dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600`}
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  setCategoryName(category.name);
                  setIsShowItems(false);
                }}
              >
                {category.name}
              </button>
            ))
          ) : (
            <div className="text-sm text-gray-500">No categories found.</div>
          )}
        </div>
      </div>
      {/* End List */}
    </div>
</div>
            </div>
          </div>
          {/* End Header */}

          <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            {/* Listing */}
            <div className="lg:flex">
              <div className="pt-6 lg:pt-0">
  {/* Sidebar */}
    <div
     ref={mobileSidebarRef}
     className={`fixed inset-y-0 start-0 z-[80] w-80 bg-white transform transition-transform duration-300 dark:bg-neutral-900
       ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
       lg:static lg:block lg:translate-x-0 ${isMobileSidebarOpen ? '' : 'hidden lg:block'}
     `}
  role="dialog"
  tabIndex={-1}
  aria-label="Sidebar"
>
    <div className="h-full flex-1 flex flex-col lg:h-auto">
      {/* Header */}
      <div className="lg:hidden py-3 px-5 flex justify-between items-center border-b">
  <span className="text-gray-800 dark:text-neutral-200 font-medium">Filter</span>
  <button onClick={() => setIsMobileSidebarOpen(false)} className="text-gray-500 hover:text-red-600">
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  </button>
</div>

      {/* End Header */}

      {/* Body */}
      <div className="h-full overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <div className="p-5 lg:pt-10 lg:ps-0">
          {/* Subcategories Card */}
          <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
  <div className="mb-3">
    <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">
      Category
    </span>
  </div>

  {/* Subcategories List */}
 <ul className="space-y-2">
  {subcategories.map((sub) => (
    <li key={sub.id} className="flex items-center">
      <input
        type="checkbox"
        id={`sub-${sub.id}`}
        className="shrink-0 mt-0.5 border-gray-200 rounded text-[#E91E63] focus:ring-[#E91E63] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-[#E91E63] dark:checked:border-[#E91E63] dark:focus:ring-offset-gray-800"
        checked={checkedItems[sub.id] || false}
        onChange={() => handleCheckboxChange(sub.id)}
      />
      <label
        htmlFor={`sub-${sub.id}`}
        className="text-sm text-gray-500 ms-3 dark:text-neutral-500"
      >
        {sub.name}
      </label>
    </li>
  ))}
</ul>
  {/* End Subcategories List */}
</div>

          {/* End Subcategories Card */}

          {/* Deal Toggle Card */}
          <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <label
                htmlFor="hs-pro-sale"
                className="flex-1 cursor-pointer font-medium text-sm text-gray-800 dark:text-neutral-200"
              >
                Deal
              </label>
              <label htmlFor="hs-pro-sale" className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  id="hs-pro-sale"
                  className="peer sr-only"
                  checked={isOn} // Controlled component: state determines checked status
                  onChange={handleToggle} // Update state on change
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-[#E91E63] dark:bg-neutral-700 dark:peer-checked:bg-[#E91E63] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
              </label>
            </div>
          </div>
          {/* End Deal Toggle Card */}

          {/* Customer Reviews Card */}
          <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
            <div className="mb-3">
              <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">Customer reviews</span>
            </div>

            {/* Customer Reviews List */}
            <div className="space-y-0.5">
              {/* Checkbox: 4 Stars & Up */}
              <div className="flex items-center">
                <label htmlFor="hs-pro-shmfloc-4-and-up" className="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                  <input type="checkbox" className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-4-and-up"/>
                  <span className="ms-2 flex items-center gap-x-0.5">
                    {/* Star Icons for 4 stars */}
                    {[...Array(4)].map((_, i) => (
                      <svg key={`star-4-${i}`} className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    ))}
                    {/* Half Star Icon for 4.x */}
                    <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                  </span>
                  <span className="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                </label>
              </div>
              {/* End Checkbox */}

              {/* Checkbox: 3 Stars & Up */}
              <div className="flex items-center">
                <label htmlFor="hs-pro-shmfloc-3-and-up" className="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                  <input type="checkbox" className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-3-and-up" />
                  <span className="ms-2 flex items-center gap-x-0.5">
                    {/* Star Icons for 3 stars */}
                    {[...Array(3)].map((_, i) => (
                      <svg key={`star-3-${i}`} className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    ))}
                    {/* Half Star Icons for 3.x */}
                    {[...Array(2)].map((_, i) => (
                      <svg key={`half-star-3-${i}`} className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    ))}
                  </span>
                  <span className="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                </label>
              </div>
              {/* End Checkbox */}

              {/* Checkbox: 1 Star & Up */}
              <div className="flex items-center">
                <label htmlFor="hs-pro-shmfloc-1-and-up" className="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                  <input type="checkbox" className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-1-and-up" />
                  <span className="ms-2 flex items-center gap-x-0.5">
                    {/* Star Icon for 1 star */}
                    <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    {/* Half Star Icons for 1.x */}
                    {[...Array(4)].map((_, i) => (
                      <svg key={`half-star-1-${i}`} className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    ))}
                  </span>
                  <span className="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                </label>
              </div>
              {/* End Checkbox */}
            </div>
            {/* End Customer Reviews List */}
          </div>
          {/* End Customer Reviews Card */}

          {/* Price Card */}
          <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
            <div className="mb-3">
              <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">Price</span>
            </div>

            {/* Price List */}
            <ul className="space-y-2">
                    {prices.map((price) => (
                      <li key={price.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`price-${price.id}`}
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-[#E91E63] focus:ring-[#E91E63] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-[#E91E63] dark:checked:border-[#E91E63] dark:focus:ring-offset-gray-800"
                          checked={selectedPriceRange && selectedPriceRange.id === price.id}
                          onChange={() => setSelectedPriceRange(selectedPriceRange && selectedPriceRange.id === price.id ? null : price)}
                        />
                        <label
                          htmlFor={`price-${price.id}`}
                          className="text-sm text-gray-500 ms-3 dark:text-neutral-500"
                        >
                          {price.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
            <Slider
                range
                min={0}
                max={10000} // Set max price to 10000
                defaultValue={[0, 10000]}
                value={priceSliderValue}
                onChange={value => setPriceSliderValue(value)}
                onAfterChange={value => setSelectedPriceRange({ min: value[0], max: value[1] })}
                trackStyle={[{ backgroundColor: '#E91E63' }]}
                handleStyle={[{ borderColor: '#E91E63' }, { borderColor: '#E91E63' }]}
                railStyle={{ backgroundColor: '#e0e0e0' }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-neutral-400">
                <span>₹{priceSliderValue[0]}</span>
                <span>₹{priceSliderValue[1] === 10000 ? '10000+' : priceSliderValue[1]}</span>
            </div>
          </div>
            {/* End Price List */}
          </div>
          {/* End Price Card */}

          {/* Capacity Card (only for selected category ID 1) */}
         {selectedCategoryId === 1 && (
        <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
          <div className="mb-3">
            <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">Capacity</span>
          </div>
          <div className="space-y-2">
            {capacities.map((capacity) => (
                      <li key={capacity.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`capacity-${capacity.id}`}
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-[#E91E63] focus:ring-[#E91E63] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-[#E91E63] dark:checked:border-[#E91E63] dark:focus:ring-offset-gray-800"
                          checked={selectedCapacity && selectedCapacity.id === capacity.id}
                          onChange={() => setSelectedCapacity(selectedCapacity && selectedCapacity.id === capacity.id ? null : capacity)}
                        />
                        <label
                          htmlFor={`capacity-${capacity.id}`}
                          className="text-sm text-gray-500 ms-3 dark:text-neutral-500"
                        >
                          {capacity.label}
                        </label>
                      </li>
                    ))}
          </div>
          <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
            <Slider
                range
                min={0}
                max={1000} // Set max capacity to 1000
                defaultValue={[0, 1000]}
                value={capacitySliderValue}
                onChange={value => setCapacitySliderValue(value)}
                onAfterChange={value => setSelectedCapacity({ min: value[0], max: value[1] })}
                trackStyle={[{ backgroundColor: '#E91E63' }]}
                handleStyle={[{ borderColor: '#E91E63' }, { borderColor: '#E91E63' }]}
                railStyle={{ backgroundColor: '#e0e0e0' }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-neutral-400">
                <span>{capacitySliderValue[0]}</span>
                <span>{capacitySliderValue[1] === 1000 ? '1000+' : capacitySliderValue[1]}</span>
            </div>
          </div>
        </div>
      )}
          {/* End Capacity Card */}
          {/* Clear Filters Button */}
          <div className="flex items-center gap-x-3">
            <button
    type="button"
    onClick={() => {
  setIsInfiniteScrollActive(false);
  setNextPageUrl(null);
  setHasMore(true);
  setSelectedPriceRange(null);
  setSelectedCapacity(null);          // ✅ clear capacity filter
  setPriceSliderValue([0, 10000]); // Reset slider visual to full price range
    setCapacitySliderValue([0, 1000]);
  setCheckedItems({});                // ✅ clear subcategory filters

  const name = categoryName.toLowerCase().replace(/\s+/g, '_');

  api.get(`/categories/${name}/`)
    .then(response => {
      setCategoryItems(response.data.results);
      setNextPageUrl(response.data.next);
    })
    .catch(err => {
      console.error('Error resetting category items:', err);
      setCategoryItems([]);
    });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}}

    className="py-2 px-3 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
  >
    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
    Clear Filters
  </button>
          

          {/* Show Items Button */}
            {/* <button
              type="button"
             onClick={() => {
  const filters = [];

  if (isOn) filters.push({ type: "Deal", label: "Deal" });

  Object.entries(checkedItems).forEach(([id, isChecked]) => {
    if (isChecked) {
      const sub = subcategories.find((s) => s.id.toString() === id);
      if (sub) {
        filters.push({ type: "Subcategory", label: sub.name });
      }
    }
  });

  const ratings = ["4", "3", "1"];
  ratings.forEach((r) => {
    const el = document.getElementById(`hs-pro-shmfloc-${r}-and-up`);
    if (el?.checked) {
      filters.push({ type: "Rating", label: `${r}★ & up` });
    }
  });

  const prices = [
    { id: "under-150", label: "Under ₹500" },
    { id: "150-300", label: "₹500-₹1000" },
    { id: "300-500", label: "Above ₹1000" },
  ];
  prices.forEach(({ id, label }) => {
    const el = document.getElementById(`hs-pro-shmfloc-${id}`);
    if (el?.checked) {
      filters.push({ type: "Price", label });
    }
  });
if (selectedCategoryId === 1) {
  const capacities = [
    { id: "0-100", label: "0-100" },
    { id: "100-300", label: "100-300" },
    { id: "500-1000", label: "500-1000" },
    { id: "above-1000", label: "Above 1000" },
  ];
  
  capacities.forEach(({ id, label }) => {
    const el = document.getElementById(`capacity-${id}`); 
    if (el?.checked) {
      filters.push({ type: "Capacity", label });
    }
  });
}


  setSelectedFilters(filters);
  console.log("Filters applied:", filters);
  setCheckedItems({}); 
      setIsOn(false); 
      setSelectedCategoryId(1); 
      document.querySelectorAll('input[type="checkbox"][id^="hs-pro-shmfloc"]').forEach((checkbox) => {
        checkbox.checked = false; 
      });
      document.querySelectorAll('input[type="checkbox"][id^="hs-pro-shmfloc-"]').forEach((checkbox) => {
        checkbox.checked = false; 
      });
if (selectedCategoryId === 1) {
  document.querySelectorAll('input[type="radio"][name="capacity-range"]').forEach((radio) => {
    radio.checked = false; 
  });
}

      setIsMobileSidebarOpen(false);
      setIsShowItems(true);
}}

              className="py-2 px-3 w-full inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-transparent bg-[#E91E63] text-white hover:bg-[#d81b60] focus:outline-hidden focus:bg-[#E91E63]"
            >
              Show Items
            </button> */}
         </div>
        </div>
      </div>

      {/* End Body */}
    </div>
  </div>
  {/* End Sidebar */}
  
</div>
              <div className="grow overflow-hidden pb-10 lg:pt-10 lg:ps-4 xl:ps-8">
                {/* Filter Group */}
                <div className="pb-3 mb-3 space-y-3 border-b border-gray-200 dark:border-neutral-700">
                  <div className="flex flex-wrap gap-1.5 mt-4">
  {selectedFilters.map((filter, idx) => (
  <button
    key={`${filter.type}-${filter.label}-${idx}`}
    type="button"
    className="py-1 ps-2.5 pe-1.5 flex items-center bg-[#E91E63] text-white text-start text-sm rounded-full hover:bg-[#d81b60] focus:outline-hidden focus:bg-[#d81b60]"
  >
    {filter.label}
    <span
      onClick={() => {
        // Remove specific filter
        const newFilters = selectedFilters.filter((_, i) => i !== idx);
        setSelectedFilters(newFilters);
        // TODO: Also update the related state like isOn, checkboxes, etc.
      }}
      className="ms-1.5 flex flex-col justify-center items-center size-4 bg-white text-[#E91E63] rounded-full hover:bg-white/90 focus:bg-white/90"
    >
      <svg
        className="shrink-0 size-2.5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </span>
  </button>
))}
<div className="relative min-h-7.5 inline-flex items-center justify-end w-full">
  <span className="me-1 text-xs sm:text-sm text-gray-500 dark:text-neutral-500">
    Sort By:
  </span>
  <select
    className="appearance-none py-1 ps-1.5 pr-6 inline-flex shrink-0 justify-center items-center gap-x-1.5 border border-transparent font-medium text-sm text-gray-800 rounded-lg dark:text-neutral-200 focus:outline-none focus:ring-0 focus:border-transparent"
    value={sortBy}
    onChange={handleSortChange}
    style={{ width: sortBy === "" ? "60px" : "auto" }}
  >
    <option value="">Sort</option>
    <option value="priceLowToHigh">Price low to high</option>
    <option value="priceHighToLow">Price high to low</option>
  </select>

  {/* SVG Arrow */}
  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
    <svg
      className="w-3 h-3 text-gray-600 dark:text-neutral-300"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.943l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0l-4.24-4.25a.75.75 0 01.02-1.06z" />
    </svg>
  </div>
</div>



</div>

                </div>
                {/* End Filter Group */}
<div className="flex flex-wrap gap-2">
                  {selectedFilters.map((filter, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                    >
                      {filter.label}
                      <span
                        className="ms-1.5 flex flex-col justify-center items-center size-4 bg-white text-[#E91E63] rounded-full hover:bg-white/90 focus:bg-white/90"
                        onClick={() => {
                          const newFilters = selectedFilters.filter((_, i) => i !== idx);
                          setSelectedFilters(newFilters);
                        }}
                      >
                        <svg
                          className="shrink-0 size-2.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
                {/* Grid */}
              
                {isInfiniteScrollActive ? (
  <InfiniteScroll
    dataLength={categoryItems.length}
    next={fetchMoreData}
    hasMore={hasMore}
    loader={<p className="text-center my-4 text-gray-500">Loading more items...</p>}
    endMessage={<p className="text-center my-4 text-gray-500">No more items to show.</p>}
  >
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4">
      {categoryItems.map(item => (
  <CategoryItemCard key={item.id} item={item} />
))}
    </div>
  </InfiniteScroll>
) : (
  <>
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4">
     {categoryItems.map(item => (
  <CategoryItemCard key={item.id} item={item} />
))}
    </div>

    {nextPageUrl && (
      <div className="text-center mt-6">
        <button
          className="bg-[#E91E63] hover:bg-[#d81b60] text-white font-medium py-2 px-4 rounded-full"
          onClick={() => setIsInfiniteScrollActive(true)}
        >
          See More
        </button>
      </div>
    )}
  </>
)}

{isInfiniteScrollActive && (
  <div className="text-center mt-6">
    <button
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-full"
      onClick={() => {
        setIsInfiniteScrollActive(false);
        setNextPageUrl(null);
        setHasMore(true);
        const name = categoryName.toLowerCase().replace(/\s+/g, '_');

        api.get(`/categories/${name}/`)
          .then(response => {
            setCategoryItems(response.data.results);
            setNextPageUrl(response.data.next);
          })
          .catch(err => {
            console.error('Error resetting category items:', err);
            setCategoryItems([]);
          });

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      See Less
    </button>
  </div>
)}

                {/* End Grid */}
              </div>
            </div>
          </div>
          {/* End Listing */}
        </main>
      </div>
    </>
  );
}

