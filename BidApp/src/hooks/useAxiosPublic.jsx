// useAxiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://auctoria-online-auction-platform.onrender.com",
  // baseURL: "https://auctoria-online-auction-platform.onrender.com",
});
// console.log(object);

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
