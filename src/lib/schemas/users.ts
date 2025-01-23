import { z } from "zod";

export const updateOrganizerProfileSchema = z
  .object({
    email: z.string().email({
      message: "Enter a valid email",
    }),
    name: z
      .string({
        required_error: "Organization name is required",
      })
      .min(3, {
        message: "Organization name must have at least 3 characters",
      })
      .max(10, {
        message: "Organization name must have at most 10 characters",
      })
      .trim(),
  })
  .required();

// Define types based on the schema
export type OrganizerProfile = z.infer<typeof updateOrganizerProfileSchema>;
