'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const IMAGE_SIZE = 100;

const SubcategoryItem = ({ subcategory, onClick }) => (
  <a
    href={`/${subcategory.category.name.toLowerCase().replace(/[\s-/]+/g, '_')}/${subcategory.name.toLowerCase().replace(/[\s-/]+/g, '_')}`}
    className="flex flex-col items-center justify-center text-center text-sm text-gray-700 rounded-lg hover:bg-gray-100 p-2 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
  </a>
);

export default function Catalog({ isCatalogOpen, setIsCatalogOpen, api, toggleCatalog }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [clickedCategoryId, setClickedCategoryId] = useState(null);
  const [mobileSelectedCategoryId, setMobileSelectedCategoryId] = useState(null);
  const [mobileSelectedCategoryName, setMobileSelectedCategoryName] = useState('Select a category');
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [subcategoriesCache, setSubcategoriesCache] = useState({});
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [isSubcategoriesLoading, setIsSubcategoriesLoading] = useState(false);
  const [subcategoriesError, setSubcategoriesError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (isMobileDropdownOpen && mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
            setIsMobileDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileDropdownOpen]);

  useEffect(() => {
    if (isCatalogOpen && categories.length === 0 && !isLoading) {
      setIsLoading(true);
      setError(null);
      api.get('/categories')
        .then((response) => {
          setCategories(response.data.results);
        })
        .catch((err) => {
          console.error('Error fetching categories:', err);
          setError('Failed to load categories. Please try again.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isCatalogOpen, api, categories.length, isLoading]);

  useEffect(() => {
    if (isCatalogOpen && categories.length > 0) {
        if (isMobile) {
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
  }, [isCatalogOpen, categories, isMobile, mobileSelectedCategoryId, hoveredCategoryId, clickedCategoryId]);


  useEffect(() => {
    const idToFetch = isMobile ? mobileSelectedCategoryId : hoveredCategoryId || clickedCategoryId;

    if (idToFetch) {
      if (subcategoriesCache[idToFetch]) {
        setCurrentSubcategories(subcategoriesCache[idToFetch]);
        return;
      }
      setIsSubcategoriesLoading(true);
      setSubcategoriesError(null);
      api.get(`/categories/${idToFetch}/subcategories/`)
        .then(response => {
          const fetchedSubcategories = response.data.results;
          setCurrentSubcategories(fetchedSubcategories);
          setSubcategoriesCache(prevCache => ({
            ...prevCache,
            [idToFetch]: fetchedSubcategories,
          }));
        })
        .catch(err => {
          console.error(`Error fetching subcategories for category ${idToFetch}:`, err);
          setSubcategoriesError('Failed to load subcategories.');
          setCurrentSubcategories([]);
        })
        .finally(() => {
          setIsSubcategoriesLoading(false);
        });
    } else {
      setCurrentSubcategories([]);
    }
  }, [hoveredCategoryId, clickedCategoryId, mobileSelectedCategoryId, isMobile, subcategoriesCache, api]);


  const handleMobileCategorySelect = useCallback((category) => {
    setMobileSelectedCategoryId(category.id);
    setMobileSelectedCategoryName(category.name);
    setIsMobileDropdownOpen(false);
  }, []);

  const handleSubcategoryClick = () => {
    setIsCatalogOpen(false);
    setHoveredCategoryId(null);
    setClickedCategoryId(null);
    setMobileSelectedCategoryId(null);
    setMobileSelectedCategoryName('Select a category');
  };

  return (
    <div className="ml-4 font-inter">
        {/* Catalog Button */}
        <button
          id="catalog-button"
          type="button"
          className="py-[7px] sm:py-2 sm:py-2.5 px-6 flex items-center gap-x-1.5 text-sm text-start border border-transparent text-white rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden"
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

        {/* Catalog Panel */}
        <div
          className={`w-full bg-white shadow-md z-20 absolute top-full left-0 right-0 dark:bg-neutral-900 transition-all duration-300 transform ${
            isCatalogOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-2'
          }`}
        >
            <div className="max-w-[85rem] mx-auto py-4 px-4 sm:px-6 lg:px-8">
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-[22%_78%] gap-4 min-h-[300px]">
                {/* Categories List */}
                <div>
                {isLoading ? (
                    <div className="text-sm text-gray-500">Loading categories...</div>
                ) : error ? (
                    <div className="text-sm text-red-500">{error}</div>
                ) : (
                    <nav className="space-y-1">
                    {categories.map((category) => (
                        <button
                        key={category.id}
                        type="button"
                        className={`py-2.5 px-2 w-full flex items-center text-start font-medium text-sm rounded-lg focus:outline-hidden ${
                            clickedCategoryId === category.id ? 'bg-gray-200 text-gray-900' :
                            hoveredCategoryId === category.id ? 'bg-gray-100 text-gray-800' :
                            'bg-white text-gray-800 hover:bg-gray-100'
                        } dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800`}
                        onClick={() => {
                            setClickedCategoryId(category.id);
                            setHoveredCategoryId(category.id);
                        }}
                        onMouseEnter={() => setHoveredCategoryId(category.id)}
                        onMouseLeave={() => {
                            if (clickedCategoryId !== category.id) {
                                setHoveredCategoryId(clickedCategoryId); // Revert to the clicked category on mouse leave
                            }
                        }}
                        >
                        {category.svg_icon_url && (
                            <img src={category.svg_icon_url} alt={`${category.name} icon`} className="w-5 h-5" />
                        )}
                        <p className='ml-1'></p>
                        {category.name}
                        <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                        </button>
                    ))}
                    </nav>
                )}
                </div>

                {/* Subcategories List */}
                <div>
                {isSubcategoriesLoading ? (
                    <div className="text-sm text-gray-500">Loading subcategories...</div>
                ) : subcategoriesError ? (
                    <div className="text-sm text-red-500">{subcategoriesError}</div>
                ) : currentSubcategories.length > 0 ? (
                    <nav className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-4`}>
                        {currentSubcategories.map((subcategory) => (
                            <SubcategoryItem
                                key={subcategory.id}
                                subcategory={subcategory}
                                onClick={handleSubcategoryClick}
                            />
                        ))}
                    </nav>
                ) : (
                    !isSubcategoriesLoading && <div className="text-sm text-gray-500">No subcategories found for this category.</div>
                )}
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col gap-4">
                {isLoading ? (
                    <div className="text-sm text-gray-500">Loading categories...</div>
                ) : error ? (
                    <div className="text-sm text-red-500">{error}</div>
                ) : (
                    <div className="relative w-full" ref={mobileDropdownRef}>
                        <button
                            type="button"
                            className="py-2 px-3 pe-9 block w-full border border-gray-200 rounded-lg text-sm text-left focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                        >
                            {mobileSelectedCategoryName}
                            <div className="absolute inset-y-0 right-0 flex items-center pe-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </button>
                        {isMobileDropdownOpen && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto dark:bg-neutral-800 dark:border-neutral-700">
                                <ul>
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${mobileSelectedCategoryId === category.id ? 'bg-blue-50' : ''} dark:text-neutral-300 dark:hover:bg-neutral-700`}
                                            onClick={() => handleMobileCategorySelect(category)}
                                        >
                                           <div className="flex items-center gap-2">
                                                {category.svg_icon_url && (
                                                    <img src={category.svg_icon_url} alt={`${category.name} icon`} className="w-3 h-3" />
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
                                    onClick={handleSubcategoryClick}
                                />
                            ))}
                        </nav>
                    ) : (
                        !isSubcategoriesLoading && mobileSelectedCategoryId && <div className="text-sm text-gray-500">No subcategories found for this category.</div>
                    )}
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}