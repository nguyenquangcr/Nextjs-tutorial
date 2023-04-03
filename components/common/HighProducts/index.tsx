import React from 'react';
import { Typography, Card, Col, Row } from 'antd';
import { HighlightFilled, BulbFilled } from '@ant-design/icons';
import './index.css';

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


export default function HighProductComponent(props: HeaderProps) {
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
          <Col style={styleCol} lg={6} xs={12}>
            <Card
              className='custom-card'
              hoverable
              style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
              cover={
                <img
                  style={{ height: '192px', padding: '10px' }}
                  alt="example"
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/01/00017891-boi-mau-forte-tat-thanh-125ml-siro-bo-phe-4358-5e14_large.jpg"
                />
              }
            >
              <div className='class-note'>
                1 Chai x 1 Chai
              </div>
              <Typography.Title
                level={4}
                className='nameMidicine'
              >
                Siro bổ phế Bối Mẫu Forte Mom And Baby Tất Thành hỗ trợ giảm ho, đau rát họng, khản tiếng (125ml)
              </Typography.Title>
              <Typography.Title
                level={4}
                className='class-price'
              >
                <span>55.000</span> /Chai
              </Typography.Title>
            </Card>
          </Col>
          <Col style={styleCol} lg={6} xs={12}>
            <Card
              className='custom-card'
              hoverable
              style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
              cover={
                <img
                  style={{ height: '192px', padding: '10px' }}
                  alt="example"
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/09/00345454-siro-an-ngon-healthy-new-kid-8980-5f62_large.jpg"
                />
              }
            >
              <div className='class-note'>
                Chai
              </div>
              <Typography.Title
                level={4}
                className='nameMidicine'
              >Siro Healthy New Kids hỗ trợ kích thích tiêu hóa, giúp ăn ngon (120ml)
              </Typography.Title>
              <Typography.Title
                level={4}
                className='class-price'
              >
                <span>81.000</span> /Chai
              </Typography.Title>
            </Card>
          </Col>
          <Col style={styleCol} lg={6} xs={12}>
            <Card
              className='custom-card'
              hoverable
              style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
              cover={
                <img
                  style={{ height: '192px', padding: '10px' }}
                  alt="example"
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/05/00345910-xit-hong-xuyen-tam-lien-hai-thuong-vuong-30ml-5572-6272_large.jpg"
                />
              }
            >
              <div className='class-note'>
                Chai
              </div>
              <Typography.Title
                level={4}
                className='nameMidicine'
              >
                Dung dịch xịt Xuyên Tâm Liên Hải Thượng Vương Royal Care giảm ho, giảm đờm (30ml)
              </Typography.Title>
              <Typography.Title
                level={4}
                className='class-price'
              >
                <span>97.000</span> /Chai
              </Typography.Title>
            </Card>
          </Col>
          <Col style={styleCol} lg={6} xs={12}>
            <Card
              className='custom-card'
              hoverable
              style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
              cover={
                <img
                  style={{ height: '192px', padding: '10px' }}
                  alt="example"
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/10/00031036-omexxel-ginkgo-120-2x15-5958-633e_large.jpg"
                />
              }
            >
              <div className='class-note'>
                Chai
              </div>
              <Typography.Title
                level={4}
                className='nameMidicine'
              >
                Viên uống Omexxel Ginkgo 120 Excelife hỗ trợ tăng cường tuần hoàn máu não, tốt cho tim mạch (30 viên)
              </Typography.Title>
              <Typography.Title
                level={4}
                className='class-price'
              >
                <span>291.200</span> / Hộp
              </Typography.Title>
            </Card>
          </Col>
          {/* ROW TWO */}
          <Col style={styleCol} lg={6} xs={12}>
            <Card
              className='custom-card'
              hoverable
              style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
              cover={
                <img
                  style={{ height: '192px', padding: '10px' }}
                  alt="example"
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/01/00017891-boi-mau-forte-tat-thanh-125ml-siro-bo-phe-4358-5e14_large.jpg"
                />
              }
            >
              <div className='class-note'>
                1 Chai x 1 Chai
              </div>
              <Typography.Title
                level={4}
                className='nameMidicine'
              >
                Siro bổ phế Bối Mẫu Forte Mom And Baby Tất Thành hỗ trợ giảm ho, đau rát họng, khản tiếng (125ml)
              </Typography.Title>
              <Typography.Title
                level={4}
                className='class-price'
              >
                <span>55.000</span> /Chai
              </Typography.Title>
            </Card>
          </Col>
          <Col style={styleCol} lg={6} xs={12}>
            <Card
              className='custom-card'
              hoverable
              style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
              cover={
                <img
                  style={{ height: '192px', padding: '10px' }}
                  alt="example"
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/09/00345454-siro-an-ngon-healthy-new-kid-8980-5f62_large.jpg"
                />
              }
            >
              <div className='class-note'>
                Chai
              </div>
              <Typography.Title
                level={4}
                className='nameMidicine'
              >Siro Healthy New Kids hỗ trợ kích thích tiêu hóa, giúp ăn ngon (120ml)
              </Typography.Title>
              <Typography.Title
                level={4}
                className='class-price'
              >
                <span>81.000</span> /Chai
              </Typography.Title>
            </Card>
          </Col>
          <Col style={styleCol} lg={6} xs={12}>
            <Card
              className='custom-card'
              hoverable
              style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
              cover={
                <img
                  style={{ height: '192px', padding: '10px' }}
                  alt="example"
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/05/00345910-xit-hong-xuyen-tam-lien-hai-thuong-vuong-30ml-5572-6272_large.jpg"
                />
              }
            >
              <div className='class-note'>
                Chai
              </div>
              <Typography.Title
                level={4}
                className='nameMidicine'
              >
                Dung dịch xịt Xuyên Tâm Liên Hải Thượng Vương Royal Care giảm ho, giảm đờm (30ml)
              </Typography.Title>
              <Typography.Title
                level={4}
                className='class-price'
              >
                <span>97.000</span> /Chai
              </Typography.Title>
            </Card>
          </Col>
          <Col style={styleCol} lg={6} xs={12}>
            <Card
              className='custom-card'
              hoverable
              style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
              cover={
                <img
                  style={{ height: '192px', padding: '10px' }}
                  alt="example"
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/10/00031036-omexxel-ginkgo-120-2x15-5958-633e_large.jpg"
                />
              }
            >
              <div className='class-note'>
                Chai
              </div>
              <Typography.Title
                level={4}
                className='nameMidicine'
              >
                Viên uống Omexxel Ginkgo 120 Excelife hỗ trợ tăng cường tuần hoàn máu não, tốt cho tim mạch (30 viên)
              </Typography.Title>
              <Typography.Title
                level={4}
                className='class-price'
              >
                <span>291.200</span> / Hộp
              </Typography.Title>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
