const SocialMediaLinks =({data})=>{
    return(
        <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 p-2 bg-white dark:bg-neutral-800 shadow-lg rounded-l-lg z-50">
        {data?.website_link && (
          <a
            href={data.website_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500"
          >
            <svg
              className="flex-shrink-0 size-6"
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </a>
        )}

        {data?.instagram_link && (
          <a
            href={data.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500"
          >
            <svg
              className="flex-shrink-0 size-6"
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
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
            </svg>
          </a>
        )}

        {data?.facebook_link && (
          <a
            href={data.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500"
          >
            <svg
              className="flex-shrink-0 size-6"
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
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        )}
      </div>
    )
}
export default SocialMediaLinks;