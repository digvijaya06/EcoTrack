import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Award, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://localhost:5000';

const trophyColors = ['#FFD700', '#C0C0C0', '#CD7F32']; // gold, silver, bronze

const LeaderboardTable = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all-time');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/leaderboard?timeframe=${timeframe}`);
        console.log('Leaderboard users data:', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentUserRank = currentUser
    ? users.findIndex(user => user.id === currentUser.id) + 1
    : null;

  const timeframeOptions = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'all-time', name: 'All Time' }
  ];

  return (
    <div className="page-transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-gray-600 mt-1">See how you rank against other eco-warriors</p>
        </div>
      </div>

      {/* Timeframe Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="relative">
          <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
            Timeframe
          </label>
          <select
            id="timeframe"
            className="input-field pr-10 appearance-none border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            {timeframeOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Users
          </label>
          <input
            id="search"
            type="text"
            className="input-field pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Current User Highlight */}
      {currentUser && currentUserRank && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Your current rank: <span className="font-bold">{currentUserRank}</span>
              </p>
              <p className="text-sm text-gray-500">
                Keep up the good work! You're making a difference.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">Top Contributors</h2>
          <div className="space-y-4">
            {filteredUsers.length === 0 && (
              <p className="text-gray-500">No users found.</p>
            )}

            {filteredUsers.map((user, index) => {
              const isTopThree = index < 3;
              const isCurrentUser = currentUser && user.id === currentUser.id;

              // Example titles and streaks - replace with actual data if available
              const titles = ['Eco Champion', 'Green Warrior', 'Nature Guardian'];
              const userTitle = isTopThree ? titles[index] : 'Eco Enthusiast';
              const streakDays = user.streak;

              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isTopThree ? `border-${index === 0 ? 'yellow' : index === 1 ? 'gray' : 'orange'}-400 bg-${index === 0 ? 'yellow' : index === 1 ? 'gray' : 'orange'}-50 shadow-md` : 'border-green-200 bg-white shadow-sm'
                  } ${isCurrentUser ? 'ring-2 ring-green-400' : ''}`}
                >
                  <div className="flex items-center space-x-4">
                    {isTopThree ? (
                      <div
                        className="flex items-center justify-center rounded-full h-10 w-10"
                        style={{ backgroundColor: trophyColors[index] }}
                      >
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center rounded-full h-8 w-8 bg-green-500 text-white font-semibold">
                        {index + 1}
                      </div>
                    )}

                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-12 w-12 object-cover" />
                      ) : (
                        <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 font-medium">{user.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{userTitle}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-green-600 font-bold text-lg">{(user.points ?? 0).toLocaleString()} pts</p>
                    <p className="text-xs text-gray-400">{streakDays} day streak</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
