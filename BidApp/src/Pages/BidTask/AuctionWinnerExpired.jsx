// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const AuctionWinnerExpired = () => {
//   const axiosPublic = useAxiosPublic();
//   const handleCheckExpired = async () => {
//     try {
//       const { data: auctionWinner = [], refetch } = useQuery({
//         queryKey: ["auctionWinner"],
//         queryFn: async () => {
//           const res = await axiosPublic.get("/winnner-auction");
//           console.log("Auction Winner data", res.data);
//           return res.data;
//         },
//       });
//     } catch (err) {
//       console.error("Error checking expired auctions:", err);
//     }
//   };
//   return (
//     <button
//       onClick={handleCheckExpired}
//       className="bg-red-500 text-white p-2 rounded"
//     >
//       Check Expired Auctions
//     </button>
//   );
// };

// export default AuctionWinnerExpired;

// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const AuctionWinnerExpired = () => {
//   const axiosPublic = useAxiosPublic();

//   const {
//     data: auctionWinner = [],
//     refetch,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["auctionWinner"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/winnner-auction");
//       console.log("Auction Winner data", res.data);
//       return res.data;
//     },
//     enabled: false,
//   });

//   const handleCheckExpired = async () => {
//     await refetch();
//   };

//   return (
//     <div>
//       <button
//         onClick={handleCheckExpired}
//         className="bg-red-500 text-white p-2 rounded"
//       >
//         Check Expired Auctions
//       </button>

//       {isLoading && <p>Loading...</p>}
//       {isError && <p>Something went wrong!</p>}
//       {auctionWinner.length > 0 && (
//         <ul>
//           {auctionWinner.map((winner) => (
//             <li key={winner._id}>
//               {winner.productName} - {winner.winnerEmail}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AuctionWinnerExpired;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AuctionWinnerExpired = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: auctionWinner = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auctionWinner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/winner-auction");
      console.log("Auction Winner data", res.data);
      return res.data;
    },
    enabled: false,
  });
  console.log("Loading and isError", isLoading, isError);
  const handleCheckExpired = async () => {
    await refetch();
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Expire Auctions Checker</h2>

      <button
        onClick={handleCheckExpired}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Check Expired Auctions
      </button>

      {isLoading && <p className="mt-4">⏳ Checking expired auctions...</p>}
      {isError && <p className="text-red-500 mt-4">❌ Something went wrong!</p>}

      {auctionWinner.length > 0 && (
        <ul className="mt-4 space-y-2">
          {auctionWinner.map((winner) => (
            <li key={winner._id} className="border p-3 rounded shadow">
              <strong>{winner.productName}</strong> <br />
              Winner:{" "}
              <span className="text-green-600">{winner.winnerEmail}</span>
              <br />
              Winning Bid: ৳{winner.winningBid}
            </li>
          ))}
        </ul>
      )}

      {auctionWinner.length === 0 && !isLoading && (
        <p className="mt-4 text-gray-500">No expired auctions found yet.</p>
      )}
    </div>
  );
};

export default AuctionWinnerExpired;
