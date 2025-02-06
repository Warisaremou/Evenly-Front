import { BookedEventCard, NoDataFoundCard } from "@/components/cards";
import { EventCardLoader } from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { useUserReservations } from "@/services/orders/hooks";
import { BookmarkX } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function AccountBooks() {
  const { data, isLoading, isError } = useUserReservations();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch reservations");
    }
  }, [isError]);

  return (
    <div className="space-y-5">
      <h3 className="section-header-title">Reservations</h3>

      {isLoading ? (
        <div className="flex flex-col gap-8 lg:gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <EventCardLoader
              className="max-lg:w-full lg:h-48 aspect-[6/4]"
              key={i}
            />
          ))}
        </div>
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="flex flex-col gap-8 lg:gap-5">
              {data.map((reservation) => (
                <BookedEventCard
                  key={reservation.id}
                  reservation={reservation}
                  ticket_number={1}
                />
              ))}
            </div>
          ) : (
            <NoDataFoundCard
              Icon={<BookmarkX />}
              message="No reservations made yet"
              cta={
                <Button asChild>
                  <Link to={`/${routes.events.index}`}>Book a ticket</Link>
                </Button>
              }
            />
          )}
        </>
      )}
    </div>
  );
}
