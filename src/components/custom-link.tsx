import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Link, useMatch, useResolvedPath } from "react-router";

export default function CustomLink({ item }: { item: NavItem }) {
  const resolvedPath = useResolvedPath(item.href);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link
      className={cn(
        "rounded-full px-4 py-2 text-sm text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/10 focus-visible:ring-offset-0 hover:bg-accent",
        isActive ? "bg-border font-bh-semibold" : "font-bh-medium hover:bg-accent",
      )}
      to={item.href}
    >
      {item.title}
    </Link>
  );
}
