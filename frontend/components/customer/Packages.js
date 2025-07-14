import React, { useState } from 'react';

const Packages = ({ data }) => {
  const [showAll, setShowAll] = useState(false);
  const initialPackagesToShow = 3;

  const packagesToDisplay = showAll
    ? data.packages
    : data.packages.slice(0, initialPackagesToShow);

  const hasMorePackages = data.packages && data.packages.length > initialPackagesToShow;

  return (
    <div>
        { data.packages && data.packages.length>0 &&
      <div className="max-w-5xl px-4 xl:px-0 py-10 lg:pt-20 mx-auto">
        <div className="max-w-3xl mb-6 lg:mb-4">
          <h2 className="font-semibold text-xl md:text-xl md:leading-tight">Flexible Packages</h2>
          <p className="mt-1 text-neutral-700">Whether you're just starting or scaling fast, our pricing adjusts to fit your goals.</p>
        </div>
        <div className="xl:-mx-6 flex flex-col">
          {packagesToDisplay && packagesToDisplay.map((pkg) => (
            <div key={pkg.id} className="relative after:absolute after:top-0 after:inset-x-4 md:after:inset-x-6 after:border-t after:border-neutral-700 first:after:border-t-0 py-3">
              <div className="p-4 md:p-6 relative border border-transparent rounded-xl hover:border-[#E91E63] before:absolute before:inset-0 before:rounded-b-xl before:bg-linear-to-b hover:before:from-transparent hover:before:via-transparent hover:before:to-[#E91E63]/10 before:via-80% before:opacity-0 hover:before:opacity-100">
                <a className="after:absolute after:inset-0 after:z-1" href="#"></a>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-8">
                  <div>
                    <div className="mb-3 flex items-start gap-x-1">
                      <span className="text-[#E91E63] text-3xl md:text-4xl">
                        {parseFloat(pkg.price).toLocaleString('en-IN')} <span className="text-xl">INR</span>
                      </span>
                    </div>

                    <h4 className="font-semibold text-xl">
                      {pkg.name}
                    </h4>

                    <p className="text-sm text-neutral-700">
                      {pkg.description}
                    </p>
                  </div>
                  <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm">
                      {pkg.included_items && pkg.included_items.map((item, index) => (
                        <li key={index} className="flex items-center gap-x-2">
                          <span className="size-1 bg-[#E91E63] rounded-full"></span>
                          <span className="text-neutral-600">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMorePackages && (
          <div className="mt-2 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              type="button"
              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent hover:text-[#C2185B] disabled:opacity-50 disabled:pointer-events-none"
            >
              {showAll ? 'Show Less' : 'See More'}
              <svg
                className={`flex-shrink-0 size-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
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
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
}
    </div>

  );
};
export default Packages;