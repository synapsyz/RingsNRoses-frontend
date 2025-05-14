import { useEffect } from 'react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('@preline/overlay');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
