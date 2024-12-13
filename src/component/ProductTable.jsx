import React, { useState, useMemo } from "react";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [categoryFilter, setCategoryFilter] = useState("");

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  // Get unique categories
  const categories = useMemo(() => {
    const unique = new Set(products?.map((product) => product?.category));
    return [...unique];
  }, [products]);

  // Sorting function
  const sortedProducts = useMemo(() => {
    let sortableItems = [...products];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

  // Filter and search function
  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) => {
      const matchesSearch = Object.values(product).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory =
        !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [sortedProducts, searchTerm, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Sorting handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="py-6 px-7 flex justify-between items-center">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product"
            className="py-3 px-4 border rounded w-64 text-sm border-gray-300 "
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-2 px-3  text-sm text-gray-800"
          >
            <option value="" className="">
              All Categories
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="p-2 rounded-md text-sm"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full">
        <thead className="bg-[#475BE8]">
          <tr>
            <th
              onClick={() => requestSort("id")}
              className="px-6 py-6 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
            >
              ID Product <span className="ml-2">⇅</span>
            </th>
            <th
              onClick={() => requestSort("product_name")}
              className="px-6 py-6 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
            >
              Product Name <span className="ml-2">⇅</span>
            </th>
            <th
              onClick={() => requestSort("category")}
              className="px-6 py-6 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
            >
              Category <span className="ml-2">⇅</span>
            </th>
            <th
              onClick={() => requestSort("price")}
              className="px-6 py-6 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
            >
              Price <span className="ml-2">⇅</span>
            </th>
            <th
              onClick={() => requestSort("piece")}
              className="px-6 py-6 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
            >
              Piece <span className="ml-2">⇅</span>
            </th>
            <th
              onClick={() => requestSort("size")}
              className="px-6 py-6 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
            >
              Size <span className="ml-2">⇅</span>
            </th>
            <th className="px-6 py-6 text-left text-xs font-medium text-white uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-sm">
          {currentProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-6 whitespace-nowrap">
                ISR - {product.id}
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                {truncateText(product.product_name, 30)}
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-6 whitespace-nowrap">
                {formatCurrency(product.price)}
              </td>
              <td className="px-6 py-6 whitespace-nowrap">{product.piece}</td>
              <td className="px-6 py-6 whitespace-nowrap">{product.size}</td>
              <td className="px-6 py-6 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredProducts.length)} of{" "}
          {filteredProducts.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            {"<<"}
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
