import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useUser } from '../context/UserContext';
import {
  fetchGoals,
  createGoal,
  updateGoal,
  deleteGoal
} from '../api/goalService';
import axios from 'axios';

import GoalCardDetailed from '../components/goals/GoalCardDetailed';
import GoalAnalytics from '../components/goals/GoalAnalytics';
import Modal from '../components/ui/Modal';

const Goals = () => {
  const { user, updatePoints } = useUser();
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'carbon',
    targetValue: '',
    unit: '',
    deadline: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [questions, setQuestions] = useState([
    { id: 1, text: 'How much total carbon saved?', value: '', unit: 'kg CO₂' },
    { id: 2, text: 'How much energy conserved?', value: '', unit: 'kWh' },
    { id: 3, text: 'How much waste reduced?', value: '', unit: 'kg' },
    { id: 4, text: 'How much water saved?', value: '', unit: 'liters' }
  ]);
  const [questionFeedback, setQuestionFeedback] = useState(null);
  const [questionLoading, setQuestionLoading] = useState(false);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await createGoal(newGoal);
      setGoals([...goals, response.data]);
      setNewGoal({
        title: '',
        description: '',
        category: 'carbon',
        targetValue: '',
        unit: '',
        deadline: '',
        priority: 'medium'
      });
      setShowAddGoal(false);
    } catch (err) {
      console.error('Failed to add goal', err);
      setError('Failed to add goal');
    } finally {
      setLoading(false);
    }
  };

  const loadGoals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchGoals();
      setGoals(response.data);
    } catch (err) {
      console.error('Failed to load goals', err);
      setError('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadGoals();
  }, [user]);

const updateGoalProgress = async (goalId, newValue) => {
  const goal = goals.find(g => g._id === goalId);
  if (!goal) return;

  const updated = {
    progress: newValue,
  };

  if (newValue >= goal.targetValue && goal.status !== 'completed') {
    updated.status = 'completed';

    updatePoints(100); // reward points
  }

  try {
    const response = await updateGoal(goalId, updated);
    setGoals(goals.map(g => g._id === goalId ? response.data : g));
  } catch (err) {
    console.error('Failed to update goal', err);
    setError('Failed to update goal');
  }
};

  const deleteGoalHandler = async (goalId) => {
    try {
      await deleteGoal(goalId);
      setGoals(goals.filter(goal => goal._id !== goalId));
    } catch (err) {
      console.error('Failed to delete goal', err);
      setError('Failed to delete goal');
    }
  };
  const filteredGoals = goals.filter(goal => {
    const matchTab = activeTab === 'analytics' || goal.status === activeTab;
    const matchCategory = selectedCategory === 'all' || goal.category === selectedCategory;
    return matchTab && matchCategory;
  });

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setQuestionLoading(true);
    setQuestionFeedback(null);
    try {
      const payload = questions.map(q => ({
        question: q.text,
        response: q.value + ' ' + q.unit
      }));
      await axios.post('/api/analytics/user-question-response/batch', { responses: payload });
      setQuestionFeedback({ type: 'success', message: 'Responses saved successfully!' });
      setQuestions(questions.map(q => ({ ...q, value: '' })));
    } catch (error) {
      setQuestionFeedback({ type: 'error', message: 'Failed to save responses.' });
    } finally {
      setQuestionLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Goals</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {['active', 'impact', 'analytics'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'impact' ? 'Impact Questions' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Category Filter - Show only for Active tab */}
      {activeTab === 'active' && (
        <div className="mb-6">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Categories</option>
            <option value="carbon">Carbon</option>
            <option value="water">Water</option>
            <option value="energy">Energy</option>
            <option value="waste">Waste</option>
            <option value="transportation">Transportation</option>
            <option value="food">Food</option>
          </select>
        </div>
      )}

      {/* Environmental Impact Questions */}
      {activeTab === 'impact' && (
        <div className="mb-8 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Environmental Impact Questions</h2>
          <form onSubmit={handleQuestionSubmit}>
            {questions.map((q) => (
              <div key={q.id} className="mb-4">
                <label className="block mb-1 font-medium">{q.text}</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={q.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuestions(questions.map(item => item.id === q.id ? { ...item, value: val } : item));
                    }}
                    className="w-full border rounded p-2"
                    required
                    min="0"
                  />
                  <span className="inline-flex items-center px-3 rounded border bg-gray-100 text-gray-700 select-none">
                    {q.unit}
                  </span>
                </div>
              </div>
            ))}
            <button
              type="submit"
              disabled={questionLoading}
              className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {questionLoading ? 'Saving...' : 'Submit Responses'}
            </button>
          </form>
          {questionFeedback && (
            <p className={`mt-2 ${questionFeedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {questionFeedback.message}
            </p>
          )}
        </div>
      )}

      {/* Goal Analytics or List */}
      {activeTab === 'analytics' ? (
        <GoalAnalytics goals={goals} />
      ) : activeTab === 'active' && (
        <div className="space-y-6">
          {filteredGoals.map(goal => (
            <GoalCardDetailed
              key={goal._id}
              goal={goal}
              updateProgress={updateGoalProgress}
              onEdit={(goal) => {
                console.log('Edit goal', goal);
              }}
              onDelete={(goal) => deleteGoalHandler(goal._id)}
            />
          ))}
        </div>
      )}

      {/* Add Goal Button */}
      {activeTab === 'active' && (
        <div className="mt-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setShowAddGoal(true)}
          >
            <Plus className="inline-block mr-2" /> Add Goal
          </button>
        </div>
      )}

      {/* Add Goal Modal */}
      <Modal
        isOpen={showAddGoal}
        onClose={() => setShowAddGoal(false)}
        title="Create New Goal"
      >
        {/* Original shorter form content placeholder */}
        <form onSubmit={handleAddGoal}>
          <input
            type="text"
            placeholder="Title"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            required
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            placeholder="Description"
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            required
            className="border p-2 rounded w-full mb-2"
            rows={3}
          />
          <select
            value={newGoal.category}
            onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
            className="border p-2 rounded w-full mb-2"
            required
          >
            <option value="carbon">Carbon</option>
            <option value="water">Water</option>
            <option value="energy">Energy</option>
            <option value="waste">Waste</option>
            <option value="transportation">Transportation</option>
            <option value="food">Food</option>
          </select>
          <input
            type="number"
            placeholder="Target Value"
            value={newGoal.targetValue}
            onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
            required
            className="border p-2 rounded w-full mb-2"
            min="1"
          />
          <input
            type="text"
            placeholder="Unit"
            value={newGoal.unit}
            onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
            required
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="date"
            placeholder="Deadline"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            required
            className="border p-2 rounded w-full mb-2"
          />
          <select
            value={newGoal.priority}
            onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
            className="border p-2 rounded w-full mb-2"
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddGoal(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Goal
            </button>
          </div>
        </form>
      </Modal>

      {/* Feedback */}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
    </div>
  );
};

export default Goals;
