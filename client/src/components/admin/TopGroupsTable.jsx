import React from 'react';

const TopGroupsTable = ({ groups }) => {
  if (!groups || groups.length === 0) {
    return <div>No top groups data available.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-300 text-left">Group Name</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Actions Logged</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Carbon Saved (kg)</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Goals Completed</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group.groupId} className="text-right">
              <td className="text-left py-2 px-4 border-b border-gray-300">{group.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{group.actionCount}</td>
              <td className="py-2 px-4 border-b border-gray-300">{group.totalCarbonSaved.toFixed(2)}</td>
              <td className="py-2 px-4 border-b border-gray-300">{group.goalsCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopGroupsTable;
