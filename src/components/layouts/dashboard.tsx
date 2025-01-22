import Logo from "@/components/logo";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router";
import LogoutButton from "../logout-button";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="max-lg:hidden flex flex-col gap-9 items-center py-6 px-3.5 w-60 border-r border-grey-300">
        <Logo />
        <div className="space-y-10 w-full">
          <ul className="w-full gap-2 flex flex-col pb-4 border-b border-grey-300">
            {siteConfig.dashboardNav.map((item, index) => {
              const isActive = location.pathname.includes(item.href);
              return (
                <Link
                  key={`${index}-${item.title}`}
                  className={cn(
                    "rounded-lg flex items-center font-body-medium gap-2 h-10 px-4 py-2.5 text-sm text-grey-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grey-300 focus-visible:ring-offset-0 hover:bg-primary-100",
                    isActive && "bg-primary-100 text-primary-300",
                  )}
                  to={item.href}
                >
                  {item.icon && <item.icon className="size-5" />}
                  {item.title}
                </Link>
              );
            })}
          </ul>
          <LogoutButton />
        </div>
      </div>

      <div className="h-screen flex-1 overflow-y-scroll">
        {/* Header */}
        <header className="sticky top-0 flex items-center justify-between gap-3 border-b border-grey-300 bg-grey-100 px-5 py-3">
          <h3 className="font-heading-semibold text-grey-500">Empire Group</h3>
        </header>
        {/* Children */}
        <div className="w-full mx-auto max-w-[50rem] max-lg:container max-lg:py-5 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
