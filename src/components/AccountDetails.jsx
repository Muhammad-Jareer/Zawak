// src/components/AccountDetails.jsx
import React from 'react';

const AccountDetails = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-800">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={user?.email || ''}
          disabled
          className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          value={user?.phone || ''}
          disabled
          className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button
        onClick={() => alert('Change account details functionality')}
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        Edit Account Details
      </button>
    </div>
  );
};

export default AccountDetails;
