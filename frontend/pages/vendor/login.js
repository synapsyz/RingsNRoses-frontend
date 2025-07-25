"use client";

import Head from 'next/head';
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ErrorAlert from "./error"; // adjust the path
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user_type, setUserType] = useState("vendor");
  const [theme, setTheme] = useState("light");
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();


  useEffect(() => {
    if (status === "authenticated") {
      router.push("/vendor/dashboard"); // Change this to your desired page
    }
  }, [status, router]);

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
    if (isSubmitting) return;

    setEmailError("");
    setPasswordError("");
    setIsSubmitting(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      user_type,
      password,
    });

    if (res.ok) {
      router.push("/vendor/dashboard");
    } else {
      const errorText = res.error;

      let emailMsg = "Login failed";
      let passwordMsg = "Login failed";

      // Check if it's JSON-like (starts with `{`)
      if (errorText && errorText.startsWith("{")) {
        const err = JSON.parse(errorText);

        if (Array.isArray(err.detail)) {
          emailMsg = err.detail[0] || emailMsg;
          passwordMsg = err.detail[1] || passwordMsg;
        } else if (typeof err.detail === "string") {
          emailMsg = passwordMsg = err.detail;
        }
      } else {
        // fallback if it's just plain string
        emailMsg = passwordMsg = errorText || "Invalid credentials";
      }

      setEmailError(emailMsg);
      setPasswordError(passwordMsg);
      setIsSubmitting(false);
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
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left column - Login Form */}
        <main>
          <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  alt="Your Company"
                  src="./Logo.png"
                  className="h-12 w-auto"
                />
                {/* Text color applied via global styling or specific dark:text-white */}
                <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Sign in to your Business Account</h2>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-300"> {/* Use a lighter gray for dark mode for better contrast */}
                  Not a member?{' '}
                  <a href="/vendor/signup" className="font-semibold hover:underline"
                    style={{ color: '#E91E63' }}>
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
                          className={`mt-1 block w-full rounded-md px-3 py-2 
                                ${emailError
                              ? "border-2 border-red-500 focus:border-red-500"
                              : "border border-gray-300 focus:border-blue-500"
                            } 
                                focus:outline-none focus:ring-1
                                dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600
                            `}
                          placeholder="you@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        {emailError && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{emailError}</p>
                        )}
                      </div>
                    </div>

                    <input type="hidden" name="user_type" value="vendor" />

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-white">
                          Password
                        </label>
                        <Link href="/login/forgot-password" className="inline-flex items-center gap-x-1.5 text-xs hover:underline focus:outline-none focus:underline "
                          style={{ color: '#E91E63' }}>
                          I forgot my password
                        </Link>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`mt-1 block w-full rounded-md px-3 py-2 
                            ${passwordError
                              ? "border-2 border-red-500 focus:border-red-500"
                              : "border border-gray-300 focus:border-blue-500"
                            } 
                            focus:outline-none focus:ring-1
                            dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600
                        `}
                          placeholder="******"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                        >
                          {showPassword ? (
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                              <line x1="2" x2="22" y1="2" y2="22" />
                            </svg>
                          ) : (
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {passwordError && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                          {passwordError}
                        </p>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: '#E91E63',
                        }}
                      >
                        {isSubmitting ? (
                          <div className="flex justify-center items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              ></path>
                            </svg>
                          </div>
                        ) : (
                          "Sign in"
                        )}
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

                 <GoogleLoginButton userType="vendor" />

                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right column - Video (Visible only on large screens and up) */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg shadow-xl max-h-[75vh]"
          >
            <source src="./vendor_login.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <footer className="w-full py-4 px-6 fixed bottom-3 mt-8"> {/* Added background to footer */}
          <div className="mt-10 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-400 lg:gap-1"> {/* Added pb-4 for some padding */}
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
    </>
  );
}