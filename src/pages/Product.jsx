import React, { useEffect, useState } from "react";
import { CirclePlus, Pencil, Trash2, Search, ImageUp } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductTable from "../component/productTable.jsx";
import { toast, Toaster } from "react-hot-toast";
import { DismissibleAlert } from "../component/DismissibleAlert";

export default function Product() {
  // last
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // Data produk
  const [formData, setFormData] = useState({
    product_name: "",
    category: "",
    price: "",
    piece: "",
    size: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  //alert close button
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const navigate = useNavigate();
  console.log("products", products);

  //cek token
  useEffect(() => {
    // console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      alert("silahkan login dulu");
      navigate("/");
    }
  }, []);

  // Fetch produk dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error("Error fetching products:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle perubahan gambar
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   // Validasi tipe dan ukuran file
  //   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  //   const maxSize = 5 * 1024 * 1024; // 5MB

  //   if (file) {
  //     if (!allowedTypes.includes(file.type)) {
  //       alert("Hanya file gambar yang diperbolehkan");
  //       return;
  //     }

  //     if (file.size > maxSize) {
  //       alert("Ukuran file terlalu besar. Maksimal 5MB");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Submit data produk
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      image: selectedImage, // Mengirimkan base64 atau URL file
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        productData
      );

      if (response.status === 201) {
        toast.success("Product added successfully!");
        setSuccess("Product has been successfully added to inventory");

        setProducts((prev) => [...prev, response.data]); // Tambahkan produk baru ke daftar
        setFormData({
          product_name: "",
          category: "",
          price: "",
          piece: "",
          size: "",
        });
        setSelectedImage(null);
        setIsAddModalOpen(false); // Tutup modal
      } else {
        setError("Failed to add product. Please try again.");
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while adding the product. Please try again.");
      toast.error("Failed to add product");
    }
  };

  // edit {PUT}
  const [editFormData, setEditFormData] = useState({
    product_name: "",
    category: "",
    price: "",
    piece: "",
    size: "",
    image_url: "",
  });

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const handleEditClick = (product) => {
    setEditFormData({
      product_name: product?.product_name,
      category: product?.category,
      price: product?.price,
      piece: product?.piece,
      size: product?.size,
      image_url: product?.image_url,
    });
    setSelectedProductId(product?.id);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${selectedProductId}`,
        editFormData
      );

      if (response.status === 200) {
        setProducts((prev) =>
          prev.map((product) =>
            product?.id === selectedProductId
              ? { ...product, ...response.data }
              : product
          )
        );
        setIsEditModalOpen(false);
        toast.success("Product updated successfully");
        setSuccess("Product has been successfully updated");

        console.log("Product updated successfully");
      }
    } catch (error) {
      toast.error("Error updating product");
      setError("Failed to update product. Please try again.");
      console.error("Error updating product:", error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product?.id !== id));
      toast.success("Product deleted successfully");
      setSuccess("Product has been successfully deleted");
      console.log("Product deleted successfully");
    } catch (error) {
      toast.error("Product Cannot Be Deleted");
      setError(
        "The product cannot be deleted, because the stock has already been sold!"
      );
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Add the new alerts at the top of the component */}
      {error && (
        <DismissibleAlert
          variant="destructive"
          message={error}
          onDismiss={() => setError(null)}
        />
      )}
      {success && (
        <DismissibleAlert
          variant="success"
          message={success}
          onDismiss={() => setSuccess(null)}
        />
      )}

      {/* Header */}
      <div className="flex justify-start items-center mb-6 text-sm">
        {/* <h1 className="text-2xl font-semibold">Product</h1> */}

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Stock
          <CirclePlus className="w-4 h-4" />
        </button>
      </div>

      {/* Edit  */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setIsEditModalOpen(false)}
            />

            <div className="relative bg-white rounded-lg max-w-5xl w-full pt-14 px-12 pb-10">
              <h2 className="text-2xl font-semibold mb-10">Edit Product</h2>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      placeholder="Product Name"
                      value={editFormData?.product_name}
                      onChange={handleEditInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs border border-gray-500 text-gray-500"
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={editFormData?.category}
                      onChange={handleEditInputChange}
                      className="w-1/2 rounded-lg py-3 pl-3 text-xs border border-gray-500 text-gray-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Dress">Dress</option>
                      <option value="Songket">Songket</option>
                      <option value="Baju">Baju</option>
                      <option value="Celana">Celana</option>
                      <option value="Dalaman">Dalaman</option>
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData?.price}
                      onChange={handleEditInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs border border-gray-500 text-gray-500"
                      placeholder="Rp"
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Piece
                    </label>
                    <input
                      type="number"
                      name="piece"
                      value={editFormData?.piece}
                      onChange={handleEditInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs border border-gray-500 text-gray-500"
                      placeholder="Qty"
                      min="1"
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <select
                      name="size"
                      value={editFormData?.size}
                      onChange={handleEditInputChange}
                      className="w-1/2 rounded-lg py-3 pl-3 text-xs border border-gray-500 text-gray-500"
                      required
                    >
                      <option value="">Select Size</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>

                  {/* Other form fields */}

                  {/* <div className="flex ">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Product
                    </label>
                    <div className="flex gap-4 pl-[350px]">
                      <label className="w-24 h-24 rounded border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <span className="w-6 h-6 text-gray-400">📷</span>
                      </label>
                      {editFormData.image_url && (
                        <div className="w-24 h-24 rounded border-2 border-dashed border-gray-300">
                          <img
                            src={editFormData.image_url}
                            alt="Preview"
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>

                <div className="flex justify-end gap-3 text-sm pt-7">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#4880FF] text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Piece
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                size
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 font-normal text-sm">
            {products?.map((product) => (
              <tr key={product?.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product?.image || "null"} // Tambahkan gambar default jika tidak ada
                    alt={product?.product_name || "Product"}
                    className="w-12 h-12 rounded object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Mencegah loop error
                      e.target.src = "null"; // Gambar default jika gagal memuat
                    }}
                  />
                </td>

                <td className="px-6 py-6 whitespace-nowrap">
                  ISR - {product?.id}
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  {product?.product_name}
                </td>

                <td className="px-6 py-6 whitespace-nowrap">
                  {product?.category}
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  {product?.price
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(Number(product?.price))
                    : "-"}
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  {product?.piece}
                </td>

                <td className="px-6 py-6 whitespace-nowrap">{product?.size}</td>

                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product?.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <ProductTable
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {/* <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">Showing 1-10 of 70</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              &larr;
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              &rarr;
            </button>
          </div>
        </div> */}
      </div>

      {/* Add Stock Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setIsAddModalOpen(false)}
            />

            <div className="relative bg-white rounded-lg max-w-5xl w-full pt-14 px-12 pb-10">
              <h2 className="text-2xl font-semibold mb-10">Add Stock</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      placeholder="Product Name"
                      value={formData.product_name}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs border border-gray-500 text-gray-500"
                      // placeholder="Input Name"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-3 text-xs border border-gray-500 text-gray-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Dress">Dress</option>
                      <option value="Songket">Songket</option>
                      <option value="Baju">Baju</option>
                      <option value="Celana">Celana</option>
                      <option value="Dalaman">Dalaman</option>
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs border border-gray-500 text-gray-500"
                      placeholder="Rp"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Piece <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="piece"
                      value={formData.piece}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs border border-gray-500 text-gray-500"
                      placeholder="Qty"
                      min="1"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-3 text-xs border border-gray-500 text-gray-500"
                      required
                    >
                      <option value="">Select Size</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>

                  {/* <div className="flex ">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Product
                    </label>
                    <div className="flex gap-4 pl-[350px]">
                      <label className="w-24 h-24 rounded border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <span className=" text-gray-400">+</span>
                      </label>
                      {selectedImage && (
                        <div className="w-24 h-24 rounded border-2 border-dashed border-gray-300">
                          <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>

                <div className="flex justify-end gap-3 text-sm pt-7">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#4880FF] text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="text-sm">
        <Toaster />
      </div>
    </div>
  );
}
