import { Event } from "@/types";
import { CalendarClock } from "lucide-react";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  const { cover, date_time, title } = event;
  return (
    <div className="flex flex-col gap-2 ">
      {/* Event cover */}
      <div className="overflow-hidden w-full aspect-[5/4] rounded-lg">
        <img
          src={cover}
          alt={`${title} - image`}
          className="object-cover size-full bg-no-repeat"
        />
      </div>

      <div>
        <h2 className="heading3">{title}</h2>

        {/* Informations sur la date et le lieu */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <CalendarClock size={18} />
            <span className="text-sm font-body-medium">{date_time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
