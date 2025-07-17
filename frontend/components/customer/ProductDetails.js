'use client'; // This is a client component because it uses hooks and event listeners

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios"; // Import axios
import FavoriteButton from "@/components/FavoriteButton";
import CallButton from "./CallButton"; // Ensure this path is correct for your CallButton component

// Define API base URL and Ngrok header
const api_url =
  process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;

const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;

const api = axios.create({
  baseURL: api_url + "/api/v1",
  headers: {
    ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
  },
});

const ProductDetails = ({ content, data, onShowContactModal }) => {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const [currentDate, setCurrentDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const user = session?.user;

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
    // Set selectedDate to user's event_date or today's date if not available
    setSelectedDate(user?.customer_profile?.event_date || formattedDate);
  }, [user]); // Re-run if user data changes

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  /**
   * Generic function to increment a specific stat for the venue's vendor.
   * @param {string} statType - The type of stat to increment (e.g., 'call_request', 'quote_request').
   */
  const incrementVendorStat = async (statType) => {
    if (!data?.id) {
      console.error(`Venue ID not available to increment ${statType} stat.`);
      return false; // Indicate failure
    }
    if (!accessToken) {
        console.warn(`User not authenticated. Cannot increment ${statType} stat.`);
        // You might want to prompt login here
        return false; // Indicate failure
    }

    try {
      const response = await api.post(
        `/venues/${data.id}/increment-stat/`, // Your custom action endpoint
        { stat_type: statType }, // Send the stat type in the body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authenticated request
          },
        }
      );
      console.log(`${statType} stat incremented:`, response.data);
      // Optional: Add a success toast notification here
      return true; // Indicate success
    } catch (error) {
      console.error(`Failed to increment ${statType} stat:`, error.response?.data || error.message);
      // Optional: Add an error toast notification here
      return false; // Indicate failure
    }
  };

  const handleCallButtonClick = async () => {
    // Attempt to increment the call_request stat
    await incrementVendorStat('call_request');
    // Always proceed with showing the contact modal
    onShowContactModal();
  };

  const handleRequestPricingClick = async () => {
    // Attempt to increment the quote_request stat
    const success = await incrementVendorStat('quote_request');
    
    if (success) {
        // Only if stat incremented successfully, or if it's not critical, you can proceed
        // with pricing request specific logic here.
        console.log("Proceeding with request pricing logic...");
        // This is where you'd typically send the actual quote request
        // based on selectedDate and other form data.
        alert(`Requesting pricing for date: ${selectedDate}. Check console for stat update.`);
    } else {
        alert("Failed to send pricing request due to an error. Please try again.");
    }
  };

  return (
    <div className="lg:ps-12 h-full flex flex-col">
      <h1 className="font-semibold text-2xl text-gray-800 dark:text-neutral-200">
        {data?.name}
      </h1>
      <div className="mt-2 flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-gray-800 dark:text-neutral-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <a href="#" className="text-blue-600 hover:underline">
          {data?.location_details?.name},{" "}
          {data?.location_details?.district_name}
        </a>
      </div>
      <div className="mt-3">
        <a
          className="inline-block font-medium text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-emerald-500 dark:focus:text-emerald-500"
          href="#reviews"
        >
          <ul className="flex flex-wrap items-center gap-2">
            <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
              <div className="flex flex-wrap items-center">
                <span className="me-1">4.9</span>
                <div className="inline-flex items-center gap-x-0.5">
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"></path>
                  </svg>
                </div>
              </div>
            </li>
            <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
              112 reviews
            </li>
          </ul>
        </a>
      </div>
      <div className="mt-5">
        <span className="mb-2 block font-medium text-sm text-gray-800 dark:text-neutral-200">
          Promotions:
        </span>
        <div className="grid grid-cols-2 gap-2">
          <label
            htmlFor="hs-pro-shmfdsr-pro"
            className="group relative overflow-hidden flex items-center gap-2 p-2 text-sm bg-white text-gray-800 border border-gray-200 cursor-pointer rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200
                             has-checked:text-emerald-600 dark:has-checked:text-emerald-500
                             has-checked:border-emerald-600 dark:has-checked:border-emerald-500
                             has-checked:ring-1
                             has-checked:ring-emerald-600 dark:has-checked:ring-emerald-500
                             has-disabled:pointer-events-none
                             has-disabled:text-gray-200 dark:has-disabled:text-neutral-700
                             has-disabled:after:absolute
                             has-disabled:after:inset-0
                             has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-gray-200)_calc(50%-1px),var(--color-gray-200)_50%,transparent_50%)]
                             dark:has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-neutral-700)_calc(50%-1px),var(--color-neutral-700)_50%,transparent_50%)] "
          >
            <input
              type="radio"
              id="hs-pro-shmfdsr-pro"
              className="hidden bg-transparent border-gray-200 text-emerald-600 focus:ring-white focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-900"
              name="hs-pro-shmfdsr"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-gray-800 dark:text-neutral-200 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>

            <span className="grow truncate">
              <span className="block font-semibold truncate">
                Early Booking Discount
              </span>
              <span className="block">-₹9999</span>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-5 h-full">
        <div className="lg:sticky lg:top-4 space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
            <div className="p-5">
              <div className="flex flex-wrap justify-between items-center gap-1">
                <div className="grow">
                  <span className="font-semibold text-3xl text-gray-800 dark:text-neutral-200">
                    {data?.starting_price}
                    <span className="text-xl">INR</span>
                  </span>
                </div>
                <div>
                  <FavoriteButton
                    initialFavorite={data?.favorite_details?.is_favorite}
                    contentType={data?.favorite_details?.content_type}
                    objectId={data?.id}
                    fav_id={data?.favorite_details?.id}
                    accessToken={accessToken}
                  />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2.5">
                    <span className="text-l text-gray-800 dark:text-neutral-200">
                      Date:
                    </span>
                  </div>
                  <input
                    type="date"
                    style={{ width: "215px" }}
                    className="py-2 ps-20 pe-8 inline-block border-gray-200 rounded-full text-sm text-gray-800 cursor-pointer hover:bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    min={currentDate}
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                {/* Request Pricing Button */}
                <button
                  type="button"
                  className="w-3/4 py-3 px-4 inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-transparent bg-[#E91E63] text-white hover:bg-[#C2185B] disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-[#C2185B] dark:bg-[#E91E63] dark:hover:bg-[#C2185B] dark:focus:bg-[#C2185B]"
                  onClick={handleRequestPricingClick} // Added onClick handler
                >
                  Request Pricing
                </button>
                {/* Call Button */}
                <CallButton onCallClick={handleCallButtonClick} /> {/* Integrated CallButton */}
              </div>
            </div>
            <div className="p-5 divide-y divide-gray-200 dark:divide-neutral-700">
              <div className="py-4 first:pt-0 last:pb-0 flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 36 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-12 text-gray-800 dark:text-neutral-200 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>

                <div className="grow">
                  <h2 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    {data?.guest_capacity}
                  </h2>

                  <div className="mt-1.5">
                    <p className="text-sm text-gray-800 dark:text-neutral-200">
                      {content}
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-4 first:pt-0 last:pb-0 flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="text-gray-800 dark:text-neutral-200"
                  fill="currentColor"
                >
                  <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
                </svg>

                <div className="grow">
                  <h2 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    5 Last Month Bookings
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;