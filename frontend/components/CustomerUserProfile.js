import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import AccessDeniedModal from '@/components/AccessDeniedModal'; 


let isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
const api_url = getApiUrl();
const api = axios.create({
  baseURL: `${api_url}/api/v1`,
  headers: {
    ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
  },
});

const CustomerUserProfile = () => {
    const { data: session, status } = useSession();
    const user = session?.user;
    const accessToken = session?.accessToken;


if (session && session?.user_type !== 'customer') {
  return (
    <AccessDeniedModal
      isOpen={true}
      userType={session.user_type}
      allowedUserType="customer"
    />
  );
}

    const handleLogoutClick = async () => {
      console.log("Logout process started...");
      localStorage.removeItem('eventFormData');
      console.log("'eventFormData' removed from localStorage.");
      try {
        await signOut({ redirect: false }); // Using await if signOut returns a Promise
        console.log("Authentication signOut successful (no redirect).");
      } catch (error) {
        console.error("Error during sign out process:", error);
      }
    };
    return(
        <>
        
        {status === "authenticated" && user ? (
          <>
<div className="order-2 md:order-3 ms-auto lg:ms-0">
          <div className="flex justify-end items-center gap-x-2">
                    {/* <!-- Favorites Button Icon --> */}
                    <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                      <button id="hs-pro-dnnd" type="button" className="relative shrink-0 inline-flex justify-center items-center gap-x-2 size-9.5 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        <span className="flex absolute top-0 end-0 z-10 -mt-1 -me-1">
                          <span className="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-gray-800 text-white rounded-full px-1 dark:bg-neutral-200 dark:text-neutral-800">
                            2
                            <span className="sr-only">Notifications</span>
                          </span>
                        </span>
                      </button>
                      <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full sm:w-96 hidden z-10 bg-white border-y sm:border-x border-gray-200 sm:border-gray-100 sm:mt-2 sm:rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-dnnd">
                        <div className="py-4 px-6">
                          <span className="block font-medium text-gray-800 dark:text-neutral-200">
                            Favorites
                          </span>
                        </div>
                        <div className="px-6 max-h-120 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                          <div className="space-y-5">
                            {/* <!-- Item --> */}
                            <div id="hs-pro-shfdi1" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
                              <div className="relative">
                                <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87TsCDhwKtTRhIYWQrwI_Jk2L9lSl7XhYeA&s" alt="Product Image"/>
                              </div>
          
                              <div className="grow flex flex-col">
                                <h4 className="text-sm text-gray-800 dark:text-neutral-200">
                                 Sheraton Garden
                                </h4>
                                <span className="mt-1.5">
                                  <span className="text-sm text-gray-500 dark:text-neutral-500">
                                    <s>₹225000</s>
                                  </span>
                                  <span className="text-sm text-red-500">
                                    From₹200000
                                  </span>
                                </span>
          
                                <div className="">
                                  <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shfdi1">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* <!-- End Item --> */}
          
                            {/* <!-- Item --> */}
                            <div id="hs-pro-shfdi2" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
                              <div className="relative">
                                <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://content.jdmagicbox.com/v2/comp/chennai/m6/044pxx44.xx44.090921161513.h7m6/catalogue/sriji-sweets-vepery-chennai-sweet-shops-37f8bph.jpg" alt="Product Image"/>
                              </div>
          
                              <div className="grow flex flex-col">
                                <h4 className="text-sm text-gray-800 dark:text-neutral-200">
                                  Sriji Sweets
                                </h4>
          
                                <span className="mt-1.5 text-sm text-gray-800 dark:text-neutral-200">
                                  ₹129
                                </span>
          
                                <div className="">
                                  <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shfdi2">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* <!-- End Item --> */}
                          </div>
                        </div>
          
                        <div className="py-4 px-6 text-center">
                          <a className="inline-flex justify-center items-center font-medium text-sm text-gray-800 underline underline-offset-4 decoration-1 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="../../pro/shop/favorites.html">
                            View favorites
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Favorites Dropdown --> */}
          
                    {/* <!-- Cart Button Icon --> */}
                    <button type="button" className="relative shrink-0 inline-flex justify-center items-center gap-x-2 size-9.5 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" data-hs-overlay="#hs-pro-shco">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span className="flex absolute top-0 end-0 z-10 -mt-1 -me-1">
                        <span className="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-gray-800 text-white rounded-full px-1 dark:bg-neutral-200 dark:text-neutral-800">
                          3
                          <span className="sr-only">Notifications</span>
                        </span>
                      </span>
                    </button>
                    {/* <!-- End Cart Button Icon --> */}
          
          
                    {/* <!-- Account Button Icon --> */}
                    <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                      <button id="hs-pro-shadnli" type="button" className="relative shrink-0 inline-flex justify-center items-center gap-x-2 size-9.5 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        <img className="shrink-0 size-8 rounded-full" src={session.user.profile_picture||"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="Avatar"></img>
                      </button>
                      {/* <!-- End Account Button Icon --> */}
          
                      {/* <!-- Account Dropdown --> */}
                      <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full sm:w-72 hidden z-10 bg-white border-y sm:border-x border-gray-200 sm:border-gray-100 sm:mt-2 sm:rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shadnli">
                        <div className="p-2">
                          {/* <!-- Account Details --> */}
                          <a 
                            className="py-2 px-2.5 flex items-center gap-3 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" 
                            href="../../pro/shop/account.html"
                          >
                            <img 
                              className="shrink-0 size-10 rounded-full" 
                              src={session.user.profile_picture || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} 
                              alt="Avatar"
                              onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
                              }}
                            />
                            
                            <div className="grow">
                              <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
                                {session.user.name}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-neutral-500">
                                {session.user.email}
                              </p>
                            </div>
                          </a>
                          {/* <!-- End Account Details --> */}
          
          
                          {/* <!-- List --> */}
                          <ul className="flex flex-col space-y-0.5">
                            <li>
                              <a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="/personal-info.html">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                                Personal Info
                              </a>
                            </li>
          
                    

                          </ul>
                          {/* <!-- End List --> */}
          
                          <div className="my-2 mx-2.5 h-px bg-gray-200 dark:bg-neutral-700"></div>
          
       
                          {/* <!-- End List --> */}
          
          
                          <p>
                            <button type="button" 
                            onClick={handleLogoutClick}
                            className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 hover:text-red-500 focus:outline-hidden focus:bg-gray-100 focus:text-red-500 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:hover:text-red-500 dark:focus:text-red-500">
                              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" x2="9" y1="12" y2="12" />
                              </svg>
                              Logout
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Account Dropdown --> */}
          </div>
        </div>
        </>
        ) : (
         <div className="order-2 md:order-3 ms-auto lg:ms-0 flex flex-col items-center space-y-1 text-end">
  <a
    href="/login"
    className="py-2 px-6 text-xs font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
    style={{
      backgroundColor: '#E91E63',
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d81b60')}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E91E63')}
    onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #E91E63')}
    onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
  >
    Sign in
  </a>

  <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
    New Customer?{" "}
    <a
      href="/login/signup"
      className="hover:underline"
      style={{ color: '#E91E63' }}
    >
      Sign up
    </a>
  </p>
</div>
        )}
        </>
    )

}
export default CustomerUserProfile;