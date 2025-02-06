import { useCancelOrder } from "@/services/orders/hooks";
import { ordersKeys } from "@/services/orders/keys";
import { UserReservation } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarClock, MapPin, Ticket } from "lucide-react";
import { toast } from "sonner";
import { Loader } from "../loaders";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function BookedEventCard({
  reservation,
  ticket_number,
}: {
  reservation: UserReservation;
  ticket_number: number;
}) {
  const { cover, event_date, event_location, event_time, event_title, is_canceled } = reservation;
  const { mutateAsync, isPending } = useCancelOrder();
  const queryClient = useQueryClient();

  const handleCancelReservation = async () => {
    await mutateAsync(reservation.id, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Reservation canceled successfully");
        queryClient.invalidateQueries({
          queryKey: ordersKeys.userReservations,
        });
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to cancel reservation");
      },
    });
  };

  return (
    <div className="flex max-lg:flex-col lg:items-center group gap-6">
      {/* Event cover */}
      <div className="overflow-hidden max-lg:w-full lg:h-48 aspect-[6/4] rounded-lg bg-grey-300">
        <img
          src={cover}
          alt={`${event_title} - cover`}
          className="object-cover group-hover:scale-110 transition-all ease-in-out duration-500 size-full bg-no-repeat"
        />
      </div>

      <div className="space-y-2">
        <div className="space-y-1">
          <h2 className="heading3">{event_title}</h2>
          <div className="flex max-lg:flex-col lg:items-center gap-2">
            <div className="flex items-center gap-1.5">
              <CalendarClock size={18} />
              <span className="text-sm font-body-medium">{`${event_date} at ${event_time}`}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={18} />
              <span className="text-sm font-body-medium line-clamp-1">{event_location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Ticket size={18} />
            <span className="text-sm font-body-medium">{ticket_number} Tickets</span>
          </div>
        </div>
        {is_canceled ? (
          <Badge variant="destructive">Canceled</Badge>
        ) : (
          <Button
            variant="destructive"
            className="max-lg:w-full"
            disabled={isPending}
            onClick={handleCancelReservation}
          >
            {isPending && <Loader className="text-state-error-foreground" />}
            Cancel reservation
          </Button>
        )}
      </div>
    </div>
  );
}
