import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Script from 'next/script';

//css
import '../styles/globals.css';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'antd';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/medicines.png" />
        <meta name="description" content="Trang web của chúng tôi là một giao diện đặt hàng thuốc sĩ nhanh chóng và tiện lợi. Chúng tôi cung cấp một nền tảng đáng tin cậy và dễ sử dụng cho những người đang tìm kiếm cách đặt hàng thuốc sĩ một cách thuận tiện và hiệu quả.

Với trang web của chúng tôi, bạn có thể dễ dàng tìm kiếm và đặt hàng các sản phẩm thuốc sĩ từ các nhà cung cấp uy tín. Chúng tôi cung cấp một cơ sở dữ liệu rộng lớn với hàng ngàn sản phẩm thuốc sĩ khác nhau, đảm bảo rằng bạn có thể tìm thấy những sản phẩm mà bạn cần một cách nhanh chóng.

Giao diện đơn giản và trực quan của chúng tôi giúp bạn dễ dàng tìm kiếm và lựa chọn sản phẩm theo nhu cầu của mình. Chúng tôi cũng cung cấp thông tin chi tiết về mỗi sản phẩm, bao gồm hình ảnh, mô tả và thông tin về giá cả, để bạn có thể đưa ra quyết định mua hàng thông minh.

Đặc biệt, trang web của chúng tôi tập trung vào việc cung cấp dịch vụ nhanh chóng. Chúng tôi cam kết đáp ứng đơn đặt hàng một cách nhanh nhất có thể và giao hàng đến địa chỉ của bạn trong thời gian ngắn. Điều này giúp bạn tiết kiệm thời gian và nỗ lực khi đặt hàng thuốc sĩ.

Hãy truy cập trang web của chúng tôi và trải nghiệm sự thuận tiện và tiện lợi khi đặt hàng thuốc sĩ. Chúng tôi hy vọng rằng trang web của chúng tôi sẽ giúp bạn tiết kiệm thời gian và mang lại sự hài lòng trong quá trình mua sắm sản phẩm thuốc sĩ của mình." />
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
