import { useState } from "react";
import {Camera, Eye, EyeOff, User, Mail, Lock, Phone, Save, X, Edit, } from "lucide-react";

export function ProfilePage() {
  const [profileData, setProfileData] = useState({
    userName: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    phoneNo: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempData, setTempData] = useState({ ...profileData });

  const handleEditMode = () => {
    setIsEditMode(true);
    setTempData({ ...profileData });
  };

  const handleSaveChanges = () => {
    setProfileData({ ...tempData });
    setIsEditMode(false);
    alert("All changes saved successfully!");
  };

  const handleCancelEdit = () => {
    setTempData({ ...profileData });
    setIsEditMode(false);
    setIsEditingAvatar(false);
  };

  const handleChange = (field: any, value: Date) => {
    setTempData({ ...tempData, [field]: value });
  };

  const handleAvatarEdit = () => {
    if (isEditMode) {
      setIsEditingAvatar(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <p className="mt-1 text-sm text-purple-100">
              Manage your account information
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Avatar Section */}
              <div className="md:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
                      <img
                        src={isEditMode ? tempData.avatar : profileData.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={handleAvatarEdit}
                      className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg transition-colors ${
                        isEditMode
                          ? "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!isEditMode}
                    >
                      <Camera size={16} />
                    </button>
                  </div>

                  {isEditingAvatar && (
                    <div className="mt-4 w-full">
                      <div className="flex flex-col space-y-2">
                        <input
                          type="text"
                          value={tempData.avatar}
                          onChange={(e) =>
                            handleChange("avatar", e.target.value)
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
                          placeholder="Enter image URL"
                        />
                        <button
                          onClick={() => setIsEditingAvatar(false)}
                          className="inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <X size={16} className="mr-2" /> Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Information */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  {/* Username */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-2">
                      <User size={18} className="mr-2" />
                      <span className="text-sm font-medium">Username</span>
                    </div>
                    {!isEditMode ? (
                      <p className="text-gray-900 font-medium">
                        {profileData.userName}
                      </p>
                    ) : (
                      <input
                        type="text"
                        value={tempData.userName}
                        onChange={(e) =>
                          handleChange("userName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    )}
                  </div>

                  {/* Email */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-2">
                      <Mail size={18} className="mr-2" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    {!isEditMode ? (
                      <p className="text-gray-900 font-medium">
                        {profileData.email}
                      </p>
                    ) : (
                      <input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    )}
                  </div>

                  {/* Password */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-2">
                      <Lock size={18} className="mr-2" />
                      <span className="text-sm font-medium">Password</span>
                    </div>
                    {!isEditMode ? (
                      <p className="text-gray-900 font-medium">
                        {showPassword ? profileData.password : "••••••••"}
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </p>
                    ) : (
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={tempData.password}
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-2">
                      <Phone size={18} className="mr-2" />
                      <span className="text-sm font-medium">Phone Number</span>
                    </div>
                    {!isEditMode ? (
                      <p className="text-gray-900 font-medium">
                        {profileData.phoneNo}
                      </p>
                    ) : (
                      <input
                        type="tel"
                        value={tempData.phoneNo}
                        onChange={(e) =>
                          handleChange("phoneNo", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-4 bg-gray-50 sm:px-6 flex justify-end space-x-3">
            {!isEditMode ? (
              <button
                type="button"
                onClick={handleEditMode}
                className="inline-flex items-center justify-center w-full mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Edit size={16} className="mr-2" /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <X size={16} className="mr-2" /> Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Save size={16} className="mr-2" /> Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
