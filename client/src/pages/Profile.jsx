import React, { useState, useEffect } from 'react';
import { Camera, User, Mail, MapPin, Award, Edit2, Globe, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { formatDate } from '../utils/formatterrs';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import femaleAvatar from '../assets/user-female-svgrepo-com.svg';
import maleAvatar from '../assets/user-male-alt-svgrepo-com.svg';
import ProfileForm from '../components/profile/ProfileForm';

const placeholderAvatar = femaleAvatar; // fallback placeholder avatar

const Profile = () => {
  const { user, updateUser, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);

  const [editedUser, setEditedUser] = useState({
    name: '',
    location: '',
    bio: '',
    website: '',
    avatar: '',
    gender: 'unknown',
  });

  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || '',
        location: user.location || '',
        bio: user.bio || '',
        website: user.website || '',
        avatar: user.avatar || '',
        gender: user.gender || 'unknown',
      });
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/actions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActions(response.data);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };

    if (token) {
      fetchActions();
    }
  }, [token]);

  const handleSave = async (updatedData) => {
    try {
      const response = await axios.put('http://localhost:5000/api/users/me', updatedData);
      updateUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally show error to user
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditedUser({
        name: user.name || '',
        location: user.location || '',
        bio: user.bio || '',
        website: user.website || '',
        avatar: user.avatar || '',
        gender: user.gender || 'unknown',
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  const getDefaultAvatar = (gender) => {
    if (gender === 'female') return femaleAvatar;
    if (gender === 'male') return maleAvatar;
    return placeholderAvatar;
  };

  // Validate avatar URL (basic check)
  const isValidAvatarUrl = (url) => {
    if (!url) return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const avatarToShow = isValidAvatarUrl(editedUser.avatar) ? editedUser.avatar : getDefaultAvatar(editedUser.gender);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-5 border-b border-gray-200 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your account and view your impact</p>
          </div>
          {!isEditing && (
            <div className="mt-4 md:mt-0">
              <Button
                variant="primary"
                leftIcon={<Edit2 size={18} />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <ProfileForm
                    initialData={editedUser}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="relative mb-6 md:mb-0 md:mr-8">
                      <img
                        src={avatarToShow}
                        alt={editedUser.name || 'User Avatar'}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center">
                        <User size={18} className="text-gray-400 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-900">{editedUser.name}</h2>
                      </div>

                      <div className="flex items-center">
                        <Mail size={18} className="text-gray-400 mr-2" />
                        <p className="text-gray-600">{user.email}</p>
                      </div>

                      <div className="flex items-center">
                        <MapPin size={18} className="text-gray-400 mr-2" />
                        <p className="text-gray-600">{editedUser.location}</p>
                      </div>

                      {editedUser.website && (
                        <div className="flex items-center">
                          <Globe size={18} className="text-gray-400 mr-2" />
                          <a
                            href={`https://${editedUser.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                          >
                            {editedUser.website}
                          </a>
                        </div>
                      )}

                      <p className="text-gray-600 mt-4">{editedUser.bio}</p>

                      <p className="text-sm text-gray-500 mt-4">
                        Joined on {formatDate(user.joinedDate)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award size={20} className="mr-2 text-primary-600" />
                  Achievements & Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {user.badges && user.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Earned on {formatDate(badge.earnedDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions Logged */}
            {/* Removed from Profile page to keep it clean as per feedback */}
            {/* The detailed actions list will be shown on /actions page */}
          </div>

          {/* Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Impact Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-primary-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Actions Logged</h3>
                  <p className="text-4xl font-bold text-primary-600">{actions.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Eco-friendly activities tracked</p>
                  <button
                    onClick={() => window.location.href = '/actions'}
                    className="mt-2 text-primary-600 hover:underline font-semibold"
                  >
                    View Actions
                  </button>
                </div>

                  <div className="bg-secondary-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">CO2 Saved</h3>
                    <p className="text-4xl font-bold text-secondary-600">{user.stats?.co2Saved || 0} kg</p>
                    <p className="text-sm text-gray-600 mt-1">Equivalent to planting 7 trees</p>
                  </div>

                  <div className="bg-accent-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Goals Completed</h3>
                    <p className="text-4xl font-bold text-accent-600">{user.stats?.completedGoals || 0}</p>
                    <p className="text-sm text-gray-600 mt-1">Sustainability targets achieved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
