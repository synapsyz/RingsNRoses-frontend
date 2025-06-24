// pages/_app.js
'use client';

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('preline').then((module) => {
        if (module?.HSInit) {
          module.HSInit(); // Safe Preline init
        }
      });
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
