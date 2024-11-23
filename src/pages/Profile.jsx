import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  // Pindahkan semua hooks ke bagian atas component
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState("");
  const [profileData, setProfileData] = useState({});
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data profil
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/profiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfileData(response.data);
      setEditData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // Effect untuk mengambil data profil
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/profiles",
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setProfileData(editData);
        setIsEditing(false);
        setNotification("Profile updated successfully!");
        setTimeout(() => setNotification(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setNotification("Failed to update profile");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Render component
  return (
    <div className="flex flex-col">
      {notification && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">
          {notification}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-8 w-[700px] mx-auto mt-10">
        <div className="flex  justify-between mb-8 ">
          {/* <h1 className="text-2xl font-semibold">My Profile</h1> */}
          <div className="flex gap-x-2">
            {/* <h2 className="text-base py-2 font-medium">
              {profileData?.username}
            </h2> */}
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded text-sm font-semibold">
              Administrator
            </span>
          </div>
          <div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-y-10 text-sm text-gray-500">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            {/* <div className="relative">
              <img
                src={profileData?.avatar || "/api/placeholder/128/128"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-slate-900"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                  <Camera className="w-4 h-4 text-white" />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              )}
            </div> */}
          </div>

          {/* Profile Details Section */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editData?.username || ""}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-lg"
                    />
                  ) : (
                    <span>{profileData?.username}</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData?.email || ""}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-lg"
                      disabled
                    />
                  ) : (
                    <span>{profileData?.email}</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData?.phone || ""}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-lg"
                    />
                  ) : (
                    <span>{profileData?.phone}</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editData?.address || ""}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-lg"
                      rows="2"
                    />
                  ) : (
                    <span>{profileData?.address}</span>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
