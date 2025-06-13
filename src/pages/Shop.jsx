import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SlidersHorizontal, Search } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { products } from "../data/products";
import ProductModal from "../components/ProductModal";
import AddToCartWishlistPopup from "../components/AddToCartWishlistPopup";
import Product from "../components/Product";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import "../index.css";
import {
  getAllProducts,
  getFilteredProducts,
  queryProducts,
} from "../api/product";
import { addItemToCart, getCart } from "../api/cart";
import { useCart } from "../hooks/useCart";
import ShopSkeleton from "../components/skeletons/ShopSkeleton";
import { toast } from "react-toastify";
import { useProducts } from "../hooks/useProducts";

function Shop() {
  const dispatch = useDispatch();
  const location = useLocation();

  const {products: productsState, totalCount, isLoading: loading, filters, loadMoreProducts} = useProducts();

  // const [loading, setLoading] = useState(false)
  // const [visibleCount, setVisibleCount] = useState(10);
  // const [totalCount, setTotalCount] = useState(0)
  // const [productsState, setProductsState] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });
  // const [filters, setFilters] = useState({
  //   category: "",
  //   subCategory: "",
  //   tag: "",
  //   priceRange: "",
  //   sortBy: "",
  // });

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const asyncfunc = async () => {
      if (query.trim() === "") {
        setSearchResults([]);
      } else {
        const filteredProducts = await queryProducts(query);
        console.log("filtered products are : ", filteredProducts);
        setSearchResults(filteredProducts);
      }
    };
    asyncfunc();
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => {
          const newIndex =
            prev === null || prev === searchResults.length - 1 ? 0 : prev + 1;
          scrollToActiveItem(newIndex);
          return newIndex;
        });
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => {
          const newIndex = prev === null || prev === 0 ? null : prev - 1;
          if (newIndex !== null) scrollToActiveItem(newIndex);
          return newIndex;
        });
      } else if (e.key === "Enter" && activeIndex !== null) {
        const selectedProduct = searchResults[activeIndex];
        if (selectedProduct) handleProductClick(selectedProduct.id);
      }
    };

    const scrollToActiveItem = (index) => {
      const activeItem = document.querySelector(`[data-index="${index}"]`);
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchResults, activeIndex]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setQuery("");
    setActiveIndex(null);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const highlightText = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="text-primary-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleAddToWishlist = (product) => {
    if (product && product.name) {
      dispatch({ type: "wishlist/addToWishlist", payload: product });
      setPopup({ show: true, type: "wishlist", itemName: product.name });
    }
  };

  const fetchMoreData = async () => {
    // const { category, tag, priceRange, sortBy } = filters;
    // if (!category && !tag && !priceRange && !sortBy) {
    //   const {products} = await getAllProducts(visibleCount, 10);
    //   setProductsState((pre) => pre.concat(products));
    //   setVisibleCount((prev) => prev + 10);
    //   return;
    // }
    
    // const {products: filteredProducts, totalCount} = await filterProducts(visibleCount, 10);
    // setProductsState((pre) =>
    //   pre.concat(filteredProducts)
    // );
    // setVisibleCount((prev) => prev + 10);
    // return;
    console.log("fetch more is called")
    dispatch(loadMoreProducts())
  };

  // INITIAL FETCH
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true)
  //     const {products, totalCount} = await getAllProducts(0, visibleCount);
  //     setProductsState((pre) => pre.concat(products));
  //     setTotalCount(totalCount)
  //     setLoading(false)
  //   };

  //   fetchProducts();
  // }, []);

  // const filterProducts = async (skip, limit = 10) => {
  //   const { category, subCategory, tag, priceRange, sortBy } = filters;
  //   const pRange = priceRange.split("-")

  //   const res = await getFilteredProducts(
  //     category,
  //     subCategory,
  //     tag,
  //     pRange[0] || '',
  //     pRange[1] || '',
  //     sortBy,
  //     skip,
  //     limit
  //   );

  //   if(res === 'ERROR'){
  //     toast.error("Filtered Not Applied");
  //     return;
  //   }

  //   const {products, totalCount} = res
  //   return {products, totalCount};
  // };

  if(loading){
    return <ShopSkeleton />
  }

  return (
    <div className="container mx-auto px-4 mt-16 relative font-serif">
      <div className="flex justify-between items-center py-2">
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-600 mb-6">
          Shop Our Collection
        </h1>
        {/* <div className="relative border border-red-400"> */}
        {showSearch && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => {
              setShowSearch(false);
              setQuery("");
            }}
          />
        )}
        {showSearch && (
          <SearchBar
            query={query}
            onChange={handleInputChange}
            inputRef={searchInputRef}
            className="flex items-center w-[50vw] my-4 shadow-2xl rounded-full overflow-hidden absolute top-10 left-[50%] -translate-x-[50%] z-20 min-w-[300px]"
          />
        )}
        {query && (
          <div className="absolute top-24 left-[50%] -translate-x-[50%] w-[50vw] mt-1 bg-white text-gray-700 shadow-lg rounded-xl overflow-auto no-scrollbar z-50 max-h-96 min-w-[300px]">
            {(searchResults && searchResults.length > 0) ? (
              searchResults.map((product, index) => (
                <div
                  key={product._id}
                  data-index={index}
                  className={`px-4 py-2 cursor-pointer flex items-center ${
                    activeIndex === index ? "bg-gray-300" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleProductClick(product._id)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded mr-4"
                  />
                  <div className="flex flex-col items-start">
                    <span>{highlightText(product.name)}</span>
                    <span className="text-xs">
                      Categories: {highlightText(product.category || "")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-500">No products found</p>
            )}
          </div>
        )}

        <div className="flex justify-between items-start gap-2 md:gap-4 pb-4">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center gap-2 rounded-xl md:rounded-md text-primary-600 hover:text-primary-600 cursor-pointer border border-primary-300 px-2 md:px-4 py-2 md:py-1"
          >
            <Search className="w-4 h-4" />{" "}
            <span className="hidden md:block">Search</span>
          </button>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 rounded-xl md:rounded-md text-primary-600 hover:text-primary-600 cursor-pointer border border-primary-300 px-2 md:px-4 py-2 md:py-1"
          >
            <SlidersHorizontal className="text-primary-600 w-4 h-4" />
            <span className="hidden md:block">Filter</span>
          </button>
        </div>
      </div>

      {/* Render the Filter component */}
      <Filter
        setShowFilter={setShowFilter}
        showFilter={showFilter}
      />

      <InfiniteScroll
        dataLength={productsState.length}
        next={fetchMoreData}
        hasMore={productsState.length < totalCount} 
        loader={<Loader />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 my-4 lg:my-6 font-sans">
          {productsState.map((product, idx) => (
            <Product
              key={idx}
              product={product}
              handleAddToWishlist={handleAddToWishlist}
              setModalProduct={setModalProduct}
              enableButtons={true}
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
