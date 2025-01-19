import CustomSidebarLink from "@/components/custom-sidebar-link";
import Logo from "@/components/logo";
import { siteConfig } from "@/config/site";
import { Outlet } from "react-router";
import LogoutButton from "../logout-button";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="max-lg:hidden flex flex-col gap-9 items-center py-6 px-3.5 w-60 border-r border-grey-300">
        <Logo />
        <div className="space-y-10 w-full">
          <ul className="w-full gap-2 flex flex-col pb-4 border-b border-grey-300">
            {siteConfig.dashboardNav.map((item, index) => (
              <CustomSidebarLink
                item={item}
                key={`${index}-${item.title}`}
              />
            ))}
          </ul>
          <LogoutButton />
        </div>
      </div>

      <div className="h-screen flex-1 overflow-y-scroll">
        {/* Header */}
        <header className="sticky top-0 flex items-center justify-between gap-3 border-b border-grey-300 bg-grey-100 px-5 py-2.5">
          <h3 className="font-body-medium text-grey-500">Empire Group</h3>
        </header>
        {/* Children */}
        <div className="w-full mx-auto max-w-[50rem] max-md:container max-md:py-5 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
