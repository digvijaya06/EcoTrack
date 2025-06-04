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

    if (!title || !pointsRequired) {
      alert("Title and points are required.");
      return;
    }

    const rewardData = {
      title,
      description,
      pointsRequired: parseInt(pointsRequired, 10),
      imageUrl,
    };

    try {
      if (reward) {
        await updateReward(reward._id, rewardData, token);
      } else {
        await createReward(rewardData, token);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save reward:', error);
      alert('Something went wrong while saving the reward.');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {reward ? 'Edit Reward' : 'Add New Reward'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Points Required */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Points Required</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={pointsRequired}
            onChange={(e) => setPointsRequired(e.target.value)}
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
          >
            {reward ? 'Update Reward' : 'Create Reward'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RewardForm;
