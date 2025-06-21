import React, { useState, useEffect, useContext } from 'react';
import GoalCard from '../components/goals/GoalCard';
import GoalAnalytics from '../components/goals/GoalAnalytics';
import { API_URL } from '../config/constants';
import axios from 'axios';
import { updateGoal } from '../api/goalService';
import { AuthContext } from '../context/AuthContext';

const categories = ['ENERGY', 'WATER', 'WASTE', 'TRANSPORTATION', 'FOOD', 'COMMUNITY', 'OTHER'];

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'ENERGY',
    targetValue: '',
    unit: '',
    deadline: '',
  });

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    showCompleted: true,
  });

  const { user, updateUser } = useContext(AuthContext);

  // Fetch all goals from backend
  const fetchGoals = async () => {
    try {
      if (!user || !user._id) {
        console.error('User ID not found in AuthContext user object');
        return;
      }
      const userId = user._id;
      const res = await axios.get(`${API_URL}/api/goals/user/${userId}`);
      setGoals(res.data);
    } catch (err) {
      console.error('Error fetching goals:', err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!newGoal.title.trim() || !newGoal.targetValue.trim() || !newGoal.unit.trim()) {
      alert('Please fill in all required fields: Title, Target Value, and Unit.');
      return;
    }

    try {
      if (!user || !user._id) {
        alert('User not logged in. Please login to add goals.');
        return;
      }
      const userId = user._id;

      const res = await axios.post(`${API_URL}/api/goals`, {
        ...newGoal,
        userId,
        progress: 0,
        completed: false,
        createdAt: new Date(),
        deadline: newGoal.deadline ? new Date(newGoal.deadline) : null,
      });

      setGoals([res.data, ...goals]);
      setNewGoal({
        title: '',
        description: '',
        category: 'ENERGY',
        targetValue: '',
        unit: '',
        deadline: '',
      });

      // Show success popup
      alert('Goal added successfully!');
    } catch (err) {
      console.error('Error creating goal:', err);
      alert('Failed to add goal. Please try again.');
    }
  };

  const toggleGoalCompletion = async (goalId) => {
    try {
      const updated = goals.map((g) =>
        g._id === goalId ? { ...g, completed: !g.completed } : g
      );
      setGoals(updated);

      const goal = goals.find((g) => g._id === goalId);
      await axios.put(`${API_URL}/api/goals/${goalId}`, {
        completed: !goal.completed,
      });
    } catch (err) {
      console.error('Error updating goal status:', err);
    }
  };

  const updateGoalProgress = async (goalId, newProgress) => {
    try {
      const updated = goals.map((g) =>
        g._id === goalId ? { ...g, progress: newProgress, completed: newProgress >= Number(g.target) } : g
      );
      setGoals(updated);

      // Determine if goal is completed
      const goal = goals.find((g) => g._id === goalId);
      const isCompleted = newProgress >= Number(goal.target);

      // Send progress and completed status in update
      await updateGoal(goalId, {
        progress: newProgress,
        completed: isCompleted,
      });

      // Refresh user data to update badges in profile
      const res = await axios.get(`${API_URL}/api/users/me`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      if (res.data) {
        updateUser(res.data);
      }
    } catch (err) {
      console.error('Error updating goal progress:', err);
    }
  };

  const filteredGoals = goals.filter((goal) => {
    const matchCategory = filters.category === 'all' || goal.category === filters.category;
    const matchCompletion = filters.showCompleted || !goal.completed;
    return matchCategory && matchCompletion;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🌱 My Sustainability Goals</h1>

      {/* New Goal Form */}
      <div className="bg-white shadow-md p-4 rounded-md mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Create a Goal</h2>
        <input
          type="text"
          placeholder="Goal title"
          className="border px-3 py-2 rounded w-full"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
        />
        <textarea
          placeholder="Optional description"
          className="border px-3 py-2 rounded w-full"
          value={newGoal.description}
          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
        />
        <div className="flex gap-3">
          <select
            className="border px-3 py-2 rounded"
            value={newGoal.category}
            onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Target value"
            className="border px-3 py-2 rounded w-1/4"
            value={newGoal.targetValue}
            onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
          />
          <input
            type="text"
            placeholder="Unit (e.g., kWh, liters)"
            className="border px-3 py-2 rounded w-1/4"
            value={newGoal.unit}
            onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
          />
          <input
            type="date"
            placeholder="Deadline"
            className="border px-3 py-2 rounded w-1/4"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
          />
          <button
            onClick={handleAddGoal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md p-4 rounded-md mb-6 flex flex-wrap gap-4 items-center">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.showCompleted}
            onChange={() => setFilters({ ...filters, showCompleted: !filters.showCompleted })}
          />
          <span>Show Completed</span>
        </label>
      </div>

      {/* Goal Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.length ? (
          filteredGoals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onClick={toggleGoalCompletion}
              updateProgress={updateGoalProgress}
            />
          ))
        ) : (
          <p className="text-green-500">No goals match the filter.</p>
        )}
      </div>

      <GoalAnalytics goals={goals} />
    </div>
  );
};

export default Goals;
