import CustomLink from "@/components/custom-link";
import Logo from "@/components/logo";
// import UserProfileDropdown from "@/components/user-profile-dropdown";
import { siteConfig } from "@/config/site";
import { Outlet } from "react-router";

export default function BoardLayout() {
  return (
    <div className="container flex flex-col min-h-screen w-full">
      {/* Navbar */}
      <nav className="flex flex-row items-center justify-between py-4">
        <Logo />

        <ul className="flex flex-row items-center gap-x-1 md:gap-x-4 w-full justify-center">
          {siteConfig.mainNav.map((item, index) => (
            <CustomLink
              item={item}
              key={`${index}-${item.title}`}
            />
          ))}
        </ul>

        <div className="flex gap-2">
          {/* <Button
            variant="default"
            asChild
          >
            <Link to={routes.auth.register}>Create Account</Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="border border-muted-foreground/15 max-sm:hidden"
          >
            <Link to={routes.auth.login}>Login</Link>
          </Button> */}
          {/* <UserProfileDropdown /> */}
        </div>
      </nav>

      {/* Children */}
      <Outlet />

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-secondary py-8">
        <Logo />
        <h4 className="text-sm">©2024_All Rights Reserved</h4>
      </div>
    </div>
  );
}
