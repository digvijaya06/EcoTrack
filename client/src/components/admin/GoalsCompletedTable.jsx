import React from 'react';

const GoalsCompletedTable = ({ data }) => {
  // Defensive check: ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return <div>No goals completed data available.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Goals Completed</h3>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-300 text-left">Category</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Goals Completed</th>
          </tr>
        </thead>
        <tbody>
          {safeData.map(({ category, completed }) => (
            <tr key={category} className="text-right">
              <td className="text-left py-2 px-4 border-b border-gray-300">{category}</td>
              <td className="py-2 px-4 border-b border-gray-300">{completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalsCompletedTable;
