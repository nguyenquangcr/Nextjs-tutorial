import React, { useEffect, useState } from 'react';
import {
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
  UploadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedicine, getListMedicine } from 'slices/medicineSlice';
import { domain } from 'Constant';
import axios from 'axios';
import { RootState } from 'store';
import { openNotificationWithIcon } from '../notificationComponent';
import FormatCurrency from 'utils/FormatCurrency';

export interface MedicineProps { }

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

export default function MedicineAdminComponent(props: MedicineProps) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  //store
  const arrMedicine = useSelector((state: RootState) => state.medicine.arrMedicine);
  //state
  const [loadding, setLoadding] = useState(false);
  const [columnTable, setColumnTable] = useState<any>([]);
  const [typeForm, setTypeForm] = useState('ADD');
  const [idUpdate, setidUpdate] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(getListMedicine());
  }, []);

  useEffect(() => {
    if (window.innerWidth > 1000) setColumnTable(defaultColumns);
    else setColumnTable(mediaColumns);
  }, []);

  const defaultColumns = [
    {
      title: 'Thông tin sản phẩm',
      dataIndex: 'name',
      width: '35%',
      render: (_: any, record: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{
                width: '52px',
                height: '52px',
                boxShadow: '0 0 0 1px #e4e8ed',
                borderRadius: '7.2px',
                padding: '2px',
              }}
              alt="example"
              src={record?.image}
            />
            <Typography.Title
              level={5}
              style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
            >
              {record.name}
            </Typography.Title>
          </div>
        );
      },
    },
    {
      title: 'Giá thành',
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
      title: 'Đơn vị',
      dataIndex: 'unit',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
    },
    {
      title: '',
      dataIndex: '',
      render: (_: any, record: { key: React.Key }) => (
        <><Popconfirm
          style={{ cursor: 'pointer' }}
          title="Bạn có chắc chắn xóa?"
          onConfirm={() => handleDelete(record)}
        >
          <a style={{ color: 'red' }}>
            Xóa
          </a>
        </Popconfirm><a style={{ color: 'blue', marginLeft: '10px' }} onClick={() => funcFillDataMedicin(record)}> Chỉnh sửa</a></>
      ),
    },
  ];

  const mediaColumns = [
    {
      title: 'Thông tin sản phẩm',
      dataIndex: 'name',
      width: '75%',
      render: (_: any, record: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{
                width: '52px',
                height: '52px',
                boxShadow: '0 0 0 1px #e4e8ed',
                borderRadius: '7.2px',
                padding: '2px',
              }}
              alt="example"
              src={record?.image}
            />
            <div>
              <Typography.Title
                level={5}
                style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
              >
                {record.name}
              </Typography.Title>
              <Typography.Title
                level={5}
                style={{ color: '#000', margin: '10px', cursor: 'pointer', border: 'none' }}
              >
                {FormatCurrency(record?.price)}
              </Typography.Title>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography.Title
                  level={5}
                  style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
                >
                  {record.unit}
                </Typography.Title>
                <Typography.Title
                  level={5}
                  style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
                >
                  {record.note}
                </Typography.Title>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      render: (_: any, record: { key: React.Key }) => (
        <><Popconfirm
          style={{ cursor: 'pointer' }}
          title="Bạn có chắc chắn xóa?"
          onConfirm={() => handleDelete(record)}
        ><a style={{ color: 'red' }}> Xóa</a>
        </Popconfirm><a style={{ color: 'blue', marginLeft: '10px' }} onClick={() => funcFillDataMedicin(record)}> Chỉnh sửa</a></>
      ),
    },
  ];

  const funcFillDataMedicin = (value: any) => {
    setidUpdate(value?.id)
    setTypeForm("UPDATE");
    for (const property in value) {
      if (property !== 'image') form.setFieldValue(property, value[property])
    }
  }

  const handleDelete = (value: any) => {
    dispatch(deleteMedicine(value?.id));
  };

  const customRequest = async (options: any) => {
    options.onProgress({ percent: 0 });
    options.onProgress({ percent: 100 });
    options.onSuccess();
  };
  const [fileList, setFileList] = useState<any>([]);

  const onFinish = async (values: any) => {
    setLoadding(true);
    const { name, description, price, note, tag, unit, upload } = values;
    const data = new FormData();

    for (const property in values) {
      if (property == 'upload') {
        if (values[property]?.file?.originFileObj) data.append('image', values[property]?.file?.originFileObj);
      }
      else data.append(property, values[property]);
    }
    const url = `${domain}/medicine`;

    if (typeForm == "UPDATE") {
      return await axios
        .put(`${url}/${idUpdate}`, data)
        .then((res: any) => {
          setLoadding(false);
          form.resetFields();
          setTypeForm("ADD")
          dispatch(getListMedicine());
          openNotificationWithIcon(200, 'Cập nhật thành công');
        })
        .catch((err: any) => {
          setLoadding(false);
          openNotificationWithIcon(500, 'Cập nhật thất bại');
          console.log('err:', err);
        });
    } else return await axios
      .post(url, data)
      .then((res: any) => {
        setLoadding(false);
        form.resetFields();
        dispatch(getListMedicine());
        openNotificationWithIcon(200, 'Thêm thành công');
      })
      .catch((err: any) => {
        setLoadding(false);
        openNotificationWithIcon(500, 'Thêm thất bại');
        console.log('err:', err);
      });

  };

  const onUploadChange = (info: any) => {
    setFileList([...info.fileList]);
  };

  return (
    <Row gutter={24}>
      {/* ROW ONE */}
      <Col lg={16} xs={24}>
        <div style={{ margin: '5px', height: '100%' }}>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={arrMedicine}
            columns={columnTable}
            pagination={{
              pageSize: pageSize, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], onChange: (page, pageside) => { setPageSize(pageside) }
            }}
          />
        </div>
      </Col>
      <Col lg={8} xs={24}>
        <div style={containerRight}>
          <Form
            form={form}
            disabled={loadding ? true : false}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Mô tả" name="description">
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Đơn vị" name="unit" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Ghi chú" name="note">
              <Input />
            </Form.Item>

            <Form.Item label="Giá bán" name="price" rules={[{ required: true }]}>
              <InputNumber style={{ minWidth: '100px' }} addonAfter="VND" />
            </Form.Item>

            <Form.Item label="Danh mục" name="tags" >
              <Input />
            </Form.Item>

            <Form.Item name="upload" label="Hình ảnh">
              <Upload
                customRequest={customRequest}
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={1}
                accept="image/png, image/jpeg"
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              {
                typeForm == 'UPDATE' && <Button style={{ marginRight: '10px' }} type="default" onClick={() => {
                  setTypeForm("ADD");
                  form.resetFields();
                }}>
                  Hủy
                </Button>
              }
              <Button loading={loadding} type="primary" htmlType="submit">
                {typeForm == 'UPDATE' ? 'Chỉnh sửa' : "Thêm"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
