import CustomLink from "@/components/custom-link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserProfileDropdown from "@/components/user-profile-dropdown";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { User } from "@/types";
import { Link, Outlet } from "react-router";

export default function BoardLayout() {
  const { isAuthenticated, userData, isLoading } = useAuth();

  return (
    <div className="container flex flex-col min-h-screen w-full gap-10 md:gap-14">
      {/* Navbar */}
      <nav className="flex flex-row items-center justify-between py-4 bg-grey-100">
        <Logo />

        <div className="flex flex-row items-center gap-x-1 md:gap-x-4 w-full justify-center">
          {siteConfig.mainNav.map((item, index) => (
            <CustomLink
              item={item}
              key={`${index}-${item.title}`}
            />
          ))}
        </div>

        <>
          {isLoading ? (
            <Skeleton className="w-32 h-10" />
          ) : isAuthenticated ? (
            displayUserAction(userData)
          ) : (
            <div className="flex gap-2">
              <Button
                variant="primary"
                asChild
              >
                <Link to={routes.auth.register}>Create account</Link>
              </Button>
              <Button
                variant="secondary"
                asChild
                className="max-sm:hidden"
              >
                <Link to={routes.auth.login}>Login</Link>
              </Button>
            </div>
          )}
        </>
      </nav>

      {/* Children */}
      <div className="flex-1 h-full">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="flex max-md:flex-col items-center justify-center border-t border-grey-300 py-5 lg:py-12 px-5 max-md:gap-2 gap-16">
        <span className="text-xs">Privacy Policy</span>
        <span className="text-xs">Terms of Service</span>
        <span className="text-xs">© 2025 Evenly. All Rights Reserved.</span>
      </div>
    </div>
  );
}

const displayUserAction = (userData: User | null) => {
  if (userData?.role === "organizer") {
    return (
      <Button
        variant="secondary"
        asChild
      >
        <Link to={`/dashboard/${routes.dashboard.events.index}`}>Dashboard</Link>
      </Button>
    );
  } else {
    return <UserProfileDropdown userData={userData!} />;
  }
};
