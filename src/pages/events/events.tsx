import { EventCard, NoDataFoundCard } from "@/components/cards";
import CategoriesSelection from "@/components/categories-selection";
import { EventCardLoader } from "@/components/loaders";
import { Searchbar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEventsList } from "@/contexts/events/hook";
import { searchParamsType } from "@/types";
import { Inbox, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<searchParamsType>({
    place: "",
    category: "",
    search: "",
  });

  const { events, isLoading } = useEventsList();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};

    if (query.search) params.search = query.search;
    if (query.place) params.place = query.place;
    if (query.category) params.category = query.category;
    setSearchParams(params);
  }, [query, searchParams]);

  const handleClearFilters = () => {
    setQuery({ place: "", category: "", search: "" });
  };

  return (
    <div className="space-y-7 md:space-y-9">
      {/* Filter section */}
      <div className="flex items-center justify-between">
        <Searchbar
          placeholder="Search event"
          value={query.search}
          onChange={(e) => setQuery((prev) => ({ ...prev, search: e.target.value }))}
        />
        <div className="flex gap-2.5">
          <Select
            onValueChange={(value) => {
              setQuery((prev) => ({ ...prev, place: value }));
            }}
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
          <CategoriesSelection
            onChange={(value) => setQuery((prev) => ({ ...prev, category: value }))}
            className="md:w-52"
          />
          {(query.place || query.category || query.search) && (
            <Button
              variant="destructive"
              onClick={handleClearFilters}
            >
              <Trash size={18} />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Events list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <EventCardLoader key={i} />)
        ) : (
          <>
            {events &&
            events.filter((event) => {
              const matchesSearch = query.search
                ? event.title.toLowerCase().includes(query.search.toLowerCase())
                : true;

              const matchesPlace = query.place ? event.location.toLowerCase() === query.place.toLowerCase() : true;

              const matchesCategory = query.category
                ? event.categories.some((category) => category.id === query.category)
                : true;

              return matchesSearch && matchesPlace && matchesCategory;
            }).length === 0 ? (
              <div className="col-span-3">
                <NoDataFoundCard
                  Icon={<Inbox />}
                  message="No events found matching your search criteria"
                />
              </div>
            ) : (
              // <p className="text-center text-grey-500">No events found matching your search criteria</p>
              events
                .filter((event) => {
                  const matchesSearch = query.search
                    ? event.title.toLowerCase().includes(query.search.toLowerCase())
                    : true;

                  const matchesPlace = query.place ? event.location.toLowerCase() === query.place.toLowerCase() : true;

                  const matchesCategory = query.category
                    ? event.categories.some((category) => category.id === query.category)
                    : true;

                  return matchesSearch && matchesPlace && matchesCategory;
                })
                .map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
