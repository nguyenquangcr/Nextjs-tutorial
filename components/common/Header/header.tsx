import React from 'react';
import { Layout, Space, Image, Typography, Badge } from 'antd';
import { FileTextFilled, ShoppingFilled } from '@ant-design/icons';
import './index.css'
import Link from 'next/link';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const { Header } = Layout;
export interface HeaderProps { }

const classContainer: React.CSSProperties = {
  width: ' 100%',
  maxWidth: ' 1200px',
  marginRight: ' auto',
  marginLeft: ' auto',
};

const headerImage: React.CSSProperties = {
  width: '100vw',
  height: '30px'
};

export default function HeaderComponent(props: HeaderProps) {
  const arrShoping = useSelector((state: RootState) => state.medicine.arrShoping);

  return <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
    <Image
      style={headerImage}
      preview={false}
      src={'https://nhathuoclongchau.com.vn/frontend_v3/images/covid/notification-bar.png'}
    />
    <div className={'classheader'}>
      <div style={classContainer} className={'classheaderchild'}>
        <Image
          preview={false}
          src={'https://res.cloudinary.com/dmttpbcgv/image/upload/v1680844992/Frame_16_adjzb8.svg'}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <FileTextFilled style={{ fontSize: '40px', color: 'rgb(255 255 255 / 95%)' }} />
            <Typography.Title level={5} style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}>Tra cứu </Typography.Title>
            {/* <Typography.Text>Lịch sử đơn hàng</Typography.Text> */}
          </div>
          <Link href={'/gio-hang'}>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: '15px', cursor: 'pointer' }}>
              <Badge count={arrShoping ? arrShoping.length : ''}>
                <ShoppingFilled style={{ fontSize: '40px', color: 'rgb(255 255 255 / 95%)' }} />
              </Badge>
              <Typography.Title level={5} style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}>Giỏ hàng</Typography.Title>
            </div>
          </Link>
        </div>
      </div>
    </div>

  </div >;
}
