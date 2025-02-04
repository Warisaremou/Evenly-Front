import CustomSidebarLink from "@/components/custom-sidebar-link";
import { siteConfig } from "@/config/site";
import { Outlet } from "react-router";

export default function AccountLayout() {
  return (
    <div className="flex max-lg:flex-col lg:items-start gap-5">
      {/* Sidebar */}
      <ul className="max-md:gap-0.5 max-md:[&>a]:px-3 max-md:[&>a]:w-full max-lg:pb-2.5 lg:pr-2.5 lg:max-w-64 w-full flex lg:flex-col max-lg:border-b lg:border-r border-grey-300 gap-2">
        {siteConfig.accountNav.map((item, index) => (
          <CustomSidebarLink
            item={item}
            key={`${index}-${item.title}`}
          />
        ))}
      </ul>

      {/* Children */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
