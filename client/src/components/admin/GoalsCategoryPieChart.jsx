import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6F91'];

const GoalsCategoryPieChart = ({ data = [] }) => {
  console.log('GoalsCategoryPieChart data:', data);

  if (!data || data.length === 0) {
    return <div>No goals category data available for pie chart.</div>;
  }

  // Filter out categories with zero total goals
  const filteredData = data.filter(item => item.total > 0);

  // If no valid data, show message
  if (filteredData.length === 0) {
    return <div>No goals category data available for pie chart.</div>;
  }

  // Map data to pie chart format with fallback for empty category names
  const pieData = filteredData.map(item => ({
    name: item.category && item.category.trim() !== '' ? item.category : 'Other',
    value: item.total,
  }));

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Goals by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalsCategoryPieChart;
