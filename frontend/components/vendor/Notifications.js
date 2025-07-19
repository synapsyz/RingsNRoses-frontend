'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import NotificationItem from './NotificationItem';
import { useSession } from "next-auth/react";
import axios from "axios";

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

const Notifications = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/notifications/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setNotifications(response.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]); // Memoize the function

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]); // Depend on the memoized function

  const handleMarkAsRead = async (notificationId) => {
    if (!accessToken) {
      console.warn("User not authenticated. Cannot mark notification as read.");
      return;
    }
    try {
      await api.post('/notifications/', { notification_id: notificationId }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`Notification ${notificationId} marked as read.`);
      // Optimistically update the UI or refetch
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (err) {
      console.error(`Failed to mark notification ${notificationId} as read:`, err);
      alert("Failed to mark notification as read. Please try again.");
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    if (!accessToken) {
      console.warn("User not authenticated. Cannot delete notification.");
      return;
    }
    try {
      await api.delete('/notifications/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { // DELETE requests typically send body in 'data' field for axios
          notification_id: notificationId
        }
      });
      console.log(`Notification ${notificationId} deleted.`);
      // Remove the deleted notification from the state
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (err) {
      console.error(`Failed to delete notification ${notificationId}:`, err);
      alert("Failed to delete notification. Please try again.");
    }
  };
  // Calculate unread count for the bell icon if needed
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="hs-dropdown relative inline-flex">
      {/* 1. NOTIFICATION TRIGGER BUTTON */}
      <button
        id="hs-pro-dnnd"
        type="button"
        className="relative hs-dropdown-toggle shrink-0 inline-flex justify-center items-center size-9.5 text-sm font-semibold rounded-full border border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-3 right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
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
        </div>

        {/* Tab Content for "All" */}
        <div id="hs-pro-tabs-dnn-all" role="tabpanel" aria-labelledby="hs-pro-tabs-dnn-item-all">
          <div className="h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700">
            <ul className="divide-y divide-stone-200 dark:divide-neutral-800">
              {loading && <li className="p-4 text-center text-gray-500 dark:text-neutral-400">Loading notifications...</li>}
              {error && <li className="p-4 text-center text-red-500">{error}</li>}
              {!loading && !error && notifications.length === 0 && (
                <li className="p-4 text-center text-gray-500 dark:text-neutral-400">No new notifications.</li>
              )}
              
              {/* DYNAMIC LIST RENDERED FROM FETCHED DATA */}
              {!loading && !error && notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead} // Pass down the mark as read handler
                  onDeleteNotification={handleDeleteNotification}
                />
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notifications;