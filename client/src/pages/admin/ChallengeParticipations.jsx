import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import { getAuthHeader } from '../../api/api';

const ChallengeParticipations = () => {
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParticipations = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/api/adminChallengeParticipation`, {
        headers: getAuthHeader()
      });
      setParticipations(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load participations');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipations();
  }, []);

  const updateStatus = async (id, action) => {
    try {
      await axios.put(`${API_URL}/api/adminChallengeParticipation/${id}/${action}`, {}, {
        headers: getAuthHeader()
      });
      fetchParticipations();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div>Loading challenge participations...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Challenge Participations</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-6 border-b border-green-700 text-left">Participant</th>
            <th className="py-3 px-6 border-b border-green-700 text-left">Challenge</th>
            <th className="py-3 px-6 border-b border-green-700 text-left">Points Earned</th>
            <th className="py-3 px-6 border-b border-green-700 text-left">Date Joined</th>
            <th className="py-3 px-6 border-b border-green-700 text-left">Status</th>
            <th className="py-3 px-6 border-b border-green-700 text-left">Admin Actions</th>
          </tr>
        </thead>
        <tbody>
          {participations.map((p) => (
            <tr
              key={p._id}
              className="text-center transition duration-300 ease-in-out hover:bg-green-100 cursor-pointer"
            >
              <td className="py-3 px-6 border-b border-gray-200">{p.user?.name || 'N/A'}</td>
              <td className="py-3 px-6 border-b border-gray-200">{p.challenge?.title || 'N/A'}</td>
              <td className="py-3 px-6 border-b border-gray-200">{p.pointsEarned || 0}</td>
              <td className="py-3 px-6 border-b border-gray-200">{new Date(p.joinedAt).toLocaleDateString() || 'N/A'}</td>
              <td className="py-3 px-6 border-b border-gray-200 capitalize">{p.status}</td>
              <td className="py-3 px-6 border-b border-gray-200">
                <button
                  className="bg-green-500 hover:bg-green-600 transition-colors duration-300 text-white px-4 py-2 rounded mr-3 shadow-md"
                  onClick={() => updateStatus(p._id, 'approve')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white px-4 py-2 rounded shadow-md"
                  onClick={() => updateStatus(p._id, 'reject')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChallengeParticipations;
