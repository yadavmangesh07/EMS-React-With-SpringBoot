// Components/EmployeeList.jsx
import React from 'react';
import SnackbarWithDecorators from './SnackbarWithDecorators';


const EmployeeList = ({ employees, onSelectEmployee, onDeleteEmployee }) => {
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  return (
    <div className="my-4 ml-[3rem] ">
      <h2 className="font-sans font-extralight text-2xl mb-4 ml-[2rem] tracking-wider underline ">Employee List</h2>
      <div className="overflow-x-clip">
      <div className="overflow-x-scroll ">
  <table className="min-w-[95%]  divide-y divide-gray-200 border m-5 shadow-lg">
    <thead className="bg-gray-50 border">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">
              {employee.firstname} {employee.lastname}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500">{employee.email}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white tracking-wider py-1 px-4 rounded"
              onClick={() => onSelectEmployee(employee)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white tracking-wider py-1 px-4 rounded ml-2"
              onClick={() => {
                const choice = confirm('Are you sure you want to delete this employee?');
                if (choice) {
                  onDeleteEmployee(employee.id);
                }
                setShowSnackbar(true);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
      <SnackbarWithDecorators
        message="Employee Deleted Successfully"
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        color={'danger'}
        />
    </div>
  );
};

export default EmployeeList;
