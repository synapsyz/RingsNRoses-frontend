// pages/_app.js
'use client';

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import FloatingAIChatButton from '@/components/FloatingAIChatButton'; // 1. Import the button component

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
  
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <FloatingAIChatButton /> {/* 2. Render the button here */}
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}