import React from 'react';

const Orders = ({ orders }) => {
  return (
    <div className="mt-8 min-h-36">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Order History</h3>
      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-gray-100 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Order ID:</span> {order.id}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Date:</span> {order.date}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Total:</span> ${order.total}
                </p>
              </div>
              <button
                onClick={() => alert(`View details for order ${order.id}`)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
