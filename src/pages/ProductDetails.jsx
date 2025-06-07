import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  ShoppingCart,
  Loader2,
  MoreVertical,
} from "lucide-react";
import AddToCartWishlistPopup from "../components/AddToCartWishlistPopup";
import { addToCart, initialize } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";
import { addToRecentlyViewed } from "../store/slices/productSlice";
import { products } from "../data/products";
import ImageComponent from "../components/ImageComponent";
import RecentlyViewed from "../components/RecentlyViewed";
const SimilarProducts = lazy(() => import("../components/SimilarProducts"));
import { getProductDetails } from "../api/product";
import { addItemToCart, getCart } from "../api/cart";
import { useCart } from "../hooks/useCart";
import SimilarProductsSkeleton from "../components/skeletons/SimilarProductsSkeleton";
import { Loader } from "../components/Loader";
import Markdown from 'react-markdown';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [product, setProduct] = useState(null);
  const recentlyViewed = useSelector((state) => state.product.recentlyViewed);
  const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });
  const cartState = useSelector((state) => state.cart);
  const { addingItemToCart, handleAddToCart } = useCart();
  const [openReadAbout, setOpenReadAbout] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function f() {
      setLoading(true);
      const foundProduct = await getProductDetails(id);
      if (foundProduct) {
        console.log("founde porduct is: ", foundProduct);
        setProduct(foundProduct);
        setMainImage(foundProduct.image);
        dispatch(addToRecentlyViewed(foundProduct));
      }
      setLoading(false);
    }
    f();
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 min-h-screen w-full flex items-center justify-center gap-4 -translate-y-24">
        <Loader />
        <h2 className="text-3xl text-primary-700 font-bold">
          ZAWAK IS LOADING
        </h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl mb-8">Product Not Found</h1>
        <button
          onClick={() => navigate("/shop")}
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
    ? [product.image, ...(product.variant_images || [])].slice(0, 4)
    : [];

  // Handle clicking on a variant image
  const handleVariantClick = (image) => {
    setMainImage(image);
  };

  // Handle adding the product to the wishlist
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
              <p className="text-2xl text-primary-600 font-semibold">
                ${product.price}
              </p>
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
                <button
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                  className="flex-1 btn btn-primary"
                >
                  {addingItemToCart ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <ShoppingBag className="w-4 h-4 mr-2" />
                  )}
                  Add to Cart
                </button>
                <Link
                  className="flex-1 btn btn-primary"
                  to={`/place-order?id=${product._id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Link>
                <button
                  onClick={handleAddToWishlist}
                  className="btn btn-outline p-2"
                >
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

              {/* Read More About */}
              <div className="flex gap-4 ">
              <button onClick={() => setOpenReadAbout(pre => !pre)} className="inline-flex items-center justify-center px-4 py-1 rounded-md font-medium transition-colors text-xs btn-primary">
                Read More 
              </button>
              <p className="text-gray-700 text-xs">Read more about this product like <br/> it's history, what it is used for etc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Read More Section */}
      {product.about && openReadAbout && <div className="mb-16">
        <h2 className="font-serif text-2xl mb-4">Read More About {product.name}</h2>
        <Markdown components={{
          // Headings
          h1: ({ node, ...props }) => (
            <h1 
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200" 
              {...props} 
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 
              className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-5 mt-8" 
              {...props} 
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 
              className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 mt-6" 
              {...props} 
            />
          ),
          h4: ({ node, ...props }) => (
            <h4 
              className="text-lg sm:text-xl font-medium text-gray-700 mb-3 mt-5" 
              {...props} 
            />
          ),
          
          // Text elements
          p: ({ node, ...props }) => (
            <p 
              className="text-gray-700 mb-4 leading-relaxed" 
              {...props} 
            />
          ),
          strong: ({ node, ...props }) => (
            <strong 
              className="font-semibold text-gray-900" 
              {...props} 
            />
          ),
          em: ({ node, ...props }) => (
            <em 
              className="italic" 
              {...props} 
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic" 
              {...props} 
            />
          ),
          
          // Lists
          ul: ({ node, ...props }) => (
            <ul 
              className="list-disc pl-6 my-4 space-y-1" 
              {...props} 
            />
          ),
          ol: ({ node, ...props }) => (
            <ol 
              className="list-decimal pl-6 my-4 space-y-1" 
              {...props} 
            />
          ),
          li: ({ node, ...props }) => (
            <li 
              className="text-gray-700 mb-1" 
              {...props} 
            />
          ),
          
          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6 shadow-sm rounded-lg">
              <table 
                className="min-w-full divide-y divide-gray-200" 
                {...props} 
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead 
              className="bg-gray-50" 
              {...props} 
            />
          ),
          tbody: ({ node, ...props }) => (
            <tbody 
              className="bg-white divide-y divide-gray-200" 
              {...props} 
            />
          ),
          tr: ({ node, ...props }) => (
            <tr 
              className="hover:bg-gray-50" 
              {...props} 
            />
          ),
          th: ({ node, ...props }) => (
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" 
              {...props} 
            />
          ),
          td: ({ node, ...props }) => (
            <td 
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" 
              {...props} 
            />
          ),
          
          // Media
          img: ({ node, ...props }) => (
            <img 
              {...props} 
              className="my-6 rounded-lg shadow-md w-full max-w-2xl mx-auto" 
              alt={props.alt || 'Product detail'} 
              loading="lazy"
            />
          ),
          
          // Links
          a: ({ node, ...props }) => (
            <a 
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline" 
              {...props} 
              target="_blank" 
              rel="noopener noreferrer" 
            />
          ),
          
          // Code
          code: ({ node, ...props }) => (
            <code 
              className="bg-gray-100 px-2 py-1 rounded text-red-600 text-sm font-mono" 
              {...props} 
            />
          ),
          pre: ({ node, ...props }) => (
            <pre 
              className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm my-4 font-mono" 
              {...props} 
            />
          ),
        }}>
          {product.about }
        </Markdown>
      </div>}


      {/* Similar Products */}
      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts
          category={product.category}
          subCategory={product.sub_category}
          tag={product.tags[0]}
        />
      </Suspense>

      {/* Recently Viewed */}
      <RecentlyViewed recentlyViewed={recentlyViewed} navigate={navigate} />
    </div>
  );
}

export default ProductDetails;
