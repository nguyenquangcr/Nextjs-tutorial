import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Form,
  Input,
  Popconfirm,
  Typography,
  Badge,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getListOrder, updateStatusOrder } from 'slices/medicineSlice';
import { RootState } from 'store';
import FormatCurrency from 'utils/FormatCurrency';
import moment from 'moment';

export interface OrderProps { }

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

const styleFormItem: React.CSSProperties = {
  marginBottom: '0'
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
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    dispatch(getListOrder());
  }, []);

  const defaultColumns = [
    {
      title: 'Mã khách hàng',
      dataIndex: 'id',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      render: (_: any, record: any) => {
        return <Typography.Title
          level={5}
        >
          {moment(record.createAt, 'YYYY-MM-DD HH:mm:ss').add(7, 'hour').format('DD/MM/YYYY HH:mm:ss')}
        </Typography.Title>
      }
    },
    {
      title: 'Thông tin khách hàng',
      dataIndex: '',
      render: (_: any, record: any) => {
        return (
          <div>
            <Form
              name="validate_other"
            >
              <Form.Item style={styleFormItem} label="Tên">
                <span>{record?.name}</span>
              </Form.Item>
              <Form.Item style={styleFormItem} label="Email">
                <span>{record?.email}</span>
              </Form.Item>
              <Form.Item style={styleFormItem} label="Số điện thoại">
                <span>{record?.phoneNumber}</span>
              </Form.Item>
              <Form.Item style={styleFormItem} label="Địa chỉ">
                <span>{record?.address}</span>
              </Form.Item>
              <Form.Item style={styleFormItem} label="Ghi chú">
                <span>{record?.note}</span>
              </Form.Item>
            </Form>
          </div>
        )
      }
    },
    {
      title: 'Chi tiết đơn hàng',
      dataIndex: 'order',
      render: (_: any, record: any) => {
        return (
          <div>
            <Form
              name="validate_other"
            >
              <Form.Item style={styleFormItem} label="Tổng tiền">
                <span>{FormatCurrency(record?.price)}</span>
              </Form.Item>
              {
                record?.order &&
                record?.order?.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Form.Item style={styleFormItem} label="Tên thuốc">
                          <span>{item.medicine}</span>
                        </Form.Item>
                        <Form.Item style={{ marginLeft: '10px', marginBottom: '0' }} label="Số lượng">
                          <span>{item.count}</span>
                        </Form.Item>
                      </div>
                    </div>
                  );
                })
              }
            </Form>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_: any, record: any) => {
        return <>{record.status ? <Badge status="success" text="Đã xử lý" /> : <Badge status="processing" text="Đang xử lý" />}</>
      }
    }, {
      title: '',
      dataIndex: '',
      render: (_: any, record: any) => (
        <>
          {record.status == false && <div style={{ color: 'blue', cursor: 'pointer', margin: '5px' }} onClick={() => dispatch(updateStatusOrder(record.id, { status: true }))}>Hoàn thành</div>}
          <Popconfirm
            style={{ cursor: 'pointer' }}
            title="Bạn có chắc chắn xóa?"
            onConfirm={() => handleDelete(record)}
          >
            <a style={{ color: 'red', margin: '5px' }}>Xóa</a>
          </Popconfirm>
        </>
      ),
    },
  ];

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
            pagination={{
              pageSize: pageSize, showSizeChanger: true, pageSizeOptions: ['3', '10', '15'], onChange: (page, pageside) => { setPageSize(pageside) }
            }}
          />
        </div>
      </Col>
    </Row>
  );
}
