import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/lib/routes";
import { useEvent } from "@/services/events/hooks";
import { eventsKeys } from "@/services/events/keys";
import { Category } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark, CalendarClock, MapPin, Minus, Plus, RefreshCcw, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const categories = [
  {
    id: "1",
    name: "Music",
  },
] satisfies Array<Category>;

export default function Event() {
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const { id_event } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useEvent(id_event!);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch event details");
    }
  }, [isError]);

  const handleEventDetailsRefetch = () => {
    queryClient.invalidateQueries({
      queryKey: eventsKeys.event(id_event!),
    });
  };

  const handleTicketQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setTicketQuantity(ticketQuantity + 1);
    } else {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-64" />
          <div className="flex flex-col gap-8">
            <Skeleton className="w-full h-80 rounded-lg aspect-[4/8]" />
            <div className="flex flex-col lg:flex-row gap-20">
              <Skeleton className="h-[28rem] w-full" />
              <Skeleton className="h-44 w-full max-w-72" />
            </div>
          </div>
        </>
      ) : data ? (
        <>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${routes.events.index}`}>Events</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Event title</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <div className="overflow-hidden w-full h-80 bg-grey-300 rounded-xl aspect-[4/8]">
                <img
                  src={data.cover}
                  alt={`${data.title} - image`}
                  className="object-cover size-full bg-no-repeat"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-20">
                {/* Event details */}
                <div className="space-y-6">
                  {/* Title & Description */}
                  <div className="space-y-3.5">
                    <h1 className="heading1">{data.title}</h1>
                    <p className="max-lg:text-sm">{data.description}</p>
                  </div>
                  {/* Times & Categories */}
                  <div className="space-y-3.5">
                    {/* Date & Time */}
                    <div className="space-y-1">
                      <h3 className="heading3">Date and time</h3>
                      <div className="flex items-center gap-1.5">
                        <CalendarClock size={18} />
                        <p className="text-sm">{data.date_time}</p>
                      </div>
                    </div>
                    {/* Location */}
                    <div className="space-y-1">
                      <h3 className="heading3">Location</h3>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={18} />
                        <p className="text-sm">{data.location}</p>
                      </div>
                    </div>
                    {/* Categories */}
                    <div className="space-y-1">
                      <h3 className="heading3 items-center">Categories</h3>
                      {categories.map((category) => (
                        <Badge
                          variant="secondary"
                          key={category.id}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {/* Organizer name */}
                  <h4 className="font-body-semibold">Organized by : Empire Group</h4>
                </div>

                {/* Book & Favorites */}
                <div className="max-w-72 w-full h-fit p-3 bg-grey-100 border border-grey-200 rounded-lg flex flex-col gap-6">
                  <Button variant="secondary">
                    <Bookmark size={18} />
                    Add to favorites
                  </Button>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 className="font-body-medium">Quantity</h3>
                      <div className="flex items-center gap-3.5">
                        <Button
                          disabled={ticketQuantity === 1}
                          size="icon"
                          onClick={() => handleTicketQuantity("decrement")}
                        >
                          <Minus size={18} />
                        </Button>
                        <span className="font-body-medium">{ticketQuantity}</span>
                        <Button
                          onClick={() => handleTicketQuantity("increment")}
                          size="icon"
                        >
                          <Plus size={18} />
                        </Button>
                      </div>
                    </div>
                    <Button>
                      <Ticket size={18} />
                      Book ticket
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="border border-state-error flex flex-col items-center justify-center p-14 gap-4 rounded-lg bg-red-50">
          <p className="text-state-error-foreground text-sm font-body-medium">Failed to fetch event details</p>
          <Button
            onClick={handleEventDetailsRefetch}
            variant="destructive"
          >
            <RefreshCcw size={14} />
            Refetch
          </Button>
        </div>
      )}
    </div>
  );
}
