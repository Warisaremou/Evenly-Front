import { CreateAndUpdateTicket } from "@/lib/schemas/tickets";
import { ticketsKeys } from "@/services/tickets/keys";
import { addTicketToEvent, getEventTickets, getOrganizerTickets } from "@/services/tickets/queries";
import { useMutation, useQuery } from "@tanstack/react-query";

// --------------- QUERIES HOOKS --------------- //
export const useOrganizerTickets = () => {
  return useQuery({
    queryKey: ticketsKeys.organizerTickets,
    queryFn: getOrganizerTickets,
  });
};

export const useEventTickets = (id_event: string) => {
  return useQuery({
    queryKey: ticketsKeys.eventTickets(id_event),
    queryFn: () => getEventTickets(id_event),
    enabled: !!id_event,
  });
};

// ------------ MUTATIONS HOOKS ------------ //
export const useAddTicket = () => {
  return useMutation({
    mutationKey: ticketsKeys.addTicket,
    mutationFn: (payload: CreateAndUpdateTicket) => addTicketToEvent(payload),
  });
};
