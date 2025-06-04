import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const Login = () => {
  // State management
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Context & Routing
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/profile';

  // Validation function
  const validate = () => {
    const newErrors = {};
    const emailPattern = /\S+@\S+\.\S+/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }

    if (loginError) setLoginError(null);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      console.log('Attempting login with:', formData.email);
      await login(formData.email, formData.password);
      console.log('Login successful, token should be stored');

      // Navigate directly after login success
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setLoginError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT: Login form */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-24 xl:max-w-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="ml-2 text-2xl font-bold text-green-800">GreenPoints</span>
          </Link>
          <h2 className="text-center text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-center text-gray-600">Sign in to continue your eco journey</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white shadow rounded-lg px-6 py-8">
            {loginError && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 p-3 rounded">
                {loginError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 mt-1 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 mt-1 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>

              {/* Remember me */}
              <div className="flex justify-between items-center">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded mr-2"
                  />
                  Remember me
                </label>
                <a href="#" className="text-sm text-green-600 hover:text-green-500">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded font-medium text-white bg-green-600 hover:bg-green-700 transition ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            {/* OR */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

    
      <div className="hidden lg:block relative w-0 flex-1 bg-green-800">
        <img
          src="https://images.pexels.com/photos/2990647/pexels-photo-2990647.jpeg"
          alt="Nature"
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center px-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Join the Green Movement</h2>
            <p className="text-lg text-green-100 mb-6">
              Every small action you take helps build a sustainable future. Track your progress and see the difference.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-5 py-3 bg-white text-green-700 rounded-md font-medium hover:bg-gray-50"
            >
              Create an account
              <span className="ml-2 text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
