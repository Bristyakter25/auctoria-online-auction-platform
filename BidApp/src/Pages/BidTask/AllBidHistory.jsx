import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Format date function
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  return `${date.toLocaleDateString("en-US", options)} `;
};

const AllBidHistory = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: bidHistory = [], refetch } = useQuery({
    queryKey: ["bidHistory"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allBidHistory/${id}`);
      console.log("bid history is", res.data);
      return res.data;
    },
  });

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <motion.table
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <thead className="bg-blue-400">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-800"
                      >
                        <button className="flex items-center gap-x-3 focus:outline-none">
                          <span></span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-800"
                      >
                        Bidder Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-800"
                      >
                        Bid Time
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-800"
                      >
                        Bid Amount
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-800"
                      >
                        License use
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {bidHistory.map((bid, index) => (
                      <motion.tr
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
                      >
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="object-cover w-12 h-12 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src={bid.photo}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-center">
                              {bid.user}
                            </h2>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap text-center">
                          <div className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
                            {formatDate(bid.time)}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 className="">${bid.amount}.00</h4>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                            <div className="bg-blue-500 w-1/3 h-1.5"></div>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllBidHistory;
