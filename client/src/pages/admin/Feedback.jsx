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
      const response = await axios.get('/api/contact-submissions', { headers: getAuthHeader() });
      console.log('Contact submissions response:', response.data);
      setSubmissions(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch submissions');
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/applications', { headers: getAuthHeader() });
      console.log('Applications response:', response.data);
      setApplications(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applications');
    }
  };

  useEffect(() => {
    Promise.all([fetchSubmissions(), fetchApplications()]).finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    try {
      await axios.put(`/api/contact-submissions/${id}/status`, { status: newStatus }, { headers: getAuthHeader() });
      setSubmissions(submissions.map(sub =>
        sub._id === id ? { ...sub, status: newStatus } : sub
      ));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;
    try {
      await axios.delete(`/api/contact-submissions/${id}`, { headers: getAuthHeader() });
      setSubmissions(submissions.filter(sub => sub._id !== id));
    } catch (err) {
      alert('Failed to delete submission');
    }
  };

  if (loading) return <div className="p-6">Loading submissions...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold mb-4 text-green-800">Feedback / Contact Submissions</h1>
        <table className="min-w-full border border-green-300 rounded-lg overflow-hidden shadow-md bg-white">
          <thead>
            <tr className="bg-green-200 text-green-900">
              <th className="border px-6 py-3 text-left font-semibold">Name</th>
              <th className="border px-6 py-3 text-left font-semibold">Email</th>
              <th className="border px-6 py-3 text-left font-semibold">Message</th>
              <th className="border px-6 py-3 text-left font-semibold">Submitted At</th>
              <th className="border px-6 py-3 text-left font-semibold">Status</th>
              <th className="border px-6 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr
                key={sub._id}
                className="hover:bg-green-50 transition-colors duration-200"
              >
                <td className="border px-6 py-4">{sub.name}</td>
                <td className="border px-6 py-4">{sub.email}</td>
                <td className="border px-6 py-4">{sub.message}</td>
                <td className="border px-6 py-4">{new Date(sub.createdAt).toLocaleString()}</td>
                <td className="border px-6 py-4">{sub.status}</td>
                <td className="border px-6 py-4 space-x-3">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    onClick={() => toggleStatus(sub._id, sub.status)}
                    aria-label={`Mark submission ${sub._id} as ${sub.status === 'Pending' ? 'Resolved' : 'Pending'}`}
                  >
                    {sub.status === 'Pending' ? '✅ Mark as Resolved' : '↩️ Mark as Pending'}
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => deleteSubmission(sub._id)}
                    aria-label={`Delete submission ${sub._id}`}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold mb-4 text-green-800">Career Applications</h1>
        <table className="min-w-full border border-green-300 rounded-lg overflow-hidden shadow-md bg-white">
          <thead>
            <tr className="bg-green-200 text-green-900">
              <th className="border px-6 py-3 text-left font-semibold">Name</th>
              <th className="border px-6 py-3 text-left font-semibold">Email</th>
              <th className="border px-6 py-3 text-left font-semibold">Message</th>
              <th className="border px-6 py-3 text-left font-semibold">Role</th>
              <th className="border px-6 py-3 text-left font-semibold">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-green-900 font-semibold">
                  No applications found.
                </td>
              </tr>
            )}
            {applications.map(app => (
              <tr
                key={app._id}
                className="hover:bg-green-50 transition-colors duration-200"
              >
                <td className="border px-6 py-4">{app.name}</td>
                <td className="border px-6 py-4">{app.email}</td>
                <td className="border px-6 py-4">{app.message}</td>
                <td className="border px-6 py-4">{app.role}</td>
                <td className="border px-6 py-4">{new Date(app.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
