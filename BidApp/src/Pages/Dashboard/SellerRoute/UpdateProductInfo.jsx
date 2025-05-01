import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";

const UpdateProductInfo = ({ product, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:5000/updateProduct/${product._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          Swal.fire("Updated!", "Product has been updated.", "success");
          onUpdated();
          onClose();
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto"
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full mx-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700 flex justify-center items-center gap-2">
            <MdEdit /> Update Product Information
          </h1>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-600">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-600">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-600">
                Auction start Date
              </label>
              <input
                type="datetime-local"
                name="auctionStartDate"
                value={formData.auctionStartDate?.slice(0, 16)} // format for input
                onChange={handleChange}
                className="input input-bordered w-full"
              />{" "}
            </div>
            <div>
              <label className="block font-semibold text-gray-600">
                Auction End Date
              </label>
              <input
                type="datetime-local"
                name="auctionEndTime"
                value={formData.auctionEndTime?.slice(0, 16)}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-600">
                Product Image URL
              </label>
              <input
                type="url"
                name="productImage"
                value={formData.productImage}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-600">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="btn bg-teal-400 text-gray-800 font-semibold w-36"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn bg-red-400 text-white font-semibold w-36"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateProductInfo;
