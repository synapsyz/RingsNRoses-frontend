import React from 'react';

const CheckboxGroup = ({ items, selectedItems, onToggle, name }) => (
  <div className="flex flex-wrap gap-3">
    {items.map(item => (
      <label
        key={item.id}
        htmlFor={`${name}-checkbox-${item.id}`}
        className="py-2 px-2.5 relative flex justify-center items-center text-center text-[13px] bg-white border border-gray-200 ring-1 ring-transparent text-gray-800 cursor-pointer rounded-xl hover:border-green-600 hover:ring-green-600 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 dark:hover:ring-neutral-600 peer-checked:bg-green-100 peer-checked:border-green-200 peer-checked:ring-green-200 peer-checked:text-green-800 dark:peer-checked:bg-green-800/30 dark:peer-checked:border-green-800/50 dark:peer-checked:ring-green-800/50 dark:peer-checked:text-green-500"
      >
        <input
          type="checkbox"
          id={`${name}-checkbox-${item.id}`}
          className="hidden peer"
          name={name}
          checked={selectedItems.has(item.id)}
          onChange={() => onToggle(item.id)}
        />
        <span className="flex shrink-0 justify-center items-center size-0 bg-green-500 text-transparent rounded-full transition-all duration-200 peer-checked:size-4 peer-checked:me-1.5 peer-checked:text-white">
          <svg className="shrink-0 size-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span className="block">{item.name}</span>
      </label>
    ))}
  </div>
);

export default CheckboxGroup;