import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="canonical" href="https://preline.co/" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/main.min.css?v=3.0.1" />
        <style>{`
          @keyframes typing {
            0% { opacity: 1; scale: 1; }
            50% { opacity: 0.75; scale: 0.75; }
            100% { opacity: 1; scale: 1; }
          }
        `}</style>
      </Head>
      <body className="dark:bg-neutral-900 bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
