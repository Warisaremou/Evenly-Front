import { z } from "zod";

export const createAndUpdateTicketSchema = z
  .object({
    name: z
      .string({
        required_error: "Ticket name is required",
      })
      .min(3, {
        message: "Ticket name must have at least 3 characters",
      })
      .max(15, {
        message: "Ticket name must have at most 15 characters",
      })
      .trim(),
    quantity: z
      .string()
      .min(1, "Quantity must be at least 1")
      .transform((value) => Number(value)),
    price: z
      .string()
      .min(0, "Price must be at least 0")
      .transform((value) => Number(value)),
    event_id: z.string({
      required_error: "Event id is required",
    }),
    type_ticket_id: z.string({
      required_error: "Ticket type id is required",
    }),
  })
  .required();

// Define types based on the schema
export type CreateAndUpdateTicket = z.infer<typeof createAndUpdateTicketSchema>;
