import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
// import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import AuthGuard from "./guards/AuthGuard";
import Home from "./pages/Home";
import { Loader } from "./components/Loader";
import NavbarSkeleton from "./components/skeletons/NavbarSkeleton";
import ShopSkeleton from "./components/skeletons/ShopSkeleton";

// Lazy load pages and components
const Navbar = lazy(() => import("./components/Navbar"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const Catelog = lazy(() => import("./components/Catelog"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const PlaceOrderCart = lazy(() => import("./pages/PlaceOrderCart"));
const ThankYou = lazy(() => import("./components/ThankYou"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const PayOnlineMain = lazy(() => import("./pages/PayOnlineMain"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optional: replace this with your custom loading spinner or component
const Loading = () => (
  <div className="text-center py-10 text-gray-500 min-h-screen w-full flex items-center justify-center gap-4 -translate-y-24">
    <Loader />
    <h2 className="text-3xl text-primary-700 font-bold">ZAWAK IS LOADING</h2>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-warm-beige to-white">
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/shop"
            element={
              <Suspense fallback={<ShopSkeleton />}>
                <Shop />
              </Suspense>
            }
          />

          <Route
            path="/categories"
            element={
              <Suspense fallback={<Loading />}>
                <Catelog />
              </Suspense>
            }
          />

          <Route
            path="/shop/category/:category"
            element={
              <Suspense fallback={<Loading />}>
                <Catelog />
              </Suspense>
            }
          />

          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ProductDetails />
              </Suspense>
            }
          />

          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loading />}>
                <AuthGuard>
                  <Cart />
                </AuthGuard>
              </Suspense>
            }
          />

          <Route
            path="/place-order/:id"
            element={
              <Suspense fallback={<Loading />}>
                <PlaceOrder />
              </Suspense>
            }
          />

          <Route
            path="/place-order-cart"
            element={
              <Suspense fallback={<Loading />}>
                <PlaceOrderCart />
              </Suspense>
            }
          />

          <Route
            path="/order-done"
            element={
              <Suspense fallback={<Loading />}>
                <ThankYou />
              </Suspense>
            }
          />

          <Route
            path="/wishlist"
            element={
              <Suspense fallback={<Loading />}>
                <Wishlist />
              </Suspense>
            }
          />

          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loading />}>
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              </Suspense>
            }
          />

          <Route
            path="/about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />

          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
              </Suspense>
            }
          />

          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />

          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loading />}>
                <Signup />
              </Suspense>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loading />}>
                <ForgotPassword />
              </Suspense>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <Suspense fallback={<Loading />}>
                <ResetPassword />
              </Suspense>
            }
          />

          <Route
            path="/payonline-easyjazz"
            element={
              <Suspense fallback={<Loading />}>
                <PayOnlineMain />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
