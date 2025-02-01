import Loader from "@/components/loaders/loader";
import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname.includes(routes.auth.login || routes.auth.register);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isAuthenticated && isAuthPage) {
    navigate(-1);
  }

  // if (!isAuthenticated && !isAuthPage) {
  //   return <Navigate to={routes.auth.login} />;
  // }

  return <Outlet />;
}
