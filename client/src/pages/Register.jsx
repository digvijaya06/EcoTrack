import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, authError, setAuthError } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (authError) {
      setAuthError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    try {
      await register(formData.name, formData.username, formData.email, formData.password);
      alert('Registration successful! Please complete your profile.');
      navigate('/profile'); // Redirect to profile creation form
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setAuthError(err.response.data.message);
      } else {
        setAuthError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/2990647/pexels-photo-2990647.jpeg')" }}
    >
      <div className="absolute inset-0 bg-green-900 bg-opacity-70 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-md p-6 mx-8 my-6">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
          Register
        </h2>
        {authError && <p className="text-red-500 text-center mb-4">{authError}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-teal-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-teal-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-teal-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-teal-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 transition font-semibold"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
