import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ query, onChange, inputRef, className }) {
    return (
        <div className={className}>
            <input
                type="text"
                value={query}
                onChange={onChange}
                ref={inputRef}
                placeholder="Search for products..."
                className="w-full py-2 pl-5 pr-12 text-gray-700 placeholder:text-xs sm:placeholder:text-base md:placeholder:text-md focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <button
                onClick={() => onChange(query)}
                className="absolute right-3 p-2 text-primary-600 hover:text-primary-700 focus:outline-none"
            >
                <Search className="w-6 h-6" />
            </button>
        </div>
    );
}

export default SearchBar;
