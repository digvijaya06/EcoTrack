import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Leaf,
  Zap,
  Droplets,
  Recycle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const monthlyData = [
    { month: 'Jan', carbonSaved: 12.5, energySaved: 145, wasteReduced: 23, points: 450 },
    { month: 'Feb', carbonSaved: 15.2, energySaved: 167, wasteReduced: 28, points: 520 },
    { month: 'Mar', carbonSaved: 18.7, energySaved: 189, wasteReduced: 35, points: 680 },
    { month: 'Apr', carbonSaved: 22.1, energySaved: 210, wasteReduced: 42, points: 750 },
    { month: 'May', carbonSaved: 25.8, energySaved: 234, wasteReduced: 38, points: 820 },
    { month: 'Jun', carbonSaved: 30.2, energySaved: 256, wasteReduced: 45, points: 950 }
  ];

  const weeklyData = [
    { day: 'Mon', actions: 5, points: 85 },
    { day: 'Tue', actions: 8, points: 120 },
    { day: 'Wed', actions: 6, points: 95 },
    { day: 'Thu', actions: 10, points: 145 },
    { day: 'Fri', actions: 7, points: 110 },
    { day: 'Sat', actions: 12, points: 180 },
    { day: 'Sun', actions: 9, points: 135 }
  ];

  const categoryData = [
    { name: 'Recycling', value: 35, color: '#22c55e', count: 45 },
    { name: 'Energy Saving', value: 28, color: '#3b82f6', count: 32 },
    { name: 'Transportation', value: 22, color: '#f59e0b', count: 28 },
    { name: 'Water Conservation', value: 15, color: '#8b5cf6', count: 18 }
  ];

  const impactData = [
    { category: 'Carbon Footprint', current: 75, target: 100, color: '#22c55e', unit: 'kg CO₂' },
    { category: 'Energy Usage', current: 60, target: 100, color: '#3b82f6', unit: 'kWh' },
    { category: 'Waste Reduction', current: 85, target: 100, color: '#f59e0b', unit: 'kg' },
    { category: 'Water Saved', current: 45, target: 100, color: '#06b6d4', unit: 'liters' }
  ];

  const achievements = [
    { title: 'Carbon Neutral Week', description: 'Achieved net-zero carbon for 7 days', date: '2024-01-15', icon: Leaf },
    { title: 'Energy Efficiency Master', description: 'Reduced energy usage by 30%', date: '2024-01-10', icon: Zap },
    { title: 'Waste Warrior', description: 'Zero waste for 5 consecutive days', date: '2024-01-08', icon: Recycle },
    { title: 'Water Conservation Champion', description: 'Saved 500L of water this month', date: '2024-01-05', icon: Droplets }
  ];

  const kpiCards = [
    { 
      title: 'Total Carbon Saved', 
      value: '124.5', 
      unit: 'kg CO₂', 
      change: '+15.2%', 
      icon: Leaf, 
      color: 'green',
      trend: 'up'
    },
    { 
      title: 'Energy Conserved', 
      value: '1,401', 
      unit: 'kWh', 
      change: '+22.8%', 
      icon: Zap, 
      color: 'blue',
      trend: 'up'
    },
    { 
      title: 'Waste Reduced', 
      value: '231', 
      unit: 'kg', 
      change: '+8.5%', 
      icon: Recycle, 
      color: 'purple',
      trend: 'up'
    },
    { 
      title: 'Water Saved', 
      value: '2,156', 
      unit: 'liters', 
      change: '+12.3%', 
      icon: Droplets, 
      color: 'cyan',
      trend: 'up'
    }
  ];

  const exportData = () => {
    // In a real app, this would generate and download a report
    console.log('Exporting analytics data...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-earth-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Environmental Analytics</h1>
            <p className="text-gray-600">Track your progress and environmental impact over time</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <button
              onClick={exportData}
              className="inline-flex items-center px-4 py-2 bg-eco-600 text-white rounded-lg hover:bg-eco-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${kpi.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    kpi.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{kpi.unit}</span>
                </h3>
                <p className="text-gray-600 text-sm">{kpi.title}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Environmental Impact Trends</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-eco-500"
                >
                  <option value="all">All Metrics</option>
                  <option value="carbon">Carbon Saved</option>
                  <option value="energy">Energy Saved</option>
                  <option value="waste">Waste Reduced</option>
                </select>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="carbonSaved"
                    stackId="1"
                    stroke="#22c55e"
                    fill="url(#carbonGradient)"
                    name="Carbon Saved (kg)"
                  />
                  <Area
                    type="monotone"
                    dataKey="energySaved"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="url(#energyGradient)"
                    name="Energy Saved (kWh)"
                  />
                  <Area
                    type="monotone"
                    dataKey="wasteReduced"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="url(#wasteGradient)"
                    name="Waste Reduced (kg)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Action Categories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Action Distribution</h3>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{item.count} actions</div>
                    <div className="text-xs text-gray-500">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Activity Pattern</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="actions" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Goal Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Goal Progress</h3>
            <div className="space-y-6">
              {impactData.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm text-gray-500">
                      {item.current}/{item.target} {item.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(item.current / item.target) * 100}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {Math.round((item.current / item.target) * 100)}% complete
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-eco-300 hover:bg-eco-50 transition-all">
                  <div className="w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-eco-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
