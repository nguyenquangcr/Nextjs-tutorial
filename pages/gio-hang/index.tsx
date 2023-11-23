/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import HeaderComponent from '@/components/common/Header';
import { gifOrderSuccess } from 'Constant';
import OrderProgressComponent from './Components/OrderProgressComponent';
//style
import './styles.scss';
import Link from 'next/link';

const classContainer: React.CSSProperties = {
  width: ' 100%',
  maxWidth: ' 1200px',
  marginRight: ' auto',
  marginLeft: ' auto',
};

export default function HomePage() {
  //state
  const [totalPrice, setTotalPrice] = useState(0);
  const [success, setSuccess] = useState(false);

  return (
    <div className="main-page-shoppingcart">
      <HeaderComponent />
      <div style={classContainer}>
        {success == false ? (
          <OrderProgressComponent
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            setSuccess={setSuccess}
          />
        ) : (
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <div>
              {' '}
              <img width={'50%'} src={gifOrderSuccess} alt="Gif order success" />
              <Typography.Title
                level={2}
                style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
              >
                {' '}
                Đơn hàng của bạn đã được đặt thành công
              </Typography.Title>
            </div>
            <Link href={'/'}>
              <Button style={{ width: 'max-content' }} className="class-plus-btn">
                Quay lại trang chủ
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
