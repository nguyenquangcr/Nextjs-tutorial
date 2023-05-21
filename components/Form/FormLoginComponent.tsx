import React from 'react';
import { Layout, Space, Image, Typography, Badge, Form, Input, Checkbox, Button } from 'antd';
import { FileTextFilled, ShoppingFilled } from '@ant-design/icons';
import Link from 'next/link';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'slices/medicineSlice';
import { funcLogin } from 'slices/userSlice';

export interface FormLoginProps {}

const headerImage: React.CSSProperties = {
  width: '100vw',
  height: '30px',
};

export default function FormLoginComponent(props: FormLoginProps) {
  const dispatch = useDispatch();
  //store
  const loading = useSelector((state: RootState) => state.user.loading);
  //state

  const onFinish = ({ username, password }: any) => {
    dispatch(funcLogin({ username, password }));
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 500, padding: '30px', margin: '0 auto', background: '#ffff' }}
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

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Ghi nhớ tôi</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
