import React, { useState, useEffect } from 'react';
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
    title: <div data-testid='status'>Status</div>,
    dataIndex: 'approval_Status',
    key: 'approval_Status',
    render: (approvalStatus) => {
      if (approvalStatus === false) {
        return 'Declined';
      }
      if (approvalStatus === true) {
        return 'Approved';
      }
      if (approvalStatus === null) {
        return 'Pending';
      }
      return approvalStatus;
    },
    sorter: (a, b) => {
      const statusOrder = { 'Approved': 1, 'Declined': 2, 'Pending': 3 };

      if (
        typeof a.approval_Status === 'boolean' ||
        typeof b.approval_Status === 'boolean' ||
        a.approval_Status === null ||
        b.approval_Status === null
      ) {
        const aValue = a.approval_Status === true ? 'Approved' :
                       a.approval_Status === false ? 'Declined' :
                       a.approval_Status === null ? 'Pending' : '';

        const bValue = b.approval_Status === true ? 'Approved' :
                       b.approval_Status === false ? 'Declined' :
                       b.approval_Status === null ? 'Pending' : '';

        return statusOrder[aValue] - (statusOrder[bValue]);
      } else {
        return a.approval_Status.localeCompare(b.approval_Status);
      }
    },
  }
];

const data_dashboard = [
  {
    key: '1',
    id: 1,
    emp_id: 1,
    leave_type_id: 101,
    start_date: '2024-07-01',
    end_date: '2024-07-05',
    approval_Status: 'Approved',
  },
  {
    key: '2',
    id: 2,
    emp_id: 2,
    leave_type_id: 102,
    start_date: '2024-07-10',
    end_date: '2024-07-15',
    approval_Status: 'Approved',
  },
  {
    key: '3',
    id: 3,
    emp_id: 3,
    leave_type_id: 103,
    start_date: '2024-08-01',
    end_date: '2024-08-05',
    approval_Status: 'Pending',
  },
  {
    key: '4',
    id: 4,
    emp_id: 4,
    leave_type_id: 104,
    start_date: '2024-09-01',
    end_date: '2024-09-10',
    approval_Status: 'Declined',
  },
  {
    key: '5',
    id: 5,
    emp_id: 5,
    leave_type_id: 105,
    start_date: '2024-10-01',
    end_date: '2024-10-05',
    approval_Status: 'Approved',
  },
];

const TablesDashboard = ({datadash = data_dashboard}) => {
  const [data, setData] = useState(datadash);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch('http://localhost:9036/leaves');
      if (response.ok) {
        const leaves = await response.json();
        setData(leaves);
      } else {
        console.error('Failed to fetch leaves:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };
   return <Table columns={columns_dashboard} dataSource={data} />;
};

export default TablesDashboard;
