import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const ProductHistory = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {


      
      fetch(`http://localhost:5000/productHistory?email=${user.email}`)

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
            <thead className=" ">
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
                    <span
                      className={`inline-flex px-2  font-semibold leading-5 rounded-full ${
                        product.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductHistory;
