import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from 'next-auth/react';
const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
const api_url = getApiUrl();
const api = axios.create(
  {
    baseURL: api_url + "/api/v1",
    headers: { 
      ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
    },
  }
);

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

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleFavoriteToggle = async () => {
    if (isLoading || !objectId) return;

    setIsLoading(true);
    const isFavoriting = !isFavorite;

    setIsFavorite(isFavoriting);

    if (isFavoriting) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      if (isFavoriting) {
        const payload = {
          content_type: contentType,
          object_id: objectId,
        };
        const res = await api.post(
          "/favorites/",
          payload,
          config
        );
        setFavId(res.data.id);
        console.log(res.data.id);
        console.log("Item favorited successfully!");
      } else {
        await api.delete(
          `/favorites/${favId}/`, 
          config,
        );
        console.log("Item unfavorited successfully!");
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
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