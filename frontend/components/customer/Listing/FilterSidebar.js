import SubcategoriesDisplay from "./SubcategoriesDisplay";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import axios from "axios";
import DealToggle from "./DealToggle";
import CustomerReviews from "./CustomerReviews";
import PriceCard from "./PriceCard";
import CapacityCard from "./CapacityCard";
import ClearFilters from "./ClearFilters";


const FilterSidebar = ({
  selectedCategoryId,
  setSelectedCategoryId,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  mobileSidebarRef,
  setIsInfiniteScrollActive,
  setNextPageUrl,
  setHasMore,
  categoryName,
  setCategoryItems,
  subcategoriesMap,
  setSubcategoriesMap,
  checkedItems,
  setCheckedItems,
  isOn,
  setIsOn,
  priceSliderValue,
  setPriceSliderValue,
  selectedPriceRange,
  setSelectedPriceRange,
  prices,
  selectedCapacity,
  setSelectedCapacity,
  capacitySliderValue,
  setCapacitySliderValue,
  capacities,
  handleCheckboxChange,
  handleToggle,
  subcategories, // Received as a prop now
}) => {

  return (
    <>
      <div
        ref={mobileSidebarRef}
        className={`fixed inset-y-0 start-0 z-[80] w-80 bg-white transform transition-transform duration-300 dark:bg-neutral-900
       ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
       lg:static lg:block lg:translate-x-0 ${
         isMobileSidebarOpen ? "" : "hidden lg:block"
       }
     `}
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="h-full flex-1 flex flex-col lg:h-auto">
          {/* Header */}
          <div className="lg:hidden py-3 px-5 flex justify-between items-center border-b">
            <span className="text-gray-800 dark:text-neutral-200 font-medium">
              Filter
            </span>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-gray-500 hover:text-red-600"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-full overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="p-5 lg:pt-10 lg:ps-0">
              <SubcategoriesDisplay
                subcategories={subcategories}
                handleCheckboxChange={handleCheckboxChange}
                checkedItems={checkedItems}
              />
              <DealToggle isOn={isOn} handleToggle={handleToggle}/>
              <CustomerReviews />
              <PriceCard
                prices={prices}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                priceSliderValue={priceSliderValue}
                setPriceSliderValue={setPriceSliderValue}
              />
              <CapacityCard
                selectedCategoryId={selectedCategoryId}
                capacities={capacities}
                selectedCapacity={selectedCapacity}
                setSelectedCapacity={setSelectedCapacity}
                capacitySliderValue={capacitySliderValue}
                setCapacitySliderValue={setCapacitySliderValue}
              />
              <ClearFilters
                setIsInfiniteScrollActive={setIsInfiniteScrollActive}
                setNextPageUrl={setNextPageUrl}
                setHasMore={setHasMore}
                setSelectedPriceRange={setSelectedPriceRange}
                setSelectedCapacity={setSelectedCapacity}
                setPriceSliderValue={setPriceSliderValue}
                setCapacitySliderValue={setCapacitySliderValue}
                setCheckedItems={setCheckedItems}
                categoryName={categoryName}
                setCategoryItems={setCategoryItems}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;