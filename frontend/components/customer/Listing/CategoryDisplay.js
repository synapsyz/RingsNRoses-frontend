import React, { useState, useEffect, useRef, useCallback } from 'react'; 
const CategoryDisplay = ({categories,selectedCategoryId, setSelectedCategoryId,categoryName, setCategoryName, setIsShowItems,isMobileSidebarOpen, setIsMobileSidebarOpen}) => {
    
  return (
    <>
      <div className="pt-4 lg:pt-10 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-3">
          <div className="lg:w-72 shrink-0">
            <div className="flex flex-wrap justify-between items-center gap-3">
              {/* Heading */}
              <div>
                <h1 className="font-semibold text-xl text-gray-800 dark:text-neutral-200">
                  {selectedCategoryId
                    ? categories.find(
                        (category) => category.id === selectedCategoryId
                      )?.name || "Venues"
                    : "Venues"}
                </h1>
              </div>
              {/* End Heading */}
              {/* Filter Sidebar Toggle Button */}
              {isMobileSidebarOpen && (
                <div
                  className="fixed inset-0 z-[70] bg-white/10 backdrop-blur-sm transition-opacity duration-300"
                  onClick={() => setIsMobileSidebarOpen(false)}
                />
              )}

              <div className="lg:hidden">
                <button
                  type="button"
                  className="lg:hidden py-1.5 px-2.5 ... dark:text-neutral-200"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <div className=" py-3 px-5 flex justify-center items-center">
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
                    <div className="ml-1"> Filter</div>
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
                  ${
                    selectedCategoryId === category.id
                      ? "bg-[#E91E63] text-white"
                      : "bg-white text-gray-800 dark:bg-neutral-900 dark:text-neutral-200"
                  } 
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
                    <div className="text-sm text-gray-500">
                      No categories found.
                    </div>
                  )}
                </div>
              </div>
              {/* End List */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryDisplay;
