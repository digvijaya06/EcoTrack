import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to load dashboard');
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setDashboardData({ recentActions: [], actionsByCategory: [], streak: 0, actionsCount: 0, totalPoints: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (!user || loading || !dashboardData) {
    return (
      <div className="flex h-screen justify-center items-center flex-col">
        <p className="text-lg text-gray-500 font-medium">Loading your dashboard...</p>
        <div className="mt-4 w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name} 👋</h1>
          <p className="text-sm text-gray-500 mt-1">Your eco journey at a glance</p>
        </div>
        <span className="mt-3 md:mt-0 inline-block bg-green-100 text-green-700 px-4 py-1 text-sm rounded-full font-semibold">
          🌿 Eco Level: {user.level || 1}
        </span>
      </div>

      <motion.div variants={item}>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-8">
          <div>
            <p className="text-sm text-gray-500">Points</p>
            <p className="text-2xl font-bold text-green-600">{dashboardData.totalPoints || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Level</p>
            <p className="text-2xl font-bold text-blue-600">{user.level || 1}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Streak</p>
            <p className="text-2xl font-bold text-orange-500">{dashboardData.streak} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Actions</p>
            <p className="text-2xl font-bold text-purple-600">{dashboardData.actionsCount}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div variants={item} className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Actions</h2>
            <ul className="space-y-4">
              {dashboardData.recentActions.length > 0 ? (
                dashboardData.recentActions.map(action => (
                  <li key={action._id} className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-700">{action.title}</p>
                      <p className="text-sm text-gray-400 capitalize">{action.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{action.points} pts</span>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-400">No actions yet.</p>
              )}
            </ul>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Actions by Category</h2>
            <ul className="space-y-3">
              {dashboardData.actionsByCategory.length > 0 ? (
                dashboardData.actionsByCategory.map(({ category, count }) => (
                  <li key={category} className="flex justify-between text-sm text-gray-600 capitalize">
                    <span>{category}</span>
                    <span className="font-bold text-blue-500">{count}</span>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-400">No data available</p>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
