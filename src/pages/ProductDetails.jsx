import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import AddToCartWishlistPopup from "../components/AddToCartWishlistPopup";
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { addToRecentlyViewed } from '../store/slices/productSlice';
import { products } from '../data/products';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const recentlyViewed = useSelector((state) => state.product.recentlyViewed);
  const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });

  const product = products.find((p) => p.id === id);
  const variantImages = product
    ? [product.image, ...(product.vairentImages || [])].slice(0, 4)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setMainImage(product.image);
      dispatch(addToRecentlyViewed(product));
    }
  }, [id, product, dispatch]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl mb-8">Product Not Found</h1>
        <button
          onClick={() => navigate('/shop')}
          className="btn btn-primary inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </button>
      </div>
    );
  }

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setPopup({ show: true, type: "cart", itemName: product.name });
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    setPopup({ show: true, type: "wishlist", itemName: product.name });
  };

  return (
    <div className="container mx-auto px-4 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-gray-600 hover:text-primary-600 inline-flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="lg:flex flex-col lg:flex-row gap-6">
        {/* Variant Images */}
        <div className="flex gap-2 lg:gap-4 lg:flex-col py-6 lg:py-0">
          {variantImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Variant ${index + 1}`}
              onClick={() => setMainImage(image)}
              className="w-20 h-20 object-center object-cover rounded-md border border-gray-300 hover:cursor-pointer"
            />
          ))}
        </div>

        {/* Popup */}
        {popup.show && (
          <AddToCartWishlistPopup
            type={popup.type}
            itemName={popup.itemName}
            onClose={() => setPopup({ ...popup, show: false })}
          />
        )}

        {/* Product Details */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <img
                src={mainImage || product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h1 className="font-serif text-3xl">{product.name}</h1>
              <p className="text-2xl text-primary-600 font-semibold">${product.price}</p>
              <p className="text-gray-700">{product.description}</p>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-md border"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-md border"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button onClick={handleAddToCart} className="flex-1 btn btn-primary">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
                <Link className="flex-1 btn btn-primary" to={`/place-order/${product.id}`}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Link>
                <button onClick={handleAddToWishlist} className="btn btn-outline p-2">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Additional Details */}
              <div className="border-t pt-6 mt-6">
                <h2 className="font-medium text-lg mb-2">Product Details</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>Category: {product.category}</li>
                  <li>{product.description}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="font-serif text-2xl mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-primary-600 font-semibold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div>
          <h2 className="font-serif text-2xl mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {recentlyViewed.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-primary-600 font-semibold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
