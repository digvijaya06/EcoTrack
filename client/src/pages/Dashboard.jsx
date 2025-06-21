import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import {
  Target,
  Award,
  Leaf,
  Zap,
  Recycle,
  TreePine,
  Calendar,
  Plus,
  CheckCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { getDashboardData } from '../api/dashboard';
import { fetchUserAchievements } from '../api/userActions';

const colorMap = {
  eco: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-50'
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-50'
  },
  green: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    hover: 'hover:bg-emerald-50'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-50'
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [actionDistribution, setActionDistribution] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({
    totalPoints: 0,
    actionsCount: 0,
    co2Saved: 0,
    streak: 0
  });

  const quickActions = [
    { id: 1, icon: Recycle, label: 'Recycled Items', points: 15, color: 'eco' },
    { id: 2, icon: Zap, label: 'Energy Saved', points: 20, color: 'blue' },
    { id: 3, icon: TreePine, label: 'Planted Tree', points: 50, color: 'green' },
    { id: 4, icon: Target, label: 'Reduced Waste', points: 25, color: 'purple' }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDashboardData(selectedPeriod);
        const achievementsData = await fetchUserAchievements();

        const aggregatedRecent = data.recentActions.reduce((acc, action) => {
          const category = action.category || 'Action';
          const existing = acc.find(item => item.action === category);
          if (existing) {
            existing.points += action.points || 0;
          } else {
            acc.push({
              id: category,
              action: category,
              points: action.points || 0,
              time: new Date(action.createdAt).toLocaleString(),
              icon: getIconForCategory(category)
            });
          }
          return acc;
        }, []);
        setRecentActivities(aggregatedRecent);
        setActionDistribution(
          data.actionsByCategory.map((cat) => ({
            name: cat.category,
            value: cat.count,
            color: getColorForCategory(cat.category)
          }))
        );
        setStats({
          totalPoints: data.totalPoints || 0,
          actionsCount: data.actionsCount || 0,
          co2Saved: data.co2Saved || 0,
          streak: data.streak || 0
        });

        // Map backend badges to achievements for display on dashboard
        const mappedAchievements = achievementsData.badges.map((badge, index) => ({
          id: index + 1,
          title: badge,
          description: '',
          icon: Award,
          earned: true
        }));

        setAchievements(mappedAchievements);

        setDailyData(data.weeklyProgress || []);
        console.log('Weekly Progress Data:', data.weeklyProgress);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [selectedPeriod]);

  const getIconForCategory = (category) => {
    switch (category) {
      case 'Recycling':
        return Recycle;
      case 'Energy Saving':
        return Zap;
      case 'Transportation':
        return Target;
      case 'Water Conservation':
        return Leaf;
      default:
        return Target;
    }
  };

  const getColorForCategory = (category) => {
    switch (category.toLowerCase()) {
      case 'energy':
        return '#22c55e';
      case 'plastic-free lifestyle':
        return '#3b82f6';
      case 'tree & nature care':
        return '#f59e0b';
      case 'recycling':
        return '#8b5cf6';
      case 'energy saving':
        return '#10b981';
      case 'transportation':
        return '#f59e0b';
      case 'water conservation':
        return '#6366f1';
      default:
        return '#6b7280';
    }
  };

  const handleQuickAction = (action) => {
    // updatePoints(action.points); // Commented out as updatePoints is not in AuthContext
  };

  if (loading) {
    console.log('Dashboard loading...');
    return <div className="text-center py-20">Loading dashboard data...</div>;
  }

  if (error) {
    console.error('Dashboard error:', error);
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-earth-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 🌱
          </h1>
          <p className="text-gray-600">Track your environmental impact and build sustainable habits</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Points', value: stats.totalPoints, icon: Award, color: 'eco', change: '+120' },
            { label: 'Actions This Week', value: stats.actionsCount, icon: Target, color: 'blue', change: '+12' },
            { label: 'CO₂ Saved (kg)', value: stats.co2Saved, icon: Leaf, color: 'green', change: '+8.3' },
            { label: 'Current Streak', value: stats.streak + ' days', icon: Calendar, color: 'purple', change: '+1' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colors = colorMap[stat.color];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main Charts and Distribution */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Weekly Chart */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Weekly Progress</h3>
              <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="points"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', r: 6 }}
                    activeDot={{ r: 8, stroke: '#22c55e' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Distribution Pie */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Action Categories</h3>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={actionDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
                    {actionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {actionDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Cards: Actions, Activities, Achievements */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
              <Plus className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
{quickActions.map((quickAction) => {
  const Icon = quickAction.icon;
  const colors = colorMap[quickAction.color];
  return (
    <button key={quickAction.id} onClick={() => handleQuickAction(quickAction)}
      className={`w-full flex items-center justify-between p-3 rounded-lg border ${colors.border} hover:border-eco-300 ${colors.hover} transition-all duration-200 group`}
    >
      <div className="flex items-center space-x-2">
        <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <span className="font-medium text-gray-900">{quickAction.label}</span>
      </div>
      <span className="text-eco-600 font-semibold">+{quickAction.points}</span>
    </button>
  );
})}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-eco-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-eco-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <span className="text-eco-600 font-semibold text-sm">+{activity.points}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      achievement.earned ? 'bg-eco-50 border border-eco-200' : 'bg-gray-50 border border-gray-200 opacity-60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      achievement.earned ? 'bg-eco-100' : 'bg-gray-200'
                    }`}>
                      {achievement.earned ? (
                        <CheckCircle className="w-5 h-5 text-eco-600" />
                      ) : (
                        <Icon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  
