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
    quantity: z.preprocess(
      (a) =>
        parseInt(
          z
            .string({
              invalid_type_error: "Ticket quantity is required and must be a number",
            })
            .parse(a),
          10,
        ),
      z
        .number({
          invalid_type_error: "Ticket quantity is required",
        })
        .positive({
          message: "Ticket quantity must be positive and greater than 0",
        })
        .min(1, {
          message: "minimum quantity is 1",
        }),
      {
        required_error: "quantity is required",
      },
    ),
    price: z.preprocess(
      (a) =>
        parseInt(
          z
            .string({
              invalid_type_error: "Ticket price is required and must be a number",
            })
            .parse(a),
          10,
        ),
      z
        .number({
          invalid_type_error: "Ticket price is required",
        })
        .positive({
          message: "Ticket price must be positive and greater than 0",
        })
        .min(1, {
          message: "minimum price is 1",
        }),
      {
        required_error: "price is required",
      },
    ),
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
