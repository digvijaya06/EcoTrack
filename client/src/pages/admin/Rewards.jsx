import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../api/api';
import { useLocation } from 'react-router-dom';

import carbon from '../../assets/carbon.png';
import ecoWarrior from '../../assets/Eco Warrior.jpg';
import recycleChampion from '../../assets/recycle-champion.jpeg';
import saveEnergy from '../../assets/save-energy-.jpg';
import saveWater from '../../assets/save-water-.jpg';

const imageMap = {
  'carbon.png': carbon,
  'Eco Warrior.jpg': ecoWarrior,
  'recycle-champion.jpeg': recycleChampion,
  'save-energy-.jpg': saveEnergy,
  'save-water-.jpg': saveWater,
};

const Rewards = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get('userName') || '';
  const category = queryParams.get('category') || '';

  const [activeTab, setActiveTab] = useState('setup');
  const [rewards, setRewards] = useState([]);
  const [userRewards, setUserRewards] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    Points: '',
    description: '',
    imageUrl: '',
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
      if (Array.isArray(res.data)) {
        setUserRewards(res.data);
      } else {
        console.warn('Expected array for userRewards but got:', res.data);
        setUserRewards([]);
      }
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
      setFormData({ title: '', Points: '', description: '' });
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

      {/* Display userName and category */}
      {/* Removed display above tabs as per user request */}
      {/* {(userName || category) && (
        <div className="mb-6 p-4 bg-green-100 rounded text-green-900 font-semibold">
          <p>User Name: {userName}</p>
          <p>Category: {category}</p>
        </div>
      )} */}

      {activeTab === 'setup' && (
        <div className="flex space-x-8">
          <div className="w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Add New Reward</h2>
            <form onSubmit={handleCreateReward} className="space-y-5">
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
                name="Points"
                placeholder="Points"
                value={formData.Points}
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
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="image-upload"
                  className="block text-sm font-medium text-gray-700"
                >
                  Choose Image
                </label>
                <input
                  id="image-upload"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setFormData((prev) => ({ ...prev, imageUrl: file.name }));
                  }}
                  className="border border-green-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 transition"
              >
                {loading ? 'Creating...' : 'Create Reward'}
              </button>
              {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>
          </div>

          <div className="w-2/3 max-h-[600px] overflow-y-auto rounded-lg border border-green-300 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 p-4 text-green-800 bg-green-50 sticky top-0 z-10">Existing Rewards</h2>
            <table className="w-full border-collapse">
              <thead className="bg-green-100 text-green-900 sticky top-12 z-10">
                <tr>
                  <th className="border border-green-300 p-3 text-left font-semibold">Title</th>
                  <th className="border border-green-300 p-3 text-left font-semibold">Points</th>
                  <th className="border border-green-300 p-3 text-left font-semibold">Description</th>
                  <th className="border border-green-300 p-3 text-left font-semibold">Image</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((reward) => (
                  <tr key={reward._id} className="hover:bg-green-50 transition-colors duration-200">
                    <td className="border border-green-300 p-3">{reward.title}</td>
                    <td className="border border-green-300 p-3">{reward.Points}</td>
                    <td className="border border-green-300 p-3">{reward.description}</td>
                    <td className="border border-green-300 p-3">
                      {reward.imageUrl && (() => {
                        const isFullUrl = (url) => {
                          return url.startsWith('http') || url.startsWith('/');
                        };
                        const getFileName = (url) => {
                          return url.split('/').pop();
                        };
                        let src = null;
                        if (isFullUrl(reward.imageUrl)) {
                          src = reward.imageUrl;
                        } else {
                          const fileName = getFileName(reward.imageUrl);
                          src = imageMap[fileName] || null;
                        }
                        if (!src) return null;
                        return (
                          <img
                            src={src}
                            alt={reward.title}
                            className="h-10 w-10 object-contain rounded"
                          />
                        );
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              {(userName && category) && (
                <tr className="bg-green-200 font-semibold">
                  <td className="border border-green-300 p-3">{userName}</td>
                  <td className="border border-green-300 p-3">N/A</td>
                  <td className="border border-green-300 p-3">{category}</td>
                  <td className="border border-green-300 p-3">N/A</td>
                  <td className="border border-green-300 p-3">N/A</td>
                </tr>
              )}
              {Array.isArray(userRewards) ? userRewards.map((ur) => (
                <tr key={ur._id} className="hover:bg-green-50 transition-colors duration-200">
                  <td className="border border-green-300 p-3">{ur.userId?.name || 'N/A'}</td>
                  <td className="border border-green-300 p-3">{ur.rewardMilestoneId?.title || 'N/A'}</td>
                  <td className="border border-green-300 p-3">{ur.rewardMilestoneId?.category || 'N/A'}</td>
                  <td className="border border-green-300 p-3">{ur.rewardMilestoneId?.target || 'N/A'}</td>
                  <td className="border border-green-300 p-3">{new Date(ur.earnedAt).toLocaleString()}</td>
                </tr>
              )) : null}
            </tbody>
          </table>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Rewards;
