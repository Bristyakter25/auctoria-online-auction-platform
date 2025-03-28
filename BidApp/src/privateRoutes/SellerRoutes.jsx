import { Navigate, useLocation } from "react-router-dom";
import useContextHooks from "../useHooks/useContextHooks";
import useSeller from "./useSeller";
// import useAdmin from "./useAdmin";

const SellerRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContextHooks();
  const [isSeller, isSellerLoading] = useSeller();
  if (loading || isSellerLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (user && isSeller) {
    return children;
  }

  // navigate to the login page
  return <Navigate to={"/login"} state={location.pathname} />;
};

export default SellerRoutes;
