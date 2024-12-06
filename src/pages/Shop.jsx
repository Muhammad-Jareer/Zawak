import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import ProductModal from "../components/ProductModal";
import AddToCartWishlistPopup from "../components/AddToCartWishlistPopup";
import Product from "../components/Product";

function Shop() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [visibleCount, setVisibleCount] = useState(8);
  const [modalProduct, setModalProduct] = useState(null);
  const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleAddToCart = (product) => {
    if (product && product.price) {
      dispatch({ type: "cart/addToCart", payload: product });
      setPopup({ show: true, type: "cart", itemName: product.name });
    }
  };

  const handleAddToWishlist = (product) => {
    if (product && product.name) {
      dispatch({ type: "wishlist/addToWishlist", payload: product });
      setPopup({ show: true, type: "wishlist", itemName: product.name });
    }
  };

  return (
    <div className="container mx-auto px-4 mt-16">
      <h1 className="font-serif text-4xl text-primary-600 mb-6">
        Shop Our Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, visibleCount).map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleAddToWishlist={handleAddToWishlist}
            setModalProduct={setModalProduct}
          />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount(visibleCount + 8)}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            Show More
          </button>
        </div>
      )}

      {popup.show && (
        <AddToCartWishlistPopup
          type={popup.type}
          itemName={popup.itemName}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
}

export default Shop;
