import { Badge } from "@/components/ui/badge";
import { OrdersListingType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const ordersColumns: ColumnDef<OrdersListingType>[] = [
  {
    header: "#",
    cell(props) {
      return <span>{props.row.index + 1}</span>;
    },
  },
  {
    accessorKey: "event_title",
    header: "Event",
  },
  {
    accessorKey: "user_email",
    header: "User's email",
  },
  {
    accessorKey: "is_canceled",
    header: "Status",
    cell: ({ row }) => {
      const isCanceled = row.original.is_canceled;
      return (
        <Badge
          className="text-xs"
          variant={isCanceled ? "destructive" : "tertiary"}
        >
          {isCanceled ? "Canceled" : "Approuved"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "ordered_at",
    header: "Ordered at",
    cell: ({ row }) => (
      <span className="text-sm font-body-medium">{format(row.original.ordered_at, "MM/dd/yyyy")}</span>
    ),
  },
];
