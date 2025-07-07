// components/FormInput.js
import React from 'react';

const FormInput = ({ id, label, type = 'text', placeholder, value, onChange, required = false, error }) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <input
      id={id}
      type={type}
      required={required}
      className={`py-1.5 sm:py-2 px-3 block w-full border ${error ? 'border-red-500' : 'border-stone-200'} rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default FormInput;