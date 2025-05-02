// import { useContext, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import { updateProfile } from "firebase/auth";

// const Profile = () => {
//   const { user } = useContext(AuthContext);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.displayName || "",
//     photoURL: user?.photoURL || "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     if (!user) return;

//     try {
//       // Update name and profile picture
//       await updateProfile(user, {
//         displayName: formData.name,
//         photoURL: formData.photoURL,
//       });

//       console.log("Profile updated successfully");
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6  shadow-md rounded-lg mt-20">
//       <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
//       <div className="flex flex-col items-center">
//         <img
//           src={formData.photoURL || "/default-profile.png"}
//           alt="Profile"
//           className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
//         />
//         {editMode && (
//           <input
//             type="text"
//             name="photoURL"
//             value={formData.photoURL}
//             onChange={handleChange}
//             placeholder="Profile Picture URL"
//             className="border p-2 w-full mb-2"
//           />
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Name:</label>
//         {editMode ? (
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         ) : (
//           <p className="p-2 border rounded-md">{formData.name}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email:</label>
//         <p className="p-2 border rounded-md ">{user?.email}</p>{" "}
//         {/* Email is non-editable */}
//       </div>
//       <div className="flex justify-end">
//         {editMode ? (
//           <button
//             onClick={handleSave}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Save
//           </button>
//         ) : (
//           <button
//             onClick={() => setEditMode(true)}
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

// // import { useContext, useState } from "react";
// // import { AuthContext } from "../../providers/AuthProvider";
// // import { updateProfile, updateEmail } from "firebase/auth";

// // const Profile = () => {
// //     const { user } = useContext(AuthContext);
// //     const [editMode, setEditMode] = useState(false);
// //     const [formData, setFormData] = useState({
// //         name: user?.displayName || "",
// //         email: user?.email || "",
// //         photoURL: user?.photoURL || ""
// //     });

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSave = async () => {
// //         if (!user) return;

// //         try {
// //             // Update name and photo URL
// //             await updateProfile(user, {
// //                 displayName: formData.name,
// //                 photoURL: formData.photoURL
// //             });

// //             console.log("Profile updated successfully");

// //             // Update email separately
// //             if (formData.email !== user.email) {
// //                 await updateEmail(user, formData.email);
// //                 console.log("Email updated successfully");
// //             }

// //             setEditMode(false);
// //         } catch (error) {
// //             console.error("Error updating profile:", error);
// //             alert("Failed to update profile. Please try again.");
// //         }
// //     };

// //     return (
// //         <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
// //             <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
// //             <div className="flex flex-col items-center">
// //                 <img
// //                     src={formData.photoURL || "/default-profile.png"}
// //                     alt="Profile"
// //                     className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
// //                 />
// //                 {editMode && (
// //                     <input
// //                         type="text"
// //                         name="photoURL"
// //                         value={formData.photoURL}
// //                         onChange={handleChange}
// //                         placeholder="Profile Picture URL"
// //                         className="border p-2 w-full mb-2"
// //                     />
// //                 )}
// //             </div>
// //             <div className="mb-4">
// //                 <label className="block text-gray-700">Name:</label>
// //                 {editMode ? (
// //                     <input
// //                         type="text"
// //                         name="name"
// //                         value={formData.name}
// //                         onChange={handleChange}
// //                         className="border p-2 w-full"
// //                     />
// //                 ) : (
// //                     <p className="p-2 border rounded-md">{formData.name}</p>
// //                 )}
// //             </div>
// //             <div className="mb-4">
// //                 <label className="block text-gray-700">Email:</label>
// //                 {editMode ? (
// //                     <input
// //                         type="email"
// //                         name="email"
// //                         value={formData.email}
// //                         onChange={handleChange}
// //                         className="border p-2 w-full"
// //                     />
// //                 ) : (
// //                     <p className="p-2 border rounded-md bg-gray-100">{formData.email}</p>
// //                 )}
// //             </div>
// //             <div className="flex justify-end">
// //                 {editMode ? (
// //                     <button
// //                         onClick={handleSave}
// //                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
// //                     >
// //                         Save
// //                     </button>
// //                 ) : (
// //                     <button
// //                         onClick={() => setEditMode(true)}
// //                         className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
// //                     >
// //                         Edit
// //                     </button>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Profile;


// import { useContext, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import { updateProfile } from "firebase/auth";
// import { motion } from "framer-motion";
// import { FiEdit2, FiSave } from "react-icons/fi";

// const Profile = () => {
//   const { user } = useContext(AuthContext);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.displayName || "",
//     photoURL: user?.photoURL || "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     if (!user) return;

//     try {
//       await updateProfile(user, {
//         displayName: formData.name,
//         photoURL: formData.photoURL,
//       });
//       console.log("Profile updated");
//       setEditMode(false);
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Update failed. Try again.");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="max-w-xl mx-auto mt-16 p-8 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl"
//     >
//       <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
//         Profile Settings
//       </h2>

//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         className="flex justify-center mb-6"
//       >
//         <img
//           src={formData.photoURL || "/default-profile.png"}
//           alt="Profile"
//           className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md transition-transform duration-300"
//         />
//       </motion.div>

//       {editMode && (
//         <input
//           type="text"
//           name="photoURL"
//           value={formData.photoURL}
//           onChange={handleChange}
//           placeholder="Image URL"
//           className="mb-4 w-full border border-gray-300 p-2 rounded-lg"
//         />
//       )}

//       <div className="mb-4">
//         <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
//           Name:
//         </label>
//         {editMode ? (
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded-lg"
//           />
//         ) : (
//           <p className="p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
//             {formData.name}
//           </p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
//           Email:
//         </label>
//         <p className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white">
//           {user?.email}
//         </p>
//       </div>

//       <div className="flex justify-end">
//         {editMode ? (
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleSave}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             <FiSave />
//             Save
//           </motion.button>
//         ) : (
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setEditMode(true)}
//             className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
//           >
//             <FiEdit2 />
//             Edit
//           </motion.button>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Profile;



import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: formData.name,
        displayEmail: formData.email,
        photoURL: formData.photoURL,
      });
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md flex w-full max-w-5xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/3 bg-blue-50 p-6 flex flex-col items-center">
          <img
            src={formData.photoURL || "/default-profile.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          {editMode && (
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Image URL"
              className="mt-4 w-full border p-2 rounded-lg"
            />
          )}
          <h2 className="text-xl font-bold mt-4">{formData.name}</h2>
          <p className="text-gray-500">{user?.email}</p>

          <p className="text-sm mt-4 text-gray-600">
            Member Since: 01 May 2025
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-2/3 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              ) : (
                <p className="p-2 border rounded-lg bg-gray-100">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email}
                
                className="w-full bg-gray-100 border p-2 rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            {editMode ? (
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
              >
                Update Profile
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
