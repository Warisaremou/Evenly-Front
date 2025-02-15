import api from "@/lib/axios-instance";
import { CreateAndUpdateEvent } from "@/lib/schemas/events";
import { ApiResponse, Event, EventDetailsType, EventsListingType } from "@/types";
import { format } from "date-fns";

/**
 * Query to get all events
 *
 * @returns Promise<Event[]> - List of events
 */
export const getAllEvents = async (): Promise<EventsListingType[]> => {
  const response = await api.get("/events").then((res) => res);
  return response.data;
};

/**
 * Query to get event by id
 *
 * @param {string} id - Event id
 * @returns Promise<Event> - Event data
 */
export const getEventById = async (id: string): Promise<EventDetailsType> => {
  const response = await api.get(`/events/${id}`).then((res) => res);
  return response.data;
};

/**
 * Query to get organizer events
 *
 * @returns Promise<Event[]> - List of events
 */
export const getOrganizerEvents = async (): Promise<Array<Event[]>> => {
  const response = await api.get("/events/organizer/events").then((res) => res);
  return response.data;
};

/**
 * Query to add event
 *
 * @param {Event} event - Event data
 * @returns Promise<ApiResponse> - Api response
 */
export const addEvent = async (event: CreateAndUpdateEvent): Promise<ApiResponse> => {
  const form = new FormData();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  form.append("cover", event.cover);
  form.append("title", event.title);
  form.append("description", event.description);
  event.categories.map((id) => form.append("categories[]", id));
  form.append("location", event.location);
  form.append("date", format(event.date, "yyyy-MM-dd"));
  form.append("time", event.time);

  const response = await api
    .post("/events", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);
  return response.data;
};

/**
 * Query to update event by id
 *
 * @param {string} id - Event id
 * @param {Event} event - Event data
 * @returns Promise<ApiResponse> - Api response
 */
export const updateEvent = async (id: string, event: Event): Promise<ApiResponse> => {
  const response = await api.put(`/events/${id}`, event).then((res) => res);
  return response.data;
};

/**
 * Query to cancel event by id
 *
 * @param {string} id - Event id
 * @returns Promise<ApiResponse> - Api response
 */
export const cancelEvent = async (id: string): Promise<ApiResponse> => {
  const response = await api.put(`/events/${id}/cancel`).then((res) => res);
  return response.data;
};
