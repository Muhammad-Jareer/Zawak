import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { addToRecentlyViewed } from '../store/slices/productSlice';
import { products } from '../data/products';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const recentlyViewed = useSelector((state) => state.product.recentlyViewed);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
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
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="container mx-auto px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-gray-600 hover:text-primary-600 inline-flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <h1 className="font-serif text-3xl">{product.name}</h1>
          <p className="text-2xl text-primary-600 font-semibold">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>

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

          <div className="flex space-x-4">
            <button onClick={handleAddToCart} className="flex-1 btn btn-primary">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
            <button onClick={handleAddToWishlist} className="btn btn-outline p-2">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <div className="border-t pt-6 mt-6">
            <h2 className="font-medium text-lg mb-2">Product Details</h2>
            <ul className="space-y-2 text-gray-700">
              <li>Category: {product.category}</li>
              <li>Handmade with care</li>
              <li>Sustainable materials</li>
              <li>Fair trade certified</li>
            </ul>
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
