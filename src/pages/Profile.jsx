import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Search } from 'lucide-react';

function Profile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="font-serif text-3xl mb-8 text-center">Sign In</h1>
          <form className="space-y-6 max-w-lg mx-auto">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition duration-300 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition duration-300 ease-in-out"
              />
            </div>
            <button type="submit" className="w-full py-2 px-4 rounded-md bg-primary-600 text-white font-semibold hover:bg-primary-700 transition duration-200">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl mb-8">My Profile</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <label htmlFor="search" className="block text-sm font-medium text-gray-800">
            Search Profile
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Type to search..."
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition-all duration-300 ease-in-out"
            />
            <Search className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form className="space-y-6 max-w-lg mx-auto">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                readOnly
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition duration-300 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                readOnly
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 transition duration-300 ease-in-out"
              />
            </div>
          </form>
        </div>

        {/* Profile Actions */}
        <div className="space-y-4">
          <button className="w-full py-2 px-4 rounded-md bg-primary-600 text-white font-semibold hover:bg-primary-700 transition duration-200">
            Edit Profile
          </button>
          <button
            onClick={() => dispatch(logout())}
            className="w-full py-2 px-4 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
