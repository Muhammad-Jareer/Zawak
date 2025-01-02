import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Navigate } from 'react-router-dom';
import UserDetails from '../components/UserDetails';
import Cart from './Cart';
import Wishlist from './Wishlist';
import AccountSettings from '../components/AccountSettings';
import Orders from '../components/Orders';

function Profile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', formData);
    setEditMode(false);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center mb-8">
          <img
            src={user.profilePicture || 'default-avatar.png'}
            alt="Profile"
            className="w-24 h-24 sm:w-20 sm:h-20 rounded-full border border-gray-300"
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <h1 className="font-serif text-2xl sm:text-3xl">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="mt-4 sm:mt-0 sm:ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
          >
            Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-between text-sm sm:text-base sm:justify-start sm:gap-4 border-b mb-8">
          {['profile', 'orders', 'wishlist', 'cart', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`py-2 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'profile' && (
            <UserDetails
              formData={formData}
              handleInputChange={handleInputChange}
              editMode={editMode}
              handleSaveProfile={handleSaveProfile}
              setEditMode={setEditMode}
            />
          )}

          {activeTab === 'orders' && (
            <Orders orders={user.orders} />
          )}

          {activeTab === 'cart' && <Cart />}

          {activeTab === 'wishlist' && <Wishlist />}

          {activeTab === 'settings' && <AccountSettings user={user} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
