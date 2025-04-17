import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
const AddProduct = () => {
  const { user } = useContext(AuthContext);
  console.log("inside add ", user?.email, user?.uid);
  const generateSellerId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const sellerId = generateSellerId();
    const form = e.target;
    const productData = {
      sellerId: sellerId,
      email: user?.email,
      productName: form.productName.value,
      category: form.category.value,
      description: form.description.value,
      startingBid: form.startingBid.value,
      auctionStartDate: form.auctionStartDate.value,
      productImage: form.productImage.value,
      location: form.location.value,
      status: form.status.value,
    };

    console.log(productData);

    fetch("https://auctoria-online-auction-platform.onrender.com/addProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'user-email': user?.email,
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Auction Product Added Successfully!",
            icon: "success",
            draggable: true,
          });
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:max-w-4xl mx-auto mt-20 p-6 rounded-xl"
    >
      <div className="text-center lg:mb-">
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-600 flex justify-center items-center gap-2">
          <MdAddCircleOutline className="" /> Add New Auction Product
        </h1>
      </div>

      <form
        onSubmit={handleSubmitProduct}
        className=" p-8 rounded-2xl shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              className="input input-bordered w-full dark:text-black"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-600">
              Category
            </label>
            <select
              name="category"
              className="select select-bordered w-full dark:text-black"
              required
            >
              <option disabled selected>
                Select category
              </option>
              <option>Antiques</option>
              <option>Electronics</option>
              <option>Collectibles</option>
              <option>Jewelry</option>
              <option>Watches</option>
              <option>Art</option>
              <option>Luxury Bags</option>
              <option>Cars</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full dark:text-black"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-gray-600">
              Starting Bid
            </label>
            <input
              type="number"
              name="startingBid"
              className="input input-bordered w-full dark:text-black"
              placeholder="Enter starting bid price"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-600">
              Auction Start Date
            </label>
            <input
              type="datetime-local"
              name="auctionStartDate"
              className="input input-bordered w-full dark:text-black"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-600">
              Product Image URL
            </label>
            <input
              type="url"
              name="productImage"
              className="input input-bordered w-full dark:text-black"
              placeholder="Enter product image URL"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-600">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered w-full dark:text-black"
              placeholder="Enter auction location"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-600">Status</label>
            <select
              name="status"
              className="select select-bordered w-full dark:text-black"
              required
            >
              <option disabled selected>
                Select status
              </option>
              <option>Active</option>
              <option>Upcoming</option>
              <option>Live</option>
            </select>
          </div>
          {/* <motion.div whileHover={{ scale: 1.02 }} className="mt-6">
            <button
              type="submit"
              className="btn bg-teal-400 hover:to-teal-500 text-gray-700 w-full font-semibold"
            >
              Add Auction Product
            </button>
          </motion.div> */}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} className="mt-6">
          <button
            type="submit"
            className="btn text-xl bg-teal-400 hover:to-teal-500 text-gray-700 w-full font-semibold"
          >
            Add to Product
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};
export default AddProduct;
