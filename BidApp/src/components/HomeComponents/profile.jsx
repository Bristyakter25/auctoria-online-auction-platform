import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      // Update name and profile picture
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      console.log("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6  shadow-md rounded-lg mt-20">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      <div className="flex flex-col items-center">
        <img
          src={formData.photoURL || "/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
        />
        {editMode && (
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            placeholder="Profile Picture URL"
            className="border p-2 w-full mb-2"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p className="p-2 border rounded-md">{formData.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <p className="p-2 border rounded-md ">{user?.email}</p>{" "}
        {/* Email is non-editable */}
      </div>
      <div className="flex justify-end">
        {editMode ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;

// import { useContext, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import { updateProfile, updateEmail } from "firebase/auth";

// const Profile = () => {
//     const { user } = useContext(AuthContext);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({
//         name: user?.displayName || "",
//         email: user?.email || "",
//         photoURL: user?.photoURL || ""
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         if (!user) return;

//         try {
//             // Update name and photo URL
//             await updateProfile(user, {
//                 displayName: formData.name,
//                 photoURL: formData.photoURL
//             });

//             console.log("Profile updated successfully");

//             // Update email separately
//             if (formData.email !== user.email) {
//                 await updateEmail(user, formData.email);
//                 console.log("Email updated successfully");
//             }

//             setEditMode(false);
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             alert("Failed to update profile. Please try again.");
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
//             <div className="flex flex-col items-center">
//                 <img
//                     src={formData.photoURL || "/default-profile.png"}
//                     alt="Profile"
//                     className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
//                 />
//                 {editMode && (
//                     <input
//                         type="text"
//                         name="photoURL"
//                         value={formData.photoURL}
//                         onChange={handleChange}
//                         placeholder="Profile Picture URL"
//                         className="border p-2 w-full mb-2"
//                     />
//                 )}
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700">Name:</label>
//                 {editMode ? (
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="border p-2 w-full"
//                     />
//                 ) : (
//                     <p className="p-2 border rounded-md">{formData.name}</p>
//                 )}
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700">Email:</label>
//                 {editMode ? (
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="border p-2 w-full"
//                     />
//                 ) : (
//                     <p className="p-2 border rounded-md bg-gray-100">{formData.email}</p>
//                 )}
//             </div>
//             <div className="flex justify-end">
//                 {editMode ? (
//                     <button
//                         onClick={handleSave}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                     >
//                         Save
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => setEditMode(true)}
//                         className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                     >
//                         Edit
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Profile;
