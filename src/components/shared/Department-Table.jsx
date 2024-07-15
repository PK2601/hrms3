import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Popconfirm } from 'antd';
import { MinusCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const data_dept = [
  {
    key: '1',
    dept_id: 1,
    //departmentcode: 101,
    Dept_Name: 'Human Resources',
  },
  {
    key: '2',
    dept_id: 2,
    //departmentcode: 102,
    Dept_Name: 'Information Technology',
  },
  {
    key: '3',
    dept_id: 3,
    //departmentcode: 103,
    Dept_Name: 'Finance',
  },
  {
    key: '4',
    dept_id: 4,
    //departmentcode: 104,
    Dept_Name: 'Sales',
  },
  {
    key: '5',
    dept_id: 5,
    //departmentcode: 105,
    Dept_Name: 'Marketing',
  },
];


const TablesDept = ({datadept = data_dept}) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('Dept_Name');
  const [data, setData] = useState(datadept);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:9036/departments');
      if (response.ok) {
        const departments = await response.json();
        console.log(departments);
        setData(departments);
      } else {
        console.error('Failed to fetch departments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleSearch = (selectedColumn, value) => {
    setSearchColumn(selectedColumn);
    setSearchText(value);
  };

  const handleDelete = async (key) => {
    try {
      const response = await fetch(`http://localhost:9036/departments/${key}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setData(data.filter(item => item.key !== key));
        console.log('Departments deleted successfully');
      } else {
        console.error('Error deleting departmens:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const columns_dept = [
    {
      title: '',
      key: 'delete',
      width: 30,
      render: (record) => (
        <Popconfirm
          title="Are you sure to delete this row?"
          onConfirm={() => handleDelete(record.dept_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<MinusCircleFilled />}
            size="small"
            data-testid='deletebutton'
          />
        </Popconfirm>
      ),
    },
    {
      title: <div data-testid='departmentid'>Id</div>,
      dataIndex: 'dept_id',
      key: 'departmentid',
      sorter: (a, b) => a.departmentid - b.departmentid,
    },
    // {
    //   title: <div data-testid='departmentcode'>Code</div>,
    //   dataIndex: 'departmentcode',
    //   key: 'departmentcode',
    //   sorter: (a, b) => a.departmentcode - b.departmentcode,
    // },
    {
      title: <div data-testid='departmentname'>Department Name</div>,
      dataIndex: 'Dept_Name',
      key: 'departmentname',
      sorter: (a, b) => a.departmentname.localeCompare(b.departmentname),
    },
  ];

  const filteredData = data.filter(item => 
    item[searchColumn].toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Select
          defaultValue="departmentname"
          style={{ width: 200, marginRight: 8 }}
          onChange={value => setSearchColumn(value)}
        >
          <Option value="departmentid">Id</Option>
          <Option value="departmentname"> Department Name</Option>
        </Select>
        <Search
          placeholder={`Search ${searchColumn}`}
          onSearch={value => handleSearch(searchColumn, value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ flex:1 }}
        />
      </div>
      <Table columns={columns_dept} dataSource={filteredData} />
    </div>
  );
};

export default TablesDept;
