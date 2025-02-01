import Loader from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateAndUpdateTicket, createAndUpdateTicketSchema } from "@/lib/schemas/tickets";
import { useAddTicket, useTicketTypes } from "@/services/tickets/hooks";
import { ticketsKeys } from "@/services/tickets/keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  id_event: string;
  onToogleDialog: () => void;
};

export default function AddEditTicketForm({ id_event, onToogleDialog }: Props) {
  const { mutateAsync, isPending } = useAddTicket();
  const { isLoading, data, isError } = useTicketTypes();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch ticket types");
    }
  }, [isError]);

  const form = useForm<CreateAndUpdateTicket>({
    resolver: zodResolver(createAndUpdateTicketSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      price: 0,
      event_id: id_event,
      type_ticket_id: "",
    },
  });

  const onSubmit = (data: CreateAndUpdateTicket) => {
    // console.log(data);
    // return;
    mutateAsync(data, {
      onSuccess: (response) => {
        toast.success(response.message ?? "Ticket added successfully");
        queryClient.invalidateQueries({
          queryKey: ticketsKeys.eventTickets(id_event),
        });
        onToogleDialog();
      },
      onError: () => {
        // toast.error(error.message);
        toast.error("Failed to add ticket");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="space-y-4">
          {/* Ticket type field */}
          <FormField
            control={form.control}
            name="type_ticket_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading ? (
                      <p className="py-1.5 pl-8 pr-2 text-sm text-grey-400">Loading ticket types</p>
                    ) : (
                      data &&
                      data.map((ticketType) => (
                        <SelectItem
                          key={ticketType.id}
                          value={ticketType.id}
                        >
                          {ticketType.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ticket name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ticket name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ticket quantity field */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                Available quantity
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ticket quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ticket price field */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ticket price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2.5 justify-end">
          <Button
            disabled={isPending}
            variant="secondary"
            onClick={(e) => {
              onToogleDialog();
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending && <Loader />}
            Add ticket
            <span className="sr-only"> Add ticket</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
