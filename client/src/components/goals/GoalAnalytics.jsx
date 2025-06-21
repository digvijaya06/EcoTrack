import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartSpline } from 'lucide-react';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#f97316', '#6366f1', '#db2777'];

const GoalAnalytics = ({ goals }) => {
  // Group goals by category and count
  const categoryData = goals.reduce((acc, goal) => {
    const category = goal.category || 'Other';
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded-lg mt-10">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><ChartSpline size={20}/> Goals by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#22c55e"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {categoryData.map((entry, index) => (
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

export default GoalAnalytics;
