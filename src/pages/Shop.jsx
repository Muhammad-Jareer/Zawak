import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import ProductModal from "../components/ProductModal";
import AddToCartWishlistPopup from "../components/AddToCartWishlistPopup";
import Product from "../components/Product";
import InfiniteScroll from "react-infinite-scroll-component";
import { FAST_SPINNER } from '../components/Logos'

function Shop() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [visibleCount, setVisibleCount] = useState(8);
  const [modalProduct, setModalProduct] = useState(null);
  const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });
  const [dataSource, setDataSource] = useState(products.slice(0, visibleCount))

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

  const fetchMoreData = () => {
    //MAKING THE API CALL HERE
    setTimeout(()=>{
      setDataSource(dataSource.concat(products.slice(visibleCount, visibleCount + 8)))
      setVisibleCount(pre => pre + 8)
    }, 2000);
  }

  return (
    <div className="container mx-auto px-4 mt-16">
      <h1 className="font-serif text-4xl text-primary-600 mb-6">
        Shop Our Collection
      </h1>

        <InfiniteScroll
          dataLength={dataSource.length}
          next={fetchMoreData}
          hasMore={(visibleCount < products.length)}
          loader={<Loader />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dataSource.map((product) => (
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

const Loader = () => {
  return (
    <div className="mt-20 flex items-center justify-center">
      <FAST_SPINNER />
    </div>
  )
}