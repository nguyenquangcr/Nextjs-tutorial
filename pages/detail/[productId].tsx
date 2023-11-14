/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
//style
import './styles.scss';
import './productDetailStyle.scss';
import 'react-medium-image-zoom/dist/styles.css';
//if you don't want component render server side -> use dynamic and {ssr: false}
const Header = dynamic(() => import('@/components/common/Header/index'), { ssr: false });

export interface AboutProps {}

export default function AboutPage(props: AboutProps) {
  const router = useRouter();
  //state

  return (
    <div>
      <Header />
      <Breadcrumb
        items={[
          {
            title: <Link href={'/'}>Trang chủ</Link>,
          },
          {
            title: 'Giỏ hàng',
          },
        ]}
      />
      <div className="container">
        <div className="main-product">
          <Row gutter={[32, 8]}>
            <Col xs={24} sm={10}>
              <Zoom zoomMargin={10}>
                <img
                  // style={{ width: '-webkit-fill-available' }}
                  className="product-img"
                  src={'https://thuocgiaphuc.vn/Uploads/HinhDoiTac/11-2023/zzmmcopy.jpg'}
                />
              </Zoom>
            </Col>
            <Col xs={24} sm={14}>
              VASTEC 20MG H60V NSX: DHG Pharma Nhóm: TIM MẠCH - LỢI TIỂU- NỘI TIẾT Đăng nhập mua
              hàng
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  // Lấy danh sách các productId từ nguồn dữ liệu của bạn
  const res = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await res.json();
  const productIds = data.data.map((item: { id: any }) => item.id);

  // Trả về danh sách các đối tượng params để Next.js tạo trước các trang tương ứng
  const paths = productIds.map((productId: any) => ({
    params: { productId: productId },
  }));

  return { paths, fallback: true };
}
