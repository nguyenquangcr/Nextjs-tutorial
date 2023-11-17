import React from 'react';
import { Button, Layout, Space } from 'antd';
import BootstrapCarousel from '@/components/common/Carousel';
import ProductComponent from '@/components/common/Products';
import { useDispatch, useSelector } from 'react-redux';
import { getListMedicineUser, UpdateTotalMedicine } from 'slices/medicineSlice';
import './styles.scss';
import HeaderComponent from '@/components/common/Header';
import { RootState } from 'store';
import { CaretUpOutlined } from '@ant-design/icons';
import CartPanelComponent from '@/components/CartPanelComponent';

export default function HomePage() {
  const dispatch = useDispatch();
  //ref
  const mainPageRef = React.useRef<HTMLDivElement>(null);
  //state store
  const arrShoping = useSelector((state: RootState) => state.medicine.arrShoping);
  const arrMedicineUser = useSelector((state: RootState) => state.medicine.listMedicineUser);
  //state
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const mainPageElement = mainPageRef.current; // Lấy tham chiếu đến phần tử
      const scrollTop: any = mainPageElement?.scrollTop; // Vị trí cuộn hiện tại
      const scrollHeight: any = mainPageElement?.scrollHeight; // Chiều cao của phần tử
      const clientHeight: any = mainPageElement?.clientHeight; // Chiều cao của phần tử hiển thị
      if (scrollTop + clientHeight >= scrollHeight - 150)
        dispatch(getListMedicineUser(arrMedicineUser.length + 15));
      if (display == true && scrollTop === 0) setDisplay(false);
      if (display == false && scrollTop >= 300) setDisplay(true);
    }

    if (mainPageRef.current) {
      mainPageRef.current.addEventListener('scroll', handleScroll); // Gắn sự kiện scroll vào phần tử
    }

    return () => {
      if (mainPageRef.current) {
        mainPageRef.current.removeEventListener('scroll', handleScroll); // Hủy bỏ sự kiện khi component unmount
      }
    };
  }, [arrMedicineUser, display]);

  const topHtml = React.useRef<HTMLDivElement>(null); // Biến tham chiếu cho phần tử có id="main-page"

  const scrollTop = () => {
    setDisplay(false);
    mainPageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    dispatch(UpdateTotalMedicine());
  }, []);

  return (
    <div ref={mainPageRef} style={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout style={{ backgroundColor: '#f0f6fd' }}>
          <HeaderComponent />
          <BootstrapCarousel />
          <ProductComponent />
          {display && (
            <Button
              className="btn-back-to-top"
              type="primary"
              shape="circle"
              icon={<CaretUpOutlined />}
              onClick={scrollTop}
            />
          )}
        </Layout>
      </Space>

      {arrShoping.length > 0 && <CartPanelComponent />}
    </div>
  );
}
