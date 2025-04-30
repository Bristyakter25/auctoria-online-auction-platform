// import { useContext, useEffect, useState } from "react";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import { AuthContext } from "../providers/AuthProvider";
// import { CardDesign, FollowingSellerItem } from "../SellerProfile/CardDesign";
// import { cn } from "../utils/cn";
// import { motion } from "motion/react";
// import { Eye } from "lucide-react";
// import { Button } from "../SellerProfile/Button";
// import { useNavigate } from "react-router-dom";
// // import { IconUserHeart } from "@tabler/icons-react";

// const FollowingSellerProduct = () => {
//   const axiosPublic = useAxiosPublic();
//   const [feed, setFeed] = useState([]);
//   const { user } = useContext(AuthContext);
//   const userEmail = user?.email;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFollowing = async () => {
//       try {
//         const res = await axiosPublic.get(`/followingSeller/${userEmail}`);
//         console.log("Favorite Data", res.data);
//         setFeed(res.data);
//       } catch (error) {
//         console.error("Error fetching following sellers:", error);
//       }
//     };
//     if (userEmail) {
//       fetchFollowing();
//     }
//   }, [userEmail, axiosPublic]);

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       {/* <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
//         Favorites Seller Product
//       </h2> */}
//       <CardDesign className="md:auto-rows-[20rem]">
//         {feed.map((seller, index) => (
//           <FollowingSellerItem
//             key={seller._id}
//             title={<p className="text-white">{seller.productName}</p>}
//             description={
//               <span className="text-sm text-neutral-200 dark:text-neutral-200">
//                 ${seller.bidWinner}
//               </span>
//             }
//             header={<SellerCard photoUrl={seller?.productImage} />}
//             className={cn(index % 3 === 0 && "md:col-span-1")}
//             // icon={<IconUserHeart className="h-4 w-4 text-pink-500" />}
//           />
//         ))}
//       </CardDesign>
//     </div>
//   );
// };

// const SellerCard = ({ photoUrl }) => {
//   const animation = {
//     initial: { scale: 0.9, rotate: -3 },
//     hover: { scale: 1, rotate: 0 },
//   };

//   return (
//     <motion.div
//       initial="initial"
//       whileHover="hover"
//       variants={animation}
//       className="flex flex-col h-full w-full items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-neutral-500 dark:border-white/[0.1] space-y-4"
//     >
//       <img src={photoUrl} alt="" className="object-fill h-[200px] w-full" />
//       {/* <Button className="flex justify-center items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-4 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all w-full text-sm">
//         <Eye className="w-4 h-4 mr-1" /> View Auction
//       </Button> */}
//       {/* <img
//         src={photoUrl}
//         alt="Seller"
//         className="w-16 h-16 rounded-full shadow-md border-2 border-pink-500"
//       /> */}
//     </motion.div>
//   );
// };

// export default FollowingSellerProduct;

import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "@mui/material";

const FollowingSellerProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [feed, setFeed] = useState([]);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axiosPublic.get(`/followingSeller/${userEmail}`);
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
    // <div className="p-4 max-w-3xl mx-auto">
    //   {/* <h2 className="text-2xl font-bold mb-4 text-center">Seller Products</h2> */}
    //   <div className="overflow-x-auto">
    //     <table className="min-w-full border border-gray-200 rounded-md">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           {/* <th className="py-2 px-4 border">Photo</th>
    //           <th className="py-2 px-4 border">Seller Name</th>
    //           <th className="py-2 px-4 border">Product Name</th>
    //           <th className="py-2 px-4 border">Category</th> */}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {feed.map((seller) => (
    //           <tr key={seller._id} className="text-center">
    //             <td className="py-2 px-4 border">
    //               <Tooltip title="Seller Photo">
    //                 <img
    //                   src={seller.productImage}
    //                   alt="Seller"
    //                   className="w-12 h-12 rounded-full mx-auto"
    //                 />
    //               </Tooltip>
    //             </td>
    //             <td className="py-2 px-4 border">
    //               {seller.sellerName || "N/A"}
    //             </td>
    //             <td className="py-2 px-4 border">{seller.productName}</td>
    //             <td className="py-2 px-4 border">{seller.category || "N/A"}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
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
              <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                <td className="p-3">
                  <img
                    src={seller.productImage}
                    alt="Seller"
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="p-3">
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
