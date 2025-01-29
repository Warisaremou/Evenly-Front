import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/${routes.auth.login}`} />;
  }

  if (isAuthenticated && location.pathname.includes(routes.auth.login || routes.auth.register)) {
    return <Navigate to={`/${routes.index}`} />;
  }

  return <Outlet />;
}
