import React, { useState } from 'react';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [challengeReminders, setChallengeReminders] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(true);

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl max-w-xl">
      <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
      <div className="space-y-4">
        <ToggleSwitch
          label="Email notifications"
          description="Receive updates via email"
          enabled={emailNotifications}
          onToggle={() => setEmailNotifications(!emailNotifications)}
        />
        <ToggleSwitch
          label="Push notifications"
          description="Get notified on your device"
          enabled={pushNotifications}
          onToggle={() => setPushNotifications(!pushNotifications)}
        />
        <ToggleSwitch
          label="Weekly reports"
          description="Weekly progress summaries"
          enabled={weeklyReports}
          onToggle={() => setWeeklyReports(!weeklyReports)}
        />
        <ToggleSwitch
          label="Challenge reminders"
          description="Reminders for active challenges"
          enabled={challengeReminders}
          onToggle={() => setChallengeReminders(!challengeReminders)}
        />
        <ToggleSwitch
          label="Community updates"
          description="Updates from your groups"
          enabled={communityUpdates}
          onToggle={() => setCommunityUpdates(!communityUpdates)}
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

export default NotificationSettings;
