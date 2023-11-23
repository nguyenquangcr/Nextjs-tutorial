import { Breadcrumb, Steps, Tabs, TabsProps } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import DetailPay from './DetailPay';
import InfoPay from './InfoPay';
import TableOrder from './TableOrder';

const OrderProgressComponent = ({
  totalPrice,
  setTotalPrice,
  setSuccess,
}: {
  totalPrice: any;
  setTotalPrice: any;
  setSuccess: any;
}) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Đơn hàng',
      children: <TableOrder />,
    },
    {
      key: '2',
      label: 'Tổng thanh toán',
      children: <DetailPay totalPrice={totalPrice} setTotalPrice={setTotalPrice} />,
    },
    {
      key: '3',
      label: 'Thông tin khách hàng',
      children: <InfoPay totalPrice={totalPrice} setSuccess={setSuccess} />,
    },
  ];

  return (
    <div>
      <Tabs
        tabBarStyle={{ marginLeft: '10px' }}
        defaultActiveKey="1"
        tabPosition="top"
        items={items}
      />
    </div>
  );
};

export default OrderProgressComponent;
