import React, { useState } from "react";
import { ChevronRight, X } from 'lucide-react';

const categories = [
  {
    name: "Home & Living",
    subCategories: ["Home Decor", "Aromatherapy", "Show Case"]
  },
  {
    name: "Fashion",
    subCategories: ["Decoration", "Jewelry", "Clothes"]
  },
  {
    name: "Cultural",
    subCategories: ["Beautiful", "Home Use"]
  },
  {
    name: "Textile",
    subCategories: ["For Home", "Amazing"]
  },
  {
    name: "Accessories",
    subCategories: ["Decoration", "Computer", "Kitchen"]
  }
];

const tags = ["featured", "best selling", "top rated"];

const priceRanges = ["$0 - $50", "$50 - $100", "$100 - $150", "$150 - $200+"];

const sortBy = ["Price: Low to High", "Price: High to Low", "Alphabetical (A-Z)", "Alphabetical (Z-A)"];

const Filter = ({ showFilter, setShowFilter, setFilters }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Handle Category Change
  const handleCategoryChange = (category, subCategory) => {
    setFilters((prev) => ({ ...prev, category, subCategory }));
    setShowFilter(false);
  };

  // Handle Tag Selection
  const handleTagChange = (tag) => {
    setFilters((prev) => ({ ...prev, tag }));
    setShowFilter(false);
  };

  // Handle Price Range Selection
  const handlePriceRangeChange = (range) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
    setShowFilter(false);
  };

  // Handle Sorting Selection
  const handleSortChange = (sort) => {
    setFilters((prev) => ({ ...prev, sortBy: sort }));
    setShowFilter(false);
  };

  const handleToggleCategory = (categoryName) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <>
      {showFilter && (
        <div
          aria-hidden
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setShowFilter((prev) => !prev)}
        />
      )}

      <section
        className={`fixed overflow-y-scroll no-scrollbar overflow-x-hidden z-20 inset-y-0 right-0 w-72 md:w-80 bg-white border-l border-indigo-100 transform transition-transform duration-300 ease-in-out px-4 bg-gradient-to-b from-accent-warm-beige to-white shadow-md bg-opacity-70 ${
          showFilter ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-24 flex">
          <h2 className="font-semibold flex-1 font-serif text-2xl text-primary-600">Filters</h2>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-gray-600 hover:text-primary-600"
          >
            <X />
          </button>
        </div>

        {/* Category Section */}
        <div className="my-8 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-primary-600">Categories</h3>
          <ul className="grid grid-cols-1 gap-2 pl-2">
            {categories.map((category) => (
              <li key={category.name} className="relative">
                <div
                  onClick={() => handleToggleCategory(category.name)}
                  className="flex justify-between items-center cursor-pointer text-gray-600 hover:text-primary-600"
                >
                  <p className="hover:underline">{category.name}</p>
                  <ChevronRight
                    className={`transform transition-transform ${
                      expandedCategory === category.name ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {expandedCategory === category.name && (
                  <ul className="mt-2 pl-4 space-y-1">
                    {category.subCategories.map((subCategory, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleCategoryChange(category.name, subCategory)}
                        className="text-gray-600 hover:text-primary-600 cursor-pointer"
                      >
                        {subCategory}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Tags Section */}
        <div className="my-8">
          <h3 className="text-lg font-semibold mb-2 text-primary-600">Tags</h3>
          <div className="grid grid-cols-2 gap-3 pl-2">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => handleTagChange(tag)}
                className="px-3 py-1 text-sm text-center border-2 border-gray-600 text-gray-600 rounded-full cursor-pointer hover:border-primary-600 hover:text-primary-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sort By Section */}
        <div className="my-8">
          <h3 className="text-lg font-semibold mb-2 text-primary-600">Sort By</h3>
          <ul className="space-y-2 pl-2">
            <li className="text-gray-600 hover:text-primary-600 hover:underline cursor-pointer">Default</li>
            {sortBy.map((sort) => (
              <li
                key={sort}
                onClick={() => handleSortChange(sort)}
                className="text-gray-600 hover:text-primary-600 hover:underline cursor-pointer"
              >
                {sort}
              </li>
            ))}
          </ul>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary-600">Price</h3>
          <ul className="space-y-2 pl-2">
            <li className="text-gray-600 hover:text-primary-600 hover:underline cursor-pointer">All</li>
            {priceRanges.map((range) => (
              <li
                key={range}
                onClick={() => handlePriceRangeChange(range)}
                className="text-gray-600 hover:text-primary-600 hover:underline cursor-pointer"
              >
                {range}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Filter;