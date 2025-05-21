// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Canonical URL */}
                    <link rel="canonical" href="https://preline.co/" />

                    {/* Favicon */}
                    <link rel="shortcut icon" href="../favicon.ico" />

                    {/* Google Fonts */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                        rel="stylesheet"
                    />

                    {/* External CSS */}
                    {/* href="/assets/css/main.min.css?v=3.0.1" */}
                    <link rel="stylesheet" href='/assets/css/main.min.css?v=3.0.1' />

                    {/* Inline Keyframes */}
                    <style>{`
            @keyframes typing {
              0% { opacity: 1; scale: 1; }
              50% { opacity: 0.75; scale: 0.75; }
              100% { opacity: 1; scale: 1; }
            }
          `}</style>
                </Head>

                <body className="dark:bg-neutral-900" />
                <header className="flex flex-col lg:flex-nowrap z-50 bg-white dark:bg-neutral-900"></header>
                <Main />
                <NextScript />

                {/* Theme Toggle Script (injected inline) */}
                <script
                    id="theme-toggle"
                    dangerouslySetInnerHTML={{
                        __html: `
                const html = document.querySelector('html');
                const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' ||
                  (localStorage.getItem('hs_theme') === 'auto' &&
                  !window.matchMedia('(prefers-color-scheme: dark)').matches);
                const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' ||
                  (localStorage.getItem('hs_theme') === 'auto' &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
                else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
                else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
                else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
              `,
                    }}
                />
                <script src="./assets/vendor/@floating-ui/core/dist/floating-ui.core.umd.min.js"></script>
                <script src="./assets/vendor/@floating-ui/dom/dist/floating-ui.dom.umd.min.js"></script>
                {/* <!-- Required plugins --> */}
                <script src="./assets/vendor/preline/dist/index.js?v=3.0.1"></script>
                {/* <!-- Clipboard --> */}
                <script src="./assets/vendor/clipboard/dist/clipboard.min.js"></script>
                <script src="./assets/js/hs-copy-clipboard-helper.js"></script>
            </Html>
        );
    }
}

export default MyDocument;
