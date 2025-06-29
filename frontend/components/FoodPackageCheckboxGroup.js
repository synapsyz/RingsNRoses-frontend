import React from 'react';

const FoodPackageCheckboxGroup = ({ selectedFoodPackages, onSelect }) => {
  const foodPackages = [
    {
      id: 'veg',
      name: 'Veg',
      color: 'green',
      svg: (
        <svg className="shrink-0 size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" stroke="#22C55E" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="6" fill="#22C55E" />
        </svg>
      )
    },
    {
      id: 'non-veg',
      name: 'Non-Veg',
      color: 'red',
      svg: (
        <svg className="shrink-0 size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" stroke="#EF4444" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="6" fill="#EF4444" />
        </svg>
      )
    },
  ];

  const handleToggle = (id) => {
    const updated = new Set(selectedFoodPackages);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    onSelect(updated);
  };

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-3">
      {foodPackages.map((pkg) => {
        const isChecked = selectedFoodPackages.has(pkg.id);
        const color = pkg.color;

        const baseStyles =
          'p-3 flex items-center gap-x-3 text-sm rounded-xl cursor-pointer border transition-all duration-200';

        const hoverStyles =
          color === 'green'
            ? 'hover:border-green-600'
            : 'hover:border-red-600';

        const checkedStyles =
          color === 'green'
            ? 'ring-2 ring-green-500 bg-green-100 border-green-500 text-green-800 dark:bg-green-800/20 dark:border-green-500'
            : 'ring-2 ring-red-500 bg-red-100 border-red-500 text-red-800 dark:bg-red-800/20 dark:border-red-500';

        const uncheckedStyles = 'bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700';

        return (
          <label
            key={pkg.id}
            htmlFor={`food-package-${pkg.id}`}
            className={`${baseStyles} ${hoverStyles} ${isChecked ? checkedStyles : uncheckedStyles}`}
          >
            {pkg.svg}
            <span className="grow">{pkg.name}</span>
            <input
              type="checkbox"
              id={`food-package-${pkg.id}`}
              name="foodPackage"
              checked={isChecked}
              onChange={() => handleToggle(pkg.id)}
              className={`
                size-5
                rounded
                border
                ${color === 'green' ? 'accent-green-500 checked:bg-green-600 checked:border-green-600' : ''}
                ${color === 'red' ? 'accent-red-500 checked:bg-red-600 checked:border-red-600' : ''}
              `}
            />
          </label>
        );
      })}
    </div>
  );
};

export default FoodPackageCheckboxGroup;
