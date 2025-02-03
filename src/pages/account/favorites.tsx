import { EventCard, NoDataFoundCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { useBookmarkStore } from "@/store/bookmark";
import { BookmarkX } from "lucide-react";
import { Link } from "react-router";

export default function AccountFavorites() {
  const { bookmarks } = useBookmarkStore();

  return (
    <div className="space-y-5">
      <h3 className="section-header-title">Favorites</h3>
      {bookmarks.length <= 0 ? (
        <NoDataFoundCard
          Icon={<BookmarkX />}
          message="No favorites added yet"
          cta={
            <Button asChild>
              <Link to={`/${routes.events.index}`}>Explore events</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookmarks.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  );
}
