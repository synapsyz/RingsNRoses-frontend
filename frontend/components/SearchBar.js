// SearchBar.jsx (with all the fancy animations)

import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoadingSpinner from "@/components/LoadingSpinner"; // adjust path as needed

// --- Helper: Icons for different result types (No changes here) ---
const getIconForType = (type) => {
    // ... (same as before)
    switch (type.toLowerCase()) {
    case 'venue':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-pink-500">
          <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.1.4-.223.654-.369.257-.148.54-.32.81-.518.272-.2.52-.417.756-.653.238-.238.454-.5.642-.78l.042-.062.02-.03.006-.009.003-.005a9.737 9.737 0 0 0 .63-1.076c.194-.37.35-.787.458-1.246l.042-.18.016-.07.004-.018a7.453 7.453 0 0 0 0-5.45c-.26-1.65-.83-3.218-1.684-4.595A6.25 6.25 0 0 0 10 2.5a6.25 6.25 0 0 0-4.743 2.224C4.402 6.29 3.832 7.858 3.573 9.5c-.01.066-.018.132-.026.2a7.453 7.453 0 0 0 0 5.45l.004.018.016-.07.042.18c.108.459.264.876.458 1.246a9.737 9.737 0 0 0 .63 1.076l.003.005.006.009.02.03.042.062c.188.28.404.542.642.78.236.236.484.453.756.653.27.198.553.37.81.518.254.146.468.269.654.369a5.741 5.741 0 0 0 .281.14l.018.008.006.003Z" clipRule="evenodd" />
        </svg>
      );
    case 'catering':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-teal-500">
          <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          <path fillRule="evenodd" d="M16.49 2.51a.75.75 0 0 0-1.06 0l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06a.75.75 0 0 0 0-1.06ZM4.57 14.43a.75.75 0 0 0-1.06 1.06l1.06 1.06a.75.75 0 0 0 1.06-1.06l-1.06-1.06ZM17.25 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM14.43 4.57a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 0 0-1.06 1.06l1.06 1.06ZM5.63 15.49a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-blue-500">
          <path fillRule="evenodd" d="M15.312 5.312a.75.75 0 0 1 0 1.061l-6 6a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
      );
  }
};

const useDebounce = (value, delay) => {
    // ... (same as before)
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};


const SearchBar = () => {
    // ... (state and logic are the same as before)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const searchContainerRef = useRef(null);

  const fetchResults = useCallback(async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      setIsDropdownVisible(false);
      return;
    }
    setIsLoading(true);
    setIsDropdownVisible(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/search/?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults(debouncedQuery);
  }, [debouncedQuery, fetchResults]);

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
    <div className="relative w-full max-w-lg mx-auto" ref={searchContainerRef}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <svg className="size-4 text-gray-400 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>

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
              {/* --- ✨ Staggered List Items --- */}
              {results.map((result, index) => (
                <li
                  key={result.id}
                  className={`transition-all duration-300 ease-out ${isDropdownVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                  style={{ transitionDelay: `${index * 50}ms` }} // This creates the stagger effect
                >
                  <a href={result.detail_url} className="flex items-center gap-4 p-4 hover:bg-pink-50 dark:hover:bg-neutral-700 transition-colors duration-150">
                    <div className="flex-shrink-0">{getIconForType(result.type)}</div>
                    <div className="flex-grow"><p className="font-medium text-sm text-gray-800 dark:text-neutral-200">{result.name}</p></div>
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