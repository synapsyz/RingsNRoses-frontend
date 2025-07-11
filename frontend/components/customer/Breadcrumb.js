import React from 'react';

const Breadcrumb = ({ data }) => {
  return (
    <div className="-ms-1.5 pb-3">
      <ol className="flex items-center whitespace-nowrap">
        <li className="flex items-center">
          <p
            className="py-0.5 px-1.5 flex items-center gap-x-1 text-sm rounded-md text-gray-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href="listing.html"
          >
            {data?.subcategory_details?.category?.name}
          </p>
          <svg
            className="shrink-0 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 13L10 3"
              stroke="currentColor"
              strokeLinecap="round"
            ></path>
          </svg>
        </li>
        <li className="flex items-center truncate">
          <a
            className="py-0.5 px-1.5 flex items-center truncate gap-x-1 text-sm truncate rounded-md text-gray-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href={`/${data?.subcategory_details?.category?.name.toLowerCase().replace(/[\s-/]+/g, '_')}/${data?.subcategory_details?.name.toLowerCase().replace(/[\s-/]+/g, '_')}`}
          >
            <span className="truncate">
              {" "}
              {data?.subcategory_details?.name}
            </span>
          </a>
          <svg
            className="shrink-0 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 13L10 3"
              stroke="currentColor"
              strokeLinecap="round"
            ></path>
          </svg>
        </li>
        <li className="ps-1.5 flex items-center truncate font-semibold text-gray-800 dark:text-neutral-200 text-sm truncate">
          <span className="truncate">{data?.name}</span>
        </li>
      </ol>
    </div>
  );
};

export default Breadcrumb;