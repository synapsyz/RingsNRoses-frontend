'use client'; // This ensures client-side interactivity

import React from 'react'; // useState is no longer needed for modal, but kept for future if other state is needed
import Link from 'next/link'; // Kept in case you decide to use 'data.web_url' directly on the item later

// Helper function to format time (e.g., "2 hours ago")
const formatTimeAgo = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30.436875); // Average days in a month
  const years = Math.round(days / 365.25); // Average days in a year

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
};

// Helper function to determine icon based on notification type
const getNotificationIcon = (type) => {
  switch (type) {
    case 'message':
      return '💬'; // Speech bubble for messages
    // Add more cases for different notification types from your backend
    // case 'quote_request': return '📝';
    // case 'call_request': return '📞';
    // case 'booking_confirmed': return '✅';
    // case 'review': return '⭐';
    default:
      return '🔔'; // Default bell icon for unknown types
  }
};

const NotificationItem = ({ notification, onMarkAsRead, onDeleteNotification }) => { // onDeleteNotification added here
  const { id, title, body, created_at, is_read, data } = notification;

  // Derived display values
  const displayIcon = getNotificationIcon(data?.type);
  const displayMessage = title + (body ? `: ${body}` : ''); // Combine title and body
  const displayTime = formatTimeAgo(created_at);
  const isNew = !is_read; // Notification is new if not read

  const handleItemClick = () => {
    // This will still mark as read if it's a new notification when the list item is clicked
    if (isNew) {
      onMarkAsRead(id);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent the parent <li>'s onClick from firing
    if (window.confirm("Are you sure you want to delete this notification?")) {
      onDeleteNotification(id);
      // Removed: closeModal(); // This was from previous modal logic
    }
  };

  return (
    <li
      className={`relative flex items-center space-x-4 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 ${isNew ? 'bg-sky-50 dark:bg-sky-900/50' : 'bg-white dark:bg-neutral-900'}`}
      onClick={handleItemClick}
    >
      {/* Icon based on notification type */}
      <div className="flex-shrink-0 text-xl">
        {displayIcon}
      </div>

      {/* Notification content */}
      <div className="flex-1 min-w-0"> {/* min-w-0 to prevent overflow issues in flex */}
        <p className="text-sm text-stone-700 dark:text-neutral-400 truncate"> {/* truncate long messages */}
          {displayMessage}
        </p>
        <p className="mt-1.5 text-xs text-stone-500 dark:text-neutral-500">
          {displayTime}
        </p>
      </div>

      {/* Delete Button */}
      <div className="flex-shrink-0 flex items-center ml-4"> {/* ml-4 for spacing from content */}
        <button
          type="button"
          className="p-2 rounded-full text-red-600 hover:bg-red-50 hover:text-red-800 dark:text-red-400 dark:hover:bg-neutral-700 dark:hover:text-red-300 transition-colors"
          onClick={handleDeleteClick}
          title="Delete Notification"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
        </button>
      </div>

      {/* New Notification Indicator (if not read) */}
      {isNew && (
        <div className="absolute top-4 right-4 translate-x-1/2 -translate-y-1/2"> {/* Adjusted position */}
          <span className="flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-sky-500"></span>
          </span>
        </div>
      )}
    </li>
  );
};

export default NotificationItem;