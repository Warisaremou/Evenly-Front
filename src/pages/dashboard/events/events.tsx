import { NoDataFoundCard } from "@/components/cards";
import CategoriesSelection from "@/components/categories-selection";
import Loader from "@/components/loader";
import { Searchbar } from "@/components/searchbar";
import { eventsColumns } from "@/components/tables/events/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { routes } from "@/lib/routes";
import { useOrganizerEvents } from "@/services/events/hooks";
import { Event } from "@/types";
import { Inbox } from "lucide-react";
import { Link } from "react-router";

export default function DashboardEvents() {
  const { data: eventsList, isLoading, isSuccess } = useOrganizerEvents();

  return (
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
          <CategoriesSelection className="max-w-52" />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader className="size-5" />
          </div>
        ) : isSuccess && eventsList.length <= 0 ? (
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
            data={eventsList as Event[]}
          />
        )}
      </div>
    </div>
  );
}
