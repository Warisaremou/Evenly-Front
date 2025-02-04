import { EventCard } from "@/components/cards";
import { EventCardLoader } from "@/components/loaders";
import { useEventsList } from "@/contexts/events/hook";
import { routes } from "@/lib/routes";
import { Link } from "react-router";

type Props = {
  sectionTitle: string;
  withCTA?: boolean;
};

export default function EventListing({ sectionTitle, withCTA = false }: Props) {
  const { events, isLoading } = useEventsList();

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
          Array.from({ length: 3 }).map((_, i) => <EventCardLoader key={i} />)
        ) : (
          <>
            {events &&
              events.slice(0, 2).map((event) => (
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
