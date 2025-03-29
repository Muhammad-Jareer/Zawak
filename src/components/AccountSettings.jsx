import React from 'react';
import AccountDetails from './AccountDetails';
import PaymentSettings from './PaymentSetttings';
import ShippingSettings from './ShippingSettings';
import StoreSettings from './StoreSettings';

const AccountSettings = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[400px] overflow-y-auto">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Account Settings</h2>

      <AccountDetails user={user} />
      {/* <PaymentSettings />
      <ShippingSettings />
      <StoreSettings /> */}
    </div>
  );
};

export default AccountSettings;
