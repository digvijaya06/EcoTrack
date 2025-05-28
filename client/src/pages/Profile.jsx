import React, { useState } from 'react';
import { Camera, User, Mail, MapPin, Award, Edit2, Globe, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { formatDate } from '../utils/formatterrs';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    id: '123',
    name: 'Dimple Nagda',
    email: 'yashwininobody@example.com',
    avatar: 'https://media.istockphoto.com/id/98291293/photo/top-view.jpg?s=2048x2048&w=is&k=20&c=Pwej2UVUfZomstvxFAkB3un2_kxF6Baq3rCSvvMjfuY=',
    location: 'Udaipur, Rajasthan',
    bio: 'Passionate about sustainability and making a positive impact on our planet. Software engineer by day, eco-warrior by night!',
    website: 'abc.com',
    joinedDate: '2023-01-15',
    stats: {
      totalActions: 132,
      co2Saved: 425,
      completedGoals: 8,
    },
    badges: [
      { id: '1', name: 'Early Adopter', icon: '🌱', earnedDate: '2023-01-20' },
      { id: '2', name: 'Carbon Conscious', icon: '🌿', earnedDate: '2023-03-15' },
      { id: '3', name: 'Waste Warrior', icon: '♻️', earnedDate: '2023-05-10' },
    ],
  };

  const [editedUser, setEditedUser] = useState({
    name: user.name,
    location: user.location,
    bio: user.bio,
    website: user.website,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      name: user.name,
      location: user.location,
      bio: user.bio,
      website: user.website,
    });
    setIsEditing(false);
  };

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
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="relative mb-6 md:mb-0 md:mr-8">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    {isEditing && (
                      <button className="absolute -right-2 -bottom-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700">
                        <Camera size={16} />
                      </button>
                    )}
                  </div>

                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={editedUser.name}
                            onChange={handleInputChange}
                            className="input w-full border rounded px-3 py-2"
                          />
                        </div>

                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={editedUser.location}
                            onChange={handleInputChange}
                            className="input w-full border rounded px-3 py-2"
                          />
                        </div>

                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                            Website
                          </label>
                          <input
                            type="text"
                            id="website"
                            name="website"
                            value={editedUser.website}
                            onChange={handleInputChange}
                            className="input w-full border rounded px-3 py-2"
                          />
                        </div>

                        <div>
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            value={editedUser.bio}
                            onChange={handleInputChange}
                            className="input w-full border rounded px-3 py-2"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <User size={18} className="text-gray-400 mr-2" />
                          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                        </div>

                        <div className="flex items-center">
                          <Mail size={18} className="text-gray-400 mr-2" />
                          <p className="text-gray-600">{user.email}</p>
                        </div>

                        <div className="flex items-center">
                          <MapPin size={18} className="text-gray-400 mr-2" />
                          <p className="text-gray-600">{user.location}</p>
                        </div>

                        {user.website && (
                          <div className="flex items-center">
                            <Globe size={18} className="text-gray-400 mr-2" />
                            <a
                              href={`https://${user.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700"
                            >
                              {user.website}
                            </a>
                          </div>
                        )}

                        <p className="text-gray-600 mt-4">{user.bio}</p>

                        <p className="text-sm text-gray-500 mt-4">
                          Joined on {formatDate(user.joinedDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter className="flex justify-end space-x-3 border-t border-gray-100 pt-4">
                  <Button variant="outline" onClick={handleCancel} leftIcon={<X size={16} />}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave} leftIcon={<Check size={16} />}>
                    Save Changes
                  </Button>
                </CardFooter>
              )}
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
                  {user.badges.map((badge) => (
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
                    <p className="text-4xl font-bold text-primary-600">{user.stats.totalActions}</p>
                    <p className="text-sm text-gray-600 mt-1">Eco-friendly activities tracked</p>
                  </div>

                  <div className="bg-secondary-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">CO2 Saved</h3>
                    <p className="text-4xl font-bold text-secondary-600">{user.stats.co2Saved} kg</p>
                    <p className="text-sm text-gray-600 mt-1">Equivalent to planting 7 trees</p>
                  </div>

                  <div className="bg-accent-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Goals Completed</h3>
                    <p className="text-4xl font-bold text-accent-600">{user.stats.completedGoals}</p>
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
