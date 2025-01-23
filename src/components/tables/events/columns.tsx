import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Event } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
    accessorKey: "date_time",
    header: "Date & time",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Cancel Event</DropdownMenuItem>
            <DropdownMenuItem>Update</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
