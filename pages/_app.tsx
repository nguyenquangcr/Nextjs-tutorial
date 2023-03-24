import type { AppProps } from 'next/app';
import { store } from '../store'
import { Provider } from 'react-redux'

//css
import '../styles/globals.css';
import 'antd/dist/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
