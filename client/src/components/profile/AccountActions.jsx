import React from 'react';
import { Shield, Globe, X } from 'lucide-react';

const AccountActions = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-xl max-w-xl mt-8">
      <h2 className="text-xl font-semibold mb-6">Account Actions</h2>
      <div className="space-y-4">
        <ActionButton
          icon={<Shield className="w-5 h-5 text-blue-600" />}
          label="Change Password"
          onClick={() => alert('Change Password clicked')}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200"
        />
        <ActionButton
          icon={<Globe className="w-5 h-5 text-green-600" />}
          label="Export Data"
          onClick={() => alert('Export Data clicked')}
          className="bg-green-100 text-green-700 hover:bg-green-200"
        />
        <ActionButton
          icon={<X className="w-5 h-5 text-red-600" />}
          label="Delete Account"
          onClick={() => alert('Delete Account clicked')}
          className="bg-red-100 text-red-700 hover:bg-red-200"
        />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-colors duration-300 ${className}`}
    >
      {icon}
      <span className="font-semibold">{label}</span>
      <span className="ml-auto text-gray-400">→</span>
    </button>
  );
};

export default AccountActions;
