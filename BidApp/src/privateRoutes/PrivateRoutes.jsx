import { Navigate, useLocation } from "react-router-dom";
import useContextHooks from "../useHooks/useContextHooks";
import LoadingSpinner from "../components/ShareComponents/LoadingSpinner ";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContextHooks();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoutes;
