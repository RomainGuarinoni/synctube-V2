import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../style/global.css';

import { ThemeProvider } from '../context/ThemeContext';
import { AppLayout } from '../layout/App';
import { RouteGuard } from '../routes/RouteGuard';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Synctube V2</title>
      </Head>
      <main className="app">
        <AppLayout>
          <RouteGuard>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </RouteGuard>
        </AppLayout>
      </main>
    </>
  );
}

export default CustomApp;
