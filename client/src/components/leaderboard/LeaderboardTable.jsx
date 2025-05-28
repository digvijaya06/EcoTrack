import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Award, Users, TrendingUp, Filter, ChevronDown, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://localhost:5000';

const LeaderboardTable= () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all-time');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/leaderboard?timeframe=${timeframe}`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
       
        
        // Demo data
        setUsers([
          { id: 1, rank: 1, name: 'Jane Cooper', points: 2430, avatar: null },
          { id: 2, rank: 2, name: 'Cody Fisher', points: 2100, avatar: null },
          { id: 3, rank: 3, name: 'Esther Howard', points: 1950, avatar: null },
          { id: 4, rank: 4, name: 'Jenny Wilson', points: 1800, avatar: null },
          { id: 5, rank: 5, name: 'Kristin Watson', points: 1700, avatar: null },
          { id: 6, rank: 6, name: 'Cameron Williamson', points: 1550, avatar: null },
          { id: 7, rank: 7, name: 'Robert Fox', points: 1400, avatar: null },
          { id: 8, rank: 8, name: 'Savannah Nguyen', points: 1350, avatar: null },
          { id: 9, rank: 9, name: 'Wade Warren', points: 1200, avatar: null },
          { id: 10, rank: 10, name: 'Dianne Russell', points: 1100, avatar: null }
        ]);
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
          <h1 className="text-3xl font-bold text-gray-900">Community Leaderboard</h1>
          <p className="text-gray-600 mt-1">See how you rank against other eco-warriors</p>
        </div>
      </div>
      
      {/* Top 3 podium */}
      {users.length >= 3 && (
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-center items-end space-y-4 md:space-y-0 md:space-x-6 pt-10">
            {/* 2nd Place */}
            <div className="order-2 md:order-1">
              <div className="flex flex-col items-center">
                <div className="mb-2 relative">
                  <div className="h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center">
                    {users[1].avatar ? (
                      <img src={users[1].avatar} alt={users[1].name} className="h-14 w-14 rounded-full object-cover" />
                    ) : (
                      <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-xl">{users[1].name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="text-gray-800 text-xs font-medium">2</span>
                    </div>
                  </div>
                </div>
                <div className="h-40 w-24 bg-blue-500 rounded-t-lg flex items-end justify-center">
                  <div className="text-center pb-3">
                    <h3 className="text-white font-medium text-sm">{users[1].name}</h3>
                    <p className="text-blue-100 text-xs">{users[1].points} pts</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 1st Place */}
            <div className="order-1 md:order-2">
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Award className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {users[0].avatar ? (
                      <img src={users[0].avatar} alt={users[0].name} className="h-16 w-16 rounded-full object-cover" />
                    ) : (
                      <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 font-medium text-2xl">{users[0].name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="text-gray-800 text-xs font-medium">1</span>
                    </div>
                  </div>
                </div>
                <div className="h-48 w-28 bg-yellow-500 rounded-t-lg flex items-end justify-center shadow-md">
                  <div className="text-center pb-3">
                    <h3 className="text-white font-medium">{users[0].name}</h3>
                    <p className="text-yellow-100">{users[0].points} pts</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 3rd Place */}
            <div className="order-3">
              <div className="flex flex-col items-center">
                <div className="mb-2 relative">
                  <div className="h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center">
                    {users[2].avatar ? (
                      <img src={users[2].avatar} alt={users[2].name} className="h-14 w-14 rounded-full object-cover" />
                    ) : (
                      <div className="h-14 w-14 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-medium text-xl">{users[2].name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="text-gray-800 text-xs font-medium">3</span>
                    </div>
                  </div>
                </div>
                <div className="h-32 w-24 bg-orange-500 rounded-t-lg flex items-end justify-center">
                  <div className="text-center pb-3">
                    <h3 className="text-white font-medium text-sm">{users[2].name}</h3>
                    <p className="text-orange-100 text-xs">{users[2].points} pts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          {/* Timeframe Filter */}
          <div className="relative mb-4 sm:mb-0">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-500 mr-2" />
              <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
                Timeframe
              </label>
            </div>
            <div className="mt-1 relative">
              <select
                id="timeframe"
                className="input-field pr-10 appearance-none"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                {timeframeOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Search */}
          <div>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
        
        {/* Leaderboard Table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => {
                  const isCurrentUser = currentUser && user.id === currentUser.id;
                  
                  return (
                    <tr 
                      key={user.id} 
                      className={`${isCurrentUser ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <div className={`
                              h-6 w-6 rounded-full flex items-center justify-center text-white font-medium text-xs
                              ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-blue-500' : 'bg-orange-500'}
                            `}>
                              {index + 1}
                            </div>
                          ) : (
                            <div className="text-gray-500 font-medium text-sm">
                              {index + 1}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="h-10 w-10 object-cover" />
                            ) : (
                              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-gray-500 font-medium">{user.name.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                              {isCurrentUser && <span className="ml-2 text-xs text-green-600">(You)</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {user.points} pts
                        </div>
                        {user.trend === 'up' && (
                          <div className="text-xs text-green-600 flex items-center justify-end">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Rising
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;
