// pages/_app.js
'use client';

import { useEffect, useState } from 'react'; // Import useState
import { SessionProvider } from 'next-auth/react';
import { createBrowserClient } from '@supabase/ssr'; // Import createBrowserClient
import { SessionContextProvider } from '@supabase/auth-helpers-react'; // Import SessionContextProvider
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Create a Supabase client in the component's state.
  // This ensures the client is created only once per component instance.
  const [supabaseClient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );

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
    // Wrap with Next-Auth's SessionProvider first if you're primarily using Next-Auth for session management
    <SessionProvider session={session}>
      {/* Then wrap with Supabase's SessionContextProvider */}
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession} // Pass initial session for SSR/SSG
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </SessionProvider>
  );
}