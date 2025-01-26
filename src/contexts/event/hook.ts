import { EventContext } from "@/contexts/event/context";
import { useContext } from "react";

export const useEvent = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEvent must be wrapped  in a <EventProvider />");
  }

  return context;
};
