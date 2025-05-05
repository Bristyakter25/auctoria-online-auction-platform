import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // const signOutUser = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };
  // AuthContext-এ signOutUser ফাংশন আপডেট করুন
  const signOutUser = async () => {
    setLoading(true);
    try {
      // 1. প্রথমে Firebase থেকে সাইন আউট
      await signOut(auth);

      // 2. সরাসরি লোকাল স্টোরেজ ক্লিয়ার
      localStorage.removeItem("access-token");
      console.log("Token removed from localStorage (manual)");

      // 3. ইউজার স্টেট আপডেট
      setUser(null);

      return true;
    } catch (error) {
      console.error("Sign out error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const userInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    updateUserProfile,
  };
  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);
      // setLoading(false); // Stop loading after checking auth state
      if (currentUser) {
        const userInfo = { email: currentUser?.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
              setUser(currentUser);
              setLoading(false);
            }
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        localStorage.removeItem("access-token");
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
