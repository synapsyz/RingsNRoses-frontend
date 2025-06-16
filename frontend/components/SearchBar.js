import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoadingSpinner from "@/components/LoadingSpinner"; // adjust path as needed

// A custom hook to debounce any fast-changing value
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        // Cleanup function to cancel the timeout if value changes before delay has passed
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;

  // Debounce the search query to avoid excessive API calls
  const debouncedQuery = useDebounce(query, 500);
  const searchContainerRef = useRef(null);

  // Function to fetch search results from the API
  const fetchResults = useCallback(async (searchQuery) => {
    // Don't search if the query is empty
    if (!searchQuery) {
      setResults([]);
      setIsDropdownVisible(false);
      return;
    }
    // Set loading state and show dropdown
    setIsLoading(true);
    setIsDropdownVisible(true);
    setError(null);

    try {
      const response = await fetch(
        `https://6d88-183-82-206-189.ngrok-free.app/api/v1/search/?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to trigger fetchResults when the debounced query changes
  useEffect(() => {
    fetchResults(debouncedQuery);
  }, [debouncedQuery, fetchResults]);

  // Effect to handle clicks outside the search component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="relative w-full max-w-full mx-auto" ref={searchContainerRef}>
      <div className="relative w-full">
        {/* Search Icon */}
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <svg className="size-4 text-gray-400 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsDropdownVisible(true)}
          className="py-2.5 ps-11 pe-12 block w-full bg-white text-sm rounded-full transition-all duration-300 ease-out ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-neutral-900 dark:ring-neutral-600 dark:text-neutral-300 dark:focus:ring-pink-500"
          placeholder="Search venues, decorators, makeup artists..."
        />

        {/* --- ✨ Animated Clear Button --- */}
        <div className="absolute inset-y-0 end-0 flex items-center pe-4">
          <button
            type="button"
            onClick={() => { setQuery(''); setResults([]); setIsDropdownVisible(false); }}
            className={`p-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-600 focus:outline-none transition-all duration-200 ease-in-out dark:hover:bg-neutral-700 ${query ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
            aria-label="Clear search"
          >
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
          </button>
        </div>
      </div>

      {/* --- ✨ Animated Dropdown --- */}
      <div className={`absolute z-20 w-full mt-2 transition-all duration-300 ease-in-out ${isDropdownVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-white border border-gray-200/80 rounded-xl shadow-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
          {isLoading && <LoadingSpinner />}
          {error && <div className="p-4 text-sm text-center text-red-500">{error}</div>}
          {!isLoading && !error && results.length === 0 && debouncedQuery && (
            <div className="p-4 text-sm text-center text-gray-500 dark:text-neutral-400">No results found.</div>
          )}
          {results.length > 0 && (
            <ul className="divide-y divide-gray-100 dark:divide-neutral-700">
              {/* --- ✨ Staggered & Animated List Items --- */}
              {results.map((result, index) => (
                <li
                  key={result.id}
                  // Add 'group' to allow child elements to be styled on parent hover
                  className={`group transition-all duration-300 ease-out ${isDropdownVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                  style={{ transitionDelay: `${index * 50}ms` }} // Stagger effect
                >
                  <a href={result.detail_url} className="flex items-center gap-4 p-4 hover:bg-pink-50 dark:hover:bg-neutral-700 transition-colors duration-150">
                    <img
                      src={result?.svg_url || '/icons/your-new-icon.svg'}
                      alt={`Icon for ${result.name}`}
                      // On parent hover ('group-hover'), scale the icon and change its color
                      className="w-5 h-5 text-gray-400 transition-all duration-200 ease-out group-hover:scale-110 group-hover:text-pink-500"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-sm text-gray-800 dark:text-neutral-200">{result.name}</p>
                    </div>
                    <span className="text-xs capitalize bg-gray-100 text-gray-600 px-2 py-1 rounded-full dark:bg-neutral-600 dark:text-neutral-300">{result.type}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;