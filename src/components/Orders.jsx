import { useEffect, useState } from 'react';
import { cancelOrder, getUserOrders } from '../api/order';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuth();
  const [cancellingOrder, setCancellingOrder] = useState(null) // holds the order id
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const userOrders = await getUserOrders(user._id);
      setLoading(false);
      if (userOrders === 'NOT_AUTHENTICATED') return navigate('/login');
      if (userOrders) setOrders(userOrders);
    }
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if(!orderId) return
    setCancellingOrder(orderId)
    const res = await cancelOrder(orderId);
    if(res){
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, orderStatus: 'Cancelled' } : order
      )
    )}
    setCancellingOrder(null)
  };

  if(loading){
    return (
      <div className="flex items-center justify-center bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-700 mb-8">Your Orders</h1>

        {!loading && orders && orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                  <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-sm sm:text-right mt-2 sm:mt-0">
                  <p className={`font-semibold ${statusColor(order.orderStatus)}`}>
                    Status: {order.orderStatus}
                  </p>
                  <p className={`font-semibold ${paymentColor(order.paymentStatus)}`}>
                    Payment: {order.paymentStatus} ({order.paymentMethod})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-md font-semibold text-primary-600 mb-2">Shipping Address</h3>
                  <p className="text-gray-700">
                    {order.shippingAddress.street}, {order.shippingAddress.knownPlace}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-primary-600 mb-2">Items</h3>
                  <ul className="space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex justify-between text-sm text-gray-700">
                        <span>{item.product.name} × {item.quantity}</span>
                        <span>Rs {item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-lg font-bold">Total: Rs {order.totalAmount}</p>
                {order.orderStatus === 'Processing' && cancellingOrder !== order._id && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Cancel Order
                  </button>
                )}
                {cancellingOrder === order._id && <Loader2 className='w-12 h-12 animate-spin' />}
              </div>
            </div>
          ))
        )}

        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">Looking for more amazing products?</p>
          <a
            href="/shop"
            className="inline-block mt-4 bg-primary-600 text-white text-lg px-6 py-3 rounded-lg shadow hover:bg-primary-500 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

// Helpers for status colors
function statusColor(status) {
  switch (status) {
    case 'Delivered':
      return 'text-green-600';
    case 'Cancelled':
      return 'text-red-600';
    case 'Shipped':
      return 'text-blue-600';
    default:
      return 'text-yellow-600';
  }
}

function paymentColor(status) {
  switch (status) {
    case 'Completed':
      return 'text-green-600';
    case 'Failed':
      return 'text-red-600';
    default:
      return 'text-yellow-600';
  }
}

export default Orders;
