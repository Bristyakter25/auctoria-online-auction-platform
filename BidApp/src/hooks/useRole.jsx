import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContextHooks from "../useHooks/useContextHooks";


const useRole = () => {
    const { user, loading } = useContextHooks();
    const axiosSecure = useAxiosSecure();
    
    const { data: userRole = [], isLoading} = useQuery({
        queryKey: ["role", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user?.email}`);
            return res.data;
        },
    });
    console.log(userRole, "userRole");
    const role=userRole?.role;
    return [role, isLoading];
};

export default useRole;