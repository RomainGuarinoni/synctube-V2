import '../style/global.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

import { AppLayout } from '../layout/App';
import { RoomProvider } from '../context/RoomContext';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Synctube V2</title>
      </Head>
      <main className="app">
        <AuthProvider>
          <RoomProvider>
            <ThemeProvider>
              <AppLayout>
                <Component {...pageProps} />
                <ToastContainer theme="dark" />
              </AppLayout>
            </ThemeProvider>
          </RoomProvider>
        </AuthProvider>
      </main>
    </>
  );
}

export default CustomApp;
