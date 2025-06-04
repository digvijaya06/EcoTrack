import React, { useEffect, useState } from 'react';
import maleAvatar from '../assets/user-male-alt-svgrepo-com.svg';
import femaleAvatar from '../assets/user-female-svgrepo-com.svg';
import { guessGender } from '../utils/genderGuess';

const isValidAvatarUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol.startsWith('http');
  } catch {
    return false;
  }
};

const getDefaultAvatar = (name) => {
  const gender = guessGender(name);
  if (gender === 'female') return femaleAvatar;
  if (gender === 'male') return maleAvatar;
  return femaleAvatar;
};

const VisitorProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile/public');
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        console.error('Failed to load profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div className="text-center py-10">Loading profiles...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Our Eco Members</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {profiles.map((user, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4 text-center">
            <img
              src={isValidAvatarUrl(user.avatar) ? user.avatar : getDefaultAvatar(user.name)}
              alt={user.name}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.bio || 'No bio available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorProfiles;
