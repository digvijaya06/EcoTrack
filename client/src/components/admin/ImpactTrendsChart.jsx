import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import ExportButton from './ExportButton';

const ImpactTrendsChart = ({ data, onExport }) => {
  // Format month-year label
  const formatMonthYear = (year, month) => {
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  // Defensive check: ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  // Map data to include formatted monthYear label
  const chartData = safeData.map(item => ({
    monthYear: formatMonthYear(item.year, item.month),
    carbonSaved: item.carbonSaved,
    energySaved: item.energySaved,
    waterSaved: item.waterSaved,
    wasteReduced: item.wasteReduced,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Time-Based Environmental Impact Trends</h3>
        <ExportButton onExport={onExport} />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="carbonSaved" stroke="#22c55e" name="Carbon Saved (kg)" />
          <Line type="monotone" dataKey="energySaved" stroke="#3b82f6" name="Energy Saved (kWh)" />
          <Line type="monotone" dataKey="waterSaved" stroke="#06b6d4" name="Water Saved (liters)" />
          <Line type="monotone" dataKey="wasteReduced" stroke="#f59e0b" name="Waste Reduced (kg)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImpactTrendsChart;
