import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Users, ShoppingBag, MapPin } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // useAuth hook will handle redirect
  }

  // Sample data for revenue chart
  const revenueData = [
    { month: "Jan", current: 80, previous: 65 },
    { month: "Feb", current: 70, previous: 50 },
    { month: "Mar", current: 60, previous: 45 },
    { month: "Apr", current: 50, previous: 40 },
    { month: "May", current: 75, previous: 55 },
    { month: "Jun", current: 65, previous: 48 },
    { month: "Jul", current: 55, previous: 42 },
  ];

  // Sample data for referral sources
  const referralData = [
    { source: "Social Media", percentage: 64 },
    { source: "Marketplaces", percentage: 40 },
    { source: "Websites", percentage: 50 },
    { source: "Digital Ads", percentage: 80 },
    { source: "Others", percentage: 15 },
  ];

  // Sample data for latest sales
  const latestSales = [
    { name: "Ellen Lutut", type: "Dress GJ", price: 50000 },
    { name: "Classic Dress", type: "Mini Songket", price: 420000 },
    { name: "Pink Boutique", type: "Dress", price: 480000 },
    { name: "Balero", type: "Dress", price: 635 },
  ];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Products for Sale</p>
              <p className="text-2xl font-semibold mt-1">684</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Products for Rent</p>
              <p className="text-2xl font-semibold mt-1">546</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Customer</p>
              <p className="text-2xl font-semibold mt-1">5,732</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total City</p>
              <p className="text-2xl font-semibold mt-1">90</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">Total Revenue</h3>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold">Rp 236.535</p>
                <span className="text-sm text-green-500">+0.8%</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="current" fill="#4F46E5" />
                <Bar dataKey="previous" fill="#E5E7EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-4">Product Referrals</h3>
          <div className="space-y-4">
            {referralData.map((item) => (
              <div key={item.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.source}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Sales */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Latest Sales</h3>
        </div>
        <div className="space-y-4">
          {latestSales.map((sale, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/api/placeholder/40/40"
                  alt={sale.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{sale.name}</p>
                  <p className="text-sm text-gray-500">{sale.type}</p>
                </div>
              </div>
              <p className="font-medium">
                Rp {sale.price.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
