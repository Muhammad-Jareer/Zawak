import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="mt-1 block w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-transparent focus:border-primary-500"
        required
        aria-label="Search"
      />
      <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600">
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}

export default SearchBar;
