import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { notFound } from 'next/navigation';
import { useRouter, } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Layout,
  Space,
  Image,
  Breadcrumb,
  Row,
  Col,
  Table,
  Form,
  Input,
  Popconfirm,
  Button,
  InputNumber,
  Typography,
} from 'antd';
import HeaderComponent from '@/components/common/Header/header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import Link from 'next/link';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import FormatCurrency from '../../utils/FormatCurrency';
//style
import './styles.scss';
import { updateArrShoping } from 'slices/medicineSlice';
export interface HomePageProps {
  post: any;
}

const classContainer: React.CSSProperties = {
  width: ' 100%',
  maxWidth: ' 1200px',
  marginRight: ' auto',
  marginLeft: ' auto',
};

const containerRight: React.CSSProperties = {
  padding: ' 16px',
  background: ' #fff',
  borderRadius: ' 1.2rem',
  marginLeft: ' auto',
  top: ' 1rem',
  width: '95%',
  margin: '10px auto'
}

const labelButton: React.CSSProperties = {
  display: ' inline-flex',
  alignItems: ' center',
  justifyContent: ' center',
  width: ' 100%',
  padding: ' 12px',
  color: ' #fff',
  outline: ' none',
  border: ' none',
  background: ' linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)',
  borderRadius: ' 42px',
  cursor: ' pointer',
  fontFamily: ' Inter,Arial,Helvetica,sans-serif'
}

const labelFormInfoCustomer: React.CSSProperties = {
  width: '95%',
  background: ' #fff',
  borderRadius: ' 0.8rem',
  padding: ' 1.6rem',
  margin: ' 10px auto',
}


const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }: any) => {
  const [form]: any = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: any) => {
  const [editing, setEditing] = useState(false);
  const inputRef: any = useRef(null);
  const form: any = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};



export default function HomePage({ post }: HomePageProps) {

  const dispatch = useDispatch();
  //store
  const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);
  //state
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataSource, setDataSource] = useState<any>(arrProduct);
  const [activeForm, setActiveForm] = useState(false);
  const [columnTable, setColumnTable] = useState<any>([]);

  useEffect(() => {
    if (window.innerWidth > 600) setColumnTable(defaultColumns);
    else setColumnTable(mediaColumns);
  }, [])


  useEffect(() => {
    let total = 0;
    arrProduct.length > 0 && arrProduct.map(item => {
      total += (item.price * item?.count)
    })
    setTotalPrice(total);
  }, [arrProduct])

  const mediaColumns = [
    {
      title: 'Thông tin sản phẩm',
      dataIndex: 'name',
      width: '90%',
      render: (_: any, record: any) => {
        return (<div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{
              width: '52px', height: '52px',
              boxShadow: '0 0 0 1px #e4e8ed',
              borderRadius: '7.2px',
              padding: '2px'
            }}
            alt="example"
            src={record?.image}
          />
          <div>
            <Typography.Title level={5}
              style={{ color: '#000', margin: '10px', cursor: 'pointer' }}>{record.name}
            </Typography.Title>
            <Typography.Title level={5}
              style={{ color: '#000', margin: '10px', cursor: 'pointer', border: 'none' }}>
              {FormatCurrency(record?.price)}
            </Typography.Title>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button disabled={record?.count <= 0} className='minus-class' onClick={() => actionChangeCountMedicine(record.key, 'minus')}>-</Button>
              <Typography.Title level={5}
                style={{ color: '#000', margin: '10px', cursor: 'pointer' }}>
                <Input className='class-input-count' value={record?.count} />
              </Typography.Title>
              <Button className='plus-class' onClick={() => actionChangeCountMedicine(record.key, 'plus')}>+</Button>
            </div>
          </div>
        </div>)
      },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) =>
        arrProduct.length >= 1 ? (
          <DeleteOutlined onClick={() => handleDelete(record.key)} />
        ) : null,
    },
  ]

  const defaultColumns = [
    {
      title: 'Thông tin sản phẩm',
      dataIndex: 'name',
      width: '35%',
      render: (_: any, record: any) => {
        return (<div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{
              width: '52px', height: '52px',
              boxShadow: '0 0 0 1px #e4e8ed',
              borderRadius: '7.2px',
              padding: '2px'
            }}
            alt="example"
            src={record?.image}
          />
          <Typography.Title level={5}
            style={{ color: '#000', margin: '10px', cursor: 'pointer' }}>{record.name}
          </Typography.Title>

        </div>)
      },
    },
    {
      title: 'Giá thành',
      dataIndex: 'price',
      render: (_: any, record: any) => {
        return (<div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Title level={5}
            style={{ color: '#000', margin: '10px', cursor: 'pointer', border: 'none' }}>
            {FormatCurrency(record?.price)}
          </Typography.Title>
        </div>)
      },

    },
    {
      title: 'Số lượng',
      dataIndex: '',
      render: (_: any, record: any) => {
        return (<div style={{ display: 'flex', alignItems: 'center' }}>
          <Button disabled={record?.count <= 0} className='minus-class' onClick={() => actionChangeCountMedicine(record.key, 'minus')}>-</Button>
          <Typography.Title level={5}
            style={{ color: '#000', margin: '10px', cursor: 'pointer' }}>
            <Input className='class-input-count' value={record?.count} />
          </Typography.Title>
          <Button className='plus-class' onClick={() => actionChangeCountMedicine(record.key, 'plus')}>+</Button>
        </div>)
      },
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) =>
        arrProduct.length >= 1 ? (
          <DeleteOutlined onClick={() => handleDelete(record.key)} />
        ) : null,
    },
  ];

  const handleDelete = (key: any) => {
    const newData: any = arrProduct.filter((item: any) => item.key !== key);
    setDataSource(newData);
    dispatch(updateArrShoping(newData));
  };

  const actionChangeCountMedicine = (key: any, type: any) => {
    let newArrProduct: any = [];
    arrProduct?.map(item => {
      if (item?.key == key) {

        if (type == 'minus' && item?.count > 0) {
          newArrProduct.push({
            ...item, count: item.count - 1
          })
        }
        else if (type == 'plus') newArrProduct.push({
          ...item, count: item.count + 1
        })
        else return;
      } else newArrProduct.push(item);
    })
    dispatch(updateArrShoping(newArrProduct));
  }

  const handleSave = (row: any) => {
    const newData = [...arrProduct];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = mediaColumns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  //form
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <HeaderComponent />
        <div style={classContainer}>
          <div style={{ margin: '5px' }}>
            {activeForm == false ? <Breadcrumb
              items={[
                {
                  title: <Link href={'/'}>Trang chủ</Link>,
                },
                {
                  title: 'Giỏ hàng',
                },
              ]}
            /> : <Typography.Title onClick={() => setActiveForm(false)}
              level={5}
              style={{
                color: '#000', cursor: 'pointer', display: 'flex',
                alignItems: 'center'
              }}
            ><LeftOutlined /> Quay lại giỏ hàng
            </Typography.Title>}
          </div>

          <Row gutter={24}>
            {/* ROW ONE */}
            <Col lg={16} xs={24}>
              <div style={{ margin: '5px' }}>
                <Table
                  components={components}
                  rowClassName={() => 'editable-row'}
                  bordered
                  dataSource={arrProduct}
                  columns={columns}
                  pagination={false}
                />
              </div>
              {
                activeForm && <Form
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                  style={labelFormInfoCustomer}
                  validateMessages={validateMessages}
                >
                  <Form.Item name={'name'} label="Họ và tên" rules={[{ required: true, message: 'Xin hãy nhập họ và tên!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name={'email'} label="Email" rules={[{ type: 'email', required: true, message: 'Xin hãy nhập email!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Xin hãy nhập số điện thoại!' }]}
                  >
                    <Input type='number' />
                  </Form.Item>
                  <Form.Item
                    name="note"
                    label="Ghi chú"
                  >
                    <Input placeholder='Thêm ghi chú (ví dụ: Hãy gọi trước khi giao)' />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Hoàn tất
                    </Button>
                  </Form.Item>
                </Form>
              }
            </Col>
            <Col lg={8} xs={24}>
              <div style={containerRight}>
                <Form
                  name="validate_other"
                  {...formItemLayout}
                  initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
                  style={{ maxWidth: 600 }}
                >
                  <Form.Item {...tailLayout} label="Tổng tiền">
                    <span className="ant-form-text">{FormatCurrency(totalPrice)}</span>
                  </Form.Item>
                  <Form.Item {...tailLayout} label="Giảm giá trực tiếp">
                    <span className="ant-form-text">{FormatCurrency(0)}</span>
                  </Form.Item>
                  <Form.Item {...tailLayout} label="Giảm giá voucher ">
                    <span className="ant-form-text">{FormatCurrency(0)}</span>
                  </Form.Item>
                  <hr />
                  <Form.Item {...tailLayout} label="Thành tiền">
                    <span className="ant-form-text">{FormatCurrency(totalPrice)}</span>
                  </Form.Item>
                </Form>
                {activeForm == false && <button onClick={() => setActiveForm(true)} style={labelButton}>Đặt hàng</button>}
              </div>
            </Col>
          </Row>
        </div>

        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </Space >
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   console.log('get static path');

//   return {
//     paths: [],
//     fallback: false,
//   };
// };

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context: GetStaticPropsContext
) => {
  // console.log('get static props', context.params?.postId);
  // const postId = context.params?.postId;
  // console.log('postId:', postId);
  // if (!postId)
  //   return {
  //     notFound: true,
  //   };

  //server-side
  //run when build time
  // const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  // const data = await response.json();

  return {
    props: {
      post: [],
    },
  };
};

// export async function getServerSideProps(context: any) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
