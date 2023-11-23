import { Button, Cascader, CascaderProps, Form, Input, Select } from 'antd';
import { provinceCityService } from 'api/apiCity';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateOrder } from 'slices/medicineSlice';
import { RootState } from 'store';

const labelFormInfoCustomer: React.CSSProperties = {
  width: '95%',
  background: ' #fff',
  borderRadius: ' 0.8rem',
  margin: ' 10px auto',
};

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const InfoPay = ({ totalPrice, setSuccess }: { totalPrice: any; setSuccess: any }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const province = Form.useWatch('province', form);
  const district = Form.useWatch('district', form);
  //state
  const [loading, setloading] = useState(false);
  const [optionsProvince, setOptions] = useState<any>([]);
  const [optionsDistrict, setOptionsDistrict] = useState<any>([]);
  const [optionsWard, setOptionsWard] = useState<any>([]);
  //store
  const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);

  React.useEffect(() => {
    provinceCityService.getListProvinceCity().then(({ data }) => {
      setOptions(data);
    });
  }, []);

  React.useEffect(() => {
    if (province) {
      form.setFieldValue('district', null);
      form.setFieldValue('ward', null);
      provinceCityService.getListDistrict(province).then(({ data }) => {
        setOptionsDistrict(data?.districts);
      });
    }
  }, [province]);

  React.useEffect(() => {
    if (district) {
      form.setFieldValue('ward', null);
      provinceCityService.getListWard(district).then(({ data }) => {
        setOptionsWard(data?.wards);
      });
    }
  }, [district]);

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values: any) => {
    let province = optionsProvince.find((item: any) => item.code == values?.province)?.name;
    let district = optionsDistrict.find((item: any) => item.code == values?.district)?.name;
    let ward = optionsWard.find((item: any) => item.code == values?.ward)?.name;

    setloading(true);
    const formatValue = {
      ...values,
      address: `${province ? `${province}, ` : ''}${district ? `${district}, ` : ''}${
        ward ? `${ward}, ` : ''
      }${values?.address}`,
      order: arrProduct.map((item) => {
        return { medicine: item?.name, count: item?.count };
      }),
      price: totalPrice,
    };
    if (formatValue?.price) {
      dispatch(CreateOrder(formatValue, setloading, setSuccess));
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        size="middle"
        disabled={loading == true ? true : false}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={labelFormInfoCustomer}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={'name'}
          label="Tên cá nhân hoặc nhà thuốc *"
          rules={[{ required: true, message: 'Xin hãy nhập họ và tên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'email'} label="Email">
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại *"
          rules={[{ required: true, message: 'Xin hãy nhập số điện thoại!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="province" label="Tỉnh thành phố">
          <Select placeholder="Chọn tỉnh thành phố">
            <Select.Option value={79} key={79}>
              Thành phố Hồ Chí Minh
            </Select.Option>
            {optionsProvince?.map((item: any) => (
              <Select.Option value={item?.code} key={item?.code}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="district" label="Quận huyện">
          <Select placeholder="Chọn quận huyện">
            {optionsDistrict.length > 0 &&
              optionsDistrict?.map((item: any) => (
                <Select.Option value={item?.code} key={item?.code}>
                  {item?.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="ward" label="Phường xã">
          <Select placeholder="Chọn phường xã">
            {optionsWard.length > 0 &&
              optionsWard?.map((item: any) => (
                <Select.Option value={item?.code} key={item?.code}>
                  {item?.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={'address'}
          label="Tên đường, tòa nhà, số nhà,... *"
          rules={[{ required: true, message: 'Xin hãy nhập địa chỉ!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <Input placeholder="Thêm ghi chú (ví dụ: Hãy gọi trước khi giao)" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
          // help={arrProduct.length == 0 && 'Vui lòng thêm sản phẩm vào giỏ hàng'}
          validateStatus={'error'}
        >
          <Button
            disabled={arrProduct.length == 0}
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            Hoàn tất
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InfoPay;
