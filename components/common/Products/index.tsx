/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Typography, Card, Col, Row, Button, Radio, Input } from 'antd';
import {
  BulbFilled,
  PlusCircleOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductToShopingCart,
  getListMedicineUser,
  updateArrShoping,
} from 'slices/medicineSlice';
import { RootState } from 'store';
import FormatCurrency from 'utils/FormatCurrency';
import { imageDefault } from 'Constant';
import classnames from 'classnames';
import { useRouter } from 'next/router';

const classContainer: React.CSSProperties = {
  width: ' 100%',
  maxWidth: ' 1200px',
  marginRight: ' auto',
  marginLeft: ' auto',
};

const styleCol: React.CSSProperties = {
  marginTop: '16px',
};

export default function ProductComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  //state store
  const arrShoping = useSelector((state: RootState) => state.medicine.arrShoping);
  const arrMedicineUser = useSelector((state: RootState) => state.medicine.listMedicineUser);
  //state component
  const [display, setDisplay] = React.useState('excel');

  React.useEffect(() => {
    dispatch(getListMedicineUser(15));
  }, []);

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

  const onChange = (e: any) => {
    setDisplay(e.target.value);
  };

  return (
    <div>
      <div className="high-product" style={classContainer}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <BulbFilled style={{ fontSize: '20px', color: 'blue' }} />
          <Typography.Title
            level={4}
            style={{ color: '#000', marginLeft: '10px', marginBottom: 0 }}
          >
            DANH MỤC THUỐC
          </Typography.Title>
          <Radio.Group value={display} onChange={onChange} style={{ marginLeft: '20px' }}>
            <Radio.Button value="excel">
              <UnorderedListOutlined />
            </Radio.Button>
            <Radio.Button value="table">
              <AppstoreOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>

        {display == 'table' ? (
          <Row gutter={8}>
            {/* ROW ONE */}
            {arrMedicineUser &&
              arrMedicineUser?.map((item: any, index: any) => {
                return (
                  <Col style={styleCol} lg={6} xs={12} key={index}>
                    <Card
                      className="custom-card"
                      hoverable
                      style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                      cover={
                        <img
                          style={{ height: '192px', padding: '10px' }}
                          alt={item?.name}
                          src={item?.image !== '' ? item?.image : imageDefault}
                        />
                      }
                      onClick={() => router.push(`/detail/${item.id}`)}
                    >
                      <div className="class-note">{item?.description}</div>
                      <Typography.Title level={4} className="nameMidicine">
                        {item?.name}
                      </Typography.Title>
                      <Typography.Title
                        style={{ fontSize: '16px!important' }}
                        level={5}
                        className="class-price"
                      >
                        <span>{FormatCurrency(item?.price)}</span> /{item?.unit}
                      </Typography.Title>
                      <Button
                        className="class-plus-btn"
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
                      >
                        <PlusCircleOutlined /> Thêm
                      </Button>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        ) : (
          <>
            {arrMedicineUser &&
              arrMedicineUser?.map((item: any, index: any) => {
                return (
                  <div className="label-main-product" key={index} >
                    <div className="label-image-info" onClick={() => router.push(`/detail/${item.id}`)}>
                      <img
                        className="label-image-product"
                        alt={item?.name}
                        src={item?.image !== '' ? item?.image : imageDefault}
                      />
                      <div>
                        <Typography.Title className="nameMidicine">{item?.name}</Typography.Title>
                        <div>{item?.unit}</div>
                        <div className="sellingPrice">{FormatCurrency(item?.price)}</div>
                      </div>
                    </div>
                    <div className="label-panel-item">
                      <MinusCircleOutlined
                        className={classnames(
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
                        className={classnames(
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
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
