/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Image, Typography, Badge, Modal, Form, Input, Popover, Select, Spin, Button } from 'antd';
import {
  ShoppingFilled,
  UserOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
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
import { bgImageHeader, domain, imageDefault, logo } from 'Constant';
import { addProductToShopingCart, updateArrShoping } from 'slices/medicineSlice';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FormatCurrency from 'utils/FormatCurrency';
import classNames from 'classnames';
//style
import './style.scss';

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

const { Option } = Select;

export default function HeaderComponent(props: HeaderProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  //selected
  const arrShoping = useSelector((state: RootState) => state.medicine.arrShoping);
  const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);
  const openModalLogin = useSelector((state: RootState) => state.user.openModalLogin);
  const loading = useSelector((state: RootState) => state.user.loading);
  const inforUser: any = useSelector((state: RootState) => state.user.inforUser);
  //state
  const [typeForm, setTypeForm] = React.useState('');
  const [valueSearch, setValueSearch] = React.useState({
    data: [],
    value: '',
    fetching: false,
  });

  const [isGioHang, setIsGioHang] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('accessTokenUser')) {
      dispatch(getUserInfoUser());
      dispatch(updateAccessTokenUser(localStorage.getItem('accessTokenUser')));
    }
  }, []);

  React.useEffect(() => {
    setIsGioHang(router.pathname === '/gio-hang');
  }, [router.pathname]);

  const onFinish = (value: {
    username: any;
    password: any;
    email: any;
    phoneNumber: any;
    prefix: string;
  }) => {
    const { username, password, email, phoneNumber, prefix } = value;
    if (typeForm == 'ADD') {
      dispatch(
        funcCreateUser(
          { name: username, password, email, phoneNumber: `${prefix}${phoneNumber}` },
          setTypeForm,
          form
        )
      );
    } else dispatch(funcLoginUser({ username, password }));
  };

  const handleLogOut = () => {
    form.resetFields();
    setTypeForm('');
    localStorage.setItem('accessTokenUser', '');
    dispatch(updateAccessTokenUser(null));
    dispatch(updateInforUser(null));
  };

  const fetchUser = (value: any) => {
    setValueSearch({ ...valueSearch, data: [], fetching: true });
    fetch(`${domain}/medicine/search?search=${value}`)
      .then((response) => response.json())
      .then((body) => {
        setValueSearch({ ...valueSearch, data: body, fetching: false });
      });
  };

  const handleChange = (value: string) => {
    setValueSearch({ ...valueSearch, value });
  };

  const actionChangeCountMedicine = (key: any, type: any) => {
    let newArrProduct: any = [];
    arrShoping?.map((item) => {
      if (item?.key == key) {
        if (type == 'minus' && item?.count > 0) {
          return newArrProduct.push({
            ...item,
            count: item.count - 1,
          });
        } else if (type == 'plus')
          return newArrProduct.push({
            ...item,
            count: parseInt(item.count) + 1,
          });
      } else newArrProduct.push(item);
    });
    dispatch(updateArrShoping(newArrProduct));
  };

  const addProduct = (value: any) => {
    if (arrShoping.some((item) => item?.key == value?.key) == false)
      dispatch(addProductToShopingCart(value));
    else {
      actionChangeCountMedicine(value?.key, 'plus');
    }
  };

  const removeProduct = (value: any) => {
    if (arrShoping.find((item) => item?.key == value?.key)?.count == 1) {
      const newArrShoping = arrShoping.filter((item) => item?.key !== value?.key);
      dispatch(updateArrShoping(newArrShoping));
    } else {
      actionChangeCountMedicine(value?.key, 'minus');
    }
  };

  const changeQuantityMedicine = (value: any, key: any) => {
    let newArrProduct: any = [];
    arrShoping?.map((item) => {
      if (item?.key == key) {
        return newArrProduct.push({
          ...item,
          count: value,
        });
      } else newArrProduct.push(item);
    });
    dispatch(updateArrShoping(newArrProduct));
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      <div
        className={'classheader'}
        style={{
          backgroundImage: `url(${bgImageHeader})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div style={classContainer} className={'classheaderchild'}>
          <Link href={'/home'} className="label-image-logo" style={{ cursor: 'pointer' }}>
            <Image preview={false} src={logo} />
          </Link>
          {!isGioHang && (
            <Select
              mode="multiple"
              labelInValue
              placeholder="Tìm tên thuốc, thực phẩm chức năng, dụng cụ y tế..."
              notFoundContent={valueSearch?.fetching ? <Spin size="small" /> : null}
              suffixIcon={<SearchOutlined className="label-search-icon" />}
              filterOption={false}
              onSearch={fetchUser}
              onChange={handleChange}
              onBlur={() =>
                setValueSearch({
                  data: [],
                  value: '',
                  fetching: false,
                })
              }
              className={'label-search'}
            >
              {valueSearch?.data.map((item: any) => (
                <Option key={item.id} disabled>
                  <div className="label-main-product">
                    <div
                      className="label-image-info"
                      onClick={() => router.push(`/detail/${item.id}`)}
                    >
                      <img
                        className="label-image-product"
                        alt={item?.name}
                        src={item?.image !== '' ? item?.image : imageDefault}
                      />
                      <div>
                        <Typography.Title className="nameMidicine">{item?.name}</Typography.Title>
                        <div>{item?.unit}</div>
                        <div className="sellingPrice">
                          {FormatCurrency(item?.price)} / {item?.unit}
                        </div>
                      </div>
                    </div>
                    <div>
                      <MinusCircleOutlined
                        className={classNames(
                          'label-panel-icon-minus',
                          arrShoping.some((pro) => pro?.key == item?.id) ? 'cls-display' : ''
                        )}
                        onClick={() =>
                          removeProduct({
                            key: item?.id,
                            name: item?.name,
                            image: item.image,
                            price: item?.price,
                            count: 1,
                            unit: item?.unit,
                          })
                        }
                      />
                      <Input
                        type="number"
                        maxLength={2}
                        className={classNames(
                          'label-panel-input',
                          arrShoping.some((pro) => pro?.key == item?.id) ? 'cls-display' : ''
                        )}
                        onChange={(event) => {
                          changeQuantityMedicine(event?.target?.value, item?.id);
                        }}
                        value={arrShoping?.find((pro) => pro.key === item?.id)?.count}
                      />
                      <PlusCircleOutlined
                        className="label-panel-icon-plus"
                        onClick={() =>
                          addProduct({
                            key: item?.id,
                            name: item?.name,
                            image: item.image,
                            price: item?.price,
                            count: 1,
                            unit: item?.unit,
                          })
                        }
                      />
                    </div>
                  </div>
                </Option>
              ))}
            </Select>
          )}
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
              className="label-gio-hang"
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
        {!isGioHang && (
          <Select
            mode="multiple"
            labelInValue
            placeholder="Tìm tên thuốc, thực phẩm chức năng, dụng cụ y tế..."
            notFoundContent={valueSearch?.fetching ? <Spin size="small" /> : null}
            suffixIcon={<SearchOutlined className="label-search-icon" />}
            filterOption={false}
            onSearch={fetchUser}
            onChange={handleChange}
            onBlur={() =>
              setValueSearch({
                data: [],
                value: '',
                fetching: false,
              })
            }
            className={'label-search label-search-mobile'}
          >
            {valueSearch?.data.map((item: any) => (
              <Option key={item.id} disabled>
                <div className="label-main-product">
                  <div
                    className="label-image-info"
                    onClick={() => router.push(`/detail/${item.id}`)}
                  >
                    <img
                      className="label-image-product"
                      alt={item?.name}
                      src={item?.image !== '' ? item?.image : imageDefault}
                    />
                    <div>
                      <Typography.Title
                        className="nameMidicine"
                        style={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {item?.name}
                      </Typography.Title>
                      <div>{item?.unit}</div>
                      <div className="sellingPrice">
                        {FormatCurrency(item?.price)} / {item?.unit}
                      </div>
                    </div>
                  </div>
                  <div>
                    <MinusCircleOutlined
                      className={classNames(
                        'label-panel-icon-minus',
                        arrShoping.some((pro) => pro?.key == item?.id) ? 'cls-display' : ''
                      )}
                      onClick={() =>
                        removeProduct({
                          key: item?.id,
                          name: item?.name,
                          image: item.image,
                          price: item?.price,
                          count: 1,
                          unit: item?.unit,
                        })
                      }
                    />
                    <Input
                      type="number"
                      maxLength={2}
                      className={classNames(
                        'label-panel-input',
                        arrShoping.some((pro) => pro?.key == item?.id) ? 'cls-display' : ''
                      )}
                      onChange={(event) => {
                        changeQuantityMedicine(event?.target?.value, item?.id);
                      }}
                      value={arrShoping?.find((pro) => pro.key === item?.id)?.count}
                    />
                    <PlusCircleOutlined
                      className="label-panel-icon-plus"
                      onClick={() =>
                        addProduct({
                          key: item?.id,
                          name: item?.name,
                          image: item.image,
                          price: item?.price,
                          count: 1,
                          unit: item?.unit,
                        })
                      }
                    />
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        )}
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
          layout="vertical"
          size="middle"
          form={form}
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ padding: '5px', margin: '0 auto' }}
          initialValues={{ remember: true, prefix: '+84' }}
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
                <Input addonBefore={prefixSelector} />
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
