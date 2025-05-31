<!DOCTYPE html>
<html lang="en" class="relative min-h-full">
<head>
  <!-- Required Meta Tags Always Come First -->
  <meta charset="utf-8">
  <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="https://preline.co/">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.">

  <meta name="twitter:site" content="@preline">
  <meta name="twitter:creator" content="@preline">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Shop Listing | Preline Pro | Preline UI, crafted with Tailwind CSS">
  <meta name="twitter:description" content="A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.">
  <meta name="twitter:image" content="https://preline.co/assets/img/og-image.png">

  <meta property="og:url" content="https://preline.co/">
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Preline">
  <meta property="og:title" content="Shop Listing | Preline Pro | Preline UI, crafted with Tailwind CSS">
  <meta property="og:description" content="A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.">
  <meta property="og:image" content="https://preline.co/assets/img/og-image.png">

  <!-- Title -->
  <title>Shop Listing | Preline Pro | Preline UI, crafted with Tailwind CSS</title>

  <!-- Favicon -->
  <link rel="shortcut icon" href="../favicon.ico">

  <!-- Font -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- CSS HS -->
  <link rel="stylesheet" href="./assets/css/main.min.css?v=3.0.1">

  <!-- Theme Check and Update -->
  <script>
    const html = document.querySelector('html');
    const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
    const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
    else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
    else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
    else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
  </script>

  <link rel="stylesheet" href="./assets/vendor/apexcharts/dist/apexcharts.css">
  <style type="text/css">
    .apexcharts-tooltip.apexcharts-theme-light
    {
      background-color: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
  </style>
</head>

<body class="dark:bg-neutral-900">
  <!-- ========== HEADER ========== -->
  <header class="flex flex-col lg:flex-nowrap z-50 bg-white dark:bg-neutral-900">
    <!-- Topbar -->
    <div class="bg-gray-100 dark:bg-neutral-800">
      <div class="max-w-[85rem] flex justify-between w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-x-5">
          
        </div>

        <ul class="flex flex-wrap items-center gap-3">
          <li class="inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
            <button type="button" class="flex items-center gap-x-1.5 text-start text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-overlay="#hs-pro-shmnrsm">
              <img class="shrink-0 size-3.5 rounded-full" src="./assets/vendor/svg-country-flags/png250px/in.png" alt="English">
              Chennai
            </button>
          </li>
          <li class="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
            <a class="text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
              Help
            </a>
          </li>
          <li class="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
            <a class="text-xs text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
              Mobile app
            </a>
          </li>
          <li class="hidden sm:inline-flex items-center relative text-xs text-gray-500 ps-3.5 first:ps-0 first:after:hidden after:absolute after:top-1/2 after:start-0 after:inline-block after:w-px after:h-2.5 after:bg-gray-400 after:rounded-full after:-translate-y-1/2 after:rotate-12 dark:text-neutral-500 dark:after:bg-neutral-600">
            <!-- Dark Mode -->
            <button type="button" class="hs-dark-mode-active:hidden flex hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="dark">
              <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
              <span class="sr-only">Dark mode</span>
            </button>
            <button type="button" class="hs-dark-mode-active:flex hidden hs-dark-mode items-center gap-x-1.5 text-sm text-gray-500 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" data-hs-theme-click-value="light">
              <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <span class="sr-only">Light mode</span>
            </button>
            <!-- End Dark Mode -->
          </li>
        </ul>
      </div>
    </div>
    <!-- End Topbar -->

    <div class="max-w-[85rem] basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
      <div class="w-full flex md:flex-nowrap md:items-center gap-2 lg:gap-6">
        <!-- Logo -->
        <div class="order-1 md:w-auto flex items-center gap-x-1">
          <div class="hidden sm:block">
            <!-- Logo -->
            <a class="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="./index.html" aria-label="Preline">
              <svg class="w-28 h-auto" width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4413 63.3563 11.1335 64.7474 11.1335C65.683 11.1335 66.5539 11.2843 67.3603 11.5859C68.1728 11.8814 68.8806 12.3277 69.4839 12.9247C70.0932 13.5218 70.5672 14.2727 70.9057 15.1776C71.2443 16.0762 71.4135 17.1288 71.4135 18.3352V19.4155H59.4384V16.978H67.7111C67.7111 16.4117 67.588 15.91 67.3418 15.473C67.0956 15.036 66.754 14.6944 66.317 14.4482C65.8861 14.1958 65.3844 14.0696 64.812 14.0696C64.2149 14.0696 63.6856 14.2081 63.2239 14.4851C62.7684 14.7559 62.4114 15.1222 62.1529 15.5838C61.8944 16.0393 61.762 16.5471 61.7559 17.1072V19.4247C61.7559 20.1264 61.8851 20.7327 62.1437 21.2436C62.4083 21.7545 62.7807 22.1484 63.2608 22.4254C63.741 22.7024 64.3103 22.8409 64.9689 22.8409C65.406 22.8409 65.8061 22.7794 66.1692 22.6562C66.5324 22.5331 66.8432 22.3485 67.1018 22.1023C67.3603 21.8561 67.5572 21.5545 67.6927 21.1974L71.3304 21.4375C71.1458 22.3116 70.7672 23.0748 70.1948 23.7273C69.6285 24.3736 68.896 24.8783 67.9974 25.2415C67.1048 25.5985 66.0738 25.777 64.9043 25.777ZM77.1335 6.59091V25.5H73.2003V6.59091H77.1335ZM79.5043 25.5V11.3182H83.4375V25.5H79.5043ZM81.4801 9.49006C80.8954 9.49006 80.3937 9.29616 79.9752 8.90838C79.5628 8.51444 79.3566 8.04356 79.3566 7.49574C79.3566 6.95407 79.5628 6.48935 79.9752 6.10156C80.3937 5.70762 80.8954 5.51065 81.4801 5.51065C82.0649 5.51065 82.5635 5.70762 82.9759 6.10156C83.3944 6.48935 83.6037 6.95407 83.6037 7.49574C83.6037 8.04356 83.3944 8.51444 82.9759 8.90838C82.5635 9.29616 82.0649 9.49006 81.4801 9.49006ZM89.7415 17.3011V25.5H85.8083V11.3182H89.5569V13.8203H89.723C90.037 12.9955 90.5632 12.343 91.3019 11.8629C92.0405 11.3767 92.9361 11.1335 93.9887 11.1335C94.9735 11.1335 95.8322 11.349 96.5647 11.7798C97.2971 12.2107 97.8665 12.8262 98.2728 13.6264C98.679 14.4205 98.8821 15.3684 98.8821 16.4702V25.5H94.9489V17.1719C94.9551 16.304 94.7335 15.6269 94.2841 15.1406C93.8348 14.6482 93.2162 14.402 92.4283 14.402C91.8989 14.402 91.4311 14.5159 91.0249 14.7436C90.6248 14.9714 90.3109 15.3037 90.0831 15.7408C89.8615 16.1716 89.7477 16.6918 89.7415 17.3011ZM107.665 25.777C106.206 25.777 104.951 25.4815 103.898 24.8906C102.852 24.2936 102.045 23.4503 101.479 22.3608C100.913 21.2652 100.63 19.9695 100.63 18.4737C100.63 17.0149 100.913 15.7346 101.479 14.6328C102.045 13.531 102.842 12.6723 103.87 12.0568C104.905 11.4413 106.117 11.1335 107.508 11.1335C108.444 11.1335 109.315 11.2843 110.121 11.5859C110.934 11.8814 111.641 12.3277 112.245 12.9247C112.854 13.5218 113.328 14.2727 113.667 15.1776C114.005 16.0762 114.174 17.1288 114.174 18.3352V19.4155H102.199V16.978H110.472C110.472 16.4117 110.349 15.91 110.103 15.473C109.856 15.036 109.515 14.6944 109.078 14.4482C108.647 14.1958 108.145 14.0696 107.573 14.0696C106.976 14.0696 106.446 14.2081 105.985 14.4851C105.529 14.7559 105.172 15.1222 104.914 15.5838C104.655 16.0393 104.523 16.5471 104.517 17.1072V19.4247C104.517 20.1264 104.646 20.7327 104.905 21.2436C105.169 21.7545 105.542 22.1484 106.022 22.4254C106.502 22.7024 107.071 22.8409 107.73 22.8409C108.167 22.8409 108.567 22.7794 108.93 22.6562C109.293 22.5331 109.604 22.3485 109.863 22.1023C110.121 21.8561 110.318 21.5545 110.454 21.1974L114.091 21.4375C113.907 22.3116 113.528 23.0748 112.956 23.7273C112.389 24.3736 111.657 24.8783 110.758 25.2415C109.866 25.5985 108.835 25.777 107.665 25.777Z" class="fill-emerald-600 dark:fill-white" fill="currentColor" />
                <path d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12" class="stroke-emerald-600 dark:stroke-white" stroke="currentColor" stroke-width="2" />
                <path d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12" class="stroke-emerald-600 dark:stroke-white" stroke="currentColor" stroke-width="2" />
                <circle cx="13" cy="16.5214" r="5" class="fill-emerald-600 dark:fill-white" fill="currentColor" />
              </svg>
            </a>
            <!-- End Logo -->
          </div>
          <div class="sm:hidden">
            <a class="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="./index.html" aria-label="Preline">
              <svg class="w-[31px] h-auto" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" class="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" class="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
                <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" class="fill-emerald-600 dark:fill-emerald-500" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        <!-- End Logo -->

        <!-- Search -->
        <div class="md:w-full order-2 md:grow md:w-auto">
          <div class="relative flex basis-full items-center gap-x-1 md:gap-x-3">
            <!-- Dropdown Link -->
            <div class="hs-dropdown [--adaptive:none] [--auto-close:inside] md:inline-block">
              <!-- Link Button -->
              <button id="hs-pro-shmnctdm" type="button" class="hs-dropdown-toggle relative py-[7px] sm:py-2 sm:py-2.5 px-3 flex items-center gap-x-1.5 text-sm text-start bg-emerald-600 border border-transparent text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <svg class="hs-dropdown-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <svg class="hs-dropdown-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                Catalog
              </button>
              <!-- End Link Button -->

              <!-- Dropdown Menu -->
              <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-20 top-full start-0 min-w-60 bg-white shadow-xl before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-shmnctdm">
                <!-- Container -->
                <div class="max-w-[85rem] w-full mx-auto py-2 md:py-4 px-4 sm:px-6 lg:px-8">
                  <select id="hs-catalog-sidebar-nav-select" class="hidden" data-hs-select='{
                    "placeholder": "Select option...",
                    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
                    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 px-3 pe-9 flex items-center text-nowrap w-full cursor-pointer bg-gray-100 text-gray-800 rounded-lg text-start text-sm dark:bg-neutral-800 dark:text-neutral-200",
                    "wrapperClasses": "sm:hidden mb-4",
                    "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                    "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-3 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                    "optionTemplate": "<div class=\"flex items-center\"><div class=\"me-3\" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div>",
                    "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                  }'>
                    <option value="#mega-menu-catalog-tab-1" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-map-pinned-icon lucide-map-pinned\"><path d=\"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/><path d=\"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712\"/></svg>"
}' selected>Venue</option>
                    <option value="#mega-menu-catalog-tab-2" data-hs-select-option='{
                      "icon": "<svg class=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z\"/></svg>"
                    }'>Bride &amp; Groom Essentials</option>
                    <option value="#mega-menu-catalog-tab-3" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-hand-platter-icon lucide-hand-platter\"><path d=\"M12 3V2\"/><path d=\"m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5\"/><path d=\"M2 14h12a2 2 0 0 1 0 4h-2\"/><path d=\"M4 10h16\"/><path d=\"M5 10a7 7 0 0 1 14 0\"/><path d=\"M5 14v6a1 1 0 0 1-1 1H2\"/></svg>"
}'>Catering &amp; Food</option>
                    <option value="#mega-menu-catalog-tab-4" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-flower-icon lucide-flower\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5\"/><path d=\"M12 7.5V9\"/><path d=\"M7.5 12H9\"/><path d=\"M16.5 12H15\"/><path d=\"M12 16.5V15\"/><path d=\"m8 8 1.88 1.88\"/><path d=\"M14.12 9.88 16 8\"/><path d=\"m8 16 1.88-1.88\"/><path d=\"M14.12 14.12 16 16\"/></svg>"
}'>Decor &amp; Setup</option>
                    <option value="#mega-menu-catalog-tab-5" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-drama-icon lucide-drama\"><path d=\"M10 11h.01\"/><path d=\"M14 6h.01\"/><path d=\"M18 6h.01\"/><path d=\"M6.5 13.1h.01\"/><path d=\"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3\"/><path d=\"M17.4 9.9c-.8.8-2 .8-2.8 0\"/><path d=\"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7\"/><path d=\"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4\"/></svg>"
 }'>Entertainment</option>
<option value="#mega-menu-catalog-tab-6" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-camera-icon lucide-camera\"><path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/></svg>"
}'>Photography &amp; Videography</option>
 <option value="#mega-menu-catalog-tab-7" data-hs-select-option='{
 "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-mail-check-icon lucide-mail-check\"><path d=\"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/><path d=\"m16 19 2 2 4-4\"/></svg>"
 }'>Invitations &amp; Stationery</option>
<option value="#mega-menu-catalog-tab-9" data-hs-select-option='{
 "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-gift-icon lucide-gift\"><rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"/><path d=\"M12 8v13\"/><path d=\"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\"/><path d=\"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5\"/></svg>"
 }'>Gifts &amp; Return Favors</option>
 <option value="#mega-menu-catalog-tab-11" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-brush-icon lucide-brush\"><path d=\"m11 10 3 3\"/><path d=\"M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z\"/><path d=\"M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031\"/></svg>"
}'>Makeup &amp; Styling</option>
<option value="#mega-menu-catalog-tab-13" data-hs-select-option='{
"icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-hand-coins-icon lucide-hand-coins\"><path d=\"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17\"/><path d=\"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9\"/><path d=\"m2 16 6 6\"/><circle cx=\"16\" cy=\"9\" r=\"2.9\"/><circle cx=\"6\" cy=\"5\" r=\"3\"/></svg>"
}'>Rentals</option>
                    
                    
                  </select>

                  <!-- Grid -->
                  <div class="flex">
                    <!-- Sidebar -->
                    <div class="hidden sm:block sm:pe-4 w-96 h-[75dvh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                      <div id="hs-catalog-sidebar-nav-tabs" class="flex flex-col gap-y-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal" data-hs-tabs='{
                        "eventType": "hover",
                        "preventNavigationResolution": "sm"
                      }'>
                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 active" id="mega-menu-catalog-tab-item-1" aria-selected="true" data-hs-tab="#mega-menu-catalog-tab-1" aria-controls="mega-menu-catalog-tab-1" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pinned-icon lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></svg>


                          Venue
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-2" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-2" aria-controls="mega-menu-catalog-tab-2" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt-icon lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
                          Bride &amp; Groom Essentials
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-3" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-3" aria-controls="mega-menu-catalog-tab-3" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-platter-icon lucide-hand-platter"><path d="M12 3V2"/><path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"/><path d="M2 14h12a2 2 0 0 1 0 4h-2"/><path d="M4 10h16"/><path d="M5 10a7 7 0 0 1 14 0"/><path d="M5 14v6a1 1 0 0 1-1 1H2"/></svg>
                          Catering &amp; Food
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-4" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-4" aria-controls="mega-menu-catalog-tab-4" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flower-icon lucide-flower"><circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9"/><path d="M7.5 12H9"/><path d="M16.5 12H15"/><path d="M12 16.5V15"/><path d="m8 8 1.88 1.88"/><path d="M14.12 9.88 16 8"/><path d="m8 16 1.88-1.88"/><path d="M14.12 14.12 16 16"/></svg>
                          Decor &amp; Setup
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-5" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-5" aria-controls="mega-menu-catalog-tab-5" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-drama-icon lucide-drama"><path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6.5 13.1h.01"/><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/></svg>
                          Entertainment
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-6" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-6" aria-controls="mega-menu-catalog-tab-6" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera-icon lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>Photography &amp; Videography
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-7" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-7" aria-controls="mega-menu-catalog-tab-7" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-check-icon lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
                          Invitations &amp; Stationery
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->
                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-9" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-9" aria-controls="mega-menu-catalog-tab-9" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
                          Gifts &amp; Return Favors
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->
  
                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-11" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-11" aria-controls="mega-menu-catalog-tab-11" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brush-icon lucide-brush"><path d="m11 10 3 3"/><path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z"/><path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031"/></svg>
                          Makeup &amp; Styling
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->

                        <!-- End Link -->

                        <!-- Link -->
                        <a class="hs-tab-active:bg-gray-100 dark:hs-tab-active:bg-neutral-800 py-2.5 px-2 w-full flex items-center gap-x-2 text-start font-medium text-sm bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" id="mega-menu-catalog-tab-item-13" aria-selected="false" data-hs-tab="#mega-menu-catalog-tab-13" aria-controls="mega-menu-catalog-tab-13" role="tab" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins-icon lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
                          Rentals
                          <svg class="shrink-0 size-3.5 ms-auto text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </a>
                        <!-- End Link -->

                        <!-- Link -->

                        <!-- End Link -->

                        <!-- Link -->

                        <!-- End Link -->

                        <!-- Link -->
   
                        <!-- End Link -->

                        <!-- Link -->

                        <!-- End Link -->

                        <!-- Link -->
                      
                        <!-- End Link -->

                        <!-- Link -->

                        <!-- End Link -->
                        <!-- Link -->

                        <!-- End Link -->
                      </div>
                    </div>
                    <!-- End Sidebar -->

                    <!-- Content -->
                    <div class="pe-4 sm:px-10 w-full h-[75dvh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                      
                      <!-- Tab -->
                        <!-- Grid -->
                        <div id="mega-menu-catalog-tab-1" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-1">
                          <!-- Grid -->
                          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-6">
                            <!-- Item -->
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.venuebookingz.com/24118-1720587040-wm-league-hotels-banquet-chennai-1.jpg" alt="Product Image">
                                
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Banquet Halls</span>
                            </a>
                            <!-- End Item -->
  
                            <!-- Item -->
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.unexplora.com/wp-content/uploads/2020/11/Untitled-design-85.jpg" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Resorts</span>
                            </a>
                            <!-- End Item -->
  
                            <!-- Item -->
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn0.weddingwire.in/vendor/4599/3_2/960/jpg/wedding-venue-aj-garden-outdoor-space-1_15_364599-161640601569768.jpeg" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Outdoor Lawns & Gardens</span>
                            </a>
                            <!-- End Item -->
  
                            <!-- Item -->
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/Top-7-Destination-Wedding-Locations-in-India.jpg" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Destination Venues</span>
                            </a>
                            <!-- End Item -->
  
                            <!-- Item -->
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://media.weddingz.in/images/ce4bb19da8f580022371692fda5715b5/thinking-of-a-beach-wedding-check-out-the-best-beach-wedding-venues-in-goa-2.jpg" alt="Product Image">
                                
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Beachside Venues</span>
                            </a>
                            <!-- End Item -->
  
                            <!-- Item -->
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://media.weddingz.in/photologue/1490602150941/palace-wedding-venues-in-india-gajner-palace.PNG" alt="Product Image">
                                
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Heritage Properties</span>
                            </a>
                            <!-- End Item -->
  
                            <!-- Item -->
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://imagewedz.oyoroomscdn.com/medium/photologue/images/diamond-banquet-chembur-mumbai-4.jpeg" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Community Halls</span>
                            </a>
                            <!-- End Item -->
  
                            <!-- Item -->
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.brides.com/thmb/6rWBPzOU1FKL8U4JJWdxTh7v4-8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/J0GNM_v_QLTPspmntIY9Wx0-blZ0KWIyAGTfiPDU7Vz73PGoHrCJhs8u9UmLiQvm3_tX_NmoFw1ylvOHf_c7M-S112OA0R0X2CuTxIhgaEscCQgLwczPt6ACGKFjcopy-df74a973bac843b69df2ff927153bc12.jpg" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Rooftop Venues</span>
                            </a>
                            <!-- End Item -->
  
                            <!-- Item 
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1532543758257-0f4e06e08aec?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Optical Devices</span>
                            </a>
  
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                                <div class="absolute -top-0.5 end-0.5">
                                  <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-900 dark:text-emerald-500">Hot</span>
                                </div>
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Game Consoles</span>
                            </a>
  
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Headphones</span>
                            </a>
  
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Security Systems</span>
                            </a>
  
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">PC Accessories</span>
                            </a>
  
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drones</span>
                            </a>
  
                            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                              <div class="relative shrink-0">
                                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.unsplash.com/photo-1657734240363-356201c49b15?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                              </div>
                              <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">VRs</span>
                            </a>
                             End Item -->
                          </div>
                          <!-- Grid -->
                        </div>
                        <!-- End Grid -->
                      <!-- End Tab -->

                      <!-- Tab -->
                        <!-- Grid -->
                        <div id="mega-menu-catalog-tab-2" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-2">
    <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.visionvivaah.com/blog/wp-content/uploads/2020/01/best-wedding-dresses-for-indian-bride1.jpg" alt="Product Image">
             
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Bridal Wear</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCVQETB2x5r5eCHyaWRCSe3NDxbRI817N1bw&s" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Groom Wear</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTagJonsg3okffWkoZ2IaItujDfucHwgrQtDg&s" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Jewelry</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images.shaadisaga.com/shaadisaga_production/photos/pictures/000/476/585/new_medium/tsg_%285%29.jpg?1532692503" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Footwear</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqBATTreSNWj8iUVlHBekdr4_DhvEjwmfw_Q&s" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Accessories</span>
        </a>
        
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.riccoindia.com/cdn/shop/products/IMG_2384_2048x.jpg?v=1657351657" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Custom Designers</span>
            </a>
        
    </div>

    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">
        
        <div class="col-span-2 flex justify-center">
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://static.fibre2fashion.com//articleresources/images/75/7486/wedding-small_Small.jpg" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Bridal Shopping Boutiques</span>
            </a>
        </div>
    </div>
</div>
                        <!-- End Grid -->
                      <!-- End Tab -->

                      <!-- Tab -->
                        <!-- Grid -->
                        <div id="mega-menu-catalog-tab-3" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-3">
                          <!-- Grid -->
                          <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOF--vmxkIKTRlsB_j1cgw1jQZnHZLwyFkA&s" alt="Product Image">
             
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Veg / Non-Veg Caterers</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://admin.venuelook.com/images/new-home-images/optimized/vendor/caterer.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Multi-Cuisine Caterers</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.captainjoe.in/images/catering-specialists.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Regional Cuisine Specialists</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bzBgybsWbj23ahaKRLIzKXg2d9AHF3KJYQ&s" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Sweet & Dessert Vendors</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://5.imimg.com/data5/SELLER/Default/2020/10/BZ/NO/XH/58672911/neato-foods-ambattur-corporate-canteen-500x500.jpg" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Live Counters</span>
        </a>
        
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://tastytablecatering.com/wp-content/uploads/2023/03/bartender-making-cocktails-at-open-bar-wedding.jpg" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Beverage Services</span>
            </a>
        
    </div>

    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">
        
        <div class="col-span-2 flex justify-center">
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTpNcpPpR6sNUwvc8KCdFLS2p8vJ1d60yiwQ&s" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Bartending Services</span>
            </a>
        </div>
    </div>
                          <!-- Grid -->
                        </div>
                        <!-- End Grid -->
                      <!-- End Tab -->
<div id="mega-menu-catalog-tab-4" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-4">
                          <!-- Grid -->
                          <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.k4craft.com/wp-content/uploads/2020/01/1Floral-Backdrop.jpg" alt="Product Image">
             
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Floral Decor</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.diwas.in/wp-content/uploads/2016/02/rustic.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Theme Decor</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://shineevents.co.in/wp-content/uploads/2021/11/3-1.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Mandap & Stage Setup</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYV7_8nh0kvYPbrPLkwP4J0xEAOaNkF85WwA&s" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Table Centerpieces</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQe_Z8zIy0TvTbyuWiAB5qHLmSTzu2CK2YGA&s" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Entrance Decor</span>
        </a>
        
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjg6YRQtWTZE8cckQ0mpA10gwg5aTx6XmIdw&s" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Lighting Decor</span>
            </a>
        
    </div>

    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">
        
        <div class="col-span-2 flex justify-center">
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jRG895OPHXwvBu1Rhm6D-fB5ApicSAFHJA&s" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Seating Layouts</span>
            </a>
        </div>
    </div>
                          <!-- Grid -->
                        </div>
                   

                      <div id="mega-menu-catalog-tab-5" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-5">
                          <!-- Grid -->
                          <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLx1bP_LBPqfJ2FCjH24Thk9Ar5u1cAaAKOw&s" alt="Product Image">
             
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">DJs</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqDnqOZq4whTmJchZKbntAphh5eTh87pvYxw&s" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Live Bands</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn0.weddingwire.in/article-gallery-o/00000/3_2/960/jpg/articulos-india/2019/non-troncales/puneri-dhol/saurabh-birje-photography-phuneri-dhol-lead-image.jpeg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Dhol / Traditional Performers</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRFcR4R3TkgAWj_GiasbsDiCNkYlTJR_QRA&s" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Dance Troupes</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://lh3.googleusercontent.com/cmF2dPVYXKut9jrWPMMjaNEVoCMHkx1LsglSMlVLHxR427Jjimiu0vw7Qq4cBjXFpU3IAJbXL9r0apHjau5QgYvFLPFHV1iNZLduww=w961-h641-l80-e31" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Anchors / MCs</span>
        </a>
        
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuaal8xK8xGAaCnoX--044AHMWUoV-1Ofeqg&s" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Magicians / Comedians</span>
            </a>
        
    </div>

    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">
        
        <div class="col-span-2 flex justify-center">
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQQU6ucynh7hLi1cDyvyN2VvZ_X4UOZ0_jQ&s" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Fireworks & Special Effects</span>
            </a>
        </div>
    </div>
                          <!-- Grid -->
                        </div>
<div id="mega-menu-catalog-tab-6" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-6">
                          <!-- Grid -->
                          <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn.kamatharjun.com/wp-content/uploads/2022/10/Prewedding-blog-8.jpg" alt="Product Image">
             
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Candid Photography</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbRhTt7nxPVupZII-bGGMO5qAl8yc5sjZp8Q&s" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Traditional Photography</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.visionvivaah.com/blog/wp-content/uploads/2019/08/best-wedding-videography-in-chandigarh-960x487.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cinematic Videography</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwNQVPkGMO4V2IS_FtdvhiKbbmoWiOT5zAeA&s" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Drone Shoots</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://5.imimg.com/data5/SELLER/Default/2021/2/EX/HF/RA/121338197/pre-wedding-photoshoot-service-500x500.jpg" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Pre-Wedding Shoots</span>
        </a>
        
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn0.weddingwire.in/vendor/2384/3_2/960/jpg/photobooth-instant-photo-booth-photobooth-4_15_422384-166246147178159.jpeg" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Instant Photo Booths</span>
            </a>
        
    </div>

  
                          <!-- Grid -->
                        </div>

                        <div id="mega-menu-catalog-tab-7" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-7">
                          <!-- Grid -->
                          <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/India%20LOB/Stationery%2C%20Letterheads%20and%20Stamps/Wedding%20Invitations/IN_Wedding-Invitations_Hero-image_01" alt="Product Image">
             
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Printed Invitations</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://i.pinimg.com/736x/9f/7b/91/9f7b91504fc1cc4747f9c1cf05255498.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">E-Invites</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://blogcdn.paperlust.co/blog/wp-content/uploads/2019/08/1.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Laser-Cut Cards</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://i.etsystatic.com/18363873/r/il/0fcd9a/1891009885/il_570xN.1891009885_eqav.jpg" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Scroll Invitations</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:good,w_700/India%20LOB/Stationery%2C%20Letterheads%20and%20Stamps/Wedding%20Invitations/IN_Wedding-Invitations_Overview" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Custom Wedding Stationery</span>
        </a>
        
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:d271d604-d65c-55cd-b287-733effd3a3af/component?assetType=TEMPLATE&etag=35bc0dea77df416bb31c32dc28675a6d&revision=048a2724-6699-4d01-9c6b-62ee9736fb45&component_id=1a690ebd-eddb-4ae1-9e58-8d6d7d99ffb9" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Thank You Cards</span>
            </a>
        
    </div>

  
                          <!-- Grid -->
                        </div>

                        <div id="mega-menu-catalog-tab-9" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-9">
    <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://i.etsystatic.com/18125450/r/il/6f4a57/6104906139/il_570xN.6104906139_gw5l.jpg" alt="Product Image">
               
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Personalized Gifts</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.brides.com/thmb/ZG_lIownwOgazIuIPBmv9M_FDA4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__brides__public__brides-services__production__2016__10__24__580e9b44d1dc137f1593dcfe_2014_bridescom-Editorial_Images-12-Edible-Wedding-Favors-Refresh-Large-Edible-Wedding-Favors-Chocolate-Mousse-Love-Me-Do-Photography-a65883c7a28e40558abecdf1f967144b.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Edible Favors</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://www.thewalletstore.in/cdn/shop/files/9.jpg?v=1737713179&width=1200" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Utility Gifts</span>
        </a>
        <div class="col-span-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">
            <div class="flex justify-center"> <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                    <div class="relative shrink-0">
                        <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://m.media-amazon.com/images/I/81Vl6qGMspL.jpg" alt="Product Image">
                       
                    </div>
                    <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Handmade Crafts</span>
                </a>
            </div>
            <div class="flex justify-center"> <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                    <div class="relative shrink-0">
                        <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://ruchoks.com/wp-content/uploads/2024/01/1-84.jpg" alt="Product Image">

                    </div>
                    <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Gift Hampers</span>
                </a>
            </div>
        </div>
    </div>
</div>

                        <div id="mega-menu-catalog-tab-11" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-11">
                          <!-- Grid -->
                          <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVz1A8Ti2O_WJS5dX8B5XdkDDZ6tI_IAkg0g&s" alt="Product Image">
             
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Bridal Makeup</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyb2JD1Q3RJDenIrbhmPSCs_ovsdW0I2QIeA&s" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Groom Styling</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://images-static.naikaa.com/beauty-blog/wp-content/uploads/2024/07/wedding-1.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Hair Stylists</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvN8cq56FEbwqzNfbHgeDcOqfVE7UUr4jVQ&s" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Mehendi Artists</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://i.pinimg.com/564x/ea/34/e8/ea34e8692b950a700a92765a1613c399.jpg" alt="Product Image">
                
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Nail Artists</span>
        </a>
        
            <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                <div class="relative shrink-0">
                    <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://mlw6zuezpssl.i.optimole.com/w:780/h:625/q:mauto/f:avif/https://www.rethespa.in/wp-content/uploads/s12.jpg" alt="Product Image">
                </div>
                <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Pre-wedding Spa Services</span>
            </a>
        
    </div>

  
                          <!-- Grid -->
                        </div>
                       

                      <!-- Tab -->
                      
                      <!-- End Tab -->

                      <!-- Tab -->
                      
                      <!-- End Tab -->

                      <!-- Tab -->
                      
                      <!-- End Tab -->

                      <!-- Tab -->
                      
                      <!-- End Tab -->

                      <!-- Tab -->
                                <div id="mega-menu-catalog-tab-13" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-13">
    <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://cdn11.bigcommerce.com/s-9bdyx9g8xs/images/stencil/1280x1280/products/127/1493/sankheda-chairs-complete-set-for-wedding-and-events-rental__62086.1643592082.jpg?c=2" alt="Product Image">
               
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Furniture</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://sjcaterers.in/wp-content/uploads/2021/06/crockery-rent.jpg" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Cutlery & Crockery</span>
        </a>
        <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
            <div class="relative shrink-0">
                <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRA-A6sE7W3_KngaJV-RVE77zeOldklIDl20y5lvCIRxfGQoHPTbAcPQLfW4QMvMepWWZiURaxho7vh4xE_X-RhiFyOgS_at9dGrTMkiWY" alt="Product Image">
            </div>
            <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200">Tents & Shamianas</span>
        </a>
        <div class="col-span-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6 mt-6">
            <div class="flex justify-center"> <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                    <div class="relative shrink-0">
                        <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSODUDalBMhZ_Ak6GxjVWSB_9b903coKJOhuKX71S2cVSFokuf4RJtPeu4NG3x0lRr5CXTU_Gwt3wCda5lRhrxqTdjKWV_QEz9r7HWW3FU" alt="Product Image">
                       
                    </div>
                    <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200"> Props & Thematic Decor Items</span>
                </a>
            </div>
            <div class="flex justify-center"> <a class="group block p-4 rounded-lg text-center hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="./listing.html">
                    <div class="relative shrink-0">
                        <img class="shrink-0 size-16 sm:size-20 lg:size-24 mx-auto object-cover bg-gray-100 rounded-full dark:bg-neutral-800" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ_OWIVSE0ErpqsXtMeGc4B725-W2KU2WZGzNvsIW-AFcxCr6dy6Z8iu17sYWOaXF_vSam6NYiOWDZlBzmFB6YaOvluk0oL8dSrLXv5TMd3" alt="Product Image">

                    </div>
                    <span class="mt-3 block text-sm text-gray-800 dark:text-neutral-200"> Linens & Drapes</span>
                </a>
            </div>
        </div>
    </div>
</div>
                      <!-- End Tab -->

                      <!-- Tab -->
                      <div id="mega-menu-catalog-tab-14" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-14">
                        <!-- Loading Indicator -->
                        <div class="h-full flex flex-col justify-center items-center text-center">
                          <span class="py-1.5 inline-flex gap-x-1">
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p class="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br>This conent is empty.
                          </p>
                        </div>
                        <!-- End Loading Indicator -->
                      </div>
                      <!-- End Tab -->

                      <!-- Tab -->
                      <div id="mega-menu-catalog-tab-15" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-15">
                        <!-- Loading Indicator -->
                        <div class="h-full flex flex-col justify-center items-center text-center">
                          <span class="py-1.5 inline-flex gap-x-1">
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p class="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br>This conent is empty.
                          </p>
                        </div>
                        <!-- End Loading Indicator -->
                      </div>
                      <!-- End Tab -->

                      <!-- Tab -->
                      <div id="mega-menu-catalog-tab-16" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-16">
                        <!-- Loading Indicator -->
                        <div class="h-full flex flex-col justify-center items-center text-center">
                          <span class="py-1.5 inline-flex gap-x-1">
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p class="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br>This conent is empty.
                          </p>
                        </div>
                        <!-- End Loading Indicator -->
                      </div>
                      <!-- End Tab -->

                      <!-- Tab -->
                      <div id="mega-menu-catalog-tab-17" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-17">
                        <!-- Loading Indicator -->
                        <div class="h-full flex flex-col justify-center items-center text-center">
                          <span class="py-1.5 inline-flex gap-x-1">
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p class="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br>This conent is empty.
                          </p>
                        </div>
                        <!-- End Loading Indicator -->
                      </div>
                      <!-- End Tab -->

                      <!-- Tab -->
                      <div id="mega-menu-catalog-tab-18" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-18">
                        <!-- Loading Indicator -->
                        <div class="h-full flex flex-col justify-center items-center text-center">
                          <span class="py-1.5 inline-flex gap-x-1">
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p class="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br>This conent is empty.
                          </p>
                        </div>
                        <!-- End Loading Indicator -->
                      </div>
                      <!-- End Tab -->

                      <!-- Tab -->
                      <div id="mega-menu-catalog-tab-19" class="hidden h-full" role="tabpanel" aria-labelledby="mega-menu-catalog-tab-item-19">
                        <!-- Loading Indicator -->
                        <div class="h-full flex flex-col justify-center items-center text-center">
                          <span class="py-1.5 inline-flex gap-x-1">
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.2s] dark:bg-neutral-200"></span>
                            <span class="size-2.5 bg-gray-800 rounded-full animate-[typing_1s_ease-in-out_infinite_0.4s] dark:bg-neutral-200"></span>
                          </span>
                          <p class="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                            This is a placeholder loader.<br>This conent is empty.
                          </p>
                        </div>
                        <!-- End Loading Indicator -->
                      </div>
                      <!-- End Tab -->
                    </div>
                    <!-- End Content -->
                  </div>
                  <!-- End Grid -->
                </div>
                <!-- End Container -->
              </div>
              <!-- End Dropdown Menu -->
            </div>
            <!-- End Dropdown Link -->

            <div class="hidden md:block w-full">
              <!-- Search Input -->
              <div class="relative w-full">
                <input type="text" class="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border-gray-200 text-base sm:text-sm rounded-full focus:outline-hidden focus:border-emerald-600 focus:ring-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400" placeholder="Search Preline">
                <div class="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
                  <button type="button" class="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>
                <div class="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-10 pe-1">
                  <button type="button" class="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </button>
                </div>
              </div>
              <!-- End Search Input -->
            </div>
          </div>
        </div>
        <!-- End Search -->

        <!-- Widgets -->
        <div class="order-2 md:order-3 ms-auto lg:ms-0">
          <div class="flex justify-end items-center gap-x-2">
            <!-- Account Button Icon -->
            <a class="flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
              <img class="shrink-0 size-4 rounded-full" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar">
              <span class="truncate max-w-16">Madhesh</span>
            </a>
            <!-- End Account Button Icon -->

            <!-- Favorites Button Icon -->
            <a class="flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
              <svg class="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              Favorite
            </a>
            <!-- End Favorites Button Icon -->

            <!-- Cart Button Icon -->
            <a class="relative flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
              <svg class="shrink-0 size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Cart
              <span class="flex absolute top-0 end-0 z-10 -mt-2 me-1">
                <span class="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-gray-800 text-white rounded-full px-1 dark:bg-neutral-200 dark:text-neutral-800">
                  2
                  <span class="sr-only">Notifications</span>
                </span>
              </span>
            </a>
            <!-- End Cart Button Icon -->
          </div>
        </div>
        <!-- End Widgets -->
      </div>

      <div class="md:hidden mt-2.5 md:mt-0 w-full">
        <!-- Search Input -->
        <div class="relative w-full">
          <input type="text" class="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border-gray-200 text-base sm:text-sm rounded-full focus:outline-hidden focus:border-emerald-600 focus:ring-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400" placeholder="Search Preline">
          <div class="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
            <button type="button" class="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
          <div class="hidden absolute inset-y-0 end-12 flex items-center pointer-events-none z-10 pe-1">
            <button type="button" class="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </button>
          </div>
        </div>
        <!-- End Search Input -->
      </div>
    </div>


  </header>
  <!-- ========== END HEADER ========== -->

  <!-- ========== MAIN CONTENT ========== -->
  <main id="content">
    <!-- Header -->
    <div class="pt-4 lg:pt-10 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <div class="flex flex-col lg:flex-row lg:items-center gap-y-3">
        <div class="lg:w-72 shrink-0">
          <div class="flex flex-wrap justify-between items-center gap-3">
            <!-- Heading -->
            <div>
              <h1 class="font-semibold text-xl text-gray-800 dark:text-neutral-200">
                Venue
              </h1>
              <p class="text-sm text-gray-500 dark:text-neutral-500">
                20 Venues
              </p>
            </div>
            <!-- End Heading -->

            <!-- Filter Sidebar Toggle Button -->
            <!-- <div class="lg:hidden">
              <button type="button" class="hs-dropdown-toggle py-1.5 px-2.5 flex items-center gap-x-1.5 text-sm text-start bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#hs-pro-shmlfs" aria-expanded="false">
                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" x2="14" y1="4" y2="4"></line>
                  <line x1="10" x2="3" y1="4" y2="4"></line>
                  <line x1="21" x2="12" y1="12" y2="12"></line>
                  <line x1="8" x2="3" y1="12" y2="12"></line>
                  <line x1="21" x2="16" y1="20" y2="20"></line>
                  <line x1="12" x2="3" y1="20" y2="20"></line>
                  <line x1="14" x2="14" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="10" y2="14"></line>
                  <line x1="16" x2="16" y1="18" y2="22"></line>
                </svg>
                Filter
              </button>
            </div> -->
            <!-- End Filter Sidebar Toggle Button -->
          </div>
        </div>

        <div class="grow overflow-hidden lg:ps-4 xl:ps-8">
          <!-- List -->
         <div class="mb-3">
        <!-- List -->
        <div class="relative flex flex-1 items-center overflow-hidden">
          <div class="flex flex-row items-center gap-2 py-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 after:h-px after:min-w-10">
            <button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/11881/11881148.png" alt="Venue" class="shrink-0 size-3.5"/>
  Venue
</button>

<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/3074/3074317.png" alt="Bride & Groom Essentials" class="shrink-0 size-3.5"/>
  Bride &amp; Groom Essentials
</button>

<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/17845/17845741.png" alt="Catering & Food" class="shrink-0 size-3.5"/>
  Catering &amp; Food
</button>

<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/6016/6016756.png" alt="Decor & Setup" class="shrink-0 size-3.5"/>
  Decor &amp; Setup
</button>

<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/1773/1773609.png" alt="Entertainment" class="shrink-0 size-3.5"/>
  Entertainment
</button>

<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/6703/6703279.png" alt="Photography & Videography" class="shrink-0 size-3.5"/>
  Photography &amp; Videography
</button>

<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/937/937868.png" alt="Invitations & Stationery" class="shrink-0 size-3.5"/>
  Invitations &amp; Stationery
</button>

<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/3438/3438641.png" alt="Gifts & Return Favors" class="shrink-0 size-3.5"/>
  Gifts &amp; Return Favors
</button>


<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/3163/3163173.png" alt="Makeup & Styling" class="shrink-0 size-3.5"/>
  Makeup &amp; Styling
</button>

<button type="button" class="py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600">
  <img src="https://cdn-icons-png.flaticon.com/128/515/515034.png" alt="Rentals" class="shrink-0 size-3.5"/>
  Rentals
</button>

          </div>

          <div class="absolute top-0 end-0 h-full w-12 pointer-events-none bg-linear-to-l from-white via-white/90 to-transparent dark:from-neutral-900 dark:via-neutral-900/95"></div>
        </div>
        <!-- End List -->
      </div>
          <!-- End List -->
        </div>
      </div>
    </div>
    <!-- End Header -->

    <div class="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <!-- Listing -->
      <div class="lg:flex">
        <div class="pt-6 lg:pt-0">
          <!-- Sidebar -->
          <div id="hs-pro-shmlfs" class="hs-overlay [--auto-close:lg]
            hs-overlay-open:translate-x-0
            -translate-x-full transition-all duration-300 transform
            w-80 lg:w-72 h-full
            hidden
            fixed inset-y-0 start-0 z-60
            bg-white
            lg:block lg:static lg:z-0 lg:translate-x-0
            dark:bg-neutral-900" role="dialog" tabIndex="-1" aria-label="Sidebar">
            <div class="h-full flex-1 flex flex-col lg:h-auto">
              <!-- Header -->
              <div class="lg:hidden py-3 px-5 flex justify-between items-center gap-x-3 border-b border-gray-200 dark:border-neutral-700">
                <div class="grow">
                  <span class="block font-medium text-gray-800 dark:text-neutral-200">
                    Filter
                  </span>
                </div>

                <!-- Sidebar Trigger -->
                <!-- <button type="button" class="lg:hidden size-6 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-pro-shmlfs" aria-label="Toggle navigation" data-hs-overlay="#hs-pro-shmlfs">
                  <span class="sr-only">Close</span>
                  <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button> -->
                <!-- End Sidebar Trigger -->
              </div>
              <!-- End Header -->

              <!-- Body -->
              <div class="h-full overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div class="p-5 lg:pt-10 lg:ps-0">
                  <!-- Card -->
                  <div class="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
                    <div class="mb-3">
                      <span class="font-medium text-sm text-gray-800 dark:text-neutral-200">Category</span>
                    </div>

                    <!-- List -->
                    <div class="space-y-0.5">
                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc1" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc1">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">Banquet Halls</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc2" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc2">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">Resorts</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc3" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc3">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">Outdoors Lawns & Gardens</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc4" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc4">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">Destination Venues</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc5" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc5">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">Beachside Venues</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc6" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc6">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">Heritage Properties</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->
                    </div>

                    <div id="hs-pro-shfcc-heading" class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-pro-shfcc">
                      <div class="space-y-0.5">
                        <!-- Checkbox -->
                        <div class="flex items-center">
                          <label for="hs-pro-shmfloc7" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                            <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc7">
                            <span class="ms-2 text-gray-800 dark:text-neutral-200">Community Halls</span>
                          </label>
                        </div>
                        <!-- End Checkbox -->

                        <!-- Checkbox -->
                        <div class="flex items-center">
                          <label for="hs-pro-shmfloc8" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                            <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc8">
                            <span class="ms-2 text-gray-800 dark:text-neutral-200">Rooftop Venues</span>
                          </label>
                        </div>
                        <!-- End Checkbox -->

                        <!-- Checkbox -->
                        <!-- <div class="flex items-center">
                          <label for="hs-pro-shmfloc-9" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                            <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-9">
                            <span class="ms-2 text-gray-800 dark:text-neutral-200">Smart Home</span>
                          </label>
                        </div> -->
                        <!-- End Checkbox -->

                        <!-- Checkbox -->
                        <!-- <div class="flex items-center">
                          <label for="hs-pro-shmfloc10" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                            <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc10">
                            <span class="ms-2 text-gray-800 dark:text-neutral-200">Televisions and video equipment</span>
                          </label>
                        </div> -->
                        <!-- End Checkbox -->
                      </div>
                    </div>
                    <!-- End List -->

                    <div class="mt-1">
                      <button type="button" class="hs-collapse-toggle inline-flex items-center gap-x-1 font-medium text-sm text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 focus:outline-hidden focus:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-600 dark:focus:text-emerald-600" id="hs-pro-shfcc" aria-expanded="false" aria-controls="hs-pro-shfcc-heading" data-hs-collapse="#hs-pro-shfcc-heading">
                        <span class="hs-collapse-open:hidden">Show more</span>
                        <span class="hs-collapse-open:block hidden">Show less</span>
                        <svg class="hs-collapse-open:rotate-180 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <!-- End Card -->

                  <!-- Card -->
                  <div class="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
                    <!-- Switch/Toggle -->
                    <div class="flex flex-wrap justify-between items-center gap-2">
                      <label for="hs-pro-sale" class="flex-1 cursor-pointer font-medium text-sm text-gray-800 dark:text-neutral-200">Deal</label>
                      <label for="hs-pro-sale" class="relative inline-block w-11 h-6 cursor-pointer">
                        <input type="checkbox" id="hs-pro-sale" class="peer sr-only" checked>
                        <span class="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-emerald-600 dark:bg-neutral-700 dark:peer-checked:bg-emerald-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                        <span class="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
                      </label>
                    </div>
                    <!-- End Switch/Toggle -->
                  </div>
                  <!-- End Card -->

                 

                  

                  <!-- Card -->
                  <div class="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
                    <div class="mb-3">
                      <span class="font-medium text-sm text-gray-800 dark:text-neutral-200">Customer reviews</span>
                    </div>

                    <!-- List -->
                    <div class="space-y-0.5">
                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-4-and-up" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-4-and-up" checked>
                          <span class="ms-2 flex items-center gap-x-0.5">
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                          </span>
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-3-and-up" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-3-and-up">
                          <span class="ms-2 flex items-center gap-x-0.5">
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                          </span>
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-1-and-up" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-1-and-up">
                          <span class="ms-2 flex items-center gap-x-0.5">
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                            <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                          </span>
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->
                    </div>
                    <!-- End List -->
                  </div>
                  <!-- End Card -->

                  <!-- Card -->
                  <div class="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
                    <div class="mb-3">
                      <span class="font-medium text-sm text-gray-800 dark:text-neutral-200">Price</span>
                    </div>

                    <!-- List -->
                    <div class="space-y-0.5">
                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-under-150" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-under-150">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">under ₹500</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-150-300" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-150-300">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">₹500-₹1000</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-300-500" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-300-500">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">Above ₹1000</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      
                      <!-- End Checkbox -->
                    </div>
                    <!-- End List -->

                    <!-- Range Slider -->
                    <div class="mx-3 mt-5">
                      <div class="flex justify-center w-full mb-5">
                        <div class="flex items-center text-sm dark:text-neutral-200">
                          <div id="hs-pass-values-to-html-elements-min-target" class="text-center min-w-12">250</div>
                          -
                          <div id="hs-pass-values-to-html-elements-max-target" class="text-center min-w-12">750</div>
                        </div>
                      </div>
                      <label class="sr-only">Example range</label>
                      <div id="hs-pass-values-to-html-elements" class="--prevent-on-load-init" data-hs-range-slider='{
                        "start": [250, 750],
                        "range": {
                          "min": 0,
                          "max": 1000
                        },
                        "formatter": {
                          "type": "integer",
                          "prefix": "₹"
                        },
                        "connect": true,
                        "cssClasses": {
                          "target": "relative h-1 rounded-full bg-gray-100 dark:bg-neutral-700",
                          "base": "w-full h-full relative z-1",
                          "origin": "absolute top-0 end-0 w-full h-full origin-[0_0] rounded-full",
                          "handle": "absolute top-1/2 end-0 size-5 bg-white border-3 border-emerald-600 rounded-full cursor-pointer translate-x-2/4 -translate-y-2/4 dark:bg-neutral-900 dark:border-emerald-500",
                          "connects": "relative z-0 w-full h-full rounded-full overflow-hidden",
                          "connect": "absolute top-0 end-0 z-1 w-full h-full bg-emerald-600 origin-[0_0] dark:bg-emerald-500",
                          "touchArea": "absolute -top-1 -bottom-1 -start-1 -end-1"
                        }
                      }'></div>
                    </div>
                    <!-- End Range Slider -->
                  </div>
                  <!-- End Card -->
                   <!-- Card -->
                  <div class="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
                    <div class="mb-3">
                      <span class="font-medium text-sm text-gray-800 dark:text-neutral-200">Capacity</span>
                    </div>

                    <!-- List -->
                    <div class="space-y-0.5">
                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-under-150" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-under-150">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">0-100</span>
                        </label>
                      </div>
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-under-150" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-under-150">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">100-300</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-150-300" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-150-300">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">500-1000</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <label for="hs-pro-shmfloc-300-500" class="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                          <input type="checkbox" class="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-300-500">
                          <span class="ms-2 text-gray-800 dark:text-neutral-200">Above 1000</span>
                        </label>
                      </div>
                      <!-- End Checkbox -->

                      <!-- Checkbox -->
                      
                      <!-- End Checkbox -->
                    </div>
                    <!-- End List -->

                    <!-- Range Slider -->
                    <!-- Range Slider -->
                    <div class="mx-3 mt-5">
                      <div class="flex justify-center w-full mb-5">
                        <div class="flex items-center text-sm dark:text-neutral-200">
                          <div id="hs-capacity-range-slider-min-target" class="text-center min-w-12">100</div>
                          -
                          <div id="hs-capacity-range-slider-max-target" class="text-center min-w-12">1000</div>
                        </div>
                      </div>
                      <label class="sr-only">Example range</label>
                      <div id="hs-capacity-range-slider" class="" data-hs-range-slider='{
                        "start": [100, 400],
                        "range": {
                          "min": 0,
                          "max": 1000
                        },
                        "formatter": {
                          "type": "integer",
                          "prefix": "M"
                        },
                        "connect": true,
                        "cssClasses": {
                          "target": "relative h-1 rounded-full bg-gray-100 dark:bg-neutral-700",
                          "base": "w-full h-full relative z-1",
                          "origin": "absolute top-0 end-0 w-full h-full origin-[0_0] rounded-full",
                          "handle": "absolute top-1/2 end-0 size-5 bg-white border-3 border-emerald-600 rounded-full cursor-pointer translate-x-2/4 -translate-y-2/4 dark:bg-neutral-900 dark:border-emerald-500",
                          "connects": "relative z-0 w-full h-full rounded-full overflow-hidden",
                          "connect": "absolute top-0 end-0 z-1 w-full h-full bg-emerald-600 origin-[0_0] dark:bg-emerald-500",
                          "touchArea": "absolute -top-1 -bottom-1 -start-1 -end-1"
                        }
                      }'></div>
                    </div>
                    <!-- End Range Slider -->
                  </div>
                  <!-- End Card -->
                </div>
              </div>
              <!-- End Body -->

              <!-- Footer -->
              <div class="py-4 px-5 lg:py-6 lg:ps-0 flex items-center gap-x-2 border-t border-gray-200 dark:border-neutral-700">
                <button type="button" class="py-2 px-3 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300" data-hs-overlay="#hs-pro-shflo">
                  <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  Clear filters
                </button>

                <button type="button" class="py-2 px-3 w-full inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700" data-hs-overlay="#hs-pro-shflo">
                  Show items
                </button>
              </div>
              <!-- End Footer -->
            </div>
          </div>
          <!-- End Sidebar -->
        </div>

        <div class="grow overflow-hidden pb-10 lg:pt-10 lg:ps-4 xl:ps-8">
          <!-- Filter Group -->
          <div class="pb-3 mb-3 space-y-3 border-b border-gray-200 dark:border-neutral-700">
            <div class="flex flex-wrap gap-1.5">
              <!-- Filter -->
              <button type="button" class="py-1 ps-2.5 pe-1.5 flex items-center bg-emerald-600 text-white text-start text-sm rounded-full hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                Deal
                <span class="ms-1.5 flex flex-col justify-center items-center size-4 bg-white text-emerald-600 rounded-full hover:bg-white/90 focus:bg-white/90 dark:text-emerald-500">
                  <svg class="shrink-0 size-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </span>
              </button>
              <!-- End Filter -->

              <!-- Filter -->
              <button type="button" class="py-1 ps-2.5 pe-1.5 flex items-center bg-emerald-600 text-white text-start text-sm rounded-full hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                <span class="flex items-center gap-x-0.5">
                  <svg class="shrink-0 size-3 text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                  <svg class="shrink-0 size-3 text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                  <svg class="shrink-0 size-3 text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                  <svg class="shrink-0 size-3 text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                  <svg class="shrink-0 size-3 text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                  </svg>
                </span>
                <span class="ms-1.5 text-white">&amp; up</span>
                <span class="ms-1.5 flex flex-col justify-center items-center size-4 bg-white text-emerald-600 rounded-full hover:bg-white/90 focus:bg-white/90 dark:text-emerald-500">
                  <svg class="shrink-0 size-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </span>
              </button>
              <!-- End Filter -->

              <div class="ms-auto">
                <!-- Select -->
                <div class="relative min-h-7.5 inline-flex items-center">
                  <span class="me-1 text-xs sm:text-sm text-gray-500 dark:text-neutral-500">Sort By:</span>
                  <select data-hs-select='{
                      "placeholder": "Sort",
                      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 ps-1.5 pe-7 inline-flex shrink-0 justify-center items-center gap-x-1.5 border border-transparent font-medium text-sm text-gray-800 rounded-lg hover:text-gray-600 focus:outline-hidden focus:text-gray-600 before:absolute before:inset-0 before:z-1 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400",
                      "dropdownClasses": "end-0 mt-2 p-1 z-20 w-44 bg-white rounded-xl shadow-xl dark:bg-neutral-800",
                      "optionClasses": "flex items-center gap-x-3 py-2 px-3 text-xs sm:text-[13px] text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
                      "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                      "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-4 text-gray-800 dark:text-neutral-200\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6 9 6 6 6-6\"/></svg></div>"
                    }' class="hidden">
                    <option value="">Choose</option>
                    <option selected></option>
                    <option></option>
                    <option>Price low to high</option>
                    <option>Price hight to low</option>
                  </select>
                </div>
                <!-- End Select -->
              </div>
            </div>
          </div>
          <!-- End Filter Group -->

          <!-- Grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4">
            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/8692/3_2/960/jpg/mwc-club-exterior_15_368692-171118982947509.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          New
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    MWC Club BY Downtown<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                     Chengalpattu
                    </span>
                    
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                       <span class="text-sm">From₹1000</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-1200 
                       <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (4k+)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/5273/3_2/960/jpg/chennai1_15_65273.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Zone by The Park<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                     Madipakkam
                    </span> 
                   
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                       <span class="text-sm">From₹900</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-150 
                       <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (16k+)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/7583/3_2/960/jpg/52651772-619588088484322-2995361736132919296-n_15_207583-1553883778.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    RS Hall<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                     Porur
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                       <span class="text-sm">From₹700</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      100-1000  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (590)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6050/3_2/960/jpg/banquet-halls-vm-grand-mahal-event-space-5_15_436050-167403633834474.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    VM Grand Mahal<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                     Potheri
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹450</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      20-1000 
                       <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (3)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6847/3_2/960/jpeg/wedding-venue-banquet-studios-banquet-hall-2_15_356847-161520621486830.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Banquet Studios <br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                     Vadapalani
                    </span>
                    
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹600</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      100-1200 
                       <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/2969/3_2/960/jpg/c454ab27-7498-46ae-b597-6d87f78b5401_15_272969-160766850716592.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    The Royal Palms<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                     Injambakkam
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹1000</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-600 
                       <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (29k+)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/0161/3_2/960/jpg/wedding-venue-a-s-mahal-event-space-4_15_320161-159585217645539.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    A S Hall<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                     Chromepet
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹400</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      30-200  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (6k+)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6437/3_2/960/jpg/2019-01-26_15_486437-174003612375638.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Aiyavoo Mahal<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                     Aminijikarai
                    </span>
                  
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹600</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      10-1500 
                       <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6523/3_2/960/jpg/129a9571_15_396523-171472601665806.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Green Apple Banquet Hall<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Anna Nagar West
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹900</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-300 
                       <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (29)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6229/3_2/960/jpg/wedding-venue-meenakshis-narayanan-marriage-hall-facade-1_15_326229-160630686469901.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Meenakshi's Narayanan Hall<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Choolaimedu
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                       <span class="text-sm">From₹450</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      250-400 
                       <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/8271/3_2/960/png/anuraag-party-hall-4_15_228271-157664201325627.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                   Anuraag Hall<br>
                   <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Shenoy Nagar
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                       <span class="text-sm">From₹300</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      150-300  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (93)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/4940/3_2/960/jpg/maafc-omr-0008-hor-clsc_15_134940.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Fairfield by Marriott<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Mahabalipuram
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹300</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-300  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (158)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6191/3_2/960/jpg/wedding-venue-grand-padappai-residency-banquet-hall-2_15_356191-160567534696257.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Grand Padappai Residency<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Chetpet
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹450</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-300  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (29)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/4463/3_2/960/jpg/wedding-venue-vgp-marine-kingdom-restaurant-2_15_354463-160334142718709.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Below Sea Level<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Injambakkam
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹1100</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-200  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/1449/3_2/960/jpg/img-20190223-160812_15_191449.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Metro Grand Hall<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Arumbakkam
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹500</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      20-250  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (3)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/8063/3_2/960/jpg/banquet-hall-raghavendra-mandapam-banquet-hall4_15_228063-160612733757281.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Raghavendra Hall<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Abhiramapuram
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹700</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-1000  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (99)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6785/3_2/960/jpg/banquet-halls-west-view-party-hall-event-space-7_15_316785-160587165297331.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    West View Party Hall<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Perambur
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹600</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      30-300  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6834/3_2/960/jpeg/whatsapp-image-2024-08-06-at-16-02-18-1_15_486834-174125228552814.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                   League Hotels & Banquets<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Arumbakkam
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                       <span class="text-sm">From₹900</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      50-300  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (29)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/6004/3_2/960/jpeg/whatsapp-image-2023-09-29-at-11-03-24-2_15_456004-169598515982103.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Dwaraka Palace<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Thiruvanmiyur
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹450</span>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                    200-1000 <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>

                  <!-- Review -->
                  <div class="mt-2 flex items-center gap-x-0.5">
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                    <svg class="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                    <span class="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                      (1)
                    </span>
                  </div>
                  <!-- End Review -->
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="h-full flex flex-col">
              <div class="group relative">
                <div class="relative">
                  <a class="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                    <img class="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://cdn0.weddingwire.in/vendor/8938/original/1280/jpg/wedding-venue-atlantis-mini-banquet-hall-banquet-hall-4_15_388938-163643649232510.webp" alt="Product Image">
                  </a>

                  <!-- Add to Favorites -->
                  <div class="absolute top-0 end-0 z-3 pt-2 pe-2">
                    <button type="button" class="size-6 flex justify-center items-center gap-x-1 rounded-full text-xs bg-white border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden">
                      <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span class="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <!-- End Add to Favorites -->

                  <!-- Badge Group -->
                  <div class="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div class="flex flex-col gap-y-1">
                      <p>
                        <span class="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- End Badge Group -->

                  <!-- Quick View -->
                  <div class="absolute top-1/2 start-1/2 z-2 transform -translate-y-1/2 -translate-x-1/2">
                    <div class="opacity-0 group-hover:opacity-100 group-hover:mb-0 -mb-2 duration-300">
                      <div class="h-full flex flex-col justify-center items-center">
                        <button type="button" class="whitespace-nowrap flex items-center gap-x-1.5 py-2 px-3 bg-white text-gray-800 text-xs rounded-full hover:text-gray-500 focus:outline-hidden focus:text-gray-500" data-hs-overlay="#hs-pro-shmchpdm">
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick view
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- ENd Quick View -->
                </div>

                <a class="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

                <div class="pt-3">
                  <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Atlantis Mini Banquet Hall<br>
                    <span class="font-sm ms-auto text-sm text-gray-500 dark:text-neutral-500" style="font-size: 12px;">
                      Anna Nagar East
                    </span>
                  </h4>
                  <div class="mt-1 flex flex-wrap items-center gap-1">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-500">
                      <span class="text-sm">From₹500</span>
                    </span>
                    <span class="text-sm text-gray-500 dark:text-neutral-500">
                      <s></s>
                    </span>
                    <span class="ms-auto text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1">
                      20-150  <svg class="shrink-0 size-3" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-auto pt-3">
                <button type="button" class="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <!-- End Card -->
          </div>
          <!-- End Grid -->

          <div class="mt-10 text-center max-w-40 mx-auto">
            <button type="button" class="py-3 px-4 w-full inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700">
              See more
            </button>
          </div>
        </div>
      </div>
      <!-- End Listing -->
    </div>
  </main>
  <!-- ========== END MAIN CONTENT ========== -->

  <!-- ========== FOOTER ========== -->
  <footer class="bg-white border-t border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
    <div class="w-full max-w-[85rem] mx-auto py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <h4 class="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Company</h4>

          <ul class="grid space-y-2">
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">About Preline</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Affiliate &amp; Influencer: Earn Commission</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Contact us</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Press</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Preline's Tree Planting Program</a></li>
          </ul>
        </div>
        <!-- End Col -->

        <div>
          <h4 class="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Customer service</h4>

          <ul class="grid space-y-2">
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Return and refund policy</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Intellectual property policy</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Shipping info</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Report suspicious activity</a></li>
          </ul>
        </div>
        <!-- End Col -->

        <div>
          <h4 class="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">Help</h4>

          <ul class="grid space-y-2">
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Support center &amp; FAQ</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Safety center</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Preline purchase protection</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Sitemap</a></li>
            <li><a class="text-sm text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Partner with Preline</a></li>
          </ul>
        </div>
        <!-- End Col -->

        <div class="space-y-10">
          <div class="space-y-10">
            <div>
              <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">Download the Preline App</h4>

              <!-- Social Brands -->
              <div class="mt-2 -mx-3 flex flex-col gap-y-2">
                <div class="max-w-42.5">
                  <a class="w-full inline-flex items-center gap-x-2 py-2 px-5 border border-gray-200 text-sm rounded-full hover:border-gray-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="#">
                    <svg class="shrink-0 size-6 text-black dark:text-white" width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6727 7.7422C15.44 7.7422 16.9903 7.05207 18.3238 5.6718C19.6572 4.29152 20.3239 2.6865 20.3239 0.856739C20.3239 0.655779 20.308 0.370205 20.2763 1.52588e-05C20.0435 0.0317458 19.8689 0.0581879 19.7525 0.0793416C18.1227 0.312032 16.6887 1.11058 15.4505 2.47496C14.2124 3.83938 13.5933 5.29898 13.5933 6.85377C13.5933 7.03355 13.6197 7.32973 13.6727 7.7422ZM20.0064 32C21.2658 32 22.6574 31.138 24.1814 29.414C25.7053 27.69 26.8694 25.6645 27.6737 23.3376C24.6787 21.7934 23.1813 19.5776 23.1813 16.6901C23.1813 14.2787 24.393 12.2162 26.8165 10.5028C25.1338 8.39796 22.9114 7.34556 20.1493 7.34556C18.9852 7.34556 17.9216 7.52008 16.9586 7.86912L16.3554 8.09123L15.5458 8.40854C15.0167 8.6095 14.5351 8.71001 14.1013 8.71001C13.7626 8.71001 13.3181 8.59363 12.7678 8.36094L12.1487 8.1071L11.5614 7.86912C10.7042 7.50951 9.78348 7.3297 8.79929 7.3297C6.16417 7.3297 4.04763 8.21815 2.44961 9.99506C0.851602 11.7719 0.0526123 14.1147 0.0526123 17.0233C0.0526123 21.1165 1.33312 24.8977 3.89416 28.3669C5.67208 30.789 7.29654 32 8.76753 32C9.39193 32 10.011 31.8784 10.6248 31.6351L11.4026 31.3178L12.0218 31.0957C12.8895 30.789 13.6885 30.6356 14.4187 30.6356C15.1913 30.6356 16.0802 30.8313 17.0856 31.2226L17.5777 31.413C18.6042 31.8043 19.4138 32 20.0064 32Z" fill="currentColor" />
                    </svg>

                    <div class="grow">
                      <span class="block text-[11px] leading-tight text-gray-500 dark:text-neutral-500">Download on the</span>
                      <span class="block font-medium text-sm text-gray-800 dark:text-neutral-200">App Store</span>
                    </div>
                  </a>
                </div>

                <div class="max-w-42.5">
                  <a class="w-full inline-flex items-center gap-x-2 py-2 px-5 border border-gray-200 text-sm rounded-full hover:border-gray-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="#">
                    <svg class="shrink-0 size-6" width="32" height="37" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                    <div class="grow">
                      <span class="block text-[11px] leading-tight text-gray-500 dark:text-neutral-500">Get it on</span>
                      <span class="block font-medium text-sm text-gray-800 dark:text-neutral-200">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
              <!-- End Social Brands -->
            </div>
          </div>

          <div class="space-y-10">
            <div>
              <h4 class="font-medium text-sm text-gray-800 dark:text-neutral-200">Stay connected</h4>

              <!-- Social Brands -->
              <div class="mt-2 -mx-2 flex flex-wrap items-center gap-1">
                <a class="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span class="sr-only">Instagram</span>
                </a>
                <a class="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <svg class="shrink-0 size-4" width="48" height="50" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.5665 20.7714L46.4356 0H42.2012L26.6855 18.0355L14.2931 0H0L18.7397 27.2728L0 49.0548H4.23464L20.6196 30.0087L33.7069 49.0548H48L28.5655 20.7714H28.5665ZM22.7666 27.5131L5.76044 3.18778H12.2646L42.2032 46.012H35.699L22.7666 27.5142V27.5131Z" fill="currentColor" />
                  </svg>
                  <span class="sr-only">X (Twitter)</span>
                </a>
                <a class="flex flex-col justify-center items-center size-9 rounded-full text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                  <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                  <span class="sr-only">YouTube</span>
                </a>
              </div>
              <!-- End Social Brands -->
            </div>
          </div>
        </div>
        <!-- End Col -->
      </div>
      <!-- End Grid -->
    </div>

    <div class="w-full max-w-[85rem] pb-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-5 md:mb-10">
        <h4 class="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">We accept</h4>

        <!-- Cards -->
        <div class="flex flex-wrap gap-x-2">
          <svg class="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M34.482 9a8.17 8.17 0 0 1 3.052.577l-.463 2.926-.308-.143a5.638 5.638 0 0 0-2.534-.52c-1.343 0-1.946.591-1.96 1.168 0 .635.73 1.053 1.92 1.673 1.96.966 2.868 2.148 2.855 3.69C37.016 21.184 34.692 23 31.122 23c-1.526-.015-2.996-.347-3.794-.721l.476-3.043.448.217c1.106.505 1.834.72 3.192.72.98 0 2.03-.418 2.043-1.325 0-.592-.447-1.024-1.763-1.688-1.288-.649-3.01-1.73-2.982-3.676.014-2.639 2.38-4.484 5.74-4.484ZM21.798 22.798H25.2l2.128-13.552h-3.402l-2.128 13.552Z" fill="#00579F" />
            <path clip-rule="evenodd" d="M46.255 9.246h-2.631c-.812 0-1.428.245-1.779 1.124l-5.053 12.428h3.57l.714-2.033h4.368c.098.476.406 2.033.406 2.033H49L46.255 9.246Zm-4.2 8.75 1.36-3.79c-.007.01.038-.116.104-.305.098-.28.243-.693.343-.993l.237 1.167s.645 3.244.785 3.922h-2.828Z" fill="#00579F" fill-rule="evenodd" />
            <path d="m15.624 18.487 3.332-9.241h3.598l-5.348 13.538h-3.598l-3.052-11.852c2.156 1.168 4.088 3.518 4.704 5.68l.364 1.875Z" fill="#00579F" />
            <path d="M12.53 9.246H7.056L7 9.519c4.27 1.125 7.098 3.836 8.26 7.094l-1.19-6.228c-.196-.866-.798-1.11-1.54-1.14Z" fill="#FAA61A" />
            <rect height="31" rx="5.5" stroke="currentColor" class="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg class="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M28.017 22.85A9.137 9.137 0 0 1 22.108 25C17.078 25 13 20.97 13 16s4.078-9 9.108-9c2.255 0 4.318.81 5.909 2.15A9.137 9.137 0 0 1 33.925 7c5.03 0 9.108 4.03 9.108 9s-4.078 9-9.108 9a9.137 9.137 0 0 1-5.908-2.15Z" fill="#ED0006" />
            <path d="M28.017 22.85a8.937 8.937 0 0 0 3.2-6.85c0-2.743-1.242-5.2-3.2-6.85A9.137 9.137 0 0 1 33.925 7c5.03 0 9.108 4.03 9.108 9s-4.078 9-9.108 9a9.137 9.137 0 0 1-5.908-2.15Z" fill="#F9A000" />
            <path d="M28.017 22.85c1.958-1.65 3.2-4.107 3.2-6.85 0-2.743-1.242-5.2-3.2-6.85a8.937 8.937 0 0 0-3.2 6.85c0 2.743 1.241 5.2 3.2 6.85Z" fill="#FF5E00" />
            <rect height="31" rx="5.5" stroke="currentColor" class="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg class="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M17.69 5.001h8.528c1.19 0 1.93 1 1.652 2.228L23.9 24.775C23.62 26.001 22.43 27 21.239 27H12.71c-1.188 0-1.93-1-1.653-2.225L15.03 7.23c.278-1.229 1.469-2.228 2.66-2.228Z" fill="#E21836" />
            <path d="M25.507 5h9.806c1.19 0 .654.999.374 2.228l-3.97 17.546C31.44 26 31.526 27 30.333 27h-9.806c-1.192 0-1.93-1-1.65-2.225l3.969-17.546C23.128 5.998 24.316 5 25.507 5Z" fill="#00447C" />
            <path d="M34.925 5h8.527c1.192 0 1.932.999 1.652 2.228l-3.969 17.546C40.855 26 39.662 27 38.47 27h-8.523c-1.192 0-1.932-1-1.653-2.225l3.97-17.546C32.542 5.998 33.732 5 34.924 5Z" fill="#007B84" />
            <path d="M19.917 10.623c-.877.01-1.136 0-1.219-.02-.032.155-.623 2.965-.625 2.967-.127.569-.22.974-.535 1.236a.937.937 0 0 1-.63.225c-.388 0-.615-.198-.653-.575l-.007-.13.119-.766s.62-2.56.732-2.899a.246.246 0 0 0 .009-.038c-1.21.01-1.423 0-1.438-.02-.008.027-.038.186-.038.186l-.634 2.886-.055.245-.105.8c0 .238.045.432.135.596.29.52 1.113.597 1.58.597.6 0 1.164-.131 1.544-.37.661-.403.834-1.031.988-1.59l.072-.286s.64-2.66.748-3.006c.005-.019.006-.029.012-.038Zm2.177 2.145a1.65 1.65 0 0 0-.69.166c-.091.05-.178.105-.27.161l.083-.307-.046-.052c-.537.112-.657.127-1.152.198l-.042.029c-.058.492-.109.861-.322 1.827-.082.356-.166.715-.25 1.07l.022.046c.509-.028.663-.028 1.104-.02l.036-.04c.056-.296.064-.366.188-.965.058-.284.18-.908.24-1.13.11-.053.22-.105.323-.105.248 0 .218.222.208.31-.01.15-.1.635-.193 1.052l-.062.27c-.043.198-.09.391-.133.588l.019.04c.5-.028.653-.028 1.081-.02l.05-.04c.078-.463.1-.586.238-1.26l.069-.308c.134-.605.2-.912.1-1.162-.108-.28-.365-.348-.601-.348Zm2.431.634c-.266.052-.436.088-.605.11-.167.028-.33.053-.588.09l-.02.019-.018.015c-.027.197-.046.368-.082.568-.03.207-.076.443-.151.781-.059.26-.09.35-.122.441-.033.091-.069.18-.134.435l.015.023.013.022c.24-.012.398-.02.56-.022.161-.006.328 0 .587.002l.023-.02.024-.02c.038-.23.043-.292.066-.404.023-.12.062-.287.158-.731.045-.21.096-.417.143-.63.048-.213.1-.422.148-.63l-.007-.026-.01-.023Zm.006-.854c-.242-.147-.667-.1-.953.102-.284.2-.317.482-.076.63.238.144.664.101.948-.104.284-.203.32-.483.08-.628Zm1.463 3.404c.49 0 .991-.14 1.369-.551.29-.334.424-.832.47-1.036.15-.679.033-.996-.114-1.189-.223-.294-.618-.388-1.027-.388-.246 0-.832.025-1.29.46-.329.313-.48.738-.572 1.146-.093.415-.2 1.163.469 1.442.206.09.503.116.695.116Zm-.038-1.527c.113-.514.246-.946.586-.946.266 0 .286.322.167.837-.021.115-.118.54-.25.721-.092.134-.2.215-.32.215-.036 0-.249 0-.252-.325a2.27 2.27 0 0 1 .069-.502Zm3.1 1.46.038-.04c.055-.295.064-.365.184-.964.06-.284.184-.908.243-1.13.11-.053.217-.105.324-.105.246 0 .216.222.207.31-.01.15-.1.635-.194 1.052l-.058.27c-.045.198-.093.391-.136.588l.018.04c.503-.028.65-.028 1.08-.02l.052-.04c.075-.463.096-.586.237-1.259l.067-.31c.135-.604.203-.911.104-1.161-.11-.28-.37-.348-.603-.348-.154 0-.438.039-.69.167-.09.048-.18.104-.268.16l.077-.307-.041-.052c-.537.112-.66.127-1.155.199l-.038.028c-.06.492-.109.86-.322 1.827-.081.356-.166.716-.25 1.07l.023.046c.509-.028.66-.028 1.101-.02Zm3.693.02.22-1.099s.16-.69.17-.715c0 0 .05-.072.1-.1h.075c.698 0 1.486 0 2.104-.469.42-.32.708-.795.836-1.37.034-.142.058-.31.058-.478 0-.22-.043-.438-.167-.609-.315-.454-.943-.462-1.667-.466l-.357.004c-.927.012-1.3.008-1.452-.011l-.037.193-.332 1.587-.832 3.528c.81-.01 1.141-.01 1.28.006Zm.615-2.814.352-1.575.011-.082.005-.061.141.015.745.066c.288.114.406.41.324.794-.076.352-.298.648-.583.791-.234.121-.522.131-.818.131h-.191l.014-.08Zm2.199 1.363c-.094.41-.2 1.158.464 1.424.212.093.402.12.595.11.204-.01.393-.116.568-.268l-.047.188.03.04c.478-.021.626-.021 1.144-.017l.047-.037c.076-.458.147-.902.344-1.778.096-.42.191-.835.29-1.253l-.016-.046c-.535.102-.678.124-1.192.199l-.04.032-.015.125a.741.741 0 0 0-.375-.318c-.229-.093-.766.027-1.228.46-.325.31-.48.733-.57 1.14Zm1.123.025c.115-.505.246-.932.587-.932.216 0 .33.205.306.554l-.061.283c-.034.15-.071.299-.107.447-.037.102-.08.198-.126.262-.088.128-.297.208-.417.208-.034 0-.244 0-.252-.32-.001-.159.03-.322.07-.502Zm5.868-1.666-.042-.049c-.529.11-.625.128-1.111.196l-.036.036-.006.024-.001-.008c-.362.86-.352.674-.646 1.35l-.004-.082-.073-1.467-.047-.049c-.554.11-.567.128-1.08.196l-.04.036c-.005.018-.005.037-.008.058l.003.008c.064.336.049.261.113.793.03.26.07.523.1.78.05.432.078.644.14 1.302-.346.587-.428.81-.76 1.325l.002.005-.235.382c-.027.04-.05.068-.085.08a.344.344 0 0 1-.154.022h-.13l-.193.661.663.012c.389-.002.633-.189.765-.44l.416-.735H40.1l.043-.052c.28-.621 2.412-4.384 2.412-4.384Zm-6.991 8.682h-.281l1.04-3.54h.345l.11-.366.01.406c-.013.25.179.473.682.436h.582l.2-.681h-.218c-.127 0-.185-.033-.178-.103l-.01-.413h-1.078v.002c-.349.008-1.39.034-1.6.092-.256.068-.524.267-.524.267l.105-.365H33.74l-.21.724-1.054 3.595h-.205l-.2.678h2.008l-.067.225h.99l.065-.226h.278l.218-.73Zm-.824-2.821c-.162.046-.462.185-.462.185l.267-.905h.801l-.193.66s-.248.015-.413.06Zm.015 1.293s-.252.032-.417.07c-.164.052-.47.212-.47.212l.277-.942h.805l-.195.66Zm-.449 1.537h-.804l.233-.795h.801l-.23.795Zm1.936-2.197h1.158l-.166.555h-1.174l-.176.607h1.027l-.778 1.127a.322.322 0 0 1-.158.136.45.45 0 0 1-.208.062h-.285l-.196.664h.745c.388 0 .617-.181.785-.42l.534-.75.114.762a.357.357 0 0 0 .192.26c.075.038.152.104.26.114.117.005.202.009.258.009h.366l.22-.744h-.145c-.082 0-.225-.014-.25-.04-.024-.033-.024-.083-.037-.16l-.116-.764h-.476l.209-.256h1.171l.18-.607h-1.084l.169-.555h1.081l.2-.684h-3.223l-.197.684Zm-9.785 2.351.27-.926h1.111l.204-.688h-1.113l.17-.57h1.087l.201-.667h-2.72l-.197.667h.618l-.165.57h-.62l-.204.7h.617l-.36 1.225c-.049.162.023.224.068.3a.299.299 0 0 0 .199.149c.109.025.183.04.285.04h1.253l.223-.763-.555.079c-.108 0-.405-.014-.372-.116Zm.127-4.433-.281.524a.606.606 0 0 1-.164.219c-.043.027-.128.039-.251.039h-.147l-.197.67h.488c.235 0 .415-.088.501-.133.093-.05.117-.022.188-.093l.165-.147h1.524l.202-.697h-1.115l.195-.382h-1.108Zm2.25 4.447c-.026-.039-.007-.107.032-.248l.417-1.419h1.482c.216-.003.372-.006.473-.013a.95.95 0 0 0 .356-.124.675.675 0 0 0 .26-.246c.063-.09.167-.29.255-.596l.524-1.796-1.538.009s-.473.072-.682.151c-.21.089-.51.336-.51.336l.138-.492h-.95l-1.33 4.54a2.886 2.886 0 0 0-.086.38c-.002.083.102.165.17.227.079.062.197.052.31.062.118.01.287.015.52.015h.73l.224-.779-.654.064a.17.17 0 0 1-.141-.071Zm.718-2.625h1.556l-.099.319c-.014.007-.047-.016-.206.003h-1.347l.096-.322Zm.311-1.071h1.57l-.113.384s-.74-.007-.858.015c-.521.093-.826.38-.826.38l.227-.78Zm1.18 2.459a.172.172 0 0 1-.06.098c-.032.021-.084.029-.16.029H30.6l.013-.389h-.922l-.037 1.9c-.002.138.011.217.109.28.097.08.397.09.802.09h.578l.208-.711-.503.028-.167.01c-.023-.01-.045-.019-.07-.044-.02-.022-.056-.008-.05-.146l.004-.487.527-.022c.285 0 .407-.096.511-.187.1-.087.132-.187.169-.322l.088-.431h-.725l-.092.304Z" fill="#FEFEFE" />
            <rect height="31" rx="5.5" stroke="currentColor" class="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>

          <svg class="w-12 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" width="56" height="32" fill="none">
            <path d="M19.648 15.984c0 2.074 1.629 3.683 3.725 3.683.592 0 1.1-.117 1.726-.411v-1.62c-.55.55-1.038.772-1.662.772-1.386 0-2.37-1.005-2.37-2.434 0-1.355 1.015-2.424 2.306-2.424.656 0 1.153.235 1.726.794v-1.62c-.604-.306-1.101-.433-1.694-.433-2.085 0-3.757 1.642-3.757 3.693ZM16.116 14.27c0 .382.242.584 1.068.89 1.566.572 2.03 1.08 2.03 2.2 0 1.366-1.003 2.317-2.434 2.317-1.047 0-1.809-.412-2.443-1.343l.89-.856c.316.612.845.94 1.501.94.614 0 1.069-.423 1.069-.995 0-.296-.138-.55-.413-.73-.138-.085-.412-.212-.951-.402-1.293-.465-1.736-.962-1.736-1.935 0-1.155.952-2.022 2.2-2.022.774 0 1.482.265 2.074.783l-.72.943c-.359-.402-.698-.572-1.11-.572-.593 0-1.025.338-1.025.783Z" fill="#231F20" />
            <path clip-rule="evenodd" d="M8.02 12.451H6v7.057h2.01c1.068 0 1.84-.252 2.518-.815a3.54 3.54 0 0 0 1.28-2.709c0-2.082-1.555-3.533-3.788-3.533Zm1.608 5.301c-.432.39-.994.561-1.883.561h-.37v-4.666h.37c.89 0 1.429.159 1.883.57.476.424.763 1.081.763 1.757 0 .677-.287 1.354-.763 1.778Z" fill="#231F20" fill-rule="evenodd" />
            <path d="M13.819 12.451h-1.377v7.057h1.377V12.45ZM34.13 12.451l1.882 4.74 1.906-4.74h1.492l-3.048 7.238h-.74l-2.995-7.238h1.503ZM40.033 19.508h3.903v-1.195h-2.528v-1.905h2.435v-1.195h-2.435v-1.566h2.528V12.45h-3.903v7.057Z" fill="#231F20" />
            <path clip-rule="evenodd" d="M46.889 12.451c1.587 0 2.497.762 2.497 2.083 0 1.08-.57 1.79-1.607 2L50 19.509h-1.693l-1.905-2.835h-.18v2.835h-1.374V12.45h2.04Zm-.666 3.249h.402c.879 0 1.345-.382 1.345-1.091 0-.687-.466-1.046-1.323-1.046h-.424V15.7Z" fill="#231F20" fill-rule="evenodd" />
            <path d="M29.302 19.758a3.754 3.754 0 1 0 0-7.508 3.754 3.754 0 0 0 0 7.508Z" fill="#F48120" />
            <path d="M56 20c-1.492 1.035-12.661 8.428-32 12h28.85c1.74 0 3.15-1.39 3.15-3.104V20Z" fill="#F47216" />
            <rect height="31" rx="5.5" stroke="currentColor" class="stroke-gray-300 dark:stroke-neutral-600" width="55" x=".5" y=".5" />
          </svg>
        </div>
        <!-- End Cards -->
      </div>

      <!-- List -->
      <ul class="flex flex-wrap items-center whitespace-nowrap gap-3">
        <li class="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <p class="text-xs text-gray-500 dark:text-neutral-500">
            © 2025 Preline Labs.
          </p>
        </li>
        <li class="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <a class="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
            Terms and Conditions
          </a>
        </li>
        <li class="inline-flex items-center relative text-xs text-gray-500 pe-3.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:text-neutral-500 dark:after:bg-neutral-600">
          <a class="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
            Privacy &amp; Policy
          </a>
        </li>
      </ul>
      <!-- End List -->
    </div>
  </footer>
  <!-- ========== END FOOTER ========== -->

  <!-- ========== SECONDARY CONTENT ========== -->
  <!-- Regional Settings Modal -->
  <div id="hs-pro-shmnrsm" class="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shmnrsm-label">
    <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div class="w-full max-h-full relative overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
        <!-- Header -->
        <div class="py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
          <h3 id="hs-pro-shmnrsm-label" class="font-medium text-gray-800 dark:text-neutral-200">
            Which country would like to shop in?
          </h3>
          <button type="button" class="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-pro-shmnrsm">
            <span class="sr-only">Close</span>
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <!-- End Header -->

        <!-- Body -->
        <div id="hs-pro-shmnrsm-body" class="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div class="p-6 space-y-5">
            <!-- Select Input -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200">
                Language
              </label>

              <!-- Language Select -->
              <div class="relative">
                <select id="hs-pro-select-language" data-hs-select='{
                  "placeholder": "Select country",
                  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><div data-icon></div></button>",
                  "dropdownClasses": "z-80 w-full min-w-45 max-h-72 p-1 space-y-0.5 z-50 w-full overflow-hidden overflow-y-auto bg-white rounded-xl shadow-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                  
                  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex items-center gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
                  "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                  "optionTemplate": "<div><div class=\"flex items-center gap-x-2\"><div data-icon></div><div class=\"text-gray-800 dark:text-neutral-200\" data-title></div><span class=\"hidden hs-selected:block ms-auto\"><svg class=\"shrink-0 size-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div></div>",
                  "dropdownScope": "window",
                  "viewport": "#hs-pro-shmnrsm-body"
                }' class="hidden">
                  <option value="">Choose</option>
                  <option selected value="English-us" data-hs-select-option='{
                  "icon": "<svg class=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><g fill-rule=\"evenodd\"><g stroke-width=\"1pt\"><path fill=\"#bd3d44\" d=\"M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z\" transform=\"scale(3.9385)\"/><path fill=\"#fff\" d=\"M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z\" transform=\"scale(3.9385)\"/></g><path fill=\"#192f5d\" d=\"M0 0h98.8v70H0z\" transform=\"scale(3.9385)\"/><path fill=\"#fff\" d=\"M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z\" transform=\"scale(3.9385)\"/></g></svg>"}'>
                    English (United States)
                  </option>
                  <option value="English-uk" data-hs-select-option='{
                  "icon": "<svg class=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-gb\" viewBox=\"0 0 512 512\"><path fill=\"#012169\" d=\"M0 0h512v512H0z\"/><path fill=\"#FFF\" d=\"M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z\"/><path fill=\"#C8102E\" d=\"M184 324l11 34L42 512H0v-3l184-185zm124-12l54 8 150 147v45L308 312zM512 0L320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z\"/><path fill=\"#FFF\" d=\"M176 0v512h160V0H176zM0 176v160h512V176H0z\"/><path fill=\"#C8102E\" d=\"M0 208v96h512v-96H0zM208 0v512h96V0h-96z\"/></svg>"}'>
                    English (United Kingdom)
                  </option>
                  <option value="Deutsch" data-hs-select-option='{
                  "icon": "<svg class=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-de\" viewBox=\"0 0 512 512\"><path fill=\"#ffce00\" d=\"M0 341.3h512V512H0z\"/><path d=\"M0 0h512v170.7H0z\"/><path fill=\"#d00\" d=\"M0 170.7h512v170.6H0z\"/></svg>"}'>
                    Deutsch
                  </option>
                  <option value="Dansk" data-hs-select-option='{
                  "icon": "<svg class=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-dk\" viewBox=\"0 0 512 512\"><path fill=\"#c8102e\" d=\"M0 0h512.1v512H0z\"/><path fill=\"#fff\" d=\"M144 0h73.1v512H144z\"/><path fill=\"#fff\" d=\"M0 219.4h512.1v73.2H0z\"/></svg>"}'>
                    Dansk
                  </option>
                  <option value="Italiano" data-hs-select-option='{
                  "icon": "<svg class=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" id=\"flag-icon-css-it\" viewBox=\"0 0 512 512\"><g fill-rule=\"evenodd\" stroke-width=\"1pt\"><path fill=\"#fff\" d=\"M0 0h512v512H0z\"/><path fill=\"#009246\" d=\"M0 0h170.7v512H0z\"/><path fill=\"#ce2b37\" d=\"M341.3 0H512v512H341.3z\"/></g></svg>"}'>
                    Italiano
                  </option>
                  <option value="中文-繁體" data-hs-select-option='{
                  "icon": "<svg class=\"shrink-0 size-4 rounded-full\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"flag-icon-css-cn\" viewBox=\"0 0 512 512\"><defs><path id=\"a\" fill=\"#ffde00\" d=\"M1-.3L-.7.8 0-1 .6.8-1-.3z\"/></defs><path fill=\"#de2910\" d=\"M0 0h512v512H0z\"/><use width=\"30\" height=\"20\" transform=\"matrix(76.8 0 0 76.8 128 128)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-121 142.6 -47) scale(25.5827)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-98.1 198 -82) scale(25.6)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"rotate(-74 272.4 -114) scale(25.6137)\" xlink:href=\"#a\"/><use width=\"30\" height=\"20\" transform=\"matrix(16 -19.968 19.968 16 256 230.4)\" xlink:href=\"#a\"/></svg>"}'>
                    中文 (繁體)
                  </option>
                </select>

                <div class="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg class="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </div>
                <!-- End Header -->
              </div>
              <!-- End Language Select -->
            </div>
            <!-- End Select Input -->

            <!-- Select Input -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200">
                Country
              </label>

              <!-- Select -->
              <div class="relative">
                <select data-hs-select='{
                    "placeholder": "",
                    "hasSearch": true,
                    "searchPlaceholder": "Country",
                    "searchClasses": "py-1.5 sm:py-2 px-3 block w-full sm:text-sm border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400",
                    "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
                    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"flex\" data-icon></span><span class=\"text-gray-800 dark:text-neutral-200\" data-title></span></button>",
                    
                    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
                    "dropdownClasses": "z-80 max-h-72 p-1 pt-0 space-y-0.5 z-50 w-full overflow-hidden overflow-y-auto bg-white rounded-xl shadow-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                    "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                    "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200\" data-title></div></div></div>",
                    "dropdownScope": "window",
                    "viewport": "#hs-pro-shmnrsm-body"
                  }' class="hidden">
                  <option value="">Choose</option>
                  <option value="AF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/af.png\" alt=\"Afghanistan\" />"}'>
                    Afghanistan
                  </option>
                  <option value="AX" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ax.png\" alt=\"Aland Islands\" />"}'>
                    Aland Islands
                  </option>
                  <option value="AL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/al.png\" alt=\"Albania\" />"}'>
                    Albania
                  </option>
                  <option value="DZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/dz.png\" alt=\"Algeria\" />"}'>
                    Algeria
                  </option>
                  <option value="AS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/as.png\" alt=\"American Samoa\" />"}'>
                    American Samoa
                  </option>
                  <option value="AD" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ad.png\" alt=\"Andorra\" />"}'>
                    Andorra
                  </option>
                  <option value="AO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ao.png\" alt=\"Angola\" />"}'>
                    Angola
                  </option>
                  <option value="AI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ai.png\" alt=\"Anguilla\" />"}'>
                    Anguilla
                  </option>
                  <option value="AG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ag.png\" alt=\"Antigua and Barbuda\" />"}'>
                    Antigua and Barbuda
                  </option>
                  <option value="AR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ar.png\" alt=\"Argentina\" />"}'>
                    Argentina
                  </option>
                  <option value="AM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/am.png\" alt=\"Armenia\" />"}'>
                    Armenia
                  </option>
                  <option value="AW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/aw.png\" alt=\"Aruba\" />"}'>
                    Aruba
                  </option>
                  <option value="AU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/au.png\" alt=\"Australia\" />"}'>
                    Australia
                  </option>
                  <option value="AT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/at.png\" alt=\"Austria\" />"}'>
                    Austria
                  </option>
                  <option value="AZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/az.png\" alt=\"Azerbaijan\" />"}'>
                    Azerbaijan
                  </option>
                  <option value="BS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bs.png\" alt=\"Bahamas\" />"}'>
                    Bahamas
                  </option>
                  <option value="BH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bh.png\" alt=\"Bahrain\" />"}'>
                    Bahrain
                  </option>
                  <option value="BD" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bd.png\" alt=\"Bangladesh\" />"}'>
                    Bangladesh
                  </option>
                  <option value="BB" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bb.png\" alt=\"Barbados\" />"}'>
                    Barbados
                  </option>
                  <option value="BY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/by.png\" alt=\"Belarus\" />"}'>
                    Belarus
                  </option>
                  <option value="BE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/be.png\" alt=\"Belgium\" />"}'>
                    Belgium
                  </option>
                  <option value="BZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bz.png\" alt=\"Belize\" />"}'>
                    Belize
                  </option>
                  <option value="BJ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bj.png\" alt=\"Benin\" />"}'>
                    Benin
                  </option>
                  <option value="BM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bm.png\" alt=\"Bermuda\" />"}'>
                    Bermuda
                  </option>
                  <option value="BT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bt.png\" alt=\"Bhutan\" />"}'>
                    Bhutan
                  </option>
                  <option value="BO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bo.png\" alt=\"Bolivia (Plurinational State of)\" />"}'>
                    Bolivia (Plurinational State of)
                  </option>
                  <option value="BQ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bq.png\" alt=\"Bonaire, Sint Eustatius and Saba\" />"}'>
                    Bonaire, Sint Eustatius and Saba
                  </option>
                  <option value="BA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ba.png\" alt=\"Bosnia and Herzegovina\" />"}'>
                    Bosnia and Herzegovina
                  </option>
                  <option value="BW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bw.png\" alt=\"Botswana\" />"}'>
                    Botswana
                  </option>
                  <option value="BR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/br.png\" alt=\"Brazil\" />"}'>
                    Brazil
                  </option>
                  <option value="IO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/io.png\" alt=\"British Indian Ocean Territory\" />"}'>
                    British Indian Ocean Territory
                  </option>
                  <option value="BN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bn.png\" alt=\"Brunei Darussalam\" />"}'>
                    Brunei Darussalam
                  </option>
                  <option value="BG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bg.png\" alt=\"Bulgaria\" />"}'>
                    Bulgaria
                  </option>
                  <option value="BF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bf.png\" alt=\"Burkina Faso\" />"}'>
                    Burkina Faso
                  </option>
                  <option value="BI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bi.png\" alt=\"Burundi\" />"}'>
                    Burundi
                  </option>
                  <option value="CV" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cv.png\" alt=\"Cabo Verde\" />"}'>
                    Cabo Verde
                  </option>
                  <option value="KH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/kh.png\" alt=\"Cambodia\" />"}'>
                    Cambodia
                  </option>
                  <option value="CM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cm.png\" alt=\"Cameroon\" />"}'>
                    Cameroon
                  </option>
                  <option value="CA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ca.png\" alt=\"Canada\" />"}'>
                    Canada
                  </option>
                  <option value="KY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ky.png\" alt=\"Cayman Islands\" />"}'>
                    Cayman Islands
                  </option>
                  <option value="CF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cf.png\" alt=\"Central African Republic\" />"}'>
                    Central African Republic
                  </option>
                  <option value="TD" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/td.png\" alt=\"Chad\" />"}'>
                    Chad
                  </option>
                  <option value="CL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cl.png\" alt=\"Chile\" />"}'>
                    Chile
                  </option>
                  <option value="CN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cn.png\" alt=\"China\" />"}'>
                    China
                  </option>
                  <option value="CX" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cx.png\" alt=\"Christmas Island\" />"}'>
                    Christmas Island
                  </option>
                  <option value="CC" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cc.png\" alt=\"Cocos (Keeling) Islands\" />"}'>
                    Cocos (Keeling) Islands
                  </option>
                  <option value="CO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/co.png\" alt=\"Colombia\" />"}'>
                    Colombia
                  </option>
                  <option value="KM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/km.png\" alt=\"Comoros\" />"}'>
                    Comoros
                  </option>
                  <option value="CK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ck.png\" alt=\"Cook Islands\" />"}'>
                    Cook Islands
                  </option>
                  <option value="CR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cr.png\" alt=\"Costa Rica\" />"}'>
                    Costa Rica
                  </option>
                  <option value="HR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/hr.png\" alt=\"Croatia\" />"}'>
                    Croatia
                  </option>
                  <option value="CU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cu.png\" alt=\"Cuba\" />"}'>
                    Cuba
                  </option>
                  <option value="CW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cw.png\" alt=\"Curaçao\" />"}'>
                    Curaçao
                  </option>
                  <option value="CY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cy.png\" alt=\"Cyprus\" />"}'>
                    Cyprus
                  </option>
                  <option value="CZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cz.png\" alt=\"Czech Republic\" />"}'>
                    Czech Republic
                  </option>
                  <option value="CI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ci.png\" alt=Côte dIvoire\" />"}'>
                    Côte dIvoire
                  </option>
                  <option value="CD" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cd.png\" alt=\"Democratic Republic of the Congo\" />"}'>
                    Democratic Republic of the Congo
                  </option>
                  <option value="DK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/dk.png\" alt=\"Denmark\" />"}'>
                    Denmark
                  </option>
                  <option value="DJ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/dj.png\" alt=\"Djibouti\" />"}'>
                    Djibouti
                  </option>
                  <option value="DM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/dm.png\" alt=\"Dominica\" />"}'>
                    Dominica
                  </option>
                  <option value="DO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/do.png\" alt=\"Dominican Republic\" />"}'>
                    Dominican Republic
                  </option>
                  <option value="EC" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ec.png\" alt=\"Ecuador\" />"}'>
                    Ecuador
                  </option>
                  <option value="EG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/eg.png\" alt=\"Egypt\" />"}'>
                    Egypt
                  </option>
                  <option value="SV" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sv.png\" alt=\"El Salvador\" />"}'>
                    El Salvador
                  </option>
                  <option value="GB-ENG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"England\" />"}'>
                    England
                  </option>
                  <option value="GQ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gq.png\" alt=\"Equatorial Guinea\" />"}'>
                    Equatorial Guinea
                  </option>
                  <option value="ER" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/er.png\" alt=\"Eritrea\" />"}'>
                    Eritrea
                  </option>
                  <option value="EE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ee.png\" alt=\"Estonia\" />"}'>
                    Estonia
                  </option>
                  <option value="ET" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/et.png\" alt=\"Ethiopia\" />"}'>
                    Ethiopia
                  </option>
                  <option value="FK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/fk.png\" alt=\"Falkland Islands\" />"}'>
                    Falkland Islands
                  </option>
                  <option value="FO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/fo.png\" alt=\"Faroe Islands\" />"}'>
                    Faroe Islands
                  </option>
                  <option value="FM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/fm.png\" alt=\"Federated States of Micronesia\" />"}'>
                    Federated States of Micronesia
                  </option>
                  <option value="FJ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/fj.png\" alt=\"Fiji\" />"}'>
                    Fiji
                  </option>
                  <option value="FI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/fi.png\" alt=\"Finland\" />"}'>
                    Finland
                  </option>
                  <option value="FR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/fr.png\" alt=\"France\" />"}'>
                    France
                  </option>
                  <option value="GF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gf.png\" alt=\"French Guiana\" />"}'>
                    French Guiana
                  </option>
                  <option value="PF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pf.png\" alt=\"French Polynesia\" />"}'>
                    French Polynesia
                  </option>
                  <option value="TF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tf.png\" alt=\"French Southern Territories\" />"}'>
                    French Southern Territories
                  </option>
                  <option value="GA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ga.png\" alt=\"Gabon\" />"}'>
                    Gabon
                  </option>
                  <option value="GM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gm.png\" alt=\"Gambia\" />"}'>
                    Gambia
                  </option>
                  <option value="GE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ge.png\" alt=\"Georgia\" />"}'>
                    Georgia
                  </option>
                  <option value="DE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/de.png\" alt=\"Germany\" />"}'>
                    Germany
                  </option>
                  <option value="GH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gh.png\" alt=\"Ghana\" />"}'>
                    Ghana
                  </option>
                  <option value="GI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gi.png\" alt=\"Gibraltar\" />"}'>
                    Gibraltar
                  </option>
                  <option value="GR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gr.png\" alt=\"Greece\" />"}'>
                    Greece
                  </option>
                  <option value="GL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gl.png\" alt=\"Greenland\" />"}'>
                    Greenland
                  </option>
                  <option value="GD" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gd.png\" alt=\"Grenada\" />"}'>
                    Grenada
                  </option>
                  <option value="GP" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gp.png\" alt=\"Guadeloupe\" />"}'>
                    Guadeloupe
                  </option>
                  <option value="GU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gu.png\" alt=\"Guam\" />"}'>
                    Guam
                  </option>
                  <option value="GT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gt.png\" alt=\"Guatemala\" />"}'>
                    Guatemala
                  </option>
                  <option value="GG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gg.png\" alt=\"Guernsey\" />"}'>
                    Guernsey
                  </option>
                  <option value="GN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gn.png\" alt=\"Guinea\" />"}'>
                    Guinea
                  </option>
                  <option value="GW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gw.png\" alt=\"Guinea-Bissau\" />"}'>
                    Guinea-Bissau
                  </option>
                  <option value="GY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gy.png\" alt=\"Guyana\" />"}'>
                    Guyana
                  </option>
                  <option value="HT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ht.png\" alt=\"Haiti\" />"}'>
                    Haiti
                  </option>
                  <option value="VA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/va.png\" alt=\"Holy See\" />"}'>
                    Holy See
                  </option>
                  <option value="HN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/hn.png\" alt=\"Honduras\" />"}'>
                    Honduras
                  </option>
                  <option value="HK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/hk.png\" alt=\"Hong Kong\" />"}'>
                    Hong Kong
                  </option>
                  <option value="HU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/hu.png\" alt=\"Hungary\" />"}'>
                    Hungary
                  </option>
                  <option value="IS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/is.png\" alt=\"Iceland\" />"}'>
                    Iceland
                  </option>
                  <option value="IN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/in.png\" alt=\"India\" />"}'>
                    India
                  </option>
                  <option value="ID" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/id.png\" alt=\"Indonesia\" />"}'>
                    Indonesia
                  </option>
                  <option value="IR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ir.png\" alt=\"Iran (Islamic Republic of)\" />"}'>
                    Iran (Islamic Republic of)
                  </option>
                  <option value="IQ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/iq.png\" alt=\"Iraq\" />"}'>
                    Iraq
                  </option>
                  <option value="IE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ie.png\" alt=\"Ireland\" />"}'>
                    Ireland
                  </option>
                  <option value="IM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/im.png\" alt=\"Isle of Man\" />"}'>
                    Isle of Man
                  </option>
                  <option value="IL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/il.png\" alt=\"Israel\" />"}'>
                    Israel
                  </option>
                  <option value="IT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/it.png\" alt=\"Italy\" />"}'>
                    Italy
                  </option>
                  <option value="JM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/jm.png\" alt=\"Jamaica\" />"}'>
                    Jamaica
                  </option>
                  <option value="JP" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/jp.png\" alt=\"Japan\" />"}'>
                    Japan
                  </option>
                  <option value="JE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/je.png\" alt=\"Jersey\" />"}'>
                    Jersey
                  </option>
                  <option value="JO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/jo.png\" alt=\"Jordan\" />"}'>
                    Jordan
                  </option>
                  <option value="KZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/kz.png\" alt=\"Kazakhstan\" />"}'>
                    Kazakhstan
                  </option>
                  <option value="KE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ke.png\" alt=\"Kenya\" />"}'>
                    Kenya
                  </option>
                  <option value="KI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ki.png\" alt=\"Kiribati\" />"}'>
                    Kiribati
                  </option>
                  <option value="KW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/kw.png\" alt=\"Kuwait\" />"}'>
                    Kuwait
                  </option>
                  <option value="KG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/kg.png\" alt=\"Kyrgyzstan\" />"}'>
                    Kyrgyzstan
                  </option>
                  <option value="LA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/la.png\" alt=\"Laos\" />"}'>
                    Laos
                  </option>
                  <option value="LV" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/lv.png\" alt=\"Latvia\" />"}'>
                    Latvia
                  </option>
                  <option value="LB" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/lb.png\" alt=\"Lebanon\" />"}'>
                    Lebanon
                  </option>
                  <option value="LS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ls.png\" alt=\"Lesotho\" />"}'>
                    Lesotho
                  </option>
                  <option value="LR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/lr.png\" alt=\"Liberia\" />"}'>
                    Liberia
                  </option>
                  <option value="LY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ly.png\" alt=\"Libya\" />"}'>
                    Libya
                  </option>
                  <option value="LI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/li.png\" alt=\"Liechtenstein\" />"}'>
                    Liechtenstein
                  </option>
                  <option value="LT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/lt.png\" alt=\"Lithuania\" />"}'>
                    Lithuania
                  </option>
                  <option value="LU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/lu.png\" alt=\"Luxembourg\" />"}'>
                    Luxembourg
                  </option>
                  <option value="MO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mo.png\" alt=\"Macau\" />"}'>
                    Macau
                  </option>
                  <option value="MG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mg.png\" alt=\"Madagascar\" />"}'>
                    Madagascar
                  </option>
                  <option value="MW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mw.png\" alt=\"Malawi\" />"}'>
                    Malawi
                  </option>
                  <option value="MY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/my.png\" alt=\"Malaysia\" />"}'>
                    Malaysia
                  </option>
                  <option value="MV" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mv.png\" alt=\"Maldives\" />"}'>
                    Maldives
                  </option>
                  <option value="ML" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ml.png\" alt=\"Mali\" />"}'>
                    Mali
                  </option>
                  <option value="MT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mt.png\" alt=\"Malta\" />"}'>
                    Malta
                  </option>
                  <option value="MH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mh.png\" alt=\"Marshall Islands\" />"}'>
                    Marshall Islands
                  </option>
                  <option value="MQ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mq.png\" alt=\"Martinique\" />"}'>
                    Martinique
                  </option>
                  <option value="MR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mr.png\" alt=\"Mauritania\" />"}'>
                    Mauritania
                  </option>
                  <option value="MU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mu.png\" alt=\"Mauritius\" />"}'>
                    Mauritius
                  </option>
                  <option value="YT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/yt.png\" alt=\"Mayotte\" />"}'>
                    Mayotte
                  </option>
                  <option value="MX" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mx.png\" alt=\"Mexico\" />"}'>
                    Mexico
                  </option>
                  <option value="MD" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/md.png\" alt=\"Moldova\" />"}'>
                    Moldova
                  </option>
                  <option value="MC" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mc.png\" alt=\"Monaco\" />"}'>
                    Monaco
                  </option>
                  <option value="MN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mn.png\" alt=\"Mongolia\" />"}'>
                    Mongolia
                  </option>
                  <option value="ME" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/me.png\" alt=\"Montenegro\" />"}'>
                    Montenegro
                  </option>
                  <option value="MS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ms.png\" alt=\"Montserrat\" />"}'>
                    Montserrat
                  </option>
                  <option value="MA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ma.png\" alt=\"Morocco\" />"}'>
                    Morocco
                  </option>
                  <option value="MZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mz.png\" alt=\"Mozambique\" />"}'>
                    Mozambique
                  </option>
                  <option value="MM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mm.png\" alt=\"Myanmar\" />"}'>
                    Myanmar
                  </option>
                  <option value="NA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/na.png\" alt=\"Namibia\" />"}'>
                    Namibia
                  </option>
                  <option value="NR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/nr.png\" alt=\"Nauru\" />"}'>
                    Nauru
                  </option>
                  <option value="NP" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/np.png\" alt=\"Nepal\" />"}'>
                    Nepal
                  </option>
                  <option value="NL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/nl.png\" alt=\"Netherlands\" />"}'>
                    Netherlands
                  </option>
                  <option value="NC" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/nc.png\" alt=\"New Caledonia\" />"}'>
                    New Caledonia
                  </option>
                  <option value="NZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/nz.png\" alt=\"New Zealand\" />"}'>
                    New Zealand
                  </option>
                  <option value="NI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ni.png\" alt=\"Nicaragua\" />"}'>
                    Nicaragua
                  </option>
                  <option value="NE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ne.png\" alt=\"Niger\" />"}'>
                    Niger
                  </option>
                  <option value="NG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ng.png\" alt=\"Nigeria\" />"}'>
                    Nigeria
                  </option>
                  <option value="NU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/nu.png\" alt=\"Niue\" />"}'>
                    Niue
                  </option>
                  <option value="NF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/nf.png\" alt=\"Norfolk Island\" />"}'>
                    Norfolk Island
                  </option>
                  <option value="KP" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/kp.png\" alt=\"North Korea\" />"}'>
                    North Korea
                  </option>
                  <option value="MK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mk.png\" alt=\"North Macedonia\" />"}'>
                    North Macedonia
                  </option>
                  <option value="GB-NIR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Northern Ireland\" />"}'>
                    Northern Ireland
                  </option>
                  <option value="MP" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mp.png\" alt=\"Northern Mariana Islands\" />"}'>
                    Northern Mariana Islands
                  </option>
                  <option value="NO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/no.png\" alt=\"Norway\" />"}'>
                    Norway
                  </option>
                  <option value="OM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/om.png\" alt=\"Oman\" />"}'>
                    Oman
                  </option>
                  <option value="PK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pk.png\" alt=\"Pakistan\" />"}'>
                    Pakistan
                  </option>
                  <option value="PW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pw.png\" alt=\"Palau\" />"}'>
                    Palau
                  </option>
                  <option value="PA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pa.png\" alt=\"Panama\" />"}'>
                    Panama
                  </option>
                  <option value="PG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pg.png\" alt=\"Papua New Guinea\" />"}'>
                    Papua New Guinea
                  </option>
                  <option value="PY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/py.png\" alt=\"Paraguay\" />"}'>
                    Paraguay
                  </option>
                  <option value="PE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pe.png\" alt=\"Peru\" />"}'>
                    Peru
                  </option>
                  <option value="PH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ph.png\" alt=\"Philippines\" />"}'>
                    Philippines
                  </option>
                  <option value="PN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pn.png\" alt=\"Pitcairn\" />"}'>
                    Pitcairn
                  </option>
                  <option value="PL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pl.png\" alt=\"Poland\" />"}'>
                    Poland
                  </option>
                  <option value="PT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pt.png\" alt=\"Portugal\" />"}'>
                    Portugal
                  </option>
                  <option value="PR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pr.png\" alt=\"Puerto Rico\" />"}'>
                    Puerto Rico
                  </option>
                  <option value="QA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/qa.png\" alt=\"Qatar\" />"}'>
                    Qatar
                  </option>
                  <option value="CG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/cg.png\" alt=\"Republic of the Congo\" />"}'>
                    Republic of the Congo
                  </option>
                  <option value="RO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ro.png\" alt=\"Romania\" />"}'>
                    Romania
                  </option>
                  <option value="RU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ru.png\" alt=\"Russia\" />"}'>
                    Russia
                  </option>
                  <option value="RW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/rw.png\" alt=\"Rwanda\" />"}'>
                    Rwanda
                  </option>
                  <option value="RE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/re.png\" alt=\"Réunion\" />"}'>
                    Réunion
                  </option>
                  <option value="BL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/bl.png\" alt=\"Saint Barthélemy\" />"}'>
                    Saint Barthélemy
                  </option>
                  <option value="SH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sh.png\" alt=\"Saint Helena, Ascension and Tristan da Cunha\" />"}'>
                    Saint Helena, Ascension and Tristan da Cunha
                  </option>
                  <option value="KN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/kn.png\" alt=\"Saint Kitts and Nevis\" />"}'>
                    Saint Kitts and Nevis
                  </option>
                  <option value="LC" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/lc.png\" alt=\"Saint Lucia\" />"}'>
                    Saint Lucia
                  </option>
                  <option value="MF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/mf.png\" alt=\"Saint Martin\" />"}'>
                    Saint Martin
                  </option>
                  <option value="PM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/pm.png\" alt=\"Saint Pierre and Miquelon\" />"}'>
                    Saint Pierre and Miquelon
                  </option>
                  <option value="VC" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/vc.png\" alt=\"Saint Vincent and the Grenadines\" />"}'>
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="WS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ws.png\" alt=\"Samoa\" />"}'>
                    Samoa
                  </option>
                  <option value="SM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sm.png\" alt=\"San Marino\" />"}'>
                    San Marino
                  </option>
                  <option value="ST" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/st.png\" alt=\"Sao Tome and Principe\" />"}'>
                    Sao Tome and Principe
                  </option>
                  <option value="SA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sa.png\" alt=\"Saudi Arabia\" />"}'>
                    Saudi Arabia
                  </option>
                  <option value="GB-SCT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Scotland\" />"}'>
                    Scotland
                  </option>
                  <option value="SN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sn.png\" alt=\"Senegal\" />"}'>
                    Senegal
                  </option>
                  <option value="RS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/rs.png\" alt=\"Serbia\" />"}'>
                    Serbia
                  </option>
                  <option value="SC" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sc.png\" alt=\"Seychelles\" />"}'>
                    Seychelles
                  </option>
                  <option value="SL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sl.png\" alt=\"Sierra Leone\" />"}'>
                    Sierra Leone
                  </option>
                  <option value="SG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sg.png\" alt=\"Singapore\" />"}'>
                    Singapore
                  </option>
                  <option value="SX" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sx.png\" alt=\"Sint Maarten\" />"}'>
                    Sint Maarten
                  </option>
                  <option value="SK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sk.png\" alt=\"Slovakia\" />"}'>
                    Slovakia
                  </option>
                  <option value="SI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/si.png\" alt=\"Slovenia\" />"}'>
                    Slovenia
                  </option>
                  <option value="SB" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sb.png\" alt=\"Solomon Islands\" />"}'>
                    Solomon Islands
                  </option>
                  <option value="SO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/so.png\" alt=\"Somalia\" />"}'>
                    Somalia
                  </option>
                  <option value="ZA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/za.png\" alt=\"South Africa\" />"}'>
                    South Africa
                  </option>
                  <option value="GS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gs.png\" alt=\"South Georgia and the South Sandwich Islands\" />"}'>
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="KR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/kr.png\" alt=\"South Korea\" />"}'>
                    South Korea
                  </option>
                  <option value="SS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ss.png\" alt=\"South Sudan\" />"}'>
                    South Sudan
                  </option>
                  <option value="ES" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/es.png\" alt=\"Spain\" />"}'>
                    Spain
                  </option>
                  <option value="LK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/lk.png\" alt=\"Sri Lanka\" />"}'>
                    Sri Lanka
                  </option>
                  <option value="PS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ps.png\" alt=\"State of Palestine\" />"}'>
                    State of Palestine
                  </option>
                  <option value="SD" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sd.png\" alt=\"Sudan\" />"}'>
                    Sudan
                  </option>
                  <option value="SR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sr.png\" alt=\"Suriname\" />"}'>
                    Suriname
                  </option>
                  <option value="SJ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sj.png\" alt=\"Svalbard and Jan Mayen\" />"}'>
                    Svalbard and Jan Mayen
                  </option>
                  <option value="SZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sz.png\" alt=\"Swaziland\" />"}'>
                    Swaziland
                  </option>
                  <option value="SE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/se.png\" alt=\"Sweden\" />"}'>
                    Sweden
                  </option>
                  <option value="CH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ch.png\" alt=\"Switzerland\" />"}'>
                    Switzerland
                  </option>
                  <option value="SY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/sy.png\" alt=\"Syrian Arab Republic\" />"}'>
                    Syrian Arab Republic
                  </option>
                  <option value="TW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tw.png\" alt=\"Taiwan\" />"}'>
                    Taiwan
                  </option>
                  <option value="TJ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tj.png\" alt=\"Tajikistan\" />"}'>
                    Tajikistan
                  </option>
                  <option value="TZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tz.png\" alt=\"Tanzania\" />"}'>
                    Tanzania
                  </option>
                  <option value="TH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/th.png\" alt=\"Thailand\" />"}'>
                    Thailand
                  </option>
                  <option value="TL" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tl.png\" alt=\"Timor-Leste\" />"}'>
                    Timor-Leste
                  </option>
                  <option value="TG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tg.png\" alt=\"Togo\" />"}'>
                    Togo
                  </option>
                  <option value="TK" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tk.png\" alt=\"Tokelau\" />"}'>
                    Tokelau
                  </option>
                  <option value="TO" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/to.png\" alt=\"Tonga\" />"}'>
                    Tonga
                  </option>
                  <option value="TT" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tt.png\" alt=\"Trinidad and Tobago\" />"}'>
                    Trinidad and Tobago
                  </option>
                  <option value="TN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tn.png\" alt=\"Tunisia\" />"}'>
                    Tunisia
                  </option>
                  <option value="TR" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tr.png\" alt=\"Turkey\" />"}'>
                    Turkey
                  </option>
                  <option value="TM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tm.png\" alt=\"Turkmenistan\" />"}'>
                    Turkmenistan
                  </option>
                  <option value="TC" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tc.png\" alt=\"Turks and Caicos Islands\" />"}'>
                    Turks and Caicos Islands
                  </option>
                  <option value="TV" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/tv.png\" alt=\"Tuvalu\" />"}'>
                    Tuvalu
                  </option>
                  <option value="UG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ug.png\" alt=\"Uganda\" />"}'>
                    Uganda
                  </option>
                  <option value="UA" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ua.png\" alt=\"Ukraine\" />"}'>
                    Ukraine
                  </option>
                  <option value="AE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ae.png\" alt=\"United Arab Emirates\" />"}'>
                    United Arab Emirates
                  </option>
                  <option value="GB" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"United Kingdom\" />"}'>
                    United Kingdom
                  </option>
                  <option value="UM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/um.png\" alt=\"United States Minor Outlying Islands\" />"}'>
                    United States Minor Outlying Islands
                  </option>
                  <option selected value="US" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/us.png\" alt=\"United States of America\" />"}'>
                    United States of America
                  </option>
                  <option value="UY" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/uy.png\" alt=\"Uruguay\" />"}'>
                    Uruguay
                  </option>
                  <option value="UZ" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/uz.png\" alt=\"Uzbekistan\" />"}'>
                    Uzbekistan
                  </option>
                  <option value="VU" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/vu.png\" alt=\"Vanuatu\" />"}'>
                    Vanuatu
                  </option>
                  <option value="VE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ve.png\" alt=\"Venezuela (Bolivarian Republic of)\" />"}'>
                    Venezuela (Bolivarian Republic of)
                  </option>
                  <option value="VN" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/vn.png\" alt=\"Vietnam\" />"}'>
                    Vietnam
                  </option>
                  <option value="VG" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/vg.png\" alt=\"Virgin Islands (British)\" />"}'>
                    Virgin Islands (British)
                  </option>
                  <option value="VI" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/vi.png\" alt=\"Virgin Islands (U.S.)\" />"}'>
                    Virgin Islands (U.S.)
                  </option>
                  <option value="GB-WLS" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Wales\" />"}'>
                    Wales
                  </option>
                  <option value="WF" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/wf.png\" alt=\"Wallis and Futuna\" />"}'>
                    Wallis and Futuna
                  </option>
                  <option value="EH" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/eh.png\" alt=\"Western Sahara\" />"}'>
                    Western Sahara
                  </option>
                  <option value="YE" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/ye.png\" alt=\"Yemen\" />"}'>
                    Yemen
                  </option>
                  <option value="ZM" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/zm.png\" alt=\"Zambia\" />"}'>
                    Zambia
                  </option>
                  <option value="ZW" data-hs-select-option='{
                    "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"./assets/vendor/svg-country-flags/png100px/zw.png\" alt=\"Zimbabwe\" />"}'>
                    Zimbabwe
                  </option>
                </select>

                <div class="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg class="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </div>
              </div>
              <!-- End Select -->
            </div>
            <!-- End Select Input -->

            <!-- Select Input -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200">
                Currency
              </label>

              <!-- Select -->
              <div class="relative">
                <select data-hs-select='{
                    "placeholder": "Select currency",
                    "hasSearch": true,
                    "searchPlaceholder": "Select currency",
                    "searchClasses": "py-1.5 sm:py-2 px-3 block w-full sm:text-sm border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400",
                    "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
                    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                    "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex items-center gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
                    
                    "dropdownClasses": "z-80 w-full max-h-72 p-1 space-y-0.5 z-50 overflow-hidden overflow-y-auto bg-white rounded-xl shadow-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                    "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                    "dropdownScope": "window",
                    "viewport": "#hs-pro-shmnrsm-body"
                  }' class="hidden">
                  <option value="">Choose</option>
                  <option value="USD" selected>USD</option>
                  <option value="AED">AED</option>
                  <option value="AFN">AFN</option>
                  <option value="ALL">ALL</option>
                  <option value="AMD">AMD</option>
                  <option value="ANG">ANG</option>
                  <option value="AOA">AOA</option>
                  <option value="ARS">ARS</option>
                  <option value="AUD">AUD</option>
                  <option value="AWG">AWG</option>
                  <option value="AZN">AZN</option>
                  <option value="BAM">BAM</option>
                  <option value="BBD">BBD</option>
                  <option value="BDT">BDT</option>
                  <option value="BGN">BGN</option>
                  <option value="BIF">BIF</option>
                  <option value="BMD">BMD</option>
                  <option value="BND">BND</option>
                  <option value="BOB">BOB</option>
                  <option value="BRL">BRL</option>
                  <option value="BSD">BSD</option>
                  <option value="BWP">BWP</option>
                  <option value="BZD">BZD</option>
                  <option value="CAD">CAD</option>
                  <option value="CDF">CDF</option>
                  <option value="CHF">CHF</option>
                  <option value="CLP">CLP</option>
                  <option value="CNY">CNY</option>
                  <option value="COP">COP</option>
                  <option value="CRC">CRC</option>
                  <option value="CVE">CVE</option>
                  <option value="CZK">CZK</option>
                  <option value="DJF">DJF</option>
                  <option value="DKK">DKK</option>
                  <option value="DOP">DOP</option>
                  <option value="DZD">DZD</option>
                  <option value="EGP">EGP</option>
                  <option value="ETB">ETB</option>
                  <option value="EUR">EUR</option>
                  <option value="FJD">FJD</option>
                  <option value="FKP">FKP</option>
                  <option value="GBP">GBP</option>
                  <option value="GEL">GEL</option>
                  <option value="GIP">GIP</option>
                  <option value="GMD">GMD</option>
                  <option value="GNF">GNF</option>
                  <option value="GTQ">GTQ</option>
                  <option value="GYD">GYD</option>
                  <option value="HKD">HKD</option>
                  <option value="HNL">HNL</option>
                  <option value="HRK">HRK</option>
                  <option value="HTG">HTG</option>
                  <option value="HUF">HUF</option>
                  <option value="IDR">IDR</option>
                  <option value="ILS">ILS</option>
                  <option value="INR">INR</option>
                  <option value="ISK">ISK</option>
                  <option value="JMD">JMD</option>
                  <option value="JPY">JPY</option>
                  <option value="KES">KES</option>
                  <option value="KGS">KGS</option>
                  <option value="KHR">KHR</option>
                  <option value="KMF">KMF</option>
                  <option value="KRW">KRW</option>
                  <option value="KYD">KYD</option>
                  <option value="KZT">KZT</option>
                  <option value="LAK">LAK</option>
                  <option value="LBP">LBP</option>
                  <option value="LKR">LKR</option>
                  <option value="LRD">LRD</option>
                  <option value="LSL">LSL</option>
                  <option value="MAD">MAD</option>
                  <option value="MDL">MDL</option>
                  <option value="MGA">MGA</option>
                  <option value="MKD">MKD</option>
                  <option value="MMK">MMK</option>
                  <option value="MNT">MNT</option>
                  <option value="MOP">MOP</option>
                  <option value="MRO">MRO</option>
                  <option value="MUR">MUR</option>
                  <option value="MVR">MVR</option>
                  <option value="MWK">MWK</option>
                  <option value="MXN">MXN</option>
                  <option value="MYR">MYR</option>
                  <option value="MZN">MZN</option>
                  <option value="NAD">NAD</option>
                  <option value="NGN">NGN</option>
                  <option value="NIO">NIO</option>
                  <option value="NOK">NOK</option>
                  <option value="NPR">NPR</option>
                  <option value="NZD">NZD</option>
                  <option value="PAB">PAB</option>
                  <option value="PEN">PEN</option>
                  <option value="PGK">PGK</option>
                  <option value="PHP">PHP</option>
                  <option value="PKR">PKR</option>
                  <option value="PLN">PLN</option>
                  <option value="PYG">PYG</option>
                  <option value="QAR">QAR</option>
                  <option value="RON">RON</option>
                  <option value="RSD">RSD</option>
                  <option value="RUB">RUB</option>
                  <option value="RWF">RWF</option>
                  <option value="SAR">SAR</option>
                  <option value="SBD">SBD</option>
                  <option value="SCR">SCR</option>
                  <option value="SEK">SEK</option>
                  <option value="SGD">SGD</option>
                  <option value="SHP">SHP</option>
                  <option value="SLL">SLL</option>
                  <option value="SOS">SOS</option>
                  <option value="SRD">SRD</option>
                  <option value="STD">STD</option>
                  <option value="SZL">SZL</option>
                  <option value="THB">THB</option>
                  <option value="TJS">TJS</option>
                  <option value="TOP">TOP</option>
                  <option value="TRY">TRY</option>
                  <option value="TTD">TTD</option>
                  <option value="TWD">TWD</option>
                  <option value="TZS">TZS</option>
                  <option value="UAH">UAH</option>
                  <option value="UGX">UGX</option>
                  <option value="UYU">UYU</option>
                  <option value="UZS">UZS</option>
                  <option value="VND">VND</option>
                  <option value="VUV">VUV</option>
                  <option value="WST">WST</option>
                  <option value="XAF">XAF</option>
                  <option value="XCD">XCD</option>
                  <option value="XOF">XOF</option>
                  <option value="XPF">XPF</option>
                  <option value="YER">YER</option>
                  <option value="ZAR">ZAR</option>
                  <option value="ZMW">ZMW</option>
                </select>

                <div class="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg class="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </div>
              </div>
              <!-- End Select -->
            </div>
            <!-- End Select Input -->

            <p class="text-[13px] text-gray-500 dark:text-neutral-500">
              By continuing, you accept the <a class="text-gray-500 underline-offset-4 underline hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Terms and Conditions</a> of your chosen country or region.
            </p>
          </div>
        </div>
        <!-- End Body -->

        <!-- Footer -->
        <div class="p-6 pt-2 md:pt-2 flex flex-col gap-2">
          <button type="button" class="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700" data-hs-overlay="#hs-pro-shmnrsm">
            Accept
          </button>

          <div class="text-center">
            <button type="button" class="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300" data-hs-overlay="#hs-pro-shmnrsm">
              Cancel
            </button>
          </div>
        </div>
        <!-- End Footer -->
      </div>
    </div>
  </div>
  <!-- End Regional Settings Modal -->

  <!-- Regional Settings Modal -->
  <div id="hs-pro-shmnlcm" class="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shmnlcm-label">
    <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div class="w-full max-h-full relative overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
        <!-- Header -->
        <div class="py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
          <h3 id="hs-pro-shmnlcm-label" class="font-medium text-gray-800 dark:text-neutral-200">
            Choose your location
          </h3>
          <button type="button" class="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-pro-shmnlcm">
            <span class="sr-only">Close</span>
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <!-- End Header -->

        <!-- Body -->
        <div id="hs-pro-shmnlcm-body" class="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div class="p-6 space-y-5">
            <p class="text-[13px] text-gray-800 dark:text-neutral-200">
              Delivery options and delivery speeds may vary for different locations
            </p>

            <!-- Checkbox Grid -->
            <div class="p-0.5 space-y-2">
              <!-- Checkbox -->
              <label for="hs-pro-shmarach1" class="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                <span class="flex gap-x-2.5">
                  <input type="radio" id="hs-pro-shmarach1" class="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins" checked>
                  <span class="grow -mt-0.5">
                    <span class="block font-semibold">
                      James Collins
                      <span class="ms-1 py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200">Default</span>
                    </span>
                    <span class="block text-sm/6 text-gray-500 dark:text-neutral-500">
                      2305 Coney Island Ave, Brooklyn NY 11223
                    </span>
                  </span>
                </span>
              </label>
              <!-- End Checkbox -->

              <!-- Checkbox -->
              <label for="hs-pro-shmarach2" class="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                <span class="flex gap-x-2.5">
                  <input type="radio" id="hs-pro-shmarach2" class="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins">
                  <span class="grow -mt-0.5">
                    <span class="block font-semibold">
                      James Collins
                    </span>
                    <span class="block text-sm/6 text-gray-500 dark:text-neutral-500">
                      Im Wiegenfeld 4 85570 Markt Schwaben, Markt Schwaben 85570
                    </span>
                  </span>
                </span>
              </label>
              <!-- End Checkbox -->

              <!-- Checkbox -->
              <label for="hs-pro-shmarach3" class="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                <span class="flex gap-x-2.5">
                  <input type="radio" id="hs-pro-shmarach3" class="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins">
                  <span class="grow -mt-0.5">
                    <span class="block font-semibold">
                      James Collins
                    </span>
                    <span class="block text-sm/6 text-gray-500 dark:text-neutral-500">
                      109 Rogers Rd Ste 3 WS003536, Wilmington DE 19801
                    </span>
                  </span>
                </span>
              </label>
              <!-- End Checkbox -->

              <div id="hs-shnlmsaa-heading" class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-shnlmsaa">
                <div class="p-0.5 space-y-2">
                  <!-- Checkbox -->
                  <label for="hs-pro-shmarach4" class="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                    <span class="flex gap-x-2.5">
                      <input type="radio" id="hs-pro-shmarach4" class="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins">
                      <span class="grow -mt-0.5">
                        <span class="block font-semibold">
                          James Collins
                        </span>
                        <span class="block text-sm/6 text-gray-500 dark:text-neutral-500">
                          645 W 1ST AVE C/O 3536-WS, ROSELLE NJ 07203
                        </span>
                      </span>
                    </span>
                  </label>
                  <!-- End Checkbox -->

                  <!-- Checkbox -->
                  <label for="hs-pro-shmarach5" class="p-3 block text-sm bg-white text-gray-800 rounded-xl cursor-pointer rounded-xl ring-1 ring-gray-200 hover:bg-gray-50 focus:bg-gray-50 has-checked:ring-2 has-checked:ring-emerald-600 dark:bg-neutral-800 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-700 dark:has-checked:ring-emerald-500">
                    <span class="flex gap-x-2.5">
                      <input type="radio" id="hs-pro-shmarach5" class="size-4 bg-transparent border-gray-200 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-800" name="hs-pro-shmaracho" value="James Collins">
                      <span class="grow -mt-0.5">
                        <span class="block font-semibold">
                          James Collins
                        </span>
                        <span class="block text-sm/6 text-gray-500 dark:text-neutral-500">
                          Arch 294 Jewell Street, London SE5 OBU
                        </span>
                      </span>
                    </span>
                  </label>
                  <!-- End Checkbox -->
                </div>
              </div>
            </div>
            <!-- End Checkbox Grid -->

            <div class="flex flex-wrap items-center gap-2">
              <button type="button" class="hs-collapse-toggle hs-collapse-open:hidden font-medium text-sm text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 focus:outline-hidden focus:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-600 dark:focus:text-emerald-600" id="hs-shnlmsaa" aria-expanded="false" aria-controls="hs-shnlmsaa-heading" data-hs-collapse="#hs-shnlmsaa-heading">
                See all
                <span class="ms-1 inline-block w-px h-3 bg-gray-300 dark:bg-neutral-600"></span>
              </button>
              <a class="font-medium text-sm text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 focus:outline-hidden focus:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-600 dark:focus:text-emerald-600" href="#">
                Manage address book
              </a>
            </div>
          </div>
        </div>
        <!-- End Body -->

        <!-- Footer -->
        <div class="p-6 pt-2 md:pt-2 flex flex-col gap-2">
          <button type="button" class="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700" data-hs-overlay="#hs-pro-shmnlcm">
            Done
          </button>

          <div class="text-center">
            <button type="button" class="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-1.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300" data-hs-overlay="#hs-pro-shmnlcm">
              Cancel
            </button>
          </div>
        </div>
        <!-- End Footer -->
      </div>
    </div>
  </div>
  <!-- End Regional Settings Modal -->

  <!-- Product Detail Modal -->
  <div id="hs-pro-shmchpdm" class="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-pro-shmchpdm-label">
    <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md lg:max-w-4xl sm:w-full m-3 sm:mx-auto h-[calc(100%-56px)] min-h-[calc(100%-56px)] flex items-center">
      <div class="relative w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-xl dark:bg-neutral-800">
        <!-- Close Button -->
        <div class="absolute top-2 end-2.5 z-10">
          <button type="button" class="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-pro-shmchpdm">
            <span class="sr-only">Close</span>
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Image Preview -->
          <div class="hidden lg:block relative">
            <img class="shrink-0 absolute inset-0 size-full object-cover object-center rounded-t-xl lg:rounded-tr-none lg:rounded-s-xl" src="https://images.unsplash.com/photo-1652540492984-c347f10fcbaf?q=80&w=980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
          </div>
          <!-- End Image Preview -->

          <!-- Content -->
          <div class="py-4 sm:py-6 md:py-8">
            <div class="flex flex-col justify-between gap-5 lg:gap-0">
              <div class="px-4 sm:px-6 lg:px-8">
                <div class="flex items-center gap-x-3">
                  <div class="lg:hidden shrink-0 size-20">
                    <img class="shrink-0 size-full object-cover object-center rounded-xl" src="https://images.unsplash.com/photo-1652540492984-c347f10fcbaf?q=80&w=180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                  </div>
                  <div class="grow">
                    <h4 id="hs-pro-shmchpdm-label" class="font-medium text-lg leading-tight text-gray-800 dark:text-neutral-200">
                      Google Pixel Tablet - 11-Inch Tablet, 8 GB RAM - 128 GB, Porcelain | Android Tablet, Extra-Long Battery Life
                    </h4>
                  </div>
                </div>

                <!-- Badge Group -->
                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <span class="py-0.5 px-1.5 text-xs uppercase bg-orange-600 text-white rounded-md dark:bg-orange-500">
                    #1 Best seller
                  </span>
                  <a class="flex items-center gap-x-1 text-sm text-gray-800 underline-offset-4 hover:underline focus:outline-hidden focus:underline dark:text-neutral-200" href="#">
                    in Tablets, Laptops &amp; Accessories
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                </div>
                <!-- End Badge Group -->

                <div class="mt-1">
                  <!-- Reviews -->
                  <a class="inline-block font-medium text-sm text-gray-800 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-emerald-500 dark:focus:text-emerald-500" href="#reviews">
                    <ul class="flex flex-wrap items-center gap-2">
                      <li class="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                        <!-- Rating -->
                        <div class="flex flex-wrap items-center">
                          <span class="me-1">
                            4.8
                          </span>

                          <!-- Stars -->
                          <div class="inline-flex items-center gap-x-0.5">
                            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"></path>
                            </svg>
                          </div>
                          <!-- End Stars -->
                        </div>
                        <!-- End Rating -->
                      </li>
                      <li class="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                        112 reviews
                      </li>
                    </ul>
                  </a>
                  <!-- End Reviews -->
                </div>
              </div>

              <div class="lg:my-4 pb-1 px-4 sm:px-6 lg:px-8 max-h-72 lg:h-64 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <!-- Model -->
                <div>
                  <span class="mb-2 block font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Model:
                  </span>

                  <!-- Grid -->
                  <div class="grid grid-cols-2 gap-2">
                    <!-- Checkbox -->
                    <label for="hs-pro-shmpdm-pro" class="group relative overflow-hidden flex items-center gap-2 p-1.5 text-xs bg-white text-gray-800 border border-gray-200 cursor-pointer rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200
                    has-checked:text-emerald-600 dark:has-checked:text-emerald-500
                    has-checked:border-emerald-600 dark:has-checked:border-emerald-500
                    has-checked:ring-1
                    has-checked:ring-emerald-600 dark:has-checked:ring-emerald-500
                    has-disabled:pointer-events-none
                    has-disabled:text-gray-200 dark:has-disabled:text-neutral-700
                    has-disabled:after:absolute
                    has-disabled:after:inset-0
                    has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-gray-200)_calc(50%-1px),var(--color-gray-200)_50%,transparent_50%)]
                    dark:has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-neutral-700)_calc(50%-1px),var(--color-neutral-700)_50%,transparent_50%)] ">
                      <input type="radio" id="hs-pro-shmpdm-pro" class="hidden bg-transparent border-gray-200 text-emerald-600 focus:ring-white focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-900" name="hs-pro-shmfdsr">
                      <img class="shrink-0 size-12 rounded-md" src="https://images.unsplash.com/photo-1660820936253-f636cfc17b8b?q=80&w=60&h=60&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                      <span class="grow truncate">
                        <span class="block font-semibold truncate">
                          Apple Pencil Pro
                        </span>
                        <span class="block">
                          $89
                        </span>
                      </span>
                    </label>
                    <!-- End Checkbox -->

                    <!-- Checkbox -->
                    <label for="hs-pro-shmpdm-usb" class="group relative overflow-hidden flex items-center gap-2 p-1.5 text-xs bg-white text-gray-800 border border-gray-200 cursor-pointer rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200
                    has-checked:text-emerald-600 dark:has-checked:text-emerald-500
                    has-checked:border-emerald-600 dark:has-checked:border-emerald-500
                    has-checked:ring-1
                    has-checked:ring-emerald-600 dark:has-checked:ring-emerald-500
                    has-disabled:pointer-events-none
                    has-disabled:text-gray-200 dark:has-disabled:text-neutral-700
                    has-disabled:after:absolute
                    has-disabled:after:inset-0
                    has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-gray-200)_calc(50%-1px),var(--color-gray-200)_50%,transparent_50%)]
                    dark:has-disabled:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-neutral-700)_calc(50%-1px),var(--color-neutral-700)_50%,transparent_50%)] ">
                      <input type="radio" id="hs-pro-shmpdm-usb" class="hidden bg-transparent border-gray-200 text-emerald-600 focus:ring-white focus:ring-offset-0 dark:text-emerald-500 dark:border-neutral-700 dark:focus:ring-neutral-900" name="hs-pro-shmfdsr">
                      <img class="shrink-0 size-12 rounded-md" src="https://images.unsplash.com/photo-1602144124318-f448134df981?q=80&w=60&h=60&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image">
                      <span class="grow truncate">
                        <span class="block font-semibold truncate">
                          Apple Pencil (USB-C)
                        </span>
                        <span class="block">
                          $79
                        </span>
                      </span>
                    </label>
                    <!-- End Checkbox -->
                  </div>
                  <!-- End Grid -->
                </div>
                <!-- End Model -->

                <!-- Price Group -->
                <div class="mt-5">
                  <span class="font-semibold text-xl text-gray-800 dark:text-neutral-200">
                    $89 <span class="text-xl">USD</span>
                  </span>
                  <span class="text-sm text-gray-500 dark:text-neutral-500">
                    <s>$109</s>
                  </span>
                </div>
                <!-- End Price Group -->

                <!-- Badge Group -->
                <div class="flex flex-wrap items-center gap-1">
                  <span class="py-0.5 px-1.5 text-[10px] border border-orange-500 text-orange-500 rounded-md">
                    -25% Limited time
                  </span>
                </div>
                <!-- End Badge Group -->

                <!-- Price Group -->
                <div class="mt-5 grid grid-cols-2 items-center gap-2">
                  <div>
                    <span class="block font-medium text-lg text-emerald-600 dark:text-emerald-500">
                      In stock
                    </span>

                    <span class="block text-xs text-gray-600 dark:text-neutral-400">
                      2k+ sold this week
                    </span>
                  </div>

                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-2.5">
                      <span class="text-xs text-gray-800 dark:text-neutral-200">Qty:</span>
                    </div>

                    <select class="py-2 ps-10 pe-8 w-full inline-block border-gray-200 rounded-full text-sm text-gray-800 cursor-pointer hover:bg-gray-50 focus:border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                      <option selected>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>
                </div>
                <!-- End Price Group -->
              </div>

              <div class="px-4 sm:px-6 lg:px-8 flex flex-col gap-2">
                <!-- Button Group -->
                <div class="flex gap-2">
                  <button type="button" class="py-3 px-4 w-full inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600">
                    Add to cart
                  </button>

                  <button type="button" class="flex shrink-0 justify-center items-center size-11 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                    <span class="sr-only">Favorite</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                </div>

                <button type="button" class="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950 dark:focus:bg-emerald-950">
                  Buy now
                </button>
                <!-- End Button Group -->
              </div>
            </div>
          </div>
          <!-- End Content -->
        </div>
        <!-- End Body -->
      </div>
    </div>
  </div>
  <!-- End Product Detail Modal -->
  <!-- ========== END SECONDARY CONTENT ========== -->

  <!-- JS PLUGINS -->
  <script src="./assets/vendor/nouislider/dist/nouislider.min.js"></script>
  <script src="./assets/vendor/@floating-ui/core/dist/floating-ui.core.umd.min.js"></script>
  <script src="./assets/vendor/@floating-ui/dom/dist/floating-ui.dom.umd.min.js"></script>
  <!-- Required plugins -->
  <script src="./assets/vendor/preline/dist/index.js?v=3.0.1"></script>
  <!-- Clipboard -->
  <script src="./assets/vendor/clipboard/dist/clipboard.min.js"></script>
  <script src="./assets/js/hs-copy-clipboard-helper.js"></script>

  <script>
    window.addEventListener('load', () => {
      (function () {
        const range = document.querySelector('#hs-pass-values-to-html-elements');
        const rangeInstance = new HSRangeSlider(range);
        const min = document.querySelector('#hs-pass-values-to-html-elements-min-target');
        const max = document.querySelector('#hs-pass-values-to-html-elements-max-target');

        range.noUiSlider.on('update', (values) => {
          min.innerText = rangeInstance.formattedValue[0];
          max.innerText = rangeInstance.formattedValue[1];
        });
      })();
    });

    window.addEventListener('load', () => {
      (function () {
        const range = document.querySelector('#hs-capacity-range-slider');
        const rangeInstance = new HSRangeSlider(range);
        const min = document.querySelector('#hs-capacity-range-slider-min-target');
        const max = document.querySelector('#hs-capacity-range-slider-max-target');

        range.noUiSlider.on('update', (values) => {
          min.innerText = rangeInstance.formattedValue[0];
          max.innerText = rangeInstance.formattedValue[1];
        });
      })();
    });
  </script>

</body>
</html>