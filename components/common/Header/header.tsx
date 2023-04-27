import React from 'react';
import { Layout, Space, Image, Typography, Badge, Modal, Form, Input, Popover } from 'antd';
import { ShoppingFilled, UserOutlined } from '@ant-design/icons';
import './index.css'
import Link from 'next/link';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { funcLoginUser, getUserInfoUser, updateAccessTokenUser, updateInforUser, updateOpenModalLoging } from 'slices/userSlice';
import { openNotificationWithIcon } from '@/components/notificationComponent';

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
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const arrShoping = useSelector((state: RootState) => state.medicine.arrShoping);
  const openModalLogin = useSelector((state: RootState) => state.user.openModalLogin);
  const loading = useSelector((state: RootState) => state.user.loading);
  const inforUser: any = useSelector((state: RootState) => state.user.inforUser);

  React.useEffect(() => {
    if (localStorage.getItem('accessTokenUser')) {
      dispatch(getUserInfoUser());
      dispatch(updateAccessTokenUser(localStorage.getItem('accessTokenUser')))
    }
  }, [])


  const onFinish = ({ username, password }: any) => {
    dispatch(funcLoginUser({ username, password }))
  };

  const handleLogOut = () => {
    localStorage.setItem('accessTokenUser', '');
    dispatch(updateAccessTokenUser(null));
    dispatch(updateInforUser(null));
  }

  return <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
    <div className={'classheader'}>
      <div style={classContainer} className={'classheaderchild'}>
        <Image
          preview={false}
          src={'https://res.cloudinary.com/dmttpbcgv/image/upload/v1680844992/Frame_16_adjzb8.svg'}
        />
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {inforUser == null ? <div style={{ display: 'flex', alignItems: 'flex-end' }} onClick={() => dispatch(updateOpenModalLoging(true))}>
            <UserOutlined style={{ fontSize: '30px', color: 'rgb(255 255 255 / 95%)' }} />
            <Typography.Title level={5} style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}>Đăng nhập</Typography.Title>
          </div> :
            <Popover placement="bottom" content={<span style={{ cursor: 'pointer' }} onClick={() => handleLogOut()}>Đăng xuất</span>} trigger="click">
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <UserOutlined style={{ fontSize: '30px', color: 'rgb(255 255 255 / 95%)' }} />
                <Typography.Title level={5} style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}>{inforUser?.name}</Typography.Title>
              </div>
            </Popover>}
          <Link href={arrShoping.length != 0 ? '/gio-hang' : '/'} onClick={() => {
            if (arrShoping.length == 0) openNotificationWithIcon(500, 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi đi đến trang thanh toán!');
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: '15px', cursor: 'pointer' }}>
              <Badge count={arrShoping ? arrShoping.length : ''}>
                <ShoppingFilled style={{ fontSize: '30px', color: 'rgb(255 255 255 / 95%)' }} />
              </Badge>
              <Typography.Title level={5} style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}>Giỏ hàng</Typography.Title>
            </div>
          </Link>
        </div>
      </div>
    </div>
    <Modal
      title="Đăng Nhập"
      open={openModalLogin}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => dispatch(updateOpenModalLoging(false))}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, padding: '50px', margin: '0 auto' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: 'Xin hãy nhập tên đăng nhập!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Xin hãy nhập mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  </div >;
}
