import { CreateAndUpdateEvent } from "@/lib/schemas/events";
import { eventsKeys } from "@/services/events/keys";
import { addEvent, getAllEvents, getEventById, getOrganizerEvents, updateEvent } from "@/services/events/queries";
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
    enabled: !!id,
  });
};

export const useOrganizerEvents = () => {
  return useQuery({
    queryKey: eventsKeys.organizerEvents,
    queryFn: getOrganizerEvents,
  });
};

// ------------ MUTATIONS HOOKS ------------ //
export const useAddEvent = () => {
  return useMutation({
    mutationKey: eventsKeys.addEvent,
    mutationFn: (credentials: CreateAndUpdateEvent) => addEvent(credentials),
  });
};

export const useUpdateEvent = (id: string) => {
  return useMutation({
    mutationKey: eventsKeys.updateEvent(id),
    mutationFn: (credentials: CreateAndUpdateEvent) => updateEvent(id, credentials),
  });
};
