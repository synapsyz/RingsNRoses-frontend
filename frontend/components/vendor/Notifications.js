import React from 'react';
import Link from 'next/link';
import NotificationItem from './NotificationItem'; // Import the new item component

// Dummy data array - later, you'll fetch this from your API
const venueOwnerNotifications = [
  {
    id: 1,
    icon: "💬",
    message: "Received a quote request from Lavanya for a wedding reception.",
    time: "2 hours ago",
    isNew: true,
  },
  {
    id: 2,
    icon: "📞",
    message: "10+ people called you today. Tap to see the call log.",
    time: "Latest call: 15 minutes ago",
    isNew: true,
  },
  {
    id: 3,
    icon: "✅",
    message: "Your booking for 'Sharma's Birthday Party' is confirmed for this Saturday.",
    time: "1 day ago",
    isNew: false,
  },
  {
    id: 4,
    icon: "⭐",
    message: "You have a new 5-star review from Rajesh K.",
    quote: "The venue was absolutely perfect for our event. The staff was incredibly helpful!",
    time: "2 days ago",
    isNew: false,
  },
  {
    id: 5,
    icon: "❓",
    message: "Priya sent a new inquiry regarding hall availability for a corporate event.",
    time: "3 days ago",
    isNew: false,
  },
  {
    id: 6,
    icon: "📅",
    message: "Reminder: Site visit scheduled with 'Anjali & Rohan' tomorrow at 11:00 AM.",
    time: "Upcoming",
    isNew: true,
  }
];

const Notifications = () => {
  return (
    <div className="hs-dropdown relative inline-flex">
      {/* 1. NOTIFICATION TRIGGER BUTTON */}
      <button
        id="hs-pro-dnnd"
        type="button"
        className="hs-dropdown-toggle shrink-0 inline-flex justify-center items-center size-9.5 text-sm font-semibold rounded-full border border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </button>

      {/* 2. NOTIFICATION DROPDOWN PANEL */}
      <div
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-full sm:w-96 transition-[opacity,margin] duration opacity-0 hidden z-30 bg-white sm:rounded-lg shadow-md sm:shadow-xl dark:bg-neutral-900"
        aria-labelledby="hs-pro-dnnd"
      >
        {/* Panel Header */}
        <div className="px-5 pt-3 flex justify-between items-center border-b dark:border-neutral-800">
          <h3 className="font-semibold text-stone-800 dark:text-white">
            Notifications
          </h3>
          {/* You can add settings or other controls here */}
        </div>

        {/* Tab Content for "All" */}
        <div id="hs-pro-tabs-dnn-all" role="tabpanel" aria-labelledby="hs-pro-tabs-dnn-item-all">
          <div className="h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700">
            <ul className="divide-y divide-stone-200 dark:divide-neutral-800">

              {/* DYNAMIC LIST RENDERED FROM DATA */}
              {venueOwnerNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
              
            </ul>
          </div>
          {/* Panel Footer */}
          <div className="text-center py-2 border-t dark:border-neutral-800">
             <Link href="#" className="inline-flex items-center gap-x-2 text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-500 dark:hover:text-sky-400">
                Mark all as read
            </Link>
          </div>
        </div>

        {/* Tab Content for "Archived" can be added here if needed */}
        
      </div>
    </div>
  );
};

export default Notifications;