import React from 'react';

const PaymentSettings = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Methods</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">You can manage your payment methods here.</p>

        <button
          onClick={() => alert('Add a new payment method functionality')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add New Payment Method
        </button>
      </div>
    </div>
  );
};

export default PaymentSettings;
