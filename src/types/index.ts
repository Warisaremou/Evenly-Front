/* eslint-disable no-unused-vars */
import { AccountProfile, OrganizerProfile } from "@/lib/schemas/users";
import { Dispatch, SetStateAction } from "react";

export interface NavItem {
  title: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type searchParamsType = {
  place: string;
  category: string;
};

// --------------------- CONTEXTS TYPES --------------------- //
export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  userData: User | null;
}

export interface EventsContextType {
  events: EventsListingType[];
  isLoading: boolean;
}

// --------------------- STORES TYPES --------------------- //
export interface BookmarkStore {
  bookmarks: EventsListingType[];
  addToBookmarks: (data: EventsListingType) => void;
  removeFromBookmarks: (eventID: string) => void;
}

// --------------------- API RESPONSE TYPES --------------------- //
export interface ApiResponse {
  message: string;
  data: Ticket | Event | Order | User;
}

// --------------------- USER TYPES --------------------- //
export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  organizer_name: string | null;
  role: "admin" | "organizer" | "user";
}

export type UpdateProfile = Omit<OrganizerProfile, "email"> | Omit<AccountProfile, "email">;

// --------------------- ROLE TYPES --------------------- //
export interface Role {
  id: string;
  name: "admin" | "organizer" | "user";
}

// --------------------- EVENTS TYPES --------------------- //
export interface Event {
  id: string;
  cover: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  time: string;
  categories: Category[];
  user: User;
}

export type EventsListingType = Omit<Event, "user">;
export type EventDetailsType = Omit<Event, "user"> & { organizer_name: string } & { tickets: Ticket[] };

// --------------------- TICKETS TYPES --------------------- //
export interface TicketType {
  id: string;
  name: string;
}
export interface Ticket {
  id: string;
  name: string;
  quantity: number;
  price: number;
  event: Event;
  ticket_type_name: string;
}

// --------------------- ORDERS TYPES --------------------- //
export interface Order {
  id: string;
  ticket_id: string;
  user_id: string;
  is_canceled: boolean;
  is_expired: boolean;
}

export interface UserReservation {
  id: string;
  cover: string;
  user_id: string;
  ticket_id: string;
  event_title: string;
  event_date: Date;
  event_time: string;
  event_location: string;
  is_canceled: boolean;
}

export interface BookTicketPayload {
  ticket_id: string;
  quantity: number;
}

export type OrdersListingType = {
  order: UserReservation;
  ticket_number: number;
};

// --------------------- CATEGORIES TYPES --------------------- //
export interface Category {
  id: string;
  name: string;
}
