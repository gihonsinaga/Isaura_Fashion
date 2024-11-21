import React, { useState } from "react";
import { Calendar } from "lucide-react";

export default function Report() {
  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("OCTOBER");
  const [selectedYear, setSelectedYear] = useState("2024");

  // Form state for Add Report
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    piece: "",
    color: "",
    price: "",
    totalPrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto calculate total price when piece or price changes
    if (name === "piece" || name === "price") {
      const piece = name === "piece" ? value : formData.piece;
      const price = name === "price" ? value : formData.price;
      if (piece && price) {
        const total = parseInt(piece) * parseInt(price);
        setFormData((prev) => ({
          ...prev,
          totalPrice: total.toString(),
        }));
      }
    }
  };

  const reportData = [
    {
      id_product: "BRKT12",
      productName: "Dress DNY",
      category: "Baju brokat",
      piece: 29,
      price: 385000,
      totalPrice: 11165000,
    },
    {
      id_product: "BRKT12",
      productName: "James Manis",
      category: "Baju brokat",
      piece: 24,
      price: 250000,
      totalPrice: 6000000,
    },
    {
      id_product: "BRKT12",
      productName: "James Katun",
      category: "Baju brokat",
      piece: 35,
      price: 195000,
      totalPrice: 6825000,
    },
    {
      id_product: "BRKT12",
      productName: "James Kancing",
      category: "Baju brokat",
      piece: 16,
      price: 210000,
      totalPrice: 3360000,
    },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 5 }, (_, i) => 2024 - 2 + i);

  const totalAmount = reportData.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const handleMonthYearSubmit = (e) => {
    e.preventDefault();
    setIsMonthModalOpen(false);
  };

  const handleAddReportSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsAddReportModalOpen(false);
    // Reset form
    setFormData({
      category: "",
      productName: "",
      piece: "",
      color: "",
      price: "",
      totalPrice: "",
    });
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-medium">REPORT</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsMonthModalOpen(true)}
            className="px-6 py-3 border rounded-lg text-sm bg-white flex items-center gap-2 hover:bg-gray-50"
          >
            <Calendar className="w-4 h-4" />
            Select Month
          </button>
          <button
            onClick={() => setIsAddReportModalOpen(true)}
            className="gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Add Report
          </button>
        </div>
      </div>

      {/* Report Header */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-5">
          <p>
            MONTHLY REPORT : {selectedMonth} {selectedYear}
          </p>
          <p>Print Date : 31 October 2024</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                piece
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reportData.map((item) => (
              <tr key={item.id_product} className="text-sm">
                <td className="px-6 py-4">{item.id_product}</td>
                <td className="px-6 py-4">{item.productName}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.piece}</td>
                <td className="px-6 py-4">Rp {item.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  Rp {item.totalPrice.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td
                colSpan="5"
                className="px-6 py-4 text-sm font-medium text-right"
              >
                Total =
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                Rp {totalAmount.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Print Button */}
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
          Print
        </button>
      </div>

      {/* Month Selection Modal */}
      {isMonthModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setIsMonthModalOpen(false)}
            />

            <div className="relative bg-white rounded-lg w-96 p-6">
              <h2 className="text-lg font-semibold mb-4">Select Period</h2>

              <form onSubmit={handleMonthYearSubmit} className="space-y-4">
                {/* Month Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm"
                  >
                    {months.map((month) => (
                      <option key={month} value={month.toUpperCase()}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsMonthModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Report Modal */}
      {isAddReportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setIsAddReportModalOpen(false)}
            />

            <div className="relative bg-white rounded-lg max-w-5xl w-full pt-14 px-12 pb-10">
              <h2 className="text-2xl font-semibold mb-10">October Report</h2>

              <form onSubmit={handleAddReportSubmit} className="">
                <div className="flex flex-col  gap-5">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium mb-1">
                      Id Product <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="color"
                      placeholder="Id Product"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs  border border-gray-500 text-gray-500 "
                      required
                    />
                  </div>

                  {/* Piece */}
                  <div className="flex justify-between">
                    <div className="flex w-1/2">
                      <label className="block text-sm font-medium mb-1">
                        Piece <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="flex w-1/2">
                      <input
                        type="number"
                        name="piece"
                        placeholder="Qty"
                        value={formData.piece}
                        onChange={handleInputChange}
                        className="w-2/3 rounded-lg py-3 pl-4 text-xs  border border-gray-500 text-gray-500 "
                        required
                      />

                      <div className="flex justify-end w-1/2">
                        <button
                          type="submit"
                          className="px-5 py-2 border border-red-500 bg-red-500 text-white hover:bg-red-600 rounded-lg text-sm mr-3"
                        >
                          Clear
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <span className="text-sm w-1/2 text-gray-500  py-3 ">
                      -
                    </span>
                  </div>

                  {/* Product Name */}
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium mb-1">
                      Product Name
                    </label>
                    <span className="text-sm w-1/2 text-gray-500  py-3 ">
                      -
                    </span>
                  </div>

                  {/* Size */}
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium mb-1">
                      Size
                    </label>
                    <span className="text-sm w-1/2 text-gray-500  py-3 ">
                      -
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <span className="text-sm w-1/2 text-gray-500  py-3  ">
                      Rp
                    </span>
                  </div>

                  {/* Total Price */}
                  <div className="flex justify-between mt-2">
                    <label className="block text-sm font-medium mb-1">
                      Total Price
                    </label>
                    <span className="text-sm w-1/2 text-gray-500">Rp</span>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddReportModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                  >
                    Add Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
