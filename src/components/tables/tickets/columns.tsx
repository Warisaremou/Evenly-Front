import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Ticket } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
];
