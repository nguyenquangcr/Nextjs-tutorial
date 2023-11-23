import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import FormatCurrency from 'utils/FormatCurrency';

const DetailPay = ({ totalPrice, setTotalPrice }: { totalPrice: any; setTotalPrice: any }) => {
  //store
  const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);

  useEffect(() => {
    let total = 0;
    arrProduct.length > 0 &&
      arrProduct.map((item) => {
        total += item.price * item?.count;
      });
    setTotalPrice(total);
  }, [arrProduct, setTotalPrice]);

  //form
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div style={{ margin: '10px' }}>
      <Form
        name="validate_other"
        {...formItemLayout}
        initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item {...tailLayout} label="Tổng tiền">
          <span className="ant-form-text">{FormatCurrency(totalPrice)}</span>
        </Form.Item>
        <Form.Item {...tailLayout} label="Giảm giá trực tiếp">
          <span className="ant-form-text">{FormatCurrency(0)}</span>
        </Form.Item>
        <Form.Item {...tailLayout} label="Giảm giá voucher ">
          <span className="ant-form-text">{FormatCurrency(0)}</span>
        </Form.Item>
        <hr />
        <Form.Item {...tailLayout} label="Thành tiền">
          <span className="ant-form-text">{FormatCurrency(totalPrice)}</span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DetailPay;
