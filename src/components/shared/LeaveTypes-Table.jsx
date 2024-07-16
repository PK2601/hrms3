import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Popconfirm } from 'antd';
import { MinusCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const data_leavetypes = [
  {
    key: '1',
    leave_type_id: 1,
    //leavetypecode: 101,
    leave_type_name: 'Annual Leave',
  },
  {
    key: '2',
    leave_type_id: 2,
    //leavetypecode: 102,
    leave_type_name: 'Medical Leave',
  },
  {
    key: '3',
    leave_type_id: 3,
    //leavetypecode: 103,
    leave_type_name: 'Sick Leave',
  },
];

const TablesLeaveTypes = ({dataleavetypes = data_leavetypes}) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('leave_type_name');
  const [data, setData] = useState(dataleavetypes);

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const response = await fetch('http://localhost:9036/leavetypes');
      if (response.ok) {
        const leavetypes = await response.json();
        setData(leavetypes);
      } else {
        console.error('Failed to fetch leave types:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };

  const handleSearch = (selectedColumn, value) => {
    setSearchColumn(selectedColumn);
    setSearchText(value);
  };

  const handleDelete = async (key) => {
    try {
      const response = await fetch(`http://localhost:9036/leavetypes/${key}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setData(data.filter(item => item.key !== key));
        console.log('Leave Type deleted successfully');
      } else {
        console.error('Error deleting leave type:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const columns_leavetypes = [
    {
      title: '',
      key: 'delete',
      width: 30,
      render: (record) => (
        <Popconfirm
          title="Are you sure to delete this row?"
          onConfirm={() => handleDelete(record.leave_type_id)}
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
      title: <div data-testid='leavetypeid'>Id</div>,
      dataIndex: 'leave_type_id',
      key: 'leave_type_id',
      sorter: (a, b) => a.leave_type_id - b.leave_type_id,
    },
    // {
    //   title: <div data-testid='leavetypecode'>Code</div>,
    //   dataIndex: 'leavetypecode',
    //   key: 'leavetypecode',
    //   sorter: (a, b) => a.leavetypecode - b.leavetypecode,
    // },
    {
      title: <div data-testid='leavetypename'>Leave Type Name</div>,
      dataIndex: 'leave_type_name',
      key: 'leave_type_name',
      sorter: (a, b) => a.leave_type_name.localeCompare(b.leave_type_name),
    },
  ];

  const filteredData = data.filter(item =>
    item[searchColumn].toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Select
          defaultValue="leave_type_name"
          style={{ width: 200, marginRight: 8 }}
          onChange={value => setSearchColumn(value)}
        >
          <Option value="leave_type_id">Id</Option>
          <Option value="leave_type_name">Leave Type Name</Option>
        </Select>
        <Search
          placeholder={`Search ${searchColumn}`}
          onSearch={value => handleSearch(searchColumn, value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>
      <Table columns={columns_leavetypes} dataSource={filteredData} />
    </div>
  );
};

export default TablesLeaveTypes;
