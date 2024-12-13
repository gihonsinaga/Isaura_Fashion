import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, ChartPie, Box } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export default function Dashboard() {
  const { isLoading, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [reports, setReports] = useState([]);
  // console.log("reports", reports);
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, reportsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/reports/all"),
        ]);

        setProducts(productsRes.data);
        setReports(reportsRes.data);

        const categoryCount = productsRes.data.reduce((acc, product) => {
          const category = product.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        setCategoryStats(categoryCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Calculate revenue data and get top 12 revenue months (without chronological sorting)
  const revenueData = reports.reduce((acc, report) => {
    const date = new Date(report.created_at);
    const monthYear = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const revenue = parseInt(report.total_price);

    const existingMonth = acc.find((item) => item.monthYear === monthYear);
    if (existingMonth) {
      existingMonth.revenue += revenue;
    } else {
      acc.push({
        monthYear,
        revenue,
        toolTip: `${monthYear}\nRevenue: Rp ${revenue.toLocaleString("id-ID")}`,
      });
    }
    return acc;
  }, []);

  // Sort revenue data by revenue amount (descending) and take top 12
  const top12Revenue = revenueData
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 12);

  // Format number for Y-axis
  const formatYAxis = (value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-medium">{label}</p>
          <p className="text-indigo-600">
            Revenue: Rp {payload[0].value.toLocaleString("id-ID")}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Products Card */}
        <div className="bg-gradient-to-r from-[#475BE8] to-[#82c2f6] px-8 py-10 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Product</p>
              <p className="text-lg text-white font-semibold">
                {products.length}
              </p>
            </div>
            {/* <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
              <Box className="w-6 h-6 text-[#475BE8]" />
            </div> */}
          </div>
        </div>
        {/* Total Pieces Card */}
        <div className="bg-gradient-to-r from-[#429e90] to-[#83f6e5] px-8  py-10 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Pieces</p>
              <p className="text-lg text-white font-semibold ">
                {products.reduce(
                  (sum, product) => sum + (parseInt(product.piece) || 0),
                  0
                )}
              </p>
            </div>
            {/* <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <ChartPie className="w-6 h-6 text-pink-600" />
            </div> */}
          </div>
        </div>
        {/* Total Value Card */}
        <div className="bg-gradient-to-r  from-[#b04858] to-[#f5788b]  px-8  py-10 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Stock Value</p>
              <p className="text-lg text-white font-semibold ">
                Rp{" "}
                {products
                  .reduce(
                    (sum, product) =>
                      sum + parseInt(product.price) * parseInt(product.piece),
                    0
                  )
                  .toLocaleString("id-ID")}
              </p>
            </div>
            {/* <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div> */}
          </div>
        </div>
        <div className="bg-gradient-to-r  from-[#b08143] to-[#e3b578] px-8 py-10 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Sales</p>
              <p className="text-lg text-white font-semibold">
                Rp{" "}
                {reports
                  .reduce(
                    (sum, report) => sum + parseInt(report.total_price),
                    0
                  )
                  .toLocaleString("id-ID")}
              </p>
            </div>
            {/* <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-10 rounded-lg shadow h-[500px]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-2xl tracking-Normal">
              Top Monthly Sales
            </h3>
            <div className="border-b w-full mt-5 mb-5"></div>

            <div className="flex items-center gap-2"></div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={top12Revenue}
              margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="monthYear"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis tickFormatter={formatYAxis} width={60} fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#4F46E5" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Stats Cards */}
      <div className="bg-white p-10 rounded-lg shadow">
        <h3 className="font-semibold text-2xl tracking-normal">
          Products by Category
        </h3>
        <div className="border-b w-full mt-5 mb-5"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(categoryStats).map(([category, count]) => (
            <div key={category} className="bg-[#475BE8] py-7 px-7 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm">{category}</p>
                  <p className="text-xl text-white font-semibold mt-1">
                    {count} <span className="text-xs">type</span>
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Box className="w-5 h-5 text-[#475BE8]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Sales */}
      <div className="bg-white rounded-lg shadow p-10">
        <div className="flex justify-between items-center ">
          <h1 className="font-semibold text-2xl tracking-Normal">
            Products Last Sales
          </h1>
        </div>
        <div className="border-b w-full  mt-5 mb-5"></div>
        <div className="space-y-4  ">
          {reports?.slice(1, 11).map((sale, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium  text-base">
                    {sale?.product_name}
                    <span className="text-gray-600 font-normal text-sm">
                      {" "}
                      - {sale?.piece} pieces{" "}
                    </span>
                  </p>
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500 font-medium">
                      {sale?.category}
                    </p>
                    {/* <p className="text-xs text-gray-400">
                      {formatDate(sale?.created_at)}
                    </p> */}
                  </div>
                </div>
              </div>
              <p className="font-medium text-[#475BE8] text-sm">
                Rp {parseInt(sale?.total_price)?.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
