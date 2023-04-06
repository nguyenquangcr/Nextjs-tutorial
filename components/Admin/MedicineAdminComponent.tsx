import React, { useState } from 'react';
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
} from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
// import axios from 'axios'


export interface MedicineProps { }

const headerImage: React.CSSProperties = {
    width: '100vw',
    height: '30px'
};

const containerRight: React.CSSProperties = {
    padding: ' 16px',
    background: ' #fff',
    borderRadius: ' 1.2rem',
    marginLeft: ' auto',
    top: ' 1rem',
    width: '95%',
    margin: '10px auto'
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
    //store
    //   const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);
    const arrMedicine: any = [{
        key: '0',
        name: 'Thuoc 1',
        price: '32000',
        address: 'London, Park Lane no. 0',
    },];
    //state


    const defaultColumns = [
        {
            title: 'Thông tin sản phẩm',
            dataIndex: 'name',
            width: '35%',
            //   render: (_: any, record: any) => {
            //     return (<div style={{ display: 'flex', alignItems: 'center' }}>
            //       <img
            //         style={{
            //           width: '52px', height: '52px',
            //           boxShadow: '0 0 0 1px #e4e8ed',
            //           borderRadius: '7.2px',
            //           padding: '2px'
            //         }}
            //         alt="example"
            //         src={record?.image}
            //       />
            //       <Typography.Title level={5}
            //         style={{ color: '#000', margin: '10px', cursor: 'pointer' }}>{record.name}
            //       </Typography.Title>

            //     </div>)
            //   },
        },
        {
            title: 'Giá thành',
            dataIndex: 'price',
            //   render: (_: any, record: any) => {
            //     return (<div style={{ display: 'flex', alignItems: 'center' }}>
            //       <Typography.Title level={5}
            //         style={{ color: '#000', margin: '10px', cursor: 'pointer', border: 'none' }}>
            //         {FormatCurrency(record?.price)}
            //       </Typography.Title>
            //     </div>)
            //   },

        },
        {
            title: 'Số lượng',
            dataIndex: '',
            //   render: (_: any, record: any) => {
            //     return (<div style={{ display: 'flex', alignItems: 'center' }}>
            //       <Button disabled={record?.count <= 0} className='minus-class' onClick={() => actionChangeCountMedicine(record.key, 'minus')}>-</Button>
            //       <Typography.Title level={5}
            //         style={{ color: '#000', margin: '10px', cursor: 'pointer' }}>
            //         <Input className='class-input-count' value={record?.count} />
            //       </Typography.Title>
            //       <Button className='plus-class' onClick={() => actionChangeCountMedicine(record.key, 'plus')}>+</Button>
            //     </div>)
            //   },
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            //   render: (_: any, record: any) =>
            //     arrProduct.length >= 1 ? (
            //       <DeleteOutlined onClick={() => handleDelete(record.key)} />
            //     ) : null,
        },
        {
            title: '',
            dataIndex: '',
            render: (_: any, record: { key: React.Key }) => <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <a>Delete</a>
            </Popconfirm>
        },
    ];

    const handleDelete = (key: React.Key) => {
        console.log('key:', key)
    };

    const customRequest = async (options: any) => {
        options.onProgress({ percent: 0 });
        options.onProgress({ percent: 100 });
        options.onSuccess();
    };
    const [fileList, setFileList] = useState<any>([]);

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        // const file = files[0];
        // const data = new FormData();
        // data.append('file', file);
        // const headers = {
        //     authorization: `Bearer ${localStorage.getItem('accessToken')}`
        // };

        // const url = `${process.env.REACT_API_DATA_BLEND}/projects/${idProject}/connections/${connection}/upload`;

        // const config = {
        //     onUploadProgress: function (progressEvent) {
        //         var percentCompleted = Math.round(
        //             (progressEvent.loaded * 100) / progressEvent.total
        //         );
        //         setProgress(percentCompleted);
        //     }
        // };

        // await axios
        //     .post(url, data, config)
        //     .then((res: any) => {
        //         console.log('res:', res)
        //     })
        //     .catch((err: any) => {
        //         console.log('err:', err)
        //     });
    };

    const onUploadChange = (info: any) => {
        setFileList([...info.fileList]);
    };

    return (
        <Row gutter={24}>
            {/* ROW ONE */}
            <Col lg={16} xs={24}>
                <div style={{ margin: '5px' }}>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={arrMedicine}
                        columns={defaultColumns}
                        pagination={false}
                    />
                </div>
            </Col>
            <Col lg={8} xs={24}>
                <div style={containerRight}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Unit"
                            name="unit"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Note"
                            name="note"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true }]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Tag"
                            name="tag"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="upload" label="Upload">
                            <Upload
                                customRequest={customRequest}
                                // onRemove={onRemove}
                                // ref={ref}
                                fileList={fileList}
                                onChange={onUploadChange}
                                maxCount={1} accept="image/png, image/jpeg">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}
