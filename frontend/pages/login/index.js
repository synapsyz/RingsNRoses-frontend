// pages/index.js
"use client";
import Head from 'next/head';
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user_type, setUserType] = useState("customer");
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark", "bg-gray-900", "text-white");
      root.classList.remove("bg-white", "text-gray-900");
    } else {
      root.classList.remove("dark", "bg-gray-900", "text-white");
      root.classList.add("bg-white", "text-gray-900");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      user_type,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <Head>
        <title>RingsNRoses Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-900">
        <Link href="/" className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80 mt-10 ml-8" aria-label="RingsNRoses">
              <svg className="w-9 h-auto" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
                <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
              </svg>
            </Link>

        

        {/* Left Side - Image */}
        <div className="flex-1 flex items-center justify-center">
          
          <img
            src="./undraw_love_qypu.svg" // Replace with your image path
            alt="Wedding Theme"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <main className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
          
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                Sign in to your account
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                Book Your Wedding with RingsNRoses.
              </p>
            </div>

            <div className="lg:hidden flex justify-end">
              <button
                type="button"
                onClick={toggleTheme}
                className="py-1 px-2 rounded-md border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-neutral-300 text-xs hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center space-x-1"
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <input type="hidden" name="user_type" value="customer" />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-white">
                    Password
                  </label>
                  <Link href="/forgot-password" className="inline-flex items-center gap-x-1.5 text-xs hover:underline" style={{ color: '#e87fe6' }}>
                    I forgot my password
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600 pr-10"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
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

              <button
                type="submit"
                className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#e87fe6] focus:ring-offset-2"
                style={{
                  backgroundColor: '#e87fe6',
                }}
              >
                Sign in
              </button>
            </form>

            <div className="text-center text-sm text-gray-500 dark:text-neutral-400">
              Don't have an account?
              <Link
                href="/login/signup"
                className="font-semibold hover:underline"
                style={{ color: '#e87fe6' }}
              >
                Sign up
              </Link>
            </div>
            <div className="text-center text-l text-gray-500 dark:text-neutral-400">
              Vendors 
              <Link
                href="/vendor/login"
                className="font-semibold hover:underline ml-1 mr-1"
                style={{ color: '#e87fe6' }}
              >
                Sign in
              </Link>
               here
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-4 px-6 bg-white dark:bg-gray-900 fixed bottom-0"> 
          <div className="flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-400 gap-1 gap-x-8">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <a href="/client/signup" className="hover:underline">Register your business</a>
              <a href="#" className="hover:underline">Contact us</a>
              <a href="#" className="hover:underline">Terms & privacy</a>
              <a href="#" className="hover:underline">Your Privacy Choices</a>
              <a href="#" className="hover:underline">About us</a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-2 mt-2">
            <p className="text-gray-500 text-sm dark:text-gray-400">© 2025 RingsNRoses</p>
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
        </footer>
      </div>
    </>
  );
}
