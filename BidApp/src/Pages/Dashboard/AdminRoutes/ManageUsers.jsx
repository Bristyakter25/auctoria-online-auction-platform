import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("https://auctoria-online-auction-platform.onrender.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://auctoria-online-auction-platform.onrender.com/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "The user has been removed.", "success");
              fetchUsers(); // Refresh the user list
            } else {
              Swal.fire("Error!", "User could not be deleted.", "error");
            }
          })
          .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Photo</th>
              <th className="border border-gray-400 px-4 py-2">Role</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-400 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.role === "admin" ? (
                    <span className="text-gray-500 italic">
                      Can't delete admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded"
                    >
                      Delete User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
