import React from 'react';

const StoreSettings = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Store Settings</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Manage your store's name, description, and other settings.</p>

        <button
          onClick={() => alert('Edit store settings functionality')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Edit Store Settings
        </button>
      </div>
    </div>
  );
};

export default StoreSettings;
