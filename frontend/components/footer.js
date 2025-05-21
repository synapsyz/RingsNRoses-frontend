export default function category() {
  return (
  <>
   <footer className="bg-white border-t border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
    <div className="w-full max-w-[85rem] mx-auto py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
      {/* <!-- Grid --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Company</h4>

          <ul className="grid space-y-2">
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">About Preline</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Affiliate &amp; Influencer: Earn Commission</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Contact us</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Press</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Preline's Tree Planting Program</a></li>
          </ul>
        </div>
        {/* <!-- End Col --> */}

        <div>
          <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Customer service</h4>

          <ul className="grid space-y-2">
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Return and refund policy</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Intellectual property policy</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Shipping info</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Report suspicious activity</a></li>
          </ul>
        </div>
        {/* <!-- End Col --> */}

        <div>
          <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Help</h4>

          <ul className="grid space-y-2">
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Support center &amp; FAQ</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Safety center</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Preline purchase protection</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Sitemap</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Partner with Preline</a></li>
          </ul>
        </div>
        {/* <!-- End Col --> */}

        <div className="space-y-10">
          <div className="space-y-10">
            <div>
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">Download the Preline App</h4>

              {/* <!-- Social Brands --> */}
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
                          <stop stop-color="#63BE6B" />
                          <stop offset="0.506" stop-color="#5BBC6A" />
                          <stop offset="1" stop-color="#4AB96A" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_4406_2034" x1="0.0249224" y1="18.313" x2="31.9479" y2="18.313" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#3EC6F2" />
                          <stop offset="1" stop-color="#45AFE3" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_4406_2034" x1="0.0468809" y1="18.322" x2="31.963" y2="18.322" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#FAA51A" />
                          <stop offset="0.387" stop-color="#FAB716" />
                          <stop offset="0.741" stop-color="#FAC412" />
                          <stop offset="1" stop-color="#FAC80F" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_4406_2034" x1="0.169948" y1="27.082" x2="21.3452" y2="27.082" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#EC3B50" />
                          <stop offset="1" stop-color="#E7515B" />
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
              {/* <!-- End Social Brands --> */}
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">Stay connected</h4>

              {/* <!-- Social Brands --> */}
              <div className="mt-2 -mx-2 flex flex-wrap items-center gap-1">
                <a className="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
              {/* <!-- End Social Brands --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>

    <div className="w-full max-w-[85rem] pb-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-5 md:mb-10">
        <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">We accept</h4>

        {/* <!-- Cards --> */}
        <div className="flex flex-wrap gap-x-2">
          <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M34.482 9a8.17 8.17 0 0 1 3.052.577l-.463 2.926-.308-.143a5.638 5.638 0 0 0-2.534-.52c-1.343 0-1.946.591-1.96 1.168 0 .635.73 1.053 1.92 1.673 1.96.966 2.868 2.148 2.855 3.69C37.016 21.184 34.692 23 31.122 23c-1.526-.015-2.996-.347-3.794-.721l.476-3.043.448.217c1.106.505 1.834.72 3.192.72.98 0 2.03-.418 2.043-1.325 0-.592-.447-1.024-1.763-1.688-1.288-.649-3.01-1.73-2.982-3.676.014-2.639 2.38-4.484 5.74-4.484ZM21.798 22.798H25.2l2.128-13.552h-3.402l-2.128 13.552Z" fill="#00579F" />
            <path clip-rule="evenodd" d="M46.255 9.246h-2.631c-.812 0-1.428.245-1.779 1.124l-5.053 12.428h3.57l.714-2.033h4.368c.098.476.406 2.033.406 2.033H49L46.255 9.246Zm-4.2 8.75 1.36-3.79c-.007.01.038-.116.104-.305.098-.28.243-.693.343-.993l.237 1.167s.645 3.244.785 3.922h-2.828Z" fill="#00579F" fill-rule="evenodd" />
            <path d="m15.624 18.487 3.332-9.241h3.598l-5.348 13.538h-3.598l-3.052-11.852c2.156 1.168 4.088 3.518 4.704 5.68l.364 1.875Z" fill="#00579F" />
            <path d="M12.53 9.246H7.056L7 9.519c4.27 1.125 7.098 3.836 8.26 7.094l-1.19-6.228c-.196-.866-.798-1.11-1.54-1.14Z" fill="#FAA61A" />
            <rect height="31" rx="5.5" stroke="currentColor" className="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M28.017 22.85A9.137 9.137 0 0 1 22.108 25C17.078 25 13 20.97 13 16s4.078-9 9.108-9c2.255 0 4.318.81 5.909 2.15A9.137 9.137 0 0 1 33.925 7c5.03 0 9.108 4.03 9.108 9s-4.078 9-9.108 9a9.137 9.137 0 0 1-5.908-2.15Z" fill="#ED0006" />
            <path d="M28.017 22.85a8.937 8.937 0 0 0 3.2-6.85c0-2.743-1.242-5.2-3.2-6.85A9.137 9.137 0 0 1 33.925 7c5.03 0 9.108 4.03 9.108 9s-4.078 9-9.108 9a9.137 9.137 0 0 1-5.908-2.15Z" fill="#F9A000" />
            <path d="M28.017 22.85c1.958-1.65 3.2-4.107 3.2-6.85 0-2.743-1.242-5.2-3.2-6.85a8.937 8.937 0 0 0-3.2 6.85c0 2.743 1.241 5.2 3.2 6.85Z" fill="#FF5E00" />
            <rect height="31" rx="5.5" stroke="currentColor" className="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M17.69 5.001h8.528c1.19 0 1.93 1 1.652 2.228L23.9 24.775C23.62 26.001 22.43 27 21.239 27H12.71c-1.188 0-1.93-1-1.653-2.225L15.03 7.23c.278-1.229 1.469-2.228 2.66-2.228Z" fill="#E21836" />
            <path d="M25.507 5h9.806c1.19 0 .654.999.374 2.228l-3.97 17.546C31.44 26 31.526 27 30.333 27h-9.806c-1.192 0-1.93-1-1.65-2.225l3.969-17.546C23.128 5.998 24.316 5 25.507 5Z" fill="#00447C" />
            <path d="M34.925 5h8.527c1.192 0 1.932.999 1.652 2.228l-3.969 17.546C40.855 26 39.662 27 38.47 27h-8.523c-1.192 0-1.932-1-1.653-2.225l3.97-17.546C32.542 5.998 33.732 5 34.924 5Z" fill="#007B84" />
            <path d="M19.917 10.623c-.877.01-1.136 0-1.219-.02-.032.155-.623 2.965-.625 2.967-.127.569-.22.974-.535 1.236a.937.937 0 0 1-.63.225c-.388 0-.615-.198-.653-.575l-.007-.13.119-.766s.62-2.56.732-2.899a.246.246 0 0 0 .009-.038c-1.21.01-1.423 0-1.438-.02-.008.027-.038.186-.038.186l-.634 2.886-.055.245-.105.8c0 .238.045.432.135.596.29.52 1.113.597 1.58.597.6 0 1.164-.131 1.544-.37.661-.403.834-1.031.988-1.59l.072-.286s.64-2.66.748-3.006c.005-.019.006-.029.012-.038Zm2.177 2.145a1.65 1.65 0 0 0-.69.166c-.091.05-.178.105-.27.161l.083-.307-.046-.052c-.537.112-.657.127-1.152.198l-.042.029c-.058.492-.109.861-.322 1.827-.082.356-.166.715-.25 1.07l.022.046c.509-.028.663-.028 1.104-.02l.036-.04c.056-.296.064-.366.188-.965.058-.284.18-.908.24-1.13.11-.053.22-.105.323-.105.248 0 .218.222.208.31-.01.15-.1.635-.193 1.052l-.062.27c-.043.198-.09.391-.133.588l.019.04c.5-.028.653-.028 1.081-.02l.05-.04c.078-.463.1-.586.238-1.26l.069-.308c.134-.605.2-.912.1-1.162-.108-.28-.365-.348-.601-.348Zm2.431.634c-.266.052-.436.088-.605.11-.167.028-.33.053-.588.09l-.02.019-.018.015c-.027.197-.046.368-.082.568-.03.207-.076.443-.151.781-.059.26-.09.35-.122.441-.033.091-.069.18-.134.435l.015.023.013.022c.24-.012.398-.02.56-.022.161-.006.328 0 .587.002l.023-.02.024-.02c.038-.23.043-.292.066-.404.023-.12.062-.287.158-.731.045-.21.096-.417.143-.63.048-.213.1-.422.148-.63l-.007-.026-.01-.023Zm.006-.854c-.242-.147-.667-.1-.953.102-.284.2-.317.482-.076.63.238.144.664.101.948-.104.284-.203.32-.483.08-.628Zm1.463 3.404c.49 0 .991-.14 1.369-.551.29-.334.424-.832.47-1.036.15-.679.033-.996-.114-1.189-.223-.294-.618-.388-1.027-.388-.246 0-.832.025-1.29.46-.329.313-.48.738-.572 1.146-.093.415-.2 1.163.469 1.442.206.09.503.116.695.116Zm-.038-1.527c.113-.514.246-.946.586-.946.266 0 .286.322.167.837-.021.115-.118.54-.25.721-.092.134-.2.215-.32.215-.036 0-.249 0-.252-.325a2.27 2.27 0 0 1 .069-.502Zm3.1 1.46.038-.04c.055-.295.064-.365.184-.964.06-.284.184-.908.243-1.13.11-.053.217-.105.324-.105.246 0 .216.222.207.31-.01.15-.1.635-.194 1.052l-.058.27c-.045.198-.093.391-.136.588l.018.04c.503-.028.65-.028 1.08-.02l.052-.04c.075-.463.096-.586.237-1.259l.067-.31c.135-.604.203-.911.104-1.161-.11-.28-.37-.348-.603-.348-.154 0-.438.039-.69.167-.09.048-.18.104-.268.16l.077-.307-.041-.052c-.537.112-.66.127-1.155.199l-.038.028c-.06.492-.109.86-.322 1.827-.081.356-.166.716-.25 1.07l.023.046c.509-.028.66-.028 1.101-.02Zm3.693.02.22-1.099s.16-.69.17-.715c0 0 .05-.072.1-.1h.075c.698 0 1.486 0 2.104-.469.42-.32.708-.795.836-1.37.034-.142.058-.31.058-.478 0-.22-.043-.438-.167-.609-.315-.454-.943-.462-1.667-.466l-.357.004c-.927.012-1.3.008-1.452-.011l-.037.193-.332 1.587-.832 3.528c.81-.01 1.141-.01 1.28.006Zm.615-2.814.352-1.575.011-.082.005-.061.141.015.745.066c.288.114.406.41.324.794-.076.352-.298.648-.583.791-.234.121-.522.131-.818.131h-.191l.014-.08Zm2.199 1.363c-.094.41-.2 1.158.464 1.424.212.093.402.12.595.11.204-.01.393-.116.568-.268l-.047.188.03.04c.478-.021.626-.021 1.144-.017l.047-.037c.076-.458.147-.902.344-1.778.096-.42.191-.835.29-1.253l-.016-.046c-.535.102-.678.124-1.192.199l-.04.032-.015.125a.741.741 0 0 0-.375-.318c-.229-.093-.766.027-1.228.46-.325.31-.48.733-.57 1.14Zm1.123.025c.115-.505.246-.932.587-.932.216 0 .33.205.306.554l-.061.283c-.034.15-.071.299-.107.447-.037.102-.08.198-.126.262-.088.128-.297.208-.417.208-.034 0-.244 0-.252-.32-.001-.159.03-.322.07-.502Zm5.868-1.666-.042-.049c-.529.11-.625.128-1.111.196l-.036.036-.006.024-.001-.008c-.362.86-.352.674-.646 1.35l-.004-.082-.073-1.467-.047-.049c-.554.11-.567.128-1.08.196l-.04.036c-.005.018-.005.037-.008.058l.003.008c.064.336.049.261.113.793.03.26.07.523.1.78.05.432.078.644.14 1.302-.346.587-.428.81-.76 1.325l.002.005-.235.382c-.027.04-.05.068-.085.08a.344.344 0 0 1-.154.022h-.13l-.193.661.663.012c.389-.002.633-.189.765-.44l.416-.735H40.1l.043-.052c.28-.621 2.412-4.384 2.412-4.384Zm-6.991 8.682h-.281l1.04-3.54h.345l.11-.366.01.406c-.013.25.179.473.682.436h.582l.2-.681h-.218c-.127 0-.185-.033-.178-.103l-.01-.413h-1.078v.002c-.349.008-1.39.034-1.6.092-.256.068-.524.267-.524.267l.105-.365H33.74l-.21.724-1.054 3.595h-.205l-.2.678h2.008l-.067.225h.99l.065-.226h.278l.218-.73Zm-.824-2.821c-.162.046-.462.185-.462.185l.267-.905h.801l-.193.66s-.248.015-.413.06Zm.015 1.293s-.252.032-.417.07c-.164.052-.47.212-.47.212l.277-.942h.805l-.195.66Zm-.449 1.537h-.804l.233-.795h.801l-.23.795Zm1.936-2.197h1.158l-.166.555h-1.174l-.176.607h1.027l-.778 1.127a.322.322 0 0 1-.158.136.45.45 0 0 1-.208.062h-.285l-.196.664h.745c.388 0 .617-.181.785-.42l.534-.75.114.762a.357.357 0 0 0 .192.26c.075.038.152.104.26.114.117.005.202.009.258.009h.366l.22-.744h-.145c-.082 0-.225-.014-.25-.04-.024-.033-.024-.083-.037-.16l-.116-.764h-.476l.209-.256h1.171l.18-.607h-1.084l.169-.555h1.081l.2-.684h-3.223l-.197.684Zm-9.785 2.351.27-.926h1.111l.204-.688h-1.113l.17-.57h1.087l.201-.667h-2.72l-.197.667h.618l-.165.57h-.62l-.204.7h.617l-.36 1.225c-.049.162.023.224.068.3a.299.299 0 0 0 .199.149c.109.025.183.04.285.04h1.253l.223-.763-.555.079c-.108 0-.405-.014-.372-.116Zm.127-4.433-.281.524a.606.606 0 0 1-.164.219c-.043.027-.128.039-.251.039h-.147l-.197.67h.488c.235 0 .415-.088.501-.133.093-.05.117-.022.188-.093l.165-.147h1.524l.202-.697h-1.115l.195-.382h-1.108Zm2.25 4.447c-.026-.039-.007-.107.032-.248l.417-1.419h1.482c.216-.003.372-.006.473-.013a.95.95 0 0 0 .356-.124.675.675 0 0 0 .26-.246c.063-.09.167-.29.255-.596l.524-1.796-1.538.009s-.473.072-.682.151c-.21.089-.51.336-.51.336l.138-.492h-.95l-1.33 4.54a2.886 2.886 0 0 0-.086.38c-.002.083.102.165.17.227.079.062.197.052.31.062.118.01.287.015.52.015h.73l.224-.779-.654.064a.17.17 0 0 1-.141-.071Zm.718-2.625h1.556l-.099.319c-.014.007-.047-.016-.206.003h-1.347l.096-.322Zm.311-1.071h1.57l-.113.384s-.74-.007-.858.015c-.521.093-.826.38-.826.38l.227-.78Zm1.18 2.459a.172.172 0 0 1-.06.098c-.032.021-.084.029-.16.029H30.6l.013-.389h-.922l-.037 1.9c-.002.138.011.217.109.28.097.08.397.09.802.09h.578l.208-.711-.503.028-.167.01c-.023-.01-.045-.019-.07-.044-.02-.022-.056-.008-.05-.146l.004-.487.527-.022c.285 0 .407-.096.511-.187.1-.087.132-.187.169-.322l.088-.431h-.725l-.092.304Z" fill="#FEFEFE" />
            <rect height="31" rx="5.5" stroke="currentColor" className="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg className="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M19.648 15.984c0 2.074 1.629 3.683 3.725 3.683.592 0 1.1-.117 1.726-.411v-1.62c-.55.55-1.038.772-1.662.772-1.386 0-2.37-1.005-2.37-2.434 0-1.355 1.015-2.424 2.306-2.424.656 0 1.153.235 1.726.794v-1.62c-.604-.306-1.101-.433-1.694-.433-2.085 0-3.757 1.642-3.757 3.693ZM16.116 14.27c0 .382.242.584 1.068.89 1.566.572 2.03 1.08 2.03 2.2 0 1.366-1.003 2.317-2.434 2.317-1.047 0-1.809-.412-2.443-1.343l.89-.856c.316.612.845.94 1.501.94.614 0 1.069-.423 1.069-.995 0-.296-.138-.55-.413-.73-.138-.085-.412-.212-.951-.402-1.293-.465-1.736-.962-1.736-1.935 0-1.155.952-2.022 2.2-2.022.774 0 1.482.265 2.074.783l-.72.943c-.359-.402-.698-.572-1.11-.572-.593 0-1.025.338-1.025.783Z" fill="#231F20" />
            <path clip-rule="evenodd" d="M8.02 12.451H6v7.057h2.01c1.068 0 1.84-.252 2.518-.815a3.54 3.54 0 0 0 1.28-2.709c0-2.082-1.555-3.533-3.788-3.533Zm1.608 5.301c-.432.39-.994.561-1.883.561h-.37v-4.666h.37c.89 0 1.429.159 1.883.57.476.424.763 1.081.763 1.757 0 .677-.287 1.354-.763 1.778Z" fill="#231F20" fill-rule="evenodd" />
            <path d="M13.819 12.451h-1.377v7.057h1.377V12.45ZM34.13 12.451l1.882 4.74 1.906-4.74h1.492l-3.048 7.238h-.74l-2.995-7.238h1.503ZM40.033 19.508h3.903v-1.195h-2.528v-1.905h2.435v-1.195h-2.435v-1.566h2.528V12.45h-3.903v7.057Z" fill="#231F20" />
            <path clip-rule="evenodd" d="M46.889 12.451c1.587 0 2.497.762 2.497 2.083 0 1.08-.57 1.79-1.607 2L50 19.509h-1.693l-1.905-2.835h-.18v2.835h-1.374V12.45h2.04Zm-.666 3.249h.402c.879 0 1.345-.382 1.345-1.091 0-.687-.466-1.046-1.323-1.046h-.424V15.7Z" fill="#231F20" fill-rule="evenodd" />
            <path d="M29.302 19.758a3.754 3.754 0 1 0 0-7.508 3.754 3.754 0 0 0 0 7.508Z" fill="#F48120" />
            <path d="M56 20c-1.492 1.035-12.661 8.428-32 12h28.85c1.74 0 3.15-1.39 3.15-3.104V20Z" fill="#F47216" />
            <rect height="31" rx="5.5" stroke="currentColor" className="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>
        </div>
        {/* <!-- End Cards --> */}
      </div>

      {/* <!-- List --> */}
      <ul className="flex flex-wrap items-center whitespace-nowrap gap-3">
        <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <p className="text-xs text-gray-500 dark:text-neutral-500">
            © 2025 Preline Labs.
          </p>
        </li>
        <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <a className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
            Terms and Conditions
          </a>
        </li>
        <li className="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <a className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
            Privacy &amp; Policy
          </a>
        </li>
      </ul>
      {/* <!-- End List --> */}
    </div>

      {/* <!-- Cart Offcanvas --> */}
  <div id="hs-pro-shco" className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform size-full sm:w-100 z-80 flex flex-col bg-white hidden dark:bg-neutral-800" role="dialog" tabindex="-1" aria-labelledby="hs-pro-shco-label">
    {/* <!-- Header --> */}
    <div className="py-3 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
      <h3 id="hs-pro-shco-label" className="font-medium text-gray-800 dark:text-neutral-200">
        Cart (3 items)
      </h3>
      <button type="button" className="py-1.5 px-2 inline-flex justify-center items-center gap-x-1 rounded-full border border-gray-200 text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700" aria-label="Close" data-hs-overlay="#hs-pro-shco">
        <span className="hidden lg:block">Esc</span>
        <span className="block lg:hidden">Close</span>
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
    {/* <!-- End Header --> */}

    {/* <!-- Body --> */}
    <div className="h-full overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      {/* <!-- Alert --> */}
      <div className="py-4 px-6 relative overflow-hidden bg-linear-to-r from-orange-100 via-purple-200 via-70% to-indigo-200 dark:from-orange-800 dark:via-purple-800 dark:to-indigo-800" role="alert" tabindex="-1" aria-labelledby="hs-pro-shfshal-label">
        <h4 id="hs-pro-shfshal-label" className="font-medium text-gray-800 dark:text-neutral-200">
          Free shipping&nbsp;on orders over $50
        </h4>
        <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
          <a className="font-medium text-xs text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="./login.html">Log In</a> or <a className="font-medium text-xs text-gray-800 underline underline-offset-4 hover:text-indigo-600 focus:outline-hidden focus:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400 dark:focus:text-indigo-400" href="./create-account.html">Register</a>
        </p>
      </div>
      {/* <!-- End Alert --> */}

      <div className="p-6 space-y-7">
        {/* <!-- Item --> */}
        <div id="hs-pro-shcopci1" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
          <div className="relative">
            <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://cdn.augrav.com/online/jewels/2016/01/Beautiful-punjabi-mehandi-designs.jpg" alt="Product Image"/>

            <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
              <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

            {/* <!-- <ul className="mt-1.5 space-y-1">
              <li className="text-xs text-gray-500 dark:text-neutral-500">
              
              </li>
              <li className="text-xs text-gray-500 dark:text-neutral-500">
              
              </li>
            </ul>

            <p className="mt-1.5 text-xs text-gray-500 dark:text-neutral-500">
              <span>Qty:</span>
              <span>1</span>
            </p> --> */}

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
        {/* <!-- End Item --> */}

        {/* <!-- Item --> */}
        <div id="hs-pro-shcopci2" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
          <div className="relative">
            <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://knotstories.in/wp-content/uploads/2024/02/image8-1.webp" alt="Product Image"/>

            <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
              <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        {/* <!-- End Item --> */}

        {/* <!-- Item --> */}
        <div id="hs-pro-shcopci3" className="hs-removing:opacity-0 duration-300 flex gap-x-5">
          <div className="relative">
            <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87TsCDhwKtTRhIYWQrwI_Jk2L9lSl7XhYeA&s" alt="Product Image"/>

            <div className="absolute top-0 end-0 z-10 pt-1 pe-1">
              <button type="button" className="size-5 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-white">
                <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        {/* <!-- End Item --> */}
      </div>
    </div>
    {/* <!-- End Body --> */}

    {/* <!-- Footer --> */}
    <div className="py-4 sm:py-6 px-6 border-t border-gray-200 dark:border-neutral-700">
      {/* <!-- List --> */}
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
      {/* <!-- End List --> */}


      <div className="flex items-center gap-x-2">
        <a className="py-3 px-4 relative w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300" href="../../pro/shop/cart.html">
          View cart (3)
        </a>

        <a className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-indigo-700" href="../../pro/shop/checkout.html">
          Checkout
        </a>
      </div>
    </div>
    {/* <!-- End Footer --> */}
  </div>
  {/* <!-- End Cart Offcanvas --> */}
  </footer>
  </>
    );
}
