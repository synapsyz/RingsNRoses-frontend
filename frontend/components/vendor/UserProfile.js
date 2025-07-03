// Add 'use client' at the top to mark this as a Client Component
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// 1. Import the useRouter hook from next/navigation
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const menuItems = [
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    href: '/account',
    label: 'My account',
    icon: (
        <svg className="shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

const UserProfile = () => {
  // Move useSession and dependent variables inside the component
  const { data: session, status } = useSession(); //
  let User_name = '';
  const full_name = session?.user?.name;

  if (full_name) {
    if (full_name.length <= 10) {
      User_name = full_name;
    } else {
      const firstTenChars = full_name.substring(0, 10);
      const firstSpaceIndex = firstTenChars.indexOf(' ');

      if (firstSpaceIndex === -1) {
        // No space in the first 10 characters, truncate at 10
        User_name = firstTenChars;
      } else if (firstSpaceIndex === 1) {
        // Space at the second character, look for the next space or truncate at 10
        const remainingForCheck = full_name.substring(2, 11); // Check up to 11th char (index 10) to include possible space at 10th index
        const nextSpaceIndex = remainingForCheck.indexOf(' ');
        if (nextSpaceIndex !== -1) {
          // Found another space
          User_name = full_name.substring(0, 2 + nextSpaceIndex);
        } else {
          // No other space found within limit, truncate at 10
          User_name = firstTenChars;
        }
      } else {
        // Space found at an index > 1 and <= 9, truncate at that space
        User_name = full_name.substring(0, firstSpaceIndex);
      }
    }
  }
  const User = { //
    name: User_name,
    avatar: session?.user?.profile_picture ||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyszLF_MDtMtg9lz8gpFb94amfo9qOeOqZeg&s',
  };


  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }  }, []);

  const handleToggleChange = (e) => {
    setIsDarkMode(e.target.checked);
     const enabled = e.target.checked;
    setIsDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ redirect: true, callbackUrl: '/vendor/login' }); //
    } catch (error) {
      console.error('An error occurred during sign out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="h-9.5">
      {/* Account Trigger */}
      <div className="hs-dropdown [--placement:top-right] [--strategy:absolute] [--auto-close:inside] relative inline-flex">
        <button type="button" className="inline-flex shrink-0 items-center gap-x-1.5 text-start text-stone-800 rounded-full hover:text-stone-600">
          <Image
            className="shrink-0 size-9.5 lg:size-9.5 rounded-full"
            src={User.avatar}
            alt={`${User.name}'s avatar`}
            width={38}
            height={38}
          />
          <span className="grow hidden lg:block">
            <span className="text-sm font-medium">{User.name}</span>
          </span>
        </button>

        {/* Account Dropdown */}
        <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-xl dark:bg-neutral-900">
          <div className="p-1">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Dark Mode Toggle */}
<div className="px-4 py-3 border-y border-stone-200 dark:border-neutral-800">
  <div className="flex justify-between items-center">
    <span className="text-sm text-stone-800 dark:text-neutral-300">Dark mode</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isDarkMode}
        onChange={handleToggleChange}
      />
      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 dark:bg-neutral-700 dark:peer-checked:bg-green-500" />
    </label>
  </div>
</div>

          {/* Sign Out */}
          <div className="p-1">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {isSigningOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;