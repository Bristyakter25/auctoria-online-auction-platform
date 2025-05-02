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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow-md flex w-full max-w-5xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/3 bg-blue-50 dark:bg-gray-800 p-6 flex flex-col items-center">
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
              className="mt-4 w-full border dark:border-gray-600 p-2 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          )}
          <h2 className="text-xl font-bold mt-4">{formData.name}</h2>
          <p className="text-gray-500 dark:text-gray-300">{user?.email}</p>
          <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
            Member Since: 01 May 2025
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-2/3 p-8">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              ) : (
                <p className="p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white">
                  {formData.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white border p-2 rounded-lg cursor-not-allowed"
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
