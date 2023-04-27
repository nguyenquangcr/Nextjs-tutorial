import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Script from 'next/script'

//css
import '../styles/globals.css';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'antd';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-M4PEFENN4B"></Script>
      <Script
        id='google-analytics'
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
