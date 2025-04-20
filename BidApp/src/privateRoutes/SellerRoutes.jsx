import { Navigate, useLocation } from "react-router-dom";
import useContextHooks from "../useHooks/useContextHooks";
import useSeller from "./useSeller";
import LoadingSpinner from "../components/ShareComponents/LoadingSpinner ";
// import useAdmin from "./useAdmin";

const SellerRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContextHooks();
  const [isSeller, isSellerLoading] = useSeller();
  if (loading || isSellerLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user && isSeller) {
    return children;
  }

  // navigate to the login page
  return <Navigate to={"/login"} state={location.pathname} />;
};

export default SellerRoutes;
