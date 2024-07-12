import React from 'react';
import { Table } from 'antd';

const columns_dashboard = [
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
    title: <div data-testid='status'>Status</div>,
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
  }
];

const data_dashboard = [
  {
    key: '1',
    id: 1,
    employeeid: 1,
    leavetypeid: 101,
    startdate: '2024-07-01',
    enddate: '2024-07-05',
    status: 'Approved',
  },
  {
    key: '2',
    id: 2,
    employeeid: 2,
    leavetypeid: 102,
    startdate: '2024-07-10',
    enddate: '2024-07-15',
    status: 'Approved',
  },
  {
    key: '3',
    id: 3,
    employeeid: 3,
    leavetypeid: 103,
    startdate: '2024-08-01',
    enddate: '2024-08-05',
    status: 'Pending',
  },
  {
    key: '4',
    id: 4,
    employeeid: 4,
    leavetypeid: 104,
    startdate: '2024-09-01',
    enddate: '2024-09-10',
    status: 'Declined',
  },
  {
    key: '5',
    id: 5,
    employeeid: 5,
    leavetypeid: 105,
    startdate: '2024-10-01',
    enddate: '2024-10-05',
    status: 'Approved',
  },
];

const TablesDashboard = ({datadash = data_dashboard}) => <Table columns={columns_dashboard} dataSource={datadash} />;

export default TablesDashboard;
