import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;

        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          createdAt: new Date(),
        };

        fetch("https://auctoria-online-auction-platform.onrender.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "User already exists") {
              console.log("User already exists in MongoDB.");
            } else {
              console.log("User stored in MongoDB:", data);
            }

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/login");
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            Swal.fire("Oops!", "Failed to save user.", "error");
          });
      })
      .catch((error) => {
        console.error("Error checking user:", error);
        Swal.fire("Oops!", "Error checking user in database.", "error");
      });
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center mt-4">
      <button
        onClick={handleGoogleSignIn}
        className="w-full px-4 py-3 text-black bg-sky-300 rounded-md hover:bg-sky-400 text-lg font-semibold flex items-center justify-center gap-2"
      >
        <span>
          <FaGoogle />
        </span>{" "}
        Sign up with Google
      </button>
    </div>
  );
};

export default SocialLogin;
