import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getUsers, updateUser, deleteUser } from '../../api/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const toggleAdmin = async (userId, isAdmin) => {
    await updateUser(userId, { isAdmin: !isAdmin });
    setUsers(users.map(user => user._id === userId ? { ...user, isAdmin: !isAdmin } : user));
  };

  const toggleBlock = async (userId, isBlocked) => {
    await updateUser(userId, { isBlocked: !isBlocked });
    setUsers(users.map(user => user._id === userId ? { ...user, isBlocked: !isBlocked } : user));
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    }
  };

  const viewProfile = (user) => {
    setSelectedUser(user);
  };

  const closeProfile = () => {
    setSelectedUser(null);
  };

  if (loading) return <AdminLayout><div>Loading users...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Users Management</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Points</th>
              <th className="py-2 px-4 border-b">Admin</th>
              <th className="py-2 px-4 border-b">Blocked</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="text-center">
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => viewProfile(user)}
                  >
                    {user.name}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.points}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={user.isAdmin}
                    onChange={() => toggleAdmin(user._id, user.isAdmin)}
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={user.isBlocked}
                    onChange={() => toggleBlock(user._id, user.isBlocked)}
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">User Profile</h2>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Points:</strong> {selectedUser.points}</p>
              <p><strong>Admin:</strong> {selectedUser.isAdmin ? 'Yes' : 'No'}</p>
              <p><strong>Blocked:</strong> {selectedUser.isBlocked ? 'Yes' : 'No'}</p>
              <p><strong>Bio:</strong> {selectedUser.bio || 'N/A'}</p>
              <p><strong>Location:</strong> {selectedUser.location || 'N/A'}</p>
              <p><strong>Website:</strong> {selectedUser.website || 'N/A'}</p>
              <button
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeProfile}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
