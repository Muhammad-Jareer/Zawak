import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import AccountSettings from "../components/AccountSettings";
import Orders from "../components/Orders";
import { useAuth } from "../hooks/useAuth";
import { api_logout } from "../api/auth";
import { Loader2 } from "lucide-react";

function Profile() {
  const dispatch = useDispatch();
  const [user, isAuthenticated, loading] = useAuth("profile");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email,
        phone: user.phone,
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
    console.log("Profile saved:", formData);
    setEditMode(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    const res = await api_logout();
    if (!res) return;
    localStorage.removeItem("accessToken");
    dispatch(logout());
    setLoggingOut(false);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 min-h-screen w-full flex items-center justify-center gap-4 -translate-y-24">
        <Loader />
        <h2 className="text-3xl text-primary-700 font-bold">
          ZAWAK IS LOADING
        </h2>
      </div>
    );
  }

  return (
    <>
      {!loading && isAuthenticated && (
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center mb-8">
              <img
                src={user?.profilePicture || "/favicon.png"}
                alt="Profile"
                className="w-24 h-24 sm:w-20 sm:h-20 rounded-full border border-gray-300"
              />
              <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                <h1 className="font-serif text-2xl sm:text-3xl">
                  {user?.name}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 sm:mt-0 sm:ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 flex gap-2"
              >
                {loggingOut && <Loader2 className="animate-spin" />} Sign Out
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-between text-sm sm:text-base sm:justify-start sm:gap-4 border-b mb-8">
              {["profile", "orders", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`py-2 font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-primary-600 text-primary-600"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === "profile" && (
                <UserDetails
                  formData={formData}
                  handleInputChange={handleInputChange}
                  editMode={editMode}
                  handleSaveProfile={handleSaveProfile}
                  setEditMode={setEditMode}
                />
              )}

              {activeTab === "orders" && <Orders orders={user.orders} />}

              {activeTab === "settings" && <AccountSettings user={user} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
