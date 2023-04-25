import React from 'react';
import { Typography, Card, Col, Row } from 'antd';
import { HighlightFilled, BulbFilled } from '@ant-design/icons';
import Image from 'next/image';
//style
import './index.css';

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
  console.log('medicine:', medicine);
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
                      //   <Image
                      //   src={item?.image}
                      //   alt={item?.name}
                      //   style={{ height: '192px', padding: '10px' }}
                      // />
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
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}
