import { NoDataFoundCard } from "@/components/cards";
import { Searchbar } from "@/components/searchbar";
import { eventsColumns } from "@/components/tables/events/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { routes } from "@/lib/routes";
import { Event } from "@/types";
import { Inbox } from "lucide-react";
import { Link } from "react-router";

const eventsList = [
  {
    id: "1",
    cover: "",
    title: "Event title",
    description: "Event description",
    date_time: "10/10/2024 at 12:50PM",
    location: "Paris 75",
  },
] satisfies Array<Event>;

export default function DashboardEvents() {
  return (
    <div>
      <div className="space-y-5">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="section-header-title">Events</h3>
          <Button asChild>
            <Link to={routes.dashboard.events.addEvent}>Add new event</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-2">
            <Searchbar
              placeholder="Search event"
              className="max-w-72"
            />
            <Select>
              <SelectTrigger className="max-w-52">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chill">Chill</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {eventsList.length <= 0 ? (
            <NoDataFoundCard
              Icon={<Inbox />}
              message="No event found"
              cta={
                <Button asChild>
                  <Link to={routes.dashboard.events.addEvent}>Add new event</Link>
                </Button>
              }
            />
          ) : (
            <DataTable
              columns={eventsColumns}
              data={eventsList}
            />
          )}
        </div>
      </div>
    </div>
  );
}
