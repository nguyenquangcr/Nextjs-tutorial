import React from 'react';
import { Typography, Card, Col, Row, Button } from 'antd';
import { DownOutlined, BulbFilled, PlusCircleOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToShopingCart, getListMedicineUser } from 'slices/medicineSlice';
import { RootState } from 'store';
import { updateOpenModalLoging } from 'slices/userSlice';
import FormatCurrency from 'utils/FormatCurrency';

export interface HeaderProps { }

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

  React.useEffect(() => {
    dispatch(getListMedicineUser(8));
  }, []);

  const addProduct = (value: any) => {
    if (arrProduct.some((item) => item?.key == value?.key) == false)
      dispatch(addProductToShopingCart(value));
  };

  const handleBtnViewPlus = () => {
    if (arrMedicineUser.length >= 16) {
      if (accessTokenUser == null) return dispatch(updateOpenModalLoging(true));
      else dispatch(getListMedicineUser(arrMedicineUser.length + 8));
    } else dispatch(getListMedicineUser(arrMedicineUser.length + 8));
  };

  const renderTextBtnPlus = () => {
    if (arrMedicineUser.length >= 16) {
      if (accessTokenUser == null) return 'Vui lòng đăng nhập để xem tiếp';
      else return 'Xem thêm 8 sản phẩm';
    } else return 'Xem thêm 8 sản phẩm'
  }

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
            Sản Phẩm Nổi Bật
          </Typography.Title>
        </div>

        <Row gutter={8}>
          {/* ROW ONE */}
          {arrMedicineUser &&
            arrMedicineUser?.map((item: any, index: any) => {
              console.log('item:', item)
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
                        src={item?.image}
                      />
                    }
                  >
                    <div className="class-note">{item?.description}</div>
                    <Typography.Title level={4} className="nameMidicine">
                      {item?.name}
                    </Typography.Title>
                    <Typography.Title style={{ fontSize: '16px!important' }} level={5} className="class-price">
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

        <div className="text-center m-4">
          {arrMedicineUser.length < totalMedicine && <Button
            onClick={() => handleBtnViewPlus()}
            style={{ display: 'flex', margin: 'auto', alignItems: 'center' }}
            shape="round"
            icon={arrMedicineUser.length < 16 && <DownOutlined />}
            size={'large'}
          >
            {/* {arrMedicineUser.length < 16 ? 'Xem thêm 8 sản phẩm' : 'Vui lòng đăng nhập để xem tiếp'} */}
            {renderTextBtnPlus()}
          </Button>}
        </div>
      </div>
    </div>
  );
}
