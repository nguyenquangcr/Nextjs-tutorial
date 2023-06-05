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
  Badge,
  Select,
  Switch,
} from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedicine, getListMedicine } from 'slices/medicineSlice';
import { domain } from 'Constant';
import axios from 'axios';
import { RootState } from 'store';
import { openNotificationWithIcon } from '../notificationComponent';
import { Editor } from '@tinymce/tinymce-react';
import {
  deletePostUser,
  getDetailPostUser,
  getListPostUser,
  updateStatusPostUser,
  updateTagPostUser,
} from 'slices/postUser';
import moment from 'moment';

export interface MedicineProps {}

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

export default function PostUserAdminComponent(props: MedicineProps) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  //store
  const listPostUser = useSelector((state: RootState) => state.postUser.listPostUser);
  const postUserDetail = useSelector((state: RootState) => state.postUser.postUserDetail);
  //state
  const [loadding, setLoadding] = useState(false);
  const [typeForm, setTypeForm] = useState('ADD');
  const [idUpdate, setidUpdate] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(getListPostUser());
  }, []);

  const handleChange = (value: string, id: string) => {
    return dispatch(updateTagPostUser(id, value));
  };

  const onChange = (id: any, checked: boolean) => {
    return dispatch(updateStatusPostUser(id, checked));
  };

  const defaultColumns: any = [
    {
      title: 'Tên bài viết',
      dataIndex: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'time',
      defaultSortOrder: 'descend',
      render: (_: any, record: any) => {
        return (
          <span>
            {moment(record.createAt, 'YYYY-MM-DD HH:mm:ss')
              .add(7, 'hours')
              .format('DD/MM/YYYY HH:mm:ss')}
          </span>
        );
      },
      sorter: (a: any, b: any): any => {
        return (new Date(a.createAt) as any) - (new Date(b.createAt) as any) ;
      },
    },
    {
      title: 'Nhãn dán',
      dataIndex: 'Tags',
      render: (_: any, record: any) => {
        return (
          <Select
            value={record?.tags}
            style={{ width: 120 }}
            onChange={(value) => handleChange(value, record.id)}
            options={[
              { value: 'lamdep', label: 'Làm đẹp' },
              { value: 'doisong', label: 'Đời sống' },
              { value: 'amthuc', label: 'Ấm thực' },
              { value: 'dulich', label: 'Du lịch' },
              { value: 'tuvi', label: 'Tử vi' },
              { value: 'thoitrang', label: 'Thời trang' },
              { value: 'suckhoe', label: 'Sức khỏe' },
              { value: 'khampha', label: 'Khám phá' },
              { value: 'congnghe', label: 'Công nghệ' },
            ]}
          />
        );
      },
      sorter: (a: any, b: any): any => {
        return a.tags.length - b.tags.length;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_: any, record: any) => {
        return (
          <>
            <Switch checked={record?.status} onChange={(value) => onChange(record?.id, value)} />
          </>
        );
      },
    },
    {
      title: 'Hình bài viết',
      dataIndex: 'linkImage',
      render: (_: any, record: any) => {
        return (
          <div>
            <div>
              <img style={{ width: '150px' }} src={record?.linkImage} alt={record?.title} />
            </div>
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      render: (_: any, record: any) => (
        <>
          <div
            style={{ color: 'blue', cursor: 'pointer', margin: '5px' }}
            onClick={() => dispatch(getDetailPostUser(record.id))}
          >
            Xem chi tiết
          </div>
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

  const funcFillDataMedicin = (value: any) => {
    setidUpdate(value?.id);
    setTypeForm('UPDATE');
    for (const property in value) {
      if (property !== 'image') form.setFieldValue(property, value[property]);
    }
  };

  const handleDelete = (value: any) => {
    dispatch(deletePostUser(value?.id));
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
        if (values[property]?.file?.originFileObj)
          data.append('image', values[property]?.file?.originFileObj);
      } else data.append(property, values[property]);
    }
    const url = `${domain}/medicine`;

    if (typeForm == 'UPDATE') {
      return await axios
        .put(`${url}/${idUpdate}`, data)
        .then((res: any) => {
          setLoadding(false);
          form.resetFields();
          setTypeForm('ADD');
          dispatch(getListMedicine());
          openNotificationWithIcon(200, 'Cập nhật thành công');
        })
        .catch((err: any) => {
          setLoadding(false);
          openNotificationWithIcon(500, 'Cập nhật thất bại');
          console.log('err:', err);
        });
    } else
      return await axios
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

  return (
    <Row gutter={24}>
      {/* ROW ONE */}
      <Col lg={16} xs={24}>
        <div style={{ margin: '5px', height: '100%' }}>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={listPostUser}
            columns={defaultColumns}
            pagination={{
              pageSize: pageSize,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30'],
              onChange: (page, pageside) => {
                setPageSize(pageside);
              },
            }}
          />
        </div>
      </Col>
      <Col lg={8} xs={24}>
        <div style={containerRight}>
          <Editor
            value={postUserDetail?.content}
            disabled
            init={{
              height: 500,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste imagetools wordcount',
              ],
              toolbar:
                'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>
      </Col>
    </Row>
  );
}
