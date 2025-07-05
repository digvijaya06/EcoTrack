import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf,
  Zap,
  Recycle,
  Droplets
} from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import { 
  getOverallMonthlyImpact, 
  getActionCategories, 
  getTopUsers 
} from '../api/analytics';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('this_month');
  const [kpiCards, setKpiCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch monthly impact data
        const monthlyImpact = await getOverallMonthlyImpact();
        const mappedMonthlyData = monthlyImpact.map(item => ({
          month: new Date(item.year, item.month - 1).toLocaleString('default', { month: 'short' }),
          carbonSaved: item.carbonSaved || 0,
          energySaved: item.energySaved || 0,
          wasteReduced: item.wasteReduced || 0
        }));
        setMonthlyData(mappedMonthlyData);

        // Fetch category summary data
        const categories = await getActionCategories();
        const mappedCategories = categories.map(cat => ({
          name: cat.category,
          value: cat.completionRate,
          count: cat.total,
          color: getCategoryColor(cat.category)
        }));
        setCategoryData(mappedCategories);

        // Fetch top users data
        const users = await getTopUsers();
        setTopUsers(users);

        setLoading(false);
      } catch (err) {
        setError('Failed to load analytics data');
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const getCategoryColor = (category) => {
    const colors = {
      'WASTE REDUCED': '#f59e0b',       // orange
      'ENERGY CONSERVED': '#3b82f6',    // blue
      'WATER SAVED': '#06b6d4',         // cyan
      'TOTAL CARBON SAVED': '#22c55e'   // green
    };
    return colors[category.toUpperCase()] || '#888888';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-earth-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Analytics</h1>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
            >
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="last_30_days">Last 30 Days</option>
            </select>
          </div>
        </motion.div>

        {loading && <p>Loading analytics data...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Monthly Impact Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Environmental Impact Trends</h3>
          <div className="h-80">
            <Bar
              data={{
                labels: monthlyData.map(item => item.month),
                datasets: [
                  {
                    label: 'Carbon Saved (kg)',
                    data: monthlyData.map(item => item.carbonSaved),
                    backgroundColor: '#22c55e',
                  },
                  {
                    label: 'Energy Conserved (kWh)',
                    data: monthlyData.map(item => item.energySaved),
                    backgroundColor: '#3b82f6',
                  },
                  {
                    label: 'Waste Reduced (kg)',
                    data: monthlyData.map(item => item.wasteReduced),
                    backgroundColor: '#f59e0b',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' },
                  tooltip: { mode: 'index', intersect: false },
                },
                interaction: { mode: 'nearest', axis: 'x', intersect: false },
                scales: {
                  x: { stacked: false },
                  y: { beginAtZero: true, stacked: false },
                },
              }}
            />
          </div>
        </div>

        {/* Category Summary Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Category Engagement Heatmap</h3>
          <div className="h-64 mb-4">
            <Pie
              data={{
                labels: categoryData.map(item => item.name),
                datasets: [{
                  data: categoryData.map(item => item.value),
                  backgroundColor: categoryData.map(item => item.color),
                  borderWidth: 1,
                }],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' },
                  tooltip: {
                    callbacks: {
                      label: context => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value.toFixed(2)}%`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
          <div className="space-y-3">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex flex-col items-start space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.value.toFixed(2)}%</span>
                  </div>
                  <div className="text-xs text-gray-500">{item.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{item.count} actions</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Users Table */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Users</h3>
          {topUsers.length === 0 ? (
            <p>No top users data available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions Logged</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Carbon Saved (kg)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Goals Completed</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topUsers.map(user => (
                  <tr key={user.userId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{user.actionCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{user.totalCarbonSaved.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{user.goalsCompleted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
