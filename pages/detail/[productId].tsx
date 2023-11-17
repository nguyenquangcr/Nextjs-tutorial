/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import dynamic from 'next/dynamic';
import { Breadcrumb, Col, Row, Typography } from 'antd';
import { domain, imageDefault } from 'Constant';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
import FormatCurrency from 'utils/FormatCurrency';
import { HomeOutlined } from '@ant-design/icons';
//style
import './styles.scss';
import './productDetailStyle.scss';
import 'react-medium-image-zoom/dist/styles.css';
//if you don't want component render server side -> use dynamic and {ssr: false}
const Header = dynamic(() => import('@/components/common/Header/index'), { ssr: false });

export interface AboutProps {
  medicine: any
}

export default function AboutPage(props: AboutProps) {
  const { medicine } = props;

  //state

  return (
    <div>
      <Header />
      <div className="container">
        <Breadcrumb
          style={{
            margin: '20px 0',
            fontSize: '18px',
            fontWeight: '500'
          }}
          items={[
            {
              title: <Link href={'/'} style={{ marginTop: '-3px' }}>
                <HomeOutlined style={{ border: 'solid 1px', padding: '8px', borderRadius: '30px', marginRight: '10px' }} />
                <span>Trang chủ</span></Link>,
            },
            {
              title: <span >{medicine?.name}</span>,
            },
          ]}
        />
        <div className="main-product">
          <Row gutter={[32, 8]}>
            <Col xs={24} sm={10}>
              <Zoom zoomMargin={10}>
                <img
                  style={{ width: '-webkit-fill-available' }}
                  className="product-img"
                  src={medicine?.image !== '' ? medicine?.image : imageDefault}
                />
              </Zoom>
            </Col>
            <Col xs={24} sm={14}>
              <Typography style={{ fontSize: '20px', color: '#212529', fontWeight: 'bold', marginBottom: '15px' }}>{medicine?.name}</Typography>
              <Typography style={{ fontSize: '15px', color: '#212529', marginBottom: '5px' }}>Đơn vị: {medicine?.unit}</Typography>
              <Typography style={{ fontSize: '15px', color: '#212529', marginBottom: '15px' }}>Giá: {FormatCurrency(medicine?.price)}</Typography>
            </Col>
          </Row>
        </div>
        <div className="detail-product">
          <Row gutter={[32, 8]}>
            <Col span={24}>
              <Typography style={{ fontSize: '2rem', color: 'inherit', fontWeight: '400', marginBottom: '15px' }}>Chi tiết sản phẩm</Typography>
            </Col>
            <Col span={24}>
              <Typography style={{ fontSize: '15px', color: '#212529', marginBottom: '5px' }}>{medicine?.description}</Typography>
            </Col>
          </Row>

        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }: { params: { productId: string } }) {
  const res = await fetch(`${domain}/medicine/${params.productId}`);
  const data = await res?.json();
  return {
    props: {
      medicine: data
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  // Lấy danh sách các productId từ nguồn dữ liệu của bạn
  const res = await fetch(`${domain}/medicine/getListToParams?take=15`);
  const data = await res?.json();
  const productIds = data?.map((item: any) => String(item?.id));

  // Trả về danh sách các đối tượng params để Next.js tạo trước các trang tương ứng
  const paths = productIds.map((productId: any) => ({
    params: { productId },
  }));

  return { paths, fallback: false };
}
