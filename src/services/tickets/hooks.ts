import { ticketsKeys } from "@/services/tickets/keys";
import { getOrganizerTickets } from "@/services/tickets/queries";
import { useQuery } from "@tanstack/react-query";

// --------------- QUERIES HOOKS --------------- //
export const useOrganizerTickets = () => {
  return useQuery({
    queryKey: ticketsKeys.organizerTickets,
    queryFn: getOrganizerTickets,
  });
};
