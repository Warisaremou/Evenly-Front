import RemoveTicketButton from "@/components/remove-ticket-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/lib/utils";
import { Ticket } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const ticketsColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticket_type_name",
    header: "Type",
    cell: ({ row }) => (
      <Badge
        className="text-xs"
        variant="tertiary"
      >
        {row.original.ticket_type_name}
      </Badge>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price: number = row.getValue("price");
      return <span>{price > 0 ? formatPrice(price) : "-"}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [ticketID, eventID] = [row.original.id, row.original.event_id];

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="tertiary"
              className="size-7 p-0 rounded-md"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem className="p-0">
              <Button
                variant="ghost"
                className="w-full justify-start text-primary-300 hover:bg-primary-100"
              >
                Update
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <RemoveTicketButton
                ticketID={ticketID}
                eventID={eventID}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
