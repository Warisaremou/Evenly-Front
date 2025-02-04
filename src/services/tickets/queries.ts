import api from "@/lib/axios-instance";
import { CreateAndUpdateTicket } from "@/lib/schemas/tickets";
import { ApiResponse, Ticket, TicketType } from "@/types";

/**
 * Query to get organizer tickets
 *
 * @returns Promise<Ticket[]> - List of organizer tickets
 */
export const getOrganizerTickets = async (): Promise<Ticket[]> => {
  const response = await api.get("/tickets/organizer/tickets").then((res) => res);
  return response.data;
};

/**
 * Query to get event tickets
 *
 * @returns Promise<Ticket[]> - List of event tickets
 */
export const getEventTickets = async (id_event: string): Promise<Ticket[]> => {
  const response = await api.get(`/tickets/event/${id_event}`).then((res) => res);
  return response.data;
};

/**
 * Query to get ticket types
 *
 * @returns Promise<TicketType[]> - List of ticket types
 */
export const getTicketTypes = async (): Promise<TicketType[]> => {
  const response = await api.get("/type-tickets").then((res) => res);
  return response.data;
};

/**
 * Query to add ticket to event
 *
 * @param {CreateAndUpdateTicket} payload - Ticket data
 * @returns Promise<ApiResponse> - Api response
 */
export const addTicketToEvent = async (payload: CreateAndUpdateTicket): Promise<ApiResponse> => {
  const response = await api.post("/tickets", payload).then((res) => res);
  return response.data;
};
