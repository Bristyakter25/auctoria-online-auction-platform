import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContextHooks from "../useHooks/useContextHooks";

const useSeller = () => {
  const { user, loading } = useContextHooks();
  const axiosSecure = useAxiosSecure();

  const { data: isSeller = [], isPending: isSellerLoading } = useQuery({
    queryKey: ["isSeller", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      // const res = await axiosSecure.get(`user/role/${user?.email}`);
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      console.log("user seller role", res.data);
      return res.data?.seller;
    },
  });
  console.log(isSeller, "isSeller");
  return [isSeller, isSellerLoading];
};

export default useSeller;
