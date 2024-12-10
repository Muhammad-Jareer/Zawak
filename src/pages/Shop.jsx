import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { products } from "../data/products";
import ProductModal from "../components/ProductModal";
import AddToCartWishlistPopup from "../components/AddToCartWishlistPopup";
import Product from "../components/Product";
import Filter from "../components/Filter";
import { Loader } from "../components/Loader";

function Shop() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [visibleCount, setVisibleCount] = useState(8);
  const [productsState, setProductsState] = useState(products.slice(0, visibleCount));
  const [modalProduct, setModalProduct] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setProductsState(products.slice(0, visibleCount));
  }, [visibleCount]);

  const handleAddToCart = (product) => {
    if (product && product.price) {
      dispatch({ type: "cart/addToCart", payload: { ...product, quantity: 1 } });
      setPopup({ show: true, type: "cart", itemName: product.name });
    }
  };

  const handleAddToWishlist = (product) => {
    if (product && product.name) {
      dispatch({ type: "wishlist/addToWishlist", payload: product });
      setPopup({ show: true, type: "wishlist", itemName: product.name });
    }
  };

  const fetchMoreData = () => {
    // Simulate API call to load more products
    setTimeout(() => {
      setProductsState(productsState.concat(products.slice(visibleCount, visibleCount + 8)));
      setVisibleCount((prev) => prev + 8);
    }, 2000);
  };

  const hasMore = () => visibleCount < products.length;

  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="flex justify-between">
        <h1 className="font-serif text-4xl text-primary-600 mb-6">
          Shop Our Collection
        </h1>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="text-gray-600 hover:text-primary-600 cursor-pointer">
          {showFilter ? <X /> : <SlidersHorizontal />}
        </button>
      </div>

      {/* Render the Filter component */}
      <Filter setShowFilter={setShowFilter} showFilter={showFilter} />

      <InfiniteScroll
        dataLength={productsState.length}
        next={fetchMoreData}
        hasMore={hasMore()}
        loader={<Loader />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsState.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
              setModalProduct={setModalProduct}
            />
          ))}
        </div>
      </InfiniteScroll>

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
