import { EventContext } from "@/contexts/event/context";
import { ReactNode, useState } from "react";

export default function EventProvider({ children }: { children: ReactNode }) {
  const [eventID, setEventID] = useState("");

  return (
    <EventContext.Provider
      value={{
        eventID,
        setEventID,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
