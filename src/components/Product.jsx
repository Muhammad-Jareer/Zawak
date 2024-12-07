import { Heart, ShoppingBag } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import ImageComponent from "./ImageComponent";

const ProductFilter = ({
  product,
  handleAddToCart,
  handleAddToWishlist,
  setModalProduct,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`} className="relative group">
        <ImageComponent src={product.image} alt={product.name} />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalProduct(product);
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-md"
          >
            Quick View
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h2 className="font-medium text-lg mb-2">{product.name}</h2>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-primary-600 font-semibold">${product.price}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => handleAddToCart(product)}
              className="text-primary-600 hover:text-primary-700"
            >
              <ShoppingBag size={24} />
            </button>
            <button
              onClick={() => handleAddToWishlist(product)}
              className="text-primary-600 hover:text-primary-700"
            >
              <Heart size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
