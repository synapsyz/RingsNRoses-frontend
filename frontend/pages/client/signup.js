"use client";
import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Signup() {
    const [password, setPassword] = useState("");
    const [passwordRules, setPasswordRules] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        numbers: false,
        specialCharacters: false,
    });
    const [acceptTerms, setAcceptTerms] = useState(false); // State for the "Terms and Conditions" checkbox

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
    }, [password]); // Re-run effect whenever password changes

    return (
        <>
            <Head>
                <title>Business Signup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen flex flex-col lg:flex-row">

                {/* ========== MAIN CONTENT ========== */}
                <aside className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between p-6 dark:bg-neutral-950">
                    {/* Sidebar */}
                    <div className="hidden min-h-screen lg:w-100 xl:w-107.5bg-gray-100 lg:flex flex-col justify-between p-6 dark:bg-neutral-950">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between items-center gap-2">
                            {/* Logo */}
                            <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="/" aria-label="Preline">
                                <svg className="w-9 h-auto" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clip-rule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
                                    <path fillRule="evenodd" clip-rule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
                                    <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
                                </svg>
                            </a>
                            {/* End Logo */}

                            {/* Language Select */}

                            {/* End Language Select */}
                        </div>
                        {/* End Header */}

                        {/* Body */}
                        <div className='mt-6'>
                            <img
                                className="dark:hidden rounded-md shadow-lg"
                                src="https://i.ytimg.com/vi/jol8JBugmQY/maxresdefault.jpg"
                                alt="Charts Mockups"
                            />
                            <img
                                className="hidden dark:block rounded-md shadow-lg"
                                src="https://i.ytimg.com/vi/jol8JBugmQY/maxresdefault.jpg"
                                alt="Charts Mockups"
                            />
                            <p className="mt-4 text-sm text-gray-500 dark:text-neutral-500">
                                Your business, their dream wedding

                            </p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500 font-semibold">
                                Powered by RingsNRoses.

                            </p>
                        </div>

                        {/* End Body */}

                        {/* Footer */}
                        <div className="flex justify-center gap-x-8">


                        </div>
                        {/* End Footer */}
                    </div>
                    {/* End Sidebar */}
                </aside>
                {/* Content */}
                <main className="mt-24 flex-1 flex justify-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        {/* Title */}
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                                Set up your Business account
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                Expand your wedding business with RingsNRoses
                            </p>
                        </div>
                        {/* End Title */}

                        {/* Button Group */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button type="button" className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                                <svg className="shrink-0 size-4" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_4132_5805)">
                                        <path d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z" fill="#4285F4"/>
                                        <path d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z" fill="#34A853"/>
                                        <path d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.65520 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z" fill="#FBBC05"/>
                                        <path d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z" fill="#EB4335"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4132_5805">
                                            <rect width="32" height="32" fill="white" transform="translate(0.937439)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                Sign up with Google
                            </button>
                        </div>
                        {/* End Button Group */}

                        <div className="flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">Or</div>

                        <form>
                            <div className="space-y-5">
                                

                                <div>
                                    <label htmlFor="hs-pro-dale" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                                        Email
                                    </label>

                                    <input type="email" id="hs-pro-dale" className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="you@email.com" />
                                </div>

                                {/* Password Input and Rules */}
                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor="hs-pro-dappnp" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                                            Password
                                        </label>

                                        <div className="relative">
                                            <input
                                                id="hs-pro-dappnp"
                                                type="password"
                                                className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                placeholder="******"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {/* Toggle password visibility button */}
                                            <button type="button" data-hs-toggle-password='{
                                                "target": ["#hs-pro-dappnp", "#hs-pro-dapprnp"]
                                            }' className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
                                                <svg className="shrink-0 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                                    <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                                    <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                                    <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"/>
                                                    <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                                    <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Password Rules */}
                                    <div id="hs-pro-dappnp-hints" className="mt-2">
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
                                {/* End Password Input and Rules */}
                                <div>
                                    <label htmlFor="hs-pro-dalfn" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                                        Full name
                                    </label>
                                    <input type="text" id="hs-pro-dalfn" className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="hs-pro-dalf" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                                        Phone Number
                                    </label>

                                    <input type="tel" id="hs-pro-dalf" className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="9876XXXXXX" />
                                </div>
                                <div>
                                    <label htmlFor="hs-pro-dappcn" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                                        Business name
                                    </label>

                                    <input type="text" id="hs-pro-dappcn" className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="e.g. Catering" />
                                </div>

                                {/* Terms and Conditions Checkbox */}
                                <div className="flex items-center gap-x-2">
                                    <input
                                        type="checkbox"
                                        className="shrink-0 border-gray-200 size-3.5 rounded-sm text-blue-600 focus:ring-offset-0 dark:bg-neutral-800 dark:checked:bg-blue-500 dark:border-neutral-700"
                                        id="hs-pro-dsftac"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <label htmlFor="hs-pro-dsftac" className="text-sm text-gray-800 dark:text-neutral-200">
                                        I accept the
                                        <a className="inline-flex items-center gap-x-1.5 font-medium text-blue-600 hover:text-blue-700 decoration-2 hover:underline dark:text-blue-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600" href="#">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                                {/* End Terms and Conditions Checkbox */}

                                <button
                                    type="button"
                                    className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                                    disabled={!passwordRules.minLength || !passwordRules.lowercase || !passwordRules.uppercase || !passwordRules.numbers || !passwordRules.specialCharacters || !acceptTerms}
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="flex justify-center text-sm text-gray-500 dark:text-neutral-500">
                            Have an Business account?
                            <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium focus:outline-hidden focus:underline dark:text-blue-500" href="/client/login">
                                Sign in
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </a>
                        </p>
                    </div>

                    {/* End Content */}
                </main>
            </div>
            <footer>
                <div className="mt-8 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-500 gap-1 gap-x-8">
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