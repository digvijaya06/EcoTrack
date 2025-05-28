import React, { useState, useContext, useEffect } from 'react';
import { createReward, updateReward } from '../../api/rewardActions';
import { AuthContext } from '../../context/AuthContext';

const RewardForm = ({ reward, onClose }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pointsRequired, setPointsRequired] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (reward) {
      setTitle(reward.title || '');
      setDescription(reward.description || '');
      setPointsRequired(reward.pointsRequired || '');
      setImageUrl(reward.imageUrl || '');
    }
  }, [reward]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rewardData = { title, description, pointsRequired, imageUrl };
    try {
      if (reward) {
        await updateReward(reward._id, rewardData, token);
      } else {
        await createReward(rewardData, token);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save reward:', error);
    }
  };

  return (
    <div className="reward-form">
      <h3>{reward ? 'Edit Reward' : 'Add Reward'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Points Required:</label>
          <input
            type="number"
            value={pointsRequired}
            onChange={(e) => setPointsRequired(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">{reward ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default RewardForm;
