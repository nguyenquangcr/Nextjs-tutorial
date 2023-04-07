import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import MedicineAdminComponent from './MedicineAdminComponent';

export interface PageAminProps {}

const headerImage: React.CSSProperties = {
  width: '100vw',
  height: '30px',
};

const { Header, Sider, Content } = Layout;

export default function PageAdminComponent(props: PageAminProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [keySelected, setKeySelected] = useState('1');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
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
              label: 'Medicine',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Order',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 5, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {keySelected == '1' ? <MedicineAdminComponent /> : 'Oerder'}
        </Content>
      </Layout>
    </Layout>
  );
}
