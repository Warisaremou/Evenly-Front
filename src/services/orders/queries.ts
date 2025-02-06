import api from "@/lib/axios-instance";
import { ApiResponse, BookTicketPayload, Order, UserReservation } from "@/types";

/**
 * Query to get user reservations
 *
 * @returns Promise<OrdersListingType[]> - List of bookings
 */
export const getUserReservations = async (): Promise<UserReservation[]> => {
  const response = await api.get("/orders/user/reservations").then((res) => res);
  return response.data;
};

/**
 * Query to get organizer tickets orders
 *
 * @returns Promise<OrdersListingType[]> - List of orders
 */
export const getOrganizerTicketsOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders/events_order").then((res) => res);
  return response.data;
};

/**
 * Query to book tickets
 *
 * @param {BookTicketPayload} payload - Book ticket payload
 * @returns Promise<ApiResponse> - Api response
 */
export const bookTickets = async (payload: BookTicketPayload): Promise<ApiResponse> => {
  const response = await api.post("/orders", payload).then((res) => res);
  return response.data;
};

/**
 * Query to cancel order
 *
 * @param {string} order_id - Order id
 * @returns Promise<ApiResponse> - Api response
 */
export const cancelOrder = async (order_id: string): Promise<ApiResponse> => {
  const response = await api.patch(`/orders/${order_id}/cancel`).then((res) => res);
  return response.data;
};
