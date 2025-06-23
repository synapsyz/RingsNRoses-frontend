// Add 'use client' at the top to mark this as a Client Component
'use client'; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// 1. Import the useRouter hook from next/navigation
import { useRouter } from 'next/navigation'; 

import { useSession, signOut } from 'next-auth/react';


const dummyUser = {
  name: 'James Collison',
  avatar: 'https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80',
};

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
  // 2. Initialize router and state for loading feedback
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const handleToggleChange = (e) => {
    setIsDarkMode(e.target.checked);
  };

  // 3. Create the sign-out handler function
const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      // 1. Tell the server to clear the session.
      const response =     await signOut({ redirect: false }); // Using await if signOut returns a Promise
      

      if (response.ok) {
        // 2. Refresh the UI to reflect the unauthenticated state.
        router.refresh(); 

        // 3. Redirect to the new vendor login page.
        router.push('/vendor/login'); // MODIFIED
        
      } else {
        console.error('Sign out failed');
      }
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
            src={dummyUser.avatar}
            alt={`${dummyUser.name}'s avatar`}
            width={38}
            height={38}
          />
          <span className="grow hidden lg:block">
            <span className="text-sm font-medium">{dummyUser.name}</span>
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
          <div className="px-5 py-3.5 border-y border-stone-200 dark:border-neutral-800">
            <div className="flex flex-wrap justify-between items-center">
              <label htmlFor="dark-mode-toggle" className="flex-1 cursor-pointer text-sm text-stone-800 dark:text-neutral-300">Dark mode</label>
              <label htmlFor="dark-mode-toggle" className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  data-hs-theme-switch
                  type="checkbox"
                  id="dark-mode-toggle"
                  className="peer sr-only"
                  checked={isDarkMode}
                  onChange={handleToggleChange}
                />
                <span className="absolute inset-0 bg-stone-200 rounded-full transition-colors peer-checked:bg-green-600 dark:bg-neutral-700 dark:peer-checked:bg-green-500"></span>
                <span className="absolute top-3/4 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
              </label>
            </div>
          </div>

          {/* Sign Out */}
          <div className="p-1">
            {/* 6. Changed Link to a button and attached the handler */}
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