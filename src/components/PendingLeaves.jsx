import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Select, Button, Popconfirm } from 'antd';
import { CheckCircleFilled, MinusCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const data_pendingleaves = [
    {
      key: '1',
      id: 1,
      emp_id: 1,
      leave_type_id: 101,
      start_date: '2024-07-01',
      end_date: '2024-07-05',
    },
    {
      key: '2',
      id: 2,
      emp_id: 2,
      leave_type_id: 102,
      start_date: '2024-07-10',
      end_date: '2024-07-15',
    },
    {
      key: '3',
      id: 3,
      emp_id: 3,
      leave_type_id: 103,
      start_date: '2024-08-01',
      end_date: '2024-08-05',
    },
    {
      key: '4',
      id: 4,
      emp_id: 4,
      leave_type_id: 104,
      start_date: '2024-09-01',
      end_date: '2024-09-10',
    },
    {
      key: '5',
      id: 5,
      emp_id: 5,
      leave_type_id: 105,
      start_date: '2024-10-01',
      end_date: '2024-10-05',
    },
  ];
  


const PendingLeaves = ({datapendingleaves = data_pendingleaves}) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('emp_id');
  const [data, setData] = useState(datapendingleaves);

  const fetchPendingLeaves = async () => {
    try {
      const response = await fetch('http://localhost:9036/leaves/status?status=null');
      if (response.ok) {
        const pendingleaves = await response.json();
        setData(pendingleaves);
      } else {
        console.error('Failed to fetch pending leaves:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching pending leaves:', error);
    }
  };

  const refreshTable = useCallback(async () => {
    await fetchPendingLeaves();
  }, []);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  console.log(data);

  const handleSearch = (selectedColumn, value) => {
    setSearchColumn(selectedColumn);
    setSearchText(value);
  };

  const handleDecline = async (record) => {
    console.log("key",record);
    const modifiedleaveData = {
      emp_id: record.emp_id,
      leave_type_id: record.leave_type_id,
      start_date: record.start_date,
      end_date: record.end_date,
      approval_Status: false,
      approved_by: 1
    };
    try {
      const response = await fetch("http://localhost:9036/leaves", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedleaveData),
      });
  
      if (response.ok) {
        console.log('Leave declined successfully');
        //setData(data.filter(item => item.key !== key));
        refreshTable();
      } else {
        console.error('Error declining leave:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  const handleApprove = (key) => {
    setData(data.filter(item => item.key !== key));
  };

  const columns_pendingleaves = [
    // {
    //   title: <div data-testid='id'>Id</div>,
    //   dataIndex: 'id',
    //   key: 'id',
    //   sorter: (a, b) => a.id - b.id,
    // },
    {
        title: <div data-testid='employeeid'>Employee Id</div>,
        dataIndex: 'emp_id',
        key: 'emp_id',
        sorter: (a, b) => a.emp_id - b.emp_id,
      },
      {
        title: <div data-testid='leavetypeid'>Leave Type Id</div>,
        dataIndex: 'leave_type_id',
        key: 'leave_type_id',
        sorter: (a, b) => a.leave_type_id - b.leave_type_id,
      },
    {
      title: <div data-testid='startdate'>Start Date</div>,
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a, b) => a.start_date.localeCompare(b.start_date),
    },
    {
      title: <div data-testid='enddate'>End Date</div>,
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
    },
    {
        title: <div data-testid='approve'>Approve</div>,
        key: 'approve',
        width: 30,
        render: (record) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Popconfirm
              title="Are you sure to approve?"
              onConfirm={() => handleApprove(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                style={{ backgroundColor: 'green', borderColor: 'green' }}
                shape="circle"
                icon={<CheckCircleFilled />}
                size="small"
                data-testid='approvebutton'
              />
            </Popconfirm>
          </div>
        ),
      },
      {
        title: <div data-testid='decline'>Decline</div>,
        key: 'delete',
        width: 30,
        render: (record) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Popconfirm
              title="Are you sure to decline?"
              onConfirm={() => handleDecline(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<MinusCircleFilled />}
                size="small"
                data-testid='declinebutton'
              />
            </Popconfirm>
          </div>
        ),
      },      
  ];

  const filteredData = data.filter(item => 
    item[searchColumn].toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Select
          defaultValue="emp_id"
          style={{ width: 150, marginRight: 8 }}
          onChange={value => setSearchColumn(value)}
        >
          <Option value="emp_id">Employee Id</Option>
          <Option value="leave_type_id">Leave Type Id</Option>
          <Option value="start_date">Start Date</Option>
          <Option value="end_date">End Date</Option>
        </Select>
        <Search
          placeholder={`Search ${searchColumn}`}
          onSearch={value => handleSearch(searchColumn, value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ flex:1 }}
        />
      </div>
      <Table columns={columns_pendingleaves} dataSource={filteredData} />
    </div>
  );
};

export default PendingLeaves;
