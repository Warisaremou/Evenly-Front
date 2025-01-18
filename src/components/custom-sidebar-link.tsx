import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Link, useMatch, useResolvedPath } from "react-router";

export default function CustomSidebarLink({ item }: { item: NavItem }) {
  const resolvedPath = useResolvedPath(item.href);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link
      className={cn(
        "rounded-lg flex items-center font-body-medium gap-2 h-10 px-4 py-2.5 text-sm text-grey-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey-300 focus-visible:ring-offset-0 hover:bg-primary-100",
        isActive && "bg-primary-100 text-primary-300",
      )}
      to={item.href}
    >
      {item.icon && <item.icon className="size-5" />}
      {item.title}
    </Link>
  );
}
