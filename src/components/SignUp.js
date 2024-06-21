import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Perform signup logic here
      console.log('Signup successful!', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = true;
    if (!formData.password.trim()) newErrors.password = true;
    return newErrors;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
        <h2 className="text-center text-2xl mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.username && 'border-red-500'}`}
              placeholder="Enter username"
            />
            {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full mb-12 p-2 border ${errors.password && 'border-red-500'}`}
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>
          <div className='flex justify-center'>

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Create Account</button>
          </div>
        
        </form>
      </div>
    </div>
  );
};

export default SignUp;
