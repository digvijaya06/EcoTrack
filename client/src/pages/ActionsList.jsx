import React, { useEffect, useState } from 'react';
import { fetchUserActions } from '../api/userActions';
import ActionCard from '../components/actions/ActionCard';

const ActionsList = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActions = async () => {
      try {
        const data = await fetchUserActions();
        setActions(data);
      } catch (err) {
        setError('Failed to load actions.');
      } finally {
        setLoading(false);
      }
    };
    loadActions();
  }, []);

  const handleViewDetails = (id) => {
    // Implement navigation or modal to show action details if needed
    alert(`View details for action ID: ${id}`);
  };

  if (loading) return <div>Loading actions...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Logged Actions</h1>
      {actions.length === 0 ? (
        <p>No actions logged yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs font-semibold">
                <th className="px-4 py-3 border-b border-gray-200">Date</th>
                <th className="px-4 py-3 border-b border-gray-200">Category</th>
                <th className="px-4 py-3 border-b border-gray-200">Type</th>
                <th className="px-4 py-3 border-b border-gray-200">Description</th>
                <th className="px-4 py-3 border-b border-gray-200">CO2 Saved</th>
                <th className="px-4 py-3 border-b border-gray-200">Water Saved</th>
                <th className="px-4 py-3 border-b border-gray-200">Energy Saved</th>
                <th className="px-4 py-3 border-b border-gray-200">Waste Diverted</th>
                <th className="px-4 py-3 border-b border-gray-200">Details</th>
              </tr>
            </thead>
            <tbody>
              {actions.map(action => (
                <tr key={action._id || action.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b border-gray-200">{new Date(action.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 border-b border-gray-200 capitalize">{action.category.toLowerCase()}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{action.type}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{action.description}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{action.impact?.co2Saved || 0} kg</td>
                  <td className="px-4 py-3 border-b border-gray-200">{action.impact?.waterSaved || 0} L</td>
                  <td className="px-4 py-3 border-b border-gray-200">{action.impact?.energySaved || 0} kWh</td>
                  <td className="px-4 py-3 border-b border-gray-200">{action.impact?.wasteDiverted || 0} kg</td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <button
                      onClick={() => alert(`View details for action ID: ${action._id || action.id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActionsList;
