
import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const data = isRegister 
        ? {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: 'jobseeker'
          }
        : {
            email: formData.email,
            password: formData.password
          };

      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      if (response.data.success) {
            await login(response.data.token, response.data.user);
            toast.success(isRegister ? 'Registration successful!' : 'Login successful!');
            navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 bg-cover bg-center relative">
      <img src={assets.logo} alt="Logo" className="absolute top-6 left-6 w-40" />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md w-full border border-orange-500">
        <h2 className="text-2xl font-semibold text-center mb-6 text-orange-600">
          {isRegister ? 'Register' : 'Login'} as A Job Seeker
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-200" required={isRegister} />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-200" required={isRegister} />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-200" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-200" required />
          </div>
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md transition duration-300">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-orange-600 hover:text-orange-800 transition duration-300">
            {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
