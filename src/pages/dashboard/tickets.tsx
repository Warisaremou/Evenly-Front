import { NoDataFoundCard } from "@/components/cards";
import Loader from "@/components/loader";
import { Searchbar } from "@/components/searchbar";
import { ticketsColumns } from "@/components/tables/tickets/columns";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrganizerTickets } from "@/services/tickets/hooks";
import { Ticket } from "@/types";
import { Inbox } from "lucide-react";

export default function DashboardTickets() {
  const { data: ticketsList, isLoading, isSuccess } = useOrganizerTickets();

  return (
    <div className="space-y-5">
      <h3 className="section-header-title">Tickets</h3>

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

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader className="size-5" />
          </div>
        ) : isSuccess && ticketsList.length <= 0 ? (
          <NoDataFoundCard
            Icon={<Inbox />}
            message="No Ticket found or Added"
          />
        ) : (
          <DataTable
            columns={ticketsColumns}
            data={ticketsList as Ticket[]}
          />
        )}
      </div>
    </div>
  );
}
