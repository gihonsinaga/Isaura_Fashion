import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  UserCircle,
  LogOut,
  UserRound,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Product", icon: Package, path: "/product" },
  { name: "Report", icon: FileText, path: "/report" },
  { name: "My Profile", icon: UserCircle, path: "/profile" },
];

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

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
          <span className="text-xl font-medium">Isaura</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
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
              {item.name}
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
        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center gap-3">
            <span className="text-base font-medium">ISAURA ADMIN</span>
            {/* <img
              src="/api/placeholder/32/32"
              alt=""
              className="w-8 h-8 rounded-full"
            /> */}
            <UserRound />
          </div>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
