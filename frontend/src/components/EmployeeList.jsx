// src/components/EmployeeList.jsx
import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import '../styles/app.css';

const EmployeeList = ({ employees, refresh, setSelectedEmployee, isEditable }) => {
  const [viewedEmployee, setViewedEmployee] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/employees/${id}`);
      refresh();
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const handleView = (emp) => {
    setViewedEmployee(emp);
  };

  const closeView = () => {
    setViewedEmployee(null);
  };

  return (
    <>
      {viewedEmployee && (
        <div className="employee-info-card">
          <div className="employee-info-header">
            <h2>{viewedEmployee.name}</h2>
            <button onClick={closeView} className="close-btn">✖</button>
          </div>
          <p><strong>Email:</strong> {viewedEmployee.email}</p>
          <p><strong>Position:</strong> {viewedEmployee.position}</p>
          <p><strong>Department:</strong> {viewedEmployee.department}</p>
          <p><strong>Phone:</strong> {viewedEmployee.phone || 'N/A'}</p>
          <p><strong>Address:</strong> {viewedEmployee.address || 'N/A'}</p>
        </div>
      )}

      <div className="employee-list">
        {employees.map((emp) => (
          <div className="card" key={emp._id}>
            <h3>{emp.name}</h3>
            <p><strong>Email:</strong> {emp.email}</p>
            <p><strong>Position:</strong> {emp.position}</p>
            <p><strong>Department:</strong> {emp.department}</p>

            <div className="card-actions">
              <button onClick={() => handleView(emp)} title="View">👁</button>
              {isEditable && (
                <>
                  <button onClick={() => setSelectedEmployee(emp)} title="Edit">📝</button>
                  <button onClick={() => handleDelete(emp._id)} title="Delete">🗑️</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmployeeList;
