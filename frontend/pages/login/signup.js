"use client";

import Head from 'next/head';
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [password, setPassword] = useState("");
    const [minWeddingDate, setMinWeddingDate] = useState(""); // State for minimum wedding date in YYYY-MM-DD format
    const [passwordRules, setPasswordRules] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        numbers: false,
        specialCharacters: false,
    });

    const MIN_PASSWORD_LENGTH = 8;

    useEffect(() => {
        // --- Password Strength Logic ---
        const checkPasswordStrength = () => {
            const newRules = {
                minLength: password.length >= MIN_PASSWORD_LENGTH,
                lowercase: /[a-z]/.test(password),
                uppercase: /[A-Z]/.test(password),
                numbers: /\d/.test(password),
                specialCharacters: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~` ]/.test(password),
            };
            setPasswordRules(newRules);
        };
        checkPasswordStrength();

        // --- Set Minimum Wedding Date in YYYY-MM-DD format for the 'min' attribute ---
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDateForMinAttribute = `${year}-${month}-${day}`;
        setMinWeddingDate(formattedDateForMinAttribute);
    }, [password]); // Re-run effect whenever password changes or component mounts

    return (
        <>
            <Head>
                <title>RingsNRoses Signup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex min-h-full flex-1">
                {/* ========== HEADER ========== */}
                {/* Your header content would go here */}
                {/* ========== END HEADER ========== */}

                {/* ========== MAIN CONTENT ========== */}
                {/* Adjusted width to w-2/5 (40%) and removed max-w-sm for full width control */}
                <main id="content" className="pb-23 sm:pb-16 w-2/5 flex-grow">
                    <div className="py-10 lg:py-20 w-full px-4 sm:px-6 lg:px-8 mx-auto">
                        <div className="w-full max-w-sm mx-auto"> {/* max-w-sm keeps content centered within its 40% */}
                            {/* Create Account Details */}
                            <div className="space-y-8">
                                <div className="flex items-center justify-center space-x-3">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                        className="h-10 w-auto"
                                    />
                                    <h1 className="font-medium text-2xl text-gray-800 dark:text-neutral-200">
                                        Create an account
                                    </h1>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-3">
                                        {/* Input */}
                                        <div>
                                            <label htmlFor="hs-pro-shcafem" className="sr-only">
                                                Email
                                            </label>
                                            <input id="hs-pro-shcafem" type="email" className="py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="Email" />
                                        </div>
                                        {/* End Input */}

                                        {/* Strong Password */}
                                        <div>
                                            <label htmlFor="hs-pro-shcafpw" className="sr-only">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="hs-pro-shcafpw"
                                                className="py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                            <div id="hs-pro-shcafpw-hints" className="mt-2">
                                                <ul className="space-y-2 text-xs text-gray-500 dark:text-neutral-500">
                                                    {/* Min Length Rule */}
                                                    <li className={`${passwordRules.minLength ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.minLength ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">Minimum {MIN_PASSWORD_LENGTH} characters</span>
                                                    </li>

                                                    {/* Lowercase Rule */}
                                                    <li className={`${passwordRules.lowercase ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.lowercase ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">Contain lowercase</span>
                                                    </li>

                                                    {/* Uppercase Rule */}
                                                    <li className={`${passwordRules.uppercase ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.uppercase ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">Contain uppercase</span>
                                                    </li>

                                                    {/* Numbers Rule */}
                                                    <li className={`${passwordRules.numbers ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.numbers ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">Contain numbers</span>
                                                    </li>

                                                    {/* Special Characters Rule */}
                                                    <li className={`${passwordRules.specialCharacters ? 'text-teal-500' : ''} flex items-center gap-x-3`}>
                                                        {passwordRules.specialCharacters ? (
                                                            <svg className="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        ) : (
                                                            <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                                        )}
                                                        <span className="text-gray-500 dark:text-neutral-200">
                                                            Contain special characters like ~!@$%etc...
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Strong Password */}
                                    </div>

                                    <div className="space-y-5">
                                        <div className="pt-5 mt-6 border-t border-gray-200 dark:border-neutral-700">
                                            <div className="space-y-3">
                                                <div className="flex justify-between gap-4">
                                                    <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                                                        Wedding Date
                                                    </h4>
                                                    <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                                                        Location
                                                    </h4>
                                                </div>
                                                {/* Input */}
                                                <div className="flex items-center gap-4">
                                                    {/* Wedding Date */}
                                                    <div className="w-1/2">
                                                        <label htmlFor="hs-pro-shcafbr" className="sr-only">
                                                            Wedding Date
                                                        </label>
                                                        <input
                                                            id="hs-pro-shcafbr"
                                                            type="date"
                                                            className="py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                            min={minWeddingDate} // This must be YYYY-MM-DD for functionality
                                                        />
                                                        {/* Optional: You could display the formatted date here if needed,
                                                            but the input's 'min' will still be YYYY-MM-DD */}
                                                    </div>

                                                    {/* Location Dropdown Without Arrow */}
                                                    <div className="w-1/2">
                                                        <label htmlFor="loc" className="sr-only">
                                                            Location
                                                        </label>
                                                        <select
                                                            id="loc"
                                                            className="appearance-none py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                        >
                                                            <option value="">Select Location</option>
                                                            <option value="bangalore">Bangalore</option>
                                                            <option value="hyderabad">Hyderabad</option>
                                                            <option value="delhi">Delhi</option>
                                                            <option value="mumbai">Mumbai</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* End Input */}
                                            </div>
                                        </div>

                                        <div className="pt-5 mt-6 border-t border-gray-200 dark:border-neutral-700">
                                            <div className="space-y-3">
                                                <h4 className="block mb-4 font-medium text-sm text-gray-800 dark:text-neutral-200">
                                                    Role
                                                </h4>

                                                {/* Radio - Bride */}
                                                <div className="flex items-center gap-x-1">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        id="role-bride"
                                                        className="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800"
                                                    />
                                                    <label htmlFor="role-bride" className="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                                        Bride
                                                    </label>
                                                </div>

                                                {/* Radio - Groom */}
                                                <div className="flex items-center gap-x-1">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        id="role-groom"
                                                        className="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800"
                                                    />
                                                    <label htmlFor="role-groom" className="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                                        Groom
                                                    </label>
                                                </div>

                                                {/* Radio - Guest */}
                                                <div className="flex items-center gap-x-1">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        id="role-guest"
                                                        className="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800"
                                                    />
                                                    <label htmlFor="role-guest" className="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                                        Guest
                                                    </label>
                                                </div>

                                                {/* Radio - Family */}
                                                <div className="flex items-center gap-x-1">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        id="role-family"
                                                        className="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800"
                                                    />
                                                    <label htmlFor="role-family" className="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                                        Family
                                                    </label>
                                                </div>

                                                {/* Radio - Friend */}
                                                <div className="flex items-center gap-x-1">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        id="role-friend"
                                                        className="shrink-0 size-4.5 border-gray-400 rounded-full text-indigo-600 checked:border-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800"
                                                    />
                                                    <label htmlFor="role-friend" className="text-sm text-gray-800 ms-1.5 dark:text-neutral-400">
                                                        Friend
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-5 mt-6 border-t border-gray-200 dark:border-neutral-700">
                                            {/* Checkbox */}
                                            <div className="flex gap-x-1">
                                                <input type="checkbox" className="shrink-0 border-gray-300 size-4.5 rounded-sm text-indigo-600 checked:border-indigo-600 focus:ring-indigo-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-neutral-800" id="hs-pro-shcaftac" />
                                                <label htmlFor="hs-pro-shcaftac" className="text-sm text-gray-500 ms-1.5 dark:text-neutral-400">
                                                    I accept the
                                                    <a className="text-sm text-gray-500 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="#">
                                                        Terms and Conditions
                                                    </a>
                                                </label>
                                            </div>
                                            {/* End Checkbox */}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button type="button" className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 sm:text-sm font-medium rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-indigo-700">
                                        Create account
                                    </button>

                                    <p className="text-center text-sm text-gray-500 dark:text-neutral-500">
                                        Already have an account?
                                        <a className="text-[13px] text-indigo-500 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="/login">
                                            Log in
                                        </a>
                                    </p>
                                </div>
                            </div>
                            {/* End Create Account Details */}
                        </div>
                    </div>
                </main>
                {/* ========== END MAIN CONTENT ========== */}

                {/* Adjusted width to w-3/5 (60%) and ensured it's only visible on lg screens and up */}
                <div className="relative hidden w-3/5 flex-shrink lg:block">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        className="absolute inset-0 size-full object-cover"
                    />
                </div>
            </div>
            <footer>
                <div className="mt-10 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-500 gap-1">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                        <a href="/client/signup" className="hover:underline">Register your business</a>
                        <a href="#" className="hover:underline">Contact us</a>
                        <a href="#" className="hover:underline">Terms & privacy</a>
                        <a href="#" className="hover:underline">Your Privacy Choices</a>
                        <a href="#" className="hover:underline">About us</a>
                    </div>
                    <p className="mt-2">© {new Date().getFullYear()} RingsNRoses</p>
                </div>
                <div className="mt-4"></div>
            </footer>
        </>
    );
}