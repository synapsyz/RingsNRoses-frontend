// pages/index.js
"use client";
import Head from 'next/head';
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user_type, setUserType] = useState("customer");
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const api_url = process.env.PROD_URL


    useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Change this to your desired page
    }
  }, [status, router]);


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
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      user_type,
    });

    if (res?.ok) {
      router.replace("/");
    } else {
      setError("Invalid email or password. Try again later");
      setIsSubmitting(false)

    }
  };

  return (
    <>
      <Head>
        <title>RingsNRoses Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-900">
        <Link
  href="/"
  className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80 mt-10 ml-8"
  aria-label="RingsNRoses"
>
  <img
    src="Logo.png"
    alt="RingsNRoses Logo"
    width={36}
    height={36}
    className="w-20 h-auto"
  />
</Link>


        

        {/* Left Side - Image */}
        <div className="hidden lg:block flex-1 flex items-center justify-center mt-24">
  <img
    src="Backdrop Design Wedding.jpg" // Replace with your image path
    alt="Wedding Theme"
    className="w-full h-auto object-cover rounded-xl"
  />
</div>


        {/* Right Side - Login Form */}
        <main className="lg:flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
          
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                Sign in to your account
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                Book Your Wedding with RingsNRoses.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`mt-1 block w-full rounded-md px-3 py-2 
            ${
              error
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
                {error && (
  <p className="text-sm text-red-600 mt-1">{error}</p> )}
              </div>
              <input type="hidden" name="user_type" value="customer" />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-white">
                    Password
                  </label>
                  <Link
  href="/login/forgot-password"
  className="inline-flex items-center gap-x-1.5 text-xs hover:underline"
  style={{ color: '#E91E63' }}
>
  I forgot my password
</Link>

                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
className={`mt-1 block w-full rounded-md px-3 py-2 
            ${
              error
                ? "border-2 border-red-500 focus:border-red-500"
                : "border border-gray-300 focus:border-blue-500"
            } 
            focus:outline-none focus:ring-1
            dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600
          `}
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />                
                  <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
  aria-label={showPassword ? "Hide password" : "Show password"}
>
  {showPassword ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.664.44-3.222 1.214-4.557m2.452-2.452A9.955 9.955 0 0112 3c5.523 0 10 4.477 10 10 0 1.5-.388 2.92-1.072 4.159M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )}
</button>

                </div>
                {error && (
  <p className="text-sm text-red-600 mt-1">{error}</p>
)}
              </div>
              <button
                type="submit"
                className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#f9a7a4] focus:ring-offset-2"
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
            "Sign In"
          )} 
              </button>
            </form>

            <div className="text-center text-sm text-gray-500 dark:text-neutral-400">
              Don't have an account?
              <Link
                href="/login/signup"
                className="font-semibold hover:underline"
                style={{ color: '#E91E63' }}
              >
                Sign up
              </Link>
            </div>
            <div className="text-center text-l text-gray-500 dark:text-neutral-400">
              Vendors 
              <Link
                href="/vendor/login"
                className="font-semibold hover:underline ml-1 mr-1"
                style={{ color: '#E91E63' }}
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
              <a href="/vendor/signup" className="hover:underline">Register your business</a>
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
