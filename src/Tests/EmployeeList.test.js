// describe('example function', () => {
//     it('fetch', async () => {
//         const response = await fetch('https://c29c6619-5509-4c00-ba9c-50497a1f7cf1.mock.pstmn.io/my-json-server.typicode.com/pk2601/employee-dashboard/posts');

//         expect(response.status).toBe(200);
//         expect(response.statusText).toBe('OK');
//         expect(await response.json()).toEqual({
//             key: '1',
//             employeeid: 1,
//             name: 'John Brown',
//             departmentid: 101,
//             managerid: 201,
//             email: 'john.brown@example.com',
//             phone: '123-456-7890',
//             address: 'New York No. 1 Lake Park',
//             dob: '1990-01-01'
//         });
//     });
// });

// const mockDataa = [
//     {
//       key: '1',
//       employeeid: 1,
//       name: 'John Brown',
//       departmentid: 101,
//       managerid: 201,
//       email: 'john.brown@example.com',
//       phone: '123-456-7890',
//       address: 'New York No. 1 Lake Park',
//       dob: '1990-01-01',
//     },
//     {
//       key: '2',
//       employeeid: 2,
//       name: 'Jim Green',
//       departmentid: 102,
//       managerid: 202,
//       email: 'jim.green@example.com',
//       phone: '098-765-4321',
//       address: 'London No. 1 Lake Park',
//       dob: '1982-05-12',
//     },
//     {
//       key: '3',
//       employeeid: 3,
//       name: 'Joe Black',
//       departmentid: 103,
//       managerid: 203,
//       email: 'joe.black@example.com',
//       phone: '111-222-3333',
//       address: 'Sydney No. 1 Lake Park',
//       dob: '1990-03-15',
//     },
//     {
//       key: '4',
//       employeeid: 4,
//       name: 'Jane Doe',
//       departmentid: 104,
//       managerid: 204,
//       email: 'jane.doe@example.com',
//       phone: '444-555-6666',
//       address: 'San Francisco No. 2 Lake Park',
//       dob: '1993-09-21',
//     },
//     {
//       key: '5',
//       employeeid: 5,
//       name: 'Michael Johnson',
//       departmentid: 105,
//       managerid: 205,
//       email: 'michael.johnson@example.com',
//       phone: '777-888-9999',
//       address: 'Los Angeles No. 3 Lake Park',
//       dob: '1978-11-30',
//     },
//   ];


import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TablesEmp from '../components/shared/Employee-Table';

beforeAll(() => {
    window.matchMedia = window.matchMedia || function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
      };
    };
  });

export async function fetchData() {
    try {
      const response = await fetch('https://my-json-server.typicode.com/pk2601/employee-dashboard/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }


describe.skip('TablesEmp component', () => {

    let mockData = [];
  
    beforeAll(async () => {
      mockData = await fetchData();
    });
  
    beforeEach(() => {
      render(<TablesEmp dataemp={mockData} />);
    });
  
    it('renders table columns correctly', () => {
      const columns = screen.getAllByRole('columnheader');
      expect(columns).toHaveLength(10);
      expect(screen.getByTestId('id')).toBeInTheDocument();
      expect(screen.getByTestId('name')).toBeInTheDocument();
      expect(screen.getByTestId('department')).toBeInTheDocument();
      expect(screen.getByTestId('manager')).toBeInTheDocument();
      expect(screen.getByTestId('email')).toBeInTheDocument();
      expect(screen.getByTestId('phone')).toBeInTheDocument();
      expect(screen.getByTestId('address')).toBeInTheDocument();
      expect(screen.getByTestId('dob')).toBeInTheDocument();
    });

    it('renders table rows correctly', () => {
      const rows = screen.getAllByRole('row');
      expect(rows.slice(1)).toHaveLength(mockData.length);
    });
  
    it('renders initial rows from mock data', () => {
      const rows = screen.getAllByRole('row');
      expect(rows.slice(1)).toHaveLength(mockData.length);
      expect(screen.getByText('John Brown')).toBeInTheDocument();
      expect(screen.getByText('Jim Green')).toBeInTheDocument();
    });
  
    it('filters table rows based on search input', async () => {
      const searchInput = screen.getByPlaceholderText(/search/i);
      fireEvent.change(searchInput, { target: { value: 'John' } });
      const filteredRow = await screen.findByText('John Brown');
      const notfilteredRow = screen.queryByText('Jim Green');
      expect(filteredRow).toBeInTheDocument();
      expect(notfilteredRow).not.toBeInTheDocument();
    });
  
    it('deletes a row on confirmation', async () => {
      const deleteButton = screen.getAllByTestId('deletebutton');
      fireEvent.click(deleteButton[0]);
      const confirmButton = await screen.findByText('Yes');
      fireEvent.click(confirmButton);
      await waitFor(() => {
        const deletedRow = screen.queryByText('John Brown');
        expect(deletedRow).not.toBeInTheDocument();
      });
    });

    it('column sorting', async () => {
      const idColumnHeader = screen.getByTestId('id');
      fireEvent.click(idColumnHeader);
      const sortedRowsId = screen.getAllByRole('row');
      const sortedDataById = mockData.slice().sort((a, b) => a.employeeid - b.employeeid);

      sortedRowsId.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[1]).toHaveTextContent(sortedDataById[index].employeeid.toString());
      });

      const nameColumnHeader = screen.getByTestId('name');
      fireEvent.click(nameColumnHeader);
      const sortedRowsName = screen.getAllByRole('row');
      const sortedDataByName = mockData.slice().sort((a, b) => a.name.localeCompare(b.name));
      sortedRowsName.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[2]).toHaveTextContent(sortedDataByName[index].name.toString());
      });

      const deptidColumnHeader = screen.getByTestId('department');
      fireEvent.click(deptidColumnHeader);
      const sortedRowsDept = screen.getAllByRole('row');
      const sortedDataByDeptId = mockData.slice().sort((a, b) => a.departmentid - b.departmentid);

      sortedRowsDept.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[3]).toHaveTextContent(sortedDataByDeptId[index].departmentid.toString());
      });

      const manageridColumnHeader = screen.getByTestId('manager');
      fireEvent.click(manageridColumnHeader);
      const sortedRowsManager = screen.getAllByRole('row');
      const sortedDataByManagerId = mockData.slice().sort((a, b) => a.managerid - b.managerid);

      sortedRowsManager.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[4]).toHaveTextContent(sortedDataByManagerId[index].managerid.toString());
      });

      const emailColumnHeader = screen.getByTestId('email');
      fireEvent.click(emailColumnHeader);
      const sortedRowsEmail = screen.getAllByRole('row');
      const sortedDataByEmail = mockData.slice().sort((a, b) => a.email.localeCompare(b.email));
      sortedRowsEmail.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[5]).toHaveTextContent(sortedDataByEmail[index].email.toString());
      });

      const phoneColumnHeader = screen.getByTestId('phone');
      fireEvent.click(phoneColumnHeader);
      const sortedRowsPhone = screen.getAllByRole('row');
      const sortedDataByPhone = mockData.slice().sort((a, b) => a.phone.localeCompare(b.phone));
      sortedRowsPhone.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[6]).toHaveTextContent(sortedDataByPhone[index].phone.toString());
      });

      const addressColumnHeader = screen.getByTestId('address');
      fireEvent.click(addressColumnHeader);
      const sortedRowsAddress = screen.getAllByRole('row');
      const sortedDataByAddress = mockData.slice().sort((a, b) => a.address.localeCompare(b.address));
      sortedRowsAddress.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[7]).toHaveTextContent(sortedDataByAddress[index].address.toString());
      });

      const dobColumnHeader = screen.getByTestId('dob');
      fireEvent.click(dobColumnHeader);
      const sortedRowsDob = screen.getAllByRole('row');
      const sortedDataByDob = mockData.slice().sort((a, b) => a.dob.localeCompare(b.dob));
      sortedRowsDob.slice(1).forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[8]).toHaveTextContent(sortedDataByDob[index].dob.toString());
      });
    });

});
  