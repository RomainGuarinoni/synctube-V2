import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../style/global.css';

import { ThemeProvider } from '../context/ThemeContext';
import { AppLayout } from '../layout/App';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Synctube V2</title>
      </Head>
      <main className="app">
        <ThemeProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
