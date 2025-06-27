import React, { useEffect, useState, useMemo, useContext } from 'react';
import { fetchAdminActions, approveAdminAction, rejectAdminAction } from '../../api/userActions';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminActions = () => {
  const { user } = useContext(AuthContext);
  const [actions, setActions] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Access control: only admins allowed
  if (!user?.isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  const loadActions = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminActions();
      setActions(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load actions');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActions();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...actions];

    if (categoryFilter) {
      filtered = filtered.filter(
        (action) => action.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (action) => action.status === statusFilter.toLowerCase()
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (action) =>
          (action.user?.name && action.user.name.toLowerCase().includes(term)) ||
          (action.description && action.description.toLowerCase().includes(term))
      );
    }

    setFilteredActions(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [actions, categoryFilter, statusFilter, searchTerm]);

  const handleApprove = async (id) => {
    try {
      await approveAdminAction(id);
      setActions((prev) =>
        prev.map((action) =>
          action._id === id ? { ...action, status: 'Approved' } : action
        )
      );
      alert('Action approved successfully ✅');
    } catch (err) {
      alert('Failed to approve action');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectAdminAction(id);
      setActions((prev) =>
        prev.map((action) =>
          action._id === id ? { ...action, status: 'Rejected' } : action
        )
      );
      alert('Action rejected successfully ❌');
    } catch (err) {
      alert('Failed to reject action');
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredActions.length / itemsPerPage);
  const paginatedActions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredActions.slice(start, start + itemsPerPage);
  }, [filteredActions, currentPage]);

  if (loading) return <div className="p-4">Loading actions...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(actions.map((a) => a.category))).filter(Boolean);

  return (
    <div className="p-6 bg-green-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-4 text-green-800">Eco-Actions Moderation</h1>
      <p className="mb-6 text-green-700">
        Review all user-submitted actions. Approve or reject based on validity.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="block mb-2 font-semibold text-green-900">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-green-900">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block mb-2 font-semibold text-green-900">Search</label>
          <input
            type="text"
            placeholder="Search by user or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-green-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Counts */}
      <div className="mb-4 font-semibold text-green-900">
        Total Actions: {filteredActions.length} | Page {currentPage} of {totalPages}
      </div>

      {/* Table */}
      <table className="min-w-full border border-green-300 rounded-lg overflow-hidden shadow-md bg-white">
        <thead>
          <tr className="bg-green-200 text-green-900">
            <th className="border px-6 py-3 text-left font-semibold">User</th>
            <th className="border px-6 py-3 text-left font-semibold">Category</th>
            <th className="border px-6 py-3 text-left font-semibold">Description</th>
            <th className="border px-6 py-3 text-left font-semibold">Status</th>
            <th className="border px-6 py-3 text-left font-semibold">Date</th>
            <th className="border px-6 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedActions.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-green-900 font-semibold">
                No actions found.
              </td>
            </tr>
          )}
          {paginatedActions.map((action) => (
            <tr
              key={action._id}
              className="hover:bg-green-50 transition-colors duration-200"
            >
              <td className="border px-6 py-4">{action.user?.name || 'N/A'}</td>
              <td className="border px-6 py-4 capitalize">{action.category}</td>
              <td className="border px-6 py-4">{action.description}</td>
              <td className="border px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    action.status === 'Approved'
                      ? 'bg-green-200 text-green-800'
                      : action.status === 'Rejected'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {action.status}
                </span>
              </td>
              <td className="border px-6 py-4">{new Date(action.createdAt).toLocaleDateString()}</td>
              <td className="border px-6 py-4 space-x-3">
                {action.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleApprove(action._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      aria-label={`Approve action ${action._id}`}
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleReject(action._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      aria-label={`Reject action ${action._id}`}
                    >
                      ❌ Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-500 font-semibold">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-green-400 rounded disabled:opacity-50 hover:bg-green-100 transition"
        >
          Previous
        </button>
        <span className="px-4 py-2 border border-green-400 rounded text-green-900 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-green-400 rounded disabled:opacity-50 hover:bg-green-100 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminActions;
