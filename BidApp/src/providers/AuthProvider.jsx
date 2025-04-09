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
import useAxiosPublic from "../useHooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic()

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser); 
      //setLoading(false); // Stop loading after checking auth state
      if(currentUser){
        const userInfo = {email:currentUser?.email}
        axiosPublic.post('/jwt', userInfo)
        .then(res =>{
            if(res.data.token){
                localStorage.setItem('access-token', res.data.token)
                setUser(currentUser);
                setLoading(false)
            }
            console.log(res.data);
        }).catch(err =>{
            console.log(err);
        })

    }
    else{
        //todo
        localStorage.removeItem("access-token")
        setUser(currentUser);
        setLoading(false);
    }
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []);

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

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = (name,photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
