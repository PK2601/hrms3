import React, { useState } from 'react';
import { Table, Input, Select, Button, Popconfirm } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const data_declinedleaves = [
    {
      key: '1',
      id: 1,
      employeeid: 1,
      leavetypeid: 101,
      startdate: '2024-07-01',
      enddate: '2024-07-05',
    },
    {
      key: '2',
      id: 2,
      employeeid: 2,
      leavetypeid: 102,
      startdate: '2024-07-10',
      enddate: '2024-07-15',
    },
    {
      key: '3',
      id: 3,
      employeeid: 3,
      leavetypeid: 103,
      startdate: '2024-08-01',
      enddate: '2024-08-05',
    },
    {
      key: '4',
      id: 4,
      employeeid: 4,
      leavetypeid: 104,
      startdate: '2024-09-01',
      enddate: '2024-09-10',
    },
    {
      key: '5',
      id: 5,
      employeeid: 5,
      leavetypeid: 105,
      startdate: '2024-10-01',
      enddate: '2024-10-05',
    },
  ];
  


const DeclinedLeaves = ({datadeclinedleaves = data_declinedleaves}) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('employeeid');
  const [data, setData] = useState(datadeclinedleaves);

  const handleSearch = (selectedColumn, value) => {
    setSearchColumn(selectedColumn);
    setSearchText(value);
  };

  const handleApprove = (key) => {
    setData(data.filter(item => item.key !== key));
  };

  const columns_declinedleaves = [
    {
      title: <div data-testid='id'>Id</div>,
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
        title: <div data-testid='employeeid'>Employee Id</div>,
        dataIndex: 'employeeid',
        key: 'employeeid',
        sorter: (a, b) => a.employeeid - b.employeeid,
      },
      {
        title: <div data-testid='leavetypeid'>Leave Type Id</div>,
        dataIndex: 'leavetypeid',
        key: 'leavetypeid',
        sorter: (a, b) => a.leavetypeid - b.leavetypeid,
      },
    {
      title: <div data-testid='startdate'>Start Date</div>,
      dataIndex: 'startdate',
      key: 'startdate',
      sorter: (a, b) => a.startdate.localeCompare(b.startdate),
    },
    {
      title: <div data-testid='enddate'>End Date</div>,
      dataIndex: 'enddate',
      key: 'enddate',
      sorter: (a, b) => a.enddate.localeCompare(b.enddate),
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
  ];

  const filteredData = data.filter(item => 
    item[searchColumn].toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Select
          defaultValue="employeeid"
          style={{ width: 150, marginRight: 8 }}
          onChange={value => setSearchColumn(value)}
        >
          <Option value="id">Id</Option>
          <Option value="employeeid">Employee Id</Option>
          <Option value="leavetypeid">Leave Type Id</Option>
          <Option value="startdate">Start Date</Option>
          <Option value="enddate">End Date</Option>
        </Select>
        <Search
          placeholder={`Search ${searchColumn}`}
          onSearch={value => handleSearch(searchColumn, value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ flex:1 }}
        />
      </div>
      <Table columns={columns_declinedleaves} dataSource={filteredData} />
    </div>
  );
};

export default DeclinedLeaves;
