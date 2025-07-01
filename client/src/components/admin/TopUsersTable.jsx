import React from 'react';

const TopUsersTable = ({ users }) => {
  // Defensive check: ensure users is an array
  const safeUsers = Array.isArray(users) ? users : [];

  if (safeUsers.length === 0) {
    return <div>No top users data available.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Top Performing Users</h3>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-300 text-left">User</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Actions</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Saved (kg)</th>
          </tr>
        </thead>
        <tbody>
          {safeUsers.map(user => (
            <tr key={user.userId} className="text-right">
              <td className="text-left py-2 px-4 border-b border-gray-300">{user.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.actionCount}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.totalCarbonSaved.toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopUsersTable;
