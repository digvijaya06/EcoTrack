import React from 'react';

const GoalsCreatedTable = ({ data }) => {
  // Defensive check: ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return <div>No goals created data available.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Goals Created</h3>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-300 text-left">Category</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Goals Created</th>
          </tr>
        </thead>
        <tbody>
          {safeData.map(({ category, total }) => (
            <tr key={category} className="text-right">
              <td className="text-left py-2 px-4 border-b border-gray-300">{category}</td>
              <td className="py-2 px-4 border-b border-gray-300">{total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalsCreatedTable;
