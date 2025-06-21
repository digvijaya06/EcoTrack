import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
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
import { fetchUserActions, fetchUserAchievements } from '../api/userActions';
import ProfileForm from '../components/profile/ProfileForm';
import NotificationSettings from '../components/profile/NotificationSettings';
import PrivacySettings from '../components/profile/PrivacySettings';
import AccountActions from '../components/profile/AccountActions';

const Profile = () => {
  const { user, token, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  
  React.useEffect(() => {
    if (user && (!user.avatar || user.avatar === '' || !user.bio || user.bio === '')) {
      setIsEditing(false);
    }
  }, [user]);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    location: '',
    bio: '',
    phone: ''
  });
  const [actionsCount, setActionsCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [communityRank, setCommunityRank] = useState(null);

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
        const mappedData = data.map(item => ({
          ...item,
          date: item.createdAt
        }));
        setRecentActivity(mappedData);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };
    loadRecentActivity();
  }, [token]);

  useEffect(() => {
    const fetchCommunityRank = async () => {
      if (!token || !user) return;
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard?timeframe=all-time', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const leaderboard = response.data;
        const userRank = leaderboard.findIndex(item => item.id === user._id) + 1;
        setCommunityRank(userRank > 0 ? userRank : 'Not ranked');
      } catch (error) {
        console.error('Error fetching community rank:', error);
      }
    };
    fetchCommunityRank();
  }, [token, user]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Points', value: user?.totalPoints || 0, icon: Award, color: 'eco' },
    { label: 'Actions Completed', value: actionsCount, icon: Target, color: 'blue' },
    { label: 'Days Active', value: user?.joinDate ? Math.floor((new Date() - new Date(user.joinDate)) / (1000 * 60 * 60 * 24)) : 'N/A', icon: Calendar, color: 'purple' },
    { label: 'Community Rank', value: communityRank ? `#${communityRank}` : 'Loading...', icon: TrendingUp, color: 'orange' }
  ];

  const badges = [
    { id: 1, name: 'Eco Warrior', description: 'Completed 100+ environmental actions', icon: '🌍', earned: true, rarity: 'Epic' },
    { id: 2, name: 'Carbon Neutral', description: 'Offset 1 ton of CO₂ emissions', icon: '🌱', earned: true, rarity: 'Rare' },
    { id: 3, name: 'Energy Saver', description: 'Saved 500kWh of energy', icon: '⚡', earned: false, rarity: 'Common' },
    { id: 4, name: 'Recycling Champion', description: 'Recycled 1000+ items', icon: '♻️', earned: true, rarity: 'Epic' },
    { id: 5, name: 'Community Leader', description: 'Led 5+ community challenges', icon: '👥', earned: false, rarity: 'Legendary' },
    { id: 6, name: 'Water Guardian', description: 'Saved 10,000L of water', icon: '💧', earned: true, rarity: 'Rare' }
  ];

  const [fetchedBadges, setFetchedBadges] = React.useState([]);

  React.useEffect(() => {
    const fetchBadges = async () => {
      try {
        const data = await fetchUserAchievements();
        if (data && data.badges) {
          setFetchedBadges(data.badges);
        }
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };
    fetchBadges();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-earth-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden mb-8"
        >
          <div className="h-32 bg-gradient-to-r from-eco-600 to-eco-700"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              <div className="relative -mt-16 mb-4 md:mb-0">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-eco-700 rounded-full flex items-center justify-center text-white hover:bg-eco-800 transition-colors duration-300">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 relative">
                <h1 className="text-3xl font-extrabold text-gray-900">{user?.name}</h1>
                <p className="text-lg text-eco-700 font-semibold">Level {user?.level || 1}</p>
                <div className="flex items-center space-x-4 mt-2 text-gray-700">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined {new Date(user?.joinDate || user?.joinedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              <div className="flex justify-between items-center mt-4 md:mt-0">
                <p className="text-lg text-eco-700 font-semibold">Level {user?.level || 1}</p>
              </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-2 shadow-xl mb-8"
        >
          <div className="flex space-x-1">
{tabs.map((tab) => {
  const Icon = tab.icon;
  return (
    <button
      key={tab.id}
      onClick={() => {
        setActiveTab(tab.id);
        if (tab.id === 'settings') {
          setIsEditing(false);
        } else {
          setIsEditing(false);
        }
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
        activeTab === tab.id
          ? 'bg-eco-200 text-eco-800 shadow-md'
          : 'text-gray-700 hover:text-eco-700 hover:bg-eco-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{tab.name}</span>
    </button>
  );
})}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats */}
              <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-xl text-center hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-700">{stat.label}</div>
                </motion.div>
              );
                })}
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <ul className="space-y-3">
                  {recentActivity.length === 0 ? (
                    <li className="text-center text-gray-500">No recent activity found.</li>
                  ) : (
                    recentActivity.map((activity, idx) => (
                      <li
                        key={idx}
                        className="border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:bg-eco-50 transition-colors duration-300 cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-gray-800">{activity.title}</div>
                          <div className="text-xs text-gray-600">
                            {activity.date ? new Date(activity.date).toLocaleDateString() : 'Date not available'}
                          </div>
                        </div>
                        <div className="text-green-700 font-semibold">+{activity.points}</div>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Profile Info */}              
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
{isEditing ? (
  <ProfileForm
    initialData={editedUser}
    onSave={async (data) => {
      try {
        const response = await axios.put('http://localhost:5000/api/profile', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        updateUser(response.data);
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }}
  />
) : (
                  <>
                    <div className="space-y-3 text-gray-800">
                      <div className="flex items-center space-x-2"><MapPin className="w-5 h-5 text-gray-500" /><span>{user?.location || 'No location set'}</span></div>
                      <div className="flex items-center space-x-2"><User className="w-5 h-5 text-gray-500" /><span>{user?.bio || 'No bio available'}</span></div>
                      <div className="flex items-center space-x-2"><Mail className="w-5 h-5 text-gray-500" /><span>{user?.phone || 'No phone number set'}</span></div>
                    </div>
                  
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="bg-white rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6">Your Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {(fetchedBadges.length > 0 ? fetchedBadges : badges).map((badge, index) => (
              <div key={index} className={`p-4 rounded-lg text-center cursor-default select-none ${
                badge.earned ? 'bg-green-100 text-green-900 shadow-md' : 'bg-gray-100 text-gray-400'
              }`}>
                <div className="text-3xl mb-2">{badge.icon || '🏅'}</div>
                <div className="font-semibold">{badge.name || badge}</div>
                <div className="text-xs">{badge.rarity || ''}</div>
              </div>
            ))}
          </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                Settings
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 bg-eco-700 text-white rounded-md hover:bg-eco-800 transition-colors duration-300"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </h2>

              {isEditing ? (
                <ProfileForm
                  initialData={editedUser}
                  onSave={async (data) => {
                    try {
                      const response = await axios.put('http://localhost:5000/api/profile', data, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      updateUser(response.data);
                      setIsEditing(false);
                    } catch (error) {
                      console.error('Error saving profile:', error);
                    }
                  }}
                />
              ) : (
                <>
                  <NotificationSettings />
                  <PrivacySettings />
                  <AccountActions />
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
