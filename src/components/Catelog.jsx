import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductModal from "../components/ProductModal";
import AddToCartWishlistPopup from "../components/AddToCartWishlistPopup";
import Product from './Product';
import { useDispatch } from 'react-redux';
import { ArrowLeft } from 'lucide-react';

function Catelog() {
    const { category } = useParams(); // Get category from URL
    const categoryNames = [...new Set(products.filter(prod => prod.category).map(prod => prod.category))];

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [modalProduct, setModalProduct] = useState(null);
    const [popup, setPopup] = useState({ show: false, type: "", itemName: "" });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);
    
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


    if (category) {
        // Display products for a specific category
        const filteredProducts = products.filter(prod => prod.category === category);

        if (filteredProducts.length === 0) {
            return (
                <div className="my-16 text-center">
                    <h1 className="text-xl font-bold text-red-600">No products found for category: {category}</h1>
                </div>
            );
        }

        return (
            <div className="my-16 font-serif">
                <button
                    onClick={() => navigate('/categories')}
                    className="text-gray-600 hover:text-primary-600 inline-flex items-center"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>
                <h1 className="text-xl md:text-3xl font-bold mt-4 text-primary-600">{category}</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 my-4 lg:my-6  font-sans">
                    {filteredProducts.map((product) => (
                        <div key={product.id}>
                            <Product
                                key={product.id}
                                product={product}
                                handleAddToCart={handleAddToCart}
                                handleAddToWishlist={handleAddToWishlist}
                                setModalProduct={setModalProduct}
                                enableButtons={true}
                            />
                        </div>
                    ))}
                </div>

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

    // Display all categories
    return (
        <div className="my-16 font-serif">
            <h1 className="text-xl md:text-3xl font-bold mt-8 text-primary-600">Explore Our Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
                {categoryNames.map((categoryName, idx) => (
                    <div key={idx} className="bg-white shadow-lg p-4 flex flex-col">
                        <h2 className="text-lg font-bold mb-4 text-primary-600">{categoryName}</h2>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {products
                                .filter(prod => prod.category === categoryName)
                                .slice(0, 6) // Limit to 6 products
                                .map((product) => (
                                    <div key={product.id} className="text-center">
                                        <Link to={`/product/${product.id}`}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-24 object-cover mb-2"
                                            />
                                        </Link>
                                        <p className="text-xs text-gray-600">{product.sub_category || 'N/A'}</p>
                                    </div>
                                ))}
                        </div>
                        <Link
                            to={`/shop/category/${categoryName}`}
                            className="text-blue-500 text-sm mt-auto"
                        >
                            See more
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catelog;
