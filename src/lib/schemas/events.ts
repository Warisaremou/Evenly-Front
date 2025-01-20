import { z } from "zod";

export const createAndUpdateEventSchema = z
  .object({
    cover: z.custom<File>().nullable(),
    title: z
      .string({
        required_error: "Event title is required",
      })
      .min(3, {
        message: "Event title must have at least 3 characters",
      })
      .max(50, {
        message: "Event title must have at most 50 characters",
      })
      .trim(),
    categories: z.array(z.string()).min(1, {
      message: "Please choose at least 1 category",
    }),
    description: z.string().min(10, {
      message: "Event description must have at least 10 characters",
    }),
    location: z.string().min(3, {
      message: "Event location must have at least 3 characters",
    }),
    date_time: z.string(),
    // date_time: z.string().datetime({ local: true }),
  })
  .required();

// Define types based on the schema
export type CreateAndUpdateEvent = z.infer<typeof createAndUpdateEventSchema>;
