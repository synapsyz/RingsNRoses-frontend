// pages/_app.js or pages/_app.tsx

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    import('preline').then(() => {
      if (typeof window !== 'undefined') {
        window.HSCarousel?.autoInit();
      }
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}