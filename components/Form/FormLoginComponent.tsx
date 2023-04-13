import React from 'react';
import { Layout, Space, Image, Typography, Badge, Form, Input, Checkbox, Button } from 'antd';
import { FileTextFilled, ShoppingFilled } from '@ant-design/icons';
import Link from 'next/link';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'slices/medicineSlice';

export interface FormLoginProps { }

const headerImage: React.CSSProperties = {
    width: '100vw',
    height: '30px'
};

export default function FormLoginComponent(props: FormLoginProps) {
    const dispatch = useDispatch();
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values: any) => {
        dispatch(updateUser(values))
    };

    return (<Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, padding: '50px', margin: '0 auto' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>)
}
