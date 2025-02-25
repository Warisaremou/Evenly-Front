import Loader from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import { useRemoveTicket } from "@/services/tickets/hooks";
import { ticketsKeys } from "@/services/tickets/keys";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  ticketID: string;
  eventID: string;
};

export default function RemoveTicketButton({ ticketID, eventID }: Props) {
  const { isPending, mutateAsync } = useRemoveTicket(ticketID);
  const queryClient = useQueryClient();

  const handleRemoveTicket = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    await mutateAsync("", {
      onSuccess: (response) => {
        toast.success(response.message ?? "Ticket removed successfully");
        queryClient.invalidateQueries({
          queryKey: ticketsKeys.eventTickets(eventID),
        });
        queryClient.invalidateQueries({
          queryKey: ticketsKeys.organizerTickets,
        });
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to remove ticket");
      },
    });
  };

  return (
    <Button
      onClick={(e) => {
        handleRemoveTicket(e);
      }}
      disabled={isPending}
      variant="destructive-secondary"
      className="w-full justify-start"
    >
      {isPending ? <Loader className="text-destructive-foreground" /> : <Trash2 size={16} />}
      Remove
    </Button>
  );
}
