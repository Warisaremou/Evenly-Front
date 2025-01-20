import FieldErrorMessage from "@/components/field-error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateAndUpdateTicket, createAndUpdateTicketSchema } from "@/lib/schemas/tickets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
  onToogleDialog: () => void;
};

export default function AddEditTicketForm({ onToogleDialog }: Props) {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<CreateAndUpdateTicket>({
    resolver: zodResolver(createAndUpdateTicketSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      price: 0,
      event_id: "",
      ticket_type_id: "",
    },
  });

  const onSubmit = (data: CreateAndUpdateTicket) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <div className="space-y-4">
        {/* Ticket type field */}
        <div>
          <div className="form-input">
            <Label htmlFor="ticket_type">Ticket type</Label>
            <Select>
              <SelectTrigger className="flex-1">
                <SelectValue
                  id="ticket_type"
                  placeholder="Select ticket type"
                  {...register("ticket_type_id")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.ticket_type_id && <FieldErrorMessage errorMessage={errors.ticket_type_id.message} />}
        </div>

        {/* Ticket name field */}
        <div>
          <div className="form-input">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Ticket name"
              {...register("name")}
            />
          </div>
          {errors.name && <FieldErrorMessage errorMessage={errors.name.message} />}
        </div>

        {/* Ticket quantity field */}
        <div>
          <div className="form-input">
            <Label htmlFor="quantity">Available quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Ticket quantity"
              {...register("quantity")}
            />
          </div>
          {errors.quantity && <FieldErrorMessage errorMessage={errors.quantity.message} />}
        </div>

        {/* Ticket price field */}
        <div>
          <div className="form-input">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Ticket price"
              {...register("price")}
            />
          </div>
          {errors.price && <FieldErrorMessage errorMessage={errors.price.message} />}
        </div>
      </div>

      <div className="flex gap-2.5 justify-end">
        <Button
          variant="secondary"
          onClick={(e) => {
            onToogleDialog();
            e.preventDefault();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">
          Add ticket
          <span className="sr-only"> Add ticket</span>
        </Button>
      </div>
    </form>
  );
}
