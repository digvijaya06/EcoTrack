import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getRewards, createReward, updateReward, deleteReward } from '../../api/rewardActions';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReward, setNewReward] = useState({ title: '', description: '', points: 0, image: '' });
  const [editingRewardId, setEditingRewardId] = useState(null);
  const [editingReward, setEditingReward] = useState({ title: '', description: '', points: 0, image: '' });

  useEffect(() => {
    async function fetchRewards() {
      const data = await getRewards();
      setRewards(data);
      setLoading(false);
    }
    fetchRewards();
  }, []);

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingReward({ ...editingReward, [name]: value });
    } else {
      setNewReward({ ...newReward, [name]: value });
    }
  };

  const handleCreate = async () => {
    const created = await createReward(newReward);
    setRewards([...rewards, created]);
    setNewReward({ title: '', description: '', points: 0, image: '' });
  };

  const startEdit = (reward) => {
    setEditingRewardId(reward._id);
    setEditingReward({ ...reward });
  };

  const cancelEdit = () => {
    setEditingRewardId(null);
    setEditingReward({ title: '', description: '', points: 0, image: '' });
  };

  const handleUpdate = async () => {
    const updated = await updateReward(editingRewardId, editingReward);
    setRewards(rewards.map(r => (r._id === editingRewardId ? updated : r)));
    cancelEdit();
  };

  const handleDelete = async (rewardId) => {
    if (window.confirm('Are you sure you want to delete this reward?')) {
      await deleteReward(rewardId);
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
            name="points"
            placeholder="Points"
            value={newReward.points}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded w-20"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newReward.image}
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
              <th className="py-2 px-4 border-b">Points</th>
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
                    <td className="py-2 px-4 border-b">
                      <input
                        type="number"
                        name="points"
                        value={editingReward.points}
                        onChange={(e) => handleInputChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        name="image"
                        value={editingReward.image}
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
                    <td className="py-2 px-4 border-b">{reward.points}</td>
                    <td className="py-2 px-4 border-b">
                      {reward.image ? (
                        <img src={reward.image} alt={reward.title} className="h-10 mx-auto" />
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
