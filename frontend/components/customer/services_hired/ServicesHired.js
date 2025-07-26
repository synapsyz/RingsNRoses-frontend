'use client';

import { useRouter } from 'next/router';

const ServicesHired = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/service-request');
  };

  return (
    <>
      <div
        className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 md:col-span-1"
      >
        <div className="flex flex-col gap-2">
          <img src="https://cdn-icons-png.flaticon.com/128/6728/6728483.png" alt="Customer Loyalty" width="50" height="50"></img>
          <h2 className="text-xl text-gray-600 dark:text-neutral-400">Services hired</h2>
          <p
            className="text-xl font-semibold text-gray-800 dark:text-white cursor-pointer inline-block underline decoration-gray-800 dark:decoration-white hover:text-[#E91E63] hover:decoration-[#E91E63] transition-colors duration-300 ease-in-out"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick();
              }
            }}
          >
            Fill the Form
          </p>
        </div>
      </div>
    </>
  );
};

export default ServicesHired;