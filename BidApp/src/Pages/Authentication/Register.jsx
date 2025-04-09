import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";



 
import { useContext, useRef } from "react";
import { AuthContext } from "../../providers/AuthProvider";

import auctionImage from "../../assets/auction-image.svg"; 
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";



const Register = () => {
  const navigate = useNavigate();

  const {createUser,updateUserProfile} = useContext(AuthContext);

  const emailRef = useRef()

  const handleRegister = (e) => {
    e.preventDefault();
  
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;
  
    console.log(name, email, password, photoURL);
  
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
  
        updateUserProfile(name, photoURL)
          .then(() => {
            console.log("User profile updated successfully");
  
            // send verification email
            sendEmailVerification(auth.currentUser)
            .then(() =>{
              console.log("email verification send")
            })


            const userData = {
              name,
              email,
              photoURL,
              uid: loggedUser.uid, 
              createdAt: new Date(),
            };
  
            
            fetch("http://localhost:5000/users", {
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
  
                // Step 3: Show success message and navigate
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/login");
              })
              .catch((error) => {
                console.error("Error storing user:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Failed to store user in database!",
                });
              });
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to update user profile!",
            });
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to create user!",
        });
      });
  };

  const handleForgetPassword =() => {
    console.log(emailRef.current.value);
    const email = emailRef.current.value;
    if(!email){
      alert("please provide valid email address first");
    }
    else{
      sendPasswordResetEmail(auth,email)
      .then(()=>{
        alert('Password Reset email is sent please check your email');
      })
      
    }

  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-full min-h-screen bg-white px-10 overflow-hidden">
        {/* Left Side Image */}
        <div className="w-1/2">
          <img
            src={auctionImage}
            alt="Auction Platform"
            className="w-full h-full object-center md:object-center"
          />
        </div>

        {/* Right Side Register Form */}
        <motion.div

    

          initial={{ opacity: 0, y: -600 }}

          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-1/2 p-12 space-y-6 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Create an Auction Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">

      

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"

                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your full name"
                name="name"
                required
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"

                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                ref={emailRef}
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"

                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Create a password"
                name="password"

                required
              />
            </div>

            <div className="form-control">
            <label  className="block text-sm font-medium text-gray-600">
              Photo URL
            </label>
          <input
            type="url"
            name="photoURL"
            placeholder="Enter your PhotoUrl"
            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div onClick={handleForgetPassword}><a className="link link-hover">Forgot password?</a></div>
            <button
              type="submit"

              className="w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 text-lg"

              
            >
              Register
            </button>
          </form>
          <div className="flex items-center justify-between mt-4">
            <hr className="w-1/3 border-gray-300" />
            <span className="text-gray-500">or</span>
            <hr className="w-1/3 border-gray-300" />
          </div>
          <SocialLogin></SocialLogin>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 hover:underline font-semibold"

            >
              Login
            </Link>
          </p>
         
        </motion.div>
        
      </div>
    </div>
  );
};

export default Register;
