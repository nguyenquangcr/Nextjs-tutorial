import React from 'react';
import { Layout, Space } from 'antd';
import BootstrapCarousel from '@/components/common/Carousel';
import ProductComponent from '@/components/common/Products';
import { useDispatch } from 'react-redux';
import { UpdateTotalMedicine } from 'slices/medicineSlice';
import './style.scss';
import HeaderComponent from '@/components/common/Header';

export default function HomePage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(UpdateTotalMedicine());
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <HeaderComponent />
        <BootstrapCarousel />
        <ProductComponent />
      </Layout>
    </Space>
  );
}
