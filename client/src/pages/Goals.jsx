import React, { useState, useEffect } from 'react';
import GoalCard from '../components/goals/GoalCard';
import { API_URL } from '../config/constants';
import axios from 'axios';
import { updateGoal } from '../api/goalService';

const categories = ['ENERGY', 'WATER', 'WASTE', 'TRANSPORTATION', 'FOOD', 'COMMUNITY', 'OTHER'];

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'ENERGY',
    targetValue: '',
    unit: '',
  });

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    showCompleted: true,
  });

  // Fetch all goals from backend
  const fetchGoals = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/goals`);
      setGoals(res.data);
    } catch (err) {
      console.error('Error fetching goals:', err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!newGoal.title.trim() || !newGoal.targetValue.trim() || !newGoal.unit.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/api/goals`, {
        ...newGoal,
        currentValue: 0,
        completed: false,
        createdAt: new Date(),
      });

      setGoals([res.data, ...goals]);
      setNewGoal({
        title: '',
        description: '',
        category: 'ENERGY',
        targetValue: '',
        unit: '',
      });
    } catch (err) {
      console.error('Error creating goal:', err);
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
        ...goal,
        completed: !goal.completed,
      });
    } catch (err) {
      console.error('Error updating goal status:', err);
    }
  };

  const updateGoalProgress = async (goalId, newProgress) => {
    try {
      const updated = goals.map((g) =>
        g._id === goalId ? { ...g, currentValue: newProgress } : g
      );
      setGoals(updated);

      const goal = goals.find((g) => g._id === goalId);
      await updateGoal(goalId, {
        ...goal,
        progress: newProgress,
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
    const matchSearch = goal.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchCategory = filters.category === 'all' || goal.category === filters.category;
    const matchCompletion = filters.showCompleted || !goal.completed;
    return matchSearch && matchCategory && matchCompletion;
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
            className="border px-3 py-2 rounded w-1/3"
            value={newGoal.targetValue}
            onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
          />
          <input
            type="text"
            placeholder="Unit (e.g., kWh, liters)"
            className="border px-3 py-2 rounded w-1/3"
            value={newGoal.unit}
            onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
          />
          <button
            onClick={handleAddGoal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md p-4 rounded-md mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search goals..."
          className="border px-3 py-2 rounded w-full sm:w-auto flex-grow"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
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
            <GoalCard key={goal._id} goal={goal} onClick={toggleGoalCompletion} updateProgress={updateGoalProgress} />
          ))
        ) : (
          <p className="text-gray-500">No goals match the filter.</p>
        )}
      </div>
    </div>
  );
};

export default Goals;
