import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Award, 
  Target, 
  TrendingUp,
  Settings,
  Edit,
  Camera,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

import { fetchUserActions } from '../api/userActions';

const Profile = () => {
  const { user, token, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    location: '',
    bio: '',
    phone: ''
  });
  const [actionsCount, setActionsCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || '',
        email: user.email || '',
        location: user.location || '',
        bio: user.bio || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchActionsCount = async () => {
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:5000/api/actions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActionsCount(response.data.length);
      } catch (error) {
        console.error('Error fetching actions count:', error);
      }
    };
    fetchActionsCount();
  }, [token]);

  useEffect(() => {
    const loadRecentActivity = async () => {
      if (!token) return;
      try {
        const data = await fetchUserActions();
        setRecentActivity(data);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };
    loadRecentActivity();
  }, [token]);

  const handleSaveProfile = async () => {
    try {
        const response = await axios.put('http://localhost:5000/api/profile', editedUser, {
          headers: { Authorization: `Bearer ${token}` }
        });
      updateUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Points', value: user?.totalPoints || 0, icon: Award, color: 'eco' },
    { label: 'Actions Completed', value: actionsCount, icon: Target, color: 'blue' },
    { label: 'Days Active', value: '89', icon: Calendar, color: 'purple' },
    { label: 'Community Rank', value: '#42', icon: TrendingUp, color: 'orange' }
  ];

  const badges = [
    { 
      id: 1, 
      name: 'Eco Warrior', 
      description: 'Completed 100+ environmental actions',
      icon: '🌍',
      earned: true,
      rarity: 'Epic'
    },
    { 
      id: 2, 
      name: 'Carbon Neutral', 
      description: 'Offset 1 ton of CO₂ emissions',
      icon: '🌱',
      earned: true,
      rarity: 'Rare'
    },
    { 
      id: 3, 
      name: 'Energy Saver', 
      description: 'Saved 500kWh of energy',
      icon: '⚡',
      earned: false,
      rarity: 'Common'
    },
    { 
      id: 4, 
      name: 'Recycling Champion', 
      description: 'Recycled 1000+ items',
      icon: '♻️',
      earned: true,
      rarity: 'Epic'
    },
    { 
      id: 5, 
      name: 'Community Leader', 
      description: 'Led 5+ community challenges',
      icon: '👥',
      earned: false,
      rarity: 'Legendary'
    },
    { 
      id: 6, 
      name: 'Water Guardian', 
      description: 'Saved 10,000L of water',
      icon: '💧',
      earned: true,
      rarity: 'Rare'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-earth-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="h-32 bg-gradient-to-r from-eco-500 to-eco-600"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              <div className="relative -mt-16 mb-4 md:mb-0">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-eco-600 rounded-full flex items-center justify-center text-white hover:bg-eco-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                    <p className="text-lg text-eco-600 font-medium">Level {user?.level || 1}</p>
                    <div className="flex items-center space-x-4 mt-2 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user?.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Joined {new Date(user?.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-eco-600 text-white rounded-lg hover:bg-eco-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                {isEditing && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={editedUser.location}
                        onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={editedUser.bio}
                        onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="text"
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-eco-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-eco-700 transition-colors"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4 inline mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Achievements & Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg text-center cursor-default ${
                  badge.earned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                }`}
                title={`${badge.name} - ${badge.description}`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="font-semibold">{badge.name}</div>
                <div className="text-xs">{badge.rarity}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              {recentActivity.length === 0 ? (
                <li className="text-center text-gray-500">No recent activity found.</li>
              ) : (
                recentActivity.map((activity, idx) => (
                  <li
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold">{activity.title || activity.action}</div>
                      <div className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-green-600 font-semibold">+{activity.points}</div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{user?.location || 'No location set'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>{user?.bio || 'No bio available'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{user?.phone || 'No phone number set'}</span>
                  </div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Profile;
