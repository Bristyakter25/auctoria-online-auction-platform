import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useContext(AuthContext);

  // requrest interceptor too add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      // console.log("request stoped interceptors", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      console.log("error from here");
      return Promise.reject(err);
    }
  );

  // interceptors for 401 & 403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      const status = err.response.status;
      // console.log("status error in the interceptors", status);
      if (status === 401 || status === 403) {
        await signOutUser();
        localStorage.removeItem("access-token");
        navigate("/login");
      }
      return Promise.reject(err);
    }

    // async (err) => {
    //   if ([401, 403].includes(error.response?.status)) {
    //     try {
    //       console.log("Interceptor triggering logout...");
    //       await signOutUser();
    //       localStorage.removeItem("access-token");
    //       navigate("/login", { replace: true });
    //     } catch (e) {
    //       console.error("Interceptor logout failed:", e);
    //     }
    //   }
    //   return Promise.reject(error);
    // }
  );
  return axiosSecure;
};

export default useAxiosSecure;
