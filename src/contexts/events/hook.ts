import { EventsContext } from "@/contexts/events/context";
import { useContext } from "react";

export const useEventsList = () => {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error("useEventsList must be wrapped  in a <EventsListProvider />");
  }

  return context;
};
