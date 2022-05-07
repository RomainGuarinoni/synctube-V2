import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../style/default.css';

import { ThemeProvider } from '../context/ThemeContext';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Synctube V2</title>
      </Head>
      <main className="app">
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
