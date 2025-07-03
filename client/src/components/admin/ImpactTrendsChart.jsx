import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import ExportButton from './ExportButton';

const ImpactTrendsChart = ({ data = [], onExport }) => {
  // Format label as "Month Year" (e.g., Jun 2025)
  const formatMonthYear = (year, month) => {
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  // Safe data mapping with fallbacks
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        monthYear: formatMonthYear(item.year, item.month),
        carbonSaved: item.carbonSaved || 0,
        energySaved: item.energySaved || 0,
        waterSaved: item.waterSaved || 0,
        wasteReduced: item.wasteReduced || 0,
      }))
    : [];

  return (
    <div
      className="bg-white p-4 rounded shadow"
      aria-label="Environmental Impact Trends Chart"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Time-Based Environmental Impact Trends
        </h3>
        <ExportButton onExport={onExport} />
      </div>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          No impact data available for the selected range.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <XAxis dataKey="monthYear" stroke="#4B5563" />
            <YAxis
              stroke="#4B5563"
              tickFormatter={(value) => `${value}`}
              allowDecimals={false}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="carbonSaved"
              stroke="#22c55e"
              name="Carbon Saved (kg)"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="energySaved"
              stroke="#3b82f6"
              name="Energy Saved (kWh)"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="waterSaved"
              stroke="#06b6d4"
              name="Water Saved (liters)"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="wasteReduced"
              stroke="#f59e0b"
              name="Waste Reduced (kg)"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ImpactTrendsChart;
