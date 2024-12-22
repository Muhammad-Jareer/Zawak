import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronRight } from 'lucide-react';
import Product from '../components/Product.jsx';
import { products } from '../data/products';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedProducts = ({}) => {
    const dispatch = useDispatch();
    const [swiper, setSwiper] = useState()
    const [featuredProducts, setFeaturedProducts] = useState(products.filter((prod) => prod.featured))
    const getSlidesPerView = () => {
        if (window.innerWidth >= 1024) return 5;
        if (window.innerWidth >= 768) return 4;
        if (window.innerWidth >= 425) return 3;
        return 2; // For screens up to 425px
      };
    
    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);

    useEffect(() => {
        const handleResize = () => {
            setSlidesPerView(getSlidesPerView());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
        

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
        


  return (
    <div className="relative">
    <h1 className='text-xl md:text-3xl font-bold mt-8 text-primary-600'>Featured Products</h1>
        <section className="px-6 lg:px-16">
        <Swiper
        spaceBetween={10}
        slidesPerView={slidesPerView}
        slidesPerGroup={2}
        onSwiper={(swiper) => setSwiper(swiper)}
        className="my-8"
        >
            {featuredProducts.map((product) => (
                <SwiperSlide key={product.id} className="my-3">
                    <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleAddToWishlist={handleAddToWishlist}
                    enableButtons={false}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
            <button
                type="button"
                aria-label="Previous Slide"
                className="flex absolute top-[35%] -left-0 lg:left-10 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-white/50 rounded-full group focus:outline-none"
                onClick={()=> swiper.slidePrev()}
            >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 rotate-180" />
            </button>
            <button
                type="button"
                aria-label="Next Slide"
                className="flex absolute top-[35%] -right-0 lg:right-10 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-white/50 rounded-full group focus:outline-none"
                onClick={()=> swiper.slideNext()}
            >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
            </button>
            <div className="text-center mt-12">
                <Link to="/shop" className="btn btn-primary md:text-md px-6 py-3 text-sm">
                View All Products
                </Link>
            </div>
        </section>
    </div>
  );
};

export default FeaturedProducts;