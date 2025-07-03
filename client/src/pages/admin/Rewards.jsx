import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchRewards, createReward, updateReward, deleteReward } from '../../api/rewardActions';
import { AuthContext } from '../../context/AuthContext';

const Rewards = () => {
  const { token } = useContext(AuthContext);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReward, setNewReward] = useState({ title: '', description: '', cost: 0, imageUrl: '' });
  const [editingRewardId, setEditingRewardId] = useState(null);
  const [editingReward, setEditingReward] = useState({ title: '', description: '', cost: 0, imageUrl: '' });

  useEffect(() => {
    async function fetchRewardsData() {
      const data = await fetchRewards(token);
      setRewards(data);
      setLoading(false);
    }
    fetchRewardsData();
  }, [token]);

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingReward({ ...editingReward, [name]: value });
    } else {
      setNewReward({ ...newReward, [name]: value });
    }
  };

  const handleCreate = async () => {
    const created = await createReward(newReward, token);
    setRewards([...rewards, created]);
    setNewReward({ title: '', description: '', cost: 0, imageUrl: '' });
  };

  const startEdit = (reward) => {
    setEditingRewardId(reward._id);
    setEditingReward({ ...reward });
  };

  const cancelEdit = () => {
    setEditingRewardId(null);
    setEditingReward({ title: '', description: '', cost: 0, imageUrl: '' });
  };

  const handleUpdate = async () => {
    const updated = await updateReward(editingRewardId, editingReward, token);
    setRewards(rewards.map(r => (r._id === editingRewardId ? updated : r)));
    cancelEdit();
  };

  const handleDelete = async (rewardId) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      await deleteReward(rewardId, token);
      setRewards(rewards.filter(r => r._id !== rewardId));
    }
  };

  if (loading) return <AdminLayout><div>Loading rewards...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Rewards Management</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add New Reward</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newReward.title}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newReward.description}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="number"
            name="cost"
            placeholder="Points Required"
            value={newReward.cost}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded w-20"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newReward.imageUrl}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Reward
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b" title="Users need to accumulate at least this many points to claim the reward.">Points Required</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map(reward => (
              <tr key={reward._id} className="text-center">
                {editingRewardId === reward._id ? (
                  <>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        name="title"
                        value={editingReward.title}
                        onChange={(e) => handleInputChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        name="description"
                        value={editingReward.description}
                        onChange={(e) => handleInputChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b" title={`Users need to accumulate at least ${editingReward.cost} points to claim this reward.`}>
                      <input
                        type="number"
                        name="cost"
                        value={editingReward.cost}
                        onChange={(e) => handleInputChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        name="imageUrl"
                        value={editingReward.imageUrl}
                        onChange={(e) => handleInputChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border-b">{reward.title}</td>
                    <td className="py-2 px-4 border-b">{reward.description}</td>
                    <td className="py-2 px-4 border-b" title={`Users need to accumulate at least ${reward.cost} points to claim this reward.`}>{reward.cost}</td>
                    <td className="py-2 px-4 border-b">
                      {reward.imageUrl ? (
                        <img src={reward.imageUrl} alt={reward.title} className="h-10 mx-auto" />
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => startEdit(reward)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(reward._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Rewards;
