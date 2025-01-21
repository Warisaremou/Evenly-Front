import api from "@/lib/axios-instance";
import { ApiResponse, Event } from "@/types";

/**
 * Query to get all events
 *
 * @returns Promise<Event[]> - List of events
 */
export const getAllEvents = async (): Promise<Event[]> => {
  const response = await api.get("/events").then((res) => res);
  return response.data;
};

/**
 * Query to get event by id
 *
 * @param {string} id - Event id
 * @returns Promise<Event> - Event data
 */
export const getEventById = async (id: string): Promise<Event> => {
  const response = await api.get(`/events/${id}`).then((res) => res);
  return response.data;
};

/**
 * Query to add event
 *
 * @param {Event} event - Event data
 * @returns Promise<ApiResponse> - Api response
 */
export const addEvent = async (event: Event): Promise<ApiResponse> => {
  const response = await api.post("/events", event).then((res) => res);
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
