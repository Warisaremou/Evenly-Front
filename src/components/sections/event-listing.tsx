import { EventCard } from "@/components/cards";
import Loader from "@/components/loader";
import { routes } from "@/lib/routes";
import { useEvents } from "@/services/events/hooks";
import { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

type Props = {
  sectionTitle: string;
  withCTA?: boolean;
};

export default function EventListing({ sectionTitle, withCTA = false }: Props) {
  const { isLoading, data, isError } = useEvents();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch events");
    }
  }, [isError]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="heading3">{sectionTitle}</h3>
        {withCTA && (
          <Link
            className="text-xs font-body-medium hover:underline"
            to={routes.events.index}
          >
            View more
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data &&
              data.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
