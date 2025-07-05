import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  fetchRewards,
  createReward,
  updateReward,
  deleteReward,
  fetchUsersWithEligibility,
  approveBadge,
  sendBadgeEmail,
  fetchCategoryTargets,
  setCategoryTarget,
} from '../../api/rewardActions';
import { AuthContext } from '../../context/AuthContext';

const RewardsEligibilityTab = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loadingEligibility, setLoadingEligibility] = useState(true);
  const [approvingUserId, setApprovingUserId] = useState(null);
  const [sendingEmailUserId, setSendingEmailUserId] = useState(null);

  useEffect(() => {
    async function fetchEligibility() {
      const data = await fetchUsersWithEligibility(token);
      setUsers(data);
      setLoadingEligibility(false);
    }
    fetchEligibility();
  }, [token]);

  const handleApproveBadge = async (userId, badgeId) => {
    setApprovingUserId(userId);
    await approveBadge(userId, badgeId, token);
    // Update UI to reflect approval
    setUsers(users.map(user => {
      if (user._id === userId) {
        return { ...user, approved: true };
      }
      return user;
    }));
    setApprovingUserId(null);
  };

  const handleSendEmail = async (user) => {
    if (!user.badges || user.badges.length === 0) return;
    setSendingEmailUserId(user._id);
    const badgeImageUrl = user.badges[0].imageUrl || ''; // Assuming first badge image
    await sendBadgeEmail(user.email, badgeImageUrl, token);
    setSendingEmailUserId(null);
    alert(`Email sent to ${user.email}`);
  };

  if (loadingEligibility) return <div>Loading eligibility data...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Rewards Eligibility</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Impact Progress</th>
            <th className="py-2 px-4 border-b">Eligible Badges</th>
            <th className="py-2 px-4 border-b">Threshold Met</th>
            <th className="py-2 px-4 border-b">Approved</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="text-center">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.impactProgress}</td>
              <td className="py-2 px-4 border-b">
                {user.badges && user.badges.length > 0
                  ? user.badges.map(badge => badge.title).join(', ')
                  : 'None'}
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={user.thresholdsMet}
                  onChange={async (e) => {
                    const newValue = e.target.checked;
                    try {
                      const response = await fetch(`/api/rewards/eligibility/threshold/${user._id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ thresholdsMet: newValue }),
                      });
                      if (response.ok) {
                        setUsers(users.map(u => u._id === user._id ? { ...u, thresholdsMet: newValue } : u));
                      } else {
                        alert('Failed to update threshold status');
                      }
                    } catch (error) {
                      alert('Error updating threshold status: ' + error.message);
                    }
                  }}
                />
              </td>
              <td className="py-2 px-4 border-b">
                {user.approved ? '✅' : '❌'}
              </td>
              <td className="py-2 px-4 border-b">
                {!user.approved && user.thresholdsMet && (
                  <button
                    onClick={() => handleApproveBadge(user._id, user.badges[0]?._id)}
                    disabled={approvingUserId === user._id}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    {approvingUserId === user._id ? 'Approving...' : 'Approve Badge'}
                  </button>
                )}
                <button
                  onClick={() => handleSendEmail(user)}
                  disabled={sendingEmailUserId === user._id}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  {sendingEmailUserId === user._id ? 'Sending...' : 'Send Email'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Rewards = () => {
  const { token } = useContext(AuthContext);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReward, setNewReward] = useState({ title: '', description: '', cost: 0, imageUrl: '' });
  const [editingRewardId, setEditingRewardId] = useState(null);
  const [editingReward, setEditingReward] = useState({ title: '', description: '', cost: 0, imageUrl: '' });
  const [activeTab, setActiveTab] = useState('management');

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

  // Handle image file selection and upload
  const handleImageUpload = async (e, isEditing = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/rewards/upload-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        if (isEditing) {
          setEditingReward({ ...editingReward, imageUrl: data.imageUrl });
        } else {
          setNewReward({ ...newReward, imageUrl: data.imageUrl });
        }
      } else {
        alert('Image upload failed: ' + data.message);
      }
    } catch (error) {
      alert('Image upload error: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const created = await createReward(newReward, token);
      setRewards([...rewards, created]);
      setNewReward({ title: '', description: '', cost: 0, imageUrl: '' });
    } catch (error) {
      alert('Failed to add reward: ' + error.message);
    }
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
        <h1 className="text-2xl font-bold mb-6">Admin Rewards Panel</h1>
        <div className="mb-6">
          <nav className="mb-4 border-b border-gray-300">
            <button
              onClick={() => setActiveTab('management')}
              className={`mr-4 pb-2 ${activeTab === 'management' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
            >
              Rewards Management
            </button>
            <button
              onClick={() => setActiveTab('eligibility')}
              className={`mr-4 pb-2 ${activeTab === 'eligibility' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
            >
              Rewards Eligibility
            </button>
          </nav>
          {activeTab === 'management' && (
            <>
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, false)}
                className="border p-2 rounded"
              />
              <button
                type="button"
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Reward
              </button>
              <table className="min-w-full bg-white border border-gray-200 mt-4">
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
                  {rewards.map((reward) => (
                    <tr key={reward._id} className="text-center">
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          name="title"
                          value={reward.title}
                          onChange={(e) => {
                            const updatedRewards = [...rewards];
                            const index = updatedRewards.findIndex(r => r._id === reward._id);
                            updatedRewards[index] = { ...updatedRewards[index], title: e.target.value };
                            setRewards(updatedRewards);
                          }}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          name="description"
                          value={reward.description}
                          onChange={(e) => {
                            const updatedRewards = [...rewards];
                            const index = updatedRewards.findIndex(r => r._id === reward._id);
                            updatedRewards[index] = { ...updatedRewards[index], description: e.target.value };
                            setRewards(updatedRewards);
                          }}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b" title={`Users need to accumulate at least ${reward.cost} points to claim this reward.`}>
                        <input
                          type="number"
                          name="cost"
                          value={reward.cost}
                          onChange={(e) => {
                            const updatedRewards = [...rewards];
                            const index = updatedRewards.findIndex(r => r._id === reward._id);
                            updatedRewards[index] = { ...updatedRewards[index], cost: Number(e.target.value) };
                            setRewards(updatedRewards);
                          }}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        {reward.imageUrl ? (
                          <img
                            src={
                              reward.imageUrl.startsWith('http')
                                ? reward.imageUrl
                                : reward.imageUrl.startsWith('/src/assets')
                                ? reward.imageUrl.replace('/src', '')
                                : `${window.location.origin}${reward.imageUrl}`
                            }
                            alt={reward.title}
                            className="h-10 mx-auto mb-1"
                          />
                        ) : (
                          'N/A'
                        )}
                        <input
                          type="text"
                          name="imageUrl"
                          value={reward.imageUrl}
                          onChange={(e) => {
                            const updatedRewards = [...rewards];
                            const index = updatedRewards.findIndex(r => r._id === reward._id);
                            updatedRewards[index] = { ...updatedRewards[index], imageUrl: e.target.value };
                            setRewards(updatedRewards);
                          }}
                          className="border p-1 rounded w-full mb-1"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append('image', file);
                            try {
                              const response = await fetch('/api/rewards/upload-image', {
                                method: 'POST',
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                                body: formData,
                              });
                              const data = await response.json();
                              if (response.ok) {
                                const updatedRewards = [...rewards];
                                const index = updatedRewards.findIndex(r => r._id === reward._id);
                                updatedRewards[index] = { ...updatedRewards[index], imageUrl: data.imageUrl };
                                setRewards(updatedRewards);
                              } else {
                                alert('Image upload failed: ' + data.message);
                              }
                            } catch (error) {
                              alert('Image upload error: ' + error.message);
                            }
                          }}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        {!editingRewardId || editingRewardId !== reward._id ? (
                          <>
                            <button
                              onClick={() => {
                                setEditingRewardId(reward._id);
                                setEditingReward({ ...reward });
                              }}
                              className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                            >
                              Edit
                            </button>
                            {reward._id && (
                              <button
                                onClick={() => {
                                  setRewards(rewards.filter(r => r._id !== reward._id));
                                  handleDelete(reward._id);
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Delete
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              onClick={async () => {
                                try {
                                  const updated = await updateReward(editingRewardId, editingReward, token);
                                  setRewards(rewards.map(r => (r._id === editingRewardId ? updated : r)));
                                  setEditingRewardId(null);
                                  alert('Reward saved successfully');
                                } catch (error) {
                                  alert('Failed to save reward: ' + error.message);
                                }
                              }}
                              className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingRewardId(null);
                                setEditingReward({ title: '', description: '', cost: 0, imageUrl: '' });
                              }}
                              className="bg-gray-400 text-white px-3 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {activeTab === 'eligibility' && (
            <RewardsEligibilityTab token={token} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Rewards;
