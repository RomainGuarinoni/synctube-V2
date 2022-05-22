import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../style/global.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ThemeProvider } from '../context/ThemeContext';
import { AppLayout } from '../layout/App';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Synctube V2</title>
      </Head>
      <main className="app">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}
        >
          <ThemeProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </main>
    </>
  );
}

export default CustomApp;
