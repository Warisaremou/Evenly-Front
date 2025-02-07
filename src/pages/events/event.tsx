import { OrderConfirmIcon } from "@/assets/icons/order-confirm";
import { Loader } from "@/components/loaders";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { cn, formatPrice } from "@/lib/utils";
import { useEvent } from "@/services/events/hooks";
import { eventsKeys } from "@/services/events/keys";
import { useBookTicket } from "@/services/orders/hooks";
import { ordersKeys } from "@/services/orders/keys";
import { useBookmarkStore } from "@/store/bookmark";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark, CalendarClock, MapPin, Minus, Plus, RefreshCcw, Ticket, Tickets } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function Event() {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedTicketID, setSelectedTicketID] = useState<string | null>(null);
  const [isInBookmarks, setIsInBookmarks] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id_event } = useParams();
  const queryClient = useQueryClient();
  const { isAuthenticated, userData } = useAuth();
  const { bookmarks, addToBookmarks, removeFromBookmarks } = useBookmarkStore();
  const { data, isLoading, isError } = useEvent(id_event!);
  const { mutateAsync, isPending } = useBookTicket();

  useEffect(() => {
    const bookIndex = bookmarks.findIndex((b) => b.id === id_event);
    setIsInBookmarks(bookIndex !== -1);
  }, [bookmarks]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch event details");
    }
  }, [isError]);

  const handleBookmark = () => {
    if (isAuthenticated) {
      if (userData?.role !== "admin") {
        if (isInBookmarks) {
          removeFromBookmarks(id_event!);
          toast.success("Event removed from bookmarks");
        } else {
          if (data) {
            addToBookmarks({
              id: data.id,
              title: data.title,
              description: data.description,
              cover: data.cover,
              date: data.date,
              time: data.time,
              location: data.location,
              categories: data.categories,
            });
          }
          toast.success("Event added to bookmarks");
        }
      }
    } else {
      navigate(`/${routes.auth.login}`);
    }
  };

  const handleEventDetailsRefetch = () => {
    queryClient.invalidateQueries({
      queryKey: eventsKeys.event(id_event!),
    });
  };

  const handleTicketSelection = (ticketID: string) => {
    if (selectedTicketID === ticketID) {
      setSelectedTicketID(null);
    } else {
      setSelectedTicketID(ticketID);
    }
  };

  const handleTicketQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setTicketQuantity(ticketQuantity + 1);
    } else {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  const handleBookTickets = async () => {
    await mutateAsync(
      {
        ticket_id: selectedTicketID!,
        quantity: ticketQuantity,
      },
      {
        onSuccess: () => {
          setShowModal(true);
          queryClient.invalidateQueries({
            queryKey: ordersKeys.userReservations,
          });
        },
        onError: () => {
          toast.error("Failed to book tickets");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      {/* Order confirmation modal */}
      <Dialog
        open={showModal}
        onOpenChange={setShowModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              <div className="flex items-center justify-center size-11 rounded-full p-1.5 bg-primary-100">
                <OrderConfirmIcon />
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-body-semibold">Good !</h3>
            <p className="text-sm text-center text-grey-500">
              Your reservation for <span className="font-body-semibold">{data?.title}</span> has been made. An email
              will be sent to you with the downloadable ticket(s)
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <>
          <Skeleton className="h-10 w-64" />
          <div className="flex flex-col gap-8">
            <Skeleton className="w-full h-80 rounded-lg aspect-[4/8]" />
            <div className="flex flex-col lg:flex-row gap-20">
              <Skeleton className="h-[28rem] w-full" />
              <Skeleton className="h-56 w-full max-w-80" />
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
                <BreadcrumbPage>{data.title}</BreadcrumbPage>
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
                <div className="space-y-6 w-full">
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
                        <p className="text-sm">{`${data.date} at ${data.time}`}</p>
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
                      <div className="flex flex-wrap gap-1.5">
                        {data.categories.map((category) => (
                          <Badge
                            variant="secondary"
                            key={category.id}
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Organizer name */}
                  <h4 className="font-body-semibold">Organized by : {data.organizer_name}</h4>
                </div>

                {/* Book & Favorites */}
                <div className="md:max-w-80 w-full h-fit p-3 bg-grey-100 border border-grey-200 rounded-lg flex flex-col gap-6">
                  <Button
                    onClick={handleBookmark}
                    variant="secondary"
                  >
                    <Bookmark
                      size={18}
                      className={cn("text-primary-300", isInBookmarks && "fill-primary-300")}
                    />
                    {isInBookmarks ? "Remove from bookmarks" : "Add to bookmarks"}
                  </Button>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading-semibold text-xl">Available tickets</h3>
                    <div className="flex flex-col gap-3">
                      {data.tickets.map((ticket) => {
                        const isSelected = selectedTicketID === ticket.id;

                        return (
                          <div
                            onClick={() => handleTicketSelection(ticket.id)}
                            key={ticket.id}
                            className={cn(
                              "flex gap-4 p-1.5 border rounded-lg items-center justify-between transition-all cursor-pointer ease-in-out",
                              isSelected ? "bg-primary-100 border-primary-400" : "bg-grey-100 border-grey-300",
                            )}
                          >
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center justify-center p-1.5 bg-primary-100 rounded-md size-12">
                                <Tickets
                                  size={22}
                                  className="text-primary-300"
                                />
                              </div>
                              <div>
                                <p className="font-body-semibold">{ticket.name}</p>
                                <p className="font-body-medium text-sm text-grey-400">{ticket.ticket_type_name}</p>
                              </div>
                            </div>
                            <p className="font-body-semibold text-primary-300">{formatPrice(ticket.price)}</p>
                          </div>
                        );
                      })}
                    </div>
                    {selectedTicketID && (
                      <div className="flex items-center justify-between gap-1.5">
                        <h3 className="font-body-medium">Quantity</h3>
                        <div className="flex items-center gap-2">
                          <Button
                            disabled={ticketQuantity === 1}
                            size="icon"
                            onClick={() => handleTicketQuantity("decrement")}
                          >
                            <Minus size={18} />
                          </Button>
                          <div className="size-10 flex items-center justify-center">
                            <span className="font-body-medium">{ticketQuantity}</span>
                          </div>
                          <Button
                            disabled={ticketQuantity === 5}
                            onClick={() => handleTicketQuantity("increment")}
                            size="icon"
                          >
                            <Plus size={18} />
                          </Button>
                        </div>
                      </div>
                    )}
                    <Button
                      disabled={!selectedTicketID || isPending}
                      onClick={handleBookTickets}
                    >
                      {isPending ? <Loader className="text-grey-100" /> : <Ticket size={18} />}
                      Book tickets
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
