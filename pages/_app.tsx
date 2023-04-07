import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

//css
import '../styles/globals.css';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
