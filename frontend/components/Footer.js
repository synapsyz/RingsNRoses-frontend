import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
      <div className="w-full max-w-[85rem] mx-auto py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Company</h4>
            <ul className="grid space-y-2">
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">About RingsNroses</a></li>
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Contact us</a></li>
            </ul>
          </div>
          {/* End Col */}

          <div>
            <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Customer service</h4>
            <ul className="grid space-y-2">
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Privacy policy</a></li>
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Refund policy</a></li>
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Cookie Policy</a></li>
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#"></a></li>
            </ul>
          </div>
          {/* End Col */}

          <div>
            <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Help</h4>
            <ul className="grid space-y-2">
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Support center &amp; FAQ</a></li>
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Safety center</a></li>
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Sitemap</a></li>
              <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#"></a></li>
            </ul>
          </div>
          {/* End Col */}

          <div className="space-y-10">
            <div className="space-y-10">
              <div>
                <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">Download the RingsNroses App</h4>
                {/* Social Brands */}
                <div className="mt-2 -mx-3 flex flex-col gap-y-2">
                  <div className="max-w-42.5">
                    <a className="w-full inline-flex items-center gap-x-2 py-2 px-5 border border-gray-200 text-sm rounded-full hover:border-gray-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="#">
                      <svg className="shrink-0 size-6 text-black dark:text-white" width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.6727 7.7422C15.44 7.7422 16.9903 7.05207 18.3238 5.6718C19.6572 4.29152 20.3239 2.6865 20.3239 0.856739C20.3239 0.655779 20.308 0.370205 20.2763 1.52588e-05C20.0435 0.0317458 19.8689 0.0581879 19.7525 0.0793416C18.1227 0.312032 16.6887 1.11058 15.4505 2.47496C14.2124 3.83938 13.5933 5.29898 13.5933 6.85377C13.5933 7.03355 13.6197 7.32973 13.6727 7.7422ZM20.0064 32C21.2658 32 22.6574 31.138 24.1814 29.414C25.7053 27.69 26.8694 25.6645 27.6737 23.3376C24.6787 21.7934 23.1813 19.5776 23.1813 16.6901C23.1813 14.2787 24.393 12.2162 26.8165 10.5028C25.1338 8.39796 22.9114 7.34556 20.1493 7.34556C18.9852 7.34556 17.9216 7.52008 16.9586 7.86912L16.3554 8.09123L15.5458 8.40854C15.0167 8.6095 14.5351 8.71001 14.1013 8.71001C13.7626 8.71001 13.3181 8.59363 12.7678 8.36094L12.1487 8.1071L11.5614 7.86912C10.7042 7.50951 9.78348 7.3297 8.79929 7.3297C6.16417 7.3297 4.04763 8.21815 2.44961 9.99506C0.851602 11.7719 0.0526123 14.1147 0.0526123 17.0233C0.0526123 21.1165 1.33312 24.8977 3.89416 28.3669C5.67208 30.789 7.29654 32 8.76753 32C9.39193 32 10.011 31.8784 10.6248 31.6351L11.4026 31.3178L12.0218 31.0957C12.8895 30.789 13.6885 30.6356 14.4187 30.6356C15.1913 30.6356 16.0802 30.8313 17.0856 31.2226L17.5777 31.413C18.6042 31.8043 19.4138 32 20.0064 32Z" fill="currentColor" />
                      </svg>
                      <div className="grow">
                        <span className="block text-[11px] leading-tight text-gray-500 dark:text-neutral-500">Download on the</span>
                        <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">App Store</span>
                      </div>
                    </a>
                  </div>
                  <div className="max-w-42.5">
                    <a className="w-full inline-flex items-center gap-x-2 py-2 px-5 border border-gray-200 text-sm rounded-full hover:border-gray-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="#">
                      <svg className="shrink-0 size-6" width="32" height="37" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5159 11.1765L1.20745 0.140891C0.964824 1.05128e-05 0.659583 0.00783721 0.424782 0.148718C0.182154 0.289598 0.0334473 0.540052 0.0334473 0.821813C0.0334473 0.821813 0.041274 1.83928 0.0491007 3.5142L14.1137 17.5788L20.5159 11.1765Z" fill="url(#paint0_linear_4406_2034)" />
                        <path d="M0.0491007 3.5142C0.0725807 9.5564 0.143021 24.2236 0.174328 31.5259L14.1215 17.5788L0.0491007 3.5142Z" fill="url(#paint1_linear_4406_2034)" />
                        <path d="M31.5672 17.4927L20.5159 11.1765L14.1058 17.5788L21.3377 24.8106L31.575 18.8467C31.8177 18.7058 31.9664 18.4475 31.9664 18.1736C31.9664 17.8918 31.8098 17.6336 31.5672 17.4927Z" fill="url(#paint2_linear_4406_2034)" />
                        <path d="M0.166501 31.5259C0.182154 34.1322 0.189981 35.7993 0.189981 35.7993C0.189981 36.0811 0.338688 36.3394 0.581316 36.4724C0.823943 36.6133 1.12136 36.6133 1.36399 36.4724L21.3455 24.8185L14.1137 17.5866L0.166501 31.5259Z" fill="url(#paint3_linear_4406_2034)" />
                        <defs>
                          <linearGradient id="paint0_linear_4406_2034" x1="0.0334473" y1="18.3158" x2="31.972" y2="18.3158" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#63BE6B" />
                            <stop offset="0.506" stopColor="#5BBC6A" />
                            <stop offset="1" stopColor="#4AB96A" />
                          </linearGradient>
                          <linearGradient id="paint1_linear_4406_2034" x1="0.0249224" y1="18.313" x2="31.9479" y2="18.313" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3EC6F2" />
                            <stop offset="1" stopColor="#45AFE3" />
                          </linearGradient>
                          <linearGradient id="paint2_linear_4406_2034" x1="0.0468809" y1="18.322" x2="31.963" y2="18.322" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FAA51A" />
                            <stop offset="0.387" stopColor="#FAB716" />
                            <stop offset="0.741" stopColor="#FAC412" />
                            <stop offset="1" stopColor="#FAC80F" />
                          </linearGradient>
                          <linearGradient id="paint3_linear_4406_2034" x1="0.169948" y1="27.082" x2="21.3452" y2="27.082" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#EC3B50" />
                            <stop offset="1" stopColor="#E7515B" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="grow">
                        <span className="block text-[11px] leading-tight text-gray-500 dark:text-neutral-500">Get it on</span>
                        <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">Google Play</span>
                      </div>
                    </a>
                  </div>
                </div>
                {/* End Social Brands */}
              </div>
            </div>
            <div className="space-y-10">
              <div>
                <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">Stay connected</h4>
                {/* Social Brands */}
                <div className="mt-2 -mx-2 flex flex-wrap items-center gap-1">
                  <a className="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                    <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a className="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                    <svg className="shrink-0 size-4" width="48" height="50" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M28.5665 20.7714L46.4356 0H42.2012L26.6855 18.0355L14.2931 0H0L18.7397 27.2728L0 49.0548H4.23464L20.6196 30.0087L33.7069 49.0548H48L28.5655 20.7714H28.5665ZM22.7666 27.5131L5.76044 3.18778H12.2646L42.2032 46.012H35.699L22.7666 27.5142V27.5131Z" fill="currentColor" />
                    </svg>
                    <span className="sr-only">X (Twitter)</span>
                  </a>
                  <a className="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                    <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                    <span className="sr-only">YouTube</span>
                  </a>
                </div>
                {/* End Social Brands */}
              </div>
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>

      <div className="w-full max-w-[85rem] pb-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* List */}
        <ul className="flex flex-wrap items-center whitespace-nowrap gap-3">
          <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
            <p className="text-xs text-gray-500 dark:text-neutral-500">
              © 2025 RingsNroses.
            </p>
          </li>
          <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
            <a className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
              Terms and Conditions
            </a>
          </li>
          <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
            <a className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
              Privacy & Policy
            </a>
          </li>
        </ul>
        {/* End List */}
      </div>

      {/* Cart Offcanvas */}
      <div id="hs-pro-shco" className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform size-full sm:w-100 z-80 flex flex-col bg-white hidden dark:bg-neutral-800" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shco-label">
        {/* Header */}
        <div className="py-3 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
          <h3 id="hs-pro-shco-label" className="font-medium text-gray-800 dark:text-neutral-200">
            Cart (3 items)
          </h3>
          <button type="button" className="py-1.5 px-2 inline-flex justify-center items-center gap-x-1 rounded-full border border-gray-200 text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700" aria-label="Close" data-hs-overlay="#hs-pro-shco">
            <span className="hidden lg:block">Esc</span>
            <span className="block lg:hidden">Close</span>
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {/* End Header */}

        {/* Body */}
        <div className="h-full overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {/* Alert */}
          <div className="py-4 px-6 relative overflow-hidden bg-linear-to-r from-orange-100 via-purple-200 via-70% to-indigo-200 dark:from-orange-800 dark:via-purple-800 dark:to-indigo-800" role="alert" tabIndex="-1" aria-labelledby="hs-pro-shfshal-label">
            <h4 id="hs-pro-shfshal-label" className="font-medium text-gray-800 dark:text-neutral-200">
              Free shipping on orders over $50
            </h4>
            <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
              <a className="font-medium text-xs text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="./login.html">Log In</a> or <a className="font-medium text-xs text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="./create-account.html">Register</a>
            </p>
          </div>
          {/* End Alert */}
          <div className="p-6 space-y-7">
            {/* Item */}
            <div id="hs-pro-shcopci1" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
              <div className="relative">
                <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://cdn.augrav.com/online/jewels/2016/01/Beautiful-punjabi-mehandi-designs.jpg" alt="Product Image" />
                <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
                  <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                    <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </div>
              <div className="grow flex flex-col">
                <h4 className="text-sm text-gray-800 dark:text-neutral-200">
                  Senas Mehandi Art
                </h4>
                <span className="mt-1.5 text-sm text-gray-800 dark:text-neutral-200">
                  ₹8589
                </span>
                <div className="">
                  <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shcopci1">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            {/* End Item */}
            {/* Item */}
            <div id="hs-pro-shcopci2" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
              <div className="relative">
                <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://knotstories.in/wp-content/uploads/2024/02/image8-1.webp" alt="Product Image" />
                <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
                  <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                    <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </div>
              <div className="grow flex flex-col">
                <h4 className="text-sm text-gray-800 dark:text-neutral-200">
                  Knot Stories
                </h4>
                <span className="mt-1.5">
                  <span className="text-sm text-gray-500 dark:text-neutral-500">
                    <s>₹45999</s>
                  </span>
                  <span className="text-sm text-red-500">
                    ₹42999
                  </span>
                </span>
                <div className="">
                  <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shcopci2">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            {/* End Item */}
            {/* Item */}
            <div id="hs-pro-shcopci3" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
              <div className="relative">
                <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87TsCDhwKtTRhIYWQrwI_Jk2L9lSl7XhYeA&s" alt="Product Image" />
                <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
                  <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                    <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </div>
              <div className="grow flex flex-col">
                <h4 className="text-sm text-gray-800 dark:text-neutral-200">
                  Sheraton Gardens
                </h4>
                <span className="mt-1.5">
                  <span className="text-sm text-gray-500 dark:text-neutral-500">
                    <s>₹225000</s>
                  </span>
                  <span className="text-sm text-red-500">
                    ₹200000
                  </span>
                </span>
                <div className="">
                  <button type="button" className="inline-flex items-center gap-x-1.5 text-[13px] text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" data-hs-remove-element="#hs-pro-shcopci3">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            {/* End Item */}
          </div>
        </div>
        {/* End Body */}
        {/* Footer */}
        <div className="py-4 sm:py-6 px-6 border-t border-gray-200 dark:border-neutral-700">
          {/* List */}
          <div className="mb-1 grid grid-cols-2 gap-2">
            <div>
              <p className="font-semibold text-gray-800 dark:text-neutral-200">
                Subtotal
              </p>
            </div>
            <div className="text-end">
              <span className="font-semibold text-gray-800 dark:text-neutral-200">₹251588</span>
            </div>
          </div>
          {/* End List */}
          <div className="flex items-center gap-x-2">
            <a className="py-3 px-4 relative w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300" href="../../pro/shop/cart.html">
              View cart (3)
            </a>
            <a className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-indigo-700" href="../../pro/shop/checkout.html">
              Checkout
            </a>
          </div>
        </div>
        {/* End Footer */}
      </div>
      {/* End Cart Offcanvas */}
    </footer>
  );
};

export default Footer;