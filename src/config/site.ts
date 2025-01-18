import { routes } from "@/lib/routes";
import { MainNavItem } from "@/types";
import { Bookmark, Calendar, ReceiptText, ShoppingBag, Ticket, User } from "lucide-react";

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
  accountNav: [
    {
      icon: User,
      title: "Profile",
      href: `/account/${routes.account.profile}`,
    },
    {
      icon: ReceiptText,
      title: "Reservations",
      href: `/account/${routes.account.books}`,
    },
    {
      icon: Bookmark,
      title: "Favorites",
      href: `/account/${routes.account.favorites}`,
    },
  ] satisfies MainNavItem[],
  dashboardNav: [
    {
      icon: Calendar,
      title: "Events",
      href: `/dashboard/${routes.dashboard.events.index}`,
    },
    {
      icon: Ticket,
      title: "Tickets",
      href: `/dashboard/${routes.dashboard.tickets.index}`,
    },
    {
      icon: ShoppingBag,
      title: "Orders",
      href: `/dashboard/${routes.dashboard.orders.index}`,
    },
    {
      icon: User,
      title: "Profile",
      href: `/dashboard/${routes.dashboard.profile.index}`,
    },
  ] satisfies MainNavItem[],
};
