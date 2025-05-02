import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import UpdateProductInfo from "../Dashboard/SellerRoute/UpdateProductInfo";

const ProductHistory = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (user?.email) {


      
      fetch(`https://auctoria-online-auction-platform.onrender.com/productHistory?email=${user.email}`)

        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [user?.email]);

  return (
    <section className="p-6  ">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold mb-6  text-white">Product History</h2>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead >
              <tr>
                <th className="px-6 py-3 text-left  font-bold  uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left  font-bold  uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left  font-bold  uppercase tracking-wider">
                  Category
                </th>

                <th className="px-6 py-3 text-left  font-bold uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left  font-bold  uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left  font-bold  uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="  divide-y divide-gray-200 ">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  ">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  ">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap ">
                    {product.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
  <div className="flex justify-center">
    <span
      className={`inline-flex justify-center items-center px-2 py-1 w-[80px] font-semibold leading-5 rounded-full ${
        product.status === "available"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {product.status}
    </span>
  </div>
</td>
<td className="px-3 py-2  whitespace-nowrap ">
<button className="btn bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mr-2">
  Delete
</button>
<button
  onClick={() => setEditingProduct(product)}
  className="btn bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
>
  Update
</button>


                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingProduct && (
        <UpdateProductInfo
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdated={() => {
            // refetch product list
            fetch(`http://localhost:5000/productHistory?email=${user.email}`)
              .then((res) => res.json())
              .then((data) => setProducts(data));
          }}
        />
      )}
    </section>
  );
};

export default ProductHistory;
