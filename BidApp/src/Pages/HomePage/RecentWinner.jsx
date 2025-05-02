import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/ShareComponents/Loading/LoadingSpinner";
import { io } from "socket.io-client";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";

dayjs.extend(relativeTime);

const socket = io("http://localhost:5000", {
  transports: ["polling", "websocket"],
  reconnection: true,
});

const RecentWinner = () => {
  const axiosPublic = useAxiosPublic();
  const { loading, setloading } = useContext(AuthContext);
  const {
    data: auctionWinner = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auctionWinner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recentWinners");
      return res?.data ? res.data : [];
    },
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO server");
    });
    socket.on("newWinner", (newWinnerData) => {
      refetch();
    });
    return () => {
      socket.off("newWinner");
    };
  }, [refetch]);

  if (loading || isLoading)
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        There is no data is loading!
        <button className="underline" onClick={() => refetch()}>
          Try Again
        </button>
      </p>
    );

  if (!auctionWinner.length)
    return (
      <p className="text-center text-gray-500 py-10">
        There are no recent winners yet!!
      </p>
    );

  return (
    <div>
      <div className="lg:py-5 mt-24 mb-8 space-y-2">
        <h2 className="text-center dark:text-[#4D55CC] lg:text-4xl text-3xl font-bold">
          Recent Winner
        </h2>
        <p className="text-center dark:text-white text-xl">
          From bidding to winning – see the latest success stories.
        </p>
      </div>
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {auctionWinner.map((winner) => (
          <article
            key={`${winner.productName}-${winner.winningTime}`}
            className="card card-compact bg-white dark:bg-transparent rounded-2xl transition-all duration-1000 hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]"

          >
            <img
              src={winner.productImage}
              alt={winner.productName}
              className="w-full h-40 object-cover rounded-lg mb-3 transition-transform duration-300 group-hover:scale-105"

            />

           <div className="px-4 ">
           <h3 className="font-semibold my-5 text-center text-2xl dark:text-white text-gray-800 ">
              {winner.productName}
            </h3>

            <p className="text-lg  text-gray-800 dark:text-white">
              Winner: <span className="font-medium">{winner.winner}</span>
            </p>

            <p className="text-lg text-gray-800 dark:text-white">
              Winning Bid:{" "}
              <span className="font-semibold text-blue-500 dark:text-blue-400">
                ${winner.winningBid}
              </span>
            </p>

            <p className="text-sm my-7 text-white text-center dark:text-black  border px-3 py-1 rounded-full bg-blue-400  dark:bg-blue-300 w-36">
              {dayjs(winner.winningTime).fromNow()}
            </p>
           </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default RecentWinner;
