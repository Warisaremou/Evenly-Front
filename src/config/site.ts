import { routes } from "@/lib/routes";
import { MainNavItem } from "@/types";

export const siteConfig = {
  name: "Evenly",
  description: "Event manager platforme",
  url: "website_url",
  mainNav: [
    {
      title: "Home",
      href: routes.index,
    },
    {
      title: "Events",
      href: routes.events.index,
    },
  ] satisfies MainNavItem[],
};
