import React, { useState } from 'react';
import { Layout, Menu, theme, Spin } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import MedicineAdminComponent from './MedicineAdminComponent';
import OrderAdminComponent from './OrderAdminComponent';
import { getUserInfo, updateAccessToken, updateInforUser } from 'slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import Link from 'next/link';
import './style.scss';
import UserAdminComponent from './UserAdminComponent';

export interface PageAminProps { }

const styleSiderbar: React.CSSProperties = {
  minHeight: '100vh',
};

const { Header, Sider, Content } = Layout;

const sideBarAdmin = [
  {
    key: '1',
    icon: <MedicineBoxOutlined />,
    label: 'Thuốc',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Đơn hàng',
  },
];

const sideBarSuperAdmin = [
  {
    key: '1',
    icon: <MedicineBoxOutlined />,
    label: 'Thuốc',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Đơn hàng',
  },
  {
    key: '3',
    icon: <UserOutlined />,
    label: 'Người dùng',
  },
];

export default function PageAdminComponent(props: PageAminProps) {
  const dispatch = useDispatch();
  const inforUser: any = useSelector((state: RootState) => state.user.inforUser);
  //state
  const [collapsed, setCollapsed] = useState(false);
  const [keySelected, setKeySelected] = useState('1');
  const [itemSidebar, setItemSidebar] = useState<any>();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  React.useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  React.useEffect(() => {
    if (inforUser?.role == "superadmin") setItemSidebar(sideBarSuperAdmin)
    else setItemSidebar(sideBarAdmin)
  }, [inforUser]);

  const renderTabKeyselect = () => {
    switch (keySelected) {
      case '1':
        return <MedicineAdminComponent />
      case '2':
        return <OrderAdminComponent />
      case '3':
        return <UserAdminComponent />
    }
  }

  const renderRootContent = () => {
    if (inforUser == null) return <div style={{ position: 'absolute', top: '48%', left: '48%' }}>
      <Spin size='large' tip="Loading" />
    </div>
    else {
      if (inforUser?.role == "admin" || inforUser?.role == "superadmin") return <Layout style={{ height: '100%' }}>
        <Sider style={styleSiderbar} trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            onClick={(value) => setKeySelected(value?.key)}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={itemSidebar}
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
                  dispatch(updateInforUser(null));
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
            {renderTabKeyselect()}
          </Content>
        </Layout>
      </Layout>
      else return <div className="w3-display-middle">
        <h1 className="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
        <hr className="w3-border-white w3-animate-left" style={{ margin: 'auto', width: '50%' }} />
        <h3 className="w3-center w3-animate-right">You dont have permission to view this site.</h3>
        <h3 className="w3-center w3-animate-zoom" >🚫🚫🚫🚫</h3 >
        <h6 className="w3-center w3-animate-zoom" > error code: 403 forbidden</h6>
        <span style={{ color: '#000', margin: '10px', fontSize: '20px' }}>
          <Link href={'/'}>
            <span
              style={{ color: 'blue', marginLeft: '10px', fontSize: '20px', cursor: 'pointer' }}
            >
              Quay lại trang chủ
            </span>
          </Link>
        </span>
      </div>
    }
  }

  return (
    <>
      {renderRootContent()}
      {/* {inforUser != null ? <Layout style={{ height: '100%' }}>
        {inforUser?.role == "admin" ? <>
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
                    dispatch(updateInforUser(null));
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
        </> : <>
          <div className="w3-display-middle">
            <h1 className="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
            <hr className="w3-border-white w3-animate-left" style={{ margin: 'auto', width: '50%' }} />
            <h3 className="w3-center w3-animate-right">You dont have permission to view this site.</h3>
            <h3 className="w3-center w3-animate-zoom" >🚫🚫🚫🚫</h3 >
            <h6 className="w3-center w3-animate-zoom" > error code: 403 forbidden</h6>
            <span style={{ color: '#000', margin: '10px', fontSize: '20px' }}>
              <Link href={'/'}>
                <span
                  style={{ color: 'blue', marginLeft: '10px', fontSize: '20px', cursor: 'pointer' }}
                >
                  Quay lại trang chủ
                </span>
              </Link>
            </span>
          </div>
        </>}
      </Layout > : <div style={{ position: 'absolute', top: '48%', left: '48%' }}>
        <Spin size='large' tip="Loading" />
      </div>} */}
    </>
  );
}
