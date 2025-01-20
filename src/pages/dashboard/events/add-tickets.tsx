import { NoDataFoundCard } from "@/components/cards";
import { AddEditTicketForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tickets } from "lucide-react";
import { useRef } from "react";

export default function DashboardAddTickets() {
  const dialogRef = useRef<HTMLButtonElement>(null);

  function ToogleDialog() {
    dialogRef.current?.click();
  }

  return (
    <div>
      {/* Add Or Edit Ticket modal */}
      <Dialog>
        <DialogTrigger
          className="hidden"
          ref={dialogRef}
        >
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add ticket</DialogTitle>
          </DialogHeader>
          <AddEditTicketForm onToogleDialog={() => ToogleDialog()} />
        </DialogContent>
      </Dialog>

      <NoDataFoundCard
        Icon={<Tickets />}
        message="Let's add some tickets"
        cta={<Button onClick={() => ToogleDialog()}>Add ticket</Button>}
      />
    </div>
  );
}
