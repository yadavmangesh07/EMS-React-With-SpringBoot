import * as React from 'react';
import SnackbarWithDecorators from './SnackbarWithDecorators';

const EmployeeForm = ({ employee, onAddOrUpdateEmployee, setIsEditing }) => {
  const [formData, setFormData] = React.useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
  });
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  React.useEffect(() => {
    if (employee) {
      setFormData(employee);
      setIsEditing(true);
    } else {
      setFormData({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
      });
      setIsEditing(false);
    }
  }, [employee, setIsEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrUpdateEmployee(formData);
    setShowSnackbar(true); // Show snackbar when form is successfully submitted
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div className='m-[3rem] ml-[4.5rem] underline'>
      <h2 className="font-sans font-extralight text-2xl mb-4  tracking-wider ">{employee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='border-[1px] border-gray-300 rounded-sm p-2 m-2 w-[20rem] h-[2rem]'
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          className='border-[1px] border-gray-300 rounded-sm p-2 m-2 w-[20rem] h-[2rem]'
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          className='border-[1px] border-gray-300 rounded-sm p-2 m-2 w-[20rem] h-[2rem]'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button  
          className=' bg-green-500  border-black hover:bg-green-700  text-white tracking-wider py-1 px-4 rounded'
          type="submit">{employee ? 'Update' : 'Add'}
        </button>
      </form>
      {/* SnackbarWithDecorators to show success message */}
      <SnackbarWithDecorators 
        message="Employee added/updated successfully"
        open={showSnackbar}
        onClose={handleSnackbarClose}
        color={'success'}
      />
    </div>
  );
};

export default EmployeeForm;
