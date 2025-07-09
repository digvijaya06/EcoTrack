import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../api/api';

const Feedback = () => {
  const [submissions, setSubmissions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('/api/contact-submissions', {
        headers: getAuthHeader(),
      });
      setSubmissions(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch submissions');
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/applications', {
        headers: getAuthHeader(),
      });
      setApplications(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applications');
    }
  };

  useEffect(() => {
    Promise.all([fetchSubmissions(), fetchApplications()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    try {
      await axios.put(
        `/api/contact-submissions/${id}/status`,
        { status: newStatus },
        { headers: getAuthHeader() }
      );
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub._id === id ? { ...sub, status: newStatus } : sub
        )
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?'))
      return;
    try {
      await axios.delete(`/api/contact-submissions/${id}`, {
        headers: getAuthHeader(),
      });
      setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
    } catch (err) {
      alert('Failed to delete submission');
    }
  };

  if (loading) return <div className="p-6">Loading submissions...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Feedback Submissions */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-green-800">
            Feedback / Contact Submissions
          </h1>
          <div className="overflow-x-auto max-w-full">
            <table className="min-w-full border border-green-300 rounded-lg overflow-hidden bg-white text-sm">
              <thead>
                <tr className="bg-green-200 text-green-900">
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Message</th>
                  <th className="border px-4 py-2 text-left">Submitted At</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-green-50">
                    <td className="border px-4 py-2">{sub.name}</td>
                    <td className="border px-4 py-2">{sub.email}</td>
                    <td className="border px-4 py-2">{sub.message}</td>
                    <td className="border px-4 py-2">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">{sub.status}</td>
                    <td className="border px-4 py-2 whitespace-nowrap space-x-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        onClick={() => toggleStatus(sub._id, sub.status)}
                      >
                        {sub.status === 'Pending'
                          ? '✅ Mark Resolved'
                          : '↩️ Mark Pending'}
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        onClick={() => deleteSubmission(sub._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Career Applications */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-green-800">
            Career Applications
          </h1>
          <div className="overflow-x-auto max-w-full">
            <table className="min-w-full border border-green-300 rounded-lg overflow-hidden bg-white text-sm">
              <thead>
                <tr className="bg-green-200 text-green-900">
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Message</th>
                  <th className="border px-4 py-2 text-left">Role</th>
                  <th className="border px-4 py-2 text-left">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-green-900 font-semibold"
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-green-50 transition-colors"
                    >
                      <td className="border px-4 py-2">{app.name}</td>
                      <td className="border px-4 py-2">{app.email}</td>
                      <td className="border px-4 py-2">{app.message}</td>
                      <td className="border px-4 py-2">{app.role}</td>
                      <td className="border px-4 py-2">
                        {new Date(app.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
