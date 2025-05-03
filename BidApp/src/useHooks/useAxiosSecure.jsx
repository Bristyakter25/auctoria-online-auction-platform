import axios from "axios";
import useContextHooks from "./useContextHooks";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useContextHooks();

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
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
