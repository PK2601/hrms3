import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/Employee-List';
import Departmentsection from './components/Department-Section';
import LeaveTypes from './components/Leave-Types';
import LeaveManagement from './components/Leave-Management';
import Settings from './components/Settings';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [adminloggedIn, setAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route index element={<Login setAdminLoggedIn={setAdminLoggedIn} />} />
        <Route path="/" element={<Layout setAdminLoggedIn={setAdminLoggedIn} />}>
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="employeelist" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <EmployeeList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="departmentsection" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <Departmentsection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="leavetypes" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <LeaveTypes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="leavemanagement" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <LeaveManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="settings" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Login setAdminLoggedIn={setAdminLoggedIn} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;