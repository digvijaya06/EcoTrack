import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartSpline } from 'lucide-react';
const GoalAnalytics = ({ goals }) => {
  const categoryData = goals.reduce((acc, goal) => {
    const category = goal.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <div className="bg-white shadow p-4 rounded-lg mt-10">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><ChartSpline size={20}/> Goals by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalAnalytics;
