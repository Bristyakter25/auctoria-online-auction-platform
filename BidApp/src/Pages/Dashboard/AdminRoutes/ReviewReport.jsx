import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

// Fetch reports from the server
const fetchReports = async () => {
  const response = await axios.get("https://auctoria-online-auction-platform.onrender.com/report");
  return response.data;
};

// Delete a report by ID
const deleteReport = async (id) => {
  await axios.delete(`https://auctoria-online-auction-platform.onrender.com/report/${id}`);
};

// Delete a product by ID
const deleteProduct = async (id) => {
  await axios.delete(`https://auctoria-online-auction-platform.onrender.com/products/${id}`);
};

const ReviewReport = () => {
  const queryClient = useQueryClient();
  const [approvedReports, setApprovedReports] = useState([]);

  // Fetch reports
  const { data: reports, error, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  // Mutation: Delete report
  const { mutate: deleteReportMutation } = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries(["reports"]);
      Swal.fire("Deleted!", "The report has been rejected.", "success");
    },
    onError: (err) => {
      console.error("Error deleting report:", err.message);
      Swal.fire("Error", "Something went wrong while deleting report.", "error");
    },
  });

  // Mutation: Delete product
  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["reports"]);
      Swal.fire("Approved!", "The product has been deleted.", "success");
    },
    onError: (err) => {
      console.error("Error deleting product:", err.message);
      Swal.fire("Error", "Could not delete product.", "error");
    },
  });

  // Reject report
  const handleDeleteConfirm = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this report. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReportMutation(id);
      }
    });
  };

  // Approve report: delete product
  const handleApproveReport = (productId, reportId) => {
    Swal.fire({
      title: "Approve this report?",
      text: "This will delete the associated product permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete product!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductMutation(productId);
        setApprovedReports((prev) => [...prev, reportId]); // Track approved reports
      }
    });
  };

  if (isLoading)
    return <p className="text-center dark:text-white">Loading reports...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Error fetching reports: {error.message}
      </p>
    );

  return (
    <div className="py-6 px-2 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Review Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          No review reports found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm dark:text-white">
            <thead>
              <tr className="bg-gray-200 dark:text-white dark:bg-gray-700">
                <th>#</th>
                <th className="font-bold text-base">Product Name</th>
                <th className="font-bold text-base">Product Image</th>
                <th className="font-bold text-base">User Email</th>
                <th className="font-bold text-base">Reason</th>
                <th className="font-bold text-base">Date</th>
                <th className="font-bold text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr
                  key={report._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td>{index + 1}</td>
                  <td className="font-semibold text-[14px]">
                    {report.productName}
                  </td>
                  <td>
                    <img
                      className="w-[100px] h-[70px] object-cover"
                      src={report.productImage}
                      alt="Product"
                    />
                  </td>
                  <td className="font-semibold text-[14px]">
                    {report.userEmail}
                  </td>
                  <td className="font-semibold text-[14px]">{report.reason}</td>
                  <td className="font-semibold text-[14px]">
                    {new Date(report.reportedAt).toLocaleString()}
                  </td>
                  <td className="font-semibold flex items-center py-7 justify-center text-[14px] gap-2">
                    <button
                      onClick={() =>
                        handleApproveReport(report.productId, report._id)
                      }
                      className="btn btn-warning p-3 btn-sm"
                      disabled={approvedReports.includes(report._id)} // Disable if already approved
                    >
                      {approvedReports.includes(report._id)
                        ? "Approved"
                        : "Approve Report"}
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(report._id)}
                      className="btn bg-red-400 hover:bg-red-600 hover:text-white p-3 btn-sm"
                    >
                      Reject Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewReport;
