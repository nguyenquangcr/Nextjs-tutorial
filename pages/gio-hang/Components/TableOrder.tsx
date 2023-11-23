/* eslint-disable @next/next/no-img-element */
import { Button, Form, Input, Table, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import FormatCurrency from 'utils/FormatCurrency';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateArrShoping } from 'slices/medicineSlice';

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

const TableOrder = () => {
  const dispatch = useDispatch();
  const refcolumn: React.MutableRefObject<number> = useRef(0);
  //store
  const arrProduct = useSelector((state: RootState) => state.medicine.arrShoping);

  useEffect(() => {
    refcolumn.current = window.innerWidth;
  }, []);

  const mediaColumns = [
    {
      title: 'Thông tin sản phẩm',
      dataIndex: 'name',
      width: '90%',
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
                <Button
                  disabled={record?.count <= 0}
                  className="minus-class"
                  onClick={() => actionChangeCountMedicine(record.key, 'minus')}
                >
                  -
                </Button>
                <Typography.Title
                  level={5}
                  style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
                >
                  <Input className="class-input-count" value={record?.count} />
                </Typography.Title>
                <Button
                  className="plus-class"
                  onClick={() => actionChangeCountMedicine(record.key, 'plus')}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) =>
        arrProduct.length >= 1 ? <DeleteOutlined onClick={() => handleDelete(record.key)} /> : null,
    },
  ];

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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography.Title
              level={5}
              style={{ color: '#000', margin: '10px', cursor: 'pointer', border: 'none' }}
            >
              {FormatCurrency(record?.price)}
            </Typography.Title>
          </div>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: '',
      render: (_: any, record: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              disabled={record?.count <= 0}
              className="minus-class"
              onClick={() => actionChangeCountMedicine(record.key, 'minus')}
            >
              -
            </Button>
            <Typography.Title
              level={5}
              style={{ color: '#000', margin: '10px', cursor: 'pointer' }}
            >
              <Input className="class-input-count" value={record?.count} />
            </Typography.Title>
            <Button
              className="plus-class"
              onClick={() => actionChangeCountMedicine(record.key, 'plus')}
            >
              +
            </Button>
          </div>
        );
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
        arrProduct.length >= 1 ? <DeleteOutlined onClick={() => handleDelete(record.key)} /> : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const actionChangeCountMedicine = (key: any, type: any) => {
    let newArrProduct: any = [];
    arrProduct?.map((item) => {
      if (item?.key == key) {
        if (type == 'minus' && item?.count > 0) {
          return newArrProduct.push({
            ...item,
            count: item.count - 1,
          });
        } else if (type == 'plus')
          return newArrProduct.push({
            ...item,
            count: item.count + 1,
          });
      } else newArrProduct.push(item);
    });
    dispatch(updateArrShoping(newArrProduct));
  };

  const handleDelete = (key: any) => {
    const newData: any = arrProduct.filter((item: any) => item.key !== key);
    dispatch(updateArrShoping(newData));
  };

  return (
    <div>
      <div style={{ margin: '5px' }}>
        {refcolumn.current > 600 ? (
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={arrProduct}
            columns={defaultColumns}
            pagination={false}
          />
        ) : (
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={arrProduct}
            columns={mediaColumns}
            pagination={false}
          />
        )}
      </div>
    </div>
  );
};

export default TableOrder;
