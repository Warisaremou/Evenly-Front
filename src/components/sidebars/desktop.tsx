import Logo from "@/components/logo";
import LogoutButton from "@/components/logout-button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

export default function DesktopSidebar({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <div className={cn("flex flex-col gap-9 items-center", className)}>
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
  );
}
