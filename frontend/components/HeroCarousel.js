"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const HeroCarousel = () => {
  const [heroSections, setHeroSections] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/hero-sections/")
      .then((response) => setHeroSections(response.data.results))
      .catch((error) => console.error("Error fetching hero sections:", error));
  }, []);

  return (
    <div className="py-4 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <div
        data-hs-carousel='{"isInfiniteLoop": true}'
        className="relative hs-carousel overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800 h-96"
        style={{ height: "40rem" }}
      >
        <div className="hs-carousel-body absolute top-0 bottom-0 left-0 flex flex-nowrap transition-transform duration-700 opacity-0">
          {heroSections.map((section, index) => (
            <div className="hs-carousel-slide" key={section.id}>
              <a
                className="relative block h-96 rounded-xl"
                style={{ height: "40rem" }}
                href={section.button_link || "#"}
              >
                {section.image_urls.length > 1 ? (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 items-center gap-5"
                    style={{
                      background: "#064e3b",
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

                    <div className="h-120 lg:h-160 grid grid-cols-2 gap-3 sm:gap-5 -rotate-12">
                      {section.image_urls.map((img, idx) => (
                        <div
                          className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900"
                          key={idx}
                        >
                          <img
                            className="size-full object-cover rounded-xl lg:rounded-2xl"
                            src={img}
                            alt="Product Image"
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
                      alt="Hero Image"
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
                            style={{ backgroundColor: "#E91E63" }}
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
          className="hs-carousel-prev absolute top-1/2 left-2 transform -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button
          type="button"
          className="hs-carousel-next absolute top-1/2 right-2 transform -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
