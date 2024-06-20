import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
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
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.username.trim()) newErrors.username = true;
    if (!formData.password.trim()) newErrors.password = true;
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = true;
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
    }
    return newErrors;
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-5">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.email && 'border-red-500'}`}
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>
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
            className={`mt-1 block w-full p-2 border ${errors.password && 'border-red-500'}`}
            placeholder="Enter password"
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.confirmPassword && 'border-red-500'}`}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
