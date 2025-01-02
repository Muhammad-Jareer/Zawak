import React from 'react';

const ShippingSettings = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Preferences</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Set up your preferred shipping methods.</p>

        <button
          onClick={() => alert('Update shipping preferences functionality')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Shipping Preferences
        </button>
      </div>
    </div>
  );
};

export default ShippingSettings;
