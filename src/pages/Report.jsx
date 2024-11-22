// import React, { useEffect, useState } from "react";
// import { Calendar } from "lucide-react";
// import axios from "axios";
// import Select from "react-select"; // Import react-select

// export default function Report() {
//   const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
//   const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState("OCTOBER");
//   const [selectedYear, setSelectedYear] = useState("2024");
//   const [products, setProducts] = useState([]); // Data produk

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products");
//         if (response.status === 200) {
//           setProducts(response.data); // Set data produk ke state
//         } else {
//           console.error("Error fetching products:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Form state for Add Report
//   const [formData, setFormData] = useState({
//     product_id: "",
//     piece: "",
//     month: "",
//     year: "",
//   });
//   console.log("formData", formData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle perubahan pada Select (dropdown)
//   const handleProductSelectChange = (selectedOption) => {
//     setFormData((prev) => ({
//       ...prev,
//       product_id: selectedOption ? selectedOption.value : "",
//     }));
//   };

//   // Map data produk menjadi format yang sesuai untuk react-select
//   const productOptions = products.map((product) => ({
//     value: product.id, // Value yang dipilih
//     label: `ISR-${product.id} - ${product.product_name}`, // Label yang ditampilkan
//   }));
//   // console.log("productOptions", productOptions?.value);

//   // Handle perubahan bulan dan tahun (dropdown)
//   const handleMonthChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       month: parseInt(e.target.value), // Menyimpan bulan dalam angka
//     }));
//   };

//   const handleYearChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       year: parseInt(e.target.value), // Menyimpan tahun dalam angka
//     }));
//   };

//   // Daftar bulan pada add report
//   const months = [
//     { value: 1, label: "January" },
//     { value: 2, label: "February" },
//     { value: 3, label: "March" },
//     { value: 4, label: "April" },
//     { value: 5, label: "May" },
//     { value: 6, label: "June" },
//     { value: 7, label: "July" },
//     { value: 8, label: "August" },
//     { value: 9, label: "September" },
//     { value: 10, label: "October" },
//     { value: 11, label: "November" },
//     { value: 12, label: "December" },
//   ];

//   // Daftar tahun pada add report
//   const years = [];
//   for (let i = 2020; i <= 2050; i++) {
//     years.push({ value: i, label: i.toString() });
//   }

//   //------------------------------------------------------------------

//   const [reportData, setReportData] = useState([]);
//   console.log("reportData", reportData);
//   const [selectedMonthBase, setSelectedMonthBase] = useState(10);
//   const [selectedYearBase, setSelectedYearBase] = useState(2024);
//   const [monthsBase, setMonthsBase] = useState([
//     { value: 1, label: "January" },
//     { value: 2, label: "February" },
//     { value: 3, label: "March" },
//     { value: 4, label: "April" },
//     { value: 5, label: "May" },
//     { value: 6, label: "June" },
//     { value: 7, label: "July" },
//     { value: 8, label: "August" },
//     { value: 9, label: "September" },
//     { value: 10, label: "October" },
//     { value: 11, label: "November" },
//     { value: 12, label: "December" },
//   ]);
//   const [yearsBase, setYearsBase] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Generate years from 2020 to 2050
//     const yearOptions = Array.from({ length: 31 }, (_, index) => ({
//       id: `year-${2020 + index}`, // Menambahkan prefix 'year-' untuk memastikan key unik
//       value: 2020 + index,
//       label: (2020 + index).toString(),
//     }));
//     setYearsBase(yearOptions);
//   }, []);

//   const fetchReportData = async (month, year) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/reports?month=${month}&year=${year}`
//       );
//       setReportData(response?.data);
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleMonthChangeBase = (e) => {
//     setSelectedMonthBase(parseInt(e.target.value));
//   };

//   const handleYearChangeBase = (e) => {
//     setSelectedYearBase(parseInt(e.target.value));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchReportData(selectedMonthBase, selectedYearBase);
//   };

//   // const reportData = [
//   //   {
//   //     product_id: "BRKT12",
//   //     productName: "Dress DNY",
//   //     category: "Baju brokat",
//   //     piece: 29,
//   //     price: 385000,
//   //     totalPrice: 11165000,
//   //   },
//   //   {
//   //     product_id: "BRKT12",
//   //     productName: "James Manis",
//   //     category: "Baju brokat",
//   //     piece: 24,
//   //     price: 250000,
//   //     totalPrice: 6000000,
//   //   },
//   //   {
//   //     product_id: "BRKT12",
//   //     productName: "James Katun",
//   //     category: "Baju brokat",
//   //     piece: 35,
//   //     price: 195000,
//   //     totalPrice: 6825000,
//   //   },
//   //   {
//   //     product_id: "BRKT12",
//   //     productName: "James Kancing",
//   //     category: "Baju brokat",
//   //     piece: 16,
//   //     price: 210000,
//   //     totalPrice: 3360000,
//   //   },
//   // ];

//   // const months = [
//   //   "January",
//   //   "February",
//   //   "March",
//   //   "April",
//   //   "May",
//   //   "June",
//   //   "July",
//   //   "August",
//   //   "September",
//   //   "October",
//   //   "November",
//   //   "December",
//   // ];

//   // const years = Array.from({ length: 5 }, (_, i) => 2024 - 2 + i);

//   const totalAmount = reportData.reduce(
//     (sum, item) => sum + item.total_price,
//     0
//   );

//   const handleMonthYearSubmit = (e) => {
//     e.preventDefault();
//     setIsMonthModalOpen(false);
//   };

//   const handleAddReportSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     setIsAddReportModalOpen(false);
//     // Reset form
//     setFormData({
//       product_id: "",
//       piece: "",
//       month: "",
//       year: "",
//     });
//   };

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-3xl font-medium">REPORT</h1>
//         </div>
//         <div className="flex">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex flex-wrap gap-4">
//               <div className="flex flex-col gap-2">
//                 <label htmlFor="month" className="font-medium">
//                   Month:
//                 </label>
//                 <select
//                   id="month"
//                   value={selectedMonthBase}
//                   onChange={handleMonthChangeBase}
//                   className="p-2 border rounded-md min-w-[150px]"
//                 >
//                   {monthsBase.map((month) => (
//                     <option key={month.value} value={month.value}>
//                       {month.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label htmlFor="year" className="font-medium">
//                   Year:
//                 </label>
//                 <select
//                   id="year"
//                   value={selectedYearBase}
//                   onChange={handleYearChangeBase}
//                   className="p-2 border rounded-md min-w-[150px]"
//                 >
//                   {yearsBase.map((year) => (
//                     <option key={year.value} value={year.value}>
//                       {year.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300 min-w-[100px]"
//                 >
//                   {isLoading ? "Loading..." : "Submit"}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         <div>
//           <button
//             onClick={() => setIsAddReportModalOpen(true)}
//             className="gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
//           >
//             Add Report
//           </button>
//         </div>
//       </div>

//       {/* Report Header */}
//       <div className="mb-6">
//         <div className="flex justify-between text-sm mb-5">
//           <p>
//             MONTHLY REPORT : {selectedMonthBase} - {selectedYearBase}
//           </p>
//           <p>Print Date : 31 October 2024</p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 ID Product
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Product Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 piece
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Total Price
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {reportData?.map((item) => (
//               <tr key={item?.product_id} className="text-sm">
//                 <td className="px-6 py-4">ISR-{item?.product_id}</td>
//                 <td className="px-6 py-4">{item?.product_name}</td>
//                 <td className="px-6 py-4">{item?.category}</td>
//                 <td className="px-6 py-4">{item?.piece}</td>
//                 <td className="px-6 py-4">
//                   Rp {item?.price?.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   Rp {item?.total_price?.toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr className="bg-gray-50">
//               <td
//                 colSpan="5"
//                 className="px-6 py-4 text-sm font-medium text-right"
//               >
//                 Total =
//               </td>
//               <td className="px-6 py-4 text-sm font-medium">
//                 Rp {totalAmount.toLocaleString()}
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>

//       {/* Print Button */}
//       <div className="flex justify-end mt-6">
//         <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
//           Print
//         </button>
//       </div>

//       {/* Month Selection Modal */}
//       {isMonthModalOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen p-4">
//             <div
//               className="fixed inset-0 bg-black bg-opacity-30"
//               onClick={() => setIsMonthModalOpen(false)}
//             />

//             <div className="relative bg-white rounded-lg w-96 p-6">
//               <h2 className="text-lg font-semibold mb-4">Select Period</h2>

//               <form onSubmit={handleMonthYearSubmit} className="space-y-4">
//                 {/* Month Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Month
//                   </label>
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(e.target.value)}
//                     className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm"
//                   >
//                     {months.map((month) => (
//                       <option key={month} value={month.toUpperCase()}>
//                         {month}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Year Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Year
//                   </label>
//                   <select
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(e.target.value)}
//                     className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm"
//                   >
//                     {years.map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Modal Actions */}
//                 <div className="flex justify-end gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsMonthModalOpen(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Report Modal */}
//       {isAddReportModalOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen p-4">
//             <div
//               className="fixed inset-0 bg-black bg-opacity-30"
//               onClick={() => setIsAddReportModalOpen(false)}
//             />

//             <div className="relative bg-white rounded-lg max-w-5xl w-full pt-14 px-12 pb-10">
//               <h2 className="text-2xl font-semibold mb-10">October Report</h2>

//               <form onSubmit={handleAddReportSubmit} className="">
//                 <div className="flex flex-col  gap-5">
//                   <div className="flex justify-between">
//                     <label className="block text-sm font-medium mb-1">
//                       Id Product <span className="text-red-500">*</span>
//                     </label>
//                     {/* Menggunakan react-select */}
//                     <Select
//                       name="product_id"
//                       options={productOptions} // Menampilkan opsi produk
//                       onChange={handleProductSelectChange} // Menangani perubahan pilihan
//                       value={productOptions.find(
//                         (option) => option.value === formData.product_id
//                       )} // Set nilai yang sudah dipilih
//                       className="w-1/2 text-xs "
//                       placeholder="Select ID Product"
//                       required
//                     />
//                   </div>

//                   {/* Piece */}
//                   <div className="flex justify-between">
//                     <div className="flex w-1/2">
//                       <label className="block text-sm font-medium mb-1">
//                         Piece <span className="text-red-500">*</span>
//                       </label>
//                     </div>
//                     <div className="flex w-1/2">
//                       <input
//                         type="number"
//                         name="piece"
//                         placeholder="Qty"
//                         value={formData.piece}
//                         onChange={handleInputChange}
//                         className="w-full rounded py-3 pl-4 text-xs  border border-gray-400 text-gray-500 "
//                         required
//                       />

//                       {/* <div className="flex justify-end w-1/2">
//                         <button
//                           type="submit"
//                           className="px-5 py-2 border border-red-500 bg-red-500 text-white hover:bg-red-600 rounded-lg text-sm mr-3"
//                         >
//                           Clear
//                         </button>
//                         <button
//                           type="submit"
//                           className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
//                         >
//                           Submit
//                         </button>
//                       </div> */}
//                     </div>
//                   </div>

//                   {/* Month */}
//                   <div className="flex justify-between">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Month <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="month"
//                       value={formData.month}
//                       onChange={handleMonthChange}
//                       className="w-1/2 rounded py-3 pl-4 text-xs border border-gray-400 text-gray-500"
//                       required
//                     >
//                       <option value="" disabled>
//                         Select Month
//                       </option>
//                       {months.map((month) => (
//                         <option key={month.value} value={month.value}>
//                           {month.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Year */}
//                   <div className="flex justify-between">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Year <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="year"
//                       value={formData.year}
//                       onChange={handleYearChange}
//                       className="w-1/2 rounded py-3 pl-4 text-xs border border-gray-400 text-gray-500"
//                       required
//                     >
//                       <option value="" disabled>
//                         Select Year
//                       </option>
//                       {years.map((year) => (
//                         <option key={year.value} value={year.value}>
//                           {year.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Modal Actions */}
//                 <div className="flex justify-end gap-3 pt-6">
//                   <button
//                     type="button"
//                     onClick={() => setIsAddReportModalOpen(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
//                   >
//                     Add Report
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { CirclePlus } from "lucide-react";

// Custom Alert Component
const Alert = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "p-4 rounded-lg mb-4";
  const variants = {
    default: "bg-blue-50 text-blue-700",
    destructive: "bg-red-50 text-red-700",
    success: "bg-green-50 text-green-700",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default function Report() {
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for report data and filters
  const [reportData, setReportData] = useState([]);
  const [selectedMonthBase, setSelectedMonthBase] = useState(10);
  const [selectedYearBase, setSelectedYearBase] = useState(2024);

  // Form state for Add Report
  const [formData, setFormData] = useState({
    product_id: "",
    piece: "",
    month: "",
    year: "",
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    // Initial report fetch
    fetchReportData(selectedMonthBase, selectedYearBase);
  }, []);

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      setError("Error fetching products: " + error.message);
    }
  };

  // Fetch report data function
  const fetchReportData = async (month, year) => {
    setIsLoading(true);
    setError(null); // Reset error state

    try {
      // Reset report data before fetching new data
      setReportData([]);

      const response = await axios.get(
        `http://localhost:5000/api/reports?month=${month}&year=${year}`
      );

      // Only update state if the response matches current selected month/year
      if (month === selectedMonthBase && year === selectedYearBase) {
        setReportData(response.data);
      }
    } catch (error) {
      setError("Error fetching report data: " + error.message);
      setReportData([]); // Reset report data on error
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission for creating new report
  const handleAddReportSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/reports", {
        product_id: formData.product_id,
        piece: parseInt(formData.piece),
        month: parseInt(formData.month),
        year: parseInt(formData.year),
      });

      setSuccess("Report added successfully");
      setIsAddReportModalOpen(false);

      // Refresh report data only if the added report is for the currently selected month/year
      if (
        parseInt(formData.month) === selectedMonthBase &&
        parseInt(formData.year) === selectedYearBase
      ) {
        await fetchReportData(selectedMonthBase, selectedYearBase);
      }

      // Reset form
      setFormData({
        product_id: "",
        piece: "",
        month: "",
        year: "",
      });

      // Refresh products list to get updated stock
      await fetchProducts();
    } catch (error) {
      setError(error.response?.data?.error || "Error creating report");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReportData(selectedMonthBase, selectedYearBase);
  };

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      product_id: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleMonthChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      month: parseInt(e.target.value),
    }));
  };

  const handleYearChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      year: parseInt(e.target.value),
    }));
  };

  // Product options for select
  const productOptions = products.map((product) => ({
    value: product.id,
    label: `ISR-${product.id} - ${product.product_name}`,
  }));

  // Convert total_price to number and calculate the total amount
  const totalAmount = reportData.reduce((sum, item) => {
    // Pastikan `total_price` dikonversi menjadi angka
    const totalPrice = parseInt(item.total_price, 10);
    return sum + (isNaN(totalPrice) ? 0 : totalPrice);
  }, 0);

  console.log("totalAmount", totalAmount);
  console.log("report data", reportData);

  // Month and year options
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  // 2020 -2029
  const years = Array.from({ length: 10 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  function formatDate(date) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  const currentDate = new Date();

  function formatMonthYear(month, year) {
    // Array nama bulan dalam Bahasa Indonesia
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    // Mengambil nama bulan berdasarkan index (dikurangi 1 karena array dimulai dari 0)
    const formattedMonth = monthNames[month - 1];
    return `${formattedMonth} ${year}`;
  }

  return (
    <div className="p-6">
      {/* Error and Success Alerts */}
      {error && <Alert variant="destructive">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        {/* <div>
          <h1 className="text-3xl font-medium">REPORT</h1>
        </div> */}

        {/* Filter Form */}
        <div className="flex">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="month" className="font-medium text-xs">
                  Month
                </label>
                <select
                  id="month"
                  value={selectedMonthBase}
                  onChange={(e) =>
                    setSelectedMonthBase(parseInt(e.target.value))
                  }
                  className="p-2 border rounded-md min-w-[150px] text-xs"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="year" className="font-medium text-xs">
                  Year
                </label>
                <select
                  id="year"
                  value={selectedYearBase}
                  onChange={(e) =>
                    setSelectedYearBase(parseInt(e.target.value))
                  }
                  className="p-2 border rounded-md min-w-[150px] text-xs"
                >
                  {years.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 min-w-[100px] text-sm"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <button
            onClick={() => setIsAddReportModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Add Report
            <CirclePlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Report Header */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-5 font-medium">
          <p>
            Monthly Report :{" "}
            {formatMonthYear(selectedMonthBase, selectedYearBase)}
          </p>
          <p>{formatDate(currentDate)}</p>
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
            {/* {reportData?.map((item) => (
              <tr key={item?.product_id} className="text-sm">
                <td className="px-6 py-4">ISR-{item?.product_id}</td>
                <td className="px-6 py-4">{item?.product_name}</td>
                <td className="px-6 py-4">{item?.category}</td>
                <td className="px-6 py-4">{item?.piece}</td>
                <td className="px-6 py-4">
                  Rp {item?.price?.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  Rp {item?.total_price?.toLocaleString()}
                </td>
              </tr>
            ))} */}
            {reportData?.map((item, index) => (
              <tr
                key={`${item?.product_id}-${item?.month}-${item?.year}-${index}`}
                className="text-sm"
              >
                <td className="px-6 py-6">ISR-{item?.product_id}</td>
                <td className="px-6 py-6">{item?.product_name}</td>
                <td className="px-6 py-6">{item?.category}</td>
                <td className="px-6 py-6">{item?.piece}</td>
                <td className="px-6 py-6">
                  Rp {parseInt(item?.price || 0, 10).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-6">
                  Rp{" "}
                  {parseInt(item?.total_price || 0, 10).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 ">
              <td
                colSpan="5"
                className="px-5 py-4 text-sm font-semibold text-start"
              >
                Total Penjualan :
              </td>
              <td className="px-5 py-4 text-sm font-semibold">
                Rp {totalAmount?.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Add Report Modal */}
      {isAddReportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setIsAddReportModalOpen(false)}
            />

            <div className="relative bg-white rounded-lg max-w-5xl w-full pt-14 px-12 pb-10">
              <h2 className="text-2xl font-semibold mb-10">Add New Report</h2>

              <form onSubmit={handleAddReportSubmit} className="">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium mb-1">
                      Id Product <span className="text-red-500">*</span>
                    </label>
                    <Select
                      name="product_id"
                      options={productOptions}
                      onChange={handleProductSelectChange}
                      value={productOptions.find(
                        (option) => option.value === formData.product_id
                      )}
                      className="w-1/2 text-xs"
                      placeholder="Select ID Product"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium mb-1">
                      Piece <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="piece"
                      placeholder="Qty"
                      value={formData.piece}
                      onChange={handleInputChange}
                      className="w-1/2 rounded py-3 pl-4 text-xs border border-gray-400 text-gray-500"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Month <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleMonthChange}
                      className="w-1/2 rounded py-3 pl-4 text-xs border border-gray-400 text-gray-500"
                      required
                    >
                      <option value="" disabled>
                        Select Month
                      </option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleYearChange}
                      className="w-1/2 rounded py-3 pl-4 text-xs border border-gray-400 text-gray-500"
                      required
                    >
                      <option value="" disabled>
                        Select Year
                      </option>
                      {years.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddReportModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add Report"}
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
