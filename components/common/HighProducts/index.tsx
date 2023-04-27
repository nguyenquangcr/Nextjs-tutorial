import React from 'react';
import { Typography, Card, Col, Row, Button } from 'antd';
import { HighlightFilled, BulbFilled, PlusCircleOutlined } from '@ant-design/icons';
//style
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToShopingCart } from 'slices/medicineSlice';
import { RootState } from 'store';

const classContainer: React.CSSProperties = {
  width: ' 100%',
  maxWidth: ' 1200px',
  marginRight: ' auto',
  marginLeft: ' auto',
};

const styleCol: React.CSSProperties = {
  marginTop: '16px',
};

export default function HighProductComponent({ medicine }: any) {
  const dispatch = useDispatch();
  const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);

  const addProduct = (value: any) => {
    if (arrProduct.some((item) => item?.key == value?.key) == false)
      dispatch(addProductToShopingCart(value));
  };
  return (
    <div>
      <div className="banner-high-product">
        <div
          style={{
            width: ' 100%',
            maxWidth: ' 1200px',
            marginRight: ' auto',
            marginLeft: ' auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HighlightFilled style={{ fontSize: '20px', color: 'rgb(255 255 255 / 95%)' }} />
          <Typography.Title
            level={4}
            style={{ color: '#fff', marginLeft: '10px', marginBottom: 0 }}
          >
            Sản Phẩm Nổi Bật Hôm Nay
          </Typography.Title>
        </div>
      </div>

      <div className="high-product" style={classContainer}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <BulbFilled style={{ fontSize: '20px', color: '#ef4444' }} />
          <Typography.Title
            level={4}
            style={{ color: '#000', marginLeft: '10px', marginBottom: 0 }}
          >
            Bán Chạy Nhất
          </Typography.Title>
        </div>

        <Row gutter={8}>
          {/* ROW ONE */}
          {medicine &&
            medicine?.map((item: any, index: any) => {
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
                    <Typography.Title level={4} className="class-price">
                      <span>{item?.price}</span> /{item?.unit}
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
      </div>
    </div>
  );
}
