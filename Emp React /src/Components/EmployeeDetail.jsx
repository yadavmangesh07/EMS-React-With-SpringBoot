// Components/EmployeeDetail.jsx
import React from 'react';

const EmployeeDetail = ({ employee }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg ">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
      <div className="text-lg ">
        <p className="mb-2">
          <span className="font-semibold">First Name: </span>{employee.firstname}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Last Name: </span>{employee.lastname}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email: </span>{employee.email}
        </p>
      </div>
    </div>
  );
};

export default EmployeeDetail;
