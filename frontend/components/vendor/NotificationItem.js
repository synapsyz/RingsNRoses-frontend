import React from 'react';
import Link from 'next/link';

const NotificationItem = ({ notification }) => {
  const { id, icon, message, time, quote, isNew } = notification;

  return (
    <li className={`relative flex space-x-4 p-4 ${isNew ? 'bg-sky-50 dark:bg-sky-900/50' : 'bg-white dark:bg-neutral-900'}`}>
      {/* Icon */}
      <div className="flex-shrink-0 text-xl">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <Link href="#" className="block">
          <p className="text-sm text-stone-700 dark:text-neutral-400">
            {message}
          </p>
        </Link>
        {quote && (
          <p className="mt-2 p-2 text-sm text-stone-600 bg-stone-100 rounded-lg dark:bg-neutral-800 dark:text-neutral-300">
            "{quote}"
          </p>
        )}
        <p className="mt-1.5 text-xs text-stone-500 dark:text-neutral-500">
          {time}
        </p>
      </div>

      {/* New Notification Indicator */}
      {isNew && (
        <div className="absolute top-4 right-4">
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