import CategoriesSelection from "@/components/categories-selection";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

// const events = [
//   { cover: "/images/event1.jpg", date_time: "02/12/2024", title: "Event title" },
//   { cover: "/images/event2.jpg", date_time: "02/12/2024", title: "Event title" },
//   { cover: "/images/event3.jpg", date_time: "02/12/2024", title: "Event title" },

// ];

export default function Events() {
  return (
    <div className="p-4">
      {/* Barre de recherche et filtres */}
      <div className="flex items-center w-full gap-4 p-2">
        <div className="relative flex-1 mr-[365px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            type="search"
            placeholder="Search event"
            className={cn("w-full pl-10 py-2 focus:outline-none font-sans")}
          />
        </div>
        <CategoriesSelection className="flex-1 min-w-[150px] text-gray-400 font-sans" />
        <Select>
          <SelectTrigger className="flex-1 min-w-[150px] px-3 py-2 text-gray-400 font-sans">
            <SelectValue placeholder="Filter by place" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Liste des événements */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))} */}
      </div>
    </div>
  );
}
