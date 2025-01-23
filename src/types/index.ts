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

// --------------------- API RESPONSE TYPES --------------------- //
export interface ApiResponse {
  message: string;
}

// --------------------- EVENTS TYPES --------------------- //
export interface Event {
  id: string;
  cover: string;
  title: string;
  description: string;
  location: string;
  date_time: string;
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
