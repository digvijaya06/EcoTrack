import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getUsers, updateUser, deleteUser } from '../../api/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    }
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
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="text-center">
                <td className="py-2 px-4 border-b">{user.name}</td>
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
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Users;
