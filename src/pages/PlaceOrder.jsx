import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditCard, Hand, HandCoins, Loader, Save } from "lucide-react";
import { getProductDetails } from "../api/product";
import { useDispatch } from "react-redux";
import { placeOrder } from "../api/order";
import { toast } from "react-toastify";
import { api_saveAddress } from "../api/user";
import { useAuth } from "../hooks/useAuth";

function PlaceOrder() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, isAuthenticated] = useAuth("placeorder");
  const navigate = useNavigate();
  const [savingAddress, setSavingAddress] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    knownPlace: "",
    postalCode: "",
    country: "Pakistan",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    async function f() {
      const product = await getProductDetails(id);
      if (product) setProduct(product);
    }
    f();
    
    if(user && user.address){
      setShippingAddress({
        street: user.address.street,
        city: user.address.city,
        knownPlace: user.address.knownPlace,
        postalCode: user.address.postalCode,
        country: shippingAddress.country,
      });
    }
  }, []);

  if (!product) return <div>Not Found</div>;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return
    }
    const { city, country, knownPlace, postalCode, street } = shippingAddress;
    if (
      !user ||
      city === "" ||
      country === "" ||
      knownPlace === "" ||
      postalCode === "" ||
      street === ""
    )
      return;
    const formData = {
      user: user._id,
      items: [
        {
          product: product._id,
          quantity: 1,
          price: product.price,
        },
      ],
      totalAmount: product.price,
      shippingAddress,
      paymentMethod,
      price: product.price,
    };

    console.log("formdata is: ", formData);

    const makeOrder = await placeOrder(formData);
    if (makeOrder.status === "NOT_AUTHENTICATED") {
      navigate("/login");
      return;
    }
    if(makeOrder && paymentMethod === "ONLINE"){
      navigate(`/payonline-easyjazz?orderId=${makeOrder._id}`);
      return;
    }
    if (makeOrder) {
      navigate("/order-done");
      return;
    };
  };

  const saveAddress = async () => {
    if (
      shippingAddress.city === "" ||
      shippingAddress.country === "" ||
      shippingAddress.knownPlace === "" ||
      shippingAddress.postalCode === "" ||
      shippingAddress.street === ""
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    setSavingAddress(true);
    await api_saveAddress(shippingAddress); 
    setSavingAddress(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 mt-16 px-10">
      {/* <!-- Order Details Header --> */}
      <h2 className="text-3xl font-semibold text-center text-primary-600">
        Complete Your Order
      </h2>

      {/* <!-- Cart Summary --> */}
      <div className="border-t-2 border-primary-100 pt-4">
        <h3 className="text-xl font-medium text-gray-700">Order Summary</h3>
        <div className="space-y-4 mt-4">
          {/* <!-- Product List --> */}
          <div className="flex justify-between text-gray-600">
            <span>Product Name</span>
            <span>Price</span>
          </div>
          {/* <!-- Example of a product entry --> */}
          <div className="flex justify-between py-2">
            <span>{product.name}</span>
            <span>${product.price}</span>
          </div>

          {/* <!-- Total --> */}
          <div className="flex justify-between mt-4 font-semibold text-lg text-gray-800">
            <span>Total</span>
            <span>${product.price}</span>
          </div>
        </div>
      </div>

      {/* <!-- Shipping Information --> */}
      <div className="border-t-2 border-primary-100 pt-6">
        <h3 className="text-xl font-medium  text-primary-500">
          Shipping Information
        </h3>
        <form action="#" method="POST" className="space-y-4 mt-4">
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </form>
        <button onClick={saveAddress} className="flex-1 btn btn-primary mt-4">
              {savingAddress ? <Loader className="w-4 h-4 mr-2"/> : <Save className="w-4 h-4 mr-2" /> } 
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
                onClick={() => {setPaymentMethod("ONLINE")}}
                className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
              >
                <CreditCard />
                Pay Online (Easypaisa JazzCash)
              </button>
            </div>
          </div>

          {/* <!-- Submit Button --> */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-6 py-3 text-white bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
