import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useChallenge } from '../context/ChallengeContext';
import ActionForm from '../components/actions/ActionForm';
import { API_URL } from '../config/constants';

const LogAction = () => {
  const { token } = useContext(AuthContext);
  const { selectedChallenge } = useChallenge();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [initialData, setInitialData] = useState({});
  const [autoSubmit, setAutoSubmit] = useState(false);

  useEffect(() => {
    if (!token) {
      alert('You must be logged in to log an action.');
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    let challenge = null;
    if (location.state && location.state.challenge) {
      challenge = location.state.challenge;
    } else if (selectedChallenge) {
      challenge = selectedChallenge;
    }
    if (challenge) {
      // Map challenge data to ActionForm initialData structure
      setInitialData({
        title: challenge.title || '',
        category: challenge.category || '',
        notes: challenge.description || '',
        points: challenge.cost || 0,
        type: '' // type will be set by ActionForm based on category
      });
      setAutoSubmit(true);
    }
  }, [location.state, selectedChallenge]);

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
      // Pass the newly added action to the Actions page to update list immediately
      navigate('/actions', { state: { newAction: response.data } });
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
      <ActionForm
        onSubmit={handleSubmit}
        loading={loading}
        initialData={initialData}
        autoSubmit={autoSubmit}
        setAutoSubmit={setAutoSubmit}
      />
    </div>
  );
};

export default LogAction;
