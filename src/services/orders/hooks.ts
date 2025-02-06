import { ordersKeys } from "@/services/orders/keys";
import { bookTickets, cancelOrder, getOrganizerTicketsOrders, getUserReservations } from "@/services/orders/queries";
import { BookTicketPayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

// --------------- QUERIES HOOKS --------------- //
export const useUserReservations = () => {
  return useQuery({
    queryKey: ordersKeys.userReservations,
    queryFn: getUserReservations,
  });
};

export const useOrganizerTicketsOrders = () => {
  return useQuery({
    queryKey: ordersKeys.organizerTicketsOrders,
    queryFn: getOrganizerTicketsOrders,
  });
};

// ------------ MUTATIONS HOOKS ------------ //
export const useBookTicket = () => {
  return useMutation({
    mutationKey: ordersKeys.bookTickets,
    mutationFn: (payload: BookTicketPayload) => bookTickets(payload),
  });
};

export const useCancelOrder = () => {
  return useMutation({
    mutationKey: ordersKeys.cancelOrder,
    mutationFn: (order_id: string) => cancelOrder(order_id),
  });
};
