import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CreditCard, Hand, HandCoins, Loader, Loader2, Save } from "lucide-react";
import { getProductDetails } from "../api/product";
import { useDispatch } from "react-redux";
import { placeOrder } from "../api/order";
import { toast } from "react-toastify";
import { api_saveAddress } from "../api/user";
import { useAuth } from "../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import api from "../lib/api";
import { usePlaceOrder } from "../hooks/usePlaceOrder";
import { useCart } from "../hooks/useCart";

const stripePromise = loadStripe(
  "pk_test_51RRAv8PoYTLMhP3Rsv7UTdw4395fvI84ikh5eYxDXEtslW4VLLaqG3Y4H6iOaMB1rhNJ17eHQe5sghStx12P1nW800qApZq507"
);

function PlaceOrder() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [items, setitems] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [price, setPrice] = useState(null)
  const [user, isAuthenticated, loading] = useAuth("placeorder");
  const {items: cartItems, cartTotal} = useCart();

  const navigate = useNavigate();

  if(loading) {
    return <div className="text-center py-10 text-gray-500 min-h-screen w-full flex items-center justify-center gap-4 -translate-y-24">
      <Loader />
      <h2 className="text-3xl text-primary-700 font-bold">ZAWAK IS LOADING</h2>
    </div>
  }

  if(!loading && !isAuthenticated) {
    navigate("/login");
    return null;
  }


  const {shippingAddress, setShippingAddress, savingAddress, saveAddress, handleShippingAddressChange, handleSubmit, savingOrder} = usePlaceOrder(user, items, totalAmount, price, paymentMethod);


  useEffect(() => {
    if(id){
    (async function f() {
      const product = await getProductDetails(id);
      if (product) {
        setitems([
          {
            quantity: 1,
            price: product.price,
            total: product.price,
            productId: {
              _id: product._id,
              name: product.name,
            }
          }
        ],
        setTotalAmount(product.price),
        setPrice(product.price),
      )
      };
    })()} else {
      if (cartItems && cartItems.length > 0) {
        console.log("cart", cartItems);
        setitems(cartItems);
        setTotalAmount(cartTotal);
        setPrice(cartTotal);
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 mt-16 px-10">
      {/* <!-- Order Details Header --> */}
      <h2 className="text-3xl font-semibold text-center text-primary-600">
        Complete Your Order
      </h2>

      {/* <!-- Cart Summary --> */}
      {items && totalAmount && price && (
        <div className="border-t-2 border-primary-100 pt-4">
          <h3 className="text-xl font-medium text-gray-700">Order Summary</h3>
          <div className="space-y-4 mt-4">
            {/* <!-- Product List --> */}
            <div className="flex justify-between text-gray-600">
              <span>Product Name</span>
              <span>Price</span>
            </div>
            {/* <!-- Example of a product entry --> */}
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between py-2">
                <span>{item.productId.name}</span>
                <span>${item.price}</span>
              </div>
            ))}

            {/* <!-- Total --> */}
            <div className="flex justify-between mt-4 font-semibold text-lg text-gray-800">
              <span>Total</span>
              <span>${Number(totalAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Shipping Information --> */}
      <div className="border-t-2 border-primary-100 pt-6">
        <h3 className="text-xl font-medium  text-primary-500">
          Shipping Information
        </h3>
       {shippingAddress && <form action="#" method="POST" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={shippingAddress.street}
                onChange={handleShippingAddressChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingAddress.city}
                onChange={handleShippingAddressChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                Known Place
              </label>
              <input
                type="text"
                id="state"
                name="knownPlace"
                value={shippingAddress.knownPlace}
                onChange={handleShippingAddressChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleShippingAddressChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              disabled
              type="text"
              id="country"
              name="country"
              value={shippingAddress.country}
              onChange={handleShippingAddressChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </form>}
        <button onClick={saveAddress} className="flex-1 btn btn-primary mt-4">
          {savingAddress ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {savingAddress ? "Saving..." : "Save"}
        </button>
      </div>

      {/* <!-- Payment Information --> */}
      <div className="border-t-2 border-primary-100 pt-6">
        <h3 className="text-xl font-medium  text-primary-500">
          Payment Method
        </h3>
        <form action="#" method="POST" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Just COD available for now
            </label>
            <div className="flex gap-2 flex-wrap justify-center max-w-3xl p-4 md:p-12">
              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
              >
                <HandCoins />
                Pay On Delivery
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("ONLINE");
                }}
                className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
              >
                <CreditCard />
                Pay Online (Easypaisa JazzCash)
              </button>
              <button
                type="button"
                onClick={() => handleStripePayment}
                className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
              >
                <CreditCard />
                Pay With Stripe
              </button>
            </div>
          </div>

          {/* <!-- Submit Button --> */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full flex justify-center px-6 py-3 text-white bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {savingOrder ? <Loader2 className="animate-spin"/> : 'Confirm Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
