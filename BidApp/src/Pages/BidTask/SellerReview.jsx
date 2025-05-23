import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const SellerReview = ({ sellerEmail, sellerId }) => {
  console.log("seller email and id", sellerEmail, sellerId);
  const axiosPublic = UseAxiosPublic();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);

  // const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // console.log("review data", reviews);
  const reviewMutation = useMutation({
    mutationFn: (data) =>
      axiosPublic.post("/reviews", data).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("reviews");
      if (data.insertedId) {
        // setReviews((prev) => [...prev, newReview]);
        toast.success("Review added!");
        setRating(0);
        setComment("");
      }
    },
    onError: (error) => {
      toast.warning(error?.response?.data?.error || "Failed to submit review");
    },
  });

  const newReview = {
    sellerId: sellerId,
    sellerEmail: sellerEmail,
    reviewerEmail: user?.email,
    reviewerName: user?.displayName,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };
  // console.log("reviews data", newReview);
  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      return toast.error("Please rate and comment.");
    }
    reviewMutation.mutate(newReview);
    // refetch();
  };
  //   const email = sellerEmail;
  const { data: clientReviews = [], refetch } = useQuery({
    queryKey: ["clientReviews", sellerEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${sellerEmail}`);
      console.log("sellerEmail", res.data);
      return res.data;
    },
    enabled: !!sellerEmail,
  });
  console.log("review data", clientReviews);

  return (
    <div className="w-full lg:flex justify-between gap-4 space-y-3 lg:space-y-0 ">
      <div className=" lg:w-7/12 dark:text-white text-gray-700">
        <h3 className="text-2xl font-semibold mb-4">All Reviews</h3>
        {/* <div className="divider"></div> */}
        {clientReviews.length > 0 ? (
          <div className="space-y-4">
            {clientReviews.map((review, index) => (
              <div
                key={index}
                className=" rounded-md flex items-center bg-white/10 shadow-md "
              >
                <div className="w-full p-3 mx-3">
                  <div>
                    <FaCircleUser
                      size={36}
                      className="text-gray-500 items-center"
                    />
                  </div>
                  <div className="flex items-center justify-between ml-6">
                    <p className="font-semibold ">{review.reviewerName}</p>
                    <div className="flex text-yellow-400 ">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm  mt-1 ml-6">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1 ml-6">
                    {review.createdAt
                      ? formatDate(review?.createdAt)
                      : "Loading..."}
                  </p>
                  {/* Admin reply section */}
                  {review.adminReply && (
                    <div className="flex items-start mt-4 ml-5 bg-blue-200 p-3 rounded-lg">
                      <FaCircleUser size={25} className="text-gray-500 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-700">Admin</p>
                        <p className="text-sm text-gray-600">
                          {review.adminReply}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="dark:text-white text-gray-700">No reviews yet.</p>
        )}
      </div>
      <div className="lg:w-5/12 h-[400px] dark:text-white text-gray-700 p-6 rounded-xl shadow-lg bg-white/10">
        <h2 className="text-2xl font-bold mb-4 text-center ">Seller Reviews</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 ">Your Rating*</h3>
          <div className="flex items-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                whileTap={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              </motion.div>
            ))}
          </div>
          <textarea
            className="textarea textarea-bordered w-full mb-2 lg:mt-4 bg-white/10"
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn w-full bg-blue-500 hover:bg-blue-600 mt-5 border-none"
            onClick={handleSubmit}
          >
            Submit Review
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SellerReview;
