const FilterGroup = ({selectedFilters,setSelectedFilters, sortBy,handleSortChange}) => {
  return (
    <>
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
                  const newFilters = selectedFilters.filter(
                    (_, i) => i !== idx
                  );
                  setSelectedFilters(newFilters);
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
          </div>
        </div>
      </div>
    </>
  );
};
export default FilterGroup;