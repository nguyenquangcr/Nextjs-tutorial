import React from 'react';
import { Layout, Space, Image, Typography } from 'antd';
import { FileTextFilled, ShoppingFilled } from '@ant-design/icons';
import './index.css'

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
  return <div>
    <Image
      style={headerImage}
      preview={false}
      src={'https://nhathuoclongchau.com.vn/frontend_v3/images/covid/notification-bar.png'}
    />
    <div className={'classheader'}>
      <div style={classContainer} className={'classheaderchild'}>
        <Image
          preview={false}
          src={'https://nhathuoclongchau.com.vn/frontend_v3/images/longchau-logo.svg'}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <FileTextFilled style={{ fontSize: '40px', color: 'rgb(255 255 255 / 95%)' }} />
            <Typography.Title level={5} style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}>Tra cứu </Typography.Title>
            {/* <Typography.Text>Lịch sử đơn hàng</Typography.Text> */}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: '15px' }}>
            <ShoppingFilled style={{ fontSize: '40px', color: 'rgb(255 255 255 / 95%)' }} />
            <Typography.Title level={5} style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}>Giỏ hàng</Typography.Title>
          </div>
        </div>
      </div>
    </div>

  </div >;
}
