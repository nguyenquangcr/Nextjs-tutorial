import React from 'react';
import { Typography, Card, Col, Row } from 'antd';
import { HighlightFilled, BulbFilled } from '@ant-design/icons';
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

export default function HighProductComponent(props: HeaderProps) {
    return <div>
        <div className='banner-high-product'>
            <div style={{
                width: ' 100%',
                maxWidth: ' 1200px',
                marginRight: ' auto',
                marginLeft: ' auto',
                display: 'flex',
                alignItems: 'center'
            }}>
                <HighlightFilled style={{ fontSize: '20px', color: 'rgb(255 255 255 / 95%)' }} />
                <Typography.Title level={4} style={{ color: '#fff', marginLeft: '10px', marginBottom: 0 }}>Sản Phẩm Nổi Bật Hôm Nay</Typography.Title>
            </div>
        </div>

        <div className='high-product' style={classContainer}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                <BulbFilled style={{ fontSize: '20px', color: '#ef4444' }} />
                <Typography.Title level={4} style={{ color: '#000', marginLeft: '10px', marginBottom: 0 }}>Bán Chạy Nhất</Typography.Title>
            </div>

            <Row gutter={8}>
                <Col span={5}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/01/00017891-boi-mau-forte-tat-thanh-125ml-siro-bo-phe-4358-5e14_large.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/09/00345454-siro-an-ngon-healthy-new-kid-8980-5f62_large.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/04/00030511-lacto-biomin-gold-new-hdpharma-20-goi-2174-607c_large.jpg" />}
                    >
                        <Meta prefixCls='lc' title="Europe Street beatcsacsacascsacsac" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/10/00021988-anica-phytextra-60v-5137-6347_large.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card
                        hoverable
                        style={{ width: 192, boxShadow: '0 0 0 1px #d8e0e8' }}
                        cover={<img style={{ height: '192px', padding: '10px' }} alt="example" src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/12/00028684-vien-uong-omega-3-6-9-naturecare-giam-cholesterol-bao-ve-tim-mach-60-vien-9210-63a9_large.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
            </Row>
        </div>
    </div>;
}
