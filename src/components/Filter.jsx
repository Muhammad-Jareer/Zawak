import React from "react";
import { ChevronRight } from 'lucide-react';

const Filter = () => {
  const categories = [
    {
      name: "Home & Living",
      subCategories: [
        "Home Decor",
        "Aromatherapy",
        "Show Case"
      ]
    },
    {
      name: "Fashion",
      subCategories: [
        "Decoration",
        "Jewelry",
        "Clothes"
      ]
    },
    {
      name: "Cultural",
      subCategories: [
        "Beautiful",
        "Home Use"
      ]
    },
    {
      name: "Textile",
      subCategories: [
        "For Home",
        "Amazing"
      ]
    },
    {
      name: "Accessories",
      subCategories: [
        "Decoration",
        "Computer",
        "Kitchen"
      ]
    }
  ];
  
  const tags = [
    "featured",
    "best selling",
    "top rated"
  ]

  const priceRanges = [
    "$0 - $50",
    "$50 - $100",
    "$100 - $150",
    "$150 - $200+",
  ];

  const sortBy = ["Price: Low to High", "Price: High to Low", "Sort by Name: Alphabetical (A-Z)", "Sort by Name: Alphabetical (Z-A)"]

  return (
    <div className="p-6 flex justify-between bg-accent-warm-beige my-4">
      {/* Sort By Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-primary-600">Sort By</h3>
        <ul className="space-y-2">
          <li className="text-gray-600 hover:text-primary-600 hover:underline cursor-pointer">Default</li>
          {sortBy.map((sort) => (
            <li 
            key={sort}
            className="text-gray-600 hover:text-primary-600 hover:underline cursor-pointer">{sort}</li>
          ))}
        </ul>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-primary-600">Price</h3>
        <ul className="space-y-2">
          <li className="text-gray-600 hover:text-primary-600 hover:underline cursor-pointer">All</li>
          {priceRanges.map((ranges) => (
            <li
            key={ranges}
            className="text-gray-600 hover:text-primary-600 hover:underline cursor-pointer">{ranges}</li>
          ))}
        </ul>
      </div>

      {/* Categories Section */}
      <div className="mb-6 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-primary-600">Categories</h3>
        <ul className="grid grid-cols-1 gap-2">
          {categories.map((category) => (
            <li
              key={category.name}
              className="relative flex items-center gap-2 cursor-pointer group"
            >
              <div className="flex justify-between items-center w-full gap-4 text-gray-600 group hover:text-primary-600">
                <p className="hover:underline">{category.name}</p>
                <ChevronRight className="transform group-hover:rotate-90 transition-transform" />
              </div>

              {category.subCategories && (
                <div
                  className="absolute left-full top-0 w-48 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto"
                >
                  <ul className="bg-accent-warm-beige shadow-xl border border-gray-300 px-4 py-2 mx-3 space-y-2 text-justify">
                    {category.subCategories.map((subCategory, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 hover:text-primary-600 px-2 rounded-lg"
                      >
                        {subCategory}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>




      {/* Tags Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-primary-600">Tags</h3>
        <div className="grid grid-cols-2 gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm text-center border-2 border-gray-600 text-gray-600 rounded-full cursor-pointer hover:border-primary-600 hover:text-primary-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
