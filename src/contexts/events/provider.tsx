import { EventsContext } from "@/contexts/events/context";
import { useEvents } from "@/services/events/hooks";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

export default function EventsListProvider({ children }: { children: ReactNode }) {
  const { isLoading, data, isError } = useEvents();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch events");
    }
  }, [isError]);

  return (
    <EventsContext.Provider
      value={{
        events: data || [],
        isLoading,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
