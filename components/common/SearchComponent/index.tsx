import React from 'react';
import { Input, Typography, Space, Tag } from 'antd';
import { FileTextFilled, ShoppingFilled } from '@ant-design/icons';
import './index.css'

export interface SearchProps { }

const { Search } = Input;

const classContainer: React.CSSProperties = {
    width: ' 100%',
    maxWidth: ' 1200px',
    marginRight: ' auto',
    marginLeft: ' auto',
};

export default function SearchComponent(props: SearchProps) {

    const onSearch = (value: string) => console.log(value);

    return <div className='box-search' style={classContainer}>
        <Typography.Title level={2} style={{ color: '#000', marginBottom: '15px' }}>Tra Cứu Thuốc, TPCN, Bệnh Lý... </Typography.Title>
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
        <Typography.Title level={4} style={{ color: '#000', marginTop: '20px' }}>Tra Cứu Hàng Đầu </Typography.Title>
        <Space size={[0, 8]} wrap>
            <Tag>glucosamin</Tag>
            <Tag>
                vitamin
            </Tag>
            <Tag >
                Khẩu trang
            </Tag>
            <Tag >
                Canxi
            </Tag>
        </Space>
    </div>
}
