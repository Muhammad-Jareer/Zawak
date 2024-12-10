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
  const [productsState, setProductsState] = useState(products.slice(0, visibleCount))
  const [modalProduct, setModalProduct] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    tag: "",
    priceRange: "",
    sortBy: "",
  })
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Apply filtering logic based on the selected filters
    let filtered = [...products];

    // Category filter
    if (filters.category && filters.subCategory) {
      filtered = filtered.filter(product => (product.category === filters.category)&&(product.sub_category === filters.subCategory));
    }

    // Tag filter (example: featured, top-rated, etc.)
    if (filters.tag) {
      // Assuming tags in the product data
      filtered = filtered.filter(product => product.tags && product.tags.includes(filters.tag));
    }

    // Price Range filter (e.g., "$0 - $50", "$50 - $100")
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split(" - ").map(price => parseInt(price.replace('$', '').replace('+', '')));
      filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    // Sort By
    if (filters.sortBy === "Price: Low to High") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "Price: High to Low") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "Alphabetical (A-Z)") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === "Alphabetical (Z-A)") {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setProductsState(filtered);
  }, [filters]);

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
    //MAKING THE API CALL HERE
    setTimeout(()=>{
      setProductsState(productsState.concat(products.slice(visibleCount, visibleCount + 8)))
      setVisibleCount(pre => pre + 8)
    }, 2000);
  }

  const hasMore = () => {
    const {category, subCategory, tag, priceRange, sortBy} = filters
    if((category === "") && (subCategory === "") && (tag === "") && (priceRange === "") && (sortBy === "")){
      return visibleCount < products.length
    }
    return false
  }

  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="flex justify-between">
        <h1 className="font-serif text-4xl text-primary-600 mb-6">
          Shop Our Collection
        </h1>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="text-gray-600 hover:text-primary-600 cursor-pointer">
          {showFilter ? <X /> : <SlidersHorizontal /> }
        </button>
      </div>

        <Filter setFilters={setFilters} setShowFilter={setShowFilter} showFilter={showFilter} />
      
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
