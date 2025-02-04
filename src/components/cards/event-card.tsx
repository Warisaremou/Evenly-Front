import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useBookmarkStore } from "@/store/bookmark";
import { EventsListingType } from "@/types";
import { Bookmark, CalendarClock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

type Props = {
  event: EventsListingType;
};

export default function EventCard({ event }: Props) {
  const { id, cover, date, time, title, location } = event;

  const [isInBookmarks, setIsInBookmarks] = useState(false);
  const { isAuthenticated, userData } = useAuth();
  const navigate = useNavigate();
  const { bookmarks, addToBookmarks, removeFromBookmarks } = useBookmarkStore();

  const handleBookmark = () => {
    if (isAuthenticated) {
      if (userData?.role !== "organizer") {
        if (isInBookmarks) {
          removeFromBookmarks(id);
          toast.success("Event removed from bookmarks");
        } else {
          addToBookmarks(event);
          toast.success("Event added to bookmarks");
        }
      }
    } else {
      navigate(`/${routes.auth.login}`);
    }
  };

  useEffect(() => {
    const bookIndex = bookmarks.findIndex((b) => b.id === id);
    setIsInBookmarks(bookIndex !== -1);
  }, [bookmarks]);

  return (
    <div className="flex flex-col group gap-2 relative">
      {/* Event cover */}
      <Link
        to={`/events/${id}`}
        className="overflow-hidden w-full aspect-[5/4] rounded-lg bg-grey-300"
      >
        <img
          src={cover}
          alt={`${title} - cover`}
          className="object-cover group-hover:scale-110 transition-all ease-in-out duration-500 size-full bg-no-repeat"
        />
      </Link>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 hidden group-hover:flex"
        onClick={handleBookmark}
      >
        <Bookmark
          size={18}
          className={cn("text-primary-300", isInBookmarks && "fill-primary-300")}
        />
      </Button>

      <div className="space-y-2">
        <h2 className="heading3">{title}</h2>
        {/* Informations sur la date et le lieu */}
        <div className="flex flex-col items-start gap-1">
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
