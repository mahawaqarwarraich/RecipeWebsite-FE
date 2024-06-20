import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    // If all inputs are valid, submit the form (you can replace this with your API call)
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
        <h2 className="text-center text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username/Email</label>
            <input 
              id="username" 
              name="username" 
              type="text" 
              placeholder="Enter email/username" 
              value={formData.username} 
              onChange={handleChange} 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Enter password (min 8 characters)" 
              value={formData.password} 
              onChange={handleChange} 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
            />
          </div>
          <div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
