// components/CategoryItemCard.jsx
import React from 'react';

const CategoryItemCard = ({ item }) => {
  return (
    <div key={item.id} className="h-full flex flex-col">
      <div className="group relative">
        <a href={item.detail_url} className="block relative w-full h-48 md:h-64 overflow-hidden rounded-xl">
          <img
            src={item.images?.[0] || 'https://i0.wp.com/suessmoments.com/wp-content/uploads/sites/10014/2023/02/website-shadowbrook-nj-wedding-photos-7153-photography-by-SUESS-MOMENTS.jpg?ssl=1'}
            alt={item.name}
            className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
          />
        </a>
         <div className="absolute top-0 end-0 z-3 pt-2 pe-2">
                          <button
                            type="button"
                            className="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden"
                          >
                            <svg
                              className="shrink-0 size-3.5"
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
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            <span className="sr-only">Add to favorites</span>
                          </button>
                        </div>
      </div>

      <div className="pt-3">
        <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
          {item.name}
          <br />
          <span className="text-xs text-gray-500 dark:text-neutral-500">

            {item.location.name || 'Unknown'}
          </span>
        </h4>

        <div className="mt-1 flex items-center gap-1 gap-x-1">
        <span
            className="font-semibold"
            style={{ color: '#E91E63' }}
            >
            From ₹{item.per_plate_price || item.price}
          </span>

          <div className="ms-auto flex items-center gap-x-1 text-sm text-gray-500 dark:text-neutral-500">
            <span>{item.guest_capacity || " "}</span>
            
            <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
        </div>

         <div className="mt-2 flex items-center gap-x-0.5">
                          <svg
                            className="shrink-0 size-3 text-gray-800 dark:text-neutral-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          <svg
                            className="shrink-0 size-3 text-gray-800 dark:text-neutral-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          <svg
                            className="shrink-0 size-3 text-gray-800 dark:text-neutral-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          <svg
                            className="shrink-0 size-3 text-gray-800 dark:text-neutral-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          <svg
                            className="shrink-0 size-3 text-gray-800 dark:text-neutral-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                          </svg>
                          <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">(4k+)</span>
                        </div>

        <div className="mt-auto pt-3">
          <button
            type="button"
            className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
          >
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};


export default CategoryItemCard;

