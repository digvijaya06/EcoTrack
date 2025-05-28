import React, { useEffect, useState, useContext } from 'react';
import { fetchRewards, deleteReward } from '../../api/rewardActions';
import RewardForm from './RewardForm';
import { AuthContext } from '../../context/AuthContext';

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
    return <p>You do not have permission to view rewards.</p>;
  }

  return (
    <div>
      <h2>Rewards</h2>
      <button onClick={handleAdd} className="btn btn-primary mb-3">Add Reward</button>
      {showForm && (
        <RewardForm reward={editingReward} onClose={handleFormClose} />
      )}
      <ul>
        {rewards.map((reward) => (
          <li key={reward._id} className="mb-2">
            <strong>{reward.title}</strong> - {reward.description} - Points Required: {reward.pointsRequired}
            <button onClick={() => handleEdit(reward)} className="btn btn-sm btn-secondary ml-2">Edit</button>
            <button onClick={() => handleDelete(reward._id)} className="btn btn-sm btn-danger ml-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RewardList;
