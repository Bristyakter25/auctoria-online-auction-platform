import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "hhttp://localhost:5000",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
