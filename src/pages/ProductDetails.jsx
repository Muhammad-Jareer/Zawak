import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import AddToCartWishlistPopup from "../components/AddToCartWishlistPopup";
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { addToRecentlyViewed } from '../store/slices/productSlice';
import { products } from '../data/products';
import ImageComponent from '../components/ImageComponent';
import RecentlyViewed from '../components/RecentlyViewed';
import SimilarProducts from '../components/SimilarProducts';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [product, setProduct] = useState(null);
  const recentlyViewed = useSelector((state) => state.product.recentlyViewed);
  const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
      dispatch(addToRecentlyViewed(foundProduct));
    }
  }, [id, dispatch]);

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

  // Get variant images (including the main image and variant images)
  const variantImages = product
    ? [product.image, ...(product.variantImages || [])].slice(0, 4)
    : [];

  // Handle clicking on a variant image
  const handleVariantClick = (image) => {
    setMainImage(image);
  };

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setPopup({ show: true, type: "cart", itemName: product.name });
  };

  // Handle adding the product to the wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    setPopup({ show: true, type: "wishlist", itemName: product.name });
  };

  // Get similar products
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 py-6 lg:py-0 lg:min-w-24 overflow-x-auto">
          {variantImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Variant ${index + 1}`}
              onClick={() => handleVariantClick(image)}
              className="w-16 h-16 lg:w-20 lg:h-20 object-center object-cover rounded-md border border-gray-300 hover:cursor-pointer"
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
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <ImageComponent
                alt={product.name}
                src={mainImage || product.image}
                className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
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
              <div className="flex flex-col md:flex-row gap-4">
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
      <SimilarProducts similarProducts={similarProducts} navigate={navigate} />

      {/* Recently Viewed */}
      <RecentlyViewed recentlyViewed={recentlyViewed} navigate={navigate} />
    </div>
  );
}

export default ProductDetails;