import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import { getAuthHeader } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const ChallengeParticipations = () => {
  const { user } = useAuth();
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchParticipations = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/api/adminChallengeParticipation`, {
        headers: getAuthHeader()
      });
      console.log('Fetched participations:', response.data);
      setParticipations(response.data);
      setLoading(false);
      console.log('Participations state updated:', participations);
    } catch (err) {
      console.error('Error fetching participations:', err);
      setError('Failed to load participations');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    fetchParticipations();
  }, [user]);

  React.useEffect(() => {
    console.log('Participations state changed:', participations);
  }, [participations]);

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

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Group participations by user id
  const groupedParticipations = participations.reduce((acc, p) => {
    const userId = p.user?._id || 'unknown';
    if (!acc[userId]) {
      acc[userId] = {
        user: p.user,
        participations: [],
      };
    }
    acc[userId].participations.push(p);
    return acc;
  }, {});
  console.log('Grouped participations:', groupedParticipations);

  if (loading) return <div>Loading challenge participations...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Challenge Participations</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-[#22c55e] text-white">
          <tr>
            <th className="py-3 px-6 border-b border-green-700 text-left">Participant</th>
            <th className="py-3 px-6 border-b border-green-700 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedParticipations).map(([userId, group]) => (
            <React.Fragment key={userId}>
              <tr className="text-center transition duration-300 ease-in-out hover:bg-[#dcfce7] cursor-pointer">
                <td className="py-3 px-6 border-b border-gray-200 text-left">{group.user?.name || 'N/A'}</td>
                <td className="py-3 px-6 border-b border-gray-200">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => toggleRow(userId)}
                  >
                    {expandedRow === userId ? 'Hide Details' : 'View Details'}
                  </button>
                </td>
              </tr>
              {expandedRow === userId && (
                <tr className="bg-gray-50">
                  <td colSpan={2} className="py-3 px-6 border-b border-gray-200 text-left">
                    <table className="min-w-full border border-gray-300 rounded">
                      <thead>
                        <tr className="bg-[#f3f4f6]">
                          <th className="py-2 px-4 border border-gray-300 text-left">Challenge</th>
                          <th className="py-2 px-4 border border-gray-300 text-left">Points Earned</th>
                          <th className="py-2 px-4 border border-gray-300 text-left">Date Joined</th>
                          <th className="py-2 px-4 border border-gray-300 text-left">Status</th>
                          <th className="py-2 px-4 border border-gray-300 text-left">Admin Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.participations.map((p) => (
                          <tr key={p._id} className="text-center">
                          <td className="py-2 px-4 border border-gray-300">{p.challenge?.title || 'N/A'}</td>
                            <td className="py-2 px-4 border border-gray-300">{p.pointsEarned || 0}</td>
                            <td className="py-2 px-4 border border-gray-300">{new Date(p.joinedAt).toLocaleDateString() || 'N/A'}</td>
                            <td className="py-2 px-4 border border-gray-300 capitalize">{p.status}</td>
                            <td className="py-2 px-4 border border-gray-300">
                              <button
                                className="bg-green-500 hover:bg-green-600 transition-colors duration-300 text-white px-3 py-1 rounded mr-2 shadow-md"
                                onClick={() => updateStatus(p._id, 'approve')}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white px-3 py-1 rounded shadow-md"
                                onClick={() => updateStatus(p._id, 'reject')}
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChallengeParticipations;
