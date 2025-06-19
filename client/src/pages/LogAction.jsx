import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ActionForm from '../components/actions/ActionForm';
import { API_URL } from '../config/constants';

const LogAction = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert('You must be logged in to log an action.');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (formData) => {
    if (!formData.type || !formData.category) return alert('Please fill all required fields');

    try {
      setLoading(true);
      // Prepare payload as per backend expectations
      const payload = {
        title: formData.title,
        content: formData.notes,
        tags: formData.category ? [formData.category.toLowerCase()] : []
      };
      const response = await axios.post(`${API_URL}/api/actions`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Action logged successfully!');
      setLoading(false);
      // Close form automatically after success
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to add action:', err);
      const message = err.response?.data?.message || 'Failed to log action.';
      alert(message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Log an Eco Action</h1>
      <ActionForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default LogAction;
