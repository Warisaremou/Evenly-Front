import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateAndUpdateTicket, createAndUpdateTicketSchema } from "@/lib/schemas/tickets";
import { useAddTicket } from "@/services/tickets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  id_event: string;
  onToogleDialog: () => void;
};

export default function AddEditTicketForm({ id_event, onToogleDialog }: Props) {
  const { mutateAsync, isPending } = useAddTicket();

  const form = useForm<CreateAndUpdateTicket>({
    resolver: zodResolver(createAndUpdateTicketSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      price: 0,
      event_id: id_event,
      ticket_type_id: "",
    },
  });

  const onSubmit = (data: CreateAndUpdateTicket) => {
    mutateAsync(data, {
      onSuccess: (response) => {
        toast.success(response.message ?? "Ticket added successfully");
        // TODO: Invalidate event tickets query cache
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
            name="ticket_type_id"
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
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
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
