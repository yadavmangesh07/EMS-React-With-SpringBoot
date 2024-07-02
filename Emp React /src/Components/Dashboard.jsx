// Components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import EmployeeDetail from './EmployeeDetail';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/ems/EmployeeDetail');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error.response ? error.response.data : error.message);
    }
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleAddOrUpdateEmployee = async (employee) => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/ems/UpdateEmployee/${employee.id}`, employee);
      } else {
        await axios.post('http://localhost:8080/ems/AddEmployee', employee);
      }
      fetchEmployees();
      setIsEditing(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error adding/updating employee:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/ems/DeleteEmployee/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1 className='font-sans font-extralight text-center text-4xl tracking-wider mt-[2rem] underline'>Employee Management System</h1>
      <EmployeeList
        employees={employees}
        onSelectEmployee={handleSelectEmployee}
        onDeleteEmployee={handleDeleteEmployee}
      />
      <EmployeeForm
        employee={selectedEmployee}
        onAddOrUpdateEmployee={handleAddOrUpdateEmployee}
        setIsEditing={setIsEditing}
      />
      {selectedEmployee && !isEditing && (
        <EmployeeDetail employee={selectedEmployee} />
      )}
    </div>
  );
};

export default Dashboard;
