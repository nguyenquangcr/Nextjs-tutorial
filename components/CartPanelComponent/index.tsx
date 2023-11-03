import { Badge, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ShoppingFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import FormatCurrency from 'utils/FormatCurrency';
import Link from 'next/link';

const CartPanelComponent = () => {
  const arrShoping = useSelector((state: RootState) => state.medicine.arrShoping);
  //state
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    arrShoping.length > 0 &&
      arrShoping.map((item) => {
        total += item.price * item?.count;
      });
    setTotalPrice(total);
  }, [arrShoping]);

  return (
    <div className="CartFloatPanel">
      <div className="infor-CartFloatPanel">
        <Badge style={{ marginTop: '3px' }} count={arrShoping ? arrShoping.length : ''}>
          <ShoppingFilled style={{ fontSize: '30px', color: 'rgb(255 255 255 / 95%)' }} />
        </Badge>
        <Typography.Title level={5} style={{ color: '#fff', margin: '0 15px', marginTop: '5px' }}>
          {FormatCurrency(totalPrice)}
        </Typography.Title>
      </div>
      <Link href={'/gio-hang'}>
        <Typography.Title
          level={5}
          style={{ color: '#fff', marginBottom: 0, marginRight: '13px', cursor: 'pointer' }}
        >
          Xem giỏ hàng
        </Typography.Title>
      </Link>
    </div>
  );
};

export default CartPanelComponent;
