import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ query, onChange, inputRef }) {
    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            onChange(event.target.value); // Handle search on enter
        }
    };

    return (
        <div className="relative flex items-center max-w-xl my-4 w-full shadow-lg rounded-full overflow-hidden">
            <input
                type="text"
                value={query} // Make sure query is linked to state in parent
                onChange={onChange} // Use the onChange from parent to update state
                onKeyDown={handleSearch}
                ref={inputRef} // For focusing the input element
                placeholder="Search for products..." // Add a placeholder or use prop
                className="w-full py-2 pl-5 pr-12 text-gray-700 placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <button
                onClick={() => onChange(query)} // On button click, use query value
                className="absolute right-3 p-2 text-primary-600 hover:text-primary-700 focus:outline-none"
            >
                <Search className="w-6 h-6" />
            </button>
        </div>
    );
}

export default SearchBar;
