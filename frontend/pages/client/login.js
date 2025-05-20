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
     if (theme === "dark") {
       root.classList.add("dark");
     } else {
       root.classList.remove("dark");
     }
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
    <>
      {/*
        This example requires updating your template:

        
        <html class="h-full bg-white">
        <body class="h-full">
        
      */}
      <ErrorAlert errors={errors} />
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your Business Account</h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Not a member?{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Create your Business Account
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
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
                  <Link href="/forgot-password" className="inline-flex items-center gap-x-1.5 text-xs text-blue-600 hover:underline focus:outline-none focus:underline dark:text-blue-500">
                    I forgot my password
                  </Link>
                </div>
                    <div className="mt-2">
                      <input
                        type={showPassword ? "text" : "password"}
                    id="password"
                    className="py-2 sm:py-2.5 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-white/70 dark:focus:ring-blue-600"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                      />
                    </div>
                  </div>

                 

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm/6 font-medium">
                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4">
                  <a
                type="button"
                href="#"
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
              </a>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="./undraw_business-decisions.svg"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        
      </div>
      <footer>
               <div className="mt-10 flex flex-col items-center text-center text-sm text-gray-500 dark:text-neutral-500 gap-1">
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
    <a href="#" className="hover:underline">Register your business</a>
    <a href="#" className="hover:underline">Contact us</a>
    <a href="#" className="hover:underline">Terms & privacy</a>
    <a href="#" className="hover:underline">Your Privacy Choices</a>
    <a href="#" className="hover:underline">About us</a>
  </div>
  <p className="mt-2">© 2025 RingsNRoses</p>
</div>
         </footer>
    </>
  )
}