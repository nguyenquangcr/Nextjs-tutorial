import React from 'react';
import { Typography, Card, Col, Row, Button } from 'antd';
import { DownOutlined, BulbFilled } from '@ant-design/icons';
import './index.css'

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
    height: '30px'
};

const styleCol: React.CSSProperties = {
    marginTop: '16px'
};

export default function ProductComponent(props: HeaderProps) {
    return <div>
        <div className='high-product' style={classContainer}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                <BulbFilled style={{ fontSize: '20px', color: 'blue' }} />
                <Typography.Title level={4} style={{ color: '#000', marginLeft: '10px', marginBottom: 0 }}>Sản Phẩm Nổi Bật</Typography.Title>
            </div>

            <Row gutter={8} style={{ textAlign: '-webkit-center' }}>
                {/* ROW ONE */}
                <Col style={styleCol} lg={6} xs={12}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/01/00017891-boi-mau-forte-tat-thanh-125ml-siro-bo-phe-4358-5e14_large.jpg" />}
                    >
                        <Meta title="Siro bổ phế Bối Mẫu Forte Mom And Baby Tất Thành hỗ trợ giảm ho, đau rát họng, khản tiếng (125ml)" description="55.000d / Chai" />
                    </Card>
                </Col>
                <Col style={styleCol} lg={6} xs={12}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/09/00345454-siro-an-ngon-healthy-new-kid-8980-5f62_large.jpg" />}
                    >
                        <Meta title="Siro Healthy New Kids hỗ trợ kích thích tiêu hóa, giúp ăn ngon (120ml)" description="81.000d / Chai" />
                    </Card>
                </Col>
                <Col style={styleCol} lg={6} xs={12}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/04/00030511-lacto-biomin-gold-new-hdpharma-20-goi-2174-607c_large.jpg" />}
                    >
                        <Meta title="Dung dịch xịt Xuyên Tâm Liên Hải Thượng Vương Royal Care giảm ho, giảm đờm (30ml)" description="97.000d / Hộp" />
                    </Card>
                </Col>
                <Col style={styleCol} lg={6} xs={12}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/10/00021988-anica-phytextra-60v-5137-6347_large.jpg" />}
                    >
                        <Meta title="Viên uống Omexxel Ginkgo 120 Excelife hỗ trợ tăng cường tuần hoàn máu não, tốt cho tim mạch (30 viên)" description="364.000d / Hộp" />
                    </Card>
                </Col>
                {/* ROW TWO */}
                <Col style={styleCol} lg={6} xs={12}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/01/00017891-boi-mau-forte-tat-thanh-125ml-siro-bo-phe-4358-5e14_large.jpg" />}
                    >
                        <Meta title="Siro bổ phế Bối Mẫu Forte Mom And Baby Tất Thành hỗ trợ giảm ho, đau rát họng, khản tiếng (125ml)" description="55.000d / Chai" />
                    </Card>
                </Col>
                <Col style={styleCol} lg={6} xs={12}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/09/00345454-siro-an-ngon-healthy-new-kid-8980-5f62_large.jpg" />}
                    >
                        <Meta title="Siro Healthy New Kids hỗ trợ kích thích tiêu hóa, giúp ăn ngon (120ml)" description="81.000d / Chai" />
                    </Card>
                </Col>
                <Col style={styleCol} lg={6} xs={12}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/04/00030511-lacto-biomin-gold-new-hdpharma-20-goi-2174-607c_large.jpg" />}
                    >
                        <Meta title="Dung dịch xịt Xuyên Tâm Liên Hải Thượng Vương Royal Care giảm ho, giảm đờm (30ml)" description="97.000d / Hộp" />
                    </Card>
                </Col>
                <Col style={styleCol} lg={6} xs={12}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/10/00021988-anica-phytextra-60v-5137-6347_large.jpg" />}
                    >
                        <Meta title="Viên uống Omexxel Ginkgo 120 Excelife hỗ trợ tăng cường tuần hoàn máu não, tốt cho tim mạch (30 viên)" description="364.000d / Hộp" />
                    </Card>
                </Col>
            </Row>

            <div className='text-center m-4'>
                <Button shape="round" icon={<DownOutlined />} size={'large'}>
                    Xem thêm 37 sản phẩm
                </Button>
            </div>
        </div>
    </div>;
}
