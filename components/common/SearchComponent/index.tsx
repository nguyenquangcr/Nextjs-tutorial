import React from 'react';
import { Input, Typography, Space, Tag, Select, Spin, Card, Button } from 'antd';
import { DownOutlined, BulbFilled, PlusCircleOutlined } from '@ant-design/icons';
//style
import './index.css';
import { domain, imageDefault } from 'Constant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { addProductToShopingCart } from 'slices/medicineSlice';

export interface SearchProps {}

const { Search } = Input;

const classContainer: React.CSSProperties = {
  width: ' 100%',
  maxWidth: ' 1200px',
  marginRight: ' auto',
  marginLeft: ' auto',
};
const { Option } = Select;
export default function SearchComponent(props: SearchProps) {
  const dispatch = useDispatch();
  const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);
  const [valueSearch, setValueSearch] = React.useState({
    data: [],
    value: '',
    fetching: false,
  });

  const handleChange = (value: string) => {
    setValueSearch({ ...valueSearch, value });
  };

  const fetchUser = (value: any) => {
    setValueSearch({ ...valueSearch, data: [], fetching: true });
    fetch(`${domain}/medicine/search?search=${value}`)
      .then((response) => response.json())
      .then((body) => {
        setValueSearch({ ...valueSearch, data: body, fetching: false });
      });
  };

  const addProduct = (value: any) => {
    if (arrProduct.some((item) => item?.key == value?.key) == false)
      dispatch(addProductToShopingCart(value));
  };

  return (
    <div className="box-search" style={classContainer}>
      <Typography.Title level={2} style={{ color: '#000', marginBottom: '15px' }}>
        Tra Cứu Thuốc, TPCN, Bệnh Lý...{' '}
      </Typography.Title>
      <Select
        mode="multiple"
        labelInValue
        placeholder="Nhập tên thuốc bạn muốn tìm kiếm. Ví dụ: Thuốc ho"
        notFoundContent={valueSearch?.fetching ? <Spin size="small" /> : null}
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
        style={{ width: '100%' }}
      >
        {valueSearch?.data.map((item: any) => (
          <Option key={item.id} disabled>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                border: 'solid 1px #e5e7eb',
              }}
            >
              <img
                style={{ height: '50px', width: '50px', padding: '10px' }}
                alt={item?.name}
                src={item?.image !== '' ? item?.image : imageDefault}
              />
              <Typography.Paragraph ellipsis style={{ marginRight: '10px', maxWidth: '300px' }}>
                {item?.name}
              </Typography.Paragraph>
              <Button
                type="primary"
                size="small"
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
                {/* <PlusCircleOutlined />  */}
                <span>Thêm</span>
              </Button>
            </div>
          </Option>
        ))}
      </Select>
      <Typography.Title level={4} style={{ color: '#000', marginTop: '20px' }}>
        Tra Cứu Hàng Đầu{' '}
      </Typography.Title>
      <Space size={[0, 8]} wrap>
        <Tag>glucosamin</Tag>
        <Tag>vitamin</Tag>
        <Tag>Khẩu trang</Tag>
        <Tag>Canxi</Tag>
      </Space>
    </div>
  );
}
