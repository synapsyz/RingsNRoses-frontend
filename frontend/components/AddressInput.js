// components/AddressInput.js
import React from 'react';

const AddressInput = ({ heading, placeholder, value, onChange, error }) => {
  return (
    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
          {heading}
        </h2>
      </div>
      <div className="p-5">
        <textarea
          id="fullAddress"
          className={`py-2 px-3 block w-full border ${error ? 'border-red-500' : 'border-stone-200'} rounded-lg text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400`}
          rows="4"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default AddressInput;