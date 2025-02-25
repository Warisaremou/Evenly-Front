import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/lib/routes";
import { Event } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

export const eventsColumns: ColumnDef<Event>[] = [
  {
    header: "#",
    cell(props) {
      return <span>{props.row.index + 1}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Event",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const eventID = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="tertiary"
              className="h-7 w-7 p-0 rounded-md"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem className="p-0">
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start text-primary-300 hover:bg-primary-100"
              >
                <Link to={`/dashboard/${routes.dashboard.events.index}/${eventID}/edit`}>Update</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Button
                onClick={() => navigator.clipboard.writeText(eventID)}
                variant="destructive-secondary"
                className="w-full justify-start"
              >
                Cancel
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
