import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const ticketsColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticket_type",
    header: "Type",
    cell: ({ row }) => {
      return <Badge variant="tertiary">{row.original.ticket_type.name}</Badge>;
    },
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
      // TODO: Format price to €
      const price: number = row.getValue("price");
      return <span>{price > 0 ? price : "-"}</span>;
    },
  },
];
