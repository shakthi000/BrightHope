import { z } from "zod";
import { SERVICE_OPTIONS } from "@/lib/constants";

const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid Indian phone number"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  website: z.string().max(0, "Invalid submission").optional(),
});

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid Indian phone number"),
  service: z.enum(
    SERVICE_OPTIONS.map((s) => s.value) as [string, ...string[]],
    { errorMap: () => ({ message: "Please select a valid service" }) }
  ),
  date: z
    .string()
    .refine((val) => {
      const d = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today;
    }, "Please select a future date"),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please select a valid time"),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
    .default(""),
  website: z.string().max(0, "Invalid submission").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type AppointmentFormData = z.infer<typeof appointmentSchema>;
