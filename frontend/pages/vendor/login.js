"use client";

import Head from 'next/head';
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ErrorAlert from "./error"; // adjust the path

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user_type, setUserType] = useState("vendor");
  const [theme, setTheme] = useState("light");
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const root = window.document.documentElement;
    // Apply default light/dark background to the entire page via HTML/body
    if (theme === "dark") {
      root.classList.add("dark", "bg-gray-900", "text-white"); // Added bg-gray-900 and text-white for global styling
      root.classList.remove("bg-white", "text-gray-900"); // Remove light mode global styles
    } else {
      root.classList.remove("dark", "bg-gray-900", "text-white");
      root.classList.add("bg-white", "text-gray-900"); // Added bg-white and text-gray-900 for global styling
    }
  }, [theme]);

  // Initialize theme from local storage or system preference on first load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // Save theme to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      user_type,
      password,
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      try {
        const err = JSON.parse(res.error);
        const messages = Array.isArray(err.detail)
          ? err.detail
          : [err.detail || "Login failed"];
        setErrors(messages);
      } catch {
        setErrors([res.error]);
      }
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
    <Head>
        <title>Business Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorAlert errors={errors} />
      {/* Main container with min-h-screen to ensure it takes full height */}
      <div className="flex min-h-screen flex-1">
        {/* Left column - Login Form */}
        <main>
        <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              />
              {/* Text color applied via global styling or specific dark:text-white */}
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Sign in to your Business Account</h2>
              <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-300"> {/* Use a lighter gray for dark mode for better contrast */}
                Not a member?{' '}
                <a href="/vendor/signup" className="font-semibold hover:underline"
                style={{ color: '#f9a7a4' }}>
                  Create your Business Account
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        id="email"
                        className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <input type="hidden" name="user_type" value="vendor" />

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-white">
                        Password
                      </label>
                      <Link href="/login/forgot-password" className="inline-flex items-center gap-x-1.5 text-xs hover:underline focus:outline-none focus:underline "
                      style={{ color: '#f9a7a4' }}>
                        I forgot my password
                      </Link>
                    </div>
                    <div className="relative mt-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600 pr-10"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.664.44-3.222 1.214-4.557m2.452-2.452A9.955 9.955 0 0112 3c5.523 0 10 4.477 10 10 0 1.5-.388 2.92-1.072 4.159M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: '#f9a7a4',
                        // focusRingColor: '#f9a7a4', // This is not a direct CSS property. Use Tailwind's focus:ring-purple-500
                      }}
                      // Tailwind for focus ring if you want to use it
                      // focus:ring-[#f9a7a4] focus:ring-offset-2
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-white" />
                  </div>
                  <div className="relative flex justify-center text-sm/6 font-medium">
                    <span className="bg-white px-6 text-gray-900 dark:bg-gray-900 dark:text-white">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4">
                  <a
                    type="button" // This should actually be a button if it's not a link, or if it is, remove type="button"
                    href="#"
                    className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-gray-700 dark:focus:ring-neutral-600"
                  >
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
                    Sign in with Google
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </main>
        {/* Right column - Image */}
        <div className="relative hidden w-0 flex-1 lg:block dark:bg-gray-900 mt-6"> {/* Added background to the image container */}
          <img
            alt=""
            src="./20250524_154914.png"
            className="absolute inset-0 size-100 object-cover" // Applied filters here
          />
        </div>
        
<footer className="w-full py-4 px-6 bg-white dark:bg-gray-900 fixed -bottom-3 mt-8"> {/* Added background to footer */}
        <div className="mt-10 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-400 gap-1 pb-4"> {/* Added pb-4 for some padding */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href="/vendor/signup" className="hover:underline">Register your business</a>
            <a href="#" className="hover:underline">Contact us</a>
            <a href="#" className="hover:underline">Terms & privacy</a>
            <a href="#" className="hover:underline">Your Privacy Choices</a>
            <a href="#" className="hover:underline">About us</a>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <p className="dark:text-gray-400">© 2025 RingsNRoses</p> {/* Ensure copyright text changes color */}
            <button
              type="button"
              onClick={toggleTheme}
             className="text-xs text-gray-500 dark:text-gray-400 hover:underline flex items-center justify-center space-x-1"
            >
              {theme === "dark" ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
        
      </footer>
      </div>
      {/* Footer */}
      
    </>
  );
}