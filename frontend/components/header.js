export default function Header() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-neutral-800">
        <div className="max-w-[85rem] flex justify-between w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-5">

          </div>

          <ul className="flex flex-wrap items-center gap-3">
            <li className="inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
              <button type="button" className="flex items-center gap-x-1.5 text-start text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-overlay="#hs-pro-shmnrsm">
                <img className="shrink-0 size-3.5 rounded-full" src="/assets/vendor/svg-country-flags/png250px/in.png" alt="English" />
                Chennai
              </button>
            </li>


            <li className="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
              <a className="text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
                Help
              </a>
            </li>
            <li className="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
              <a className="text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
                Mobile app
              </a>
            </li>
            <li className="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
              <button type="button" className="hs-dark-mode-active:hidden flex hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="dark">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
                <span className="sr-only">Dark mode</span>
              </button>
              <button type="button" className="hs-dark-mode-active:flex hidden hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="light">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
                <span className="sr-only">Light mode</span>
              </button>

            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[85rem] basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex md:flex-nowrap md:items-center gap-2 lg:gap-6">

          <div className="order-1 md:w-auto flex items-center gap-x-1">
            <div className="hidden sm:block">
              <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="./index.html" aria-label="Preline">
                <svg className="w-28 h-auto" width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4413 63.3563 11.1335 64.7474 11.1335C65.683 11.1335 66.5539 11.2843 67.3603 11.5859C68.1728 11.8814 68.8806 12.3277 69.4839 12.9247C70.0932 13.5218 70.5672 14.2727 70.9057 15.1776C71.2443 16.0762 71.4135 17.1288 71.4135 18.3352V19.4155H59.4384V16.978H67.7111C67.7111 16.4117 67.588 15.91 67.3418 15.473C67.0956 15.036 66.754 14.6944 66.317 14.4482C65.8861 14.1958 65.3844 14.0696 64.812 14.0696C64.2149 14.0696 63.6856 14.2081 63.2239 14.4851C62.7684 14.7559 62.4114 15.1222 62.1529 15.5838C61.8944 16.0393 61.762 16.5471 61.7559 17.1072V19.4247C61.7559 20.1264 61.8851 20.7327 62.1437 21.2436C62.4083 21.7545 62.7807 22.1484 63.2608 22.4254C63.741 22.7024 64.3103 22.8409 64.9689 22.8409C65.406 22.8409 65.8061 22.7794 66.1692 22.6562C66.5324 22.5331 66.8432 22.3485 67.1018 22.1023C67.3603 21.8561 67.5572 21.5545 67.6927 21.1974L71.3304 21.4375C71.1458 22.3116 70.7672 23.0748 70.1948 23.7273C69.6285 24.3736 68.896 24.8783 67.9974 25.2415C67.1048 25.5985 66.0738 25.777 64.9043 25.777ZM77.1335 6.59091V25.5H73.2003V6.59091H77.1335ZM79.5043 25.5V11.3182H83.4375V25.5H79.5043ZM81.4801 9.49006C80.8954 9.49006 80.3937 9.29616 79.9752 8.90838C79.5628 8.51444 79.3566 8.04356 79.3566 7.49574C79.3566 6.95407 79.5628 6.48935 79.9752 6.10156C80.3937 5.70762 80.8954 5.51065 81.4801 5.51065C82.0649 5.51065 82.5635 5.70762 82.9759 6.10156C83.3944 6.48935 83.6037 6.95407 83.6037 7.49574C83.6037 8.04356 83.3944 8.51444 82.9759 8.90838C82.5635 9.29616 82.0649 9.49006 81.4801 9.49006ZM89.7415 17.3011V25.5H85.8083V11.3182H89.5569V13.8203H89.723C90.037 12.9955 90.5632 12.343 91.3019 11.8629C92.0405 11.3767 92.9361 11.1335 93.9887 11.1335C94.9735 11.1335 95.8322 11.349 96.5647 11.7798C97.2971 12.2107 97.8665 12.8262 98.2728 13.6264C98.679 14.4205 98.8821 15.3684 98.8821 16.4702V25.5H94.9489V17.1719C94.9551 16.304 94.7335 15.6269 94.2841 15.1406C93.8348 14.6482 93.2162 14.402 92.4283 14.402C91.8989 14.402 91.4311 14.5159 91.0249 14.7436C90.6248 14.9714 90.3109 15.3037 90.0831 15.7408C89.8615 16.1716 89.7477 16.6918 89.7415 17.3011ZM107.665 25.777C106.206 25.777 104.951 25.4815 103.898 24.8906C102.852 24.2936 102.045 23.4503 101.479 22.3608C100.913 21.2652 100.63 19.9695 100.63 18.4737C100.63 17.0149 100.913 15.7346 101.479 14.6328C102.045 13.531 102.842 12.6723 103.87 12.0568C104.905 11.4413 106.117 11.1335 107.508 11.1335C108.444 11.1335 109.315 11.2843 110.121 11.5859C110.934 11.8814 111.641 12.3277 112.245 12.9247C112.854 13.5218 113.328 14.2727 113.667 15.1776C114.005 16.0762 114.174 17.1288 114.174 18.3352V19.4155H102.199V16.978H110.472C110.472 16.4117 110.349 15.91 110.103 15.473C109.856 15.036 109.515 14.6944 109.078 14.4482C108.647 14.1958 108.145 14.0696 107.573 14.0696C106.976 14.0696 106.446 14.2081 105.985 14.4851C105.529 14.7559 105.172 15.1222 104.914 15.5838C104.655 16.0393 104.523 16.5471 104.517 17.1072V19.4247C104.517 20.1264 104.646 20.7327 104.905 21.2436C105.169 21.7545 105.542 22.1484 106.022 22.4254C106.502 22.7024 107.071 22.8409 107.73 22.8409C108.167 22.8409 108.567 22.7794 108.93 22.6562C109.293 22.5331 109.604 22.3485 109.863 22.1023C110.121 21.8561 110.318 21.5545 110.454 21.1974L114.091 21.4375C113.907 22.3116 113.528 23.0748 112.956 23.7273C112.389 24.3736 111.657 24.8783 110.758 25.2415C109.866 25.5985 108.835 25.777 107.665 25.777Z" className="fill-emerald-600 dark:fill-white" fill="currentColor" />
                  <path d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12" className="stroke-emerald-600 dark:stroke-white" stroke="currentColor" stroke-width="2" />
                  <path d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12" className="stroke-emerald-600 dark:stroke-white" stroke="currentColor" stroke-width="2" />
                  <circle cx="13" cy="16.5214" r="5" className="fill-emerald-600 dark:fill-white" fill="currentColor" />
                </svg>
              </a>
            </div>
            <div className="sm:hidden">
              <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="./index.html" aria-label="Preline">
                <svg className="w-[31px] h-auto" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" className="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" className="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
                  <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" className="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:w-full order-2 md:grow md:w-auto">
            <div className="relative flex basis-full items-center gap-x-1 md:gap-x-3">
              <div className="hs-dropdown [--adaptive:none] [--auto-close:inside] md:inline-block">
                <button id="hs-pro-shmnctdm" type="button" className="hs-dropdown-toggle relative py-[7px] sm:py-2 sm:py-2.5 px-3 flex items-center gap-x-1.5 text-sm text-start bg-emerald-600 border border-transparent text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <svg className="hs-dropdown-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <svg className="hs-dropdown-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  Catalog
                </button>
                <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-20 top-full start-0 min-w-60 bg-white shadow-xl before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shmnctdm">
                  <div className="max-w-[85rem] w-full mx-auto py-2 md:py-4 px-4 sm:px-6 lg:px-8">
                    <select id="hs-catalog-sidebar-nav-select" className="hidden" data-hs-select='{
                    "placeholder": "Select option...",
                    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span className=\"me-2\" data-icon></span><span className=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
                    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 px-3 pe-9 flex items-center text-nowrap w-full cursor-pointer bg-gray-100 text-gray-800 rounded-lg text-start text-sm dark:bg-neutral-800 dark:text-neutral-200",
                    "wrapperClasses": "sm:hidden mb-4",
                    "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                    "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                    "optionTemplate": "<div className=\"flex items-center\"><div className=\"me-3\" data-icon></div><div className=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div>",
                    "extraMarkup": "<div className=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg className=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                  }'>
                      <option value="#mega-menu-catalog-tab-1" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\"/><path d=\"M12 18h.01\"/></svg>"
                    }' selected>Venue</option>
                      <option value="#mega-menu-catalog-tab-2" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z\"/></svg>"
                    }'>Bride &amp; Groom Essentials</option>
                      <option value="#mega-menu-catalog-tab-3" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 20h10\"/><path d=\"M10 20c5.5-2.5.8-6.4 3-10\"/><path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\"/><path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\"/></svg>"
                    }'>Catering &amp; Food</option>
                      <option value="#mega-menu-catalog-tab-4" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 12h.01\"/><path d=\"M15 12h.01\"/><path d=\"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5\"/><path d=\"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1\"/></svg>"
                    }'>Decor &amp; Setup</option>
                      <option value="#mega-menu-catalog-tab-5" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6h3\"/><path d=\"M17 6h.01\"/><rect width=\"18\" height=\"20\" x=\"3\" y=\"2\" rx=\"2\"/><circle cx=\"12\" cy=\"13\" r=\"5\"/><path d=\"M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5\"/></svg>"
                    }'>Entertainment</option>
                      <option value="#mega-menu-catalog-tab-6" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11.1 7.1a16.55 16.55 0 0 1 10.9 4\"/><path d=\"M12 12a12.6 12.6 0 0 1-8.7 5\"/><path d=\"M16.8 13.6a16.55 16.55 0 0 1-9 7.5\"/><path d=\"M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10\"/><path d=\"M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5\"/><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>"
                    }'>Photography &amp; Videography</option>
                      <option value="#mega-menu-catalog-tab-7" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z\"/><path d=\"M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8\"/><path d=\"M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3\"/><path d=\"M18 6h4\"/><path d=\"m5 10-2 8\"/><path d=\"m7 18 2-8\"/></svg>"
                    }'>Invitations &amp; Stationery</option>
                      <option value="#mega-menu-catalog-tab-8" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z\"/><path d=\"M10 2c1 .5 2 2 2 5\"/></svg>"
                    }'>Logistics</option>
                      <option value="#mega-menu-catalog-tab-9" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z\"/><path d=\"m8.5 8.5 7 7\"/></svg>"
                    }'>Gifts &amp; Return Favors</option>
                      <option value="#mega-menu-catalog-tab-10" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11.25 16.25h1.5L12 17z\"/><path d=\"M16 14v.5\"/><path d=\"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309\"/><path d=\"M8 14v.5\"/><path d=\"M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5\"/></svg>"
                    }'>Event Managers</option>
                      <option value="#mega-menu-catalog-tab-11" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><path d=\"M8 11h8\"/><path d=\"M8 7h6\"/></svg>"
                    }'>Makeup &amp; Styling</option>
                      <option value="#mega-menu-catalog-tab-12" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"4\" cy=\"4\" r=\"2\"/><path d=\"m14 5 3-3 3 3\"/><path d=\"m14 10 3-3 3 3\"/><path d=\"M17 14V2\"/><path d=\"M17 14H7l-5 8h20Z\"/><path d=\"M8 14v8\"/><path d=\"m9 14 5 8\"/></svg>"
                    }'>Sound &amp; Lighting</option>
                      <option value="#mega-menu-catalog-tab-13" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3\"/><path d=\"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z\"/><path d=\"M5 18v2\"/><path d=\"M19 18v2\"/></svg>"
                    }'>Rentals</option>
                      <option value="#mega-menu-catalog-tab-14" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 3h12l4 6-10 13L2 9Z\"/><path d=\"M11 3 8 9l4 13 4-13-3-6\"/><path d=\"M2 9h20\"/></svg>"
                    }'>Legal &amp; Documentation</option>
                      <option value="#mega-menu-catalog-tab-15" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"6\" cy=\"15\" r=\"4\"/><circle cx=\"18\" cy=\"15\" r=\"4\"/><path d=\"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2\"/><path d=\"M2.5 13 5 7c.7-1.3 1.4-2 3-2\"/><path d=\"M21.5 13 19 7c-.7-1.3-1.5-2-3-2\"/></svg>"
                    }'>Childcare &amp; Elderly Assitance</option>
                      <option value="#mega-menu-catalog-tab-16" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"6\" x2=\"10\" y1=\"11\" y2=\"11\"/><line x1=\"8\" x2=\"8\" y1=\"9\" y2=\"13\"/><line x1=\"15\" x2=\"15.01\" y1=\"12\" y2=\"12\"/><line x1=\"18\" x2=\"18.01\" y1=\"10\" y2=\"10\"/><path d=\"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z\"/></svg>"
                    }'>Cleaning &amp; Maintenance</option>
                      <option value="#mega-menu-catalog-tab-17" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13\"/><path d=\"m8 6 2-2\"/><path d=\"m18 16 2-2\"/><path d=\"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17\"/><path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"/><path d=\"m15 5 4 4\"/></svg>"
                    }'>Stationery</option>
                      <option value="#mega-menu-catalog-tab-18" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4\"/><path d=\"M14 13.12c0 2.38 0 6.38-1 8.88\"/><path d=\"M17.29 21.02c.12-.6.43-2.3.5-3.02\"/><path d=\"M2 12a10 10 0 0 1 18-6\"/><path d=\"M2 16h.01\"/><path d=\"M21.8 16c.2-2 .131-5.354 0-6\"/><path d=\"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2\"/><path d=\"M8.65 22c.21-.66.45-1.32.57-2\"/><path d=\"M9 6.8a6 6 0 0 1 9 5.2v2\"/></svg>"
                    }'>Digital Goods</option>
                      <option value="#mega-menu-catalog-tab-19" data-hs-select-option='{
                      "icon": "<svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/></svg>"
                    }'>Music</option>
                    </select>

                    <div className="flex">
                      <div className="hidden sm:block sm:pe-4 w-96 h-[75dvh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <div id="hs-catalog-sidebar-nav-tabs" className="flex flex-col gap-y-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal" data-hs-tabs='{
                        "eventType": "hover",
                        "preventNavigationResolution": "sm"
                      }'>
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 active" id="mega-menu-catalog-tab-item-1" aria-selected="true" data-hs-tab="#mega-menu-catalog-tab-1" aria-controls="mega-menu-catalog-tab-1" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pinned-icon lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" /><circle cx="12" cy="8" r="2" /><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" /></svg>


                            Venue
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-2" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-2" aria-controls="mega-menu-catalog-tab-2" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shirt-icon lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg>
                            Bride &amp; Groom Essentials
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-3" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-3" aria-controls="mega-menu-catalog-tab-3" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hand-platter-icon lucide-hand-platter"><path d="M12 3V2" /><path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" /><path d="M2 14h12a2 2 0 0 1 0 4h-2" /><path d="M4 10h16" /><path d="M5 10a7 7 0 0 1 14 0" /><path d="M5 14v6a1 1 0 0 1-1 1H2" /></svg>
                            Catering &amp; Food
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-4" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-4" aria-controls="mega-menu-catalog-tab-4" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-flower-icon lucide-flower"><circle cx="12" cy="12" r="3" /><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" /><path d="M12 7.5V9" /><path d="M7.5 12H9" /><path d="M16.5 12H15" /><path d="M12 16.5V15" /><path d="m8 8 1.88 1.88" /><path d="M14.12 9.88 16 8" /><path d="m8 16 1.88-1.88" /><path d="M14.12 14.12 16 16" /></svg>
                            Decor &amp; Setup
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-5" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-5" aria-controls="mega-menu-catalog-tab-5" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-drama-icon lucide-drama"><path d="M10 11h.01" /><path d="M14 6h.01" /><path d="M18 6h.01" /><path d="M6.5 13.1h.01" /><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3" /><path d="M17.4 9.9c-.8.8-2 .8-2.8 0" /><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7" /><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4" /></svg>
                            Entertainment
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-6" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-6" aria-controls="mega-menu-catalog-tab-6" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-camera-icon lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>Photography &amp; Videography
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-7" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-7" aria-controls="mega-menu-catalog-tab-7" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail-check-icon lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><path d="m16 19 2 2 4-4" /></svg>
                            Invitations &amp; Stationery
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-9" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-9" aria-controls="mega-menu-catalog-tab-9" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" /></svg>
                            Gifts &amp; Return Favors
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-11" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-11" aria-controls="mega-menu-catalog-tab-11" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-brush-icon lucide-brush"><path d="m11 10 3 3" /><path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" /><path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" /></svg>
                            Makeup &amp; Styling
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}
                          <a className="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-13" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-13" aria-controls="mega-menu-catalog-tab-13" role="tab" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hand-coins-icon lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>
                            Rentals
                            <svg className="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </a>
                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}

                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}
                          {/* <!-- Link --> */}

                          {/* <!-- End Link --> */}
                        </div>
                      </div>
                      {/* <!-- End Sidebar --> */}

                      {/* <!-- Content --> */}
                      <div className="pe-4 sm:px-10 w-full h-[75dvh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">

                        {/* <!-- Tab --> */}
                        {/* <!-- Grid --> */}
                        <div id="mega-menu-catalog-tab-1" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-1">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.venuebookingz.com/24118-1720587040-wm-league-hotels-banquet-chennai-1.jpg" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Banquet Halls</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.unexplora.com/wp-content/uploads/2020/11/Untitled-design-85.jpg" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Resorts</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn0.weddingwire.in/vendor/4599/3_2/960/jpg/wedding-venue-aj-garden-outdoor-space-1_15_364599-161640601569768.jpeg" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Outdoor Lawns & Gardens</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/Top-7-Destination-Wedding-Locations-in-India.jpg" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Destination Venues</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://media.weddingz.in/images/ce4bb19da8f580022371692fda5715b5/thinking-of-a-beach-wedding-check-out-the-best-beach-wedding-venues-in-goa-2.jpg" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Beachside Venues</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://media.weddingz.in/photologue/1490602150941/palace-wedding-venues-in-india-gajner-palace.PNG" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Heritage Properties</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://imagewedz.oyoroomscdn.com/medium/photologue/images/diamond-banquet-chembur-mumbai-4.jpeg" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Community Halls</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.brides.com/thmb/6rWBPzOU1FKL8U4JJWdxTh7v4-8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/J0GNM_v_QLTPspmntIY9Wx0-blZ0KWIyAGTfiPDU7Vz73PGoHrCJhs8u9UmLiQvm3_tX_NmoFw1ylvOHf_c7M-S112OA0R0X2CuTxIhgaEscCQgLwczPt6ACGKFjcopy-df74a973bac843b69df2ff927153bc12.jpg" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Rooftop Venues</span>
                            </a>
                            {/* <!-- End Item --> */}


                          </div>
                          {/* <!-- Grid --> */}
                        </div>
                        {/* <!-- End Grid --> */}
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        {/* <!-- Grid --> */}
                        <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                            </a>
                            {/* <!-- End Item --> */}
                          </div>
                          {/* <!-- Grid --> */}
                        </div>
                        {/* <!-- End Grid --> */}
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        {/* <!-- Grid --> */}
                        <div id="mega-menu-catalog-tab-3" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-3">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                            </a>
                            {/* <!-- End Item --> */}
                          </div>
                          {/* <!-- Grid --> */}
                        </div>
                        {/* <!-- End Grid --> */}
                        {/* <!-- End Tab --> */}

                        <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                            </a>
                            {/* <!-- End Item --> */}
                          </div>
                          {/* <!-- Grid --> */}
                        </div>

                        <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                            </a>
                            {/* <!-- End Item --> */}
                          </div>
                          {/* <!-- Grid --> */}
                        </div>

                        <div id="mega-menu-catalog-tab-2" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1726828501829-9188cde81755?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Phones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Computers</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Home</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laptops</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1698729616468-5b2f627df845?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Smart Watches</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1662731340335-e5485bd50268?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tablets</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1522401195795-1d580bb06720?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cameras</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1594155187705-bd33d893961c?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">TVs</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                                <div className="absolute -top-0.5 end-0.5">
                                  <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                            </a>
                            {/* <!-- End Item --> */}

                            {/* <!-- Item --> */}
                            <a className="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div className="relative shrink-0">
                                <img className="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
                              </div>
                              <span className="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                            </a>
                            {/* <!-- End Item --> */}
                          </div>
                          {/* <!-- Grid --> */}
                        </div>

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-9" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-9">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-10" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-10">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-11" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-11">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-12" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-12">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-13" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-13">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-14" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-14">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-15" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-15">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-16" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-16">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-17" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-17">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-18" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-18">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}

                        {/* <!-- Tab --> */}
                        <div id="mega-menu-catalog-tab-19" className="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-19">
                          {/* <!-- Loading Indicator --> */}
                          <div className="h-full flex flex-col justify-center items-center text-center">
                            <span className="py-1.5 inline-flex gap-x-1">
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                              <span className="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                            </span>
                            <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                              This is a placeholder loader.<br />This conent is empty.
                            </p>
                          </div>
                          {/* <!-- End Loading Indicator --> */}
                        </div>
                        {/* <!-- End Tab --> */}
                      </div>
                      {/* <!-- End Content --> */}
                    </div>
                    {/* <!-- End Grid --> */}
                  </div>
                  {/* <!-- End Container --> */}
                </div>
                {/* <!-- End Dropdown Menu --> */}
              </div>
              {/* <!-- End Dropdown Link --> */}

              <div className="hidden md:block w-full">
                {/* <!-- Search Input --> */}
                <div className="relative w-full">
                  <input
                    type="text"
                    className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border border-gray-200 text-base sm:text-sm rounded-full focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400"
                    placeholder="Search venues, decorators, makeup artists..."
                  />
                  <div className="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
                    <button type="button" className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </button>
                  </div>
                  <div className="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-10 pe-1">
                    <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" aria-label="Close">
                      <span className="sr-only">Close</span>
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* <!-- End Search Input --> */}
              </div>
            </div>
          </div>
          {/* <!-- End Search --> */}

          {/* <!-- Widgets --> */}
          <div className="order-2 md:order-3 ms-auto lg:ms-0">
            <div className="flex justify-end items-center gap-x-2">
              {/* <!-- Favorites Button Icon --> */}
              <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                <button id="hs-pro-dnnd" type="button" className="relative shrink-0 inline-flex justify-center items-center gap-x-2 size-9.5 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span className="flex absolute top-0 end-0 z-10 -mt-1 -me-1">
                    <span className="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-gray-800 text-white rounded-full px-1 dark:bg-neutral-200 dark:text-neutral-800">
                      2
                      <span className="sr-only">Notifications</span>
                    </span>
                  </span>
                </button>
                {/* <!-- End Favorites Button Icon --> */}

                {/* <!-- Favorites Dropdown --> */}
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
                          <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87TsCDhwKtTRhIYWQrwI_Jk2L9lSl7XhYeA&s" alt="Product Image" />
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
                          <img className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700" src="https://content.jdmagicbox.com/v2/comp/chennai/m6/044pxx44.xx44.090921161513.h7m6/catalogue/sriji-sweets-vepery-chennai-sweet-shops-37f8bph.jpg" alt="Product Image" />
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
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                  <img className="shrink-0 size-8 rounded-full" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar"></img>
                </button>
                {/* <!-- End Account Button Icon --> */}

                {/* <!-- Account Dropdown --> */}
                <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full sm:w-72 hidden z-10 bg-white border-y sm:border-x border-gray-200 sm:border-gray-100 sm:mt-2 sm:rounded-xl shadow-lg before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shadnli">
                  <div className="p-2">
                    {/* <!-- Account Details --> */}
                    <a className="py-2 px-2.5 flex items-center gap-3 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="../../pro/shop/account.html">
                      <img className="shrink-0 size-10 rounded-full" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar"></img>

                      <div className="grow">
                        <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
                          James Collins
                        </span>
                        <p className="text-xs text-gray-500 dark:text-neutral-500">
                          jamescollins@site.so
                        </p>
                      </div>
                    </a>
                    {/* <!-- End Account Details --> */}


                    {/* <!-- List --> */}
                    <ul className="flex flex-col space-y-0.5">
                      <li>
                        <a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="../../pro/shop/personal-info.html">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

                    <div className="my-2 mx-2.5 h-px bg-gray-200 dark:bg-neutral-700"></div>

                    <p>
                      <button type="button" className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 hover:text-red-500 focus:outline-hidden focus:bg-gray-100 focus:text-red-500 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:hover:text-red-500 dark:focus:text-red-500">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          {/* <!-- End Widgets --> */}
        </div>

        <div className="md:hidden mt-2.5 md:mt-0 w-full">
          {/* <!-- Search Input --> */}
          <div className="relative w-full">
            <input type="text" className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border-gray-200 text-base sm:text-sm rounded-full focus:outline-hidden focus:border-emerald-600 focus:ring-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400" placeholder="Search venues, decorators, makeup artists..."></input>
            <div className="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
              <button type="button" className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
            <div className="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-10 pe-1">
              <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            </div>
          </div>
          {/* <!-- End Search Input --> */}
        </div>
      </div>
    </>
  );
}


