import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  UserCircle,
  LogOut,
  UserRound,
} from "lucide-react";
import axios from "axios";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Product", icon: Package, path: "/product" },
  { name: "Report", icon: FileText, path: "/report" },
  { name: "My Profile", icon: UserCircle, path: "/profile" },
];

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({});

  // Fungsi untuk mengambil data profil
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log("tokenNav", token);
      if (!token) {
        navigate("/");
      }

      const response = await axios.get("http://localhost:5000/api/profiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfileData(response?.data);
      // console.log("profileDataNav", profileData);
    } catch (err) {
      console.error(err);
    }
  };

  // Effect untuk mengambil data profil
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    navigate("/"); // Arahkan ke halaman login
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
          <div className="p-1 rounded ">
            <div className="w-6 h-6 ">
              <img src="/assets/Logo.png" alt="" />
            </div>
          </div>
          <span className="text-xl font-semibold tracking-wide ">Isaura</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation?.map((item) => (
            <NavLink
              key={item?.name}
              to={item?.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-4 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-[#475BE8] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item?.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex  justify-end items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-base font-medium tracking-wide italic">
              {profileData?.username}
            </span>

            {/* <img
              src="/api/placeholder/32/32"
              alt=""
              className="w-8 h-8 rounded-full"
            /> */}
            {/* <div className="font-medium text-gray-500 w-6 h-6">
              <UserCircle />
            </div> */}
          </div>
        </div>
        <div className=" border-b w-full"></div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
