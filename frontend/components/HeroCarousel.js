"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const HeroCarousel = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Optional: for loading state

  let api_url;
  let isNgrok
  isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development'
      ? false
      : true
  const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_APP_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_LOCALHOST
      : process.env.NEXT_PUBLIC_HOST;
  };
  api_url = getApiUrl()

  useEffect(() => {
    setIsLoading(true);
    console.log(api_url+"/api/v1/hero-sections/")
    axios
      axios
      .get(`${api_url}/api/v1/hero-sections/`, {
        headers: {
          ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
        },
      })
      .then((response) => {
        // Ensure you're getting an array, default to empty array if not
        setHeroSections(response.data?.results || response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching hero sections:", error);
        setHeroSections([]); // Clear or set error state
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Fetch data once on component mount

  useEffect(() => {
    const initializePreline = async () => {
      if (typeof window !== "undefined" && heroSections.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // 50-100ms

        if (window.HSStaticMethods?.autoInit) {
          // console.log("Initializing Preline components via HSStaticMethods.autoInit()");
          window.HSStaticMethods.autoInit();
          // Or more targeted: window.HSStaticMethods.autoInit(['HSCarousel']);
        } else if (window.HSCarousel?.autoInit) {
          // console.log("Initializing Preline components via HSCarousel.autoInit()");
          window.HSCarousel.autoInit();
        } else {
          // console.warn("Preline autoInit methods not found. Ensure Preline JS is loaded.");
        }
      }
    };

    if (!isLoading) {
      initializePreline();
    }
  }, [heroSections, isLoading]);


  if (isLoading) {
    return (
      <div className="py-4 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto text-center" style={{ height: "40rem" }}>
        <p>Loading Carousel...</p>
      </div>
    );
  }

  if (!heroSections.length) {
    return (
      <div className="py-4 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto text-center" style={{ height: "40rem" }}>
        <p>No hero sections to display.</p>
      </div>
    );
  }

  return (
    <div className="py-4 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <div
        data-hs-carousel='{"isInfiniteLoop": true}'
        className="relative hs-carousel overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800"
        style={{ height: "40rem" }}
      >
        <div className="hs-carousel-body absolute top-0 bottom-0 left-0 flex flex-nowrap transition-transform duration-700 opacity-0">
          {heroSections.map((section) => (
            <div className="hs-carousel-slide" key={section.id}>
              <a
                className="relative block rounded-xl"
                style={{ height: "40rem" }}
                href={section.button_link || "#"}
              >
                {section.image_urls.length > 1 ? (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 items-center gap-5"
                    style={{
                      background: "#064e3b", // Consider Tailwind class e.g., bg-emerald-900
                      height: "40rem",
                    }}
                  >
                    <div className="p-12 sm:p-16 md:ps-20 md:pe-0 max-w-xl">
                      <span className="block font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-white">
                        {section.subheading}
                      </span>
                      <span className="block font-bold uppercase text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white">
                        {section.heading}
                      </span>
                      <div className="mt-10 md:mt-20">
                        <div className="mt-3 md:mt-5">
                          <span className="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full">
                            {section.button_text}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-auto md:h-full grid grid-cols-2 gap-3 sm:gap-5 md:-rotate-12 p-4 md:p-0">
                      {section.image_urls.map((imgUrl, idx) => (
                        <div
                          className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900"
                          key={imgUrl || idx} // Use image URL as key if unique
                        >
                          <img
                            className="size-full object-cover rounded-xl lg:rounded-2xl"
                            src={imgUrl}
                            alt={`${section.heading || 'Product Image'} ${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      src={section.image_urls[0]}
                      alt={section.heading || section.subheading || "Hero Background"}
                    />
                    <div className="relative z-10 text-center w-full h-full max-w-lg mx-auto px-12 flex flex-col justify-center items-center">
                      <div className="bg-black/40 rounded-xl p-6">
                        <p className="text-sm md:text-base uppercase text-white">
                          {section.subheading}
                        </p>
                        <h2 className="mt-2 font-semibold text-2xl sm:text-2xl lg:text-4xl text-white">
                          {section.heading}
                        </h2>
                        <div className="mt-7">
                          <span
                            className="py-2 px-3 font-semibold text-sm text-gray-800 rounded-full"
                            style={{ backgroundColor: "#E91E63" }} // Consider Tailwind class e.g. bg-pink-600
                          >
                            {section.button_text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </a>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-white hover:bg-white/10 rounded-s-xl"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg className="flex-shrink-0 size-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          className="hs-carousel-next hs-carousel-disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-white hover:bg-white/10 rounded-e-xl"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="flex-shrink-0 size-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;