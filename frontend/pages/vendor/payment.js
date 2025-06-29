import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import CustomHead from '@/components/vendor/Head';
import Header from '@/components/vendor/Header';
import SecondaryNav from '@/components/vendor/SecondaryNav';
const PricingSection = () => {
    const { data: session, status } = useSession();
  return (
    <>
    <CustomHead />
          <Header />
          <SecondaryNav />
          
    <div className="relative py-10 md:py-14 px-4 before:absolute before:inset-0 before:-z-1 before:mx-3 lg:before:mx-6 2xl:before:mx-10 before:bg-linear-to-b before:from-gray-100 before:to-transparent before:rounded-2xl dark:before:from-neutral-800">
      <div className="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Heading */}
        <div className="mb-8 max-w-2xl mx-auto text-center">
          <h1 className="font-bold text-gray-800 text-4xl md:text-5xl dark:text-white">
            Simple, transparent pricing
          </h1>

          <p className="mt-5 text-sm md:text-lg text-gray-800 dark:text-gray-200">
            Whatever your status, our offers evolve according to your needs.
          </p>
        </div>
        {/* End Heading */}
      </div>

      <div className="my-8">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Card - Monthly Plan */}
    <div className="p-4 md:p-6 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-xs dark:bg-neutral-900 dark:border-neutral-700">
        {/* Header */}
        <header className="flex flex-col">
            <h4 className="font-semibold text-lg text-gray-800 dark:text-neutral-200">
                Monthly Plan
            </h4>

            <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                    Pay month-to-month
                </p>
            </div>
        </header>
        {/* End Header */}

        {/* Body */}
        <div className="flex flex-col">
            {/* Price */}
            <div className="mt-4 flex items-start gap-x-1">
                <span className="font-semibold text-gray-800 text-xl dark:text-neutral-200">₹</span>
                <span data-hs-toggle-count='{
                    "target": "#toggle-count",
                    "min": 0,
                    "max": 0
                }' className="font-semibold text-3xl md:text-4xl text-gray-800 dark:text-neutral-200">
                    99
                </span>
                <span className="block mt-0.5 text-gray-800 dark:text-neutral-200">
                    INR
                </span>
            </div>
            {/* End Price */}

            <p className="text-xs text-gray-500 dark:text-neutral-500">
                /month for your {session?.user?.vendor_profile?.subcategory?.category?.name}
            </p>

            <div className="mt-5 pb-7 border-b border-gray-200 dark:border-neutral-700">
               <Link href="/vendor/payment_success" passHref>
      <button type="button" className="py-2 px-2.5 w-full inline-flex justify-center items-center gap-x-1.5 whitespace-nowrap text-[13px] md:text-sm rounded-lg bg-white border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
        Get started
      </button>
    </Link>
            </div>

            {/* List */}
            <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Vendor Profile Listing
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Upload 5 Photos & Videos
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Display Reviews & Ratings
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Respond to Customer Inquiries (Limited)
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Analytics Dashboard
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        No Social Media Promotion
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Email Only Support
                    </span>
                </li>
            </ul>
            {/* End List */}
        </div>
        {/* End Body */}
    </div>
    {/* End Card */}

    {/* Card - 6 Months Plan */}
    <div className="p-4 md:p-6 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-xs dark:bg-neutral-900 dark:border-neutral-700">
        {/* Header */}
        <header className="flex flex-col">
            <h4 className="font-semibold text-lg text-gray-800 dark:text-neutral-200">
                6 Months Plan <span className="font-mono font-normal text-xs text-blue-600 dark:text-blue-500">— Most popular</span>
            </h4>

            <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                    Commit for half a year
                </p>
            </div>
        </header>
        {/* End Header */}

        {/* Body */}
        <div className="flex flex-col">
            {/* Price */}
            <div className="mt-4 flex items-start gap-x-1">
                <span className="font-semibold text-gray-800 text-xl dark:text-neutral-200">₹</span>
                <span data-hs-toggle-count='{
                    "target": "#toggle-count",
                    "min": 90,
                    "max": 180
                }' className="font-semibold text-3xl md:text-4xl text-gray-800 dark:text-neutral-200">
                    499
                </span>
                <span className="block mt-0.5 text-gray-800 dark:text-neutral-200">
                    INR
                </span>
            </div>
            {/* End Price */}

            <p className="text-xs text-gray-500 dark:text-neutral-500">
                /6 months for your {session?.user?.vendor_profile?.subcategory?.category?.name}
            </p>

            <div className="mt-5 pb-7 border-b border-gray-200 dark:border-neutral-700">
                 <Link href="/vendor/payment_success" passHref>
      <button type="button" className="py-2 px-2.5 w-full inline-flex justify-center items-center gap-x-1.5 whitespace-nowrap text-[13px] md:text-sm rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 hover:shadow-none focus:outline-hidden focus:bg-blue-700 focus:shadow-none disabled:opacity-50 disabled:pointer-events-none">
        Get started
      </button>
    </Link>
            </div>

            {/* List */}
            <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Vendor Profile Listing
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Upload 10 Photos & Videos
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Display Reviews & Ratings
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Respond to Customer Inquiries
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Analytics Dashboard
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Social Media Promotion
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Email + WA Support
                    </span>
                </li>
            </ul>
            {/* End List */}
        </div>
        {/* End Body */}
    </div>
    {/* End Card */}

    {/* Card - Annual Plan */}
    <div className="p-4 md:p-6 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-xs dark:bg-neutral-900 dark:border-neutral-700">
        {/* Header */}
        <header className="flex flex-col">
            <h4 className="font-semibold text-lg text-gray-800 dark:text-neutral-200">
                Annual Plan
            </h4>

            <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                    Save with an annual commitment
                </p>
            </div>
        </header>
        {/* End Header */}

        {/* Body */}
        <div className="flex flex-col">
            {/* Price */}
            <div className="mt-4 flex items-start gap-x-1">
                <span className="font-semibold text-gray-800 text-xl dark:text-neutral-200">₹</span>
                <span data-hs-toggle-count='{
                    "target": "#toggle-count",
                    "min": 540,
                    "max": 1080
                }' className="font-semibold text-3xl md:text-4xl text-gray-800 dark:text-neutral-200">
                    999
                </span>
                <span className="block mt-0.5 text-gray-800 dark:text-neutral-200">
                    INR
                </span>
            </div>
            {/* End Price */}

            <p className="text-xs text-gray-500 dark:text-neutral-500">
                /year for your {session?.user?.vendor_profile?.subcategory?.category?.name}
            </p>

            <div className="mt-5 pb-7 border-b border-gray-200 dark:border-neutral-700">
                <Link href="/vendor/payment_success" passHref>
      <button type="button" className="py-2 px-2.5 w-full inline-flex justify-center items-center gap-x-1.5 whitespace-nowrap text-[13px] md:text-sm rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 hover:shadow-none focus:outline-hidden focus:bg-blue-700 focus:shadow-none disabled:opacity-50 disabled:pointer-events-none">
        Get started
      </button>
    </Link>
            </div>

            {/* List */}
            <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Vendor Profile Listing
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Upload 20 Photos & Videos
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Display Reviews & Ratings
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Respond to Customer Inquiries
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Analytics Dashboard
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Social Media Promotion
                    </span>
                </li>
                <li className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 dark:text-neutral-400">
                        Email + WA + Call Support
                    </span>
                </li>
            </ul>
            {/* End List */}
        </div>
        {/* End Body */}
    </div>
    {/* End Card */}
</div>
          {/* End Grid */}
        </div>
      </div>

      <div className="max-w-2xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Card */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
          <div className="flex gap-x-4">
            <svg className="shrink-0 size-7 mt-1 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
            <div className="grow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="grow">
                  <h4 className="font-medium text-gray-800 dark:text-neutral-200">
                    Need custom plan?
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                    Talk to our team to customize a plan that suits your needs.
                  </p>
                </div>
                <div>
                  <a className="py-2 px-2.5 inline-flex items-center gap-x-1.5 whitespace-nowrap text-[13px] md:text-sm rounded-lg bg-white border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                    Contact sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
    </div>
    </>
  );
};

export default PricingSection;