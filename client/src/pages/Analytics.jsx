import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { Line, Pie, Bar } from 'react-chartjs-2';
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

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [kpiCards, setKpiCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([
    { name: 'Carbon Saved', value: 35, color: '#22c55e', count: 45 },
    { name: 'Waste Reduced', value: 28, color: '#f59e0b', count: 32 },
    
    { name: 'Energy Conserved', value: 15, color: '#3b82f6', count: 18 }
  ]);
  

  useEffect(() => {
    const fetchAggregatedResponses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/analytics/user-question-response/aggregated');
        const data = response.data;

        const mappedKpiCards = data.map(item => {
          let icon, color;
          switch (item.question.toLowerCase()) {
            case 'how much total carbon saved?':
              icon = Leaf;
              color = 'green';
              break;
            case 'how much energy conserved?':
              icon = Zap;
              color = 'blue';
              break;
            case 'how much waste reduced?':
              icon = Recycle;
              color = 'purple';
              break;
            case 'how much water saved?':
              icon = Droplets;
              color = 'cyan';
              break;
            default:
              icon = Leaf;
              color = 'gray';
          }
          return {
            title: item.question,
            value: item.total.toLocaleString(undefined, { maximumFractionDigits: 2 }),
            unit: item.unit,
            change: '',
            icon,
            color,
            trend: 'up'
          };
        });

        setKpiCards(mappedKpiCards);
        setLoading(false);
      } catch (error) {
        setError('Failed to load analytics data');
        setLoading(false);
      }
    };

    const fetchMonthlyImpact = async () => {
      try {
        const response = await axios.get('/api/analytics/overall-monthly-impact');
        const data = response.data;

        // Map backend data to frontend format
        const mappedData = data.map(item => ({
          month: new Date(item.year, item.month - 1).toLocaleString('default', { month: 'short' }),
          carbonSaved: item.carbonSaved || 0,
          energySaved: item.energySaved || 0,
          wasteReduced: item.wasteReduced || 0,
          points: item.totalPoints
        }));

        setMonthlyData(mappedData);
      } catch (error) {
        setError('Failed to load monthly impact data');
      }
    };

    const fetchActionCategories = async () => {
      try {
        const response = await axios.get('/api/analytics/action-categories');
        const data = response.data;

        console.log('Raw action categories data:', data);

        // Map backend data to frontend format
    // Filter and map backend categories to the four required categories
    const categoryMap = {
      'energy': 'Energy Conserved',
      'water': 'Water Saved',
      'Water Conservation': 'Water Saved',
      'recycling': 'Waste Reduced',
      'nature': 'Total Carbon Saved',
      'Tree & Nature Care': 'Total Carbon Saved',
      'plantation': 'Total Carbon Saved',
      'transport': 'Energy Conserved',
      'Plastic-Free Lifestyle': 'Waste Reduced',
      'Waste Reduced': 'Waste Reduced',
      'Energy Conserved': 'Energy Conserved',
      'Water Saved': 'Water Saved',
      'Total Carbon Saved': 'Total Carbon Saved'
    };

    // Aggregate counts for the four categories
    const aggregatedCounts = {
      'Waste Reduced': 0,
      'Energy Conserved': 0,
      'Water Saved': 0,
      'Total Carbon Saved': 0
    };

    data.forEach(item => {
      const mappedCategory = categoryMap[item.name];
      if (mappedCategory && aggregatedCounts.hasOwnProperty(mappedCategory)) {
        aggregatedCounts[mappedCategory] += item.count;
      }
    });

    const totalCountAggregated = Object.values(aggregatedCounts).reduce((acc, val) => acc + val, 0);

    if (totalCountAggregated === 0) {
      console.warn('Total count of aggregated categories is zero, cannot compute percentages.');
    }

    const mappedData = Object.entries(aggregatedCounts).map(([key, count]) => ({
      name: key,
      value: totalCountAggregated === 0 ? 0 : Number(((count / totalCountAggregated) * 100).toFixed(2)),
      color: getCategoryColor(key),
      count: count
    }));

        console.log('Mapped category data for pie chart:', mappedData);

        setCategoryData(mappedData);
      } catch (error) {
        setError('Failed to load action categories');
        console.error('Error fetching action categories:', error);
      }
    };

    fetchAggregatedResponses();
    fetchMonthlyImpact();
    fetchActionCategories();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Waste Reduced': '#f59e0b',       // orange
      'Energy Conserved': '#3b82f6',    // blue
      'Water Saved': '#06b6d4',         // cyan
      'Total Carbon Saved': '#22c55e'   // green
    };
    return colors[category] || '#888888';
  };

  // Add colors to categoryData dynamically for pie chart colors
  useEffect(() => {
    setCategoryData((prevData) =>
      prevData.map((item) => ({
        ...item,
        color: getCategoryColor(item._id || item.name),
      }))
    );
  }, []);

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
                <option value="year">This Year</option>
              </select>
            </div>
            
            
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
                
              </div>
            </div>
            
            <div className="h-80">
          <div style={{ height: '100%', width: '100%' }}>
            <Bar
              data={{
                labels: monthlyData.map(item => item.month),
                datasets: [
                  {
                    label: 'Carbon Saved (kg)',
                    data: monthlyData.map(item => item.carbonSaved),
                    backgroundColor: '#22c55e',
                    barPercentage: 0.25,
                    categoryPercentage: 0.25,
                    maxBarThickness: 30,
                  },
                  {
                    label: 'Energy conserved (kWh)',
                    data: monthlyData.map(item => item.energySaved),
                    backgroundColor: '#3b82f6',
                    barPercentage: 0.25,
                    categoryPercentage: 0.25,
                    maxBarThickness: 30,
                  },
                  {
                    label: 'Waste Reduced (kg)',
                    data: monthlyData.map(item => item.wasteReduced),
                    backgroundColor: '#f59e0b',
                    barPercentage: 0.25,
                    categoryPercentage: 0.25,
                    maxBarThickness: 30,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      font: {
                        size: 14,
                      },
                    },
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                  title: {
                    display: false,
                  },
                },
                interaction: {
                  mode: 'nearest',
                  axis: 'x',
                  intersect: false,
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Month',
                      font: {
                        size: 14,
                      },
                    },
                    stacked: false,
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Value',
                      font: {
                        size: 14,
                      },
                    },
                    beginAtZero: true,
                    stacked: false,
                  },
                },
              }}
            />
          </div>
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
            <div style={{ height: '100%', width: '100%' }}>
              <Pie
                data={{
                  labels: categoryData.map(item => item.name),
                  datasets: [
                    {
                      label: 'Action Distribution',
                      data: categoryData.map(item => item.value),
                      backgroundColor: categoryData.map(item => item.color),
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        font: {
                          size: 14,
                        },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.parsed || 0;
                          return `${label}: ${value}%`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            </div>
            <div className="space-y-3">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.value}%</span>
                    </div>
                    <div className="text-xs text-gray-500">{item.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{item.count} actions</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
         
        </div>

      </div>
    </div>
  );
};

export default Analytics;
