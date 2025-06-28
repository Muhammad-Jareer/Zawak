import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_saveAddress } from "../api/user";
import { placeOrder } from "../api/order";
import { useCart } from "./useCart";
import { applyCoupon } from "../api/coupon";

export const usePlaceOrder = (
  user,
  items,
  totalAmount,
  price,
  paymentMethod,
  setTotalAmount
) => {
  const [savingAddress, setSavingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    knownPlace: "",
    postalCode: "",
    country: "Pakistan",
  });

  const [coupon, setCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [discount, setDiscount] = useState(0);

  const [savingOrder, setSavingOrder] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStripePayment = async (e) => {
    const res = await api.post("/payment/create-checkout-session", {});

    const data = await res.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.id });
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
  };

  const handleApplyCoupon = async () => {
    setCouponLoading(true);
    setCouponError("");
    setCouponSuccess("");
    try {
      // You may need to adjust the API call according to your backend
      const res = await applyCoupon({
        code: coupon,
        userId: user._id,
        total: totalAmount,
      });
      if (res && res.discountAmount) {
        setDiscount(res.discountAmount);
        setTotalAmount(totalAmount - res.discountAmount);
        setCouponSuccess(`Coupon applied! You saved $${res.discountAmount}`);
      } else {
        setCouponError(res?.message || "Invalid coupon");
      }
    } catch (err) {
      setCouponError("Failed to apply coupon");
    }
    setCouponLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
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

    setSavingOrder(true);
    const formData = {
      user: user._id,
      items: [],
      totalAmount,
      shippingAddress,
      paymentMethod,
      price,
      couponCode: coupon,
    };

    items.forEach((item) => {
      formData.items.push({
        product: item.productId._id,
        quantity: item.quantity,
        price: item.price,
      });
    });

    const makeOrder = await placeOrder(formData);
    setSavingOrder(false);
    if (makeOrder.status === "NOT_AUTHENTICATED") {
      navigate("/login");
      return;
    }
    clearCart();
    if (makeOrder && paymentMethod === "ONLINE") {
      navigate(`/payonline-easyjazz?orderId=${makeOrder._id}`);
      return;
    }
    if (makeOrder) {
      navigate("/order-done");
      return;
    }
  };

  useEffect(() => {
    if (user && user.address) {
      setShippingAddress({
        street: user.address.street,
        city: user.address.city,
        knownPlace: user.address.knownPlace,
        postalCode: user.address.postalCode,
        country: shippingAddress.country,
      });
    }
  }, []);

  return {
    shippingAddress,
    setShippingAddress,
    saveAddress,
    savingAddress,
    handleShippingAddressChange,
    handleSubmit,
    savingOrder,
    coupon,
    setCoupon,
    couponError,
    couponLoading, 
    handleApplyCoupon,
    couponSuccess
  };
};
