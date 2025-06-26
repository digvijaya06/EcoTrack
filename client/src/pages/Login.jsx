import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // State management
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Context & Routing
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/profile";

  // Validation function
  const validate = () => {
    const newErrors = {};
    const emailPattern = /\S+@\S+\.\S+/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailPattern.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";

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
      await login(formData.email, formData.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setLoginError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2990647/pexels-photo-2990647.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-green-900 bg-opacity-70 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-8 mx-4">
        <Link to="/" className="flex justify-center items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="ml-2 text-2xl font-bold text-green-800">
            EcoLog
          </span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold mb-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
          Welcome back
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Sign in to continue your eco journey
        </p>

        {loginError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 p-3 rounded">
            {loginError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-teal-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 mt-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-teal-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-teal-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 mt-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.password ? "border-red-500" : "border-teal-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-green-600 border-gray-300 rounded mr-2"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-500">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
