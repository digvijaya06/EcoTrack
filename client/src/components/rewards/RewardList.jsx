import React, { useEffect, useState, useContext } from 'react';
import { fetchRewards, deleteReward } from '../../api/rewardActions';
import RewardForm from './RewardForm';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Edit2, Gift } from 'lucide-react';

const RewardList = () => {
  const { user, token } = useContext(AuthContext);
  const [rewards, setRewards] = useState([]);
  const [editingReward, setEditingReward] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      const data = await fetchRewards(token);
      setRewards(data);
    } catch (error) {
      console.error('Failed to load rewards:', error);
    }
  };

  const handleEdit = (reward) => {
    setEditingReward(reward);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      try {
        await deleteReward(id, token);
        loadRewards();
      } catch (error) {
        console.error('Failed to delete reward:', error);
      }
    }
  };

  const handleAdd = () => {
    setEditingReward(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    loadRewards();
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        🔒 You do not have permission to manage rewards.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Gift className="mr-2 text-yellow-500" /> Manage Rewards
        </h2>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Add Reward
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <RewardForm reward={editingReward} onClose={handleFormClose} />
        </div>
      )}

      <div className="space-y-4">
        {rewards.length === 0 ? (
          <p className="text-gray-500">No rewards added yet.</p>
        ) : (
          rewards.map((reward) => (
            <div
              key={reward._id}
              className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                {reward.imageUrl && (
                  <img
                    src={reward.imageUrl}
                    alt={reward.title}
                    className="h-12 w-12 object-contain rounded"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{reward.title}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                  <p className="text-sm text-blue-600 font-semibold mt-1">
                    🎯 Points Required: {reward.pointsRequired}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(reward)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(reward._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RewardList;
