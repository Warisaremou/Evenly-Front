import { EventsListingType } from "@/types";
import { CalendarClock, MapPin } from "lucide-react";
import { Link } from "react-router";

type Props = {
  event: EventsListingType;
};

export default function EventCard({ event }: Props) {
  const { id, cover, date, time, title, location } = event;
  return (
    <div className="flex flex-col gap-2">
      {/* Event cover */}
      <Link
        to={`/events/${id}`}
        className="overflow-hidden group w-full aspect-[5/4] rounded-lg bg-grey-300"
      >
        <img
          src={cover}
          alt={`${title} - cover`}
          className="object-cover group-hover:scale-110 transition-all ease-in-out duration-500 size-full bg-no-repeat"
        />
      </Link>

      <div>
        <h2 className="heading3">{title}</h2>

        {/* Informations sur la date et le lieu */}
        <div className="flex flex-col items-start gap-2.5">
          <div className="flex items-center gap-2">
            <CalendarClock size={18} />
            <span className="text-sm font-body-medium">{`${date} at ${time}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span className="text-sm font-body-medium line-clamp-1">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
