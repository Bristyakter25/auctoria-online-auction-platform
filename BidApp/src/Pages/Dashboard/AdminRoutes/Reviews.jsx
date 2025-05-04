import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchReviews = async () => {
  const response = await axios.get("https://auctoria-online-auction-platform.onrender.com/reviews");
  return response.data;
};

const Reviews = () => {
  const [replyModal, setReplyModal] = useState({
    isOpen: false,
    reviewId: null,
    email: "",
    name: "",
  });
  const [replyMessage, setReplyMessage] = useState("");

  const {
    data: reviews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error fetching reviews: {error.message}</p>;

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`https://auctoria-online-auction-platform.onrender.com/reviews/${id}`);
      alert("Review deleted.");
      refetch();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete the review.");
    }
  };

  const handleReply = (reviewId, email, name) => {
    setReplyModal({ isOpen: true, reviewId, email, name });
  };

  const submitReply = async () => {
    if (!replyMessage) return alert("Please enter a reply message.");

    try {
      await axios.patch(
        `https://auctoria-online-auction-platform.onrender.com/reviews/${replyModal.reviewId}`,
        {
          adminReply: replyMessage,
        }
      );

      alert("Reply saved.");
      setReplyModal({ isOpen: false, reviewId: null, email: "", name: "" });
      setReplyMessage("");
      refetch();
    } catch (err) {
      console.error("Reply failed", err);
      alert("Failed to send reply.");
    }
  };

  return (
    <div className="p-5 dark:bg-gray-800 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-6">User Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-center text-lg">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-black dark:text-white">
            <thead className="bg-gray-200 dark:text-white dark:bg-gray-700">
              <tr>
                <th>#</th>
                <th className="font-bold text-lg">User</th>
                <th className="font-bold text-lg">Rating</th>
                <th className="font-bold text-lg">Comment</th>
                <th className="font-bold text-lg">Date</th>
                <th className="font-bold text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={review._id}
                  className={
                    index % 2 === 0 ? "bg-white dark:bg-gray-600" : "bg-gray-100 dark:bg-gray-700"
                  }
                >
                  <td>{index + 1}</td>
                  <td>{review.reviewerName || "Anonymous"}</td>
                  <td>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </td>
                  <td>
                    {review.comment}
                    {review.adminReply && (
                      <p className="text-sm text-blue-600 mt-2 font-semibold">
                        Admin Reply: {review.adminReply}
                      </p>
                    )}
                  </td>
                  <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        handleReply(
                          review._id,
                          review.reviewerEmail,
                          review.reviewerName
                        )
                      }
                      className="btn btn-info btn-sm"
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {replyModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Reply to {replyModal.name || "User"}</h3>
            <textarea
              className="textarea textarea-bordered w-full mb-4 dark:bg-gray-600 dark:text-white"
              rows="4"
              placeholder="Enter your reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setReplyModal({ isOpen: false })}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
              <button onClick={submitReply} className="btn btn-primary btn-sm">
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
