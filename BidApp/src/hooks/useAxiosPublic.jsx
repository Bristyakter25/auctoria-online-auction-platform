// useAxiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "hhttp://localhost:5000",
  // baseURL: "hhttp://localhost:5000",
});
// console.log(object);

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
