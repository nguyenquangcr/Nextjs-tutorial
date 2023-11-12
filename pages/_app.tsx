import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Script from 'next/script';

//css
import '../styles/globals.css';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { descriptionWebsite, titleWebsite } from 'Constant';

function MyApp({ Component, pageProps }: AppProps) {
  let keywords =
    'thuốc tây, thuốc tây sĩ, đặt hàng thuốc tây, đặt hàng sĩ thuốc tây, thuốc tây giá rẻ, thuốc giá rẻ';

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=1"
        />
        <title>{titleWebsite}</title>
        <meta name="description" content={descriptionWebsite} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/medicines.png" />
      </Head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-M4PEFENN4B"></Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-M4PEFENN4B');`,
        }}
      />
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </>
  );
}

export default MyApp;
