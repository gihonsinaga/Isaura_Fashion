import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState("");
  const [profileData, setProfileData] = useState({
    name: "Isaura Admin",
    email: "admin@isaura.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    avatar: "/api/placeholder/100/100",
  });

  const [editData, setEditData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData(editData);
    setIsEditing(false);
    setNotification("Profile updated successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {notification && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">
          {notification}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-8 ">
        <div className="flex items-center justify-between mb-8 ml-10">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 ml-10">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt=""
                className="w-32 h-32 rounded-full object-cover border border-slate-900"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                  <Camera className="w-4 h-4 text-white" />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              )}
            </div>
            <h2 className="text-xl font-medium">{profileData.name}</h2>
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Administrator
            </span>
          </div>

          {/* Profile Details Section */}
          <div className="flex-1 ml-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-lg"
                    />
                  ) : (
                    <span>{profileData.name}</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-lg"
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-lg"
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editData.address}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-lg"
                      rows="2"
                    />
                  ) : (
                    <span>{profileData.address}</span>
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
