import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getUsers, updateUser, deleteUser } from '../../api/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const params = new URLSearchParams();
      if (searchTerm) params.append('searchTerm', searchTerm);
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (sortBy) params.append('sortBy', sortBy);

      const data = await getUsers(params.toString());
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, [searchTerm, roleFilter, statusFilter, sortBy]);

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

        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Roles</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Banned">Banned</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Sort By</option>
            <option value="dateJoined">Date Joined</option>
            <option value="activityCount">Activity Count</option>
          </select>
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Date Joined</th>
              <th className="py-2 px-4 border-b">Total Actions Logged</th>
              <th className="py-2 px-4 border-b">Goals Created</th>
              <th className="py-2 px-4 border-b">Goals Completed</th>
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
                <td className="py-2 px-4 border-b">{user.isAdmin && user.name !== 'Admin' ? 'Admin' : 'User'}</td>
                <td className="py-2 px-4 border-b">{user.isBlocked ? 'Banned' : 'Active'}</td>
                <td className="py-2 px-4 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{user.totalActionsLogged}</td>
                <td className="py-2 px-4 border-b">{user.goalsCreated}</td>
                <td className="py-2 px-4 border-b">{user.goalsCompleted}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => viewProfile(user)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => toggleAdmin(user._id, user.isAdmin)}
                  >
                    {user.isAdmin ? 'Demote' : 'Promote'}
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => toggleBlock(user._id, user.isBlocked)}
                  >
                    {user.isBlocked ? 'Unban' : 'Ban'}
                  </button>
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

        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">User Profile</h2>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.isAdmin ? 'Admin' : 'User'}</p>
              <p><strong>Status:</strong> {selectedUser.isBlocked ? 'Banned' : 'Active'}</p>
              <p><strong>Date Joined:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              <p><strong>Total Actions Logged:</strong> {selectedUser.totalActionsLogged}</p>
              <p><strong>Goals Created:</strong> {selectedUser.goalsCreated}</p>
              <p><strong>Goals Completed:</strong> {selectedUser.goalsCompleted}</p>
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
