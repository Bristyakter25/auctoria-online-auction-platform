import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContextHooks from "../useHooks/useContextHooks";

const useSeller = () => {
  const { user, loading } = useContextHooks();
  const axiosSecure = useAxiosSecure();

  const { data: isSeller=[], isPending: isSellerLoading } = useQuery({
    queryKey: ["user/seller",user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`user/role/${user?.email}`);
      return res.data;
    },
  });
  console.log(isSeller, "isSeller");
  return [isSeller, isSellerLoading];
};

export default useSeller;
