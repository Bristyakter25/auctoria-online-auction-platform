import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

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
      category: form.category.value, // New field
      description: form.description.value,
      startingBid: form.startingBid.value,
      auctionStartDate: form.auctionStartDate.value,
      productImage: form.productImage.value,
      location: form.location.value, // New field
      status: form.status.value, // New field
    };

    console.log(productData);

    fetch("http://localhost:5000/addProducts", {
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
    <div className="lg:max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Add New Auction Product
      </h1>
      <form
        onSubmit={handleSubmitProduct}
        className="space-y-4 bg-white dark:bg-purple-700 p-6 rounded shadow"
      >
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
            className="input dark:text-black input-bordered w-full"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* New Category Field */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            className="input dark:text-black input-bordered w-full"
            required
          >
            <option value="Antiques">Antiques</option>
            <option value="Electronics">Electronics</option>
            <option value="Collectibles">Collectibles</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Watches">Watches</option>
            <option value="Art">Art</option>
            <option value="Luxury Bags">Luxury Bags</option>
            <option value="Cars">Cars</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="textarea dark:text-black textarea-bordered w-full"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Starting Bid</label>
          <input
            type="number"
            name="startingBid"
            className="input dark:text-black input-bordered w-full"
            placeholder="Enter starting bid price"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Auction Start Date</label>
          <input
            type="datetime-local"
            name="auctionStartDate"
            className="input dark:text-black input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Product Image URL</label>
          <input
            type="url"
            name="productImage"
            className="input dark:text-black input-bordered w-full"
            placeholder="Enter product image URL"
            required
          />
        </div>

        {/* New Location Field */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            className="input dark:text-black input-bordered w-full"
            placeholder="Enter auction location"
            required
          />
        </div>

        {/* New Status Field */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            className="input dark:text-black input-bordered w-full"
            required
          >
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Live">Live</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="btn bg-[#7E60BF] hover:text-black text-white w-full"
          >
            Add Auction Product
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
