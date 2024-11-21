import React, { useState } from "react";
import { CirclePlus, Pencil, Trash2, Search, ImageUp } from "lucide-react";

// Sample data - nantinya akan diambil dari Firebase
const products = [
  {
    id: 1,
    id_produk: "BRKT12",
    image: "/api/placeholder/48/48",
    name: "Maithong Coklat",
    category: "Baju",
    price: 730000,
    piece: 15,
    size: "L",
  },
];

export default function Product() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    piece: "",
    color: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save to Firebase
    console.log(formData);
    setIsAddModalOpen(false);
    setFormData({
      name: "",
      category: "",
      price: "",
      piece: "",
      color: "",
      image: null,
    });
    setSelectedImage(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 text-sm">
        {/* <h1 className="text-2xl font-semibold">Product</h1> */}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4  top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search product name"
            className="w-full pl-12 pr-4 pt-3.5 pb-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Stock
          <CirclePlus className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      {/* <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search product name"
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Piece
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 font-normal text-sm">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image}
                    // alt={product.name}
                    className="w-12 h-12 rounded"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {product.id_produk}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.piece}</td>
                {/* <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {product.size.map((size, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">{product.size}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">Showing 1-10 of 70</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              &larr;
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              &rarr;
            </button>
          </div>
        </div>
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
              <h2 className="text-2xl font-semibold mb-10">
                Product Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Id Product <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs  border border-gray-500 text-gray-500 "
                      placeholder="Input Id"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs  border border-gray-500 text-gray-500 "
                      placeholder="Input Name"
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
                      className="w-1/2 rounded-lg py-3 pl-3 text-xs  border border-gray-500 text-gray-500 "
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
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs  border border-gray-500 text-gray-500 "
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
                      className="w-1/2 rounded-lg py-3 pl-4 text-xs  border border-gray-500 text-gray-500 "
                      placeholder="Qty"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-1/2 rounded-lg py-3 pl-3 text-xs  border border-gray-500 text-gray-500 "
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

                  <div className="flex ">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Product <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4 pl-[350px]">
                      <label className="w-24 h-24 rounded  border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                        <ImageUp className="w-6 h-6 text-gray-400" />
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
                  </div>
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
    </div>
  );
}
