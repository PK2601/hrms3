import React from 'react';
import { Tabs } from 'antd';
import { LoadingOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import PendingLeaves from './PendingLeaves';
import ApprovedLeaves from './ApprovedLeaves';
import DeclinedLeaves from './DeclinedLeaves';

const LeaveManagement = () => (
  <Tabs>
    <Tabs.TabPane
      tab={
        <span>
          <LoadingOutlined style={{ marginRight: 8 }} data-testid='pendingleave'/>
          Pending Leave Applications
        </span>
      }
      key="1"
    >
      <PendingLeaves />
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={
        <span>
          <CheckOutlined style={{ marginRight: 8 }} data-testid='approvedleave'/>
          Approved Leave Applications
        </span>
      }
      key="2"
    >
      <ApprovedLeaves />
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={
        <span>
          <CloseOutlined style={{ marginRight: 8 }} data-testid='declinedleave'/>
          Declined Leave Applications
        </span>
      }
      key="3"
    >
      <DeclinedLeaves />
    </Tabs.TabPane>
  </Tabs>
);

export default LeaveManagement;
