import { useState } from "react";

const FavoriteButton = ({ initialFavorite = false, onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [animate, setAnimate] = useState(false);

  const toggleFavorite = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);

    // Optional callback for parent component
    if (onToggle) onToggle(newValue);

    // Animate once on favoriting
    if (!isFavorite) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className="flex shrink-0 justify-center items-center size-10 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
    >
      <span className="sr-only">Favorite</span>
      <svg
        className={`shrink-0 size-4 transform transition-all duration-500 ease-in-out 
          ${isFavorite ? "scale-125 text-red-500 opacity-100" : "scale-100 text-gray-500 opacity-80"} 
          ${animate ? "animate-bounce" : ""}
        `}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorite ? "red" : "none"}
        stroke={isFavorite ? "red" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
