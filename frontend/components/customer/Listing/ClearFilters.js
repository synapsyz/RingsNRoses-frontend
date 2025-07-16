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
const ClearFilters = ({setIsInfiniteScrollActive, setNextPageUrl,setHasMore, setSelectedPriceRange, setSelectedCapacity, setPriceSliderValue, setCapacitySliderValue,setCheckedItems,categoryName,setCategoryItems }) => {
  return (
    <>
      <div className="flex items-center gap-x-3">
        <button
          type="button"
          onClick={() => {
            setIsInfiniteScrollActive(false);
            setNextPageUrl(null);
            setHasMore(true);
            setSelectedPriceRange(null);
            setSelectedCapacity(null); // ✅ clear capacity filter
            setPriceSliderValue([0, 10000]); // Reset slider visual to full price range
            setCapacitySliderValue([0, 1000]);
            setCheckedItems({}); // ✅ clear subcategory filters

            const name = categoryName.toLowerCase().replace(/\s+/g, "_");

            api
              .get(`/categories/${name}/`)
              .then((response) => {
                setCategoryItems(response.data.results);
                setNextPageUrl(response.data.next);
              })
              .catch((err) => {
                console.error("Error resetting category items:", err);
                setCategoryItems([]);
              });

            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="py-2 px-3 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          Clear Filters
        </button>
      </div>
    </>
  );
};
export default ClearFilters;
