import api from "@/lib/axios-instance";
import { Ticket } from "@/types";

/**
 * Query to get organizer tickets
 *
 * @returns Promise<Ticket[]> - List of organizer tickets
 */
export const getOrganizerTickets = async (): Promise<Ticket[]> => {
  const response = await api.get("/tickets").then((res) => res);
  return response.data;
};
