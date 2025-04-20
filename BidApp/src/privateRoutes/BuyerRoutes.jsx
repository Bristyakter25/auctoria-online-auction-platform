import { Navigate, useLocation } from "react-router-dom";
import useContextHooks from "../useHooks/useContextHooks";
import useBuyer from "./useBuyer";
import LoadingSpinner from "../components/ShareComponents/LoadingSpinner ";


const BuyerRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContextHooks();
  const [isBuyer, isBuyerLoading] = useBuyer();
  if (loading || isBuyerLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user && isBuyer) {
    return children;
  }

  // navigate to the login page
  return <Navigate to={"/login"} state={location.pathname} />;
};

export default BuyerRoutes;