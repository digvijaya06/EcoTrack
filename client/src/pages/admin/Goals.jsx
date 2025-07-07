import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getGoals, updateGoal, deleteGoal, createGoal } from '../../api/goalService';
import { AuthContext } from '../../context/AuthContext';

const Goals = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [editingGoal, setEditingGoal] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('');
  const [newGoalTargetValue, setNewGoalTargetValue] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGoals() {
      const data = await getGoals();
      setGoals(data);
      setLoading(false);
    }
    fetchGoals();
  }, []);

  const filteredGoals = goals.filter(goal => {
    if (filter === 'completed') return goal.completed;
    if (filter === 'active') return !goal.completed;
    return true;
  });

  const markComplete = async (goalId) => {
    await updateGoal(goalId, { completed: true });
    setGoals(goals.map(goal => goal._id === goalId ? { ...goal, completed: true } : goal));
  };

  const handleDelete = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(goalId);
      setGoals(goals.filter(goal => goal._id !== goalId));
    }
  };

  const startEditing = (goal) => {
    setEditingGoal(goal);
    setEditedTitle(goal.title);
  };

  const cancelEditing = () => {
    setEditingGoal(null);
    setEditedTitle('');
  };

  const saveEdit = async () => {
    await updateGoal(editingGoal._id, { title: editedTitle });
    setGoals(goals.map(goal => goal._id === editingGoal._id ? { ...goal, title: editedTitle } : goal));
    cancelEditing();
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setError(null);
    if (!newGoalTitle || !newGoalCategory || !newGoalTargetValue) {
      setError('Please fill in all fields');
      return;
    }
    if (!user || !user._id) {
      setError('User not authenticated');
      return;
    }
    setAdding(true);
    try {
      const goalData = {
        title: newGoalTitle,
        category: newGoalCategory,
        targetValue: newGoalTargetValue,
        userId: user._id,
      };
      const createdGoal = await createGoal(goalData);
      setGoals([createdGoal, ...goals]);
      setNewGoalTitle('');
      setNewGoalCategory('');
      setNewGoalTargetValue('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add goal');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <AdminLayout><div>Loading goals...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
        <h1 className="text-3xl font-extrabold mb-6 text-green-900">Goals Management</h1>

        <form onSubmit={handleAddGoal} className="mb-8 border border-green-300 p-6 rounded-lg bg-green-50">
          <h2 className="text-2xl font-semibold mb-6 text-green-800">Add New Goal</h2>
          {error && <div className="mb-6 text-red-600">{error}</div>}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-green-900">Title</label>
            <input
              type="text"
              value={newGoalTitle}
              onChange={e => setNewGoalTitle(e.target.value)}
              className="border border-green-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              disabled={adding}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-green-900">Category</label>
            <input
              type="text"
              value={newGoalCategory}
              onChange={e => setNewGoalCategory(e.target.value)}
              className="border border-green-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              disabled={adding}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-green-900">Target Value</label>
            <input
              type="number"
              value={newGoalTargetValue}
              onChange={e => setNewGoalTargetValue(e.target.value)}
              className="border border-green-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              disabled={adding}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 transition"
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add Goal'}
          </button>
        </form>

        <div className="mb-6">
          <label className="mr-6 font-semibold text-green-900">Filter:</label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </div>
        <table className="min-w-full bg-white border border-green-300 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-green-100 text-green-900">
            <tr>
              <th className="py-3 px-6 border-b font-semibold text-left">Title</th>
              <th className="py-3 px-6 border-b font-semibold text-left">User</th>
              <th className="py-3 px-6 border-b font-semibold text-left">Status</th>
              <th className="py-3 px-6 border-b font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGoals.map(goal => (
              <tr key={goal._id} className="text-center hover:bg-green-50 transition-colors duration-200">
                <td className="py-3 px-6 border-b">
                  {editingGoal && editingGoal._id === goal._id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={e => setEditedTitle(e.target.value)}
                      className="border border-green-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                  ) : (
                    goal.title
                  )}
                </td>
                <td className="py-3 px-6 border-b">{goal.user?.name || 'N/A'}</td>
                <td className="py-3 px-6 border-b">{goal.completed ? 'Completed' : 'Active'}</td>
                <td className="py-3 px-6 border-b space-x-2">
                  {editingGoal && editingGoal._id === goal._id ? (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {!goal.completed && (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                          onClick={() => markComplete(goal._id)}
                        >
                          Mark Complete
                        </button>
                      )}
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                        onClick={() => startEditing(goal)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                        onClick={() => handleDelete(goal._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Goals;
