const UserDetails = ({ formData, handleInputChange, editMode, handleSaveProfile, setEditMode }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[400px] overflow-y-auto">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={!editMode}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={!editMode}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500"
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
            value={formData.email}
            onChange={handleInputChange}
            disabled={!editMode}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!editMode}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {editMode ? (
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
};

export default UserDetails;
