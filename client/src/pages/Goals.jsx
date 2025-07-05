import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import {
  fetchGoals,
  createGoal,
  updateGoal,
  deleteGoal
} from '../api/goalService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoalCard from '../components/goals/GoalCard';
import Modal from '../components/ui/Modal';

const Goals = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

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

  const [challenges, setChallenges] = useState([]);
  const [challengesLoading, setChallengesLoading] = useState(false);
  const [challengesError, setChallengesError] = useState(null);
  const [approvedChallengeIds, setApprovedChallengeIds] = useState([]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      setError('User not authenticated. Please login.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { targetValue, ...rest } = newGoal;
      const goalData = {
        ...rest,
        target: Number(targetValue),
        userId: user._id,
      };
      const response = await createGoal(goalData);
      console.log('Created goal:', response.data);
      setGoals(prevGoals => {
        const updatedGoals = [response.data, ...prevGoals];
        console.log('Updated goals list:', updatedGoals);
        return updatedGoals;
      });
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
      console.log('Fetched goals from server:', response.data);
      setGoals(response.data);
      console.log('Updated goals state:', response.data);
    } catch (err) {
      console.error('Failed to load goals', err);
      setError('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const loadChallenges = async () => {
    setChallengesLoading(true);
    setChallengesError(null);
    try {
      const response = await axios.get('/api/challenges');
      setChallenges(response.data);
    } catch (err) {
      console.error('Failed to load challenges', err);
      setChallengesError('Failed to load challenges');
    } finally {
      setChallengesLoading(false);
    }
  };

  const loadApprovedParticipations = async () => {
    try {
      const response = await axios.get('/api/challenges/joinedOrApprovedParticipations');
      // Filter out any null or undefined challenge objects before mapping
      const approvedIds = response.data
        .filter(p => p.challenge != null)
        .map(p => p.challenge._id);
      console.log('Loaded approved challenge IDs:', approvedIds);
      setApprovedChallengeIds(approvedIds);
    } catch (err) {
      console.error('Failed to load approved participations', err);
    }
  };

  useEffect(() => {
    console.log('User changed or component mounted, user:', user);
    if (user) {
      loadGoals();
      loadChallenges();
      loadApprovedParticipations();
    }
  }, [user]);

  const updateGoalProgress = async (goalId, newValue) => {
    const goal = goals.find(g => g._id === goalId);
    if (!goal) return;

    const updated = {
      progress: newValue,
    };

    if (newValue >= goal.targetValue && goal.status !== 'completed') {
      updated.status = 'completed';

      updatePoints(100); 
    }

    try {
      const response = await updateGoal(goalId, updated);
      setGoals(goals.map(g => g._id === goalId ? response.data : g));
    } catch (err) {
      console.error('Failed to update goal', err);
      setError('Failed to update goal');
    }
  };

  const toggleGoalCompletion = async (goalId) => {
    const goal = goals.find(g => g._id === goalId);
    if (!goal) return;

    const newStatus = goal.status === 'completed' ? 'active' : 'completed';

    try {
      const response = await updateGoal(goalId, { status: newStatus });
      setGoals(goals.map(g => g._id === goalId ? response.data : g));
    } catch (err) {
      console.error('Failed to toggle goal completion', err);
      setError('Failed to update goal status');
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
    const status = goal.status?.toLowerCase() || '';
    const activeTabLower = activeTab.toLowerCase();
    let matchTab = false;
    if (activeTabLower === 'active') {
      matchTab = (status === 'active' || status === 'in progress' || status === 'completed');
    } else {
      matchTab = status === activeTabLower;
    }
    const matchCategory = selectedCategory === 'all' || goal.category.toLowerCase() === selectedCategory.toLowerCase();
    const result = matchTab && matchCategory;
    console.log(`Filtering goal: ${goal.title}, category: ${goal.category}, status: ${goal.status}, match: ${result}`);
    return result;
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
        {['active', 'impact','challenges'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'impact' ? 'Impact Questions' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Category Filter - Show only for Active or Completed tab */}
      {(activeTab === 'active' || activeTab === 'completed') && (
        <>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.length === 0 ? (
              <p>No goals found.</p>
            ) : (
              filteredGoals.map(goal => (
                <GoalCard
                  key={goal._id}
                  goal={goal}
                  updateProgress={updateGoalProgress}
                  onClick={toggleGoalCompletion}
                />
              ))
            )}
          </div>
        </>
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

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="mb-8 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Challenges</h2>
          {challengesLoading && <p>Loading challenges...</p>}
          {challengesError && <p className="text-red-600">{challengesError}</p>}
          {!challengesLoading && !challengesError && (
            <ul className="space-y-4">
              {challenges.length === 0 ? (
                <li>No challenges available.</li>
              ) : (
                challenges.map((challenge) => (
                  <li key={challenge._id} className="border p-4 rounded bg-white shadow-sm">
                    <h3 className="text-xl font-semibold">{challenge.title}</h3>
                    <p className="text-gray-700 mb-2">{challenge.description}</p>
                    <p className="text-sm text-gray-600">Points Required: {challenge.cost}</p>
                    <button
                    onClick={async () => {
                      if (user) {
                        try {
                          const response = await fetch('/api/challenges/join', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userId: user._id, challengeId: challenge._id }),
                          });
                          if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || 'Failed to join challenge');
                          }
                          setSelectedChallenge(challenge);
                          // Immediately add challenge._id to approvedChallengeIds to disable button
                          setApprovedChallengeIds(prev => [...prev, challenge._id]);
                          navigate('/log-action', { state: { challenge } });
                        } catch (error) {
                          console.error('Failed to join challenge:', error);
                          alert('Failed to join challenge: ' + error.message);
                        }
                      } else {
                        navigate('/login');
                      }
                    }}
                      className={`mt-2 px-4 py-2 rounded transition-colors ${
                        approvedChallengeIds.includes(challenge._id.toString())
                          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    disabled={approvedChallengeIds.includes(challenge._id.toString())}
                    >
                      Join Challenge
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
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
