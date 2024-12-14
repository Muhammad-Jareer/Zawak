import React, { useState } from "react";
import { ChevronRight, X, ArrowDown } from 'lucide-react';
import clsx from "clsx";

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

const Filter = ({ showFilter, setShowFilter, filters, setFilters }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [tempFilters, setTempFilters] = useState({
    category: "",
    subCategory: "",
    tag: "",
    priceRange: "",
    sortBy: "",
  })

  const handleCategoryChange = (category, subCategory) => {
    // if already selected then unselect
    if(tempFilters.category === category && tempFilters.subCategory === subCategory){
      setTempFilters((prev) => ({...prev, category: "", subCategory: ""}))
      return
    }

    setTempFilters((prev) => ({ ...prev, category, subCategory }));
  };

  const handleTagChange = (tag) => {
    if(tempFilters.tag === tag){
      setTempFilters((prev) => ({...prev, tag: ""}))
      return
    }

    setTempFilters((prev) => ({ ...prev, tag }));
  };

  const handlePriceRangeChange = (range) => {
    if(tempFilters.priceRange === range){
      setTempFilters((prev) => ({...prev, priceRange : ""}))
      return
    }

    setTempFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const handleSortChange = (sort) => {
    if(tempFilters.sortBy === sort){
      setTempFilters((prev) => ({...prev, sortBy : ""}))
      return
    }

    setTempFilters((prev) => ({ ...prev, sortBy: sort }));
  };

  const handleToggleCategory = (categoryName) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const resetFilters = () => setFilters({
    category: "",
    subCategory: "",
    tag: "",
    priceRange: "",
    sortBy: "",
  })

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
          <h2 className="font-semibold flex-1 font-serif text-2xl text-primary-600">
            Filters
            <p className="text-sm text-gray-600 font-sans font-normal flex items-center gap-1">select and click on apply btn <ArrowDown size={15}/></p>
          </h2>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-gray-600 hover:text-primary-600"
          >
            <X />
          </button>
        </div>

        {/* Category Section */}
        <div className="my-8 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-primary-600">Categories <span className="text-gray-600 font-normal text-[12px] ml-2">{filters.category} - {filters.subCategory}</span></h3>
          <ul className="grid grid-cols-1 gap-2 pl-2">
            {categories.map((category) => (
              <li key={category.name} className="relative">
                <div
                  onClick={() => handleToggleCategory(category.name)}
                  className="flex justify-between items-center cursor-pointer text-gray-600 hover:text-primary-600"
                >
                  <p className={clsx("hover:underline", tempFilters.category === category.name && "text-primary-600")}>{category.name}</p>
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
                        onClick={() => {handleCategoryChange(category.name, subCategory); setExpandedCategory(null)}}
                        className={clsx("text-gray-600 hover:text-primary-600 cursor-pointer", tempFilters.subCategory === subCategory && tempFilters.category === category.name && "text-primary-600")}
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
                className={clsx("px-3 py-1 text-sm text-center border-2 border-gray-600 text-gray-600 rounded-full cursor-pointer hover:border-primary-600 hover:text-primary-600", tempFilters.tag === tag && "text-primary-600 border-primary-600")}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary-600">Price</h3>
          <ul className="space-y-2 pl-2">
            {priceRanges.map((range) => (
              <li
                key={range}
                onClick={() => handlePriceRangeChange(range)}
                className={clsx("text-gray-600 hover:text-primary-600 hover:underline cursor-pointer", tempFilters.priceRange === range && "text-primary-600")}
              >
                {range}
              </li>
            ))}
          </ul>
        </div>

        {/* Sort By Section */}
        <div className="my-8">
          <h3 className="text-lg font-semibold mb-2 text-primary-600">Sort By</h3>
          <ul className="space-y-2 pl-2">
            {sortBy.map((sort) => (
              <li
                key={sort}
                onClick={() => handleSortChange(sort)}
                className={clsx("text-gray-600 hover:text-primary-600 hover:underline cursor-pointer", tempFilters.sortBy === sort && "text-primary-600")}
              >
                {sort}
              </li>
            ))}
          </ul>
        </div>

        {/* btns */}
        <div className="mb-4 flex justify-end gap-4">
          <button className="btn btn-outline" onClick={resetFilters}>Reset</button>
          <button className="btn btn-primary" onClick={()=>{setFilters(tempFilters)}}>Apply</button>
        </div>
      </section>
    </>
  );
};

export default Filter;