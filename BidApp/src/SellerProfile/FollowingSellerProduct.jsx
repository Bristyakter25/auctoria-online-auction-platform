import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";

const FollowingSellerProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [feed, setFeed] = useState([]);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axiosPublic.get(`/followingSeller/${userEmail}`);
        // console.log("feeds data", res.data);
        setFeed(res.data);
      } catch (error) {
        console.error("Error fetching following sellers:", error);
      }
    };
    if (userEmail) {
      fetchFollowing();
    }
  }, [userEmail, axiosPublic]);

  return (
    <div className="container  p-2 mx-auto sm:p-4 dark:text-gray-800 ">
      <div className="overflow-x-auto rounded-2xl">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              {/* <th className="p-3">Invoice #</th>
              <th className="p-3">Client</th>
              <th className="p-3">Issued</th>
              <th className="p-3">Due</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {feed.map((seller) => (
              <tr className="border-b border-opacity-20 text-sm dark:border-gray-300 dark:bg-gray-50">
                <td className="p-3 w-1/6">
                  <img
                    src={seller.productImage}
                    alt="Seller"
                    className="w-16 h-16 object-cover rounded-xl mx-auto"
                  />
                </td>
                <td className="p-3 ">
                  <p>{seller.sellerName || "N/A"}</p>
                </td>
                <td className="p-3">
                  <p>{seller.productName}</p>
                </td>
                <td className="p-3">
                  <p>{seller.category || "N/A"}</p>
                </td>
                <td className="p-3 text-right">{/* <p>$15,792</p> */}</td>
                <td className="p-3 text-right">
                  {/* <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                    <span>Pending</span>
                  </span> */}
                  <p>{seller.location}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowingSellerProduct;
