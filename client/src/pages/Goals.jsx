import React, { useState } from 'react';

const categories = [
  'ENERGY',
  'WATER',
  'WASTE',
  'TRANSPORTATION',
  'FOOD',
  'COMMUNITY',
  'OTHER',
];

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);

  // New goal form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('ENERGY');

  const addGoal = () => {
    if (!newTitle.trim()) return; // prevent empty title

    const newGoal = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      completed: false,
    };

    setGoals([newGoal, ...goals]);
    setNewTitle('');
    setNewCategory('ENERGY');
  };

  const toggleCompleted = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || goal.category === selectedCategory;
    const matchesCompletionStatus = showCompleted ? true : !goal.completed;

    return matchesSearch && matchesCategory && matchesCompletionStatus;
  });

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;
  const activeGoals = totalGoals - completedGoals;
  const progressPercent = totalGoals ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <div className="bg-gray-50 min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Sustainability Goals</h1>
      <p className="mb-8 text-gray-600">Set targets and track your progress</p>

      {/* New Goal Form */}
      <div className="mb-8 p-4 border rounded bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Create New Goal</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Goal title"
            className="border px-3 py-2 rounded flex-grow"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={addGoal}
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 text-white rounded p-4 shadow">
          <h3 className="text-lg font-semibold">Total Progress</h3>
          <p>{progressPercent}% Complete</p>
          <div className="w-full bg-blue-400 rounded h-3 mt-2">
            <div
              className="bg-white h-3 rounded"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="bg-green-100 text-green-800 rounded p-4 shadow">
          <h3 className="text-lg font-semibold">Completed Goals</h3>
          <p className="text-3xl font-bold">{completedGoals}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 rounded p-4 shadow">
          <h3 className="text-lg font-semibold">Active Goals</h3>
          <p className="text-3xl font-bold">{activeGoals}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 p-4 border rounded bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Filter Goals</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search goals..."
            className="border px-3 py-2 rounded flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              className="form-checkbox"
            />
            <span>Show Completed</span>
          </label>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.length === 0 ? (
          <p className="text-center text-gray-500">No goals found matching your criteria.</p>
        ) : (
          filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-4 border rounded cursor-pointer flex justify-between items-center ${
                goal.completed ? 'bg-green-50' : 'bg-white'
              }`}
              onClick={() => toggleCompleted(goal.id)}
              title="Click to toggle completed"
            >
              <div>
                <h3
                  className={`font-semibold ${
                    goal.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {goal.title}
                </h3>
                <p className="text-sm text-gray-600">{goal.category}</p>
              </div>
              <div>
                {goal.completed ? (
                  <span className="text-green-600 font-bold">✅</span>
                ) : (
                  <span className="text-gray-400 font-bold">⭕</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Goals;
