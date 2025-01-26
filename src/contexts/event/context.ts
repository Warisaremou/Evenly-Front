import { EventContextType } from "@/types";
import { createContext } from "react";

const EventContext = createContext<EventContextType>({
  eventID: "",
  setEventID: () => {},
});

export { EventContext };
