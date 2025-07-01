import React from 'react';

const ExportButton = ({ onExport }) => {
  return (
    <button
      onClick={onExport}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    >
      Export Analytics
    </button>
  );
};

export default ExportButton;
