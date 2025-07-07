import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to detect the active page
import { useSession } from "next-auth/react"; // Only import useSession, signIn is not used here

// --- Sub-Components to keep the main component clean ---

// This component renders a single, simple navigation link.
const NavLink = ({ href, label, isActive }) => (
  <Link
    href={href}
    className={`flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-700 ${
      isActive ? 'bg-stone-100 dark:bg-neutral-700' : 'text-stone-800 dark:text-neutral-200'
    }`}
  >
    {label}
  </Link>
);

// This component renders a dropdown menu with its sub-links.
const NavDropdown = ({ label, badge, sublinks, pathname }) => (
  <div className="hs-dropdown [--strategy:static] lg:[--strategy:fixed] [--adaptive:none] lg:[--trigger:hover] lg:inline-block">
    <button
      type="button"
      className="hs-dropdown-toggle flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
    >
      {label}
      {badge && <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">{badge}</span>}
      <svg className="hs-dropdown-open:-rotate-180 duration-300 ms-auto lg:ms-0 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] lg:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full lg:w-52 hidden z-10 top-full bg-white lg:rounded-lg lg:shadow-xl ps-7 lg:ps-0">
      <div className="p-1 space-y-0.5">
        {sublinks.map(sublink => (
          <Link
            key={sublink.label}
            href={sublink.href}
            className={`group py-2 px-3 flex items-center gap-x-3 text-sm rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-700 ${
              pathname === sublink.href ? 'text-blue-600 dark:text-blue-500' : 'text-stone-800 dark:text-neutral-200'
            }`}
          >
            {sublink.label}
            {sublink.badge && <span className="ms-auto py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">{sublink.badge}</span>}
          </Link>
        ))}
      </div>
    </div>
  </div>
);


// --- Main SecondaryNav Component ---

const SecondaryNav = () => {
  const pathname = usePathname();
  // Move useSession inside the component
  const { data: session, status } = useSession();

  // Derive category_name inside the component
 let category_name = session?.user?.vendor_profile?.subcategory?.category?.name?.replace(/ /g, '_')?.toLowerCase();

  // Define navLinks inside the component so category_name is available
  const navLinks = [
    { type: 'link', label: 'Dashboard', href: '/vendor/dashboard' },
    {
      type: 'dropdown',
      label: 'Service',
      sublinks: [
        { label: 'Add/Edit Service', href: `/vendor/edit_service/${category_name}` },
        { label: 'Preview', href: '/service/preview' },
      ],
    },
    { type: 'link', label: 'Reviews', href: '/reviews' },
    { type: 'link', label: 'Discounts', href: '/discounts' },
    { type: 'link', label: 'Subscribe', href: '/vendor/payment' },
  ];

  return (
    <nav className="relative bg-white border-b border-stone-200 dark:bg-neutral-800 dark:border-neutral-700">
      <div className="max-w-[85rem] flex flex-wrap justify-between gap-2 basis-full items-center w-full mx-auto lg:py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="basis-full grow lg:basis-auto lg:grow-0">
          <div id="hs-pro-emh" className="hs-collapse hidden overflow-hidden transition-all duration-300 lg:block">
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="lg:flex lg:items-center lg:gap-x-1 py-2 lg:py-0 space-y-1 lg:space-y-0">
                {navLinks.map((item) => {
                  if (item.type === 'dropdown') {
                    return <NavDropdown key={item.label} {...item} pathname={pathname} />;
                  }
                  return <NavLink key={item.label} {...item} isActive={pathname === item.href} />;
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Placeholder for the project dropdown on the right, if needed */}
      </div>
    </nav>
  );
};

export default SecondaryNav;