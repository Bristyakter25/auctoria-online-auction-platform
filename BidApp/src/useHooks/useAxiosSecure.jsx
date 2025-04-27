import axios from "axios";
import useContextHooks from "./useContextHooks";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "hhttp://localhost:5000",
});
const useAxiosSecure = () => {
  const naviate = useNavigate();
  const { signOutUser } = useContextHooks();

  // requrest interceptor too add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    (config) => {
      // sent token with the interceptors request from local storage
      const token = localStorage.getItem("access-token");
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
      if (status === 401 || status === 403) {
        await signOutUser();
        naviate("/login");
      }
      return Promise.reject(err);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
