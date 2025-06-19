import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="h-14 sm:h-16">
      <div className="max-w-[85rem] p-4 sm:p-5 lg:px-8 mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-stone-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Preline Labs.
          </p>

          {/* List with clean vertical separators */}
          {/* We use `divide-x` to add a border between child elements */}
          <ul className="flex items-center divide-x divide-stone-300 dark:divide-neutral-700">
            <li className="px-3 sm:px-4 first:ps-0">
              <Link href="/faq" className="text-xs sm:text-sm text-stone-500 hover:text-green-600 focus:outline-none focus:underline dark:text-neutral-500 dark:hover:text-neutral-200">
                FAQ
              </Link>
            </li>
            <li className="px-3 sm:px-4 first:ps-0">
              <Link href="/license" className="text-xs sm:text-sm text-stone-500 hover:text-green-600 focus:outline-none focus:underline dark:text-neutral-500 dark:hover:text-neutral-200">
                License
              </Link>
            </li>
            <li className="px-3 sm:px-4 first:ps-0">
              <button
                type="button"
                className="hover:text-green-600 focus:outline-none focus:text-stone-800 dark:hover:text-neutral-200 dark:focus:text-neutral-400"
                data-hs-overlay="#hs-pro-dfkm"
              >
                <svg className="shrink-0 size-3.5 sm:size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;