import Link from 'next/link';

const FloatingAIChatButton = () => {
  return (
    // The className and other props are moved from the <a> tag to the <Link> component
    <Link 
      href="/ai" // Changed back to /ai-planner as per previous context
      className="group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
        
        {/* Chat Icon SVG (No changes here) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>

        {/* Tooltip that appears on hover (No changes here) */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 whitespace-nowrap rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 dark:bg-slate-700">
          Click me to chat with Rosy, your AI planner!
          {/* Tooltip Arrow */}
          <div className="absolute left-full top-1/2 -ml-1 h-2 w-2 rotate-45 transform bg-slate-900 dark:bg-slate-700"></div>
        </div>
    </Link>
  );
};

export default FloatingAIChatButton;