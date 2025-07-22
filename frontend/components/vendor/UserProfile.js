// Add 'use client' at the top to mark this as a Client Component
'use client';
import { useSession, signOut } from 'next-auth/react';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Menu items remain the same
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
    const router = useRouter();

    // ## 1. State to hold all our user data ##
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const { data: session, status } = useSession();
    const user = session?.user;

    // ## 2. Load user data from sessionStorage ONCE on component mount ##
    useEffect(() => {
        const storedDataString = sessionStorage.getItem('session');
        if (storedDataString) {
            try {
                const storedData = JSON.parse(storedDataString);
                // We set the 'user' object from our session into the state
                setUser(storedData.user); 
            } catch (error) {
                console.error("Error parsing user session data:", error);
            }
        }
    }, []); // Empty array `[]` ensures this runs only once

    // Effect for handling dark mode theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const handleToggleChange = (e) => {
        const enabled = e.target.checked;
        setIsDarkMode(enabled);
        localStorage.setItem('theme', enabled ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', enabled);
    };

    // ## 3. Sign out by clearing local/session storage and redirecting ##
    const handleSignOut = async () => {
        setIsSigningOut(true);
        // Clear all session and token data
        sessionStorage.removeItem('session');
        localStorage.removeItem('token'); // From your login component
        // Redirect to the login page
        router.push('/vendor/login');
    };

    // ## 4. Show a loading state or nothing while user data is being loaded ##
    if (!user) {
        // You can return a loading skeleton here for better UX
        return <div className="h-9.5 w-24 animate-pulse bg-gray-200 rounded-full dark:bg-neutral-700"></div>;
    }

    // ## 5. Use the 'user' state object directly in your JSX ##
    // We get the first name for a cleaner display
    const displayName = user.name ? user.name.split(' ')[0] : 'User';

    return (
        <div className="h-9.5">
            <div className="hs-dropdown [--placement:top-right] [--strategy:absolute] [--auto-close:inside] relative inline-flex">
                <button type="button" className="inline-flex shrink-0 items-center gap-x-1.5 text-start text-stone-800 rounded-full hover:text-stone-600">
                    <Image
                        className="shrink-0 size-9.5 lg:size-9.5 rounded-full"
                        src={user.profile_picture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyszLF_MDtMtg9lz8gpFb94amfo9qOeOqZeg&s'}
                        alt={`${displayName}'s avatar`}
                        width={38}
                        height={38}
                    />
                    <span className="grow hidden lg:block">
                        <span className="text-sm font-medium">{displayName}</span>
                    </span>
                </button>

                <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-xl dark:bg-neutral-900">
                    {/* Display full name and email in the dropdown */}
                    <div className="p-4">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-stone-500">{user.email}</p>
                    </div>
                    <div className="border-t border-stone-200 dark:border-neutral-800"></div>
                    
                    <div className="p-1">
                        {menuItems.map((item) => (
                            <Link key={item.label} href={item.href} className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="px-4 py-3 border-y border-stone-200 dark:border-neutral-800">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-stone-800 dark:text-neutral-300">Dark mode</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={handleToggleChange} />
                                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 dark:bg-neutral-700 dark:peer-checked:bg-green-500" />
                            </label>
                        </div>
                    </div>

                    <div className="p-1">
                        <button onClick={handleSignOut} disabled={isSigningOut} className="w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-800">
                            {isSigningOut ? 'Signing out...' : 'Sign out'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;