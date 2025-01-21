import { eventsKeys } from "@/services/events/keys";
import { addEvent, getAllEvents, getEventById } from "@/services/events/queries";
import { Event } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

// --------------- QUERIES HOOKS --------------- //
export const useEvents = () => {
  return useQuery({
    queryKey: eventsKeys.events,
    queryFn: getAllEvents,
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: eventsKeys.event(id),
    queryFn: () => getEventById(id),
  });
};

// ------------ MUTATIONS HOOKS ------------ //
export const useAddEvent = (credentials: Event) => {
  return useMutation({
    mutationKey: eventsKeys.addEvent,
    mutationFn: () => addEvent(credentials),
  });
};
