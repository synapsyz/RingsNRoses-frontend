import React from 'react';

const FoodPackageRadioGroup = ({ selectedFoodPackage, onSelect }) => {
  const foodPackages = [
    { id: 'veg', name: 'Veg', svg: (
      <svg className="shrink-0 size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {/* Veg Symbol (Green rectangle with a dot) */}
        <rect x="2" y="2" width="20" height="20" rx="4" ry="4" stroke="#22C55E" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="4" fill="#22C55E"/>
      </svg>
    )},
    { id: 'non-veg', name: 'Non-Veg', svg: (
      <svg className="shrink-0 size-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Non-Veg Symbol (Red square with a triangle) */}
        <rect x="2" y="2" width="20" height="20" rx="4" ry="4" stroke="#EF4444" strokeWidth="2" fill="none"/>
        <path d="M12 4L18 20H6L12 4Z" fill="#EF4444"/>
      </svg>
    )},
    { id: 'veg-non-veg', name: 'Veg & Non-Veg', svg: (
      <svg className="shrink-0 size-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Fork and Knife for general meal/both - brown */}
        <path fill="#8B4513" d="M7 11h2v2H7zM11 11h2v2h-2zM15 11h2v2h-2zM19 4H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V8h14v12z"/>
      </svg>
    )},
  ];

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
      {foodPackages.map((pkg) => (
        <label
          key={pkg.id}
          htmlFor={`food-package-${pkg.id}`}
          className={`p-3 flex items-center gap-x-3 text-sm bg-white border border-gray-200 text-gray-800 ring-1 ring-transparent cursor-pointer rounded-xl hover:border-purple-600 hover:ring-purple-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:ring-neutral-600 dark:hover:ring-neutral-600
            ${selectedFoodPackage === pkg.id ? 'border-purple-600 ring-purple-600' : ''}`}
        >
          {pkg.svg}
          <span className="grow">
            <span className="block">{pkg.name}</span>
          </span>
          <input
            type="radio"
            id={`food-package-${pkg.id}`}
            className="shrink-0 size-5 border-gray-200 rounded-full text-purple-600 checked:border-purple-600 focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-purple-500 dark:checked:border-purple-500 dark:focus:ring-offset-neutral-800"
            name="foodPackage"
            value={pkg.id}
            checked={selectedFoodPackage === pkg.id}
            onChange={() => onSelect(pkg.id)}
          />
        </label>
      ))}
    </div>
  );
};

export default FoodPackageRadioGroup;