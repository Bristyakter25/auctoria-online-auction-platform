import { Navigate, useLocation } from "react-router-dom";
import useContextHooks from "../useHooks/useContextHooks";
import useBuyer from "./useBuyer";


const BuyerRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContextHooks();
  const [isBuyer, isBuyerLoading] = useBuyer();
  if (loading || isBuyerLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (user && isBuyer) {
    return children;
  }

  // navigate to the login page
  return <Navigate to={"/login"} state={location.pathname} />;
};

export default BuyerRoutes;