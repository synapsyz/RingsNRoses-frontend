// pages/_app.js
'use client';

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { GoogleOAuthProvider } from '@react-oauth/google'; // 1. Add this import
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
  
  // 2. Get your Google Client ID from your .env.local file
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    // 3. Wrap your existing SessionProvider with the GoogleOAuthProvider
    <GoogleOAuthProvider clientId={googleClientId}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}