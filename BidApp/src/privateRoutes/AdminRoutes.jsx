import { Navigate, useLocation } from "react-router-dom";
import useContextHooks from "../useHooks/useContextHooks";
import useAdmin from "./useAdmin";
import LoadingSpinner from "../components/ShareComponents/LoadingSpinner ";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContextHooks();
  const [isAdmin, isAdminLoading] = useAdmin();
  if (loading || isAdminLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user && isAdmin) {
    return children;
  }

  // navigate to the login page
  return <Navigate to={"/login"} state={location.pathname} />;
};

export default AdminRoutes;
