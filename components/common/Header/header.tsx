import React from 'react';
import { Image, Typography, Badge, Modal, Form, Input, Popover } from 'antd';
import { ShoppingFilled, UserOutlined } from '@ant-design/icons';
import './index.css';
import Link from 'next/link';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import {
  funcCreateUser,
  funcLoginUser,
  getUserInfoUser,
  updateAccessTokenUser,
  updateInforUser,
  updateOpenModalLoging,
} from 'slices/userSlice';
import { openNotificationWithIcon } from '@/components/notificationComponent';

export interface HeaderProps {}

const classContainer: React.CSSProperties = {
  width: ' 100%',
  maxWidth: ' 1200px',
  marginRight: ' auto',
  marginLeft: ' auto',
};

const headerImage: React.CSSProperties = {
  width: '100vw',
  height: '30px',
};

export default function HeaderComponent(props: HeaderProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  //selected
  const arrShoping = useSelector((state: RootState) => state.medicine.arrShoping);
  const openModalLogin = useSelector((state: RootState) => state.user.openModalLogin);
  const loading = useSelector((state: RootState) => state.user.loading);
  const inforUser: any = useSelector((state: RootState) => state.user.inforUser);
  //state
  const [typeForm, setTypeForm] = React.useState('');

  React.useEffect(() => {
    if (localStorage.getItem('accessTokenUser')) {
      dispatch(getUserInfoUser());
      dispatch(updateAccessTokenUser(localStorage.getItem('accessTokenUser')));
    }
  }, []);

  const onFinish = (value: { username: any; password: any; email: any; phoneNumber: any }) => {
    const { username, password, email, phoneNumber } = value;
    if (typeForm == 'ADD') {
      dispatch(funcCreateUser({ name: username, password, email, phoneNumber }, setTypeForm, form));
    } else dispatch(funcLoginUser({ username, password }));
  };

  const handleLogOut = () => {
    form.resetFields();
    setTypeForm('');
    localStorage.setItem('accessTokenUser', '');
    dispatch(updateAccessTokenUser(null));
    dispatch(updateInforUser(null));
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      <div className={'classheader'}>
        <div style={classContainer} className={'classheaderchild'}>
          <Image
            preview={false}
            src={
              'https://res.cloudinary.com/dmttpbcgv/image/upload/v1680844992/Frame_16_adjzb8.svg'
            }
          />
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            {inforUser == null ? (
              <div
                style={{ display: 'flex', alignItems: 'flex-end' }}
                onClick={() => dispatch(updateOpenModalLoging(true))}
              >
                <UserOutlined style={{ fontSize: '30px', color: 'rgb(255 255 255 / 95%)' }} />
                <Typography.Title
                  level={5}
                  style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}
                >
                  Đăng nhập
                </Typography.Title>
              </div>
            ) : (
              <Popover
                placement="bottom"
                content={
                  <span style={{ cursor: 'pointer' }} onClick={() => handleLogOut()}>
                    Đăng xuất
                  </span>
                }
                trigger="click"
              >
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <UserOutlined style={{ fontSize: '30px', color: 'rgb(255 255 255 / 95%)' }} />
                  <Typography.Title
                    level={5}
                    style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}
                  >
                    {inforUser?.name}
                  </Typography.Title>
                </div>
              </Popover>
            )}
            <Link
              href={arrShoping.length != 0 ? '/gio-hang' : '/'}
              onClick={() => {
                if (arrShoping.length == 0)
                  openNotificationWithIcon(
                    500,
                    'Vui lòng thêm sản phẩm vào giỏ hàng trước khi đi đến trang thanh toán!'
                  );
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginLeft: '15px',
                  cursor: 'pointer',
                }}
              >
                <Badge count={arrShoping ? arrShoping.length : ''}>
                  <ShoppingFilled style={{ fontSize: '30px', color: 'rgb(255 255 255 / 95%)' }} />
                </Badge>
                <Typography.Title
                  level={5}
                  style={{ color: '#fff', marginBottom: 0, marginLeft: '8px' }}
                >
                  Giỏ hàng
                </Typography.Title>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Modal
        title={typeForm == '' ? 'Đăng Nhập' : 'Đăng ký'}
        open={openModalLogin}
        onOk={() => form.submit()}
        confirmLoading={loading}
        onCancel={() => {
          form.resetFields();
          dispatch(updateOpenModalLoging(false));
        }}
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
          {typeForm == 'ADD' && (
            <>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phonenumber',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}
        </Form>

        {typeForm == '' ? (
          <span>
            Bạn chưa có tài khoản?{' '}
            <a href="#" onClick={() => setTypeForm('ADD')}>
              Đăng ký
            </a>
          </span>
        ) : (
          <a href="#" onClick={() => setTypeForm('')}>
            Quay lại
          </a>
        )}
      </Modal>
    </div>
  );
}
