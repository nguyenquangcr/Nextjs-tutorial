import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Table,
    Form,
    Input,
    Popconfirm,
    Button,
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
import { CreateUser, deleteUser, getListUser } from 'slices/userSlice';

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

export default function UserAdminComponent(props: MedicineProps) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    //store
    const listUser = useSelector((state: RootState) => state.user.listUser);
    const loading = useSelector((state: RootState) => state.user.loading);
    //state
    const [typeForm, setTypeForm] = useState('ADD');
    const [idUpdate, setidUpdate] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(getListUser());
    }, []);

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
            title: 'Quyền',
            dataIndex: 'role',
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
                </Popconfirm>
                    {/* <a style={{ color: 'blue', marginLeft: '10px' }} onClick={() => funcFillDataMedicin(record)}> Chỉnh sửa</a> */}
                </>
            ),
        },
    ];

    // const funcFillDataMedicin = (value: any) => {
    //     setidUpdate(value?.id)
    //     setTypeForm("UPDATE");
    //     for (const property in value) {
    //         if (property !== 'image') form.setFieldValue(property, value[property])
    //     }
    // }

    const handleDelete = (value: any) => {
        dispatch(deleteUser(value?.id));
    };
    const onFinish = async (values: any) => {
        console.log('values:', values);
        const { name, email, password } = values;
        dispatch(CreateUser({
            name, email, password, role: 'member'
        }, form))
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
                        dataSource={listUser}
                        columns={defaultColumns}
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
                        disabled={loading ? true : false}
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

                        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                            <Input type='email' />
                        </Form.Item>

                        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                            <Input.Password />
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
                            <Button loading={loading} type="primary" htmlType="submit">
                                {typeForm == 'UPDATE' ? 'Chỉnh sửa' : "Thêm"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}
