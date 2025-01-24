import { z } from "zod";

const EMAIL_VALIDATION = z.string().email({
  message: "Invalid email address",
});
const PASSWORD_VALIDATION = z
  .string()
  .min(8, {
    message: "Password must have at least 8 characters",
  })
  .max(50)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*])(?=.{8,})/, {
    message: "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
  });

const CONFIRM_PASSWORD_VALIDATION = z.string().min(8, {
  message: "Password must have at least 8 characters",
});

export const registerSchema = z
  .object({
    id_role: z
      .string({
        message: "Please select a role",
      })
      .min(1, {
        message: "Role is required",
      }),
    email: EMAIL_VALIDATION,
    organizer_name: z
      .string({
        message: "Organizer name is required",
      })
      .min(3, {
        message: "Organizer name must have at least 3 characters",
      }),
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
    password: PASSWORD_VALIDATION,
  })
  .required();

export const loginSchema = z.object({
  email: EMAIL_VALIDATION,
  password: CONFIRM_PASSWORD_VALIDATION,
});

// Define types based on the schema
export type Register = z.infer<typeof registerSchema>;
export type Login = z.infer<typeof loginSchema>;
