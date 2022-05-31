import '../style/global.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

import { AppLayout } from '../layout/App';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Synctube V2</title>
      </Head>
      <main className="app">
        <AuthProvider>
          <AppLayout>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </AppLayout>
        </AuthProvider>
      </main>
    </>
  );
}

export default CustomApp;
