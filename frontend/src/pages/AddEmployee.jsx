// src/pages/AddEmployee.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import EmployeeForm from '../components/EmployeeForm';
import '../styles/app.css';

const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees');
      setEmployees(res.data);
      setSelectedEmployee(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="page-content">
      <h1>Add Employee</h1>
      <EmployeeForm
        refresh={fetchEmployees}
        selectedEmployee={selectedEmployee}
        clearEdit={() => setSelectedEmployee(null)}
      />
    </div>
  );
};

export default AddEmployee;
