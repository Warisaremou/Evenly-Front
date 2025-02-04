import { EventCard } from "@/components/cards";
import CategoriesSelection from "@/components/categories-selection";
import { EventCardLoader } from "@/components/loaders";
import { Searchbar } from "@/components/searchbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEventsList } from "@/contexts/events/hook";

export default function Events() {
  const { events, isLoading } = useEventsList();

  return (
    <div className="space-y-7 md:space-y-9">
      {/* Filter section */}
      <div className="flex items-center justify-between">
        <Searchbar placeholder="Search event" />
        <div className="flex gap-2.5">
          <Select
          // onValueChange={(value) => {
          //   setQuery((prev) => ({ ...prev, place: value }));
          // }}
          >
            <SelectTrigger
              aria-label="Select place"
              className="md:w-52"
            >
              <SelectValue placeholder="Select place" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paris">Paris</SelectItem>
              <SelectItem value="montreuil">Montreuil</SelectItem>
            </SelectContent>
          </Select>
          <CategoriesSelection className="md:w-52" />
        </div>
      </div>

      {/* Events list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <EventCardLoader key={i} />)
        ) : (
          <>
            {events &&
              events.map((event) => (
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
