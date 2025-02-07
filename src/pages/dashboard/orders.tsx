import { NoDataFoundCard } from "@/components/cards";
import { Loader } from "@/components/loaders";
import { ordersColumns } from "@/components/tables/orders/columns";
import { DataTable } from "@/components/ui/data-table";
import { useOrganizerTicketsOrders } from "@/services/orders/hooks";
import { Inbox } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardOrders() {
  const { data, isLoading, isError } = useOrganizerTicketsOrders();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch orders");
    }
  }, [isError]);

  return (
    <div className="space-y-5">
      <h3 className="section-header-title">Orders</h3>

      <div className="flex flex-col gap-5">
        {/* <div className="flex items-center justify-between gap-2">
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
        </div> */}

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader className="size-5" />
          </div>
        ) : (
          <>
            {data && data.length > 0 ? (
              <DataTable
                columns={ordersColumns}
                data={data}
              />
            ) : (
              <NoDataFoundCard
                Icon={<Inbox />}
                message="No order has been made or found"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
