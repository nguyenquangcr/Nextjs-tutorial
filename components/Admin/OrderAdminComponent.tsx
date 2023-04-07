import React, { useEffect, useState } from 'react';
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
  Upload,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedicine, deleteOrder, getListMedicine, getListOrder } from 'slices/medicineSlice';
import { domain } from 'Constant';
import axios from 'axios';
import { RootState } from 'store';
import { openNotificationWithIcon } from '../notificationComponent';
import FormatCurrency from 'utils/FormatCurrency';
// import axios from 'axios'

export interface OrderProps {}

const headerImage: React.CSSProperties = {
  width: '100vw',
  height: '30px',
};

const containerRight: React.CSSProperties = {
  padding: ' 16px',
  background: ' #fff',
  borderRadius: ' 1.2rem',
  marginLeft: ' auto',
  top: ' 1rem',
  width: '95%',
  margin: '10px auto',
};

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
  const inputRef: any = React.useRef(null);
  const form: any = React.useContext(EditableContext);
  React.useEffect(() => {
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

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

export default function OrderAdminComponent(props: OrderProps) {
  const dispatch = useDispatch();
  //store
  const arrOrder = useSelector((state: RootState) => state.medicine.arrOrder);
  //state
  const [loadding, setLoadding] = useState(false);
  const [columnTable, setColumnTable] = useState<any>([]);

  useEffect(() => {
    dispatch(getListOrder());
  }, []);

  //   useEffect(() => {
  //     if (window.innerWidth > 1000) setColumnTable(defaultColumns);
  //     else setColumnTable(mediaColumns);
  //   }, []);

  const defaultColumns = [
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      render: (_: any, record: any) => {
        return (
          <Typography.Title
            level={5}
            style={{ color: '#000', margin: '10px', cursor: 'pointer', border: 'none' }}
          >
            {FormatCurrency(record?.price)}
          </Typography.Title>
        );
      },
    },
    {
      title: 'Chi tiết đơn hàng',
      dataIndex: 'order',
      width: '35%',
      render: (_: any, record: any) => {
        return (
          record?.order &&
          record?.order?.map((item: any, index: any) => {
            return (
              <div key={index}>
                <div>
                  <span>Tên thuốc: {item.medicine}</span> <span>Số lượng: {item.count}</span>
                </div>
              </div>
            );
          })
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      render: (_: any, record: { key: React.Key }) => (
        <Popconfirm
          style={{ cursor: 'pointer' }}
          title="Bạn có chắc chắn xóa?"
          onConfirm={() => handleDelete(record)}
        >
          <a>
            <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} /> Xóa
          </a>
        </Popconfirm>
      ),
    },
  ];

  //   const mediaColumns = [
  //     {
  //       title: 'Thông tin sản phẩm',
  //       dataIndex: 'name',
  //       width: '90%',
  //       render: (_: any, record: any) => {
  //         return (
  //           <div style={{ display: 'flex', alignItems: 'center' }}>
  //             <img
  //               style={{
  //                 width: '52px',
  //                 height: '52px',
  //                 boxShadow: '0 0 0 1px #e4e8ed',
  //                 borderRadius: '7.2px',
  //                 padding: '2px',
  //               }}
  //               alt="example"
  //               src={record?.image}
  //             />
  //             <div>
  //               <Typography.Title
  //                 level={5}
  //                 style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
  //               >
  //                 {record.name}
  //               </Typography.Title>
  //               <Typography.Title
  //                 level={5}
  //                 style={{ color: '#000', margin: '10px', cursor: 'pointer', border: 'none' }}
  //               >
  //                 {FormatCurrency(record?.price)}
  //               </Typography.Title>
  //               <div style={{ display: 'flex', alignItems: 'center' }}>
  //                 <Typography.Title
  //                   level={5}
  //                   style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
  //                 >
  //                   {record.unit}
  //                 </Typography.Title>
  //                 <Typography.Title
  //                   level={5}
  //                   style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
  //                 >
  //                   {record.note}
  //                 </Typography.Title>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       title: '',
  //       dataIndex: '',
  //       render: (_: any, record: { key: React.Key }) => (
  //         <Popconfirm
  //           style={{ cursor: 'pointer' }}
  //           title="Bạn có chắc chắn xóa?"
  //           onConfirm={() => handleDelete(record)}
  //         >
  //           <a>
  //             <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} /> Xóa
  //           </a>
  //         </Popconfirm>
  //       ),
  //     },
  //   ];

  const handleDelete = (value: any) => {
    dispatch(deleteOrder(value?.id));
  };

  return (
    <Row gutter={24}>
      {/* ROW ONE */}
      <Col lg={24} xs={24}>
        <div style={{ margin: '5px' }}>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={arrOrder}
            columns={defaultColumns}
            pagination={false}
          />
        </div>
      </Col>
    </Row>
  );
}
