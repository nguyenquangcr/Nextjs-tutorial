import React from 'react';
import { Layout, Space } from 'antd';
import BootstrapCarousel from '@/components/common/Carousel';
import ProductComponent from '@/components/common/Products';
import { useDispatch, useSelector } from 'react-redux';
import { getListMedicineUser, UpdateTotalMedicine } from 'slices/medicineSlice';
import './styles.scss';
import HeaderComponent from '@/components/common/Header';
import { RootState } from 'store';

export default function HomePage() {
  const dispatch = useDispatch();
  //ref
  const mainPageRef = React.useRef<HTMLDivElement>(null);
  //state store
  const arrMedicineUser = useSelector((state: RootState) => state.medicine.listMedicineUser);

  React.useEffect(() => {
    function handleScroll() {
      const mainPageElement = mainPageRef.current; // Lấy tham chiếu đến phần tử
      const scrollTop: any = mainPageElement?.scrollTop; // Vị trí cuộn hiện tại
      console.log('scrollTop:', scrollTop);
      const scrollHeight: any = mainPageElement?.scrollHeight; // Chiều cao của phần tử
      console.log('scrollHeight:', scrollHeight);
      const clientHeight: any = mainPageElement?.clientHeight; // Chiều cao của phần tử hiển thị
      console.log('clientHeight:', clientHeight);

      console.log('chay vao day');
      if (scrollTop + clientHeight >= scrollHeight) {
        dispatch(getListMedicineUser(arrMedicineUser.length + 15));
        // Xử lý khi cuộn tới cuối ở đây
      }
    }

    if (mainPageRef.current) {
      mainPageRef.current.addEventListener('scroll', handleScroll); // Gắn sự kiện scroll vào phần tử
    }

    return () => {
      if (mainPageRef.current) {
        mainPageRef.current.removeEventListener('scroll', handleScroll); // Hủy bỏ sự kiện khi component unmount
      }
    };
  }, [arrMedicineUser]);

  React.useEffect(() => {
    dispatch(UpdateTotalMedicine());
  }, []);

  // console.log('mainPageRef', mainPageRef.current);

  return (
    <div ref={mainPageRef} style={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <HeaderComponent />
          <BootstrapCarousel />
          <ProductComponent />
        </Layout>
      </Space>
    </div>
  );
}
