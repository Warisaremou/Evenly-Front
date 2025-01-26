import { NoDataFoundCard } from "@/components/cards";
import { AddEditTicketForm } from "@/components/forms";
import Loader from "@/components/loader";
import { ticketsColumns } from "@/components/tables/tickets/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEventTickets } from "@/services/tickets/hooks";
import { Tickets } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function DashboardAddTickets() {
  const dialogRef = useRef<HTMLButtonElement>(null);
  const { id_event } = useParams();

  const { data, isLoading, isError } = useEventTickets(id_event!);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch event tickets");
    }
  }, [isError]);

  function ToogleDialog() {
    dialogRef.current?.click();
  }

  return (
    <>
      {/* Add Or Edit Ticket modal */}
      <Dialog>
        <DialogTrigger
          className="hidden"
          ref={dialogRef}
        >
          Open
        </DialogTrigger>
        <DialogContent className="max-md:max-w-[23.12rem]">
          <DialogHeader>
            <DialogTitle>Add ticket</DialogTitle>
          </DialogHeader>
          <AddEditTicketForm
            id_event={id_event!}
            onToogleDialog={() => ToogleDialog()}
          />
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader className="size-5" />
        </div>
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="space-y-5">
              <div className="flex items-center gap-2 justify-between">
                <h3 className="section-header-title">Tickets</h3>
                <Button onClick={() => ToogleDialog()}>Add ticket</Button>
              </div>
              <DataTable
                columns={ticketsColumns}
                data={data}
              />

              <div className="flex justify-end">
                <Button disabled={isError}>Save and continue</Button>
              </div>
            </div>
          ) : (
            <NoDataFoundCard
              Icon={<Tickets />}
              message="Let's add some tickets"
              cta={<Button onClick={() => ToogleDialog()}>Add ticket</Button>}
            />
          )}
        </>
      )}
    </>
  );
}
