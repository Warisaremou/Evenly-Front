import { EventsContextType } from "@/types";
import { createContext } from "react";

const EventsContext = createContext<EventsContextType>({
  events: [],
  isLoading: false,
});

export { EventsContext };
