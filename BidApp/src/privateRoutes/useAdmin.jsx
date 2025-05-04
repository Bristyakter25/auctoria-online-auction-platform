import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContextHooks from "../useHooks/useContextHooks";

const useAdmin = () => {
  const { user, loading } = useContextHooks();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin = [], isPending: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      console.log("admin data", res.data);
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
