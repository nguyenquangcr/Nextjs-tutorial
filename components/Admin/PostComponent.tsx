import { Editor } from '@tinymce/tinymce-react';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
  Upload,
} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPost, getListPost, getListPostSearch } from 'slices/postUser';
import { RootState } from 'store';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import './stylePost.scss';

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
  const [editing, setEditing] = React.useState(false);
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

const { Title } = Typography;

const PostComponent = () => {
  const dispatch = useDispatch();
  const listPost = useSelector((state: RootState) => state.postUser.listPost);
  const detailPost = useSelector((state: RootState) => state.postUser.detailPost);
  //state
  const [pageSize, setPageSize] = React.useState(10);
  const [valueContentPost, setValueContentPost] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getListPost('thoi-trang'));
  }, []);

  useEffect(() => {
    detailPost !== null && setValueContentPost(detailPost?.content);
  }, [detailPost]);

  const defaultColumns: any = [
    {
      title: 'Tên bài viết',
      dataIndex: 'title',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'time',
      defaultSortOrder: 'descend',
      render: (_: any, record: any) => {
        return (
          <span>{moment(record.time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}</span>
        );
      },
      sorter: (a: any, b: any): any => (new Date(a.time) as any) - (new Date(b.time) as any),
    },
    {
      title: 'Hình bài viết',
      dataIndex: '',
      render: (_: any, record: any) => {
        return (
          <div>
            <div>
              <img style={{ width: '150px' }} src={record?.images?.normal} alt={record?.slug} />
            </div>
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      render: (_: any, record: any) => {
        return (
          <>
            <div>
              <a
                style={{ color: 'blue', marginLeft: '10px' }}
                onClick={() => {
                  setIsModalOpen(true);
                  dispatch(getDetailPost(record?.pid, record.slug));
                }}
              >
                Xem nội dung
              </a>
            </div>
            <Popconfirm
              style={{ cursor: 'pointer' }}
              title="Bạn có chắc chắn xóa?"
              onConfirm={() => {
                console.log('OK');
              }}
            >
              <a style={{ color: 'red', margin: '5px' }}>Xóa</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleChange = (value: string) => {
    dispatch(getListPost(value));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { Search } = Input;
  const onSearch = (value: string) => dispatch(getListPostSearch(value));

  return (
    <div>
      <Row gutter={24}>
        {/* ROW ONE */}
        <Col lg={14} xs={24}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '80%', margin: '15px 0' }}>
              <Title level={4}>Lựa chọn danh mục</Title>
              <Select
                defaultValue="thoi-trang"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: 'thoi-trang', label: 'Thời trang' },
                  { value: 'lam-dep', label: 'Làm đẹp' },
                  { value: 'doi-song', label: 'Đời sống' },
                  { value: 'am-thuc', label: 'Ẩm thực' },
                  { value: 'du-lich', label: 'Du lịch' },
                  { value: 'tu-vi', label: 'Tử vi' },
                  { value: 'suc-khoe', label: 'Sức khỏe' },
                  { value: 'kham-pha', label: 'Khám phá' },
                  { value: 'cong-nghe', label: 'Công nghệg' },
                ]}
              />
            </div>
            <Search placeholder="Tìm kiếm bài viết" onSearch={onSearch} enterButton />
          </div>
          <div style={{ margin: '5px', height: '100%' }}>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={listPost}
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
        <Col lg={10} xs={24}>
          <div style={containerRight}>
            <Form
              labelCol={{ span: 4 }}
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
                <Input.TextArea />
              </Form.Item>

              <Form.Item label="Mô tả" name="description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Nội dung" name="description">
                <Editor
                  init={{
                    height: 300,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste imagetools wordcount',
                    ],
                    toolbar:
                      'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                />
              </Form.Item>
              <Form.Item name="tag" label="Danh mục">
                <Select
                  defaultValue="thoi-trang"
                  //   style={{ width: 120 }}
                  //   onChange={handleChange}
                  options={[
                    { value: 'thoi-trang', label: 'Thời trang' },
                    { value: 'lam-dep', label: 'Làm đẹp' },
                    { value: 'doi-song', label: 'Đời sống' },
                    { value: 'am-thuc', label: 'Ẩm thực' },
                    { value: 'du-lich', label: 'Du lịch' },
                    { value: 'tu-vi', label: 'Tử vi' },
                    { value: 'suc-khoe', label: 'Sức khỏe' },
                    { value: 'kham-pha', label: 'Khám phá' },
                    { value: 'cong-nghe', label: 'Công nghệg' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="upload" label="Hình ảnh">
                <Upload maxCount={1} accept="image/png, image/jpeg">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Thêm bài viết
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
      <Modal
        className={'post-container'}
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div dangerouslySetInnerHTML={{ __html: valueContentPost }} />
      </Modal>
    </div>
  );
};

export default PostComponent;
