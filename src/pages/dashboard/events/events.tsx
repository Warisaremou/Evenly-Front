import { NoDataFoundCard } from "@/components/cards";
import { Searchbar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { routes } from "@/lib/routes";
import { Inbox } from "lucide-react";
import { Link } from "react-router";

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

        <div className="flex flex-col gap-3.5">
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

          <NoDataFoundCard
            Icon={<Inbox />}
            message="No event found"
            cta={
              <Button asChild>
                <Link to={routes.dashboard.events.addEvent}>Add new event</Link>
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
