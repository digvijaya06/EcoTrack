import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getGoals, updateGoal, deleteGoal } from '../../api/goalService';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

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

  if (loading) return <AdminLayout><div>Loading goals...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Goals Management</h1>
        <div className="mb-4">
          <label className="mr-4">Filter:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border px-2 py-1 rounded">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGoals.map(goal => (
              <tr key={goal._id} className="text-center">
                <td className="py-2 px-4 border-b">{goal.title}</td>
                <td className="py-2 px-4 border-b">{goal.user?.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{goal.completed ? 'Completed' : 'Active'}</td>
                <td className="py-2 px-4 border-b">
                  {!goal.completed && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => markComplete(goal._id)}
                    >
                      Mark Complete
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(goal._id)}
                  >
                    Delete
                  </button>
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
