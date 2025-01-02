import { Heart, ShoppingBag, Eye } from "lucide-react"; 
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageComponent from "./ImageComponent";

const Product = ({
  product,
  handleAddToCart,
  handleAddToWishlist,
  setModalProduct,
  enableButtons,
}) => {
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth <= 425);

  // Update isSmallDevice state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 425);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`} className="relative">
        <ImageComponent src={product.image} alt={product.name} className={'h-36 lg:h-48'} />
      </Link>
      <div className="p-2 sm:p-3 md:p-4">
        <Link to={`/product/${product.id}`}>
          <h2 className="font-medium text-[10px] sm:text-sm lg:text-base mb-2 truncate">
            {product.name}
          </h2>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-primary-600 font-medium text-[10px] sm:text-base lg:text-lg">
            ${product.price}
          </p>
          {enableButtons && (
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="text-primary-600 hover:text-primary-700"
              >
                {isSmallDevice ? <ShoppingBag size={12} /> : <ShoppingBag size={20} />}
              </button>
              <button
                onClick={() => handleAddToWishlist(product)}
                className="text-primary-600 hover:text-primary-700"
              >
                {isSmallDevice ? <Heart size={12} /> : <Heart size={20} />}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModalProduct(product);
                }}
                className="text-primary-600 hover:text-primary-700"
              >
                {isSmallDevice ? <Eye size={12} /> : <Eye size={20} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
