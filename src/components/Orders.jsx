import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../api/order';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';

const Orders = () => {
  // Sample orders data
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuth()


  useEffect(() => {
    async function f() {
      const userOrders = await getUserOrders(user._id);
      if(userOrders === 'NOT_AUTHENTICATED') return navigate("/login")
      if(userOrders) setOrders(userOrders)
      console.log(" user orders are: ", userOrders)
    }
    f();
  }, [])
  

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary-600 mb-8">Your Orders</h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                <p className="text-gray-600">Date: {order.createdAt.split("T")[0]}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    order.status === 'Delivered'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {order.status}
                </p>
                <p className="text-lg font-bold">{order.total}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-primary-600 mb-2">
                Items:
              </h3>
              <ul>
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-gray-700"
                  >
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Call-to-action */}
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">
            Looking for more amazing products?
          </p>
          <a
            href="/shop"
            className="inline-block mt-4 bg-primary-600 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-primary-500 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Orders;
