import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../api/api';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [rewards, setRewards] = useState([]);
  const [userRewards, setUserRewards] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    cost: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRewards = async () => {
    try {
      const res = await axios.get('/api/rewards', { headers: getAuthHeader() });
      setRewards(res.data);
    } catch (err) {
      setError('Failed to fetch rewards');
    }
  };

  const fetchUserRewards = async () => {
    try {
      const res = await axios.get('/api/reward-milestone/user-rewards', { headers: getAuthHeader() });
      setUserRewards(res.data);
    } catch (err) {
      setError('Failed to fetch user rewards');
    }
  };

  useEffect(() => {
    fetchRewards();
    fetchUserRewards();
  }, []);

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleCreateReward = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/rewards', formData, { headers: getAuthHeader() });
      setFormData({ title: '', cost: '', description: '', imageUrl: '' });
      fetchRewards();
    } catch (err) {
      setError('Failed to create reward');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <h1 className="text-3xl font-extrabold mb-6 text-green-900">Admin Rewards Panel</h1>
      <div className="mb-6 border-b border-green-300 flex space-x-6">
        <button
          className={`pb-2 text-lg font-semibold transition-colors duration-300 ${activeTab === 'setup' ? 'border-b-4 border-green-600 text-green-700' : 'text-green-500 hover:text-green-700'}`}
          onClick={() => setActiveTab('setup')}
        >
          Rewards Setup
        </button>
        <button
          className={`pb-2 text-lg font-semibold transition-colors duration-300 ${activeTab === 'eligibility' ? 'border-b-4 border-green-600 text-green-700' : 'text-green-500 hover:text-green-700'}`}
          onClick={() => setActiveTab('eligibility')}
        >
          Rewards Eligibility
        </button>
      </div>

      {activeTab === 'setup' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Add New Reward</h2>
          <form onSubmit={handleCreateReward} className="mb-8 space-y-5 max-w-md">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="border border-green-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              value={formData.cost}
              onChange={handleInputChange}
              required
              className="border border-green-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              min="1"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-green-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="border border-green-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 transition"
            >
              {loading ? 'Creating...' : 'Create Reward'}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>

          <h2 className="text-2xl font-semibold mb-4 text-green-800">Existing Rewards</h2>
          <table className="w-full border-collapse border border-green-300 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-green-100 text-green-900">
              <tr>
                <th className="border border-green-300 p-3 text-left font-semibold">Title</th>
                <th className="border border-green-300 p-3 text-left font-semibold">Cost</th>
                <th className="border border-green-300 p-3 text-left font-semibold">Description</th>
                <th className="border border-green-300 p-3 text-left font-semibold">Image</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward) => (
                <tr key={reward._id} className="hover:bg-green-50 transition-colors duration-200">
                  <td className="border border-green-300 p-3">{reward.title}</td>
                  <td className="border border-green-300 p-3">{reward.cost}</td>
                  <td className="border border-green-300 p-3">{reward.description}</td>
                  <td className="border border-green-300 p-3">
                    {reward.imageUrl && <img src={reward.imageUrl} alt={reward.title} className="h-10 w-10 object-contain rounded" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'eligibility' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Rewards Eligibility Tracker</h2>
          <table className="w-full border-collapse border border-green-300 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-green-100 text-green-900">
              <tr>
                <th className="border border-green-300 p-3 text-left font-semibold">User</th>
                <th className="border border-green-300 p-3 text-left font-semibold">Reward</th>
                <th className="border border-green-300 p-3 text-left font-semibold">Category</th>
                <th className="border border-green-300 p-3 text-left font-semibold">Target</th>
                <th className="border border-green-300 p-3 text-left font-semibold">Earned At</th>
              </tr>
            </thead>
            <tbody>
              {userRewards.map((ur) => (
                <tr key={ur._id} className="hover:bg-green-50 transition-colors duration-200">
                  <td className="border border-green-300 p-3">{ur.userId?.name || 'N/A'}</td>
                  <td className="border border-green-300 p-3">{ur.rewardMilestoneId?.title || 'N/A'}</td>
                  <td className="border border-green-300 p-3">{ur.rewardMilestoneId?.category || 'N/A'}</td>
                  <td className="border border-green-300 p-3">{ur.rewardMilestoneId?.target || 'N/A'}</td>
                  <td className="border border-green-300 p-3">{new Date(ur.earnedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Rewards;
