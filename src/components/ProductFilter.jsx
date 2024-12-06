import React, { useState, useEffect } from "react";
import { products } from "../data/products";

const ProductFilter = ({ products, setFilteredProducts }) => {
  const [sortBy, setSortBy] = useState("none");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Filter and sort products whenever filter state changes
    const filteredProducts = products.filter((product) => {
      const isPriceMatch =
        priceRange === "all" ||
        (priceRange === "under50" && product.price < 50) ||
        (priceRange === "50to100" && product.price >= 50 && product.price <= 100) ||
        (priceRange === "above100" && product.price > 100);

      const isColorMatch = selectedColor === "all" || product.color === selectedColor;

      const isTagMatch =
        selectedTags.length === 0 || selectedTags.every((tag) => product.tags.includes(tag));

      return isPriceMatch && isColorMatch && isTagMatch;
    });

    // Sort products by selected sort criteria
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === "priceLowToHigh") {
        return a.price - b.price;
      } else if (sortBy === "priceHighToLow") {
        return b.price - a.price;
      } else {
        return 0; // Default is no sorting
      }
    });

    // Update filtered products in the parent component
    setFilteredProducts(sortedProducts);

  }, [products, sortBy, priceRange, selectedColor, selectedTags, setFilteredProducts]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Filter Sections */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Sort By */}
        <div className="w-full sm:w-auto">
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="none">None</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="w-full sm:w-auto">
          <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            id="price-range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="under50">Under $50</option>
            <option value="50to100">$50 - $100</option>
            <option value="above100">Above $100</option>
          </select>
        </div>

        {/* Color */}
        <div className="w-full sm:w-auto">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            {/* Add more colors as needed */}
          </select>
        </div>

        {/* Tags */}
        <div className="w-full sm:w-auto">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <select
            id="tags"
            multiple
            value={selectedTags}
            onChange={(e) =>
              setSelectedTags(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="Handmade">Handmade</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Vintage">Vintage</option>
            {/* Add more tags as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
