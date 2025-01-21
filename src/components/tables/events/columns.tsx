import { Event } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const eventsColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "id",
    header: "#",
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
];
