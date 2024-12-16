import React, { useCallback, useEffect, useState } from "react";
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
    const {category, tag, priceRange, sortBy, subCategory} = filters
    if (!category && !tag && !priceRange && !sortBy) return
    const filteredProducts = filterProducts()
    setProductsState(filteredProducts.slice(0, visibleCount));
    setShowFilter(false)
  }, [filters])
  

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
    const {category, tag, priceRange, sortBy} = filters
    if(!category && !tag && !priceRange && !sortBy){
      setTimeout(() => {
        setProductsState(productsState.concat(products.slice(visibleCount, visibleCount + 8)));
        setVisibleCount((prev) => prev + 8);
      }, 1000);
      return
   }

   setTimeout(() => {
     const filteredProducts = filterProducts()
     setProductsState(pre => pre.concat(filteredProducts.slice(visibleCount, visibleCount + 8)));
     setVisibleCount((prev) => prev + 8);
   }, 1000);
   return
  };

  const hasMore = () => {
    const {category, tag, priceRange, sortBy, subCategory} = filters
    if(!category && !tag && !priceRange && !sortBy) return visibleCount < products.length

    const filteredProducts = filterProducts()
    return visibleCount < filteredProducts.length
  }

  const filterProducts = () => {
    let filteredProducts = [...products];

    // Filter by Category and Subcategory
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }
    if (filters.subCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.sub_category === filters.subCategory
      );
    }

    // Filter by Tag
    if (filters.tag) {
      filteredProducts = filteredProducts.filter((product) =>
        product.tags.includes(filters.tag)
      );
    }

    // Filter by Price Range
    if (filters.priceRange) {
      const priceRanges = {
        "$0 - $50": [0, 50],
        "$50 - $100": [50, 100],
        "$100 - $150": [100, 150],
        "$150 - $200+": [150, Infinity],
      };
      const [minPrice, maxPrice] = priceRanges[filters.priceRange];
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Sort Products
    if (filters.sortBy === "Price: Low to High") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "Price: High to Low") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "Alphabetical (A-Z)") {
      filteredProducts = filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (filters.sortBy === "Alphabetical (Z-A)") {
      filteredProducts = filteredProducts.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    return filteredProducts
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
          {showFilter ? <X /> : <SlidersHorizontal />}
        </button>
      </div>

      {/* Render the Filter component */}
      <Filter setShowFilter={setShowFilter} showFilter={showFilter} filters={filters} setFilters={setFilters} />

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
              enableQuickView={true}
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
