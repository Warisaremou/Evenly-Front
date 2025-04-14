import Loader from "@/components/loaders/loader";
import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";

export default function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === `/${routes.auth.login}` || location.pathname === `/${routes.auth.register}`;

  useEffect(() => {
    const redirectAuthenticatedUser = () => {
      if (isAuthenticated && isAuthPage) {
        navigate(-1);
      }
    };

    redirectAuthenticatedUser();
  }, [navigate, isAuthPage, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (isAuthPage) {
      return <Outlet />;
    }
    return <Navigate to={routes.auth.login} />;
  }

  return <Outlet />;
}
