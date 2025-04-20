// useAxiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://auctoria-online-auction-platform.onrender.com",
});
// console.log(object);

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
