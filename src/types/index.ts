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

// --------------------- CONTEXTS TYPES --------------------- //
export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  userData: User | null;
}

export interface EventContextType {
  eventID: string;
  setEventID: Dispatch<SetStateAction<string>>;
}

// --------------------- API RESPONSE TYPES --------------------- //
export interface ApiResponse {
  message: string;
  data: Ticket | Event | Order | User;
}

// --------------------- USER TYPES --------------------- //
export interface User {
  // id: string;
  email: string;
  firstname: string;
  lastname: string;
  organizer_name: string | null;
  role: "admin" | "organizer" | "user";
}

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
  date_time: string;
  categories: Category[];
  user: User;
}

// --------------------- TICKETS TYPES --------------------- //
export interface TicketType {
  id: string;
  name: string;
}
export interface Ticket {
  id: string;
  name: string;
  quantity: string;
  price: number;
  event: Event;
  ticket_type: TicketType;
}

// --------------------- ORDERS TYPES --------------------- //
export interface Order {
  id: string;
  ticket_id: string;
  user_id: string;
  is_canceled: boolean;
  is_expired: boolean;
}

// --------------------- CATEGORIES TYPES --------------------- //
export interface Category {
  id: string;
  name: string;
}
