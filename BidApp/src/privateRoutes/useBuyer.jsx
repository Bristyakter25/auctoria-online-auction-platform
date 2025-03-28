

import { useQuery } from "@tanstack/react-query";
import useContextHooks from "../useHooks/useContextHooks";
import useAxiosSecure from "../useHooks/useAxiosSecure";

const useBuyer = () => {
  const { user, loading } = useContextHooks();
  const axiosSecure = useAxiosSecure();

  const { data: isBuyer, isPending: isBuyerLoadin } = useQuery({
    queryKey: [user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`user/buyer/${user.email}`);
      return res.data?.isBuyer;
    },
  });
  return [isBuyer, isBuyerLoadin];
};

export default useBuyer;