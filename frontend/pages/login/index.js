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
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      user_type, // 👈 Add this!
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

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Sidebar (Hidden on Mobile) */}
        <aside className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between p-6 dark:bg-neutral-950">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            {/* Logo */}
            <Link href="/" className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" aria-label="RingsNRoses">
              <svg className="w-9 h-auto" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
                <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" className="fill-blue-600 dark:fill-blue-500" fill="currentColor"/>
              </svg>
            </Link>
            {/* End Logo */}

            {/* Theme Toggle (Optional in Sidebar) */}
            {/* <button
              onClick={toggleTheme}
              className="rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.03 9.09l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-800 dark:text-gray-300">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.83l-1.103 1.937A7.5 7.5 0 0012 6c.36 0 .71.021 1.05.06L13.18 4.49a.75.75 0 01.83-.162l1.937 1.103c.031.018.06.041.083.068a7.5 7.5 0 005.59 8.947 7.5 7.5 0 00-8.947 5.59c-.027.023-.05.046-.068.083l-1.103 1.937a.75.75 0 01-.83.162l-1.937-1.103a7.5 7.5 0 00-5.59-8.947 7.5 7.5 0 008.947-5.59c.023-.027.046-.05.068-.083l1.937-1.103a.75.75 0 01-.162-.83l-1.103-1.937a7.5 7.5 0 00-1.05-.06A7.5 7.5 0 0012 18c-.36 0-.71-.021-1.05-.06l-1.103 1.937a.75.75 0 01-.83.162l-1.937-1.103c-.031-.018-.06-.041-.083-.068a7.5 7.5 0 00-5.59-8.947 7.5 7.5 0 008.947-5.59c.027-.023.05-.046.068-.083l1.103-1.937a.75.75 0 01.162-.83l1.937 1.103c.031.018.06.041.083.068A7.5 7.5 0 0018 12a7.5 7.5 0 00-8.947-5.59c-.023-.027-.046-.05-.068-.083l-1.103-1.937zM12 15a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" />
                </svg>
              )}
            </button> */}
          </div>
          {/* End Header */}

          {/* Body */}
          <div className="mt-2">
            <img
              className="dark:hidden rounded-md shadow-lg"
              src="https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.jpg?s=612x612&w=0&k=20&c=fTlNejRdY7dkvk742auNgI3j6Ve9UqqWSnb3QJ-D2gw="
              alt="Wedding Theme"
            />
            <img
              className="hidden dark:block rounded-md shadow-lg"
              src="https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.jpg?s=612x612&w=0&k=20&c=fTlNejRdY7dkvk742auNgI3j6Ve9UqqWSnb3QJ-D2gw="
              alt="Wedding Theme Dark"
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-neutral-500">
              Discover the perfect venue and services for your dream wedding with RingsNRoses.
            </p>
          </div>
          {/* End Body */}

          {/* Footer */}
          <div className="flex justify-end items-end gap-x-8">
        
          </div>
          {/* End Footer */}
        </aside>
        {/* End Sidebar */}

        {/* Content */}
        <main className="mt-2 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                Sign in to your RingsNRoses account
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                Book Your Wedding with RingsNRoses.
              </p>
            </div>
            {/* End Title */}

            {/* Theme Toggle (Visible on Mobile) */}
            

            {/* Button Group */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
              >
                <svg className="shrink-0 size-4" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_4132_5805)">
                    <path d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z" fill="#4285F4"/>
                    <path d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z" fill="#34A853"/>
                    <path d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.6552 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z" fill="#FBBC05"/>
                    <path d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z" fill="#EB4335"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4132_5805">
                      <rect width="32" height="32" fill="white" transform="translate(0.937439)"/>
                    </clipPath>
                  </defs>
                </svg>
                Sign in with Google
              </button>
            </div>
            {/* End Button Group */}

            <div className="flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">Or</div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                  Email
                </label>
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
              <input type="hidden" name="user_type" value="customer" />  
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-white">
                    Password
                  </label>
                  <Link href="/forgot-password" className="inline-flex items-center gap-x-1.5 text-xs text-blue-600 hover:underline focus:outline-none focus:underline dark:text-blue-500">
                    I forgot my password
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600"
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
                className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-neutral-500">
              Don't have an account?
              <Link href="/login/signup" className="font-semibold text-blue-600 hover:underline dark:text-blue-500">
                Sign up
              </Link>
            </div>
          </div>
         
        </main>
        
        {/* End Content */}
      
      </div>
       <footer>
               <div className="mt-auto flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-500 gap-1 gap-x-8">
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
    <a href="/client/signup" className="hover:underline">Register your business</a>
    <a href="#" className="hover:underline">Contact us</a>
    <a href="#" className="hover:underline">Terms & privacy</a>
    <a href="#" className="hover:underline">Your Privacy Choices</a>
    <a href="#" className="hover:underline">About us</a>
  </div>
  <p className="mt-2">© 2025 RingsNRoses</p>
</div>
         </footer>
    </>
  );
}