import Head from 'next/head';

const CustomHead = () => {
  return (
    <Head>
      {/* Required Meta Tags Always Come First */}
      <meta charSet="utf-8" />
      <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href="https://preline.co/" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="Powerful e-commerce admin pages with product & order lists, referrals and more." />

      {/* Twitter Meta Tags */}
      <meta name="twitter:site" content="@preline" />
      <meta name="twitter:creator" content="@preline" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vendor Dashboard" />
      <meta name="twitter:description" content="Powerful e-commerce admin pages with product & order lists, referrals and more." />
      <meta name="twitter:image" content="https://preline.co/assets/img/og-image.png" />

      {/* Open Graph Meta Tags */}
      <meta property="og:url" content="https://preline.co/" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Preline" />
      <meta property="og:title" content="Vendor Dashboard" />
      <meta property="og:description" content="Powerful e-commerce admin pages with product & order lists, referrals and more." />
      <meta property="og:image" content="https://preline.co/assets/img/og-image.png" />

      {/* Title */}
      <title>Vendor Dashboard</title>

      {/* Favicon */}
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* CSS HS */}
      <link rel="stylesheet" href="/assets/css/main.min.css?v=3.1.0" />

      {/* ApexCharts CSS */}
      <link rel="stylesheet" href="/assets/vendor/apexcharts/dist/apexcharts.css" />

      {/* Inline Styles for ApexCharts Tooltip */}
      <style>
        {`
          .apexcharts-tooltip.apexcharts-theme-light {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
        `}
      </style>

      {/* --- SCRIPT WITH IIFE FIX --- */}
      {/* Theme Check and Update Script */}
      <script
        key="theme-script" // Adding a key can also help React manage the script tag
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const rootHtml = document.querySelector('html');
              const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
              const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

              if (isLightOrAuto && rootHtml.classList.contains('dark')) rootHtml.classList.remove('dark');
              else if (isDarkOrAuto && rootHtml.classList.contains('light')) rootHtml.classList.remove('light');
              else if (isDarkOrAuto && !rootHtml.classList.contains('dark')) rootHtml.classList.add('dark');
              else if (isLightOrAuto && !rootHtml.classList.contains('light')) rootHtml.classList.add('light');
            })();
          `,
        }}
      />
    </Head>
  );
};

export default CustomHead;