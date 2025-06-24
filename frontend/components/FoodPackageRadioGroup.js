import React from 'react';

const FoodPackageRadioGroup = ({ selectedFoodPackage, onSelect }) => {
  const foodPackages = [
    { id: 'veg', name: 'Veg', svg: (
      <svg className="shrink-0 size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {/* Veg Symbol: Green square outline with a green circle inside */}
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" stroke="#22C55E" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="6" fill="#22C55E"/>
      </svg>
    )},
    { id: 'non-veg', name: 'Non-Veg', svg: (
      <svg className="shrink-0 size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {/* Non-Veg Symbol: Red square outline with a red circle inside */}
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" stroke="#EF4444" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="6" fill="#EF4444"/>
      </svg>
    )},
    { id: 'veg-non-veg', name: 'Veg & Non-Veg', svg: (
      <svg className="shrink-0 size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            {/* Diagonal Gradient for the border: starts green at bottom-left, ends red at top-right */}
            <linearGradient id="diagonal-border-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#22C55E"/> {/* Green for the first half */}
                <stop offset="50%" stopColor="#EF4444"/> {/* Red for the second half */}
            </linearGradient>

            {/* Diagonal Gradient for the circle fill: starts green at bottom-left, ends red at top-right */}
            <linearGradient id="diagonal-circle-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#22C55E"/> {/* Green for the first half */}
                <stop offset="50%" stopColor="#EF4444"/> {/* Red for the second half */}
            </linearGradient>
        </defs>

        {/* Outer rectangle with diagonal gradient border */}
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" stroke="url(#diagonal-border-gradient)" strokeWidth="2" fill="none"/>

        {/* Inner circle with diagonal gradient fill */}
        <circle cx="12" cy="12" r="6" fill="url(#diagonal-circle-gradient)" />
      </svg>
    )},
  ];

  const getLabelClasses = (pkg) => {
    let classes = `p-3 flex items-center gap-x-3 text-sm ring-1 ring-transparent cursor-pointer rounded-xl `;

    // Default styling for non-selected items (white background, gray border)
    classes += `bg-white border border-gray-200 text-gray-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 `;

    // Apply hover styling based on food package type
    if (pkg.id === 'veg') {
      classes += `hover:border-green-600 hover:ring-green-600 dark:hover:ring-green-600 dark:hover:border-green-600 `;
    } else if (pkg.id === 'non-veg') {
      classes += `hover:border-red-600 hover:ring-red-600 dark:hover:ring-red-600 dark:hover:border-red-600 `;
    } else if (pkg.id === 'veg-non-veg') {
      // For 'veg-non-veg', hover border/ring will be a neutral color
      classes += `hover:border-neutral-600 hover:ring-neutral-600 dark:hover:ring-neutral-600 dark:hover:border-neutral-600 `;
    }

    // Apply selected styling based on food package type (using !important to override defaults)
    if (selectedFoodPackage === pkg.id) {
      if (pkg.id === 'veg') {
        classes += `!bg-green-100 !border-green-600 !ring-green-600 !text-green-800 dark:!bg-green-800/30 dark:!border-green-800/50 dark:!ring-green-800/50 dark:!text-green-500`;
      } else if (pkg.id === 'non-veg') {
        classes += `!bg-red-100 !border-red-600 !ring-red-600 !text-red-800 dark:!bg-red-800/30 dark:!border-red-800/50 dark:!ring-red-800/50 dark:!text-red-500`;
      } else if (pkg.id === 'veg-non-veg') {
        // Apply a neutral background color when selected
        classes += `!bg-neutral-100 !border-neutral-700 !ring-neutral-700 !text-gray-800 dark:!bg-neutral-800/30 dark:!border-neutral-700 dark:!ring-neutral-700 dark:!text-neutral-200`;
      }
    }
    return classes;
  };

  // Helper function to get classes for the input radio button itself
  const getInputClasses = (pkgId) => {
    let classes = `shrink-0 size-5 border-gray-200 rounded-full focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:focus:ring-offset-neutral-800`;

    if (selectedFoodPackage === pkgId) {
      if (pkgId === 'veg') {
        classes += ` checked:border-green-600 checked:bg-green-500 dark:checked:bg-green-500 dark:checked:border-green-500`;
      } else if (pkgId === 'non-veg') {
        classes += ` checked:border-red-600 checked:bg-red-500 dark:checked:bg-red-500 dark:checked:border-red-500`;
      } else if (pkgId === 'veg-non-veg') {
        // Use a neutral color for the radio button's checked state for 'veg-non-veg'
        classes += ` checked:border-neutral-600 checked:bg-neutral-700 dark:checked:bg-neutral-700 dark:checked:border-neutral-500`;
      }
    }
    return classes;
  };


  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
      {foodPackages.map((pkg) => (
        <label
          key={pkg.id}
          htmlFor={`food-package-${pkg.id}`}
          className={getLabelClasses(pkg)}
          // Removed the inline style for background image as it's now handled by Tailwind classes
        >
          {pkg.svg}
          <span className="grow">
            <span className="block">{pkg.name}</span>
          </span>
          <input
            type="radio"
            id={`food-package-${pkg.id}`}
            className={getInputClasses(pkg.id)}
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