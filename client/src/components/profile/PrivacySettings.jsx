import React, { useState } from 'react';

const PrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [activitySharing, setActivitySharing] = useState(true);
  const [leaderboardParticipation, setLeaderboardParticipation] = useState(true);
  const [dataAnalytics, setDataAnalytics] = useState(true);

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl max-w-xl mt-8">
      <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
      <div className="space-y-4">
        <ToggleSwitch
          label="Profile visibility"
          description="Make your profile visible to other users"
          enabled={profileVisibility}
          onToggle={() => setProfileVisibility(!profileVisibility)}
        />
        <ToggleSwitch
          label="Activity sharing"
          description="Share your activities with the community"
          enabled={activitySharing}
          onToggle={() => setActivitySharing(!activitySharing)}
        />
        <ToggleSwitch
          label="Leaderboard participation"
          description="Appear on public leaderboards"
          enabled={leaderboardParticipation}
          onToggle={() => setLeaderboardParticipation(!leaderboardParticipation)}
        />
        <ToggleSwitch
          label="Data analytics"
          description="Allow anonymous data collection for insights"
          enabled={dataAnalytics}
          onToggle={() => setDataAnalytics(!dataAnalytics)}
        />
      </div>
    </div>
  );
};

const ToggleSwitch = ({ label, description, enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
          enabled ? 'bg-green-600' : 'bg-gray-300'
        }`}
        aria-pressed={enabled}
        aria-label={`Toggle ${label}`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            enabled ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </div>
  );
};

export default PrivacySettings;
