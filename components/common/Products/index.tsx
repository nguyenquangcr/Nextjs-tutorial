import React from 'react';
import { Typography, Card, Col, Row, Button, Radio } from 'antd';
import {
  DownOutlined,
  BulbFilled,
  PlusCircleOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToShopingCart, getListMedicineUser } from 'slices/medicineSlice';
import { RootState } from 'store';
import { updateOpenModalLoging } from 'slices/userSlice';
import FormatCurrency from 'utils/FormatCurrency';
import { imageDefault } from 'Constant';

const imageTest =
  'https://0912350050.sieu.re/_next/image?url=https%3A%2F%2Fd3hr4eej8cfgwy.cloudfront.net%2Fv2%2F128x128%2Ffinan-prd%2F4c3eb630-4e4b-4d17-9b69-25f425328c78%2Fimage%2Fdfd5e50e-7d3c-4ad3-8dc3-2d88b18f9da3.jpg&w=828&q=75';

export interface HeaderProps {}

const { Meta } = Card;

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

const styleCol: React.CSSProperties = {
  marginTop: '16px',
};

export default function ProductComponent(props: HeaderProps) {
  const dispatch = useDispatch();
  //state store
  const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);
  const arrMedicineUser = useSelector((state: RootState) => state.medicine.listMedicineUser);
  const totalMedicine = useSelector((state: RootState) => state.medicine.totalMedicine);
  const accessTokenUser = useSelector((state: RootState) => state.user.accessTokenUser);
  //state component
  const [display, setDisplay] = React.useState('excel');

  React.useEffect(() => {
    dispatch(getListMedicineUser(15));
  }, []);

  const addProduct = (value: any) => {
    if (arrProduct.some((item) => item?.key == value?.key) == false)
      dispatch(addProductToShopingCart(value));
  };

  const handleBtnViewPlus = () => {
    // if (arrMedicineUser.length >= 16) {
    //   if (accessTokenUser == null) return dispatch(updateOpenModalLoging(true));
    //   else dispatch(getListMedicineUser(arrMedicineUser.length + 8));
    // } else dispatch(getListMedicineUser(arrMedicineUser.length + 8));
    dispatch(getListMedicineUser(arrMedicineUser.length + 15));
  };

  const renderTextBtnPlus = () => {
    // if (arrMedicineUser.length >= 16) {
    //   if (accessTokenUser == null) return 'Vui lòng đăng nhập để xem tiếp';
    //   else return 'Xem thêm 8 sản phẩm';
    // } else return 'Xem thêm 8 sản phẩm'
    return 'Xem thêm 15 sản phẩm';
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
                  <div className="label-main-product" key={index}>
                    <div className="label-image-info">
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
                    <div>
                      <PlusCircleOutlined
                        style={{
                          fontSize: '25px',
                          color: 'green',
                          margin: '10px',
                          cursor: 'pointer',
                        }}
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

        <div className="text-center m-4">
          {arrMedicineUser.length < totalMedicine && (
            <Button
              onClick={() => handleBtnViewPlus()}
              style={{ display: 'flex', margin: 'auto', alignItems: 'center' }}
              shape="round"
              icon={arrMedicineUser.length < 16 && <DownOutlined />}
              size={'large'}
            >
              {renderTextBtnPlus()}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
