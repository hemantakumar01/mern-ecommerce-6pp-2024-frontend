import { ReactElement } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

interface proptype {
  isAuthanticated: boolean;
  adminOnly?: boolean;
  children?: ReactElement;
  admin?: boolean;
  redirect?: string;
}

const ProctedRoute = ({
  isAuthanticated,
  adminOnly,
  children,
  admin,
  redirect = "/",
}: proptype) => {
  //   const navigate = useNavigate();
  if (!isAuthanticated) {
    toast.error("Login First");
    return <Navigate to={redirect} />;
  }
  if (adminOnly && !admin) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProctedRoute;
