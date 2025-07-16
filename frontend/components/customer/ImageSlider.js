import React from 'react';

const ImageSlider = ({ data }) => {
  // Ensure data and data.images exist before rendering
  if (!data || !data.images || data.images.length === 0) {
    return <div className="text-center text-gray-500 dark:text-gray-400">No images to display.</div>;
  }

  return (
    <div
      data-hs-carousel='{
        "loadingClasses": "opacity-0",
        "isInfiniteLoop": true,
        "isAutoPlay": true,
        "autoPlayInterval": 3000
      }'
      className="relative"
    >
      <div className="hs-carousel flex flex-col sm:flex-row gap-3 sm:gap-5 h-[722px]">
        {/* Thumbnails */}
        <div className="flex-none order-2 sm:order-1">
          <div
            className="
              hs-carousel-pagination
              flex flex-row sm:flex-col
              flex-nowrap
              overflow-x-auto sm:overflow-y-auto
              gap-3
              pb-1.5 sm:pb-0
              sm:h-[700px]

              // --- Scrollbar Styling (already responsive!) ---
              [&::-webkit-scrollbar]:h-1
              sm:[&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              dark:[&::-webkit-scrollbar-track]:bg-neutral-700
              dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
            "
          >
            {data.images.map((src, index) => (
              <div
                key={src.id || index} 
                className="hs-carousel-pagination-item relative shrink-0 size-20 rounded-md sm:rounded-lg overflow-hidden cursor-pointer after:absolute after:inset-0 after:size-full after:rounded-md sm:after:rounded-lg border border-transparent hs-carousel-active:border-gray-800 hs-carousel-active:after:bg-black/10 dark:hs-carousel-active:border-white dark:border-neutral-800"
              >
                <img
                  className="bg-gray-100 size-full object-cover rounded-md sm:rounded-lg dark:bg-neutral-800"
                  src={src.image_url}
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* End Thumbnails */}

        {/* Preview */}
        <div className="relative group grow overflow-hidden h-full order-1 sm:order-2 bg-gray-100 rounded-lg dark:bg-neutral-800">
          {/* Carousel Body */}
          <div className="hs-carousel-body absolute inset-y-0 start-0 flex flex-nowrap opacity-0 w-full h-full">
            <div className="flex transition-transform duration-700 ease-in-out w-full h-full">
              {data.images.map((src, index) => (
                <div
                  key={src.id || index} // Using src.id if available, otherwise fallback to index
                  className="hs-carousel-slide flex-shrink-0 w-full h-full"
                  data-hs-carousel-slide
                >
                  <img
                    src={src.image_url}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Nav Buttons */}
          <button
            type="button"
            className="hs-carousel-prev group-hover:opacity-100 opacity-0 absolute top-1/2 left-2 z-10 inline-flex justify-center items-center size-10 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 -translate-y-1/2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            <span className="sr-only">Previous</span>
          </button>

          <button
            type="button"
            className="hs-carousel-next group-hover:opacity-100 opacity-0 absolute top-1/2 right-2 z-10 inline-flex justify-center items-center size-10 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 -translate-y-1/2 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        {/* End Preview */}
      </div>
    </div>
  );
};

export default ImageSlider;