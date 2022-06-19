import '../style/global.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
              <ToastContainer theme="dark" />
            </ThemeProvider>
          </AppLayout>
        </AuthProvider>
      </main>
    </>
  );
}

export default CustomApp;
