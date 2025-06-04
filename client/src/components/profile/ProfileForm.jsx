import React, { useState } from 'react';
import { Camera, Check, X } from 'lucide-react';
import Button from '../ui/Button';

const ProfileForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    location: initialData.location || '',
    bio: initialData.bio || '',
    website: initialData.website || '',
    avatar: initialData.avatar || '',
  });

  const [previewAvatar, setPreviewAvatar] = useState(formData.avatar || '');
  const [avatarFile, setAvatarFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...formData };

    if (avatarFile) {
      
      updatedData.avatar = previewAvatar;
    }

    onSave(updatedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <img
          src={previewAvatar || '/placeholder-avatar.png'}
          alt="Avatar Preview"
          className="w-20 h-20 rounded-full object-cover mr-4 border"
        />
        <label className="cursor-pointer bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 relative">
          <Camera size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onCancel} leftIcon={<X size={16} />}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" leftIcon={<Check size={16} />}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
