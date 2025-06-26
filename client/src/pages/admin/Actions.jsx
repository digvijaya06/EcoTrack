import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getActions, approveAction, rejectAction } from '../../api/userActions';

const Actions = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActions() {
      const data = await getActions();
      setActions(data);
      setLoading(false);
    }
    fetchActions();
  }, []);

  const handleApprove = async (actionId) => {
    await approveAction(actionId);
    setActions(actions.map(action => action._id === actionId ? { ...action, status: 'approved' } : action));
  };

  const handleReject = async (actionId) => {
    await rejectAction(actionId);
    setActions(actions.map(action => action._id === actionId ? { ...action, status: 'rejected' } : action));
  };

  if (loading) return <AdminLayout><div>Loading actions...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Eco-Actions Moderation</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {actions.map(action => (
              <tr key={action._id} className="text-center">
                <td className="py-2 px-4 border-b">{action.user?.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{action.category}</td>
                <td className="py-2 px-4 border-b">{action.description}</td>
                <td className="py-2 px-4 border-b">{action.status}</td>
                <td className="py-2 px-4 border-b">
                  {action.status === 'pending' && (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleApprove(action._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleReject(action._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Actions;
