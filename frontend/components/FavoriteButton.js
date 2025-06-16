import { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { useSession } from 'next-auth/react';
const FavoriteButton = ({
  initialFavorite = false,
  contentType,
  objectId,
  fav_id,
}) => {
  const { data: session, status, update } = useSession();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [favId, setFavId] = useState(fav_id);
  const accessToken = session?.accessToken;
  const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;

  // Sync state if the initial prop changes from the parent
  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleFavoriteToggle = async () => {
    if (isLoading || !objectId) return; // Prevent clicks if loading or no ID is present

    setIsLoading(true);
    const isFavoriting = !isFavorite; // The new state we want to achieve

    // Optimistically update the UI
    setIsFavorite(isFavoriting);

    // Animate only when adding a favorite
    if (isFavoriting) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
      },
    };


    var res = null;

    try {
      if (isFavoriting) {
        // === ADDING a favorite ===
        const payload = {
          content_type: contentType,
          object_id: objectId,
        };
        res = await axios.post(
          "https://6d88-183-82-206-189.ngrok-free.app/api/v1/favorites/",
          payload,
          config
        );
        setFavId(res.data.id);
        console.log(res.data.id);
        console.log("Item favorited successfully!");
      } else {
        // === REMOVING a favorite ===
        // The objectId is now in the URL for the DELETE request
        await axios.delete(
          `https://6d88-183-82-206-189.ngrok-free.app/api/v1/favorites/${favId}/`,
          config,
        );
        console.log("Item unfavorited successfully!");
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      // If the API call fails, revert the button to its previous state
      setIsFavorite(!isFavoriting);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFavoriteToggle}
      disabled={isLoading}
      className="flex shrink-0 justify-center items-center size-10 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
    >
      <span className="sr-only">Favorite</span>
      <svg
        className={`shrink-0 size-4 transform transition-all duration-500 ease-in-out 
          ${isFavorite ? "scale-125 text-red-500" : "scale-100 text-gray-500"} 
          ${animate ? "animate-bounce" : ""}`}
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