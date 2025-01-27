import { EMAIL_VALIDATION } from "@/lib/schemas/auth";
import { z } from "zod";

export const updateOrganizerProfileSchema = z
  .object({
    email: EMAIL_VALIDATION,
    organizer_name: z
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

export const updateAccountProfileSchema = z
  .object({
    email: EMAIL_VALIDATION,
    firstname: z
      .string({
        message: "firstname is required",
      })
      .min(3, {
        message: "firstname must have at least 3 characters",
      }),
    lastname: z
      .string({
        message: "lastname is required",
      })
      .min(3, {
        message: "lastname must have at least 3 characters",
      }),
  })
  .required();

// Define types based on the schema
export type OrganizerProfile = z.infer<typeof updateOrganizerProfileSchema>;
export type AccountProfile = z.infer<typeof updateAccountProfileSchema>;
