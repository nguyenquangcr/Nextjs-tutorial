import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Form, Input, Popconfirm, Typography, Badge, DatePicker } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getListOrder, updateStatusOrder } from 'slices/medicineSlice';
import { RootState } from 'store';
import FormatCurrency from 'utils/FormatCurrency';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
//style
import './styleTable.scss';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
export interface OrderProps {}

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
  marginBottom: '0',
};

const styleDivContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const styleSpanLabel: React.CSSProperties = {
  minWidth: '60px',
  marginRight: '1px',
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
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(getListOrder());
  }, []);

  const defaultColumns = [
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      render: (_: any, record: any) => {
        return (
          <Typography.Title
            level={5}
            style={{ minWidth: 'max-content', fontSize: '12px' }}
            className="abc"
          >
            {moment(record.createAt, 'YYYY-MM-DD HH:mm:ss').add(7, 'hour').format('DD/MM/YYYY')}
          </Typography.Title>
        );
      },
    },
    {
      title: 'Chi tiết đơn hàng',
      dataIndex: 'order',
      render: (_: any, record: any) => {
        return (
          <div style={{ minWidth: '125px' }}>
            <Form name="validate_other">
              <div style={styleDivContainer}>
                <span style={{ fontWeight: 'bold', ...styleSpanLabel }}>Tổng tiền: </span>
                <span>{FormatCurrency(record?.price)}</span>
              </div>

              {record?.order &&
                record?.order?.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <div style={styleDivContainer}>
                        <span style={styleSpanLabel}>Tên thuốc: </span>
                        <span>{item.medicine}</span>
                      </div>
                      <div style={styleDivContainer}>
                        <span style={styleSpanLabel}>Số lượng: </span>
                        <span>{item.count}</span>
                      </div>
                    </div>
                  );
                })}
            </Form>
          </div>
        );
      },
    },
    {
      title: 'Thông tin khách hàng',
      dataIndex: '',
      render: (_: any, record: any) => {
        return (
          <div style={{ minWidth: '100px' }}>
            <Form name="validate_other" style={{ width: '100%' }}>
              <div style={styleDivContainer}>
                <span style={styleSpanLabel}>Tên: </span>
                <span>{record?.name}</span>
              </div>
              <div style={styleDivContainer}>
                <span style={styleSpanLabel}>Email: </span>
                <span>{record?.email}</span>
              </div>
              <div style={styleDivContainer}>
                <span style={styleSpanLabel}>Số điện thoại: </span>
                <span>{record?.phoneNumber}</span>
              </div>
              <div style={styleDivContainer}>
                <span style={styleSpanLabel}>Địa chỉ: </span>
                <span>{record?.address}</span>
              </div>
              <div style={styleDivContainer}>
                <span style={styleSpanLabel}>Ghi chú: </span>
                <span>{record?.note}</span>
              </div>
            </Form>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_: any, record: any) => {
        return (
          <div style={{ minWidth: '50px' }}>
            {record.status ? (
              <Badge status="success" text="Đã xử lý" />
            ) : (
              <Badge status="processing" text="Đang xử lý" />
            )}
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      render: (_: any, record: any) => (
        <>
          {record.status == false && (
            <div
              style={{ color: 'blue', cursor: 'pointer', margin: '5px' }}
              onClick={() => dispatch(updateStatusOrder(record.id, { status: true }))}
            >
              Hoàn thành
            </div>
          )}
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

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: string
  ) => {
    console.log('Formatted Selected Time: ', dateString);
    dispatch(
      getListOrder({
        startDay: dateString,
        endDay: moment(dateString).add(1, 'day').format('YYYY-MM-DD'),
      })
    );
  };

  return (
    <>
      <Typography.Title
        level={5}
        style={{ minWidth: '100px', marginLeft: '10px', fontSize: '15px' }}
      >
        Chọn ngày để xem đơn hàng
      </Typography.Title>
      <DatePicker
        placeholder="Chọn ngày"
        style={{ margin: '0 10px' }}
        format="YYYY-MM-DD"
        onChange={onChange}
      />
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={arrOrder}
        columns={defaultColumns}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '20'],
          onChange: (page, pageside) => {
            setPageSize(pageside);
          },
        }}
      />
    </>
  );
}
