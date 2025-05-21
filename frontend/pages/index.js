  "use client";

  import { useState, useEffect } from "react";
  import Link from "next/link";

  export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
      const root = window.document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }, [theme]);

    const toggleTheme = () => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col justify-between px-4">
        {/* Top Centered Heading */}
        <header className="flex justify-center pt-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://media.istockphoto.com/id/1306231946/photo/wedding-rings-in-red-roses-stock-photo.jpg?s=612x612&w=0&k=20&c=xJAY8d833gden0ZO8YBoxMeayOyt2qW4Bj_F-UcU0rQ="
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="text-3xl font-bold">Rings & Roses</h1>
          </div>
        </header>

        {/* Top Divider */}
        <div className="w-full mt-4 border-t border-gray-400 dark:border-gray-600" />

        {/* Login Form */}
        <main className="flex justify-center items-center flex-grow mt-0">
          <div className="w-full max-w-md p-8 space-y-6   rounded-xl ">
            <h2 className="text-2xl font-bold text-center">Log In</h2>

            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  <span className="text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 font-semibold">
                Log in
              </button>
            </form>

            <div className="-mt-2 mb-0 p-0">
            <Link
              href="/register"
              className="block w-full text-center px-4 py-2 -mt-3 mb-0 text-black dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-black dark:hover:border-white font-semibold"
            >
              Create Account
            </Link>
          </div>

          </div>
        </main>

        {/* Footer with theme toggle */}
        <footer className="w-full text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 mt-10 py-4">
          <p>© 2025 Rings & Roses.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/privacy-choices" className="hover:underline">Your Privacy Choices</a>
            
        

          <div className="mt-1">
            <button
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
    );
  }
