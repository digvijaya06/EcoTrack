import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ActionForm from '../components/actions/ActionForm';

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
      // Use user-entered title instead of type for backend
      const payload = {
        ...formData,
        title: formData.title,
      };
      await axios.post('http://localhost:5000/api/actions', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Action logged successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to log action.');
    } finally {
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
