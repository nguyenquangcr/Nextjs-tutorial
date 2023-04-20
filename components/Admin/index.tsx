import React, { useState } from 'react';
import { Layout, Menu, theme, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import MedicineAdminComponent from './MedicineAdminComponent';
import OrderAdminComponent from './OrderAdminComponent';
import { getUserInfo, updateAccessToken, updateInforUser } from 'slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import './style.scss';

export interface PageAminProps {}

const styleSiderbar: React.CSSProperties = {
  minHeight: '100vh',
};

const { Header, Sider, Content } = Layout;

export default function PageAdminComponent(props: PageAminProps) {
  const dispatch = useDispatch();
  const inforUser: any = useSelector((state: RootState) => state.user.inforUser);
  //state
  const [collapsed, setCollapsed] = useState(false);
  const [keySelected, setKeySelected] = useState('1');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  React.useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <Layout style={{ height: '100%' }}>
      <Sider style={styleSiderbar} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          onClick={(value) => setKeySelected(value?.key)}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Thuốc',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Đơn hàng',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="custom-mobile" style={{ background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <span style={{ color: '#000', margin: '10px', fontSize: '20px' }}>
            Chào mừng , {inforUser?.name}
            <span
              style={{ color: 'blue', marginLeft: '10px', fontSize: '20px', cursor: 'pointer' }}
              onClick={() => {
                localStorage.setItem('accessToken', '');
                dispatch(updateAccessToken(null));
                dispatch(updateInforUser({}));
              }}
            >
              Đăng xuất
            </span>
          </span>
        </Header>
        <Content
          style={{
            margin: '10px',
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {keySelected == '1' ? <MedicineAdminComponent /> : <OrderAdminComponent />}
        </Content>
      </Layout>
    </Layout>
  );
}
