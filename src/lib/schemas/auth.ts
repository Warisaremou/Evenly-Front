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
    email: EMAIL_VALIDATION,
    password: PASSWORD_VALIDATION,
    confirmPassword: CONFIRM_PASSWORD_VALIDATION,
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: EMAIL_VALIDATION,
  password: CONFIRM_PASSWORD_VALIDATION,
});

// Define types based on the schema
export type Register = z.infer<typeof registerSchema>;
export type Login = z.infer<typeof loginSchema>;
