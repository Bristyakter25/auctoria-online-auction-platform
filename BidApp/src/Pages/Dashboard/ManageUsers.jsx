import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch("https://auctoria-online-auction-platform.onrender.com/users") 
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error fetching users:", error));
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Photo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <img src={user.photoURL} alt={user.name} className="w-12 h-12 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default ManageUsers;