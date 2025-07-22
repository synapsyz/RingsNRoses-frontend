import Header from "@/components/customer/Header";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LocationSelector from "@/components/LocationSelector";
import axios from "axios";
import CategoryDisplay from "@/components/customer/Listing/CategoryDisplay";
import FilterSidebar from "@/components/customer/Listing/FilterSidebar";
import FilterGroup from "@/components/customer/Listing/FilterGroup";
import ItemCardDisplay from "@/components/customer/Listing/ItemCardDisplay";
import Head from "next/head";

const isNgrok =
  process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
const api_url = getApiUrl();
const api = axios.create({
  baseURL: api_url + "/api/v1",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default function Listing() {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [categoryName, setCategoryName] = useState("Venues");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isShowItems, setIsShowItems] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [clickedCategoryId, setClickedCategoryId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const mobileSidebarRef = useRef(null);
  const [isInfiniteScrollActive, setIsInfiniteScrollActive] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [categoryItems, setCategoryItems] = useState([]);
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const subcategoryItemsCache = useRef({});
  const [subcategoriesMap, setSubcategoriesMap] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [priceSliderValue, setPriceSliderValue] = useState([0, 10000]);
  const [capacitySliderValue, setCapacitySliderValue] = useState([0, 1000]);
  const categoryItemsCache = useRef({});
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let token = null;

    if (session?.accessToken) {
      token = session.accessToken;
      setAccessToken(token);
    } else {
      const storedDataString = sessionStorage.getItem("session");
      if (storedDataString) {
        try {
          const storedData = JSON.parse(storedDataString);
          if (storedData?.tokens?.access) {
            token = storedData.tokens.access;
            setAccessToken(token);
          }
        } catch (error) {
          console.error("Failed to parse session data from sessionStorage:", error);
        }
      }
    }

    if (!token) {
      console.log("Authentication error. Your session may have expired. Please log in again.");
    }
  }, [session]);

  const prices = [
    { id: "0-1000", label: "₹0-₹1,000", min: 0, max: 1000 },
    { id: "1000-5000", label: "₹1,000-₹5,000", min: 1000, max: 5000 },
    { id: "5000-10000", label: "₹5,000-₹10,000", min: 5000, max: 10000 },
    { id: "above-10000", label: "Above ₹10,000", min: 10000, max: 999999 },
  ];
  const capacities = [
    { id: "0-100", label: "0-100", min: 0, max: 100 },
    { id: "100-300", label: "100-300", min: 100, max: 300 },
    { id: "500-1000", label: "500-1000", min: 500, max: 1000 },
    { id: "above-1000", label: "Above 1000", min: 1000, max: 99999 },
  ];

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const buildParamKey = useCallback(() => {
    return JSON.stringify({
      categoryName,
      selectedCapacity,
      selectedPriceRange,
      isOn,
      sortBy,
      checkedItems,
    });
  }, [categoryName, selectedCapacity, selectedPriceRange, isOn, sortBy, checkedItems]);

  const buildParams = useCallback(() => {
    const params = {};
    if (selectedCapacity) {
      params.min_capacity = selectedCapacity.min;
      params.max_capacity = selectedCapacity.max;
    }
    if (selectedPriceRange) {
      params.min_price = selectedPriceRange.min;
      params.max_price = selectedPriceRange.max;
    }
    if (isOn) params.deals = true;
    if (sortBy === "priceLowToHigh") params.ordering = "price";
    if (sortBy === "priceHighToLow") params.ordering = "-price";
    return params;
  }, [selectedCapacity, selectedPriceRange, isOn, sortBy]);

  const fetchItems = useCallback(async () => {
    if (status === "authenticated") {
      const currentAccessToken = session.accessToken;
      const currentConfig = {
        headers: { Authorization: `Bearer ${currentAccessToken}` },
      };

      const currentCategoryName = categoryName.toLowerCase().replace(/\s+/g, "_");
      const selectedSubIds = Object.entries(checkedItems)
        .filter(([, isChecked]) => isChecked)
        .map(([id]) => id);

      const paramKey = buildParamKey();

      if (categoryItemsCache.current[paramKey]) {
        setCategoryItems(categoryItemsCache.current[paramKey]);
        setHasMore(false);
        return;
      }

      const params = buildParams();
      let allItems = [];
      let overallNextUrl = null;

      if (selectedSubIds.length > 0) {
        for (const subId of selectedSubIds) {
          const cacheKey = `${currentCategoryName}/subcategories/${subId}-${JSON.stringify(params)}`;
          if (subcategoryItemsCache.current[cacheKey]) {
            allItems = allItems.concat(subcategoryItemsCache.current[cacheKey]);
            continue;
          }
          try {
            const res = await api.get(
              `/categories/${currentCategoryName}/subcategories/${subId}/`,
              { ...currentConfig, params }
            );
            subcategoryItemsCache.current[cacheKey] = res.data.results;
            allItems = allItems.concat(res.data.results);
          } catch (err) {
            console.error(`Failed to fetch subcategory ${subId} with filters`, err);
          }
        }
        setCategoryItems(allItems);
        setHasMore(false);
      } else {
        try {
          const res = await api.get(`/categories/${currentCategoryName}/`, {
            ...currentConfig,
            params,
          });
          allItems = res.data.results;
          overallNextUrl = res.data.next;
          setHasMore(!!overallNextUrl);
          setNextPageUrl(overallNextUrl);
        } catch (err) {
          console.error(`Failed to fetch category ${currentCategoryName}`, err);
        }
        setCategoryItems(allItems);
      }

      categoryItemsCache.current[paramKey] = allItems;
    }
  }, [status, session, categoryName, checkedItems, buildParamKey, buildParams]);

  const fetchTimeout = useRef(null);

  useEffect(() => {
    if (!selectedCategoryId) return;
    setIsLoading(true);
    setError(null);
    if (fetchTimeout.current) clearTimeout(fetchTimeout.current);
    fetchTimeout.current = setTimeout(() => {
      fetchItems().finally(() => setIsLoading(false));
    }, 500);
    return () => clearTimeout(fetchTimeout.current);
  }, [
    selectedCategoryId,
    selectedPriceRange,
    selectedCapacity,
    isOn,
    sortBy,
    checkedItems,
    categoryName,
    fetchItems,
  ]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (subcategoriesMap[selectedCategoryId]) return;
      try {
        const res = await api.get(`/categories/${selectedCategoryId}/subcategories/`);
        setSubcategoriesMap((prev) => ({
          ...prev,
          [selectedCategoryId]: res.data.results,
        }));
        setCheckedItems({});
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };
    fetchSubcategories();
  }, [selectedCategoryId, subcategoriesMap]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOpenLocationSelector = () => setIsLocationSelectorOpen(true);
  const handleCloseLocationSelector = () => setIsLocationSelectorOpen(false);

  const handleLocationSave = (selectedLocationData) => {
    setSelectedLocationName(selectedLocationData.location || "Chennai");
    setSelectedLocationId(selectedLocationData.locationId);
    setIsLocationSelectorOpen(false);
  };

  useEffect(() => {
    if (categories.length === 0 && !isLoading) {
      setIsLoading(true);
      api
        .get("/categories")
        .then((res) => {
          setCategories(res.data.results);
          if (res.data.results.length > 0 && !isMobile) {
            setHoveredCategoryId(res.data.results[0].id);
            setClickedCategoryId(res.data.results[0].id);
          }
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [categories.length, isLoading, isMobile]);

  useEffect(() => {
    if (router.isReady && router.query.category && categories.length > 0) {
      const urlCategoryName = router.query.category;
      const normalizedUrlCategoryName = urlCategoryName.toLowerCase().replace(/\s+/g, "_");
      const match = categories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "_") === normalizedUrlCategoryName
      );
      if (match) {
        setSelectedCategoryId(match.id);
        setCategoryName(match.name);
        setIsShowItems(false);
      }
    }
  }, [router.isReady, router.query.category, categories]);

  useEffect(() => {
    if (router.isReady && router.query.subcategory) {
      setSubcategoryName(router.query.subcategory);
    }
  }, [router.isReady, router.query.subcategory]);

  useEffect(() => {
    if (router.isReady && subcategoryName && subcategoriesMap[selectedCategoryId]?.length > 0) {
      const normalizedSub = subcategoryName.toLowerCase().replace(/[\s-/]+/g, "_");
      const match = subcategoriesMap[selectedCategoryId].find(
        (sub) => sub.name.toLowerCase().replace(/[\s-/]+/g, "_") === normalizedSub
      );
      if (match && !checkedItems[match.id]) {
        setCheckedItems((prev) => ({ ...prev, [match.id]: true }));
      }
    }
  }, [router.isReady, subcategoryName, subcategoriesMap, selectedCategoryId, checkedItems]);

  const subcategories = subcategoriesMap[selectedCategoryId] || [];

  const pageTitle = `${categoryName || "Category"}${
    subcategoryName ? ` | ${subcategoryName}` : ""
  }`;

  const fetchMoreData = () => {
    if (!nextPageUrl) return setHasMore(false);
    const params = buildParams();
    api
      .get(nextPageUrl, { params })
      .then((res) => {
        setCategoryItems((prev) => [...prev, ...res.data.results]);
        setNextPageUrl(res.data.next);
        if (!res.data.next) setHasMore(false);
      })
      .catch((err) => {
        console.error("Error fetching more items:", err);
        setHasMore(false);
      });
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {!accessToken ? (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
          <p className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
            Authentication expired, Please Login again
          </p>
          <a
            href="/login"
            className="inline-block bg-[#E91E63] hover:bg-[#d81b60] text-white font-medium py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg"
          >
            Login
          </a>
        </div>
      ) : (
        <main>
          <Header
            onOpenLocationSelector={handleOpenLocationSelector}
            selectedLocationName={selectedLocationName}
          />
          <LocationSelector
            isOpen={isLocationSelectorOpen}
            onClose={handleCloseLocationSelector}
            onSave={handleLocationSave}
          />
          <div id="content">
            <CategoryDisplay
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
              setIsShowItems={setIsShowItems}
              isMobileSidebarOpen={isMobileSidebarOpen}
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="lg:flex">
                <div className="pt-6 lg:pt-0">
                  <FilterSidebar
                    selectedCategoryId={selectedCategoryId}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                    mobileSidebarRef={mobileSidebarRef}
                    setIsInfiniteScrollActive={setIsInfiniteScrollActive}
                    setNextPageUrl={setNextPageUrl}
                    setHasMore={setHasMore}
                    categoryName={categoryName}
                    setCategoryItems={setCategoryItems}
                    subcategoriesMap={subcategoriesMap}
                    setSubcategoriesMap={setSubcategoriesMap}
                    checkedItems={checkedItems}
                    setCheckedItems={setCheckedItems}
                    isOn={isOn}
                    setIsOn={setIsOn}
                    priceSliderValue={priceSliderValue}
                    setPriceSliderValue={setPriceSliderValue}
                    selectedPriceRange={selectedPriceRange}
                    setSelectedPriceRange={setSelectedPriceRange}
                    prices={prices}
                    selectedCapacity={selectedCapacity}
                    setSelectedCapacity={setSelectedCapacity}
                    capacitySliderValue={capacitySliderValue}
                    setCapacitySliderValue={setCapacitySliderValue}
                    capacities={capacities}
                    handleCheckboxChange={handleCheckboxChange}
                    handleToggle={handleToggle}
                    subcategories={subcategories}
                  />
                </div>
                <div className="grow overflow-hidden pb-10 lg:pt-10 lg:ps-4 xl:ps-8">
                  <FilterGroup
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    sortBy={sortBy}
                    handleSortChange={handleSortChange}
                  />
                  <ItemCardDisplay
                    categoryItems={categoryItems}
                    fetchMoreData={fetchMoreData}
                    hasMore={hasMore}
                    nextPageUrl={nextPageUrl}
                    isInfiniteScrollActive={isInfiniteScrollActive}
                    setIsInfiniteScrollActive={setIsInfiniteScrollActive}
                    setNextPageUrl={setNextPageUrl}
                    setHasMore={setHasMore}
                    categoryName={categoryName}
                    setCategoryItems={setCategoryItems}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
